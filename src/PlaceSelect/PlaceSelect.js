import React, { Component } from 'react';
import axios from 'axios';
import Select from 'react-select';

import 'react-select/dist/react-select.css';

const ALGOLIA_ENDPOINT = 'https://places-dsn.algolia.net/1/places'

const KANSAS_CITY_OPTION = {
  label: 'Kansas City, Missouri, United States of America',
  value: {
    administrative: ['Missouri'],
    country: {
      default: 'United States of America'
    },
    locale_names: {
      default: ['Kansas City']
    },
    // from https://tools.wmflabs.org
    _geoloc: {
      lat: 39.099722,
      lng: -94.578333
    }
  }
};

export default class PlaceSelect extends Component {
  constructor(props) {
    super(props);
    this.state = { hits: [], value: null };
    this.handleChange = (s) => this._handleChange(s);
    this.searchPlaces = (query) => this._searchPlaces(query);
    this.fetchPlaceById = () => this._fetchPlaceById();
    this.generateCityOption = (place) => this._generateCityOption(place);
  }

  componentWillMount() {
    if (!!this.props.place_id) {
      this.fetchPlaceById();
    } else if (this.props.city === 'Kansas City, Missouri, United States of America') {
      this.setState({ value: KANSAS_CITY_OPTION });
    } else if (this.props.city) {
      const value = { label: this.props.city, value: this.props.city }
      this.setState({ value });
    }
  }

  _handleChange(selected) {
    console.log(selected)
    let cityData = {};

    if (selected) {
      const country = selected.value.country ? selected.value.country.default : null;
      const country_en = selected.value.country && selected.value.country.en ? selected.value.country.en : country;
      cityData = {
        city: selected.value.locale_names.default[0],
        region: selected.value.administrative ? selected.value.administrative[0] : null,
        country: country,
        country_en: country_en,
        latitude: selected.value._geoloc ? selected.value._geoloc.lat : null,
        longitude: selected.value._geoloc ? selected.value._geoloc.lng : null,
        place_id: selected.value.objectID ? selected.value.objectID : null,
      }
    }

    this.props.handleSelect(cityData)
    this.setState({ value: selected })
  }

  _searchPlaces(query) {
    const url = `${ALGOLIA_ENDPOINT}/query/`;
    const data = {
      "type": "city",
      "hitsPerPage": "10",
      "query": query
    };
    const method = 'post';

    return axios({
      data,
      url,
      method
    }).then(res => {
      let options = res.data.hits.map(place => this.generateCityOption(place));
      // Kansas City, MO is missing from the Algolia places API
      // so we're manually adding it in
      // TODO: don't do this
      if (query.toLowerCase().includes('kansas')) {
        options.unshift(KANSAS_CITY_OPTION)
      }
      return { options }
    }).catch(err => {
      console.log(err)
    })
  }

  _fetchPlaceById() {
    const url = `${ALGOLIA_ENDPOINT}/${this.props.place_id}`;

    axios.get(url)
      .then(res => {
        const value = this.generateCityOption(res.data)
        this.setState({ value })
      })
      .catch(err => {
        console.log(err)
      })
  }

  _generateCityOption(place) {
    return {
      label: `${place.locale_names.default[0]}, ${place.administrative[0]}, ${place.country.default}`,
      value: place
    }
  }

  render() {
    const options = this.state.hits.map(place => this.generateCityOption(place))

    return(
      <div>
        <Select.Async
          name={ this.props.name }
          className={ `city-select ${this.props.classes}` }
          value={ this.state.value }
          options={ options }
          onChange={ this.handleChange }
          noResultsText={ this.props.noResultsText | 'No results for this city'}
          placeholder={ this.props.placeholder | 'Start typing a city name...'}
          loadOptions={this.searchPlaces}
        />
        {
          this.props.errorMessage &&
          <div className="error-message minicaps">{this.props.errorMessage}</div>
        }
      </div>
    )
  }
}

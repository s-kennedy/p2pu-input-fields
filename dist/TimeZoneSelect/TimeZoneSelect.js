'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _lodash = require('lodash');

var _axios = require('axios');

var _axios2 = _interopRequireDefault(_axios);

var _reactSelect = require('react-select');

var _reactSelect2 = _interopRequireDefault(_reactSelect);

var _timezoneNames = require('./timezone-names.js');

var _timezoneNames2 = _interopRequireDefault(_timezoneNames);

require('react-select/dist/react-select.css');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var GEONAMES_ENDPOINT = 'https://secure.geonames.org/timezoneJSON';

var TimeZoneSelect = function (_Component) {
  _inherits(TimeZoneSelect, _Component);

  function TimeZoneSelect(props) {
    _classCallCheck(this, TimeZoneSelect);

    var _this = _possibleConstructorReturn(this, (TimeZoneSelect.__proto__ || Object.getPrototypeOf(TimeZoneSelect)).call(this, props));

    _this.state = { value: _this.props.timezone };
    _this.onChange = function (s) {
      return _this._onChange(s);
    };
    _this.detectTimeZone = function () {
      return _this._detectTimeZone();
    };
    return _this;
  }

  _createClass(TimeZoneSelect, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.detectTimeZone();
    }
  }, {
    key: '_onChange',
    value: function _onChange(selected) {
      var timezone = !!selected ? selected.value : null;
      this.props.handleChange({ timezone: timezone });
      this.setState({ value: selected });
    }
  }, {
    key: '_detectTimeZone',
    value: function _detectTimeZone() {
      var _this2 = this;

      if (!!this.props.timezone) {
        // use selected timezone
        this.setState({ value: { value: this.props.timezone, label: this.props.timezone } });
      } else if (!!this.props.latitude && !!this.props.longitude) {
        // use selected city to detect timezone
        var url = GEONAMES_ENDPOINT + '?lat=' + this.props.latitude + '&lng=' + this.props.longitude + '&username=p2pu';
        _axios2.default.get(url).then(function (res) {
          var timezone = res.data.timezoneId;
          _this2.props.handleChange({ timezone: timezone });
          _this2.setState({ value: { value: timezone, label: timezone } });
        }).catch(function (err) {
          return console.log(err);
        });
      } else {
        // detect timezone from browser
        var timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
        this.props.handleChange({ timezone: timezone });
        this.setState({ value: { value: timezone, label: timezone } });
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _React$createElement;

      var timezoneOptions = _timezoneNames2.default.map(function (tz) {
        return { value: tz, label: tz };
      });

      return _react2.default.createElement(
        'div',
        null,
        _react2.default.createElement(_reactSelect2.default, (_React$createElement = {
          name: this.props.name,
          className: 'form-group input-with-label',
          value: this.state.value,
          onChange: this.onChange,
          options: timezoneOptions
        }, _defineProperty(_React$createElement, 'name', 'timezone'), _defineProperty(_React$createElement, 'id', 'id_timezone'), _React$createElement)),
        this.props.errorMessage && _react2.default.createElement(
          'div',
          { className: 'error-message minicaps' },
          this.props.errorMessage
        )
      );
    }
  }]);

  return TimeZoneSelect;
}(_react.Component);

exports.default = TimeZoneSelect;
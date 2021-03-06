import React from 'react'
import PropTypes from 'prop-types'
import InputWrapper from '../InputWrapper'

const CheckboxWithLabel = (props) => {
  const onChange = (e) => {
    props.handleChange({ [props.name]: e.currentTarget.checked })
  }

  return (
    <InputWrapper
      label={props.label}
      name={props.name}
      required={props.required}
      errorMessage={props.errorMessage}
      helpText={props.helpText}
      classes={props.classes}
      labelPosition={props.labelPosition}
    >
      <input
        type="checkbox"
        id={props.id}
        checked={props.checked}
        disabled={props.disabled}
        onChange={onChange}
      />
    </InputWrapper>
  )
}

CheckboxWithLabel.propTypes = {
  handleChange: PropTypes.func.isRequired,
  label: PropTypes.string.isRequired,
  labelPosition: PropTypes.string,
  name: PropTypes.string.isRequired,
  classes: PropTypes.string,
  checked: PropTypes.bool,
  required: PropTypes.bool,
  errorMessage: PropTypes.string,
  helpText: PropTypes.string,
}

CheckboxWithLabel.defaultProps = {
  classes: "",
  label: "Checkbox label",
  labelPosition: "left",
  handleChange: (input) => console.log("Implement a function to save selection", input),
}

export default CheckboxWithLabel;
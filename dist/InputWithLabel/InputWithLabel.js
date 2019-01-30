"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var InputWithLabel = function InputWithLabel(props) {
  var onChange = function onChange(e) {
    props.handleChange(_defineProperty({}, props.name, e.currentTarget.value));
  };

  return _react.default.createElement("div", {
    className: "input-with-label form-group ".concat(props.classes)
  }, _react.default.createElement("label", {
    htmlFor: props.name
  }, "".concat(props.label, " ").concat(props.required ? '*' : '')), _react.default.createElement("input", {
    className: 'form-control',
    type: props.type || 'text',
    name: props.name,
    id: props.id,
    onChange: onChange,
    value: props.value || props.defaultValue,
    placeholder: props.placeholder,
    required: props.required || false,
    min: props.min,
    max: props.max
  }), props.errorMessage && _react.default.createElement("div", {
    className: 'error-message minicaps'
  }, props.errorMessage));
};

var _default = InputWithLabel;
exports.default = _default;
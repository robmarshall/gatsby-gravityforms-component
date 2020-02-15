"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _objectWithoutPropertiesLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutPropertiesLoose"));

var _classnames = _interopRequireDefault(require("classnames"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _react = _interopRequireDefault(require("react"));

var _InputWrapper = _interopRequireDefault(require("../../components/InputWrapper"));

const Select = (_ref) => {
  let {
    errors,
    fieldData,
    name,
    register
  } = _ref,
      wrapProps = (0, _objectWithoutPropertiesLoose2.default)(_ref, ["errors", "fieldData", "name", "register"]);
  const {
    choices,
    cssClass,
    isRequired,
    size
  } = fieldData;
  const options = JSON.parse(choices);
  return _react.default.createElement(_InputWrapper.default, (0, _extends2.default)({
    errors: errors,
    inputData: fieldData,
    labelFor: name
  }, wrapProps), _react.default.createElement("select", {
    "aria-invalid": errors,
    "aria-required": isRequired //TODO: GF uses select2 library and classes, need to figure out how to handle here if we're mimicing their functionality
    ,
    className: (0, _classnames.default)('gravityform__field__input', 'gravityform__field__input__select', 'gfield_select', cssClass, size),
    id: name,
    name: name,
    ref: register({
      required: isRequired && 'This field is required'
    })
  }, options.map(({
    isSelected,
    text,
    value
  }, index) => {
    return _react.default.createElement("option", {
      defaultValue: isSelected,
      key: `${name}-${index}`,
      value: value
    }, text);
  })));
};

var _default = Select;
exports.default = _default;
Select.propTypes = {
  errors: _propTypes.default.object,
  fieldData: _propTypes.default.shape({
    choices: _propTypes.default.string,
    cssClass: _propTypes.default.string,
    isRequired: _propTypes.default.bool,
    size: _propTypes.default.string
  }),
  name: _propTypes.default.string,
  register: _propTypes.default.func,
  wrapProps: _propTypes.default.object
};
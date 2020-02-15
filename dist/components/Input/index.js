"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _objectWithoutPropertiesLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutPropertiesLoose"));

var _classnames = _interopRequireDefault(require("classnames"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _react = _interopRequireDefault(require("react"));

var _strings = _interopRequireDefault(require("../../utils/strings"));

var _InputWrapper = _interopRequireDefault(require("../InputWrapper"));

const Input = (_ref) => {
  let {
    errors,
    fieldData,
    name,
    register,
    value
  } = _ref,
      wrapProps = (0, _objectWithoutPropertiesLoose2.default)(_ref, ["errors", "fieldData", "name", "register", "value"]);
  const {
    cssClass,
    inputMaskValue,
    isRequired,
    maxLength,
    placeholder,
    size,
    type
  } = fieldData;
  const regex = inputMaskValue ? new RegExp(inputMaskValue) : false;
  return _react.default.createElement(_InputWrapper.default, (0, _extends2.default)({
    errors: errors,
    inputData: fieldData,
    labelFor: name
  }, wrapProps), _react.default.createElement("input", {
    "aria-invalid": errors,
    "aria-required": isRequired,
    className: (0, _classnames.default)('gravityform__field__input', `gravityform__field__input__${type}`, cssClass, size),
    defaultValue: value,
    id: name,
    maxLength: maxLength || 524288 // 524288 = 512kb, avoids invalid prop type error if maxLength is undefined.
    ,
    name: name,
    placeholder: placeholder,
    ref: register({
      required: isRequired && _strings.default.errors.required,
      maxlength: {
        value: maxLength > 0 && maxLength,
        message: maxLength > 0 && `${_strings.default.errors.maxChar.front}  ${maxLength} ${_strings.default.errors.maxChar.back}`
      },
      pattern: {
        value: regex,
        message: regex && _strings.default.errors.pattern
      }
    }),
    type: type === 'phone' ? 'tel' : type
  }));
};

var _default = Input;
exports.default = _default;
Input.propTypes = {
  errors: _propTypes.default.object,
  fieldData: _propTypes.default.shape({
    cssClass: _propTypes.default.string,
    inputMaskValue: _propTypes.default.string,
    maxLength: _propTypes.default.number,
    placeholder: _propTypes.default.string,
    isRequired: _propTypes.default.bool,
    type: _propTypes.default.string,
    size: _propTypes.default.string
  }),
  name: _propTypes.default.string,
  register: _propTypes.default.func,
  value: _propTypes.default.string,
  wrapProps: _propTypes.default.object
};
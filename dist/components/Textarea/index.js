"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _classnames = _interopRequireDefault(require("classnames"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _react = _interopRequireDefault(require("react"));

var _InputWrapper = _interopRequireDefault(require("../../components/InputWrapper"));

var _strings = _interopRequireDefault(require("../../utils/strings"));

const Textarea = ({
  errors,
  fieldData,
  name,
  register,
  value,
  wrapClassName,
  wrapId
}) => {
  const {
    cssClass,
    description,
    descriptionPlacement,
    inputMaskValue,
    isRequired,
    label,
    maxLength,
    placeholder,
    size,
    type
  } = fieldData;
  const regex = inputMaskValue ? new RegExp(inputMaskValue) : false;
  return _react.default.createElement(_InputWrapper.default, {
    errors: errors,
    inputData: fieldData,
    labelFor: name,
    wrapClassName: wrapClassName,
    wrapId: wrapId
  }, _react.default.createElement("textarea", {
    "aria-invalid": errors,
    "aria-required": isRequired,
    className: (0, _classnames.default)('gravityform__field__input', `gravityform__field__input__${type}`, cssClass, size, 'textarea'),
    defaultValue: value,
    id: name,
    maxLength: maxLength > 0 ? maxLength : undefined,
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
    type: type
  }));
};

var _default = Textarea;
exports.default = _default;
Textarea.propTypes = {
  errors: _propTypes.default.object,
  fieldData: _propTypes.default.shape({
    cssClass: _propTypes.default.string,
    description: _propTypes.default.string,
    inputMaskValue: _propTypes.default.string,
    label: _propTypes.default.string,
    descriptionPlacement: _propTypes.default.string,
    maxLength: _propTypes.default.number,
    placeholder: _propTypes.default.string,
    isRequired: _propTypes.default.bool,
    type: _propTypes.default.string,
    size: _propTypes.default.string
  }),
  name: _propTypes.default.string,
  register: _propTypes.default.func,
  value: _propTypes.default.string,
  wrapClassName: _propTypes.default.string,
  wrapId: _propTypes.default.string
};
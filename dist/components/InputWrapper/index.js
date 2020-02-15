"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _classnames = _interopRequireDefault(require("classnames"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _react = _interopRequireDefault(require("react"));

var _inputSettings = require("../../utils/inputSettings");

const InputWrapper = ({
  children,
  errors,
  inputData: {
    cssClass,
    description,
    descriptionPlacement,
    isRequired,
    label,
    maxLength,
    type
  },
  labelFor,
  wrapClassName,
  wrapId
}) => {
  return _react.default.createElement("li", {
    className: (0, _classnames.default)(wrapClassName, errors && 'gravityform__field--error', cssClass),
    id: wrapId
  }, _react.default.createElement("label", {
    className: "gravityform__label gfield_label",
    htmlFor: labelFor
  }, label, isRequired && _react.default.createElement("span", {
    className: "gfield_required"
  }, "*")), (0, _inputSettings.outputDescription)(description, descriptionPlacement, 'above', errors), _react.default.createElement("div", {
    className: `ginput_container ginput_container_${type}`
  }, children, maxLength > 0 && _react.default.createElement("div", {
    className: "charleft ginput_counter warningTextareaInfo"
  }, maxLengthSentence(maxLength, type))), (0, _inputSettings.outputDescription)(description, descriptionPlacement, 'below', errors), errors && _react.default.createElement("div", {
    "aria-live": "polite",
    className: "gravityform__error_message gfield_description validation_message"
  }, errors.message));
};

const maxLengthSentence = (length, type) => {
  let word = type === 'number' ? 'numbers' : 'characters';
  return length && ` (maxiumum ${length} ${word})`;
};

var _default = InputWrapper;
exports.default = _default;
InputWrapper.propTypes = {
  children: _propTypes.default.node,
  errors: _propTypes.default.object,
  inputData: _propTypes.default.shape({
    description: _propTypes.default.string,
    descriptionPlacement: _propTypes.default.string,
    label: _propTypes.default.string,
    isRequired: _propTypes.default.bool,
    maxLength: _propTypes.default.number,
    type: _propTypes.default.string,
    cssClass: _propTypes.default.string
  }),
  labelFor: _propTypes.default.string,
  maxLength: _propTypes.default.int,
  wrapClassName: _propTypes.default.string,
  wrapId: _propTypes.default.string
};
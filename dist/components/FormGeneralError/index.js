"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _strings = _interopRequireDefault(require("../../utils/strings"));

const FormGeneralError = props => {
  let errorMessage = '';

  if (props.errorCode === 'formHasError') {
    errorMessage = _strings.default.errors.general;
  }

  if (props.errorCode === 'unknownError') {
    errorMessage = _strings.default.errors.unknownError;
  }

  if (props.errorCode === 'leastOneField') {
    errorMessage = _strings.default.errors.leastOneField;
  }

  if (errorMessage) {
    return _react.default.createElement("div", {
      className: "gravityform__error_inform validation_error"
    }, _react.default.createElement("p", null, errorMessage));
  } else {
    return false;
  }
};

var _default = FormGeneralError;
exports.default = _default;
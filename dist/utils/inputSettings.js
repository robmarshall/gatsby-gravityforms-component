"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.outputDescription = outputDescription;
exports.islabelHidden = islabelHidden;
exports.ifDefaultValue = ifDefaultValue;

var _react = _interopRequireDefault(require("react"));

var _reactHtmlParser = _interopRequireDefault(require("react-html-parser"));

/**
 * This file manages all of the Gravity Forms input settings.
 * Things such as: Input Mask, Required, Visibility
 */
function outputDescription(description, placement, currentPosition, errors) {
  if (description && currentPosition === placement) {
    return _react.default.createElement("div", {
      className: `gravityforms__description gravityforms__description--${placement} gfield_description${errors ? ' validation_error' : ''}`
    }, (0, _reactHtmlParser.default)(description));
  }

  return null;
}

function islabelHidden(label) {
  return label === 'hidden_label' ? true : false;
}

function ifDefaultValue(field) {
  //TODO: My emty default vaules are "" ? that doesn't seem helpful
  return field['defaultValue'] !== 'undefined' ? field['defaultValue'] : false;
}
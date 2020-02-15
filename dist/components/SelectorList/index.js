"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _objectWithoutPropertiesLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutPropertiesLoose"));

var _classnames = _interopRequireDefault(require("classnames"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _react = _interopRequireDefault(require("react"));

var _reactHtmlParser = _interopRequireDefault(require("react-html-parser"));

var _strings = _interopRequireDefault(require("../../utils/strings"));

var _InputWrapper = _interopRequireDefault(require("../InputWrapper"));

// TODO: Enable Select All Choice
const SelectorList = (_ref) => {
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
    size,
    type
  } = fieldData;
  const options = JSON.parse(choices);
  return _react.default.createElement(_InputWrapper.default, (0, _extends2.default)({
    errors: errors,
    inputData: fieldData,
    labelFor: name
  }, wrapProps), _react.default.createElement("ul", {
    className: `gfield_${type}`,
    id: name
  }, options.map(({
    isSelected,
    text,
    value
  }, index) => {
    const choiceID = index + 1;
    return _react.default.createElement("li", {
      key: `${name}-${index + 1}`
    }, _react.default.createElement("input", {
      className: (0, _classnames.default)(`gravityform__field__input__${type}`, `gravityform__field__input__${type}--` + choiceID, cssClass, size),
      defaultChecked: isSelected,
      id: `${name}_${choiceID}`,
      name: `${name}_${choiceID}`,
      ref: register({
        required: isRequired && _strings.default.errors.required
      }),
      type: type,
      value: value
    }), "\xA0", _react.default.createElement("label", {
      htmlFor: `${name}_${choiceID}`
    }, (0, _reactHtmlParser.default)(text)));
  })));
};

var _default = SelectorList;
exports.default = _default;
SelectorList.propTypes = {
  errors: _propTypes.default.object,
  fieldData: _propTypes.default.shape({
    choices: _propTypes.default.string,
    cssClass: _propTypes.default.string,
    id: _propTypes.default.number,
    isRequired: _propTypes.default.bool,
    size: _propTypes.default.string,
    type: _propTypes.default.string
  }),
  name: _propTypes.default.string,
  register: _propTypes.default.func,
  wrapProps: _propTypes.default.object
};
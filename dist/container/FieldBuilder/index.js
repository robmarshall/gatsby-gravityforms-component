"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _classnames = _interopRequireDefault(require("classnames"));

var _lodash = _interopRequireDefault(require("lodash"));

var _react = _interopRequireDefault(require("react"));

var _Captcha = _interopRequireDefault(require("../../components/Captcha"));

var _Html = _interopRequireDefault(require("../../components/Html"));

var _Input = _interopRequireDefault(require("../../components/Input"));

var _Multiselect = _interopRequireDefault(require("../../components/Multiselect"));

var _Select = _interopRequireDefault(require("../../components/Select"));

var _SelectorList = _interopRequireDefault(require("../../components/SelectorList"));

var _Textarea = _interopRequireDefault(require("../../components/Textarea"));

var _helpers = require("../../utils/helpers");

var _inputSettings = require("../../utils/inputSettings");

const FieldBuilder = ({
  formData,
  presetValues = {},
  register,
  errors,
  setValue
}) => {
  // Loop through fields and create
  return formData.formFields.map(field => {
    // Set the wrapper classes
    const {
      descriptionPlacement: fieldDescPlace,
      isRequired,
      subLabelPlacement: fieldSubLabelPlace,
      visibility
    } = field;
    const descriptionPlacement = fieldDescPlace || formData.descriptionPlacement;
    const subLabelPlacement = fieldSubLabelPlace || formData.subLabelPlacement;
    const fieldData = Object.assign({}, field, {
      descriptionPlacement
    });
    let inputWrapperClass = (0, _classnames.default)('gfield', 'gravityform__field', 'gravityform__field__' + field.type, 'gravityform__field--' + field.size, field.cssClass, {
      'field-required': field.isRequired
    }, {
      'hidden-label': (0, _inputSettings.islabelHidden)(field.labelPlacement)
    }, {
      gfield_contains_required: isRequired
    }, {
      [`field_sublabel_${subLabelPlacement}`]: subLabelPlacement
    }, `field_description_${descriptionPlacement}`, `gfield_visibility_${visibility}`);
    const wrapId = `field_${formData.formId}_${field.id}`; //TODO: Should this match GF version "input_form.id_input.id"

    const inputName = `input_${field.id}`;
    let errorKey = '';

    switch (field.type) {
      // Add note for unsupported captcha field
      case 'captcha':
        return _react.default.createElement(_Captcha.default, {
          captchaTheme: field.captchaTheme,
          errors: errors[`input_${field.id}`],
          fieldData: fieldData,
          key: field.id,
          name: inputName,
          register: register,
          setValue: setValue,
          wrapClassName: inputWrapperClass
        });
      // Start with the standard fields

      case 'text':
      case 'number':
      case 'email':
      case 'hidden':
      case 'phone':
        return _react.default.createElement(_Input.default, {
          errors: errors[inputName],
          fieldData: fieldData,
          key: field.id,
          name: inputName,
          register: register,
          value: _lodash.default.get(presetValues, inputName, false) ? _lodash.default.get(presetValues, inputName, false) : (0, _inputSettings.ifDefaultValue)(field),
          wrapClassName: inputWrapperClass,
          wrapId: wrapId
        });

      case 'textarea':
        return _react.default.createElement(_Textarea.default, {
          errors: errors[inputName],
          fieldData: fieldData,
          key: field.id,
          name: inputName,
          register: register,
          wrapClassName: inputWrapperClass,
          wrapId: wrapId
        });

      case 'select':
        return _react.default.createElement(_Select.default, {
          errors: errors[inputName],
          fieldData: fieldData,
          key: field.id,
          name: inputName,
          register: register,
          wrapClassName: inputWrapperClass,
          wrapId: wrapId
        });

      case 'multiselect':
        return _react.default.createElement(_Multiselect.default, {
          errors: errors[inputName],
          fieldData: fieldData,
          key: field.id,
          name: inputName,
          register: register,
          wrapClassName: inputWrapperClass,
          wrapId: wrapId
        });

      case 'radio':
      case 'checkbox':
        errorKey = (0, _helpers.filteredKeys)(errors, RegExp(`input_${field.id}_`));
        return _react.default.createElement(_SelectorList.default, {
          errors: errorKey.length > 0 ? errors[errorKey[0]] : null,
          fieldData: fieldData,
          key: field.id,
          name: inputName,
          register: register,
          wrapClassName: inputWrapperClass,
          wrapId: wrapId
        });

      case 'html':
        return _react.default.createElement(_Html.default, {
          fieldData: fieldData,
          key: field.id,
          name: inputName,
          wrapClassName: inputWrapperClass,
          wrapId: wrapId
        });

      default:
        return null;
    }
  });
};

var _default = FieldBuilder;
exports.default = _default;
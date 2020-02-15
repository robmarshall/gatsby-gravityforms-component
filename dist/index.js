"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _classnames = _interopRequireDefault(require("classnames"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _react = _interopRequireWildcard(require("react"));

var _reactHookForm = require("react-hook-form/dist/react-hook-form.ie11");

var _reactHtmlParser = _interopRequireDefault(require("react-html-parser"));

var _FormGeneralError = _interopRequireDefault(require("./components/FormGeneralError"));

var _FieldBuilder = _interopRequireDefault(require("./container/FieldBuilder"));

var _getForm = _interopRequireDefault(require("./utils/getForm"));

var _manageErrors = require("./utils/manageErrors");

var _manageFormData = require("./utils/manageFormData");

var _passToGravityForms = _interopRequireDefault(require("./utils/passToGravityForms"));

/**
 * Component to take Gravity Form graphQL data and turn into
 * a fully functional form.
 * @param mixed     formData    Form dataset from graphQL
 * @param int       id          Form ID from Gravity Forms
 * @param string    lambda      API link for Lambda functions when working with
 *                              netlify or similar
 */
const GravityFormForm = ({
  id,
  formData,
  lambda,
  presetValues = {},
  successCallback = ({
    reset
  }) => reset(),
  errorCallback,
  buttonLoading = 'Loading'
}) => {
  // Pull in form functions
  const {
    errors,
    handleSubmit,
    register,
    reset,
    setError,
    setValue
  } = (0, _reactHookForm.useForm)();
  const [generalError, setGeneralError] = (0, _react.useState)('');
  const [formLoading, setLoadingState] = (0, _react.useState)(false); // State for confirmation message

  const [confirmationMessage, setConfirmationMessage] = (0, _react.useState)(''); // Take ID argument and graphQL Gravity Form data for this form

  const singleForm = (0, _getForm.default)(formData, id);

  const onSubmitCallback = async values => {
    // Make sure we are not already waiting for a response
    if (!formLoading) {
      // Clean error
      setGeneralError(''); // Check that at least one field has been filled in

      if ((0, _manageFormData.submissionHasOneFieldEntry)(values)) {
        setLoadingState(true);
        const {
          data,
          status
        } = await (0, _passToGravityForms.default)(singleForm.apiURL, values, lambda);
        setLoadingState(false);

        if (status === 'error') {
          // Handle the errors
          // First check to make sure we have the correct data
          if ((data === null || data === void 0 ? void 0 : data.status) === 'gravityFormErrors') {
            // Pass messages to handle that sets react-hook-form errors
            (0, _manageErrors.handleGravityFormsValidationErrors)(data.validation_messages, setError);
          } else {
            // Seemed to be an unknown issue
            setGeneralError('unknownError');
          }

          errorCallback && errorCallback({
            values,
            error: data,
            reset
          });
        }

        if (status === 'success') {
          const {
            confirmation_message
          } = data === null || data === void 0 ? void 0 : data.data;
          const {
            confirmations
          } = singleForm;
          const confirmation = confirmations === null || confirmations === void 0 ? void 0 : confirmations.find(el => el.isDefault);
          setConfirmationMessage(confirmation_message || confirmation.message || false);
          successCallback({
            values,
            reset,
            confirmations
          });
        }
      } else {
        setGeneralError('leastOneField');
      }
    }
  };

  if (!confirmationMessage) {
    var _singleForm$button;

    return _react.default.createElement("div", {
      className: "gform_wrapper",
      id: `gform_wrapper_${id}`
    }, _react.default.createElement("div", {
      className: "gform_anchor",
      id: `gf_${id}`
    }), singleForm && _react.default.createElement("form", {
      className: formLoading ? `gravityform gravityform--loading gravityform--id-${id}` : `gravityform gravityform--id-${id}` //TODO: ID change go GF standard "gfrom_1"?
      ,
      id: `gravityform--id-${id}`,
      key: `gravityform--id-${id}`,
      onSubmit: handleSubmit(onSubmitCallback)
    }, generalError && _react.default.createElement(_FormGeneralError.default, {
      errorCode: generalError
    }), _react.default.createElement("div", {
      className: "gform_body"
    }, _react.default.createElement("ul", {
      className: (0, _classnames.default)('gform_fields', {
        [`form_sublabel_${singleForm.subLabelPlacement}`]: singleForm.subLabelPlacement
      }, `description_${singleForm.descriptionPlacement}`, `${singleForm.labelPlacement}`),
      id: `gform_fields_${id}`
    }, _react.default.createElement(_FieldBuilder.default, {
      errors: errors,
      formData: singleForm,
      formId: id,
      presetValues: presetValues,
      register: register,
      setValue: setValue
    }))), _react.default.createElement("div", {
      className: `gform_footer ${singleForm.labelPlacement}`
    }, _react.default.createElement("button", {
      className: "gravityform__button gform_button button",
      id: `gform_submit_button_${id}`,
      type: "submit"
    }, formLoading && buttonLoading ? _react.default.createElement("span", {
      className: "gravityform__button__loading_span"
    }, buttonLoading) : (singleForm === null || singleForm === void 0 ? void 0 : (_singleForm$button = singleForm.button) === null || _singleForm$button === void 0 ? void 0 : _singleForm$button.text) || 'Submit'))));
  }

  return (0, _reactHtmlParser.default)(confirmationMessage);
};

GravityFormForm.defaultProps = {
  lambda: ''
};
GravityFormForm.propTypes = {
  errorCallback: _propTypes.default.func,
  formData: _propTypes.default.object.isRequired,
  id: _propTypes.default.number.isRequired,
  lambda: _propTypes.default.string,
  successCallback: _propTypes.default.func
};
var _default = GravityFormForm;
exports.default = _default;
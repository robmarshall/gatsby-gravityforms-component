"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _objectWithoutPropertiesLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutPropertiesLoose"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _react = _interopRequireWildcard(require("react"));

var _reaptcha = _interopRequireDefault(require("reaptcha"));

var _InputWrapper = _interopRequireDefault(require("../InputWrapper"));

const Captcha = (_ref) => {
  let {
    captchaTheme,
    errors,
    fieldData,
    name,
    register,
    setValue
  } = _ref,
      wrapProps = (0, _objectWithoutPropertiesLoose2.default)(_ref, ["captchaTheme", "errors", "fieldData", "name", "register", "setValue"]);

  if (!process.env.GATSBY_RECAPTCHA_SITE_KEY) {
    return _react.default.createElement("div", {
      className: "gravityform__captcha_notification"
    }, _react.default.createElement("p", null, _react.default.createElement("strong", null, "To use reCAPTCHA, you need to sign up for an API key pair for your site and use it as a node environment variable named GATSBY_RECAPTCHA_SITE_KEY. The key pair consists of a site key and secret. The site key is used to display the widget on your site. Sign up for an API key pair at", _react.default.createElement("a", {
      href: "http://www.google.com/recaptcha",
      rel: "noopener noreferrer",
      target: "_blank",
      title: "This link opens a new page"
    }, "http://www.google.com/recaptcha"))));
  }

  const captchaRef = (0, _react.useRef)(null);
  const [isLoaded, setLoaded] = (0, _react.useState)(false);

  const changeCaptchaToken = (token = '') => {
    setValue('g-recaptcha-response', token, true);
  };

  (0, _react.useEffect)(() => {
    if (isLoaded && errors && errors.message) {
      captchaRef.current.reset();
    }
  }, [errors, isLoaded]);
  return _react.default.createElement(_InputWrapper.default, (0, _extends2.default)({
    errors: errors,
    inputData: fieldData,
    labelFor: name
  }, wrapProps), _react.default.createElement(_reaptcha.default, {
    onExpire: changeCaptchaToken,
    onLoad: () => setLoaded(true),
    onVerify: changeCaptchaToken,
    ref: captchaRef,
    sitekey: process.env.GATSBY_RECAPTCHA_SITE_KEY,
    theme: captchaTheme || 'light'
  }), _react.default.createElement("input", {
    name: "g-recaptcha-response",
    ref: register({}),
    type: "hidden"
  }));
};

Captcha.propTypes = {
  captchaTheme: _propTypes.default.string,
  errors: _propTypes.default.object,
  fieldData: _propTypes.default.object,
  name: _propTypes.default.string,
  register: _propTypes.default.func,
  setValue: _propTypes.default.func,
  wrapClassName: _propTypes.default.string
};
var _default = Captcha;
exports.default = _default;
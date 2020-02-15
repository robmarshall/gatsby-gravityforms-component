"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _axios = _interopRequireDefault(require("axios"));

var _default = async (baseUrl, formData, lambdaEndpoint) => {
  let lambaData = {
    baseUrl: baseUrl,
    payload: formData
  };
  let result;

  try {
    result = await _axios.default.post(lambdaEndpoint, lambaData, {
      responseType: 'json'
    });
  } catch (err) {
    // Pass back error
    return {
      status: 'error',
      data: err.response
    };
  }

  return {
    status: 'success',
    data: result
  };
};

exports.default = _default;
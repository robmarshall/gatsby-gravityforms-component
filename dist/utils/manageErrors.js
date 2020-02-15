"use strict";

exports.__esModule = true;
exports.handleGravityFormsValidationErrors = void 0;

/**
 * Loop through object of errors passed back by Gravity Forms
 * Set errors to the corrosponding input
 */
const handleGravityFormsValidationErrors = (data, setError) => {
  Object.keys(data).forEach(function (key) {
    const id = key.replace('.', '_');
    const fieldId = `input_${id}`;
    setError(fieldId, 'gf_validation', data[key]);
  });
};

exports.handleGravityFormsValidationErrors = handleGravityFormsValidationErrors;
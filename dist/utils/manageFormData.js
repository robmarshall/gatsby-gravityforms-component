"use strict";

exports.__esModule = true;
exports.submissionHasOneFieldEntry = void 0;

const submissionHasOneFieldEntry = values => {
  const getFieldWithValues = Object.keys(values).filter(function (key) {
    if (values[key].length > 0) {
      return values[key];
    }

    return false;
  });

  if (getFieldWithValues.length > 0) {
    return true;
  }

  return false;
};

exports.submissionHasOneFieldEntry = submissionHasOneFieldEntry;
"use strict";

exports.__esModule = true;
exports.GravityFormField = exports.GravityFormComponent = void 0;

var _gatsby = require("gatsby");

const GravityFormComponent = (0, _gatsby.graphql)`
    fragment GravityFormComponent on GF__Form {
        formId
        title
        slug
        apiURL
        labelPlacement
        descriptionPlacement
        subLabelPlacement
        formFields {
            ...GravityFormField
        }
        button {
            text
        }
        confirmations {
            id
            name
            isDefault
            type
            message
            url
            queryString
            disableAutoformat
        }
    }
`;
exports.GravityFormComponent = GravityFormComponent;
const GravityFormField = (0, _gatsby.graphql)`
    fragment GravityFormField on GF__FormFormFields {
        id
        label
        labelPlacement
        subLabelPlacement
        description
        descriptionPlacement
        type
        choices
        content
        errorMessage
        inputMaskValue
        isRequired
        visibility
        cssClass
        placeholder
        size
        defaultValue
        maxLength
        captchaTheme
    }
`;
exports.GravityFormField = GravityFormField;
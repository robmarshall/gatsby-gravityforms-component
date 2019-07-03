import React from 'react'

/**
 * This file manages all of the Gravity Forms input settings.
 * Things such as: Input Mask, Required, Visibility
 */

function getPlacement(formSetting, fieldSettings) {
    return fieldSettings ? fieldSettings : formSetting
}

function outputDescription(description, placement, currentPosition) {
    if (description && currentPosition == placement) {
        return (
            <p
                className={`gravityforms__description gravityforms__description--${placement}`}
            >
                {description}
            </p>
        )
    }
    return false
}

function islabelHidden(label) {
    return label === 'hidden_label' ? true : false
}

function ifDefaultValue(field) {
    return field['defaultValue'] !== 'undefined' ? field['defaultValue'] : false
}

module.exports = {
    getPlacement,
    outputDescription,
    ifDefaultValue,
    islabelHidden,
}

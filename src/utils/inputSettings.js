/**
 * This file manages all of the Gravity Forms input settings.
 * Things such as: Input Mask, Required, Visibility
 */

function islabelHidden(label) {
    return label === 'hidden_label' ? true : false
}

function ifDefaultValue(field) {
    return field['defaultValue'] !== 'undefined' ? field['defaultValue'] : false
}

module.exports = { ifDefaultValue, islabelHidden }

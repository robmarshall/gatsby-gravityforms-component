import React from 'react'
import ReactHtmlParser from 'react-html-parser'

/**
 * This file manages all of the Gravity Forms input settings.
 * Things such as: Input Mask, Required, Visibility
 */

export function getPlacement(formSetting, fieldSettings) {
    return fieldSettings ? fieldSettings : formSetting
}

export function outputDescription(description, placement, currentPosition) {
    if (description && currentPosition === placement) {
        return (
            <p
                className={`gravityforms__description gravityforms__description--${placement}`}
            >
                {ReactHtmlParser(description)}
            </p>
        )
    }
    return false
}

export function islabelHidden(label) {
    return label === 'hidden_label' ? true : false
}

export function ifDefaultValue(field) {
    return field['defaultValue'] !== 'undefined' ? field['defaultValue'] : false
}

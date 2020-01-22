import React from 'react'
import ReactHtmlParser from 'react-html-parser'

/**
 * This file manages all of the Gravity Forms input settings.
 * Things such as: Input Mask, Required, Visibility
 */

export function outputDescription(
    description,
    placement,
    currentPosition,
    errors
) {
    if (description && currentPosition === placement) {
        return (
            <div
                className={`gravityforms__description gravityforms__description--${placement} gfield_description${
                    errors ? ' validation_error' : ''
                }`}
            >
                {ReactHtmlParser(description)}
            </div>
        )
    }
    return null
}

export function islabelHidden(label) {
    return label === 'hidden_label' ? true : false
}

export function ifDefaultValue(field) {
    //TODO: My emty default vaules are "" ? that doesn't seem helpful
    return field['defaultValue'] !== 'undefined' ? field['defaultValue'] : false
}

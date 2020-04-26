import classnames from 'classnames'
import PropTypes from 'prop-types'
import React from 'react'
import { outputDescription } from '../../utils/inputSettings'

const InputWrapper = ({
    children,
    errors,
    inputData: {
        cssClass,
        description,
        descriptionPlacement,
        isRequired,
        label,
        maxLength,
        type,
    },
    labelFor,
    wrapClassName,
    wrapId,
}) => {
    return (
        <li
            className={classnames(
                wrapClassName,
                errors && 'gravityform__field--error',
                cssClass
            )}
            id={wrapId}
        >
            <label
                className="gravityform__label gfield_label"
                htmlFor={labelFor}
            >
                {label}
                {isRequired && <span className="gfield_required">*</span>}
            </label>
            {outputDescription(
                description,
                descriptionPlacement,
                'above',
                errors
            )}
            <div className={`ginput_container ginput_container_${type}`}>
                {children}
                {maxLength > 0 && (
                    <div className="charleft ginput_counter warningTextareaInfo">
                        {maxLengthSentence(maxLength, type)}
                    </div>
                )}
                {/* TODO: Implement number min/max, these currently aren't fetch by the source plugin
                    https://docs.gravityforms.com/field-object/#number
                    <div class="instruction ">
                      Please enter a number from <strong>1</strong> to <strong>15</strong>.
                    </div>
                */}
            </div>
            {outputDescription(
                description,
                descriptionPlacement,
                'below',
                errors
            )}
            {errors && (
                <div
                    aria-live="polite"
                    className="gravityform__error_message gfield_description validation_message"
                >
                    {errors.message}
                </div>
            )}
        </li>
    )
}

const maxLengthSentence = (length, type) => {
    let word = type === 'number' ? 'numbers' : 'characters'
    return length && ` (maxiumum ${length} ${word})`
}

export default InputWrapper

InputWrapper.propTypes = {
    children: PropTypes.node,
    errors: PropTypes.object,
    inputData: PropTypes.shape({
        description: PropTypes.string,
        descriptionPlacement: PropTypes.string,
        label: PropTypes.string,
        isRequired: PropTypes.bool,
        maxLength: PropTypes.number,
        type: PropTypes.string,
        cssClass: PropTypes.string,
    }),
    labelFor: PropTypes.string,
    wrapClassName: PropTypes.string,
    wrapId: PropTypes.string,
}

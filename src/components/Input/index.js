import classnames from 'classnames'
import PropTypes from 'prop-types'
import React from 'react'
import { outputDescription } from '../../utils/inputSettings'
import strings from '../../utils/strings'

const Input = ({
    name,
    label,
    className,
    wrapClassName,
    inputMaskValue,
    errors,
    type,
    placeholder,
    value,
    register,
    required,
    maxLength,
    description,
    descriptionPlacement,
}) => {
    const regex = inputMaskValue ? new RegExp(inputMaskValue) : false

    return (
        <div
            className={classnames(
                wrapClassName,
                errors && 'gravityform__field--error'
            )}
        >
            <label className="gravityform__label" htmlFor={name}>
                {label}
                {maxLength > 0 && maxLengthSentence(maxLength, type)}
            </label>
            {outputDescription(description, descriptionPlacement, 'above')}
            <input
                className={classnames(
                    'gravityform__field__input',
                    `gravityform__field__input__${type}`,
                    className
                )}
                defaultValue={value}
                id={name}
                maxLength={maxLength > 0 ? maxLength : undefined}
                name={name}
                placeholder={placeholder}
                ref={register({
                    required: required && errors.required,
                    maxlength: {
                        value: maxLength > 0 && maxLength,
                        message:
                            maxLength > 0 &&
                            `${strings.errors.maxChar.front}  ${maxLength} ${strings.errors.maxChar.back}`,
                    },
                    pattern: {
                        value: regex,
                        message: regex && strings.errors.pattern,
                    },
                })}
                type={type}
            />
            {outputDescription(description, descriptionPlacement, 'below')}
            {errors && (
                <div className="gravityform__error_message">
                    {errors.message}
                </div>
            )}
        </div>
    )
}

export default Input

const maxLengthSentence = (length, type) => {
    let word = type === 'number' ? 'numbers' : 'characters'
    return length && ` (maxiumum ${length} ${word})`
}

Input.propTypes = {
    className: PropTypes.string,
    description: PropTypes.string,
    descriptionPlacement: PropTypes.string,
    errors: PropTypes.object,
    inputMaskValue: PropTypes.string,
    label: PropTypes.string,
    maxLength: PropTypes.int,
    name: PropTypes.string,
    placeholder: PropTypes.string,
    register: PropTypes.func,
    required: PropTypes.bool,
    type: PropTypes.string,
    value: PropTypes.string,
    wrapClassName: PropTypes.string,
}

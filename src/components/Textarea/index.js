import classnames from 'classnames'
import PropTypes from 'prop-types'
import React from 'react'
import { outputDescription } from '../../utils/inputSettings'
import strings from '../../utils/strings'

const Textarea = ({
    className,
    description,
    descriptionPlacement,
    errors,
    inputMaskValue,
    label,
    maxLength,
    name,
    placeholder,
    register,
    required,
    type,
    value,
    wrapClassName,
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
                {maxLength > 0 && `(maxiumum ${maxLength} characters)`}
            </label>
            {outputDescription(description, descriptionPlacement, 'above')}
            <textarea
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
                    required: required && strings.errors.required,
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

export default Textarea

Textarea.propTypes = {
    className: PropTypes.string,
    description: PropTypes.string,
    descriptionPlacement: PropTypes.string,
    errors: PropTypes.obj,
    inputMaskValue: PropTypes.string,
    label: PropTypes.string,
    maxLength: PropTypes.string,
    name: PropTypes.string,
    placeholder: PropTypes.string,
    register: PropTypes.func,
    required: PropTypes.bool,
    type: PropTypes.string,
    value: PropTypes.string,
    wrapClassName: PropTypes.string,
}

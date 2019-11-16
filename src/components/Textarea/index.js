import classnames from 'classnames'
import PropTypes from 'prop-types'
import React from 'react'
import { outputDescription } from '../../utils/inputSettings'
import strings from '../../utils/strings'

const Textarea = ({
    name,
    label,
    wrapClassName,
    className,
    errors,
    inputMaskValue,
    register,
    type,
    value,
    placeholder,
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
            <label htmlFor={name} className="gravityform__label">
                {label}
                {maxLength > 0 && `(maxiumum ${maxLength} characters)`}
            </label>
            {outputDescription(description, descriptionPlacement, 'above')}
            <textarea
                id={name}
                type={type}
                className={classnames(
                    'gravityform__field__input',
                    `gravityform__field__input__${type}`,
                    className
                )}
                maxLength={maxLength > 0 ? maxLength : undefined}
                name={name}
                defaultValue={value}
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
    name: PropTypes.string,
    label: PropTypes.string,
    wrapClassName: PropTypes.string,
    value: PropTypes.string,
    placeholder: PropTypes.string,
    className: PropTypes.string,
    errors: PropTypes.obj,
    description: PropTypes.string,
    descriptionPlacement: PropTypes.string,
    inputMaskValue: PropTypes.string,
    maxLength: PropTypes.string,
    type: PropTypes.string,
    register: PropTypes.func,
    required: PropTypes.bool,
}

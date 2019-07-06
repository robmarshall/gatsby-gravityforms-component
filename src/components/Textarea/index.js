import React from 'react'
import classnames from 'classnames'
import { outputDescription } from '../../utils/inputSettings'
import strings from '../../utils/strings'

const Textarea = props => {
    const regex = props.inputMaskValue
        ? new RegExp(props.inputMaskValue)
        : false

    return (
        <div
            className={classnames(
                props.wrapClassName,
                props.errors && 'gravityform__field--error'
            )}
        >
            <label htmlFor={props.name} className="gravityform__label">
                {props.label}
                {props.maxLength > 0 &&
                    `(maxiumum ${props.maxLength} characters)`}
            </label>
            {outputDescription(
                props.description,
                props.descriptionPlacement,
                'above'
            )}
            <textarea
                id={props.name}
                type={props.type}
                className={classnames(
                    'gravityform__field__input',
                    `gravityform__field__input__${props.type}`,
                    props.className
                )}
                maxLength={props.maxLength > 0 ? props.maxLength : undefined}
                name={props.name}
                defaultValue={props.value}
                placeholder={props.placeholder}
                ref={props.register({
                    required: props.required && strings.errors.required,
                    maxlength: {
                        value: props.maxLength > 0 && props.maxLength,
                        message:
                            props.maxLength > 0 &&
                            `${strings.errors.maxChar.front}  ${
                                props.maxLength
                            } ${strings.errors.maxChar.back}`,
                    },
                    pattern: {
                        value: regex,
                        message: regex && strings.errors.pattern,
                    },
                })}
            />
            {outputDescription(
                props.description,
                props.descriptionPlacement,
                'below'
            )}
            {props.errors && (
                <div className="gravityform__error_message">
                    {props.errors.message}
                </div>
            )}
        </div>
    )
}

export default Textarea

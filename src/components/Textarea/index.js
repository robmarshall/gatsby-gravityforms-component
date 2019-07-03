import React from 'react'
import classnames from 'classnames'
import { manageSingleErrors } from '../../utils/manageErrors'
import strings from '../../utils/strings'

const Textarea = props => {
    const regex = props.inputMaskValue
        ? new RegExp(props.inputMaskValue)
        : false

    return (
        <div className={props.wrapClassName}>
            <label htmlFor={props.name} className="gravityform__label">
                {props.label}
                {props.maxLength > 0 &&
                    `(maxiumum ${props.maxLength} characters)`}
            </label>
            <textarea
                id={props.name}
                type={props.type}
                className={classnames(
                    'gravityform__field__input',
                    `gravityform__field__input__${props.type}`,
                    props.className
                )}
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
            {props.errors && (
                <div class="gravityform__error">
                    {manageSingleErrors(props.errors, props.customErrorMessage)}
                </div>
            )}
        </div>
    )
}

export default Textarea

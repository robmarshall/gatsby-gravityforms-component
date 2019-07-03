import React from 'react'
import classnames from 'classnames'
import { manageSingleErrors } from '../../utils/manageErrors'
import { outputDescription } from '../../utils/inputSettings'
import strings from '../../utils/strings'

const Input = props => {
    const regex = props.inputMaskValue
        ? new RegExp(props.inputMaskValue)
        : false

    return (
        <div className={props.wrapClassName}>
            <label htmlFor={props.name} className="gravityform__label">
                {props.label}
                {props.maxLength > 0 &&
                    maxLengthSentence(props.maxLength, props.type)}
            </label>
            {outputDescription(
                props.description,
                props.descriptionPlacement,
                'above'
            )}
            <input
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
                <div class="gravityform__error">
                    {manageSingleErrors(props.errors, props.customErrorMessage)}
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

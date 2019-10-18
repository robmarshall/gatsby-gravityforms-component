import classnames from 'classnames'
import React from 'react'
import { outputDescription } from '../../utils/inputSettings'
import strings from '../../utils/strings'

const Radio = ({
    name,
    label,
    errors,
    options,
    wrapClassName,
    className,
    register,
    required,
    description,
    descriptionPlacement,
}) => {
    return (
        <div
            className={classnames(
                wrapClassName,
                errors && 'gravityform__field--error'
            )}
        >
            <legend>{label}</legend>
            {outputDescription(description, descriptionPlacement, 'above')}
            {options.map((choice, index) => {
                const choiceID = index + 1
                return (
                    <div key={`${name}-${choiceID}`}>
                        <input
                            type="radio"
                            id={`${name}_${choiceID}`}
                            className={classnames(
                                'gravityform__field__input__radio',
                                'gravityform__field__input__radio--' + choiceID,
                                className
                            )}
                            name={`${name}`}
                            value={choice.value}
                            defaultChecked={choice.isSelected}
                            ref={register({
                                required: required && strings.errors.required,
                            })}
                        />
                        <label htmlFor={`${name}_${choiceID}`}>
                            {choice.text}
                        </label>
                    </div>
                )
            })}
            {outputDescription(description, descriptionPlacement, 'below')}
            {errors && (
                <div className="gravityform__error_message">
                    {errors.message}
                </div>
            )}
        </div>
    )
}

export default Radio

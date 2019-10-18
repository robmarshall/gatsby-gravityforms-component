import classnames from 'classnames'
import React from 'react'
import ReactHtmlParser from 'react-html-parser'
import { outputDescription } from '../../utils/inputSettings'
import strings from '../../utils/strings'

const Checkbox = ({
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
                    <div key={`${name}-${index + 1}`}>
                        <input
                            type="checkbox"
                            id={`${name}_${choiceID}`}
                            className={classnames(
                                'gravityform__field__input__checkbox',
                                'gravityform__field__input__checkbox--' +
                                    choiceID,
                                className
                            )}
                            name={`${name}_${choiceID}`}
                            value={choice.value}
                            defaultChecked={choice.isSelected}
                            ref={register({
                                required: required && strings.errors.required,
                            })}
                        />
                        <label htmlFor={`${name}_${choiceID}`}>
                            {ReactHtmlParser(choice.text)}
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

export default Checkbox

import classnames from 'classnames'
import PropTypes from 'prop-types'
import React from 'react'
import { outputDescription } from '../../utils/inputSettings'
import strings from '../../utils/strings'

const Radio = ({
    className,
    description,
    descriptionPlacement,
    errors,
    label,
    name,
    options,
    register,
    required,
    wrapClassName,
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
                            className={classnames(
                                'gravityform__field__input__radio',
                                'gravityform__field__input__radio--' + choiceID,
                                className
                            )}
                            defaultChecked={choice.isSelected}
                            id={`${name}_${choiceID}`}
                            name={`${name}`}
                            ref={register({
                                required: required && strings.errors.required,
                            })}
                            type="radio"
                            value={choice.value}
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

Radio.propTypes = {
    className: PropTypes.string,
    description: PropTypes.string,
    descriptionPlacement: PropTypes.string,
    errors: PropTypes.array,
    label: PropTypes.string,
    name: PropTypes.string,
    options: PropTypes.array,
    register: PropTypes.func,
    required: PropTypes.bool,
    wrapClassName: PropTypes.string,
}

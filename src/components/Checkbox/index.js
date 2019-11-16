import classnames from 'classnames'
import PropTypes from 'prop-types'
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
                            className={classnames(
                                'gravityform__field__input__checkbox',
                                'gravityform__field__input__checkbox--' +
                                    choiceID,
                                className
                            )}
                            defaultChecked={choice.isSelected}
                            id={`${name}_${choiceID}`}
                            name={`${name}_${choiceID}`}
                            ref={register({
                                required: required && strings.errors.required,
                            })}
                            type="checkbox"
                            value={choice.value}
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

Checkbox.propTypes = {
    className: PropTypes.string,
    description: PropTypes.string,
    descriptionPlacement: PropTypes.string,
    errors: PropTypes.object,
    label: PropTypes.string,
    name: PropTypes.string,
    options: PropTypes.array,
    register: PropTypes.func,
    required: PropTypes.bool,
    wrapClassName: PropTypes.string,
}

import classnames from 'classnames'
import PropTypes from 'prop-types'
import React from 'react'
import { outputDescription } from '../../utils/inputSettings'

const Select = ({
    name,
    label,
    options,
    wrapClassName,
    className,
    register,
    required,
    description,
    descriptionPlacement,
    handleChange,
}) => {
    return (
        <div className={wrapClassName}>
            <label htmlFor={name} className="gravityform__label">
                {label}
            </label>
            {outputDescription(description, descriptionPlacement, 'above')}
            <select
                id={name}
                name={name}
                className={classnames(
                    'gravityform__field__input',
                    'gravityform__field__input__select',
                    className
                )}
                ref={register({
                    required: required && 'This field is required',
                })}
                onChange={handleChange}
            >
                {options.map((choice, index) => {
                    return (
                        <option
                            key={`${name}-${index}`}
                            value={choice.value}
                            defaultValue={choice.isSelected}
                        >
                            {choice.text}
                        </option>
                    )
                })}
            </select>
            {outputDescription(description, descriptionPlacement, 'below')}
        </div>
    )
}

export default Select

Select.propTypes = {
    name: PropTypes.string,
    label: PropTypes.string,
    description: PropTypes.string,
    descriptionPlacement: PropTypes.string,
    className: PropTypes.string,
    wrapClassName: PropTypes.string,
    options: PropTypes.array,
    register: PropTypes.func,
    required: PropTypes.bool,
    handleChange: PropTypes.func,
}

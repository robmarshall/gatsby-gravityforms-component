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
            <label className="gravityform__label" htmlFor={name}>
                {label}
            </label>
            {outputDescription(description, descriptionPlacement, 'above')}
            <select
                className={classnames(
                    'gravityform__field__input',
                    'gravityform__field__input__select',
                    className
                )}
                id={name}
                name={name}
                onChange={handleChange}
                ref={register({
                    required: required && 'This field is required',
                })}
            >
                {options.map((choice, index) => {
                    return (
                        <option
                            defaultValue={choice.isSelected}
                            key={`${name}-${index}`}
                            value={choice.value}
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
    className: PropTypes.string,
    description: PropTypes.string,
    descriptionPlacement: PropTypes.string,
    handleChange: PropTypes.func,
    label: PropTypes.string,
    name: PropTypes.string,
    options: PropTypes.array,
    register: PropTypes.func,
    required: PropTypes.bool,
    wrapClassName: PropTypes.string,
}

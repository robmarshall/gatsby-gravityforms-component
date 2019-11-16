import classnames from 'classnames'
import PropTypes from 'prop-types'
import React from 'react'
import { outputDescription } from '../../utils/inputSettings'

const Multiselect = ({
    id,
    name,
    label,
    description,
    descriptionPlacement,
    className,
    options,
    wrapClassName,
    required,
    register,
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
                    'gravityform__field__input__select',
                    className
                )}
                ref={register({
                    required: required,
                })}
                onChange={handleChange}
            >
                {options.map((choice, index) => {
                    return (
                        <option
                            key={`${id}_${index}`}
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

export default Multiselect

Multiselect.propTypes = {
    id: PropTypes.string,
    name: PropTypes.string,
    label: PropTypes.string,
    description: PropTypes.string,
    descriptionPlacement: PropTypes.string,
    className: PropTypes.string,
    options: PropTypes.array,
    wrapClassName: PropTypes.string,
    register: PropTypes.func,
    required: PropTypes.bool,
    handleChange: PropTypes.func,
}

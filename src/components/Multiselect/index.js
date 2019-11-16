import classnames from 'classnames'
import PropTypes from 'prop-types'
import React from 'react'
import { outputDescription } from '../../utils/inputSettings'

const Multiselect = ({
    className,
    description,
    descriptionPlacement,
    handleChange,
    id,
    label,
    name,
    options,
    register,
    required,
    wrapClassName,
}) => {
    return (
        <div className={wrapClassName}>
            <label className="gravityform__label" htmlFor={name}>
                {label}
            </label>
            {outputDescription(description, descriptionPlacement, 'above')}
            <select
                className={classnames(
                    'gravityform__field__input__select',
                    className
                )}
                id={name}
                name={name}
                onChange={handleChange}
                ref={register({
                    required: required,
                })}
            >
                {options.map((choice, index) => {
                    return (
                        <option
                            defaultValue={choice.isSelected}
                            key={`${id}_${index}`}
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

export default Multiselect

Multiselect.propTypes = {
    className: PropTypes.string,
    description: PropTypes.string,
    descriptionPlacement: PropTypes.string,
    handleChange: PropTypes.func,
    id: PropTypes.string,
    label: PropTypes.string,
    name: PropTypes.string,
    options: PropTypes.array,
    register: PropTypes.func,
    required: PropTypes.bool,
    wrapClassName: PropTypes.string,
}

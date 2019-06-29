import React from 'react'
import classnames from 'classnames'

const Radio = ({
    name,
    label,
    options,
    wrapClassName,
    className,
    register,
}) => {
    return (
        <div className={wrapClassName}>
            <legend>{label}</legend>
            {options.map((choice, index) => {
                return (
                    <div key={`${name}-${index}`}>
                        <input
                            type="radio"
                            id={`field-${name}-${index}`}
                            className={classnames(
                                'gravityform__checkbox',
                                'gravityform__checkbox--' + index,
                                className
                            )}
                            name={`field-${name}`}
                            value={choice.value}
                            defaultChecked={choice.isSelected}
                            ref={register}
                        />
                        <label htmlFor={`field-${name}-${index}`}>
                            {choice.text}
                        </label>
                    </div>
                )
            })}
        </div>
    )
}

export default Radio

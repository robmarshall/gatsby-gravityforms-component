import React from 'react'
import classnames from 'classnames'

const Checkbox = ({
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
                            type="checkbox"
                            id={`field-${name}-${index}`}
                            className={classnames(
                                'gravityform__checkbox',
                                'gravityform__checkbox--' + index,
                                className
                            )}
                            name={`field-${name}-${index}`}
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

export default Checkbox

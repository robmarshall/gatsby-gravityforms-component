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
                            ref={register}
                        />
                        <label htmlFor={`${name}_${choiceID}`}>
                            {choice.text}
                        </label>
                    </div>
                )
            })}
        </div>
    )
}

export default Checkbox

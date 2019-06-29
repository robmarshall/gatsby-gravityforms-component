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
                const choiceID = index + 1
                return (
                    <div key={`${name}-${choiceID}`}>
                        <input
                            type="radio"
                            id={`${name}-${choiceID}`}
                            className={classnames(
                                'gravityform__radio',
                                'gravityform__radio--' + choiceID,
                                className
                            )}
                            name={`${name}`}
                            value={choice.value}
                            defaultChecked={choice.isSelected}
                            ref={register}
                        />
                        <label htmlFor={`${name}-${choiceID}`}>
                            {choice.text}
                        </label>
                    </div>
                )
            })}
        </div>
    )
}

export default Radio

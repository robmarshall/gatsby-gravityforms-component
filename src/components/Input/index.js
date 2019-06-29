import React from 'react'
import classnames from 'classnames'

const Input = props => {
    console.log('here')
    return (
        <div className={props.wrapClassName}>
            <label htmlFor={props.name} className="gravityform__label">
                {props.label}
            </label>
            <input
                id={props.name}
                type={props.type}
                className={classnames('gravityform__input', props.className)}
                name={props.name}
                defaultValue={props.value}
                placeholder={props.placeholder}
                ref={props.register({
                    required: props.required,
                    maxlength: props.maxLength,
                })}
            />
        </div>
    )
}

export default Input

import React from 'react'
import classnames from 'classnames'

const Textarea = props => {
    const regex = props.inputMaskValue
        ? new RegExp(props.inputMaskValue)
        : false

    return (
        <div className={props.wrapClassName}>
            <label htmlFor={props.name} className="gravityform__label">
                {props.label}
            </label>
            <textarea
                id={props.name}
                type={props.type}
                className={classnames('gravityform__input', props.className)}
                name={props.name}
                defaultValue={props.value}
                placeholder={props.placeholder}
                ref={props.register({
                    required: props.isRequired,
                    maxlength: props.maxLength,
                    pattern: regex,
                })}
            />
        </div>
    )
}

export default Textarea

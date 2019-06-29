import React from 'react'
import classnames from 'classnames'

const Checkbox = props => {
    return (
        <div className={props.wrapClassName}>
            <legend>{props.label}</legend>
            {props.options.map((choice, index) => {
                return (
                    <div key={`${props.name}-${index}`}>
                        <input
                            type="checkbox"
                            id={`field-${props.name}-${index}`}
                            className={classnames(
                                'gravityform__checkbox',
                                props.className
                            )}
                            name={`field-${props.name}`}
                            value={props.text}
                            checked={props.isSelected}
                            ref={props.register()}
                        />
                        <label htmlFor={`field-${props.id}-${index}`}>
                            {choice.text}
                        </label>
                    </div>
                )
            })}
        </div>
    )
}

export default Checkbox

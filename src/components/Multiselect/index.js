import React from 'react'
import classnames from 'classnames'
import { outputDescription } from '../../utils/inputSettings'

const Multiselect = props => {
    return (
        <div className={props.wrapClassName}>
            <label htmlFor={props.name} className="gravityform__label">
                {props.label}
            </label>
            {outputDescription(
                props.description,
                props.descriptionPlacement,
                'above'
            )}
            <select
                id={props.name}
                name={props.name}
                className={classnames(
                    'gravityform__field__input__select',
                    props.className
                )}
                ref={props.register({
                    required: props.required,
                })}
                onChange={props.handleChange}
            >
                {props.options.map((choice, index) => {
                    return (
                        <option
                            key={`${props.id}_${index}`}
                            value={choice.value}
                            defaultValue={choice.isSelected}
                        >
                            {choice.text}
                        </option>
                    )
                })}
            </select>
            {outputDescription(
                props.description,
                props.descriptionPlacement,
                'below'
            )}
        </div>
    )
}

export default Multiselect

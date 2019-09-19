import React from 'react'
import classnames from 'classnames'
import ReactHtmlParser from 'react-html-parser'
import { outputDescription } from '../../utils/inputSettings'

const Checkbox = ({
    name,
    label,
    options,
    wrapClassName,
    className,
    register,
    description,
    descriptionPlacement,
}) => {
    return (
        <div className={wrapClassName}>
            <legend>{label}</legend>
            {outputDescription(description, descriptionPlacement, 'above')}
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
                            ReactHtmlParser(choice.text)
                        </label>
                    </div>
                )
            })}
            {outputDescription(description, descriptionPlacement, 'below')}
        </div>
    )
}

export default Checkbox

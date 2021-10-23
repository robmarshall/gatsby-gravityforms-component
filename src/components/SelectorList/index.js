import classnames from 'classnames'
import PropTypes from 'prop-types'
import React from 'react'
import { useFormContext } from 'react-hook-form'
import { filteredKeys } from '../../utils/helpers'
import strings from '../../utils/strings'
import InputWrapper from '../InputWrapper'

// TODO: Enable Select All Choice
const SelectorList = ({ fieldData, name, ...wrapProps }) => {
    const { choices, cssClass, isRequired, size, type } = fieldData
    const options = JSON.parse(choices)

    const { register, errors } = useFormContext()

    const errorKey = filteredKeys(errors, RegExp(`input_${field.id}_`))

    return (
        <InputWrapper
            errors={errorKey.length > 0 ? errors[errorKey[0]] : null}
            inputData={fieldData}
            labelFor={name}
            {...wrapProps}
        >
            <ul className={`gfield_${type}`} id={name}>
                {options.map(({ isSelected, text, value }, index) => {
                    const choiceID = index + 1
                    return (
                        <li key={`${name}-${index + 1}`}>
                            <input
                                className={classnames(
                                    `gravityform__field__input__${type}`,
                                    `gravityform__field__input__${type}--` +
                                        choiceID,
                                    cssClass,
                                    size
                                )}
                                defaultChecked={isSelected}
                                id={`${name}_${choiceID}`}
                                name={`${name}${
                                    type === 'checkbox' ? `.${choiceID}` : ''
                                }`}
                                ref={register({
                                    required:
                                        isRequired && strings.errors.required,
                                })}
                                type={type}
                                value={value}
                            />
                            &nbsp;
                            <label
                                htmlFor={`${name}_${choiceID}`}
                                dangerouslySetInnerHTML={{ __html: text }}
                            />
                        </li>
                    )
                })}
            </ul>
        </InputWrapper>
    )
}

export default SelectorList

SelectorList.propTypes = {
    fieldData: PropTypes.shape({
        choices: PropTypes.string,
        cssClass: PropTypes.string,
        id: PropTypes.number,
        isRequired: PropTypes.bool,
        size: PropTypes.string,
        type: PropTypes.string,
    }),
    name: PropTypes.string,
    wrapProps: PropTypes.object,
}

import classnames from 'classnames'
import PropTypes from 'prop-types'
import React from 'react'
import InputWrapper from '../../components/InputWrapper'

const Select = ({ errors, fieldData, name, register, ...wrapProps }) => {
    const { choices, cssClass, isRequired, size } = fieldData
    const options = JSON.parse(choices)
    return (
        <InputWrapper
            errors={errors}
            inputData={fieldData}
            labelFor={name}
            {...wrapProps}
        >
            <select
                aria-invalid={errors}
                aria-required={isRequired}
                //TODO: GF uses select2 library and classes, need to figure out how to handle here if we're mimicing their functionality
                className={classnames(
                    'gravityform__field__input',
                    'gravityform__field__input__select',
                    'gfield_select',
                    cssClass,
                    size
                )}
                id={name}
                name={name}
                ref={register({
                    required: isRequired && 'This field is required',
                })}
            >
                {options.map(({ isSelected, text, value }, index) => {
                    return (
                        <option
                            defaultValue={isSelected}
                            key={`${name}-${index}`}
                            value={value}
                        >
                            {text}
                        </option>
                    )
                })}
            </select>
        </InputWrapper>
    )
}

export default Select

Select.propTypes = {
    errors: PropTypes.object,
    fieldData: PropTypes.shape({
        choices: PropTypes.string,
        cssClass: PropTypes.string,
        isRequired: PropTypes.bool,
        size: PropTypes.string,
    }),
    name: PropTypes.string,
    register: PropTypes.func,
    wrapProps: PropTypes.object,
}

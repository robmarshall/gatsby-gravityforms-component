import classnames from 'classnames'
import PropTypes from 'prop-types'
import React from 'react'
import InputWrapper from '../../components/InputWrapper'

const Multiselect = ({ errors, fieldData, name, register, ...wrapProps }) => {
    const { choices, cssClass, id, isRequired, size } = fieldData
    const options = JSON.parse(choices)
    return (
        <InputWrapper
            errors={errors}
            inputData={fieldData}
            labelFor={name}
            {...wrapProps}
        >
            <select
                //TODO: GF uses select2 library and classes, need to figure out how to handle here if we're mimicing their functionality
                className={classnames(
                    'gravityform__field__input__select',
                    'gfield_select',
                    cssClass,
                    size
                )}
                id={name}
                multiple={true}
                name={name}
                ref={register({
                    required: isRequired,
                })}
            >
                {options.map(({ isSelected, text, value }, index) => {
                    return (
                        <option
                            defaultValue={isSelected}
                            key={`${id}_${index}`}
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

export default Multiselect

Multiselect.propTypes = {
    errors: PropTypes.object,
    fieldData: PropTypes.shape({
        cssClass: PropTypes.string,
        id: PropTypes.number,
        choices: PropTypes.string,
        size: PropTypes.string,
        isRequired: PropTypes.bool,
    }),
    name: PropTypes.string,
    register: PropTypes.func,
    wrapProps: PropTypes.object,
}

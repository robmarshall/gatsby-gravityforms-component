import classnames from 'classnames'
import PropTypes from 'prop-types'
import React from 'react'
import strings from '../../utils/strings'
import InputWrapper from '../InputWrapper'

const standardType = (type) => {
  switch (type) {
    case 'phone':
      return 'tel'
    case 'fileupload':
      return 'file'
    default:
      return type
  }
}

const Input = ({ errors, fieldData, name, register, value, ...wrapProps }) => {
    const {
        cssClass,
        inputMaskValue,
        isRequired,
        maxLength,
        placeholder,
        size,
        type,
    } = fieldData
    const regex = inputMaskValue ? new RegExp(inputMaskValue) : false
    let inputType = standardType(type)
    return (
        <InputWrapper
            errors={errors}
            inputData={fieldData}
            labelFor={name}
            {...wrapProps}
        >
            <input
                aria-invalid={errors}
                aria-required={isRequired}
                className={classnames(
                    'gravityform__field__input',
                    `gravityform__field__input__${type}`,
                    cssClass,
                    size
                )}
                defaultValue={value}
                id={name}
                maxLength={maxLength || 524288} // 524288 = 512kb, avoids invalid prop type error if maxLength is undefined.
                name={name}
                placeholder={placeholder}
                ref={register({
                    required: isRequired && strings.errors.required,
                    maxlength: {
                        value: maxLength > 0 && maxLength,
                        message:
                            maxLength > 0 &&
                            `${strings.errors.maxChar.front}  ${maxLength} ${strings.errors.maxChar.back}`,
                    },
                    pattern: {
                        value: regex,
                        message: regex && strings.errors.pattern,
                    },
                })}
                type={inputType}
            />
        </InputWrapper>
    )
}

export default Input

Input.propTypes = {
    errors: PropTypes.object,
    fieldData: PropTypes.shape({
        cssClass: PropTypes.string,
        inputMaskValue: PropTypes.string,
        maxLength: PropTypes.number,
        placeholder: PropTypes.string,
        isRequired: PropTypes.bool,
        type: PropTypes.string,
        size: PropTypes.string,
    }),
    name: PropTypes.string,
    register: PropTypes.func,
    value: PropTypes.string,
    wrapProps: PropTypes.object,
}

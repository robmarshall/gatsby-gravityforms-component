import classnames from 'classnames'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'
import React from 'react'
import { useFormContext } from 'react-hook-form'
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

const Input = ({ fieldData, name, value, ...wrapProps }) => {
    const {
        cssClass,
        defaultValue,
        inputMaskValue,
        isRequired,
        maxLength,
        placeholder,
        size,
        type,
    } = fieldData

    const regex = inputMaskValue ? new RegExp(inputMaskValue) : false
    let inputType = standardType(type)

    const { register, errors } = useFormContext()

    return (
        <InputWrapper
            errors={errors[name]}
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
                defaultValue={value || defaultValue}
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
    fieldData: PropTypes.shape({
        cssClass: PropTypes.string,
        inputMaskValue: PropTypes.string,
        maxLength: PropTypes.number,
        placeholder: PropTypes.string,
        isRequired: PropTypes.bool,
        defaultValue: PropTypes.string,
        type: PropTypes.string,
        size: PropTypes.string,
    }),
    value: PropTypes.string,
    name: PropTypes.string,
    wrapProps: PropTypes.object,
}

export const TextField = graphql`
    fragment TextField on WpTextField {
        id
        cssClass
        errorMessage
        defaultValue
        description
        descriptionPlacement
        visibility
        value
        type
        size
        placeholder
        pageNumber
        noDuplicates
        maxLength
        layoutSpacerGridColumnSpan
        layoutGridColumnSpan
        label
        inputName
        isRequired
        formId
        enablePasswordInput
        enableAutocomplete
        autocompleteAttribute
        allowsPrepopulate
        adminOnly
        adminLabel
        conditionalLogic {
            actionType
            logicType
            rules {
                fieldId
                operator
                value
            }
        }
    }
`

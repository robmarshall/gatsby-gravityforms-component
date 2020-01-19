import classnames from 'classnames'
import PropTypes from 'prop-types'
import React from 'react'
import InputWrapper from '../../components/InputWrapper'
import strings from '../../utils/strings'

const Textarea = ({
    errors,
    fieldData,
    name,
    register,
    value,
    wrapClassName,
    wrapId,
}) => {
    const {
        cssClass,
        description,
        descriptionPlacement,
        inputMaskValue,
        isRequired,
        label,
        maxLength,
        placeholder,
        size,
        type,
    } = fieldData
    const regex = inputMaskValue ? new RegExp(inputMaskValue) : false

    return (
        <InputWrapper
            errors={errors}
            inputData={fieldData}
            labelFor={name}
            wrapClassName={wrapClassName}
            wrapId={wrapId}
        >
            <textarea
                aria-invalid={errors}
                aris-required={isRequired}
                className={classnames(
                    'gravityform__field__input',
                    `gravityform__field__input__${type}`,
                    cssClass,
                    size,
                    'textarea'
                )}
                defaultValue={value}
                id={name}
                maxLength={maxLength > 0 ? maxLength : undefined}
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
                type={type}
            />
        </InputWrapper>
    )
}

export default Textarea

Textarea.propTypes = {
    errors: PropTypes.object,
    fieldData: PropTypes.shape({
        cssClass: PropTypes.string,
        description: PropTypes.string,
        inputMaskValue: PropTypes.string,
        label: PropTypes.string,
        descriptionPlacement: PropTypes.string,
        maxLength: PropTypes.int,
        placeholder: PropTypes.string,
        isRequired: PropTypes.bool,
        type: PropTypes.string,
        size: PropTypes.string,
    }),
    name: PropTypes.string,
    register: PropTypes.func,
    value: PropTypes.string,
    wrapClassName: PropTypes.string,
    wrapId: PropTypes.string,
}

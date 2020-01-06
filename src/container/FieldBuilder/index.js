import classnames from 'classnames'
import _ from 'lodash'
import React from 'react'

import Captcha from '../../components/Captcha'
import Checkbox from '../../components/Checkbox'
import Html from '../../components/Html'
import Input from '../../components/Input'
import Multiselect from '../../components/Multiselect'
import Radio from '../../components/Radio'
import Select from '../../components/Select'
import Textarea from '../../components/Textarea'
import { filteredKeys } from '../../utils/helpers'
import {
    getPlacement,
    ifDefaultValue,
    islabelHidden,
} from '../../utils/inputSettings'

const FieldBuilder = ({
    errors,
    formData,
    presetValues = {},
    register,
    setValue,
}) => {
    // The top level settings for the whole form
    const formSettings = {
        descriptionPlacement: formData.descriptionPlacement,
    }

    // Loop through fields and create
    return formData.formFields.map(field => {
        // Set the wrapper classes
        let inputWrapperClass = classnames(
            'gravityform__field',
            'gravityform__field__' + field.type,
            'gravityform__field--' + field.size,
            field.cssClass,
            { 'field-required': field.isRequired },
            { 'hidden-label': islabelHidden(field.labelPlacement) }
        )

        let errorKey = ''

        switch (field.type) {
            // Add note for unsupported captcha field
            case 'captcha':
                return (
                    <Captcha
                        captchaTheme={field.captchaTheme}
                        errors={errors[`input_${field.id}`]}
                        key={field.id}
                        register={register}
                        setValue={setValue}
                        wrapClassName={inputWrapperClass}
                    />
                )
            // Start with the standard fields
            case 'text':
            case 'email':
            case 'phone':
                return (
                    <Input
                        className={field.cssClass}
                        description={field.description}
                        descriptionPlacement={getPlacement(
                            formSettings.descriptionPlacement,
                            field.descriptionPlacement
                        )}
                        errors={errors[`input_${field.id}`]}
                        inputMaskValue={field.inputMaskValue}
                        key={field.id}
                        label={field.label}
                        maxLength={field.maxLength}
                        name={`input_${field.id}`}
                        placeholder={field.placeholder}
                        register={register}
                        required={field.isRequired}
                        type={field.type}
                        value={
                            _.get(presetValues, `input_${field.id}`, false)
                                ? _.get(
                                      presetValues,
                                      `input_${field.id}`,
                                      false
                                  )
                                : ifDefaultValue(field)
                        }
                        wrapClassName={inputWrapperClass}
                    />
                )
            case 'textarea':
                return (
                    <Textarea
                        className={field.cssClass}
                        description={field.description}
                        descriptionPlacement={getPlacement(
                            formSettings.descriptionPlacement,
                            field.descriptionPlacement
                        )}
                        errors={errors[`input_${field.id}`]}
                        inputMaskValue={field.inputMaskValue}
                        key={field.id}
                        label={field.label}
                        maxLength={field.maxLength}
                        name={`input_${field.id}`}
                        placeholder={field.placeholder}
                        register={register}
                        required={field.isRequired}
                        type={field.type}
                        value={
                            _.get(presetValues, `input_${field.id}`, false)
                                ? _.get(
                                      presetValues,
                                      `input_${field.id}`,
                                      false
                                  )
                                : ifDefaultValue(field)
                        }
                        wrapClassName={inputWrapperClass}
                    />
                )
            case 'select':
                return (
                    <Select
                        className={field.cssClass}
                        description={field.description}
                        descriptionPlacement={getPlacement(
                            formSettings.descriptionPlacement,
                            field.descriptionPlacement
                        )}
                        errors={errors[`input_${field.id}`]}
                        key={field.id}
                        label={field.label}
                        name={`input_${field.id}`}
                        options={JSON.parse(field.choices)}
                        register={register}
                        required={field.isRequired}
                        value={ifDefaultValue(field)}
                        wrapClassName={inputWrapperClass}
                    />
                )
            case 'multiselect':
                return (
                    <Multiselect
                        className={field.cssClass}
                        description={field.description}
                        descriptionPlacement={getPlacement(
                            formSettings.descriptionPlacement,
                            field.descriptionPlacement
                        )}
                        errors={errors[`input_${field.id}`]}
                        key={field.id}
                        label={field.label}
                        name={`input_${field.id}`}
                        options={JSON.parse(field.choices)}
                        register={register}
                        required={field.isRequired}
                        value={ifDefaultValue(field)}
                        wrapClassName={inputWrapperClass}
                    />
                )
            case 'number':
                return (
                    <Input
                        className={field.cssClass}
                        description={field.description}
                        descriptionPlacement={getPlacement(
                            formSettings.descriptionPlacement,
                            field.descriptionPlacement
                        )}
                        errors={errors[`input_${field.id}`]}
                        inputMaskValue={field.inputMaskValue}
                        key={field.id}
                        label={field.label}
                        maxLength={field.maxLength}
                        name={`input_${field.id}`}
                        placeholder={field.placeholder}
                        register={register}
                        required={field.isRequired}
                        type={field.type}
                        value={
                            _.get(presetValues, `input_${field.id}`, false)
                                ? _.get(
                                      presetValues,
                                      `input_${field.id}`,
                                      false
                                  )
                                : ifDefaultValue(field)
                        }
                        wrapClassName={inputWrapperClass}
                    />
                )
            case 'checkbox':
                errorKey = filteredKeys(errors, RegExp(`input_${field.id}_`))
                return (
                    <Checkbox
                        className={field.cssClass}
                        description={field.description}
                        descriptionPlacement={getPlacement(
                            formSettings.descriptionPlacement,
                            field.descriptionPlacement
                        )}
                        errors={
                            errorKey.length > 0 ? errors[errorKey[0]] : null
                        }
                        key={field.id}
                        label={field.label}
                        name={`input_${field.id}`}
                        options={JSON.parse(field.choices)}
                        register={register}
                        required={field.isRequired}
                        wrapClassName={inputWrapperClass}
                    />
                )
            case 'radio':
                errorKey = filteredKeys(errors, RegExp(`input_${field.id}_`))
                return (
                    <Radio
                        className={field.cssClass}
                        description={field.description}
                        descriptionPlacement={getPlacement(
                            formSettings.descriptionPlacement,
                            field.descriptionPlacement
                        )}
                        errors={
                            errorKey.length > 0 ? errors[errorKey[0]] : null
                        }
                        key={field.id}
                        label={field.label}
                        name={`input_${field.id}`}
                        options={JSON.parse(field.choices)}
                        register={register}
                        required={field.isRequired}
                        wrapClassName={inputWrapperClass}
                    />
                )
            case 'hidden':
                return (
                    <Input
                        className={field.cssClass}
                        description={field.description}
                        descriptionPlacement={getPlacement(
                            formSettings.descriptionPlacement,
                            field.descriptionPlacement
                        )}
                        errors={errors[`input_${field.id}`]}
                        key={field.id}
                        label={field.label}
                        name={`input_${field.id}`}
                        placeholder={field.placeholder}
                        register={register}
                        required={field.isRequired}
                        type={field.type}
                        value={
                            _.get(presetValues, `input_${field.id}`, false)
                                ? _.get(
                                      presetValues,
                                      `input_${field.id}`,
                                      false
                                  )
                                : ifDefaultValue(field)
                        }
                        wrapClassName={inputWrapperClass}
                    />
                )
            case 'html':
                return (
                    <Html
                        className={field.cssClass}
                        content={field.content}
                        description={field.description}
                        descriptionPlacement={getPlacement(
                            formSettings.descriptionPlacement,
                            field.descriptionPlacement
                        )}
                        key={field.id}
                        label={field.label}
                        name={`input_${field.id}`}
                        type={field.type}
                        wrapClassName={inputWrapperClass}
                    />
                )

            default:
                return null
        }
    })
}

export default FieldBuilder

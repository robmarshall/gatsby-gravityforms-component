import React from 'react'
import classnames from 'classnames'
import PropTypes from 'prop-types'
import _ from 'lodash'

import {
    getPlacement,
    ifDefaultValue,
    islabelHidden,
} from '../../utils/inputSettings'

import Input from '../../components/Input'
import Textarea from '../../components/Textarea'
import Select from '../../components/Select'
import Multiselect from '../../components/Multiselect'
import Checkbox from '../../components/Checkbox'
import Radio from '../../components/Radio'
import Html from '../../components/Html'

const FieldBuilder = ({
    formId,
    formData,
    presetValues = {},
    register,
    errors,
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

        switch (field.type) {
            // Start with the standard fields
            case 'text':
                return (
                    <Input
                        key={field.id}
                        name={`input_${field.id}`}
                        label={field.label}
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
                        description={field.description}
                        descriptionPlacement={getPlacement(
                            formSettings.descriptionPlacement,
                            field.descriptionPlacement
                        )}
                        wrapClassName={inputWrapperClass}
                        className={field.cssClass}
                        register={register}
                        required={field.isRequired}
                        placeholder={field.placeholder}
                        maxLength={field.maxLength}
                        inputMaskValue={field.inputMaskValue}
                        errors={errors[`input_${field.id}`]}
                    />
                )
            case 'textarea':
                return (
                    <Textarea
                        key={field.id}
                        name={`input_${field.id}`}
                        label={field.label}
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
                        description={field.description}
                        descriptionPlacement={getPlacement(
                            formSettings.descriptionPlacement,
                            field.descriptionPlacement
                        )}
                        wrapClassName={inputWrapperClass}
                        className={field.cssClass}
                        register={register}
                        required={field.isRequired}
                        placeholder={field.placeholder}
                        maxLength={field.maxLength}
                        inputMaskValue={field.inputMaskValue}
                        errors={errors[`input_${field.id}`]}
                    />
                )
            case 'select':
                return (
                    <Select
                        key={field.id}
                        name={`input_${field.id}`}
                        label={field.label}
                        value={ifDefaultValue(field)}
                        options={JSON.parse(field.choices)}
                        wrapClassName={inputWrapperClass}
                        description={field.description}
                        descriptionPlacement={getPlacement(
                            formSettings.descriptionPlacement,
                            field.descriptionPlacement
                        )}
                        className={field.cssClass}
                        register={register}
                        required={field.isRequired}
                        errors={errors[`input_${field.id}`]}
                    />
                )
            case 'multiselect':
                return (
                    <Multiselect
                        key={field.id}
                        name={`input_${field.id}`}
                        label={field.label}
                        value={ifDefaultValue(field)}
                        options={JSON.parse(field.choices)}
                        description={field.description}
                        descriptionPlacement={getPlacement(
                            formSettings.descriptionPlacement,
                            field.descriptionPlacement
                        )}
                        wrapClassName={inputWrapperClass}
                        className={field.cssClass}
                        register={register}
                        required={field.isRequired}
                        errors={errors[`input_${field.id}`]}
                    />
                )
            case 'number':
                return (
                    <Input
                        key={field.id}
                        name={`input_${field.id}`}
                        label={field.label}
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
                        description={field.description}
                        descriptionPlacement={getPlacement(
                            formSettings.descriptionPlacement,
                            field.descriptionPlacement
                        )}
                        wrapClassName={inputWrapperClass}
                        className={field.cssClass}
                        register={register}
                        required={field.isRequired}
                        placeholder={field.placeholder}
                        maxLength={field.maxLength}
                        inputMaskValue={field.inputMaskValue}
                        errors={errors[`input_${field.id}`]}
                    />
                )
            case 'checkbox':
                return (
                    <Checkbox
                        key={field.id}
                        name={`input_${field.id}`}
                        label={field.label}
                        options={JSON.parse(field.choices)}
                        description={field.description}
                        descriptionPlacement={getPlacement(
                            formSettings.descriptionPlacement,
                            field.descriptionPlacement
                        )}
                        wrapClassName={inputWrapperClass}
                        className={field.cssClass}
                        register={register}
                        required={field.isRequired}
                        errors={errors[`input_${field.id}`]}
                    />
                )
            case 'radio':
                return (
                    <Radio
                        key={field.id}
                        name={`input_${field.id}`}
                        label={field.label}
                        options={JSON.parse(field.choices)}
                        description={field.description}
                        descriptionPlacement={getPlacement(
                            formSettings.descriptionPlacement,
                            field.descriptionPlacement
                        )}
                        wrapClassName={inputWrapperClass}
                        className={field.cssClass}
                        register={register}
                        required={field.isRequired}
                        errors={errors[`input_${field.id}`]}
                    />
                )
            case 'hidden':
                return (
                    <Input
                        key={field.id}
                        name={`input_${field.id}`}
                        label={field.label}
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
                        description={field.description}
                        descriptionPlacement={getPlacement(
                            formSettings.descriptionPlacement,
                            field.descriptionPlacement
                        )}
                        wrapClassName={inputWrapperClass}
                        className={field.cssClass}
                        register={register}
                        required={field.isRequired}
                        placeholder={field.placeholder}
                        errors={errors[`input_${field.id}`]}
                    />
                )
            case 'html':
                return (
                    <Html
                        key={field.id}
                        name={`input_${field.id}`}
                        label={field.label}
                        type={field.type}
                        description={field.description}
                        descriptionPlacement={getPlacement(
                            formSettings.descriptionPlacement,
                            field.descriptionPlacement
                        )}
                        content={field.content}
                        wrapClassName={inputWrapperClass}
                        className={field.cssClass}
                    />
                )

            // Move onto Advanced fields

            case 'email':
                return (
                    <Input
                        key={field.id}
                        name={`input_${field.id}`}
                        label={field.label}
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
                        description={field.description}
                        descriptionPlacement={getPlacement(
                            formSettings.descriptionPlacement,
                            field.descriptionPlacement
                        )}
                        wrapClassName={inputWrapperClass}
                        className={field.cssClass}
                        register={register}
                        required={field.isRequired}
                        placeholder={field.placeholder}
                        maxLength={field.maxLength}
                        inputMaskValue={field.inputMaskValue}
                        errors={errors[`input_${field.id}`]}
                    />
                )

            default:
                return null
        }
    })
}

export default FieldBuilder

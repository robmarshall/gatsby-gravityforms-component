import classnames from 'classnames'
import React from 'react'

import Captcha from '../../components/Captcha'
import Html from '../../components/Html'
import Input from '../../components/Input'
import Multiselect from '../../components/Multiselect'
import Select from '../../components/Select'
import SelectorList from '../../components/SelectorList'
import Textarea from '../../components/Textarea'
import { islabelHidden } from '../../utils/inputSettings'

const FieldBuilder = ({
    formData,
    formLoading,
    setFormLoading,
    presetValues,
}) => {
    // Loop through fields and create
    return formData.formFields.map((field) => {
        // Set the wrapper classes
        const {
            descriptionPlacement: fieldDescPlace,
            isRequired,
            subLabelPlacement: fieldSubLabelPlace,
            visibility,
        } = field

        const descriptionPlacement =
            fieldDescPlace || formData.descriptionPlacement

        const subLabelPlacement =
            fieldSubLabelPlace || formData.subLabelPlacement

        const fieldData = { ...field, descriptionPlacement }
        let inputWrapperClass = classnames(
            'gfield',
            'gravityform__field',
            'gravityform__field__' + field.type,
            'gravityform__field--' + field.size,
            field.cssClass,
            { 'field-required': field.isRequired },
            { 'hidden-label': islabelHidden(field.labelPlacement) },
            { gfield_contains_required: isRequired },
            { [`field_sublabel_${subLabelPlacement}`]: subLabelPlacement },
            `field_description_${descriptionPlacement}`,
            `gfield_visibility_${visibility}`
        )

        const wrapId = `field_${formData.formId}_${field.id}`

        //TODO: Should this match GF version "input_form.id_input.id"
        const inputName = `input_${field.id}`

        switch (field.type) {
            // Add note for unsupported captcha field
            case 'captcha':
                return (
                    <Captcha
                        captchaTheme={field.captchaTheme}
                        fieldData={fieldData}
                        key={field.id}
                        name={inputName}
                        wrapClassName={inputWrapperClass}
                    />
                )
            // Start with the standard fields
            case 'text':
            case 'number':
            case 'email':
            case 'hidden':
            case 'date':
            case 'phone':
                return (
                    <Input
                        fieldData={fieldData}
                        key={field.id}
                        name={inputName}
                        value={
                            get(presetValues, inputName, false)
                                ? get(presetValues, inputName, false)
                                : ifDefaultValue(field)
                        }
                        wrapClassName={inputWrapperClass}
                        wrapId={wrapId}
                    />
                )
            case 'textarea':
                return (
                    <Textarea
                        fieldData={fieldData}
                        key={field.id}
                        name={inputName}
                        wrapClassName={inputWrapperClass}
                        wrapId={wrapId}
                    />
                )
            case 'select':
                return (
                    <Select
                        fieldData={fieldData}
                        key={field.id}
                        name={inputName}
                        wrapClassName={inputWrapperClass}
                        wrapId={wrapId}
                    />
                )
            case 'multiselect':
                return (
                    <Multiselect
                        fieldData={fieldData}
                        key={field.id}
                        name={inputName}
                        wrapClassName={inputWrapperClass}
                        wrapId={wrapId}
                    />
                )
            case 'radio':
            case 'checkbox':
                return (
                    <SelectorList
                        fieldData={fieldData}
                        key={field.id}
                        name={inputName}
                        wrapClassName={inputWrapperClass}
                        wrapId={wrapId}
                    />
                )
            case 'html':
                return (
                    <Html
                        fieldData={fieldData}
                        key={field.id}
                        name={inputName}
                        wrapClassName={inputWrapperClass}
                        wrapId={wrapId}
                    />
                )

            default:
                return null
        }
    })
}

export default FieldBuilder

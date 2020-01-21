import classnames from 'classnames'
import _ from 'lodash'
import React from 'react'

import Html from '../../components/Html'
import Input from '../../components/Input'
import Multiselect from '../../components/Multiselect'
import Select from '../../components/Select'
import SelectorList from '../../components/SelectorList'
import Textarea from '../../components/Textarea'
import { filteredKeys } from '../../utils/helpers'
import { ifDefaultValue, islabelHidden } from '../../utils/inputSettings'

const FieldBuilder = ({ formData, presetValues = {}, register, errors }) => {
    // Loop through fields and create
    return formData.formFields.map(field => {
        // Set the wrapper classes
        const {
            isRequired,
            descriptionPlacement = formData.descriptionPlacement,
            subLabelPlacement = formData.subLabelPlacement,
            visibility,
        } = field

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
            `field_sublabel_${subLabelPlacement}`,
            `field_description_${descriptionPlacement}`,
            `gfield_visibility_${visibility}`
        )

        const wrapId = `field_${formData.formId}_${field.id}`

        //TODO: Should this match GF version "input_form.id_input.id"
        const inputName = `input_${field.id}`

        let errorKey = ''

        switch (field.type) {
            // Add note for unsupported captcha field
            case 'captcha':
                return (
                    <p key="capcha">
                        <strong>
                            Gatsby Gravity Form Component currently does not
                            support the CAPTCHA field. Form will not submit with
                            this field present. Remove this field from the
                            Gravity Form.
                        </strong>
                    </p>
                )
            // Start with the standard fields
            case 'text':
            case 'number':
            case 'email':
            case 'hidden':
            case 'phone':
                return (
                    <Input
                        errors={errors[inputName]}
                        fieldData={fieldData}
                        key={field.id}
                        name={inputName}
                        register={register}
                        value={
                            _.get(presetValues, inputName, false)
                                ? _.get(presetValues, inputName, false)
                                : ifDefaultValue(field)
                        }
                        wrapClassName={inputWrapperClass}
                        wrapId={wrapId}
                    />
                )
            case 'textarea':
                return (
                    <Textarea
                        errors={errors[inputName]}
                        fieldData={fieldData}
                        key={field.id}
                        name={inputName}
                        register={register}
                        wrapClassName={inputWrapperClass}
                        wrapId={wrapId}
                    />
                )
            case 'select':
                return (
                    <Select
                        errors={errors[inputName]}
                        fieldData={fieldData}
                        key={field.id}
                        name={inputName}
                        register={register}
                        wrapClassName={inputWrapperClass}
                        wrapId={wrapId}
                    />
                )
            case 'multiselect':
                return (
                    <Multiselect
                        errors={errors[inputName]}
                        fieldData={fieldData}
                        key={field.id}
                        name={inputName}
                        register={register}
                        wrapClassName={inputWrapperClass}
                        wrapId={wrapId}
                    />
                )
            case 'radio':
            case 'checkbox':
                errorKey = filteredKeys(errors, RegExp(`input_${field.id}_`))
                return (
                    <SelectorList
                        errors={
                            errorKey.length > 0 ? errors[errorKey[0]] : null
                        }
                        fieldData={fieldData}
                        key={field.id}
                        name={inputName}
                        register={register}
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

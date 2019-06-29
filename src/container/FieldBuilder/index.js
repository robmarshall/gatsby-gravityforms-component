import React from 'react'
import classnames from 'classnames'
import PropTypes from 'prop-types'

import { ifDefaultValue, islabelHidden } from '../../utils/inputSettings'
import { getFieldID, slugify } from '../../utils/helpers'

import Input from '../../components/Input'
import Textarea from '../../components/Textarea'
import Select from '../../components/Select'
import Multiselect from '../../components/Multiselect'
import Checkbox from '../../components/Checkbox'
import Radio from '../../components/Radio'
import Html from '../../components/Html'

const FieldBuilder = ({ formId, formData, register }) => {
    return formData.formFields.map(field => {
        let inputWrapperClass = classnames(
            'gravityform__' + field.type,
            field.cssClass,
            { 'field-required': field.isRequired },
            { 'hidden-label': islabelHidden(field.labelPlacement) }
        )

        switch (field.type) {
            case 'text':
                return (
                    <Input
                        key={field.id}
                        name={`field-${field.id}`}
                        label={field.label}
                        type={field.type}
                        value={ifDefaultValue(field)}
                        wrapClassName={inputWrapperClass}
                        className={field.cssClass}
                        register={register}
                        required={field.isRequired}
                        placeholder={field.placeholder}
                        maxLength="0"
                    />
                )
            case 'textarea':
                return (
                    <Textarea
                        key={field.id}
                        name={`field-${field.id}`}
                        label={field.label}
                        type={field.type}
                        value={ifDefaultValue(field)}
                        wrapClassName={inputWrapperClass}
                        className={field.cssClass}
                        register={register}
                        required={field.isRequired}
                        placeholder={field.placeholder}
                        maxLength="0"
                    />
                )
            case 'select':
                return (
                    <Select
                        key={field.id}
                        name={`field-${field.id}`}
                        label={field.label}
                        value={ifDefaultValue(field)}
                        options={JSON.parse(field.choices)}
                        wrapClassName={inputWrapperClass}
                        className={field.cssClass}
                        register={register}
                        required={field.isRequired}
                    />
                )
            case 'multiselect':
                return (
                    <Multiselect
                        key={field.id}
                        name={`field-${field.id}`}
                        label={field.label}
                        value={ifDefaultValue(field)}
                        options={JSON.parse(field.choices)}
                        wrapClassName={inputWrapperClass}
                        className={field.cssClass}
                        register={register}
                        required={field.isRequired}
                    />
                )
            case 'number':
                return (
                    <Input
                        key={field.id}
                        name={`field-${field.id}`}
                        label={field.label}
                        type={field.type}
                        value={ifDefaultValue(field)}
                        wrapClassName={inputWrapperClass}
                        className={field.cssClass}
                        register={register}
                        required={field.isRequired}
                        placeholder={field.placeholder}
                        maxLength="0"
                    />
                )
            case 'checkbox':
                return (
                    <Checkbox
                        key={field.id}
                        name={`field-${field.id}`}
                        label={field.label}
                        options={JSON.parse(field.choices)}
                        wrapClassName={inputWrapperClass}
                        className={field.cssClass}
                        register={register}
                        required={field.isRequired}
                    />
                )
            case 'radio':
                return (
                    <Radio
                        key={field.id}
                        name={`field-${field.id}`}
                        label={field.label}
                        options={JSON.parse(field.choices)}
                        wrapClassName={inputWrapperClass}
                        className={field.cssClass}
                        register={register}
                        required={field.isRequired}
                    />
                )
            case 'hidden':
                return (
                    <Input
                        key={field.id}
                        name={`field-${field.id}`}
                        label={field.label}
                        type={field.type}
                        value={ifDefaultValue(field)}
                        wrapClassName={inputWrapperClass}
                        className={field.cssClass}
                        register={register}
                        required={field.isRequired}
                        placeholder={field.placeholder}
                        maxLength="0"
                    />
                )
            case 'html':
                return (
                    <Html
                        key={field.id}
                        name={`field-${field.id}`}
                        label={field.label}
                        type={field.type}
                        content={field.content}
                        wrapClassName={inputWrapperClass}
                        className={field.cssClass}
                    />
                )
            default:
                return null
        }
    })
}

export default FieldBuilder

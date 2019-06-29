import React, { Component } from 'react'
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

        return (
            field.type === 'text' && (
                <Input
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
            ),
            field.type === 'textarea' && (
                <Textarea
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
            ),
            field.type === 'select' && (
                <Select
                    name={`field-${field.id}`}
                    label={field.label}
                    value={ifDefaultValue(field)}
                    options={JSON.parse(field.choices)}
                    wrapClassName={inputWrapperClass}
                    className={field.cssClass}
                    register={register}
                    required={field.isRequired}
                />
            ),
            field.type === 'multiselect' && (
                <Multiselect
                    name={`field-${field.id}`}
                    label={field.label}
                    value={ifDefaultValue(field)}
                    options={JSON.parse(field.choices)}
                    wrapClassName={inputWrapperClass}
                    className={field.cssClass}
                    register={register}
                    required={field.isRequired}
                />
            ),
            field.type === 'number' && (
                <Input
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
            ),
            field.type === 'checkbox' && (
                <Checkbox
                    name={`field-${field.id}`}
                    label={field.label}
                    options={JSON.parse(field.choices)}
                    wrapClassName={inputWrapperClass}
                    className={field.cssClass}
                    register={register}
                    required={field.isRequired}
                />
            ),
            field.type === 'radio' && (
                <Radio
                    name={`field-${field.id}`}
                    label={field.label}
                    options={JSON.parse(field.choices)}
                    wrapClassName={inputWrapperClass}
                    className={field.cssClass}
                    register={register}
                    required={field.isRequired}
                />
            ),
            field.type === 'hidden' && (
                <Input
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
            ),
            field.type === 'html' && (
                <Html
                    name={`field-${field.id}`}
                    label={field.label}
                    type={field.type}
                    content={field.content}
                    wrapClassName={inputWrapperClass}
                    className={field.cssClass}
                />
            )
        )
    })
}

export default FieldBuilder

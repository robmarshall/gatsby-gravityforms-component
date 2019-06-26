import React, { Component, Fragment } from 'react'
import classnames from 'classnames'
import PropTypes from 'prop-types'
import { ifDefaultValue, islabelHidden } from '../utils/inputSettings'
import { slugify } from '../utils/helpers'

class FormBuilder extends Component {
    constructor(props) {
        super(props)

        this.state = {
            fields: [],
        }

        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)

        // Set value and error state for form fields
        // Access field by ID
        props.formData.formFields.forEach(field => {
            this.state.fields[field.id] = {
                value: ifDefaultValue(field),
                error: '',
            }
        })
    }

    handleSubmit(event) {
        event.preventDefault()
        const form = event.target
    }

    handleChange(event) {
        event.preventDefault()
    }

    render() {
        const { formId, formData } = this.props

        const fields = formData.formFields.map(field => {
            console.log(field)

            return (
                <div
                    className={classnames(
                        'gravityform__' + field.type,
                        field.cssClass,
                        { 'field-required': field.isRequired },
                        { 'hidden-label': islabelHidden(field.labelPlacement) }
                    )}
                    key={field.id}
                >
                    {field.type === 'text' && (
                        <Fragment key={`fragment-${field.id}`}>
                            <label htmlFor={`field-${field.id}`}>
                                {field.label}
                            </label>
                            <input
                                id={`field-${field.id}`}
                                name={`field-${field.id}`}
                                type="text"
                                value={this.state.fields[field.id].value}
                                onChange={this.handleChange}
                                placeholder={field.placeholder}
                            />
                        </Fragment>
                    )}
                    {field.type === 'textarea' && (
                        <Fragment key={`fragment-${field.id}`}>
                            <label htmlFor={`field-${field.id}`}>
                                {field.label}
                            </label>
                            <textarea
                                id={`field-${field.id}`}
                                name={`field-${field.id}`}
                                placeholder=""
                                onChange={this.handleChange}
                                required={field.isRequired}
                                placeholder={field.placeholder}
                                defaultValue={this.state.fields[field.id].value}
                            />
                        </Fragment>
                    )}
                    {field.type === 'select' && (
                        <Fragment key={`fragment-${field.id}`}>
                            <label htmlFor={`field-${field.id}`}>
                                {field.label}
                            </label>
                            <select
                                id={`field-${field.id}`}
                                name={`field-${field.id}`}
                                onChange={this.handleChange}
                            >
                                {JSON.parse(field.choices).map(choice => {
                                    return (
                                        <option
                                            key={`${field.id}-${slugify(
                                                choice.value
                                            )}`}
                                            value={choice.value}
                                            defaultValue={choice.isSelected}
                                        >
                                            {choice.text}
                                        </option>
                                    )
                                })}
                            </select>
                        </Fragment>
                    )}
                    {field.type === 'multiselect' && (
                        <Fragment key={`fragment-${field.id}`}>
                            <label htmlFor={`field-${field.id}`}>
                                {field.label}
                            </label>
                            <select
                                multiple
                                id={`field-${field.id}`}
                                name={`field-${field.id}`}
                                onChange={this.handleChange}
                            >
                                {JSON.parse(field.choices).map(choice => {
                                    return (
                                        <option
                                            key={`${field.id}-${slugify(
                                                choice.value
                                            )}`}
                                            value={choice.value}
                                            defaultValue={choice.isSelected}
                                        >
                                            {choice.text}
                                        </option>
                                    )
                                })}
                            </select>
                        </Fragment>
                    )}
                    {field.type === 'number' && (
                        <Fragment key={`fragment-${field.id}`}>
                            <label htmlFor={`field-${field.id}`}>
                                {field.label}
                            </label>
                            <input
                                id={`field-${field.id}`}
                                name={`field-${field.id}`}
                                type="number"
                                value={this.state.fields[field.id].value}
                                onChange={this.handleChange}
                                placeholder={field.placeholder}
                            />
                        </Fragment>
                    )}
                    {field.type === 'checkbox' && (
                        <Fragment key={`fragment-${field.id}`}>
                            <legend>{field.label}</legend>
                            {JSON.parse(field.choices).map(choice => {
                                return (
                                    <div
                                        key={`${field.id}-${slugify(
                                            choice.value
                                        )}`}
                                    >
                                        <input
                                            type="checkbox"
                                            id={slugify(choice.value)}
                                            name={field.id}
                                            value={choice.text}
                                            checked={choice.isSelected}
                                            onChange={this.handleChange}
                                        />
                                        <label htmlFor={slugify(choice.value)}>
                                            {choice.text}
                                        </label>
                                    </div>
                                )
                            })}
                        </Fragment>
                    )}
                    {field.type === 'radio' && (
                        <Fragment key={`fragment-${field.id}`}>
                            <legend>{field.label}</legend>
                            {JSON.parse(field.choices).map(choice => {
                                return (
                                    <div
                                        key={`${field.id}-${slugify(
                                            choice.value
                                        )}`}
                                    >
                                        <input
                                            type="radio"
                                            id={slugify(choice.value)}
                                            name={field.id}
                                            value={choice.text}
                                            checked={choice.isSelected}
                                            onChange={this.handleChange}
                                        />
                                        <label htmlFor={slugify(choice.value)}>
                                            {choice.text}
                                        </label>
                                    </div>
                                )
                            })}
                        </Fragment>
                    )}
                    {field.type === 'hidden' && (
                        <Fragment key={`fragment-${field.id}`}>
                            <label htmlFor={`field-${field.id}`}>
                                {field.label}
                            </label>
                            <input
                                id={`field-${field.id}`}
                                name={`field-${field.id}`}
                                type="hidden"
                                value={this.state.fields[field.id].value}
                                onChange={this.handleChange}
                            />
                        </Fragment>
                    )}
                    {field.type === 'html' && (
                        <Fragment key={`fragment-${field.id}`}>
                            <div
                                className={
                                    'gravityform__' + field.type + '__wrap'
                                }
                                dangerouslySetInnerHTML={{
                                    __html: field.content,
                                }}
                            />
                        </Fragment>
                    )}
                </div>
            )
        })

        return (
            <form
                className={`gravityform gravityform--id-${formId}`}
                onSubmit={this.handleSubmit}
                key={`gravityform--id-${formId}`}
            >
                {fields}
                <input
                    key="submit-button"
                    type="submit"
                    value={
                        formData.button.text ? formData.button.text : 'Submit'
                    }
                />
            </form>
        )
    }
}

export default FormBuilder

import React, { Component } from 'react'
import PropTypes from 'prop-types'
import useForm from 'react-hook-form'
import getForm from './utils/getForm'
import FieldBuilder from './container/FieldBuilder'

/**
 * Component to take Gravity Form graphQL data and turn into
 * a fully functional form.
 * @param mixed     formData    Form dataset from graphQL
 * @param int       id          Form ID from Gravity Forms
 * @param string    lambda      API link for Lambda functions when working with
 *                              netlify or similar
 */

const GravityFormForm = ({ id, formData, lambda }) => {
    const { register, handleSubmit } = useForm()

    // Take ID argument and graphQL Gravity Form data for this form
    const singleForm = getForm(formData, id)

    return (
        singleForm && (
            <form
                className={`gravityform gravityform--id-${id}`}
                key={`gravityform--id-${id}`}
            >
                <FieldBuilder
                    register={register}
                    formId={id}
                    formData={singleForm}
                />
                <input
                    key="submit-button"
                    type="submit"
                    value={
                        singleForm.button.text
                            ? singleForm.button.text
                            : 'Submit'
                    }
                />
            </form>
        )
    )
}

export default GravityFormForm

GravityFormForm.defaultProps = {
    lambda: '',
}

GravityFormForm.propTypes = {
    formData: PropTypes.object.isRequired,
    id: PropTypes.number.isRequired,
    lambda: PropTypes.string,
}

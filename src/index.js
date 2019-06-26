import React, { Component } from 'react'
import PropTypes from 'prop-types'
import getForm from './utils/getForm'
import FormBuilder from './FormBuilder'

/**
 * Component to take Gravity Form graphQL data and turn into
 * a fully functional form.
 * @param mixed     formData    Form dataset from graphQL
 * @param int       id          Form ID from Gravity Forms
 * @param string    lambda      API link for Lambda functions when working with
 *                              netlify or similar
 */

export const GravityFormForm = ({ formData, id, lambda }) => {
    // Take ID argument and graphQL Gravity Form data for this form
    const singleForm = getForm(formData, id)
    return formData && <FormBuilder formData={singleForm} />
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

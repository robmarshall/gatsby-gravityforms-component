import React, { Component } from "react"
import { graphql, StaticQuery } from "gatsby"
import PropTypes from "prop-types"
import allFormData from "./queries/allForms"
import FormBuilder from "./FormBuilder"

/**
 * Component to get a specific Gravity Form form data and
 * output as a fully functional form.
 * @param int id    Form ID from Gravity Forms
 * @param string    lambda API link for Lambda functions when working with
 *                  netlify or similar
 */

export const GravityFormForm = ({ id, lambda }) => {
  // Take ID argument, and get Gravity Form data for this form
  // This is a React Hook, so has to be set here. Cannot go in
  // a functional component. Thats against the rules.
  return allFormData(id) && <FormBuilder formData={allFormData(id)} />
}

export default GravityFormForm

GravityFormForm.defaultProps = {
  lambda: "",
}

GravityFormForm.propTypes = {
  id: PropTypes.number.isRequired,
  lambda: PropTypes.string,
}

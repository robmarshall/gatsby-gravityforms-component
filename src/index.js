import React from 'react'
import PropTypes from 'prop-types'
import useForm from 'react-hook-form'
import getForm from './utils/getForm'
import { isObjEmpty, scrollToElem } from './utils/helpers'
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
    const { register, errors, handleSubmit, watch } = useForm()

    const onSubmitCallback = values => {
        console.log(values)
    }

    if (!isObjEmpty(errors)) {
        scrollToElem(`#gravityform--id-${id}`)
    }

    // Take ID argument and graphQL Gravity Form data for this form
    const singleForm = getForm(formData, id)

    return (
        singleForm && (
            <form
                className={`gravityform gravityform--id-${id}`}
                id={`gravityform--id-${id}`}
                key={`gravityform--id-${id}`}
                onSubmit={handleSubmit(onSubmitCallback)}
            >
                <FieldBuilder
                    formId={id}
                    formData={singleForm}
                    register={register}
                />
                <button type="submit">
                    {singleForm.button.text ? singleForm.button.text : 'Submit'}
                </button>
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

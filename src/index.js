import React, { useState } from 'react'
import PropTypes from 'prop-types'
import useForm from 'react-hook-form'
import getForm from './utils/getForm'
import FieldBuilder from './container/FieldBuilder'
import FormGeneralError from './components/FormGeneralError'
import { isObjEmpty } from './utils/helpers'
import { manageMainFormError } from './utils/manageErrors'
import { submittionHasOneFieldEntry } from './utils/manageFormData'
import passToGravityForms from './utils/passToGravityForms'

/**
 * Component to take Gravity Form graphQL data and turn into
 * a fully functional form.
 * @param mixed     formData    Form dataset from graphQL
 * @param int       id          Form ID from Gravity Forms
 * @param string    lambda      API link for Lambda functions when working with
 *                              netlify or similar
 */

const GravityFormForm = ({ id, formData, lambda }) => {
    // Pull in form functions
    const { register, errors, handleSubmit, watch } = useForm()

    // Create general error state
    const [generalError, setGeneralError] = useState('')

    const watchAllForm = watch()

    // Take ID argument and graphQL Gravity Form data for this form
    const singleForm = getForm(formData, id)

    const onSubmitCallback = values => {
        // Check that at least one field has been filled in
        if (submittionHasOneFieldEntry(values)) {
            passToGravityForms(id, singleForm.apiURL, values, lambda)
        } else {
            setGeneralError('leastOneField')
        }
    }

    if (!isObjEmpty(errors)) {
        setGeneralError('formHasError')
    } else {
        // If there is an error currently, and there is one
        // field populated, clean up
        if (generalError && submittionHasOneFieldEntry(watchAllForm)) {
            setGeneralError('')
        }
    }

    return (
        singleForm && (
            <form
                id={`gravityform--id-${id}`}
                className={`gravityform gravityform--id-${id}`}
                key={`gravityform--id-${id}`}
                onSubmit={handleSubmit(onSubmitCallback)}
            >
                {(!isObjEmpty(errors) || generalError) && (
                    <FormGeneralError errorCode={generalError} />
                )}

                <FieldBuilder
                    formId={id}
                    formData={singleForm}
                    register={register}
                    errors={errors}
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

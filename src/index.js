import classnames from 'classnames'
import PropTypes from 'prop-types'
import React, { useState } from 'react'
import useForm from 'react-hook-form/dist/react-hook-form.ie11'
import ReactHtmlParser from 'react-html-parser'
import FormGeneralError from './components/FormGeneralError'
import FieldBuilder from './container/FieldBuilder'
import getForm from './utils/getForm'
import {
    handleGravityFormsValidationErrors,
    // manageMainFormError,
} from './utils/manageErrors'
import { submissionHasOneFieldEntry } from './utils/manageFormData'
import passToGravityForms from './utils/passToGravityForms'

/**
 * Component to take Gravity Form graphQL data and turn into
 * a fully functional form.
 * @param mixed     formData    Form dataset from graphQL
 * @param int       id          Form ID from Gravity Forms
 * @param string    lambda      API link for Lambda functions when working with
 *                              netlify or similar
 */

const GravityFormForm = ({
    id,
    formData,
    lambda,
    presetValues = {},
    successCallback = ({ reset }) => reset(),
}) => {
    // Pull in form functions
    const {
        errors,
        handleSubmit,
        register,
        reset,
        setError,
        setValue,
    } = useForm()

    const [generalError, setGeneralError] = useState('')
    const [formLoading, setLoadingState] = useState(false)

    // State for confirmation message
    const [confirmationMessage, setConfirmationMessage] = useState('')

    // Take ID argument and graphQL Gravity Form data for this form
    const singleForm = getForm(formData, id)

    const onSubmitCallback = async values => {
        // Make sure we are not already waiting for a response
        if (!formLoading) {
            // Clean error
            setGeneralError('')

            // Check that at least one field has been filled in
            if (submissionHasOneFieldEntry(values)) {
                setLoadingState(true)

                const restResponse = await passToGravityForms(
                    singleForm.apiURL,
                    values,
                    lambda
                )

                setLoadingState(false)

                if (restResponse.status === 'error') {
                    // Handle the errors
                    // First check to make sure we have the correct data
                    if (restResponse.data) {
                        // Validation errors passed back by Gravity Forms
                        const { data } = restResponse.data

                        if (data.status === 'gravityFormErrors') {
                            // Pass messages to handle that sets react-hook-form errors
                            handleGravityFormsValidationErrors(
                                data.validation_messages,
                                setError
                            )
                        }
                    } else {
                        // Seemed to be an unknown issue
                        setGeneralError('unknownError')
                    }
                }

                if (restResponse.status === 'success') {
                    setConfirmationMessage(
                        restResponse.data.data.confirmation_message
                    )

                    successCallback({ values, reset })
                }
            } else {
                setGeneralError('leastOneField')
            }
        }
    }

    if (!confirmationMessage) {
        return (
            <div className="gform_wrapper" id={`gform_wrapper_${id}`}>
                <div className="gform_anchor" id={`gf_${id}`} />
                {singleForm && (
                    <form
                        className={
                            formLoading
                                ? `gravityform gravityform--loading gravityform--id-${id}`
                                : `gravityform gravityform--id-${id}`
                        }
                        //TODO: ID change go GF standard "gfrom_1"?
                        id={`gravityform--id-${id}`}
                        key={`gravityform--id-${id}`}
                        onSubmit={handleSubmit(onSubmitCallback)}
                    >
                        {generalError && (
                            <FormGeneralError errorCode={generalError} />
                        )}
                        <div className="gform_body">
                            <ul
                                className={classnames(
                                    'gform_fields',
                                    {
                                        [`form_sublabel_${singleForm.subLabelPlacement}`]: singleForm.subLabelPlacement,
                                    },
                                    `description_${singleForm.descriptionPlacement}`,
                                    `${singleForm.labelPlacement}`
                                )}
                                id={`gform_fields_${id}`}
                            >
                                <FieldBuilder
                                    errors={errors}
                                    formData={singleForm}
                                    formId={id}
                                    presetValues={presetValues}
                                    register={register}
                                    setValue={setValue}
                                />
                            </ul>
                        </div>

                        <div
                            className={`gform_footer ${singleForm.labelPlacement}`}
                        >
                            <button
                                className="gravityform__button gform_button button"
                                id={`gform_submit_button_${id}`}
                                type="submit"
                            >
                                {formLoading ? (
                                    <span className="gravityform__button__loading_span">
                                        Loading
                                    </span>
                                ) : (
                                    singleForm?.button?.text || 'Submit'
                                )}
                            </button>
                        </div>
                    </form>
                )}
            </div>
        )
    }

    return ReactHtmlParser(confirmationMessage)
}

GravityFormForm.defaultProps = {
    lambda: '',
}

GravityFormForm.propTypes = {
    formData: PropTypes.object.isRequired,
    id: PropTypes.number.isRequired,
    lambda: PropTypes.string,
    successCallback: PropTypes.func,
}

export default GravityFormForm

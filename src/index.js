import classnames from 'classnames'
import PropTypes from 'prop-types'
import React, { useState } from 'react'
import { graphql } from 'gatsby'
import { useForm, FormProvider } from 'react-hook-form'
import ReactHtmlParser from 'react-html-parser'
import FormGeneralError from './components/FormGeneralError'
import FieldBuilder from './container/FieldBuilder'
import getForm from './utils/getForm'
import {
    handleGravityFormsValidationErrors,
    // manageMainFormError,
} from './utils/manageErrors'
import {
    submissionHasOneFieldEntry,
    cleanGroupedFields,
} from './utils/manageFormData'
// import passToGravityForms from './utils/passToGravityForms'

/**
 * Component to take Gravity Form graphQL data and turn into
 * a fully functional form.
 * @param {mixed} formData Form dataset from graphQL
 */
const GravityFormForm = ({
    formData,
    successCallback = ({ reset }) => reset(),
    errorCallback,
    controls,
}) => {
    // Pull in form functions
    const methods = useForm()
    const { handleSubmit, reset, setError } = methods

    const [generalError, setGeneralError] = useState('')
    const [formLoading, setLoadingState] = useState(false)

    // State for confirmation message
    const [confirmationMessage, setConfirmationMessage] = useState('')

    // Take ID argument and graphQL Gravity Form data for this form
    const singleForm = getForm(formData, id)

    const onSubmitCallback = async (values) => {
        // Make sure we are not already waiting for a response
        if (!formLoading) {
            // Clean error
            setGeneralError('')

            // Check that at least one field has been filled in
            if (submissionHasOneFieldEntry(values)) {
                setLoadingState(true)

                const filteredValues = cleanGroupedFields(values)

                // const { data, status } = await passToGravityForms({
                //     baseUrl: singleForm.apiURL,
                //     formData: filteredValues,
                //     id,
                //     lambdaEndpoint: lambda,
                // })

                setLoadingState(false)

                if (status === 'error') {
                    // Handle the errors
                    // First check to make sure we have the correct data

                    if (data?.status === 'gravityFormErrors') {
                        // Pass messages to handle that sets react-hook-form errors
                        handleGravityFormsValidationErrors(
                            data.validation_messages,
                            setError
                        )
                    } else {
                        // Seemed to be an unknown issue
                        setGeneralError('unknownError')
                    }

                    errorCallback &&
                        errorCallback({ filteredValues, error: data, reset })
                }

                if (status === 'success') {
                    const { confirmation_message } = data?.data

                    const { confirmations } = singleForm

                    const confirmation = confirmations?.find(
                        (el) => el.isDefault
                    )

                    setConfirmationMessage(
                        confirmation_message || confirmation?.message || false
                    )

                    successCallback({
                        filteredValues,
                        reset,
                        confirmations,
                    })
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
                    <FormProvider {...methods}>
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
                                        formLoading={formLoading}
                                        setFormLoading={setLoadingState}
                                        formData={singleForm}
                                    />
                                </ul>
                            </div>

                            <div
                                className={`gform_footer ${singleForm.labelPlacement}`}
                            >
                                <button
                                    className="gravityform__button gform_button button"
                                    disabled={formLoading}
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
                    </FormProvider>
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
    errorCallback: PropTypes.func,
    formData: PropTypes.object.isRequired,
    successCallback: PropTypes.func,
}

export default GravityFormForm

export const GravityFormFields = graphql`
    fragment GravityFormFields on WpGravityFormsForm {
        formId
        title
        description
        ...button
        ...FormConfirmation
        formFields {
            nodes {
                id
                type
                ...CaptchaField
                ...TextField
                ...TextAreaField
            }
        }
    }
`

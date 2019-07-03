import React from 'react'
import PropTypes from 'prop-types'
import useForm from 'react-hook-form'
import getForm from './utils/getForm'
import { isObjEmpty } from './utils/helpers'
import { manageMainFormError } from './utils/manageErrors'
import passToGravityForms from './utils/passToGravityForms'
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
    const { register, errors, handleSubmit, watch, customErrors } = useForm()

    // Take ID argument and graphQL Gravity Form data for this form
    const singleForm = getForm(formData, id)

    const onSubmitCallback = values => {
        console.log(values)
        passToGravityForms(id, singleForm.apiUrl, values)
    }

    if (!isObjEmpty(errors)) {
        console.log(errors)
    }

    return (
        singleForm && (
            <form
                id={`gravityform--id-${id}`}
                className={`gravityform gravityform--id-${id}`}
                key={`gravityform--id-${id}`}
                onSubmit={handleSubmit(onSubmitCallback)}
            >
                {!isObjEmpty(errors) && (
                    <div className="gravityform__error_inform">
                        <p>{manageMainFormError()}</p>
                    </div>
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

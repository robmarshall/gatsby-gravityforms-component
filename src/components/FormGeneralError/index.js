import React from 'react'
import strings from '../../utils/strings'

const FormGeneralError = props => {
    let errorMessage = ''

    if (props.errorCode === 'formHasError') {
        errorMessage = strings.errors.general
    }

    if (props.errorCode === 'unknownError') {
        errorMessage = strings.errors.unknownError
    }

    if (props.errorCode === 'leastOneField') {
        errorMessage = strings.errors.leastOneField
    }

    if (errorMessage) {
        return (
            <div className="gravityform__error_inform validation_error">
                <p>{errorMessage}</p>
            </div>
        )
    } else {
        return false
    }
}

export default FormGeneralError

import React from 'react'
import strings from '../../utils/strings'

const FormGeneralError = props => {
    let errorMessage = ''

    if (props.errorCode === 'formHasError') {
        errorMessage = strings.errors.general
    }

    if (props.errorCode === 'leastOneField') {
        errorMessage = strings.errors.leastOneField
    }

    if (errorMessage) {
        return (
            <div className="gravityform__error_inform">
                <p>{errorMessage}</p>
            </div>
        )
    } else {
        return false
    }
}

export default FormGeneralError

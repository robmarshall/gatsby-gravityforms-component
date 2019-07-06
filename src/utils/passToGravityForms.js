import axios from 'axios'
import { isObject } from './helpers'
import { handleGravityFormsValidationErrors } from './manageErrors'

export default async (baseUrl, formData, lambdaEndpoint, setError) => {
    let lambaData = {
        baseUrl: baseUrl,
        payload: formData,
    }

    let result

    try {
        result = await axios.post(lambdaEndpoint, {
            responseType: 'json',
            withCredentials: true,
            crossdomain: true,
            data: lambaData,
        })
    } catch (err) {
        const res = err.response
        // Handle the errors
        // First check to make sure we have the correct data
        if (isObject(res.data)) {
            // Validation errors passed back by Gravity Forms
            if (res.data.status === 'gravityFormErrors') {
                // Pass messages to handle that sets react-hook-form errors
                handleGravityFormsValidationErrors(
                    res.data.validation_messages,
                    setError
                )
            }
        }
        console.log(err.response)

        // Seemed to be an unknown issue
        return false
    }

    // Everything went well. Lets add confirmation

    console.log(result)

    return false
}

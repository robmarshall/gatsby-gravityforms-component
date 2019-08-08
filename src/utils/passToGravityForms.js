import axios from 'axios'

export default async (baseUrl, formData, lambdaEndpoint) => {
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
        // Pass back error
        return {
            status: 'error',
            data: err.response,
        }
    }

    return {
        status: 'success',
        data: result,
    }
}

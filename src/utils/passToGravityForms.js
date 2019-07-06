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
        console.log(err)
        return false
    }

    console.log(result)

    return false
}

import axios from 'axios'
import { createGfKeyFromField } from './helpers'

export default async (id, baseUrl, formData, lambdaEndpoint) => {
    console.log(lambdaEndpoint)

    let lambaData = {
        baseUrl: baseUrl,
        payload: {
            form_id: id,
        },
    }

    // Set data object from form fields
    Object.keys(formData).map(function(key) {
        const data = createGfKeyFromField(key)
        lambaData['payload'][data] = formData[key]
    })

    console.log(lambaData)

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

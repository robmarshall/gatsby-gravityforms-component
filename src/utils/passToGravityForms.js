import axios from 'axios'
import { createGfKeyFromField } from './helpers'

export default async (id, baseUrl, formData, lambdaEndpoint) => {
    let lambaData = {
        baseUrl: baseurl,
        payload: {
            form_id: id,
        },
    }

    // Set data object from form fields
    Object.keys(formData).map(function(key) {
        const data = createGfKeyFromField(key)
        lambaData.payload[data] = formData[key]
    })

    console.log(payload)

    let result

    try {
        result = await axios.post(lambdaEndpoint, {
            responseType: 'json',
            data: {
                lambaData,
            },
        })
    } catch (err) {
        console.log(err)
        return false
    }

    console.log(result)

    return false
}

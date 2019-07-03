import axios from 'axios'
import { createGfKeyFromField } from './helpers'

export default (id, baseUrl, formData) => {
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

    return false
}

// import axios from 'axios'
//
// export default async ({ baseUrl, formData, id, lambdaEndpoint }) => {
//     let lambdaData = {
//         baseUrl: baseUrl,
//         formid: id,
//         payload: formData,
//     }
//
//     let result
//
//     try {
//         result = await axios.post(lambdaEndpoint, lambdaData, {
//             responseType: 'json',
//         })
//     } catch (err) {
//         // Pass back error
//         return {
//             status: 'error',
//             data: err.response,
//         }
//     }
//
//     return {
//         status: 'success',
//         data: result,
//     }
// }

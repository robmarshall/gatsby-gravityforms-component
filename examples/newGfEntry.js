const axios = require('axios')
const nanoid = require('nanoid')
const oauthSignature = require('oauth-signature')

let activeEnv =
    process.env.GATSBY_ACTIVE_ENV || process.env.NODE_ENV || 'development'

require('dotenv').config({
    path: `.env.${activeEnv}`,
})

process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0'

console.log(`Using environment config: '${activeEnv}'`)

// Set up essential values
const secretData = {
    gfKey: process.env.GATSBY_GF_CONSUMER_KEY,
    gfSecret: process.env.GATSBY_GF_CONSUMER_SECRET,
    auth: {
        username: process.env.GATSBY_AUTH_USERNAME,
        password: process.env.GATSBY_AUTH_PASSWORD,
    },
}

// For those requests
const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
}

const statusCode = 200

exports.handler = async (event, context, callback) => {
    // Make sure we are dealing with a POST request
    if (event.httpMethod !== 'POST') {
        return {
            statusCode,
            headers,
            body: 'This was not a POST request!',
        }
    }

    // Parse that post data body
    const data = JSON.parse(event.body)
    const apiUrl = data.data.baseUrl + '/submissions'

    // Check we have the required data
    if (!apiUrl) {
        const message = 'Required data is missing'
        console.error(message)

        return {
            statusCode: 424,
            headers,
            body: JSON.stringify({
                message,
            }),
        }
    }

    // Now we can do the real work - Gravity Forms API stuff
    const authParams = new0AuthParameters(secretData.gfKey)
    const signature = oauthSignature.generate(
        'POST',
        apiUrl,
        authParams,
        secretData.gfSecret
    )

    const test = {
        input_2: 'rt',
        input_6: 'rt',
        input_9: 'rt',
        input_10: 'rt',
        input_11: 'rt',
    }

    console.log(test)

    let result

    try {
        result = await axios.post(apiUrl, {
            responseType: 'json',
            params: {
                ...authParams,
                oauth_signature: signature,
            },
            data: test,
            // auth: {
            //   username: secretData.auth.username,
            //   password: secretData.auth.password,
            // },
        })
    } catch (err) {
        console.log(err.response)
        console.log(err.response.data)
        return {
            statusCode: 400,
            headers,
            body: JSON.stringify({
                message: 'Something went wrong',
            }),
        }
        return false
    }

    return {
        statusCode,
        headers,
        body: JSON.stringify({
            message: 'Charge successfully created!',
        }),
    }
}

function getCurrentTimestamp() {
    return Math.round(new Date().getTime() / 1000)
}

function new0AuthParameters(consumerKey) {
    return {
        oauth_consumer_key: consumerKey,
        oauth_timestamp: getCurrentTimestamp(),
        oauth_signature_method: 'HMAC-SHA1',
        oauth_version: '1.0',
        oauth_nonce: nanoid(11),
    }
}

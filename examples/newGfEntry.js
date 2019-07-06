const axios = require('axios')
const nanoid = require('nanoid')
const oauthSignature = require('oauth-signature')

let activeEnv =
    process.env.GATSBY_ACTIVE_ENV || process.env.NODE_ENV || 'development'

require('dotenv').config({
    path: `.env.${activeEnv}`,
})

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

exports.handler = async (event, context, callback) => {
    // Make sure we are dealing with a POST request
    if (event.httpMethod !== 'POST') {
        return {
            statusCode: 400,
            headers,
            body: JSON.stringify({
                status: 'notPost',
                message: 'This was not a POST request!',
            }),
        }
    }

    // Parse that post data body
    const data = JSON.parse(event.body)
    const apiUrl = data.data.baseUrl + '/submissions'

    // Check we have the required data
    if (!apiUrl) {
        return {
            statusCode: 424,
            headers,
            body: JSON.stringify({
                status: 'missingApiData',
                message: 'Required API data is missing',
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

    let result
    try {
        result = await axios.post(apiUrl, {
            responseType: 'json',
            params: {
                ...authParams,
                oauth_signature: signature,
            },
            data: '', //data.data.payload,
        })
    } catch (error) {
        const data = error.response.data

        // Here we know this is a Gravity Form Error
        if (data.is_valid === false) {
            return {
                statusCode: 400,
                headers,
                body: JSON.stringify({
                    status: 'gravityFormErrors',
                    message: 'Gravity Forms has flagged issues',
                    validation_messages: data.validation_messages,
                }),
            }
        } else {
            // Unknown error
            return {
                statusCode: 400,
                headers,
                body: JSON.stringify({
                    status: 'unknown',
                    message: 'Something went wrong',
                }),
            }
        }
    }

    return {
        statusCode: 200,
        headers,
        body: JSON.stringify({
            status: 'success',
            message: 'Entry added to Gravity Forms',
            data: result,
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

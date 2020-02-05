# Gravity Forms Form Component

A (relatively) plug and play component for parsing [gatsby-source-gravityforms](https://www.npmjs.com/package/gatsby-source-gravityforms) GraphQL data. Outputs a component using BEM classes, meaning all you need to do is style it.

Uses [React Hook Forms](https://react-hook-form.com/) under the hood for all that good state management.

## Installation

```js
# Install the component
yarn add gatsby-gravityforms-component

# Or with NPM
npm i gatsby-gravityforms-component
```

## Gravity Forms Data and GraphQL Fragment

[GraphQL Fragments](https://www.gatsbyjs.org/docs/using-graphql-fragments/) are available from this component for making fetching the needed data. The `GravityFormComponent` fragment amy be used on any `GF__Form` type node. Example:

```graphql
query {
    allGfForm {
        edges {
            node {
                ...GravityFormComponent
            }
        }
    }
}
```

GraphQL fragments are automatically available to Gatsby components. If you're looking to use these in `gatsby-node.js` you will need to import them from `gatsby-gravityforms-component/fragments` using the below snippet.

```
import 'node_modules/gatsby-gravityforms-component/fragments.js'
```

-   GravityFormComponent

## Using the component

1. Once you have set up [gatsby-source-gravityforms](https://www.npmjs.com/package/gatsby-source-gravityforms)
2. Import the component where you want to use it
3. Grab the GraphQL data from the gatsby-source-gravityforms plugin and pass to component
4. Set the form ID
5. Add your environment variables
6. Add the Lambda function (scroll down a little)

```js
import React from 'react'
import GravityFormForm from 'gatsby-gravityforms-component'

// Would recommend moving this into a separate /src/hooks/gravityforms.js file
// and import where needed
import { useStaticQuery, graphql } from 'gatsby'
const allGravityData = () => {
    const { allGfForm } = useStaticQuery(
        graphql`
            query {
                allGfForm {
                    edges {
                        node {
                            ...GravityFormComponent
                        }
                    }
                }
            }
        `
    )
    return allGfForm
}

function handleError({values, error, reset}) => {
    //handle error
}

function handleSuccess({values, reset}) => {
    //handle success
}

const examplePage = () => (
    <GravityFormForm
        id={1}
        formData={allGravityData()}
        presetValues={{ input_1: 'special_value' }}
        lambda={process.env.LAMBDA_ENDPOINT}
        successCallback={handleSuccess}
        errorCallback={handleError}
    />
)
export default examplePage
```

This outputs the form that has been set up in WordPress - Gravity Forms. Ready for you to style it!

-   id: The ID of the form, get in WordPress Gravity Forms
-   formDate: The data passed from the query function - this is the same for all forms
-   presetValues: An object, with the keys set as the input ID (shown in Gravity Forms editor) and the value to set the field as. Great for hidden fields.
-   lambda: The URL to the lambda endpoint
-   successCallback: function to be called on successful form submission. values: form values, reset: function to reset form.
-   errorCallback: function to be called on error in form submission. values: form values, reset: function to reset form, error: error response from API.

## Add Environment Variables

The following environment variables should be added to your hosting provider backend. If unsure, most providers have an article explaining. A quick Google should find this.

```js
GF_CONSUMER_KEY = 'XXXXXX'
GF_CONSUMER_SECRET = 'XXXXXX'
LAMBDA_ENDPOINT = 'https://examplesite.com/.netlify/functions/newGfEntry'
```

See "/examples/lambda/.env/sample" for the file.

Depending on what build (Gatsby/React/ect) you are using, these will need to be defined and pulled into your project in different ways.

-   Webpack: https://webpack.js.org/plugins/define-plugin/
-   Gatsby: https://www.gatsbyjs.org/docs/environment-variables/#accessing-environment-variables-in-javascript

## Passing the Submission to Gravity Forms

There is a need for a Lambda (or other) server function as the Gravity Forms API keys cannot be stored in a static site. The data needs to be passed to a middleman where the keys are added, before being sent to WordPress.

The data flow is as follows:

1. User submits form
2. Component sends data to lambda (or any server) URL as a POST request
3. Server takes post, and passes it to Gravity Forms as POST request
4. Gravity Forms gets data

Point 3 can be managed in multiple ways, depending on your build.

## Implementing Google reCAPTCHA

On your Gatsby project set up an Environment Variable named `GATSBY_RECAPTCHA_SITE_KEY` with your reCAPTCHA site key as value. This variable will be automatically used whenever Gravity Form that has a reCAPTCHA field.

Upon responding to the captcha Google sends back a **reCAPTCHA response token** that gets stored in a hidden `<input>` on your form. When your form data is sent back to your Wordpress website(through a Lambda function), Gravity Forms will automatically [verify the reCAPTCHA token](https://developers.google.com/recaptcha/docs/verify) token to ensure it was sent by a human.

## Adding the Lambda (for Netlify)

If you are using Netlify then it is recommended you use a Lambda function. This process is _relatively_ plug and play.

To enable the component to pass data from a static site to a server needs a little big of help to bridge the gap. As Gravity Forms uses secret keys to read/write, there needs to be somewhere safe to hold and manage these details.

Using a combination of environment variables and a Lambda function we can navigate these insecure waters.

Add the following function as a Lambda function, and add your Gravity Form keys as environment variables (these will be already set if you are using the gatsby-source-gravityforms plugin).

The steps below are a boilerplate to build this bridge. However you will need to add a new step in your development process. [This blog post explains](https://travishorn.com/netlify-lambda-functions-from-scratch-1186f61c659e) how to start locally developing lambda functions. You can test the function locally by adding the below environment variables. _See section below about testing on localhost and circumventing security warnings_

```env.development
LAMBDA_ENDPOINT="http://localhost:9000/.netlify/functions/newGfEntry"
```

```env.production
LAMBDA_ENDPOINT="https://website-name/.netlify/functions/newGfEntry"
```

1. Add a folder called "lambda" in your projects /src folder
2. Create a file inside called "newGfEntry.js"
3. Copy the code from /examples/lambda/newGfEntry.js into that file
4. Make sure all environment variables at the top of the code have been updated with yours.
5. Add a folder at the root of your project called "lambda". This will be empty. The built lambda function will go in here on deployment.
6. Create a file at the root of your project called netlify.toml
7. Add the following code to netlify.toml:

```netlify.toml
[build]
  Functions = "lambda"
  Command = "npm run build:lambda && gatsby build"

[build.environment]
  GF_CONSUMER_KEY="XXX"
  GF_CONSUMER_SECRET="XXX"
```

The `netlify.toml` file will override your build command on deployment. So we need to tell Netlify to build your lamdba function _and also_ your Gatsby site.

The lambda function _does not_ have access to your `.env.*` files you need to define the same keys here again (it is unfortunate to double handle this and a solution would be appreciated).

When done, you will have created these files and folders:
./netlify.toml
./lambda/
./src/lambda/
./src/lambda/newGfEntry.js

To test all this make sure to run `npm run start:lambda` in one tab, which will spin up the endpoint at `http://localhost:9000`, and then run `gatsby develop` in another.

If you have any issues with these steps, see these articles:

-   https://www.netlify.com/docs/functions/
-   https://travishorn.com/netlify-lambda-functions-from-scratch-1186f61c659e
-   https://macarthur.me/posts/building-a-lambda-function-with-netlify

### Using a Server

TODO

### Running on Localhost

If you are running this in a development build on localhost in Chrome, you will come across a Cors issue. No matter what you do, the request will not be read. This is due to Chrome not allowing this.

A solution for a development environment - Run Chrome with the following flag: --disable-web-security

For more information: https://stackoverflow.com/questions/10883211/deadly-cors-when-http-localhost-is-the-origin/10892392#10892392

## Self Signed Certificate Error - SSL

If you are having Self Signed Certificate issues, put this at the top of the newGfEntry.js file.

```
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0"
```

-   But only on your localhost!!! \*

## Testing & Developing

Firstly, yes please! Any help would be great.

If you are developing locally, you may run into an error "Cannot resolve React". If you do, check out this article: https://thoughtsandstuff.com/building-react-components-for-gatsby-using-npm-link-and-hooks-cant-resolve-react-solution

## To Do

### Field Components

-   [x] Input
-   [x] Textarea
-   [ ] Select (half done, need to add default values)
-   [ ] Multiselect
-   [x] Number
-   [ ] Checkbox (half done, need to add default values)
-   [ ] Radio (half done, need to add default values)
-   [x] Hidden
-   [x] HTML
-   [x] Captcha
-   [x] Add masking to inputs

### General Form

-   [ ] Honeypot
-   [x] Add submit/error callback for custom use

### Send to CMS

-   [x] Turn data into Gravity Forms schema
-   [x] Function to send/receive data from CMS
-   [x] Error handling provided by Gravity Forms

### Add Tests to Inputs

-   [ ] Input
-   [ ] Textarea
-   [ ] Select (half done, need to add default values)
-   [ ] Multiselect
-   [ ] Number
-   [ ] Checkbox (half done, need to add default values)
-   [ ] Radio (half done, need to add default values)
-   [ ] Hidden
-   [ ] HTML
-   [ ] Captcha

# Update

Split into a component that can work with GF, or be created by a custom object and pass to any backend api.

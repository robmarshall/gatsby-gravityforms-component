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

[GraphQL Fragments](https://www.gatsbyjs.org/docs/using-graphql-fragments/) are available from this component for making fetching the needed data. The `GravityFormComponent` fragment can be used on any `GF__Form` type node. Example:

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

### Using in gatsby-node.js

GraphQL fragments are automatically available to Gatsby components. If you're looking to use these in `gatsby-node.js` you will need to import them from `gatsby-gravityforms-component/fragments` using the below snippet.

```
import 'node_modules/gatsby-gravityforms-component/fragments.js'
```

### Custom Query

Sometimes you may need to customize this, depending on the plugins API version,
or if you want to reduce the weight of the request due to not using all fields.

The full fragment can be found in /src/fragments.js. Copy this into your hook.

## Using the component

1. Once you have set up [gatsby-source-gravityforms](https://www.npmjs.com/package/gatsby-source-gravityforms)
2. Import the component where you want to use it
3. Grab the GraphQL data from the gatsby-source-gravityforms plugin and pass to component
4. Set the form ID
5. Add your environment variables
6. [Add the Lambda function](#adding-the-lambda-for-netlify)

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

function handleSuccess({values, reset, confirmations}) => {
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
-   successCallback: function to be called on successful form submission. values: form values, reset: function to reset form, confirmations: form confirmations set in WP GF.
-   errorCallback: function to be called on error in form submission. values: form values, reset: function to reset form, error: error response from API.

## Add Environment Variables

The following environment variables should be added to your hosting provider backend. If unsure, most providers have an article explaining the process of adding them. A quick Google should find this.

```js
GATSBY_GF_CONSUMER_KEY = 'XXXXXX'
GATSBY_GF_CONSUMER_SECRET = 'XXXXXX'
GATSBY_LAMBDA_ENDPOINT =
    'https://examplesite.com/.netlify/functions/new-gf-entry'
```

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

The steps below are a boilerplate to build this bridge. You can test the function locally by adding the below environment variables.

### 1. Install Netlify CLI

You will first need to install the [netlify-cli](https://docs.netlify.com/cli/get-started/#installation) package. This allows easy local use of Netlify Lambda functions.

### 2. Add Lambda Function

_See section below about testing on localhost and circumventing security warnings_

1. Add a folder called "lambda" in your projects /src folder
2. Create a file inside called "new-gf-entry.js"
3. Copy the code from /examples/new-gf-entry.js into that file
4. Create a file at the root of your project called netlify.toml
5. Add the following code to netlify.toml:

```netlify.toml
[build]
    functions = "lambda"
```

We use the `netlify.toml` to show Netlify where to get the lambda function from.

When done, you will have created these files and folders:
./netlify.toml
./src/lambda/
./src/lambda/new-gf-entry.js

### 3. Add Lambda .env Variables

```env.development
LAMBDA_ENDPOINT="http://localhost:8888/.netlify/functions/new-gf-entry"
```

```env.production
LAMBDA_ENDPOINT="https://website-name/.netlify/functions/new-gf-entry"
```

### 4. Test Locally

To test all this make sure to run `netlify dev`, this will spin up your site at `http://localhost:8888/`, you can then access the function at: `http://localhost:8888/.netlify/functions/new-gf-entry`.

When `netlify dev` is run, it will create a new folder called 'lambda' in the root, with the compiled function.

If you have any issues with these steps, see these articles:

-   https://www.netlify.com/docs/functions/
-   https://travishorn.com/netlify-lambda-functions-from-scratch-1186f61c659e
-   https://macarthur.me/posts/building-a-lambda-function-with-netlify

### Directly into WordPress

_Warning: This is lack on security and is only as an example_

If you are unable to set up a lambda function, and are looking to plug directly into your WordPress install, this is
how to do it. It essentially bypasses the need for API keys.

Add the code within 'examples/gf-api.php' to your theme.

Then set the LAMBDA_ENDPOINT environment variable to: 'https://website-name/formsubmit/v1/submit/.

### Running on Localhost

If you are running this in a development build on localhost in Chrome, you will come across a Cors issue. No matter what you do, the request will not be read. This is due to Chrome not allowing this.

A solution for a development environment - Run Chrome with the following flag: --disable-web-security

For more information: https://stackoverflow.com/questions/10883211/deadly-cors-when-http-localhost-is-the-origin/10892392#10892392

## Self Signed Certificate Error - SSL

If you are having Self Signed Certificate issues during development, put this at the top of the new-gf-entry.js file.
This may show in the form of 'unsupported certificate purpose' error.

```
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0"
```

But only on your localhost!!! \*

## Testing & Developing

Firstly, yes please! Any help would be great.

If you are developing locally, you may run into an error "Cannot resolve React". If you do, check out this article: https://thoughtsandstuff.com/building-react-components-for-gatsby-using-npm-link-and-hooks-cant-resolve-react-solution

### Developing Locally

To develop the component, you first need to link it to a Gatsby project. This is so you have an environment to work with. The [Gatsby Default Starter](https://github.com/gatsbyjs/gatsby-starter-default) is a good choice.

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

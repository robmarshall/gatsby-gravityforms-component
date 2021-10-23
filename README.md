# Gatsby GraphQl Gravity Forms Component

A (relatively) plug and play component for parsing GraphQL Gravity Form data. Outputs a component using BEM classes, meaning all you need to do is style it.

Uses [React Hook Forms](https://react-hook-form.com/) under the hood for all that good state management.

## Installation

```js
# Install the component
yarn add gatsby-plugin-gravityforms-component

# Or with NPM
npm i gatsby-plugin-gravityforms-component
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

## Using the component

2. Import the component where you want to use it
3. Add your environment variables

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
        formData={}
        presetValues={{ input_1: 'special_value' }}
        successCallback={handleSuccess}
        errorCallback={handleError}
    />
)
export default examplePage
```

This outputs the form that has been set up in WordPress - Gravity Forms. Ready for you to style it!

-   formData: The data passed from the query function - this is the same for all forms
-   presetValues: An object, with the keys set as the input ID (shown in Gravity Forms editor) and the value to set the field as. Great for hidden fields.
-   successCallback: function to be called on successful form submission. values: form values, reset: function to reset form, confirmations: form confirmations set in WP GF.
-   errorCallback: function to be called on error in form submission. values: form values, reset: function to reset form, error: error response from API.

## Add Environment Variables

The following environment variables should be added to your hosting provider backend. If unsure, most providers have an article explaining the process of adding them. A quick Google should find this.

```js
GATSBY_GF_CONSUMER_KEY = 'XXXXXX'
GATSBY_GF_CONSUMER_SECRET = 'XXXXXX'
```

## Implementing Google reCAPTCHA

On your Gatsby project set up an Environment Variable named `GATSBY_RECAPTCHA_SITE_KEY` with your reCAPTCHA site key as value. This variable will be automatically used whenever Gravity Form that has a reCAPTCHA field.

Upon responding to the captcha Google sends back a **reCAPTCHA response token** that gets stored in a hidden `<input>` on your form. When your form data is sent back to your Wordpress website(through a Lambda function), Gravity Forms will automatically [verify the reCAPTCHA token](https://developers.google.com/recaptcha/docs/verify) token to ensure it was sent by a human.

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

variables# Gravity Forms Form Component

This code is the beginning of the front end for gatsby-source-gravityforms.

## Installation

```js
# Install the plugin
yarn add gatsby-gravityforms-component

# Or with NPM
npm i gatsby-gravityforms-component
```

## Using the component

1. Once you have set up [gatsby-source-gravityforms](https://www.npmjs.com/package/gatsby-source-gravityforms)
2. Import the component where you want to use it
3. Grab the GraphQL data from the gatsby-source-gravityforms plugin and pass to component
4. Set the form ID
5. Add the Lambda function (scroll down a little)

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
                            formId
                            slug
                            apiURL
                            descriptionPlacement
                            formFields {
                                id
                                label
                                description
                                descriptionPlacement
                                type
                                choices
                                content
                                errorMessage
                                inputMaskValue
                                isRequired
                                visibility
                                cssClass
                                placeholder
                                size
                                defaultValue
                                maxLength
                            }
                            button {
                                text
                            }
                            confirmations {
                                message
                            }
                        }
                    }
                }
            }
        `
    )
    return allGfForm
}

const examplePage = () => <GravityFormForm id={1} formData={allGravityData} />
export default examplePage
```

This outputs the form set up in WordPress, ready to go.

## Adding the Lambda

So you decided to make a static site, but then expect it to be easy to send data using secret keys to a server.

Well, it is!

Add the following function as a Lambda function, and add your Gravity Form keys as environment variables (these will be already set if you are using the gatsby-source-gravityforms plugin)

``js
// Example function will go here once I have made it.
// If you fancy taking over and sending a PR, I will be happy...

``

## To Do

### Field Components

-   [x] Input
-   [x] Textarea
-   [x] Select
-   [ ] Multiselect
-   [x] Number
-   [x] Checkbox
-   [x] Radio
-   [x] Hidden
-   [x] HTML

-   [x] Add masking to inputs

### General Form

-   [ ] Honeypot
-   [ ] Styling

### Send to CMS

-   [ ] Turn data into Gravity Forms schema
-   [ ] Function to send/receive data from CMS
-   [ ] Error handling provided by Gravity Forms

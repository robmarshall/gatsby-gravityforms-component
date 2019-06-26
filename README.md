# Gravity Forms Form Component

This code is the beginning of the front end for gatsby-source-gravityforms.

## Installation

```js
# Install the plugin
yarn add gatsby-gravityforms-components

# Or with NPM
npm i gatsby-gravityforms-components
```

## Using the component

1. Once you have set up [gatsby-source-gravityforms](https://www.npmjs.com/package/gatsby-source-gravityforms)
2. Import the component where you want to use it
3. Grab the GraphQL data from the gatsby-source-gravityforms plugin and pass to component
4. Set the form ID

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
                            formFields {
                                id
                                label
                                labelPlacement
                                type
                                choices
                                errorMessage
                                inputMaskValue
                                isRequired
                                visibility
                                cssClass
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

## To Do

-   Parse all fields - correct types
-   Properly semantic
-   Handle errors provided by Gravity Forms
-   Always create honeypot
-   Styling???

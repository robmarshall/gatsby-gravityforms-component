import { graphql } from 'gatsby'

export const fragment = graphql`
    fragment GravityFormComponent on GF__Form {
        formId
        title
        slug
        apiURL
        labelPlacement
        descriptionPlacement
        subLabelPlacement
        formFields {
            ...GravityFormField
        }
        button {
            text
        }
        confirmations {
            message
        }
    }

    fragment GravityFormField on GF__FormFormFields {
        id
        label
        subLabelPlacement
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
`

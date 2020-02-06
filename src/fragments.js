import { graphql } from 'gatsby'

export const GravityFormComponent = graphql`
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
            id
            name
            isDefault
            type
            message
            url
            queryString
            disableAutoformat
        }
    }
`

export const GravityFormField = graphql`
    fragment GravityFormField on GF__FormFormFields {
        id
        label
        labelPlacement
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
        captchaTheme
    }
`

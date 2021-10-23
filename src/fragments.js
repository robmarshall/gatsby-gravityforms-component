import { graphql } from 'gatsby'

export const Button = graphql`
    fragment Button on WpButton {
        conditionalLogic {
            actionType
            logicType
            rules {
                fieldId
                operator
                value
            }
        }
        imageUrl
        text
        type
    }
`

export const FormConfirmation = graphql`
    fragment FormConfirmation on WpFormConfirmation {
        conditionalLogic {
            actionType
            logicType
            rules {
                fieldId
                operator
                value
            }
        }
        id
        isDefault
        message
        name
        pageId
        queryString
        type
        url
    }
`

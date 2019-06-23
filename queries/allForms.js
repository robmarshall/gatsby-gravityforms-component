import { useStaticQuery, graphql } from "gatsby"

/**
 * Runs the GraphQL query to get all form data from gatsby-source-gravityforms
 * This is in this file, as it makes things easier to read. It would be been
 * faster to put everything in one file, but this will probably grow a lot!
 *
 * All data must be returned then filtered as we cannot provide variables to
 * static queries.
 */

export default id => {
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

  // Filter returned data to get specific form
  const form = allGfForm.edges.filter(function(form) {
    return parseInt(form.node.formId) === parseInt(id)
  })

  // If we have a form, clean up a little more before returning
  // Do so many crazy checks because each level needs checking
  // to stop errors
  if (
    typeof form[0] !== "undefined" &&
    typeof form[0]["node"] !== "undefined"
  ) {
    return form[0]["node"]
  }

  return false
}

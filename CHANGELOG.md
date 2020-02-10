# Changelog

## v2.0.0

1. fix: BREACKING CHANGE - Axios call to Lamda was structured incorrectly, meant backend was recieving nested data structure that was suppose to be the Axios config object. data is no longer at `data.data.payload` but `data.payload` as was intended.
2. chore: Added yarn.lock and upgrade many dependencies.
3. feat: added success/error callbacks to be called on completion of form submission
4. fix: fixed handling of error response from api to correctly trigger completion/error message.
5. fix: Graphql fragments not being found by Gatsby.
6. fix: there were some merge issues in [v1.0.10](#v1.0.10) that have no we have now been resolved

## v1.0.10

1. feat: Support for ReCaptcha form input.
2. feat: Support for native Gravity Forms styles. Import their default stylesheets to get the Gravity Forms styling!!

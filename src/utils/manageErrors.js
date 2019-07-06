/**
 * Take the error function and return the correct string for
 * that error
 */

export const manageSingleErrors = (errors, customError) => {
    // If the user has set a custom error message
    if (customError) {
        return customError
    }

    // If we already have a message set, use that
    if (errors.message) {
        return errors.message
    }

    return ''
}

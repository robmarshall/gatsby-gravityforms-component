export const submissionHasOneFieldEntry = (values) => {
    const getFieldWithValues = Object.keys(values).filter((key) => {
        if (
            values[key] &&
            values[key].hasOwnProperty('length') &&
            values[key].length > 0
        ) {
            return values[key]
        }

        return false
    })

    if (getFieldWithValues.length > 0) {
        return true
    }

    return false
}

/**
 * Check form data for arrays (indicating input groups) which need to have their names changed for GravityForms to recognize them.
 *
 * @param {Object} values - All form data to be filtered
 * @returns An object of modified input groups
 */
export const cleanGroupedFields = (values) => {
    for (const [key, value] of Object.entries(values)) {
        if (Array.isArray(value)) {
            value
                .filter((spot) => typeof spot !== undefined)
                .forEach(
                    (inputValue, i) => (values[`${key}_${i + 1}`] = inputValue)
                )
            delete values[key]
        }
    }

    return values
}

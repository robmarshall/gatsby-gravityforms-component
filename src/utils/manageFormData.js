export const submissionHasOneFieldEntry = values => {
    const getFieldWithValues = Object.keys(values).filter(function(key, index) {
        if (values[key].length > 0) {
            return values[key]
        }

        return false
    })

    if (getFieldWithValues.length > 0) {
        return true
    }

    return false
}

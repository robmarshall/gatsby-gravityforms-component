function createGfKeyFromField(string) {
    const fieldName = 'input_'
    const field = string.slice(string.indexOf(fieldName) + fieldName.length)
    return field.replace('_', '.')
}

function isObjEmpty(obj) {
    for (var key in obj) {
        if (obj.hasOwnProperty(key)) return false
    }
    return true
}

module.exports = {
    createGfKeyFromField,
    isObjEmpty,
}

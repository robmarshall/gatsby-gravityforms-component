function createGfKeyFromField(string) {
    const fieldName = 'input_'
    const field = string.slice(string.indexOf(fieldName) + fieldName.length)
    return field.replace('_', '.')
}

function doesObjectExist(obj) {
    if (typeof obj !== 'undefined') {
        return true
    }
    return false
}

function filteredKeys(obj, filter) {
    let key,
        keys = []
    for (key in obj)
        if (obj.hasOwnProperty(key) && filter.test(key)) keys.push(key)
    return keys
}

// Check if element is an object
function isObject(element) {
    if (typeof element !== 'object') return false
    return true
}

function isObjEmpty(obj) {
    for (var key in obj) {
        if (obj.hasOwnProperty(key)) return false
    }
    return true
}

module.exports = {
    createGfKeyFromField,
    doesObjectExist,
    filteredKeys,
    isObject,
    isObjEmpty,
}

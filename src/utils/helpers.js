import scrollToElement from 'scroll-to-element'

function getFieldID(string) {
    const fieldName = 'field-'
    return string.slice(string.indexOf(fieldName) + fieldName.length)
}

function isObjEmpty(obj) {
    for (var key in obj) {
        if (obj.hasOwnProperty(key)) return false
    }
    return true
}

function slugify(text) {
    return text
        .toString()
        .toLowerCase()
        .replace(/\s+/g, '-') // Replace spaces with -
        .replace(/[^\w\-]+/g, '') // Remove all non-word chars
        .replace(/\-\-+/g, '-') // Replace multiple - with single -
        .replace(/^-+/, '') // Trim - from start of text
        .replace(/-+$/, '') // Trim - from end of text
}

function scrollToElem(elem) {
    scrollToElement(elem)
}

module.exports = {
    getFieldID,
    isObjEmpty,
    scrollToElem,
    slugify,
}

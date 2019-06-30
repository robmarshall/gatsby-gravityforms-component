import SmoothScroll from 'smooth-scroll'

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

function getFieldID(string) {
    const fieldName = 'field-'
    return string.slice(string.indexOf(fieldName) + fieldName.length)
}

function scrollToElem(elem) {
    let scroll = new SmoothScroll()
    let anchor = document.querySelector(elem)
    scroll.animateScroll(anchor)
}

module.exports = {
    getFieldID,
    scrollToElem,
    slugify,
}

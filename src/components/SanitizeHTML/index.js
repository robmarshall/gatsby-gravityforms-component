import React from 'react'
import sanitizeHtml from 'sanitize-html'

const defaultOptions = {
    allowedTags: ['b', 'i', 'em', 'strong', 'a'],
    allowedAttributes: {
        a: ['href'],
    },
}

const sanitize = (dirty, options) => {
    const mergedOptions = { ...defaultOptions, ...options }
    return {
        __html: sanitizeHtml(dirty, mergedOptions),
    }
}

const SanitizeHTML = ({ html, options, ...other }) => {
    const clean = sanitize(html, options)

    if (clean.__html) {
        return <div dangerouslySetInnerHTML={clean} {...other} />
    }
    return false
}

export default SanitizeHTML

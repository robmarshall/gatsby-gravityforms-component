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

const SanitizeHTML = ({ tag = 'div', html, options, ...other }) => {
    const Tag = tag

    const clean = sanitize(html, options)

    if (clean.__html) {
        return <Tag dangerouslySetInnerHTML={clean} {...other} />
    }
    return null
}

export default SanitizeHTML

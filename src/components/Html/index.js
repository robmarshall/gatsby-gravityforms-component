import classnames from 'classnames'
import PropTypes from 'prop-types'
import React from 'react'
import ReactHtmlParser from 'react-html-parser'
import { outputDescription } from '../../utils/inputSettings'

const Html = ({
    name,
    wrapClassName,
    label,
    description,
    descriptionPlacement,
    type,
    className,
    content,
}) => {
    return (
        <div className={wrapClassName}>
            <label htmlFor={name} className="gravityform__label">
                {label}
            </label>
            {outputDescription(description, descriptionPlacement, 'above')}
            <div
                className={classnames(
                    'gravityform__' + type + '__wrap',
                    className
                )}
            >
                {ReactHtmlParser(content)}
            </div>

            {outputDescription(description, descriptionPlacement, 'below')}
        </div>
    )
}

export default Html

Html.propTypes = {
    name: PropTypes.string,
    label: PropTypes.string,
    wrapClassName: PropTypes.string,
    className: PropTypes.string,
    content: PropTypes.string,
    type: PropTypes.string,
    description: PropTypes.string,
    descriptionPlacement: PropTypes.string,
}

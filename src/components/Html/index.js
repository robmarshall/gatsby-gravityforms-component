import React from 'react'
import classnames from 'classnames'
import SanitizeHTML from '../SanitizeHTML'
import { outputDescription } from '../../utils/inputSettings'

const Html = props => {
    return (
        <div className={props.wrapClassName}>
            <label htmlFor={props.name} className="gravityform__label">
                {props.label}
            </label>
            {outputDescription(
                props.description,
                props.descriptionPlacement,
                'above'
            )}
            <SanitizeHTML
                className={classnames(
                    'gravityform__' + props.type + '__wrap',
                    props.className
                )}
                html={props.content}
            />

            {outputDescription(
                props.description,
                props.descriptionPlacement,
                'below'
            )}
        </div>
    )
}

export default Html

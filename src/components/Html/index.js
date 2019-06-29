import React from 'react'
import classnames from 'classnames'

const Html = props => {
    return (
        <div className={props.wrapClassName}>
            <label htmlFor={props.name} className="gravityform__label">
                {props.label}
            </label>
            <div
                className={classnames(
                    'gravityform__' + props.type + '__wrap',
                    props.className
                )}
                dangerouslySetInnerHTML={{
                    __html: props.content,
                }}
            />
        </div>
    )
}

export default Html

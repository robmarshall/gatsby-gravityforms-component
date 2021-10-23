import classnames from 'classnames'
import PropTypes from 'prop-types'
import React from 'react'
import InputWrapper from '../../components/InputWrapper'

const Html = ({ fieldData, name, wrapClassName, ...wrapProps }) => {
    const { content, cssClass, type } = fieldData

    return (
        <InputWrapper
            {...wrapProps}
            inputData={fieldData}
            labelFor={name}
            wrapClassName={classnames(
                wrapClassName,
                'gfield_html',
                'gfield_html_formatted',
                'gfield_no_follows_desc',
                'gravityform__' + type + '__wrap',
                cssClass
            )}
            dangerouslySetInnerHTML={{ __html: content }}
        />
    )
}

export default Html

Html.propTypes = {
    fieldData: PropTypes.shape({
        cssClass: PropTypes.string,
        content: PropTypes.string,
        type: PropTypes.string,
    }),
    name: PropTypes.string,
    wrapClassName: PropTypes.string,
    wrapProps: PropTypes.object,
}

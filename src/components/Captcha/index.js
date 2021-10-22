import PropTypes from 'prop-types'
import { graphql } from 'gatsby'
import React, { useState, useRef, useEffect } from 'react'
import { useFormContext } from 'react-hook-form'
import ReCAPTCHA from 'react-google-recaptcha'

import InputWrapper from '../InputWrapper'

const Captcha = ({ captchaTheme, fieldData, name, ...wrapProps }) => {
    const { register, errors, setValue } = useFormContext()

    if (!process.env.GATSBY_RECAPTCHA_SITE_KEY) {
        return (
            <div className="gravityform__captcha_notification">
                <p>
                    <strong>
                        To use reCAPTCHA, you need to sign up for an API key
                        pair for your site and use it as a node environment
                        variable named GATSBY_RECAPTCHA_SITE_KEY. The key pair
                        consists of a site key and secret. The site key is used
                        to display the widget on your site. Sign up for an API
                        key pair at
                        <a
                            href="http://www.google.com/recaptcha"
                            rel="noopener noreferrer"
                            target="_blank"
                            title="This link opens a new page"
                        >
                            http://www.google.com/recaptcha
                        </a>
                    </strong>
                </p>
            </div>
        )
    }

    const captchaRef = useRef(null)
    const [isLoaded, setLoaded] = useState(false)

    const changeCaptchaToken = (token = '') => {
        setValue('g-recaptcha-response', token, true)
    }

    useEffect(() => {
        if (isLoaded && errors && errors.message) {
            captchaRef.current.reset()
        }
    }, [errors, isLoaded])

    return (
        <InputWrapper
            errors={errors[`g-recaptcha-response`]}
            inputData={fieldData}
            labelFor={name}
            {...wrapProps}
        >
            <ReCAPTCHA
                onExpired={changeCaptchaToken}
                onLoad={() => setLoaded(true)}
                onVerify={changeCaptchaToken}
                ref={captchaRef}
                sitekey={process.env.GATSBY_RECAPTCHA_SITE_KEY}
                theme={captchaTheme || 'light'}
            />
            <input
                name="g-recaptcha-response"
                ref={register({})}
                type="hidden"
            />
        </InputWrapper>
    )
}

Captcha.propTypes = {
    captchaTheme: PropTypes.string,
    fieldData: PropTypes.object,
    name: PropTypes.string,
    wrapClassName: PropTypes.string,
}

export default Captcha

export const CaptchaField = graphql`
    fragment CaptchaField on WpCaptchaField {
        captchaLanguage
        captchaTheme
        captchaType
        conditionalLogic {
            rules {
                fieldId
                operator
                value
            }
            actionType
            logicType
        }
        cssClass
        description
        descriptionPlacement
        displayOnly
        errorMessage
        formId
        id
        label
        layoutGridColumnSpan
        layoutSpacerGridColumnSpan
        pageNumber
        simpleCaptchaBackgroundColor
        simpleCaptchaFontColor
        simpleCaptchaSize
        size
        type
    }
`

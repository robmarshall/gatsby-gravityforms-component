import PropTypes from 'prop-types'
import React, { useState, useRef, useEffect } from 'react'
import Reaptcha from 'reaptcha'

const Captcha = ({
    captchaTheme,
    errors,
    register,
    setValue,
    wrapClassName,
}) => {
    if (!process.env.RECAPTCHA_SITE_KEY) {
        return (
            <p>
                <strong>
                    To use reCAPTCHA, you need to sign up for an API key pair
                    for your site and use it as a node environment variable
                    named RECAPTCHA_SITE_KEY. The key pair consists of a site
                    key and secret. The site key is used to display the widget
                    on your site. Sign up for an API key pair at
                    http://www.google.com/recaptcha.
                </strong>
            </p>
        )
    }

    const captchaRef = useRef(null)
    const [isLoaded, setLoaded] = useState(false)

    const changeCaptchaToken = (token = '') => {
        setValue('g-recaptcha-response', token, true)
    }

    useEffect(() => {
        if (isLoaded && errors && errors.message) {
            console.log('resetting')
            captchaRef.current.reset()
        }
    }, [errors, isLoaded])

    return (
        <div className={wrapClassName}>
            <Reaptcha
                onExpire={changeCaptchaToken}
                onLoad={() => setLoaded(true)}
                onVerify={changeCaptchaToken}
                ref={captchaRef}
                sitekey={process.env.RECAPTCHA_SITE_KEY}
                theme={captchaTheme || 'light'}
            />
            <input
                name="g-recaptcha-response"
                ref={register({})}
                type="hidden"
            />
            {errors && (
                <div className="gravityform__error_message">
                    {errors.message}
                </div>
            )}
        </div>
    )
}

Captcha.propTypes = {
    captchaTheme: PropTypes.string,
    errors: PropTypes.object,
    register: PropTypes.func,
    setValue: PropTypes.func,
    wrapClassName: PropTypes.string,
}

export default Captcha

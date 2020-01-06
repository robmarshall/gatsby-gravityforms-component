import PropTypes from 'prop-types'
import React from 'react'
import Reaptcha from 'reaptcha'

const Captcha = ({ captchaTheme, register, setValue }) => {
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

    const changeCaptchaToken = (token = '') => {
        setValue('g-recaptcha-response', token, true)
    }

    return (
        <>
            <Reaptcha
                onExpire={changeCaptchaToken}
                onVerify={changeCaptchaToken}
                sitekey={process.env.RECAPTCHA_SITE_KEY}
                theme={captchaTheme}
            />
            <input
                name="g-recaptcha-response"
                ref={register({})}
                type="hidden"
            />
        </>
    )
}

Captcha.propTypes = {
    captchaTheme: PropTypes.string,
    register: PropTypes.func,
    setValue: PropTypes.func,
}

export default Captcha

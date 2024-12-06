'use client'

import { useInitFirebasePhoneCaptcha } from '@/utils/firebase/misc'
import { useEffect, useState } from 'react'
import { useRedirectOnLogined } from '@/hooks/use-redirect-on-logined'
import 'react-phone-number-input/style.css'
import SMSLoginForm from './_components/sms-login-form'
import EmailLoginForm from './_components/emaill-login-form'
import LoginMethodSelector from './_components/login-method-selector'

const RETRY_PERIOD = 1000 * 30 // 30 seconds

const LoginMethod = {
  SMS: {
    name: '手機登入',
    value: 'sms',
  },
  Email: {
    name: 'email登入',
    value: 'email',
  },
}

export default function Page() {
  useRedirectOnLogined()
  const captchaContainerRef = useInitFirebasePhoneCaptcha()
  const [now, setNow] = useState(Date.now())
  const [loginMethod, setLoginMethod] = useState(LoginMethod.SMS.value)

  useEffect(() => {
    const timer = setInterval(() => {
      setNow(Date.now())
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  const onSelectorClicked = (method: string) => {
    setLoginMethod(method)
  }

  return (
    <div className="my-auto flex flex-col items-center">
      <div className="mb-5 space-x-3">
        {Object.entries(LoginMethod).map(([key, value]) => (
          <LoginMethodSelector
            key={key}
            text={value.name}
            method={value.value}
            isActive={loginMethod === value.value}
            onClick={onSelectorClicked}
          />
        ))}
      </div>
      <div className="flex flex-col items-center gap-y-10">
        {loginMethod === LoginMethod.SMS.value && (
          <SMSLoginForm now={now} retryPeriod={RETRY_PERIOD} />
        )}
        {loginMethod === LoginMethod.Email.value && (
          <EmailLoginForm now={now} retryPeriod={RETRY_PERIOD} />
        )}
        <div className="hidden" ref={captchaContainerRef}></div>
      </div>
    </div>
  )
}

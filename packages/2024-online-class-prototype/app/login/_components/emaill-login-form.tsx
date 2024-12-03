'use client'

import { useState } from 'react'
import Button from './button'
import Hint from './hint'
import type { ActionCodeSettings } from 'firebase/auth'
import { useLocalStorage } from 'usehooks-ts'
import { ACTION_TIME_STORAGE_KEY, EMAIL_STORAGE_KEY } from '@/constants/config'

const EMAIL_STATE = {
  default: {
    success: false,
    message: ' ',
  },
  success: {
    success: true,
    message: 'email已寄出！',
  },
  other: {
    success: false,
    message: '不明錯誤！',
  },
}

const emailRegex =
  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/

type Props = {
  now: number
  retryPeriod: number
}

export default function EmailLoginForm({ now, retryPeriod }: Props) {
  const [isLoading, setIsLoading] = useState(false)
  const [email, setEmail] = useState('')
  const [emailState, setEmailState] = useState(EMAIL_STATE.default)
  const [lastActionTime, setLastActionTime] = useLocalStorage(
    ACTION_TIME_STORAGE_KEY,
    0
  )
  const [, setEmailInStorage] = useLocalStorage(EMAIL_STORAGE_KEY, '')

  const allowToSubmit =
    emailRegex.test(email) && !isLoading && now - lastActionTime > retryPeriod

  const onLoginClicked = async () => {
    setIsLoading(true)
    setLastActionTime(now)

    const { FirebaseError } = await import('@/utils/firebase/app')
    const { auth, sendSignInLinkToEmail } = await import(
      '@/utils/firebase/auth'
    )

    try {
      const actionCodeSettings: ActionCodeSettings = {
        url: window.location.origin + '/email-login',
        handleCodeInApp: true,
      }

      await sendSignInLinkToEmail(auth, email, actionCodeSettings)

      setEmailInStorage(email)
      setEmailState(EMAIL_STATE.success)
    } catch (error) {
      console.error('Encountered error while sending login email')
      console.error(error)

      if (error instanceof FirebaseError) {
        const errorCode = error.code
        const state =
          errorCode in EMAIL_STATE
            ? EMAIL_STATE[errorCode as keyof typeof EMAIL_STATE]
            : EMAIL_STATE.other
        setEmailState(state)
      } else {
        setEmailState(EMAIL_STATE.other)
      }
    }
    setIsLoading(false)
  }

  return (
    <div className="flex min-h-[265px] flex-col items-center gap-y-2">
      <p className="text-base font-medium leading-[1.8]">
        請輸入購買時的email以獲取登入連結
      </p>
      <input
        className="login-input *:bg-inherit"
        type="email"
        value={email}
        onChange={(e) => {
          setEmail(e.target.value)
        }}
      />
      <Button
        onClick={onLoginClicked}
        disabled={!allowToSubmit}
        isLoading={isLoading}
      >
        送出
      </Button>
      <Hint success={emailState.success} message={emailState.message} />
    </div>
  )
}

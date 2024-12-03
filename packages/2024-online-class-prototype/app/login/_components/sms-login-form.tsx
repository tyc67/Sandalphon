'use client'

import { sendSmsCode } from '@/utils/firebase/misc'
import { useState } from 'react'
import 'react-phone-number-input/style.css'
import type { E164Number } from 'libphonenumber-js'
import PhoneInput, { isPossiblePhoneNumber } from 'react-phone-number-input'
import type { ConfirmationResult } from 'firebase/auth'
import Button from './button'
import Hint from './hint'
import { useLocalStorage } from 'usehooks-ts'

const PHONE_STATE = {
  default: {
    success: false,
    message: ' ',
  },
  success: {
    success: true,
    message: '驗證碼已送出！',
  },
  'auth/missing-phone-number': {
    success: false,
    message: '未填入電話號碼！',
  },
  'auth/invalid-phone-number': {
    success: false,
    message: '電話號碼格式錯誤！',
  },
  other: {
    success: false,
    message: '不明錯誤！',
  },
}

const SMS_STATE = {
  default: {
    success: false,
    message: ' ',
  },
  success: {
    success: true,
    message: ' ',
  },
  'auth/missing-verification-code': {
    success: false,
    message: '未填入驗證碼！',
  },
  'auth/invalid-verification-code': {
    success: false,
    message: '驗證碼錯誤！',
  },
  other: {
    success: false,
    message: '不明錯誤！',
  },
}

type Props = {
  now: number
  retryPeriod: number
}

export default function SMSLoginForm({ now, retryPeriod }: Props) {
  const [isLoading, setIsLoading] = useState(false)
  const [phoneNumber, setPhoneNumber] = useState<E164Number | undefined>()
  const [phoneState, setPhoneState] = useState(PHONE_STATE.default)
  const [smsCode, setSMSCode] = useState('')
  const [smsState, setSMSState] = useState(SMS_STATE.default)
  const [confirmationResult, setConfirmationResult] =
    useState<ConfirmationResult>()
  const [lastActionTime, setLastActionTime] = useLocalStorage(
    'last-action-time',
    0
  )

  const showSMSCodeDialog = !!confirmationResult
  const allowToSubmit =
    isPossiblePhoneNumber(phoneNumber ?? '') &&
    !isLoading &&
    now - lastActionTime > retryPeriod

  const onSubmitClicked = async () => {
    setIsLoading(true)
    setLastActionTime(now)

    const { FirebaseError } = await import('@/utils/firebase/app')

    try {
      const result = await sendSmsCode(phoneNumber!)
      setConfirmationResult(result)
      setPhoneState(PHONE_STATE.success)
    } catch (error) {
      setConfirmationResult(undefined)
      console.error('Encountered error while sending SMS code')
      console.error(error)

      if (error instanceof FirebaseError) {
        const errorCode = error.code
        const state =
          errorCode in PHONE_STATE
            ? PHONE_STATE[errorCode as keyof typeof PHONE_STATE]
            : PHONE_STATE.other
        setPhoneState(state)
      } else {
        setPhoneState(PHONE_STATE.other)
      }
    }
    setIsLoading(false)
  }

  const onLoginClicked = async () => {
    if (!confirmationResult) return

    setIsLoading(true)
    const { FirebaseError } = await import('@/utils/firebase/app')

    try {
      await confirmationResult.confirm(smsCode)
    } catch (error) {
      console.error('Encountered error while verifying SMS code')
      console.error(error)

      if (error instanceof FirebaseError) {
        const errorCode = error.code
        const state =
          errorCode in SMS_STATE
            ? SMS_STATE[errorCode as keyof typeof SMS_STATE]
            : SMS_STATE.other
        setSMSState(state)
      } else {
        setSMSState(SMS_STATE.other)
      }
    }
    setIsLoading(false)
  }

  return (
    <>
      <div className="flex flex-col items-center gap-y-2">
        <p className="text-base font-medium leading-[1.8]">
          請輸入手機號碼以獲取驗證碼
        </p>
        <PhoneInput
          className="login-input *:bg-inherit"
          international={true}
          defaultCountry="TW"
          value={phoneNumber}
          onChange={setPhoneNumber}
          placeholder="+886 912 345 678"
        />
        <Button
          onClick={onSubmitClicked}
          disabled={!allowToSubmit}
          isLoading={isLoading}
        >
          送出
        </Button>
        <Hint success={phoneState.success} message={phoneState.message} />
      </div>
      <div
        className={`flex flex-col items-center gap-y-2 ${showSMSCodeDialog ? 'visible' : 'invisible'}`}
      >
        <p className="text-base font-medium leading-[1.8]">請輸入驗證碼</p>
        <input
          type="text"
          className="login-input"
          value={smsCode}
          onChange={(e) => setSMSCode(e.target.value)}
        />
        <Button
          onClick={onLoginClicked}
          disabled={isLoading}
          isLoading={isLoading}
        >
          登入
        </Button>
        <Hint success={smsState.success} message={smsState.message} />
      </div>
    </>
  )
}

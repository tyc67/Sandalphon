'use client'

import { useInitFirebasePhoneCaptcha, sendSmsCode } from '@/utils/firebase'
import { useEffect, useState } from 'react'
import 'react-phone-number-input/style.css'
import type { E164Number } from 'libphonenumber-js'
import PhoneInput, { isPossiblePhoneNumber } from 'react-phone-number-input'
import { ConfirmationResult } from 'firebase/auth'
import Button from './_components/button'
import Hint from './_components/hint'
import { FirebaseError } from 'firebase/app'
import { useLocalStorage } from 'usehooks-ts'
import { ORIGIN_STORAGE_KEY } from '@/constants/config'
import { useRouter } from 'next/navigation'
import { useAppSelector } from '@/redux/hooks'
import { selectIsLogined } from '@/redux/features/user/selector'

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

const RETRY_PERIOD = 1000 * 60 // 30 seconds

export default function Page() {
  const captchaContainerRef = useInitFirebasePhoneCaptcha()
  const router = useRouter()
  const isLogined = useAppSelector(selectIsLogined)
  const [now, setNow] = useState(Date.now())
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
  const [originPath, , removeOriginPath] = useLocalStorage(
    ORIGIN_STORAGE_KEY,
    ''
  )

  const showSMSCodeDialog = !!confirmationResult
  const allowToSubmit =
    isPossiblePhoneNumber(phoneNumber ?? '') &&
    !isLoading &&
    (showSMSCodeDialog ? now - lastActionTime > RETRY_PERIOD : true)

  const onSubmitClicked = async () => {
    setIsLoading(true)
    setLastActionTime(now)

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

  useEffect(() => {
    const timer = setInterval(() => {
      setNow(Date.now())
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  useEffect(() => {
    if (isLogined) {
      router.push(originPath || '/')
      removeOriginPath()
    }
  }, [router, isLogined, removeOriginPath])

  return (
    <div className="my-auto flex flex-col items-center gap-y-7 lg:gap-y-10">
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
      <div className="hidden" ref={captchaContainerRef}></div>
    </div>
  )
}

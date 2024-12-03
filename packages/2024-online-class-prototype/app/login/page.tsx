'use client'

import { useInitFirebasePhoneCaptcha } from '@/utils/firebase/misc'
import { useEffect, useState } from 'react'
import 'react-phone-number-input/style.css'
import { useLocalStorage } from 'usehooks-ts'
import { ORIGIN_STORAGE_KEY } from '@/constants/config'
import { useRouter } from 'next/navigation'
import { useAppSelector } from '@/redux/hooks'
import { selectIsLogined } from '@/redux/features/user/selector'
import SMSLoginForm from './_components/sms-login-form'
import EmailLoginForm from './_components/emaill-login-form'

const RETRY_PERIOD = 1000 * 30 // 30 seconds

export default function Page() {
  const captchaContainerRef = useInitFirebasePhoneCaptcha()
  const router = useRouter()
  const isLogined = useAppSelector(selectIsLogined)
  const [now, setNow] = useState(Date.now())
  const [originPath, , removeOriginPath] = useLocalStorage(
    ORIGIN_STORAGE_KEY,
    ''
  )

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
    <div className="my-auto flex flex-col items-center gap-y-10">
      <SMSLoginForm now={now} retryPeriod={RETRY_PERIOD} />
      <EmailLoginForm now={now} retryPeriod={RETRY_PERIOD} />
      <div className="hidden" ref={captchaContainerRef}></div>
    </div>
  )
}

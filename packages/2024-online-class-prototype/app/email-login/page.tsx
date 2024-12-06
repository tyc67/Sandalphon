'use client'

import { useCallback, useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useRedirectOnLogined } from '@/hooks/use-redirect-on-logined'
import { useLocalStorage } from 'usehooks-ts'
import { EMAIL_STORAGE_KEY, ORIGIN_STORAGE_KEY } from '@/constants/config'
import Loading from '@/components/loading'
import Button from '../login/_components/button'
import Hint from '../login/_components/hint'

const STAUS = {
  PROCESSING: 'processing',
  SUCCESS: 'success',
  FAILED: 'failed',
}

export default function Page() {
  useRedirectOnLogined()
  const router = useRouter()

  const [emailInStorage, , removeEmailInStorage] = useLocalStorage(
    EMAIL_STORAGE_KEY,
    ''
  )
  const [originPath, , removeOriginPath] = useLocalStorage(
    ORIGIN_STORAGE_KEY,
    ''
  )
  const [status, setStatus] = useState(STAUS.PROCESSING)
  const [errorMessage, setErrorMessage] = useState('')

  const checkEmailLinkSignIn = useCallback(async () => {
    const { FirebaseError } = await import('@/utils/firebase/app')
    const { auth, isSignInWithEmailLink, signInWithEmailLink } = await import(
      '@/utils/firebase/auth'
    )

    if (isSignInWithEmailLink(auth, window.location.href)) {
      if (!emailInStorage) {
        setErrorMessage('請使用相同瀏覽器環境')
        setStatus(STAUS.FAILED)
        return
      }

      try {
        await signInWithEmailLink(auth, emailInStorage, window.location.href)
        removeEmailInStorage()
        setStatus(STAUS.SUCCESS)
        return
      } catch (error) {
        console.error('Encountered error while verifying e-mail link')
        console.error(error)

        if (error instanceof FirebaseError) {
          setErrorMessage(error.code)
        } else {
          setErrorMessage('驗證 e-mail 連結發生不明錯誤')
        }
        setStatus(STAUS.FAILED)
        return
      }
    } else {
      setErrorMessage('連結資訊不正確')
      setStatus(STAUS.FAILED)
      return
    }
  }, [emailInStorage, removeEmailInStorage])

  useEffect(() => {
    checkEmailLinkSignIn()
  }, [checkEmailLinkSignIn])

  return (
    <div className="my-auto flex flex-col items-center">
      {status === STAUS.PROCESSING ? (
        <div className="*:size-28 *:text-black">
          <Loading />
        </div>
      ) : (
        <div className="flex flex-col gap-y-4 text-center text-base leading-[1.8]">
          {status === STAUS.SUCCESS ? (
            <>
              <p className="font-medium text-black">登入成功！</p>
              <Button
                onClick={() => {
                  router.push(originPath || '/')
                  removeOriginPath()
                }}
              >
                開始上課
              </Button>
            </>
          ) : (
            <>
              <p className="font-medium text-[#F04545]">登入失敗！</p>
              <Hint success={false} message={errorMessage} />
            </>
          )}
        </div>
      )}
    </div>
  )
}

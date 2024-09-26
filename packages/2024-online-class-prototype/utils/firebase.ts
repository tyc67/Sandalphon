import { initializeApp } from 'firebase/app'
import { doc, getDoc, getFirestore } from 'firebase/firestore'
import {
  getAuth,
  RecaptchaVerifier,
  signInWithPhoneNumber,
} from 'firebase/auth'
import { COLLECTION_NAME, FIREBASE_CONFIG } from '@/constants/config'
import { useCallback, useEffect, useRef } from 'react'

const firebaseApp = initializeApp(FIREBASE_CONFIG)

declare global {
  interface Window {
    _recaptchaVerifier?: RecaptchaVerifier
    _captchaWidgetId?: number
    grecaptcha?: {
      reset: (widgetId: number) => void
    }
  }
}

const captchaContainerId = 'recaptcha-container'
const captchaContainer = `<div id="${captchaContainerId}"></div>`

const useInitFirebasePhoneCaptcha = () => {
  const auth = getAuth(firebaseApp)
  const containerRef = useRef<HTMLDivElement>(null)

  const registerContainerRef = useCallback((node: HTMLDivElement) => {
    // @ts-expect-error current is read-only
    containerRef.current = node

    if (node) {
      node.id = 'recaptcha-container-wrap'
      node.innerHTML = captchaContainer
    }
  }, [])

  useEffect(() => {
    if (window._recaptchaVerifier) {
      // clear any previous instances and reinitialize DOM container node
      window._recaptchaVerifier.clear()
      if (containerRef.current) {
        containerRef.current.innerHTML = captchaContainer
      }
    }

    window._recaptchaVerifier = new RecaptchaVerifier(
      auth,
      captchaContainerId,
      {
        size: 'invisible',
      }
    )
  }, [])

  return registerContainerRef
}

const sendSmsCode = async (phoneNumber: string) => {
  const auth = getAuth(firebaseApp)
  const appVerifier = window._recaptchaVerifier

  if (!appVerifier) {
    throw new Error('Cannot use invisible captcha. Please reload the page.')
  }

  try {
    const confirmationResult = await signInWithPhoneNumber(
      auth,
      phoneNumber,
      appVerifier
    )

    return confirmationResult
  } catch (confirmationErr) {
    let err = confirmationErr

    // reset the reCAPTCHA
    if (window._captchaWidgetId) {
      window.grecaptcha?.reset(window._captchaWidgetId)
    } else {
      try {
        const widgetId = await window._recaptchaVerifier?.render()

        if (widgetId) {
          window._captchaWidgetId = widgetId
          window.grecaptcha?.reset(widgetId)
        }
      } catch (captchaErr) {
        err = captchaErr
      }
    }

    throw err
  }
}

const getPurchasedClassIDs = async (uid: string): Promise<string[]> => {
  const store = getFirestore(firebaseApp)
  const docRef = doc(store, COLLECTION_NAME, uid)

  return (await getDoc(docRef)).data()?.courses ?? []
}

export {
  firebaseApp,
  useInitFirebasePhoneCaptcha,
  sendSmsCode,
  getPurchasedClassIDs,
}

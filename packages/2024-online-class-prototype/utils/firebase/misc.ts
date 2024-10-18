import { useRef, useEffect, useCallback } from 'react'
import { RecaptchaVerifier } from 'firebase/auth'

declare global {
  interface Window {
    _recaptchaVerifier?: RecaptchaVerifier
    _captchaWidgetId?: number
    grecaptcha?: {
      reset: (widgetId: number) => void
    }
  }
}

export const useInitFirebasePhoneCaptcha = () => {
  const captchaContainerId = 'recaptcha-container'
  const captchaContainer = `<div id="${captchaContainerId}"></div>`
  const containerRef = useRef<Element | null>(null)

  const registerContainerRef = useCallback((node: Element | null) => {
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

    import('./auth').then(({ auth }) => {
      window._recaptchaVerifier = new RecaptchaVerifier(
        auth,
        captchaContainerId,
        {
          size: 'invisible',
        }
      )
    })
  }, [])

  return registerContainerRef
}

export const sendSmsCode = async (phoneNumber: string) => {
  const { auth, signInWithPhoneNumber } = await import('./auth')
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

export const getPurchasedClassIDs = async (uid: string): Promise<string[]> => {
  const { COLLECTION_NAME } = await import('@/constants/config')
  const { db, doc, getDoc } = await import('./firestore')
  const docRef = doc(db, COLLECTION_NAME, uid)

  return (await getDoc(docRef)).data()?.courses ?? []
}

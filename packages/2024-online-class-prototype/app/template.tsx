'use client'

import { AUTH_API_URL, COLLECTION_NAME } from '@/constants/config'
import { selectToken, selectUid } from '@/redux/features/user/selector'
import {
  resetAll,
  setIsLogined,
  setPurchasedClassIDs,
  setToken,
  setUid,
} from '@/redux/features/user/slice'
import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import type { Unsubscribe as AuthUnsubscribe } from 'firebase/auth'
import type { Unsubscribe as StoreUnsubscribe } from 'firebase/firestore'
import { PropsWithChildren, useEffect } from 'react'
import { useDebounceCallback } from 'usehooks-ts'

const fetchSignedCookie = async (token: string) => {
  try {
    const jsonBody = { id_token: token }

    await fetch(`${AUTH_API_URL}/auth/verify_token`, {
      method: 'POST',
      body: JSON.stringify(jsonBody),
      headers: {
        'Content-Type': 'application/json',
      },
    })
  } catch (error) {
    console.error('// Encountered error while retrieving signed cookie //')
    console.error(error)
  }
}

export default function Template({ children }: PropsWithChildren) {
  const dispatch = useAppDispatch()
  const uid = useAppSelector(selectUid)
  const token = useAppSelector(selectToken)

  const debouncedFetchSignedCookie = useDebounceCallback(fetchSignedCookie, 500)

  useEffect(() => {
    let unsubscribeAuthStateChange: AuthUnsubscribe

    import('@/utils/firebase/auth').then(({ auth, onAuthStateChanged }) => {
      unsubscribeAuthStateChange = onAuthStateChanged(auth, async (user) => {
        if (user) {
          const { getPurchasedClassIDs } = await import('@/utils/firebase/misc')
          const idToken = await user.getIdToken()
          const classIDs = await getPurchasedClassIDs(user.uid)
          dispatch(setIsLogined(true))
          dispatch(setUid(user.uid))
          dispatch(setToken(idToken))
          dispatch(setPurchasedClassIDs(classIDs))
          debouncedFetchSignedCookie(idToken)
        } else {
          dispatch(resetAll())
        }
      })
    })

    return () => {
      if (typeof unsubscribeAuthStateChange === 'function')
        unsubscribeAuthStateChange()
    }
  }, [dispatch, debouncedFetchSignedCookie])

  useEffect(() => {
    let unsubscribeIdTokenChange: AuthUnsubscribe

    import('@/utils/firebase/auth').then(({ auth, onIdTokenChanged }) => {
      unsubscribeIdTokenChange = onIdTokenChanged(auth, async (user) => {
        if (user) {
          const idToken = await user.getIdToken()
          dispatch(setToken(idToken))
          debouncedFetchSignedCookie(idToken)
        } else {
          dispatch(resetAll())
        }
      })
    })

    return () => {
      if (typeof unsubscribeIdTokenChange === 'function')
        unsubscribeIdTokenChange()
    }
  }, [dispatch, debouncedFetchSignedCookie])

  useEffect(() => {
    let unsubscribe: StoreUnsubscribe
    if (uid) {
      import('@/utils/firebase/firestore').then(({ db, doc, onSnapshot }) => {
        unsubscribe = onSnapshot(doc(db, COLLECTION_NAME, uid), async (doc) => {
          const classIDs = (await doc.data()?.courses) ?? []
          dispatch(setPurchasedClassIDs(classIDs))
          debouncedFetchSignedCookie(token)
        })
      })
    }

    return () => {
      if (typeof unsubscribe === 'function') unsubscribe()
    }
  }, [dispatch, uid, token, debouncedFetchSignedCookie])

  return children
}

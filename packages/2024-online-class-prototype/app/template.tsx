'use client'

import { COLLECTION_NAME } from '@/constants/config'
import { selectToken, selectUid } from '@/redux/features/user/selector'
import {
  resetAll,
  setIsLogined,
  setPurchasedClassIDs,
  setToken,
  setUid,
} from '@/redux/features/user/slice'
import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import { firebaseApp, getPurchasedClassIDs } from '@/utils/firebase'
import { getAuth, onAuthStateChanged, onIdTokenChanged } from 'firebase/auth'
import {
  doc,
  getFirestore,
  onSnapshot,
  type Unsubscribe,
} from 'firebase/firestore'
import { PropsWithChildren, useCallback, useEffect } from 'react'

export default function Template({ children }: PropsWithChildren) {
  const dispatch = useAppDispatch()
  const uid = useAppSelector(selectUid)
  const token = useAppSelector(selectToken)

  const fetchSignedCookie = useCallback(
    async (givenToken?: string) => {
      try {
        const jsonBody = { id_token: givenToken ?? token }

        await fetch('/auth/verify_token', {
          method: 'POST',
          body: JSON.stringify(jsonBody),
        })
      } catch (error) {
        console.error('// Encountered error while retrieving signed cookie //')
        console.error(error)
      }
    },
    [token]
  )

  useEffect(() => {
    const auth = getAuth(firebaseApp)
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const idToken = await user.getIdToken()
        const classIDs = await getPurchasedClassIDs(user.uid)
        dispatch(setIsLogined(true))
        dispatch(setUid(user.uid))
        dispatch(setToken(idToken))
        dispatch(setPurchasedClassIDs(classIDs))
        fetchSignedCookie(idToken)
      } else {
        dispatch(resetAll())
      }
    })

    return () => unsubscribe()
  }, [dispatch, fetchSignedCookie])

  useEffect(() => {
    const auth = getAuth(firebaseApp)
    const unsubscribe = onIdTokenChanged(auth, async (user) => {
      if (user) {
        const idToken = await user.getIdToken()
        dispatch(setToken(idToken))
        fetchSignedCookie(idToken)
      } else {
        dispatch(resetAll())
      }
    })

    return () => unsubscribe()
  }, [dispatch, fetchSignedCookie])

  useEffect(() => {
    const store = getFirestore(firebaseApp)
    let unsubscribe: Unsubscribe
    if (uid) {
      unsubscribe = onSnapshot(
        doc(store, COLLECTION_NAME, uid),
        async (doc) => {
          const classIDs = (await doc.data()?.courses) ?? []
          dispatch(setPurchasedClassIDs(classIDs))
          fetchSignedCookie()
        }
      )
    }

    return () => {
      if (typeof unsubscribe === 'function') unsubscribe()
    }
  }, [dispatch, uid, fetchSignedCookie])

  return children
}

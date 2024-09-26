'use client'

import { COLLECTION_NAME } from '@/constants/config'
import { selectUid } from '@/redux/features/user/selector'
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
import { PropsWithChildren, useEffect } from 'react'

export default function Template({ children }: PropsWithChildren) {
  const dispatch = useAppDispatch()
  const uid = useAppSelector(selectUid)

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
      } else {
        dispatch(resetAll())
      }
    })

    return () => unsubscribe()
  }, [dispatch])

  useEffect(() => {
    const auth = getAuth(firebaseApp)
    const unsubscribe = onIdTokenChanged(auth, async (user) => {
      if (user) {
        const idToken = await user.getIdToken()
        dispatch(setToken(idToken))
      } else {
        dispatch(resetAll())
      }
    })

    return () => unsubscribe()
  }, [dispatch])

  useEffect(() => {
    const store = getFirestore(firebaseApp)
    let unsubscribe: Unsubscribe
    if (uid) {
      unsubscribe = onSnapshot(
        doc(store, COLLECTION_NAME, uid),
        async (doc) => {
          const classIDs = (await doc.data()?.courses) ?? []
          dispatch(setPurchasedClassIDs(classIDs))
        }
      )
    }

    return () => {
      if (typeof unsubscribe === 'function') unsubscribe()
    }
  }, [dispatch, uid])

  return children
}

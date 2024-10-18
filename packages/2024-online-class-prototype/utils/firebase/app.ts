import { FIREBASE_CONFIG } from '@/constants/config'
import { initializeApp, getApp } from 'firebase/app'

const setupFirebase = () => {
  if (getApp.length) return getApp()
  return initializeApp(FIREBASE_CONFIG)
}

export const firebaseApp = setupFirebase()

export { FirebaseError } from 'firebase/app'

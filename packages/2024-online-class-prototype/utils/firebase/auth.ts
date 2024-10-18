import { initializeAuth, indexedDBLocalPersistence } from 'firebase/auth'
import { firebaseApp } from './app'

export const auth = initializeAuth(firebaseApp, {
  persistence: indexedDBLocalPersistence,
})

export {
  signInWithPhoneNumber,
  signOut,
  onAuthStateChanged,
  onIdTokenChanged,
} from 'firebase/auth'

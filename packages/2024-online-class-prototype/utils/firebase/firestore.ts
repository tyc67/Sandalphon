import { getFirestore } from 'firebase/firestore'
import { firebaseApp } from './app'

export const db = getFirestore(firebaseApp)

export { doc, getDoc, onSnapshot } from 'firebase/firestore'

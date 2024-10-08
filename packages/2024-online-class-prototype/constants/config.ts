import type { FirebaseOptions } from 'firebase/app'

const ENV = process.env.NEXT_PUBLIC_ENV ?? 'dev'
const BASE_JSON_URL = process.env.NEXT_PUBLIC_BASE_JSON_URL ?? ''
const COURSE_JSON_URL = process.env.NEXT_PUBLIC_COURSE_JSON_URL ?? ''
const COLLECTION_NAME = process.env.NEXT_PUBLIC_COLLECTION_NAME ?? 'students'
const AUTH_API_URL = process.env.NEXT_PUBLIC_AUTH_API_URL ?? ''

let FIREBASE_CONFIG: FirebaseOptions = {}

switch (ENV) {
  case 'prod':
    FIREBASE_CONFIG = {
      apiKey: 'AIzaSyC3t05OUKenHGX7_wbrsAVwjwQV40zhyQc',
      authDomain: 'mm-online-course-prod.firebaseapp.com',
      projectId: 'mm-online-course-prod',
      storageBucket: 'mm-online-course-prod.appspot.com',
      messagingSenderId: '528463066935',
      appId: '1:528463066935:web:0a46bd5f399b04ccb6ccb2',
      measurementId: 'G-PJXJM88JHG',
    }
    break
  case 'dev':
  default:
    FIREBASE_CONFIG = {
      apiKey: 'AIzaSyC6wzSi5zHllhMYBQq3HYHx1MUTcYOkOk4',
      authDomain: 'mm-online-course-dev.firebaseapp.com',
      databaseURL: 'https://mm-online-course-dev-default-rtdb.firebaseio.com',
      projectId: 'mm-online-course-dev',
      storageBucket: 'mm-online-course-dev.appspot.com',
      messagingSenderId: '954752678363',
      appId: '1:954752678363:web:62bb8419e4b12912d3cffe',
    }
    break
}

const ORIGIN_STORAGE_KEY = 'origin-pathname'

export {
  ENV,
  BASE_JSON_URL,
  COURSE_JSON_URL,
  COLLECTION_NAME,
  FIREBASE_CONFIG,
  ORIGIN_STORAGE_KEY,
  AUTH_API_URL,
}

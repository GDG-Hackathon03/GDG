import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { getAnalytics, isSupported } from 'firebase/analytics'

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "AIzaSyBAE48UZM2NMS1Tu7ZDpZ3dkf5mPnQcHqg",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "web-lockin.firebaseapp.com",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "web-lockin",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "web-lockin.firebasestorage.app",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "1007388857682",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "1:1007388857682:web:dde555d734465a0680168b",
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID || "G-F3DC6MHBTK"
}

let app = null
let db = null
let analytics = null
let hasFirebaseConfig = false

try {
  hasFirebaseConfig = Object.values(firebaseConfig).some(Boolean)
  if (hasFirebaseConfig) {
    app = initializeApp(firebaseConfig)
    db = getFirestore(app)
    if (typeof window !== 'undefined') {
      isSupported().then(supported => {
        if (supported) analytics = getAnalytics(app)
      }).catch(() => {})
    }
  }
} catch (error) {
  console.warn('Firebase initialization note:', error)
}

export { app, db, analytics }
export const firebaseConfigured = hasFirebaseConfig

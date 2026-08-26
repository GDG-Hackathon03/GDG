import {
  GoogleAuthProvider,
  signInWithPopup,
  signOut as firebaseSignOut,
  onAuthStateChanged
} from 'firebase/auth'
import { auth } from '../firebase'

const googleProvider = new GoogleAuthProvider()
googleProvider.setCustomParameters({ prompt: 'select_account' })

export const signInWithGoogle = async () => {
  if (!auth) throw new Error('Firebase Auth is not initialized')
  return signInWithPopup(auth, googleProvider)
}

export const signOut = async () => {
  if (!auth) return
  return firebaseSignOut(auth)
}

export const onAuthChange = (callback) => {
  if (!auth) {
    callback(null)
    return () => {}
  }
  return onAuthStateChanged(auth, callback)
}

export const getCurrentUser = () => auth?.currentUser ?? null

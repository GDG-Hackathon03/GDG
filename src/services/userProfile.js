import { doc, getDoc, setDoc, updateDoc } from 'firebase/firestore'
import { db, firebaseConfigured } from '../firebase'
import { storage } from './storage'

// ─── Profile ─────────────────────────────────────────────────────────────────

/**
 * Load profile from Firestore. Returns { profile, isNewUser }
 * isNewUser = true means no Firestore doc exists yet → show onboarding
 */
export const loadProfile = async (uid) => {
  if (firebaseConfigured && db && uid) {
    try {
      const snap = await getDoc(doc(db, 'users', uid))
      if (snap.exists()) {
        const data = snap.data()
        const profile = data.profile || null
        if (profile) {
          storage.setProfile(profile)
          return { profile, isNewUser: false }
        }
      }
      // Doc doesn't exist or has no profile → new user
      return { profile: null, isNewUser: true }
    } catch (err) {
      console.warn('Firestore loadProfile failed, using localStorage:', err)
    }
  }
  // Fallback: check localStorage
  const cached = storage.getProfile(null)
  const isNewUser = !cached || !cached.onboarded
  return { profile: cached, isNewUser }
}

export const saveProfile = async (uid, profileData) => {
  // Always update localStorage first (instant feedback)
  storage.setProfile(profileData)

  if (firebaseConfigured && db && uid) {
    try {
      const ref = doc(db, 'users', uid)
      const snap = await getDoc(ref)
      if (snap.exists()) {
        await updateDoc(ref, { profile: profileData, updatedAt: new Date().toISOString() })
      } else {
        await setDoc(ref, {
          profile: profileData,
          progress: { completedTopics: {}, savedCompanies: [] },
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        })
      }
    } catch (err) {
      console.warn('Firestore saveProfile failed (saved locally):', err)
    }
  }
}

// ─── Progress (completed topics + saved companies) ────────────────────────────

export const loadUserProgress = async (uid) => {
  if (firebaseConfigured && db && uid) {
    try {
      const snap = await getDoc(doc(db, 'users', uid))
      if (snap.exists() && snap.data().progress) {
        const progress = snap.data().progress
        if (progress.completedTopics) storage.setCompletedTopics(progress.completedTopics)
        if (progress.savedCompanies) storage.setSavedCompanies(progress.savedCompanies)
        return progress
      }
    } catch (err) {
      console.warn('Firestore loadUserProgress failed, using localStorage:', err)
    }
  }
  return {
    completedTopics: storage.getCompletedTopics(),
    savedCompanies: storage.getSavedCompanies()
  }
}

export const saveUserProgress = async (uid, progressData) => {
  if (progressData.completedTopics !== undefined) storage.setCompletedTopics(progressData.completedTopics)
  if (progressData.savedCompanies !== undefined) storage.setSavedCompanies(progressData.savedCompanies)

  if (firebaseConfigured && db && uid) {
    try {
      const ref = doc(db, 'users', uid)
      await setDoc(ref, { progress: progressData }, { merge: true })
    } catch (err) {
      console.warn('Firestore saveUserProgress failed (saved locally):', err)
    }
  }
}

import { doc, getDoc, setDoc, updateDoc } from 'firebase/firestore'
import { db, firebaseConfigured } from '../firebase'
import { storage } from './storage'

const DEFAULT_PROFILE = {
  name: '',
  major: 'Computer Science',
  year: '3rd Year',
  targetRole: 'Software Engineer',
  targetCompany: 'Google / Atlassian',
  streak: 1
}

// ─── Profile ─────────────────────────────────────────────────────────────────

export const loadProfile = async (uid) => {
  // 1. Try Firestore
  if (firebaseConfigured && db && uid) {
    try {
      const snap = await getDoc(doc(db, 'users', uid))
      if (snap.exists()) {
        const data = snap.data()
        // Keep local cache in sync
        storage.setProfile(data.profile || DEFAULT_PROFILE)
        return data.profile || DEFAULT_PROFILE
      }
    } catch (err) {
      console.warn('Firestore loadProfile failed, using localStorage:', err)
    }
  }
  // 2. Fallback to localStorage
  return storage.getProfile()
}

export const saveProfile = async (uid, profileData) => {
  // Always update localStorage first (instant feedback)
  storage.setProfile(profileData)

  // Then persist to Firestore
  if (firebaseConfigured && db && uid) {
    try {
      const ref = doc(db, 'users', uid)
      const snap = await getDoc(ref)
      if (snap.exists()) {
        await updateDoc(ref, { profile: profileData, updatedAt: new Date().toISOString() })
      } else {
        await setDoc(ref, {
          profile: profileData,
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
        // Sync cache
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
  // Update localStorage
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

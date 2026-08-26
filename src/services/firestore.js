import { addDoc, collection, doc, getDocs, orderBy, query, serverTimestamp, updateDoc, increment } from 'firebase/firestore'
import { db, firebaseConfigured } from '../firebase'
import { initialExperiences, initialApplications } from '../data/mockData'
import { storage } from './storage'

export const getExperiences = async () => {
  if (firebaseConfigured && db) {
    try {
      const snapshot = await getDocs(query(collection(db, 'experiences'), orderBy('createdAt', 'desc')))
      if (!snapshot.empty) {
        return snapshot.docs.map((document) => ({ id: document.id, ...document.data() }))
      }
    } catch (error) {
      console.warn('Firestore fetch failed, falling back to local dataset:', error)
    }
  }
  
  // Fallback to local storage or initial dataset
  const localExp = storage.get('experiences', null)
  if (localExp && localExp.length > 0) return localExp
  return initialExperiences
}

export const addExperience = async (experience) => {
  const newExp = {
    ...experience,
    upvotes: 0,
    time: 'Just now',
    createdAt: new Date().toISOString()
  }

  if (firebaseConfigured && db) {
    try {
      const reference = await addDoc(collection(db, 'experiences'), {
        ...newExp,
        createdAt: serverTimestamp()
      })
      newExp.id = reference.id
    } catch (error) {
      console.warn('Firestore addDoc failed, persisting locally:', error)
      newExp.id = `local-${Date.now()}`
    }
  } else {
    newExp.id = `local-${Date.now()}`
  }

  // Always update local cache
  const existing = await getExperiences()
  const updated = [newExp, ...existing.filter(e => e.id !== newExp.id)]
  storage.set('experiences', updated)
  return newExp
}

export const upvoteExperience = async (experienceId) => {
  if (firebaseConfigured && db && !experienceId.startsWith('local-') && !experienceId.startsWith('exp-')) {
    try {
      const ref = doc(db, 'experiences', experienceId)
      await updateDoc(ref, { upvotes: increment(1) })
    } catch (error) {
      console.warn('Firestore upvote failed:', error)
    }
  }

  const existing = await getExperiences()
  const updated = existing.map(exp => exp.id === experienceId ? { ...exp, upvotes: (exp.upvotes || 0) + 1 } : exp)
  storage.set('experiences', updated)
  return updated
}

export const getApplications = async () => {
  return storage.getApplications(initialApplications)
}

export const saveApplication = async (application) => {
  const current = await getApplications()
  const existsIndex = current.findIndex(a => a.id === application.id)
  let updated
  if (existsIndex >= 0) {
    updated = current.map(a => a.id === application.id ? application : a)
  } else {
    updated = [{ ...application, id: `app-${Date.now()}` }, ...current]
  }
  storage.setApplications(updated)
  return updated
}

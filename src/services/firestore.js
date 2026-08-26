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

export const getApplications = async (uid) => {
  if (firebaseConfigured && db && uid) {
    try {
      const snapshot = await getDocs(query(collection(db, `users/${uid}/applications`), orderBy('appliedDate', 'desc')))
      if (!snapshot.empty) {
        return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
      }
    } catch (error) {
      console.warn('Firestore getApplications failed, falling back to local:', error)
    }
  }
  return storage.getApplications(initialApplications)
}

export const saveApplication = async (uid, application) => {
  let updated
  const current = await getApplications(uid)
  
  if (firebaseConfigured && db && uid) {
    try {
      if (application.id && !application.id.startsWith('app-')) {
        const ref = doc(db, `users/${uid}/applications`, application.id)
        await updateDoc(ref, application)
        updated = current.map(a => a.id === application.id ? application : a)
      } else {
        const ref = await addDoc(collection(db, `users/${uid}/applications`), application)
        application.id = ref.id
        updated = [application, ...current]
      }
      storage.setApplications(updated)
      return updated
    } catch (error) {
      console.warn('Firestore saveApplication failed, persisting locally:', error)
    }
  }

  // Fallback local
  if (!application.id || application.id.startsWith('app-')) {
    application.id = `app-${Date.now()}`
    updated = [application, ...current]
  } else {
    updated = current.map(a => a.id === application.id ? application : a)
  }
  storage.setApplications(updated)
  return updated
}

export const getMockSessions = async (uid) => {
  if (firebaseConfigured && db && uid) {
    try {
      const snapshot = await getDocs(query(collection(db, `users/${uid}/mockSessions`), orderBy('createdAt', 'desc')))
      if (!snapshot.empty) {
        return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
      }
    } catch (error) {
      console.warn('Firestore getMockSessions failed, falling back to local:', error)
    }
  }
  return storage.getMockSessions()
}

export const saveMockSession = async (uid, session) => {
  let updated
  const current = await getMockSessions(uid)

  if (firebaseConfigured && db && uid) {
    try {
      const newSession = { ...session, createdAt: serverTimestamp() }
      const ref = await addDoc(collection(db, `users/${uid}/mockSessions`), newSession)
      session.id = ref.id
      updated = [session, ...current]
      storage.setMockSessions(updated)
      return updated
    } catch (error) {
      console.warn('Firestore saveMockSession failed, persisting locally:', error)
    }
  }

  // Fallback local
  session.id = `mock-${Date.now()}`
  updated = [session, ...current]
  storage.setMockSessions(updated)
  return updated
}

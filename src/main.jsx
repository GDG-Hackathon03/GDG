import React, { useState, useEffect } from 'react'
import { createRoot } from 'react-dom/client'
import Sidebar from './components/Sidebar'
import Topbar from './components/Topbar'
import Overview from './components/Overview'
import PlacementPrep from './components/PlacementPrep'
import InternshipPrep from './components/InternshipPrep'
import CompanyPrep from './components/CompanyPrep'
import Experiences from './components/Experiences'
import PreparationTimeline from './components/PreparationTimeline'
import MockInterview from './components/MockInterview'
import ProgressTracker from './components/ProgressTracker'
import Resources from './components/Resources'
import QuickSearchModal from './components/QuickSearchModal'
import SettingsModal from './components/SettingsModal'
import LoginPage from './components/LoginPage'
import { storage } from './services/storage'
import { loadProfile, loadUserProgress, saveUserProgress } from './services/userProfile'
import { onAuthChange } from './services/auth'
import { Check } from 'lucide-react'
import './styles.css'

// ─── Auth Gate ─────────────────────────────────────────────────────────────

function AuthGate() {
  const [authUser, setAuthUser] = useState(undefined) // undefined = loading

  useEffect(() => {
    const unsubscribe = onAuthChange((user) => {
      setAuthUser(user)
    })
    return unsubscribe
  }, [])

  if (authUser === undefined) {
    return (
      <div className="auth-loading">
        <div className="auth-loading-brand">
          <span className="brand-spark">✦</span>
          <span>LockIn</span>
        </div>
        <div className="spinner" />
      </div>
    )
  }

  if (!authUser) {
    return <LoginPage onLogin={setAuthUser} />
  }

  return <App user={authUser} />
}

// ─── Main App ───────────────────────────────────────────────────────────────

function App({ user }) {
  const [active, setActive] = useState('Overview')
  const [goal, setGoal] = useState('Placement')
  const [menuOpen, setMenuOpen] = useState(false)
  const [toast, setToast] = useState('')
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [isSettingsOpen, setIsSettingsOpen] = useState(false)
  const [selectedCompany, setSelectedCompany] = useState(null)
  const [selectedExperience, setSelectedExperience] = useState(null)

  // Persistent User Data – loaded from Firestore, cached in localStorage
  const [profile, setProfile] = useState(() => storage.getProfile())
  const [completedTopics, setCompletedTopics] = useState(() => storage.getCompletedTopics())
  const [savedCompanies, setSavedCompanies] = useState(() => storage.getSavedCompanies())
  const [profileLoaded, setProfileLoaded] = useState(false)

  // Load user profile & progress from Firestore on mount
  useEffect(() => {
    if (!user?.uid) return
    Promise.all([
      loadProfile(user.uid),
      loadUserProgress(user.uid)
    ]).then(([profile, progress]) => {
      // Merge display name from Google account if profile is empty
      const merged = {
        ...profile,
        name: profile?.name || user.displayName || '',
        photoURL: user.photoURL || null
      }
      setProfile(merged)
      if (progress.completedTopics) setCompletedTopics(progress.completedTopics)
      if (progress.savedCompanies) setSavedCompanies(progress.savedCompanies)
      setProfileLoaded(true)
    }).catch(err => {
      console.warn('Failed to load user data from Firestore:', err)
      setProfileLoaded(true)
    })
  }, [user?.uid])

  const showToast = (message) => {
    setToast(message)
    window.setTimeout(() => setToast(''), 2800)
  }

  const toggleTopicCompletion = (topicId) => {
    setCompletedTopics(prev => {
      const next = { ...prev, [topicId]: !prev[topicId] }
      storage.setCompletedTopics(next)
      // Persist to Firestore
      if (user?.uid) saveUserProgress(user.uid, { completedTopics: next, savedCompanies })
      return next
    })
  }

  const toggleSaveCompany = (companyId) => {
    setSavedCompanies(prev => {
      const next = prev.includes(companyId) ? prev.filter(id => id !== companyId) : [...prev, companyId]
      storage.setSavedCompanies(next)
      // Persist to Firestore
      if (user?.uid) saveUserProgress(user.uid, { completedTopics, savedCompanies: next })
      return next
    })
  }

  const handleQuickNavigate = (moduleName, item = null) => {
    if (moduleName) {
      setActive(moduleName)
      if (moduleName === 'Companies' && item) setSelectedCompany(item)
      if (moduleName === 'Experiences' && item) setSelectedExperience(item)
    } else {
      setIsSearchOpen(true)
    }
  }

  return (
    <div className="app-shell">
      <Sidebar
        active={active}
        setActive={setActive}
        menuOpen={menuOpen}
        setMenuOpen={setMenuOpen}
        profile={profile}
        user={user}
        onOpenSettings={() => setIsSettingsOpen(true)}
      />

      <main className="main-content">
        <Topbar
          active={active}
          setMenuOpen={setMenuOpen}
          onOpenSearch={() => setIsSearchOpen(true)}
          onOpenHelp={() => {
            setActive('Timeline')
            showToast('Loaded the 10-Step Preparation Timeline Guide')
          }}
          onOpenSettings={() => setIsSettingsOpen(true)}
          profile={profile}
          user={user}
        />

        {active === 'Overview' && (
          <Overview
            goal={goal}
            setGoal={setGoal}
            setActive={setActive}
            setSelectedCompany={setSelectedCompany}
            setSelectedExperience={setSelectedExperience}
            showToast={showToast}
            completedTopics={completedTopics}
            profile={profile}
          />
        )}

        {active === 'Placement' && (
          <PlacementPrep
            showToast={showToast}
            completedTopics={completedTopics}
            toggleTopicCompletion={toggleTopicCompletion}
          />
        )}

        {active === 'Internship' && (
          <InternshipPrep showToast={showToast} />
        )}

        {active === 'Companies' && (
          <CompanyPrep
            showToast={showToast}
            selectedCompany={selectedCompany}
            setSelectedCompany={setSelectedCompany}
            savedCompanies={savedCompanies}
            toggleSaveCompany={toggleSaveCompany}
            onOpenExperience={(exp) => {
              setSelectedExperience(exp)
              setActive('Experiences')
            }}
          />
        )}

        {active === 'Experiences' && (
          <Experiences
            showToast={showToast}
            selectedExperience={selectedExperience}
            setSelectedExperience={setSelectedExperience}
            profile={profile}
          />
        )}

        {active === 'Timeline' && (
          <PreparationTimeline
            showToast={showToast}
            completedTopics={completedTopics}
            toggleTopicCompletion={toggleTopicCompletion}
            setActive={setActive}
          />
        )}

        {active === 'Mock interviews' && (
          <MockInterview showToast={showToast} />
        )}

        {active === 'Progress' && (
          <ProgressTracker
            showToast={showToast}
            completedTopics={completedTopics}
            setActive={setActive}
            profile={profile}
          />
        )}

        {active === 'Resources' && (
          <Resources showToast={showToast} />
        )}
      </main>

      {/* Global Quick Search ⌘K Dialog */}
      <QuickSearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onNavigate={handleQuickNavigate}
      />

      {/* Workspace Settings Dialog */}
      <SettingsModal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        profile={profile}
        setProfile={setProfile}
        goal={goal}
        setGoal={setGoal}
        showToast={showToast}
        user={user}
      />

      {/* Global Toast */}
      {toast && (
        <div className="toast">
          <Check size={16} /> {toast}
        </div>
      )}
    </div>
  )
}

const rootElement = document.getElementById('root')
if (rootElement) {
  createRoot(rootElement).render(<AuthGate />)
}

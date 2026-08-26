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
import OnboardingFlow from './components/OnboardingFlow'
import { loadProfile, loadUserProgress, saveUserProgress } from './services/userProfile'
import { onAuthChange } from './services/auth'
import { Check } from 'lucide-react'
import './styles.css'

// ─── Auth Gate ─────────────────────────────────────────────────────────────────
// Handles: loading → login → onboarding (first time) → app

function AuthGate() {
  // undefined = checking auth, null = signed out, object = signed in
  const [authUser, setAuthUser] = useState(undefined)
  // undefined = loading profile, null = need onboarding, object = has profile
  const [profile, setProfile] = useState(undefined)
  const [progress, setProgress] = useState(null)

  // 1. Listen for auth state
  useEffect(() => {
    const unsubscribe = onAuthChange((user) => {
      setAuthUser(user)
      if (!user) {
        setProfile(undefined)
        setProgress(null)
      }
    })
    return unsubscribe
  }, [])

  // 2. When signed in, load profile from Firestore
  useEffect(() => {
    if (!authUser?.uid) return
    setProfile(undefined) // show loading while fetching

    Promise.all([
      loadProfile(authUser.uid),
      loadUserProgress(authUser.uid)
    ]).then(([{ profile: p, isNewUser }, prog]) => {
      setProgress(prog)
      if (isNewUser || !p) {
        setProfile(null) // trigger onboarding
      } else {
        setProfile(p)
      }
    }).catch(err => {
      console.warn('Failed to load user data:', err)
      setProfile(null) // fallback to onboarding
    })
  }, [authUser?.uid])

  // ── Loading spinner
  if (authUser === undefined || (authUser && profile === undefined)) {
    return (
      <div className="auth-loading">
        <div className="auth-loading-brand">
          <span className="brand-spark">✦</span>
          <span>LockIn</span>
        </div>
        <div className="spinner" />
        <p className="auth-loading-label">
          {authUser ? 'Loading your workspace…' : 'Checking sign-in…'}
        </p>
      </div>
    )
  }

  // ── Not signed in → Login
  if (!authUser) {
    return <LoginPage onLogin={setAuthUser} />
  }

  // ── Signed in but no profile → Onboarding
  if (profile === null) {
    return (
      <OnboardingFlow
        user={authUser}
        onComplete={(savedProfile) => setProfile(savedProfile)}
      />
    )
  }

  // ── All good → Main App
  return (
    <App
      user={authUser}
      initialProfile={profile}
      initialProgress={progress}
      onProfileChange={setProfile}
    />
  )
}

// ─── Main App ─────────────────────────────────────────────────────────────────

function App({ user, initialProfile, initialProgress, onProfileChange }) {
  const [active, setActive] = useState('Overview')
  const [goal, setGoal] = useState(initialProfile?.goal || 'Placement')
  const [menuOpen, setMenuOpen] = useState(false)
  const [toast, setToast] = useState('')
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [isSettingsOpen, setIsSettingsOpen] = useState(false)
  const [selectedCompany, setSelectedCompany] = useState(null)
  const [selectedExperience, setSelectedExperience] = useState(null)

  // User data — all sourced from Firestore via AuthGate
  const [profile, setProfileState] = useState(initialProfile)
  const [completedTopics, setCompletedTopics] = useState(
    initialProgress?.completedTopics || {}
  )
  const [savedCompanies, setSavedCompanies] = useState(
    initialProgress?.savedCompanies || []
  )

  const showToast = (message) => {
    setToast(message)
    window.setTimeout(() => setToast(''), 2800)
  }

  const handleProfileChange = (updated) => {
    setProfileState(updated)
    if (updated.goal) setGoal(updated.goal)
    if (onProfileChange) onProfileChange(updated)
  }

  const toggleTopicCompletion = (topicId) => {
    setCompletedTopics(prev => {
      const next = { ...prev, [topicId]: !prev[topicId] }
      saveUserProgress(user.uid, { completedTopics: next, savedCompanies })
      return next
    })
  }

  const toggleSaveCompany = (companyId) => {
    setSavedCompanies(prev => {
      const next = prev.includes(companyId)
        ? prev.filter(id => id !== companyId)
        : [...prev, companyId]
      saveUserProgress(user.uid, { completedTopics, savedCompanies: next })
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
          <InternshipPrep showToast={showToast} user={user} />
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
          <MockInterview showToast={showToast} user={user} />
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

      <QuickSearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onNavigate={handleQuickNavigate}
      />

      <SettingsModal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        profile={profile}
        setProfile={handleProfileChange}
        goal={goal}
        setGoal={setGoal}
        showToast={showToast}
        user={user}
      />

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

import { useState } from 'react'
import { saveProfile } from '../services/userProfile'

const STEPS = ['welcome', 'basic', 'academic', 'goals', 'done']

export default function OnboardingFlow({ user, onComplete }) {
  const [step, setStep] = useState(0)
  const [saving, setSaving] = useState(false)
  const [form, setForm] = useState({
    name: user?.displayName || '',
    major: '',
    year: '',
    targetRole: '',
    targetCompany: '',
    goal: 'Placement'
  })

  const update = (field, val) => setForm(f => ({ ...f, [field]: val }))

  const handleFinish = async () => {
    setSaving(true)
    const profileData = {
      name: form.name.trim(),
      major: form.major.trim(),
      year: form.year,
      targetRole: form.targetRole.trim(),
      targetCompany: form.targetCompany.trim(),
      goal: form.goal,
      streak: 1,
      photoURL: user?.photoURL || null,
      onboarded: true,
      createdAt: new Date().toISOString()
    }
    await saveProfile(user.uid, profileData)
    setSaving(false)
    onComplete(profileData)
  }

  const currentStep = STEPS[step]

  return (
    <div className="onboarding-page">
      <div className="onboarding-bg-orb onboarding-bg-orb-1" />
      <div className="onboarding-bg-orb onboarding-bg-orb-2" />

      <div className="onboarding-container">
        {/* Progress dots */}
        <div className="onboarding-dots">
          {STEPS.slice(1, -1).map((s, i) => (
            <div
              key={s}
              className={`onboarding-dot ${step >= i + 1 ? 'active' : ''}`}
            />
          ))}
        </div>

        {/* STEP: Welcome */}
        {currentStep === 'welcome' && (
          <div className="onboarding-card fade-in">
            <div className="onboarding-brand">
              <span className="brand-spark">✦</span>
              <span>LockIn</span>
            </div>
            <div className="onboarding-avatar-wrap">
              {user?.photoURL
                ? <img src={user.photoURL} alt="" className="onboarding-avatar-img" referrerPolicy="no-referrer" />
                : <div className="onboarding-avatar-fallback">{(user?.displayName || 'U')[0]}</div>
              }
            </div>
            <h1 className="onboarding-title">
              Welcome, <em>{user?.displayName?.split(' ')[0] || 'there'}</em>!
            </h1>
            <p className="onboarding-subtitle">
              Let's set up your placement prep profile in 3 quick steps.
              Your data will be saved to your account and accessible anywhere.
            </p>
            <button className="primary-button onboarding-btn" onClick={() => setStep(1)}>
              Get Started →
            </button>
          </div>
        )}

        {/* STEP: Basic Info */}
        {currentStep === 'basic' && (
          <div className="onboarding-card fade-in">
            <span className="section-kicker">STEP 1 OF 3 · ABOUT YOU</span>
            <h2 className="onboarding-step-title">What should we call you?</h2>
            <p className="onboarding-step-sub">Your name will appear across the app and on shared experiences.</p>

            <div className="onboarding-field">
              <label>Your full name *</label>
              <input
                autoFocus
                type="text"
                placeholder="e.g. Priya Sharma"
                value={form.name}
                onChange={e => update('name', e.target.value)}
              />
            </div>

            <div className="onboarding-nav">
              <button className="filter-button" onClick={() => setStep(0)}>← Back</button>
              <button
                className="primary-button onboarding-btn"
                disabled={!form.name.trim()}
                onClick={() => setStep(2)}
              >
                Continue →
              </button>
            </div>
          </div>
        )}

        {/* STEP: Academic Info */}
        {currentStep === 'academic' && (
          <div className="onboarding-card fade-in">
            <span className="section-kicker">STEP 2 OF 3 · ACADEMICS</span>
            <h2 className="onboarding-step-title">Tell us about your studies</h2>
            <p className="onboarding-step-sub">We'll tailor company recommendations and prep timelines to your stage.</p>

            <div className="onboarding-field">
              <label>Branch / Major *</label>
              <input
                autoFocus
                type="text"
                placeholder="e.g. Computer Science Engineering"
                value={form.major}
                onChange={e => update('major', e.target.value)}
              />
            </div>

            <div className="onboarding-field">
              <label>Current Year / Batch *</label>
              <div className="onboarding-pills">
                {['1st Year', '2nd Year', '3rd Year', '4th Year', 'Final Year (2025)', 'Final Year (2026)', 'Postgraduate'].map(y => (
                  <button
                    key={y}
                    type="button"
                    className={`onboarding-pill-btn ${form.year === y ? 'selected' : ''}`}
                    onClick={() => update('year', y)}
                  >
                    {y}
                  </button>
                ))}
              </div>
            </div>

            <div className="onboarding-nav">
              <button className="filter-button" onClick={() => setStep(1)}>← Back</button>
              <button
                className="primary-button onboarding-btn"
                disabled={!form.major.trim() || !form.year}
                onClick={() => setStep(3)}
              >
                Continue →
              </button>
            </div>
          </div>
        )}

        {/* STEP: Goals */}
        {currentStep === 'goals' && (
          <div className="onboarding-card fade-in">
            <span className="section-kicker">STEP 3 OF 3 · YOUR TARGET</span>
            <h2 className="onboarding-step-title">What are you aiming for?</h2>
            <p className="onboarding-step-sub">This shapes your entire dashboard and preparation roadmap.</p>

            <div className="onboarding-field">
              <label>Primary Goal</label>
              <div className="onboarding-goal-row">
                {['Placement', 'Internship'].map(g => (
                  <button
                    key={g}
                    type="button"
                    className={`onboarding-goal-btn ${form.goal === g ? 'selected' : ''}`}
                    onClick={() => update('goal', g)}
                  >
                    <span className="goal-icon">{g === 'Placement' ? '🎓' : '💼'}</span>
                    <strong>{g}</strong>
                    <span>{g === 'Placement' ? 'Full-time job offer' : 'Internship / PPO'}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="onboarding-field">
              <label>Target Role *</label>
              <input
                type="text"
                placeholder="e.g. Software Engineer, Data Analyst"
                value={form.targetRole}
                onChange={e => update('targetRole', e.target.value)}
              />
            </div>

            <div className="onboarding-field">
              <label>Dream Companies</label>
              <input
                type="text"
                placeholder="e.g. Google, Microsoft, Atlassian"
                value={form.targetCompany}
                onChange={e => update('targetCompany', e.target.value)}
              />
            </div>

            <div className="onboarding-nav">
              <button className="filter-button" onClick={() => setStep(2)}>← Back</button>
              <button
                className="primary-button onboarding-btn"
                disabled={!form.targetRole.trim() || saving}
                onClick={handleFinish}
              >
                {saving
                  ? <><div className="spinner" /> Saving…</>
                  : 'Lock In & Start Preparing 🚀'
                }
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

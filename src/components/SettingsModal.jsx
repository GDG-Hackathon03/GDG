import { useState } from 'react'
import { X, Check, RotateCcw, LogOut } from 'lucide-react'
import { storage } from '../services/storage'
import { saveProfile } from '../services/userProfile'
import { signOut } from '../services/auth'

export default function SettingsModal({
  isOpen,
  onClose,
  profile,
  setProfile,
  goal,
  setGoal,
  showToast,
  user
}) {
  const [formData, setFormData] = useState({
    name: profile?.name || '',
    major: profile?.major || 'Computer Science Engineering',
    year: profile?.year || '3rd Year (2026 Batch)',
    targetRole: profile?.targetRole || 'Software Engineer (SDE-1)',
    targetCompany: profile?.targetCompany || 'Google / Atlassian / Microsoft',
    emailNudge: true,
    communityAlerts: true
  })

  if (!isOpen) return null

  const handleSave = async (e) => {
    e.preventDefault()
    const updated = {
      ...profile,
      name: formData.name,
      major: formData.major,
      year: formData.year,
      targetRole: formData.targetRole,
      targetCompany: formData.targetCompany
    }
    setProfile(updated)
    // Save to Firestore + localStorage
    await saveProfile(user?.uid, updated)
    showToast('Profile saved to your account!')
    onClose()
  }

  const handleResetData = () => {
    if (window.confirm('Are you sure you want to reset your local preparation checklist and cached data?')) {
      localStorage.clear()
      showToast('Local cache reset. Reloading defaults...')
      window.location.reload()
    }
  }

  const handleSignOut = async () => {
    try {
      await signOut()
      showToast('Signed out successfully.')
      onClose()
    } catch (err) {
      showToast('Failed to sign out. Please try again.')
    }
  }

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="share-experience-dialog" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose} aria-label="Close">
          <X size={20} />
        </button>

        <div className="share-head">
          <span className="section-kicker">STUDENT WORKSPACE PREFERENCES</span>
          <h2>Customize Your Preparation Profile</h2>
          {user?.email && (
            <p className="settings-account-row">
              {user.photoURL && (
                <img src={user.photoURL} alt="" className="settings-google-avatar" referrerPolicy="no-referrer" />
              )}
              Signed in as <strong>{user.email}</strong>
            </p>
          )}
        </div>

        <form onSubmit={handleSave} className="share-form">
          <div className="form-row-2">
            <label>
              Full Name
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
              />
            </label>

            <label>
              Academic Major & Branch
              <input
                type="text"
                value={formData.major}
                onChange={(e) => setFormData({ ...formData, major: e.target.value })}
                required
              />
            </label>
          </div>

          <div className="form-row-2">
            <label>
              Graduation Year / Stage
              <input
                type="text"
                value={formData.year}
                onChange={(e) => setFormData({ ...formData, year: e.target.value })}
                required
              />
            </label>

            <label>
              Primary Target Role
              <input
                type="text"
                value={formData.targetRole}
                onChange={(e) => setFormData({ ...formData, targetRole: e.target.value })}
                required
              />
            </label>
          </div>

          <label>
            Dream Target Companies
            <input
              type="text"
              value={formData.targetCompany}
              onChange={(e) => setFormData({ ...formData, targetCompany: e.target.value })}
              placeholder="e.g. Google, Atlassian, Microsoft, Razorpay"
            />
          </label>

          <div className="settings-section" style={{ marginTop: 16 }}>
            <span className="section-kicker">PREPARATION FOCUS</span>
            <div className="goal-switch" style={{ marginTop: 10 }}>
              <span>Primary Goal:</span>
              <button
                type="button"
                className={goal === 'Placement' ? 'selected' : ''}
                onClick={() => setGoal('Placement')}
              >
                Placement
              </button>
              <button
                type="button"
                className={goal === 'Internship' ? 'selected' : ''}
                onClick={() => setGoal('Internship')}
              >
                Internship
              </button>
            </div>
          </div>

          <div className="settings-section" style={{ marginTop: 16 }}>
            <span className="section-kicker">STUDY HABIT NUDGES</span>
            <div className="setting-toggle">
              <div>
                <strong>Daily Practice Reminder</strong>
                <span>Keep your prep streak active</span>
              </div>
              <button
                type="button"
                className={`toggle ${formData.emailNudge ? 'on' : ''}`}
                onClick={() => setFormData({ ...formData, emailNudge: !formData.emailNudge })}
              >
                <i />
              </button>
            </div>

            <div className="setting-toggle">
              <div>
                <strong>New Community Experiences</strong>
                <span>Get notified when candidates post for your saved companies</span>
              </div>
              <button
                type="button"
                className={`toggle ${formData.communityAlerts ? 'on' : ''}`}
                onClick={() => setFormData({ ...formData, communityAlerts: !formData.communityAlerts })}
              >
                <i />
              </button>
            </div>
          </div>

          <div className="form-submit-row" style={{ marginTop: 24, justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', gap: 10 }}>
              <button
                type="button"
                className="text-button"
                style={{ color: '#c85e4c' }}
                onClick={handleResetData}
              >
                <RotateCcw size={14} /> Reset Cache
              </button>
              <button
                type="button"
                className="text-button"
                style={{ color: '#77766f' }}
                onClick={handleSignOut}
              >
                <LogOut size={14} /> Sign Out
              </button>
            </div>

            <div style={{ display: 'flex', gap: 10 }}>
              <button type="button" className="filter-button" onClick={onClose}>
                Cancel
              </button>
              <button type="submit" className="primary-button">
                <Check size={15} /> Save to Account
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}

import { useState } from 'react'
import { signInWithGoogle } from '../services/auth'

export default function LoginPage({ onLogin }) {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleGoogleSignIn = async () => {
    setLoading(true)
    setError('')
    try {
      const result = await signInWithGoogle()
      if (onLogin) onLogin(result.user)
    } catch (err) {
      console.error(err)
      if (err.code === 'auth/popup-closed-by-user') {
        setError('Sign-in popup was closed. Please try again.')
      } else {
        setError('Failed to sign in with Google. Please try again.')
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="login-page">
      {/* Background decorative elements */}
      <div className="login-bg-orb login-bg-orb-1" />
      <div className="login-bg-orb login-bg-orb-2" />
      <div className="login-bg-orb login-bg-orb-3" />

      <div className="login-container">
        {/* Brand */}
        <div className="login-brand">
          <span className="login-brand-spark">✦</span>
          <span className="login-brand-name">LockIn</span>
        </div>

        {/* Hero text */}
        <div className="login-hero">
          <h1 className="login-title">
            Your placement journey,<br />
            <em>finally organized.</em>
          </h1>
          <p className="login-subtitle">
            Company prep, mock interviews, peer experiences, and progress tracking — all in one place.
          </p>
        </div>

        {/* Feature pills */}
        <div className="login-features">
          {[
            { icon: '🎯', label: 'Company-wise prep' },
            { icon: '🤖', label: 'AI mock interviews' },
            { icon: '📈', label: 'Progress tracking' },
            { icon: '👥', label: 'Peer experiences' }
          ].map(f => (
            <div className="login-feature-pill" key={f.label}>
              <span>{f.icon}</span>
              <span>{f.label}</span>
            </div>
          ))}
        </div>

        {/* Sign in card */}
        <div className="login-card">
          <p className="login-card-label">Sign in to continue</p>

          <button
            id="google-signin-btn"
            className={`google-signin-btn ${loading ? 'loading' : ''}`}
            onClick={handleGoogleSignIn}
            disabled={loading}
          >
            {loading ? (
              <>
                <div className="spinner" />
                <span>Signing in…</span>
              </>
            ) : (
              <>
                {/* Google SVG */}
                <svg width="20" height="20" viewBox="0 0 48 48" fill="none">
                  <path d="M47.532 24.552c0-1.636-.146-3.2-.418-4.698H24.48v8.883h12.984c-.56 3.016-2.254 5.572-4.8 7.284v6.056h7.768c4.546-4.188 7.1-10.36 7.1-17.525z" fill="#4285F4"/>
                  <path d="M24.48 48c6.516 0 11.982-2.16 15.976-5.924l-7.768-6.056c-2.16 1.446-4.924 2.302-8.208 2.302-6.312 0-11.66-4.262-13.574-9.993H2.88v6.25C6.856 42.954 15.068 48 24.48 48z" fill="#34A853"/>
                  <path d="M10.906 28.329A14.45 14.45 0 0 1 10.16 24c0-1.498.258-2.952.746-4.329v-6.25H2.88A23.94 23.94 0 0 0 .48 24c0 3.87.926 7.53 2.4 10.58l8.026-6.251z" fill="#FBBC05"/>
                  <path d="M24.48 9.679c3.556 0 6.742 1.222 9.254 3.624l6.942-6.942C36.454 2.388 30.996 0 24.48 0 15.068 0 6.856 5.046 2.88 13.421l8.026 6.25c1.914-5.73 7.262-9.992 13.574-9.992z" fill="#EA4335"/>
                </svg>
                <span>Continue with Google</span>
              </>
            )}
          </button>

          {error && (
            <p className="login-error">{error}</p>
          )}

          <p className="login-disclaimer">
            By signing in, your profile and progress will be saved securely to your account.
          </p>
        </div>

        <p className="login-footer">
          Built for students · Powered by Firebase
        </p>
      </div>
    </div>
  )
}

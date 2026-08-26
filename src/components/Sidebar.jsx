import {
  LayoutDashboard,
  GraduationCap,
  Briefcase,
  Building2,
  MessageSquareQuote,
  Milestone,
  Zap,
  BarChart3,
  BookOpen,
  Settings,
  Flame,
  X,
  ChevronDown,
  Sparkles
} from 'lucide-react'
import { firebaseConfigured } from '../firebase'

export default function Sidebar({
  active,
  setActive,
  menuOpen,
  setMenuOpen,
  profile,
  onOpenSettings,
  experienceCount = 24
}) {
  const mainNav = [
    { label: 'Overview', id: 'Overview', icon: LayoutDashboard, badge: null },
    { label: 'Placement Prep', id: 'Placement', icon: GraduationCap, badge: 'Core' },
    { label: 'Internship Prep', id: 'Internship', icon: Briefcase, badge: 'Guide' },
    { label: 'Company Hub', id: 'Companies', icon: Building2, badge: null },
    { label: 'Experiences', id: 'Experiences', icon: MessageSquareQuote, badge: experienceCount }
  ]

  const toolNav = [
    { label: 'Preparation Timeline', id: 'Timeline', icon: Milestone, badge: '10 Steps' },
    { label: 'Mock Interview', id: 'Mock interviews', icon: Zap, badge: 'AI Test' },
    { label: 'Progress & Strengths', id: 'Progress', icon: BarChart3, badge: null },
    { label: 'Learning Resources', id: 'Resources', icon: BookOpen, badge: 'Curated' }
  ]

  const initials = profile?.name
    ? profile.name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase()
    : 'AK'

  return (
    <aside className={`sidebar ${menuOpen ? 'open' : ''}`}>
      <div className="brand">
        <span className="brand-spark">✦</span>
        <span>prepwise</span>
      </div>

      <button className="close-menu" onClick={() => setMenuOpen(false)} aria-label="Close menu">
        <X size={20} />
      </button>

      <div className="profile-mini" onClick={onOpenSettings} role="button" tabIndex={0} title="Edit profile">
        <div className="avatar">{initials}</div>
        <div>
          <strong>{profile?.name || 'Arjun Kumar'}</strong>
          <span>{profile?.major || 'Computer Science'} · {profile?.year || '3rd Year'}</span>
        </div>
        <ChevronDown size={15} />
      </div>

      <nav>
        <span className="nav-label">Main Journey</span>
        {mainNav.map(({ label, id, icon: Icon, badge }) => (
          <button
            key={id}
            className={`nav-item ${active === id ? 'active' : ''}`}
            onClick={() => {
              setActive(id)
              setMenuOpen(false)
            }}
          >
            <Icon size={18} />
            <span>{label}</span>
            {badge && (typeof badge === 'number' ? <em>{badge}</em> : <span className="new-pill">{badge}</span>)}
          </button>
        ))}

        <span className="nav-label second">Preparation Toolkit</span>
        {toolNav.map(({ label, id, icon: Icon, badge }) => (
          <button
            key={id}
            className={`nav-item ${active === id ? 'active' : ''}`}
            onClick={() => {
              setActive(id)
              setMenuOpen(false)
            }}
          >
            <Icon size={18} />
            <span>{label}</span>
            {badge && <span className="new-pill">{badge}</span>}
          </button>
        ))}
      </nav>

      <div className="sidebar-bottom">
        <div className="streak">
          <div className="streak-icon">
            <Flame size={18} />
          </div>
          <div>
            <strong>{profile?.streak || 4} Day Prep Streak</strong>
            <span>Keep up the daily habit</span>
          </div>
          <Sparkles size={16} color="#d4664d" />
        </div>

        <button
          className={`nav-item ${active === 'Settings' ? 'active' : ''}`}
          onClick={() => {
            if (onOpenSettings) onOpenSettings()
            setMenuOpen(false)
          }}
        >
          <Settings size={18} />
          <span>Settings & Target Role</span>
        </button>

        <div className="firebase-status" title={firebaseConfigured ? 'Connected to live Firebase Cloud Firestore' : 'Running in Offline / Demo Mode with LocalStorage persistence'}>
          <span className={firebaseConfigured ? 'status-dot live' : 'status-dot'}></span>
          {firebaseConfigured ? 'Firebase Connected' : 'Demo Mode (LocalStorage Active)'}
        </div>
      </div>
    </aside>
  )
}

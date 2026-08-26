import { Menu, Search, CircleHelp, Sparkles } from 'lucide-react'

export default function Topbar({
  active,
  setMenuOpen,
  onOpenSearch,
  onOpenHelp,
  onOpenSettings,
  profile
}) {
  const initials = profile?.name
    ? profile.name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase()
    : 'AK'

  const moduleNames = {
    Overview: 'Personalized Student Dashboard',
    Placement: 'Placement Preparation Hub',
    Internship: 'Internship Roadmaps & Tracker',
    Companies: 'Company-Wise Intelligence',
    Experiences: 'Community Interview Experiences',
    Timeline: '10-Step Preparation Timeline',
    'Mock interviews': 'Interactive Mock Interview Room',
    Progress: 'Progress Tracking & Diagnostics',
    Resources: 'Curated Practice Resources',
    Settings: 'Workspace Settings'
  }

  return (
    <header className="topbar">
      <button className="menu-button" onClick={() => setMenuOpen(true)} aria-label="Open navigation menu">
        <Menu size={22} />
      </button>

      <div className="breadcrumb">
        <span>Workspace</span>
        <span>/</span>
        <strong>{moduleNames[active] || active}</strong>
      </div>

      <div className="top-actions">
        <button className="search-button" onClick={onOpenSearch} aria-label="Global search">
          <Search size={16} />
          <span>Search topics, companies, questions...</span>
          <kbd>⌘ K</kbd>
        </button>

        <button className="help-button" onClick={onOpenHelp} title="Platform Guide & Strategy" aria-label="Strategy Guide">
          <CircleHelp size={19} />
        </button>

        <button
          className="avatar small"
          onClick={onOpenSettings}
          title="Account Preferences"
          aria-label="User profile settings"
        >
          {initials}
        </button>
      </div>
    </header>
  )
}

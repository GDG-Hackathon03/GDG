import { useState, useEffect } from 'react'
import { Search, X, Building2, BookOpen, GraduationCap, Briefcase, Zap, ArrowUpRight } from 'lucide-react'
import { initialCompanies, initialExperiences, initialLearningResources } from '../data/mockData'

export default function QuickSearchModal({ isOpen, onClose, onNavigate }) {
  const [query, setQuery] = useState('')

  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault()
        if (isOpen) onClose()
        else onNavigate(null) // trigger open handled by parent
      }
      if (e.key === 'Escape' && isOpen) {
        onClose()
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, onClose, onNavigate])

  if (!isOpen) return null

  const trimmed = query.trim().toLowerCase()

  const matchedCompanies = initialCompanies.filter(c =>
    c.name.toLowerCase().includes(trimmed) ||
    c.role.toLowerCase().includes(trimmed) ||
    c.tags.some(t => t.toLowerCase().includes(trimmed))
  ).slice(0, 4)

  const matchedExperiences = initialExperiences.filter(e =>
    e.company.toLowerCase().includes(trimmed) ||
    e.role.toLowerCase().includes(trimmed) ||
    e.overview.toLowerCase().includes(trimmed)
  ).slice(0, 3)

  const matchedResources = initialLearningResources.filter(r =>
    r.title.toLowerCase().includes(trimmed) ||
    r.category.toLowerCase().includes(trimmed)
  ).slice(0, 3)

  const quickNav = [
    { title: 'Placement Preparation Hub', section: 'Placement', icon: GraduationCap },
    { title: 'Internship Roadmaps & Tracker', section: 'Internship', icon: Briefcase },
    { title: 'Company-Wise Intelligence', section: 'Companies', icon: Building2 },
    { title: 'Mock Interview Practice Room', section: 'Mock interviews', icon: Zap },
    { title: 'Curated Practice Resources', section: 'Resources', icon: BookOpen }
  ]

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="quick-search-dialog" onClick={(e) => e.stopPropagation()}>
        <div className="quick-search-head">
          <Search size={20} className="search-icon" />
          <input
            autoFocus
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Type to search companies, roadmaps, DSA topics, resources..."
          />
          <button className="search-close" onClick={onClose} aria-label="Close search">
            <X size={18} />
          </button>
        </div>

        <div className="quick-search-results">
          {trimmed === '' ? (
            <div className="search-group">
              <span className="search-group-title">QUICK NAVIGATION</span>
              {quickNav.map(({ title, section, icon: Icon }) => (
                <button
                  key={section}
                  className="search-item"
                  onClick={() => {
                    onNavigate(section)
                    onClose()
                  }}
                >
                  <Icon size={16} />
                  <span>{title}</span>
                  <ArrowUpRight size={14} className="arrow" />
                </button>
              ))}
            </div>
          ) : (
            <>
              {matchedCompanies.length > 0 && (
                <div className="search-group">
                  <span className="search-group-title">COMPANIES ({matchedCompanies.length})</span>
                  {matchedCompanies.map((c) => (
                    <button
                      key={c.id}
                      className="search-item"
                      onClick={() => {
                        onNavigate('Companies', c)
                        onClose()
                      }}
                    >
                      <Building2 size={16} />
                      <div className="item-text">
                        <strong>{c.name}</strong>
                        <small>{c.role} · {c.package}</small>
                      </div>
                      <span className="badge-tag">{c.category}</span>
                    </button>
                  ))}
                </div>
              )}

              {matchedExperiences.length > 0 && (
                <div className="search-group">
                  <span className="search-group-title">INTERVIEW EXPERIENCES ({matchedExperiences.length})</span>
                  {matchedExperiences.map((exp) => (
                    <button
                      key={exp.id}
                      className="search-item"
                      onClick={() => {
                        onNavigate('Experiences', exp)
                        onClose()
                      }}
                    >
                      <GraduationCap size={16} />
                      <div className="item-text">
                        <strong>{exp.company} — {exp.role}</strong>
                        <small>"{exp.quote.slice(0, 60)}..."</small>
                      </div>
                      <span className={`status ${exp.status === 'Selected' ? 'complete' : 'in-progress'}`}>{exp.status}</span>
                    </button>
                  ))}
                </div>
              )}

              {matchedResources.length > 0 && (
                <div className="search-group">
                  <span className="search-group-title">LEARNING RESOURCES ({matchedResources.length})</span>
                  {matchedResources.map((res) => (
                    <button
                      key={res.id}
                      className="search-item"
                      onClick={() => {
                        onNavigate('Resources')
                        onClose()
                      }}
                    >
                      <BookOpen size={16} />
                      <div className="item-text">
                        <strong>{res.title}</strong>
                        <small>{res.type} · {res.category}</small>
                      </div>
                      <ArrowUpRight size={14} className="arrow" />
                    </button>
                  ))}
                </div>
              )}

              {matchedCompanies.length === 0 && matchedExperiences.length === 0 && matchedResources.length === 0 && (
                <div className="empty-search">
                  No matching results for "<strong>{query}</strong>". Try searching for "Google", "DSA", "SQL", or "Aptitude".
                </div>
              )}
            </>
          )}
        </div>

        <div className="quick-search-footer">
          <span>Navigate with <kbd>↑</kbd> <kbd>↓</kbd></span>
          <span>Select with <kbd>↵</kbd></span>
          <span>Close with <kbd>ESC</kbd></span>
        </div>
      </div>
    </div>
  )
}

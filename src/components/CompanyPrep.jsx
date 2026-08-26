import { useState } from 'react'
import {
  Search,
  Building2,
  UsersRound,
  Code2,
  BarChart3,
  Bookmark,
  BookmarkCheck,
  CheckCircle2,
  ArrowUpRight,
  Sparkles,
  ExternalLink,
  ChevronDown,
  X,
  Target
} from 'lucide-react'
import { initialCompanies, initialExperiences } from '../data/mockData'

export default function CompanyPrep({
  showToast,
  selectedCompany,
  setSelectedCompany,
  savedCompanies = [],
  toggleSaveCompany,
  onOpenExperience
}) {
  const [search, setSearch] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [modalCompany, setModalCompany] = useState(selectedCompany || null)

  const categories = ['All', 'Product', 'FinTech', 'Consulting', 'Service']

  const filteredCompanies = initialCompanies.filter((company) => {
    const matchesSearch =
      company.name.toLowerCase().includes(search.toLowerCase()) ||
      company.role.toLowerCase().includes(search.toLowerCase()) ||
      company.tags.some((t) => t.toLowerCase().includes(search.toLowerCase()))
    const matchesCat = selectedCategory === 'All' || company.category === selectedCategory
    return matchesSearch && matchesCat
  })

  const openDetails = (company) => {
    setModalCompany(company)
    if (setSelectedCompany) setSelectedCompany(company)
  }

  return (
    <div className="page-wrap module-page">
      {/* Module Heading */}
      <div className="module-heading">
        <div>
          <p className="eyebrow">TARGETED COMPANY INTELLIGENCE</p>
          <h1>Prepare for <em>the Actual Room.</em></h1>
          <p className="subtitle">
            Recruitment processes, round breakdowns, frequently asked problems, and HR culture alignment for top tech recruiters.
          </p>
        </div>
      </div>

      {/* Filter Row */}
      <div className="filter-row" style={{ flexWrap: 'wrap', gap: 10 }}>
        <div className="search-field" style={{ minWidth: 280 }}>
          <Search size={17} />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search companies (e.g. Google, Amazon, Deloitte)..."
          />
          {search && (
            <button className="clear-btn" onClick={() => setSearch('')}>
              <X size={14} />
            </button>
          )}
        </div>

        <div className="cat-pill-group">
          {categories.map((cat) => (
            <button
              key={cat}
              className={`filter-button ${selectedCategory === cat ? 'active-filter' : ''}`}
              onClick={() => setSelectedCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Company Cards Directory */}
      <div className="company-directory-grid">
        {filteredCompanies.map((company) => {
          const isSaved = savedCompanies.includes(company.id)
          return (
            <article className="directory-card interactive" key={company.id} onClick={() => openDetails(company)}>
              <div className={`company-mark ${company.tone}`}>{company.mark}</div>

              <div className="directory-main">
                <div className="directory-topline">
                  <div>
                    <h2>{company.name}</h2>
                    <span>{company.role}</span>
                  </div>
                  <button
                    className="save-icon-btn"
                    onClick={(e) => {
                      e.stopPropagation()
                      toggleSaveCompany(company.id)
                      showToast(isSaved ? `Removed ${company.name} from Watchlist` : `Saved ${company.name} to Watchlist`)
                    }}
                    title={isSaved ? 'Remove from watchlist' : 'Add to watchlist'}
                  >
                    {isSaved ? <BookmarkCheck size={18} color="#ed765f" /> : <Bookmark size={18} color="#aaa69d" />}
                  </button>
                </div>

                <div className="company-package-pill">
                  <strong>{company.package}</strong> · Cutoff: {company.cgpaCutoff} CGPA
                </div>

                <div className="directory-details">
                  <span>
                    <UsersRound size={14} /> {company.roundsCount} Rounds
                  </span>
                  <span>
                    <Code2 size={14} /> {company.tags.slice(0, 2).join(' · ')}
                  </span>
                  <span>
                    <BarChart3 size={14} /> {company.difficulty}
                  </span>
                </div>

                <div className="card-footer-action">
                  <span>View Full Selection Guide</span>
                  <ArrowUpRight size={15} />
                </div>
              </div>
            </article>
          )
        })}

        {filteredCompanies.length === 0 && (
          <div className="empty-state">
            No companies found matching "<strong>{search}</strong>". Try clearing your filters.
          </div>
        )}
      </div>

      {/* Company Deep Dive Modal */}
      {modalCompany && (
        <div className="modal-backdrop" onClick={() => setModalCompany(null)}>
          <div className="company-modal-dialog" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setModalCompany(null)} aria-label="Close">
              <X size={20} />
            </button>

            {/* Modal Header */}
            <div className="modal-hero-header">
              <div className={`company-mark large ${modalCompany.tone}`}>{modalCompany.mark}</div>
              <div>
                <span className="badge-tag">{modalCompany.category}</span>
                <h2>{modalCompany.name}</h2>
                <p>{modalCompany.role} · <strong>{modalCompany.package}</strong></p>
              </div>
            </div>

            <p className="modal-desc">{modalCompany.description}</p>

            <div className="modal-body-scroll">
              {/* Recruitment Process */}
              <div className="modal-section">
                <span className="section-kicker">SELECTION ROUNDS & PROCESS</span>
                <div className="process-timeline">
                  {modalCompany.process.map((p, idx) => (
                    <div className="process-step" key={idx}>
                      <div className="step-badge">{idx + 1}</div>
                      <div className="step-info">
                        <strong>{p.step}</strong>
                        <p>{p.detail}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Eligibility & CGPA */}
              <div className="modal-section">
                <span className="section-kicker">ELIGIBILITY CRITERIA</span>
                <ul className="criteria-list">
                  {modalCompany.eligibility.map((crit, idx) => (
                    <li key={idx}>
                      <CheckCircle2 size={16} color="#5c976a" /> {crit}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Frequently Asked Coding Problems */}
              <div className="modal-section">
                <span className="section-kicker">FREQUENTLY ASKED CODING QUESTIONS</span>
                <div className="faq-problems-list">
                  {modalCompany.frequentQuestions.map((q, idx) => (
                    <div className="faq-prob-item" key={idx}>
                      <div>
                        <strong>{q.title}</strong>
                        <span className={`diff-pill ${q.difficulty.toLowerCase()}`}>{q.difficulty}</span>
                      </div>
                      {q.link && q.link !== '#' && (
                        <a href={q.link} target="_blank" rel="noreferrer" className="text-button">
                          Practice on LeetCode <ExternalLink size={13} />
                        </a>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Company Culture & HR Questions */}
              <div className="modal-section">
                <span className="section-kicker">COMPANY-SPECIFIC BEHAVIORAL QUESTIONS</span>
                <div className="hr-questions-box">
                  {modalCompany.hrQuestions.map((hr, idx) => (
                    <div className="hr-item" key={idx}>
                      <Sparkles size={15} color="#ed765f" />
                      <p>"{hr}"</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="modal-footer-actions">
              <button
                className="filter-button"
                onClick={() => {
                  toggleSaveCompany(modalCompany.id)
                  showToast(
                    savedCompanies.includes(modalCompany.id)
                      ? `Removed ${modalCompany.name} from Watchlist`
                      : `Saved ${modalCompany.name} to Watchlist`
                  )
                }}
              >
                {savedCompanies.includes(modalCompany.id) ? '★ On Your Watchlist' : '☆ Add to Watchlist'}
              </button>

              <button
                className="primary-button"
                onClick={() => {
                  setModalCompany(null)
                  showToast(`Preparation roadmap locked in for ${modalCompany.name}!`)
                }}
              >
                Start Preparation for {modalCompany.name} <ArrowUpRight size={15} />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

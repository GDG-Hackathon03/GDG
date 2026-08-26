import { useState, useEffect } from 'react'
import {
  MessageSquareQuote,
  Search,
  Plus,
  ThumbsUp,
  ArrowUpRight,
  Sparkles,
  Building2,
  Calendar,
  Award,
  CheckCircle2,
  X,
  AlertCircle
} from 'lucide-react'
import { getExperiences, upvoteExperience } from '../services/firestore'
import ShareExperienceModal from './ShareExperienceModal'

export default function Experiences({
  showToast,
  selectedExperience,
  setSelectedExperience,
  profile
}) {
  const [experiences, setExperiences] = useState([])
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState('All')
  const [difficultyFilter, setDifficultyFilter] = useState('All')
  const [isShareModalOpen, setIsShareModalOpen] = useState(false)
  const [viewingExperience, setViewingExperience] = useState(selectedExperience || null)

  useEffect(() => {
    getExperiences().then(exp => setExperiences(exp))
  }, [])

  useEffect(() => {
    if (selectedExperience) {
      setViewingExperience(selectedExperience)
    }
  }, [selectedExperience])

  const handleUpvote = async (e, expId) => {
    e.stopPropagation()
    const updated = await upvoteExperience(expId)
    setExperiences(updated)
    if (viewingExperience && viewingExperience.id === expId) {
      setViewingExperience(prev => ({ ...prev, upvotes: (prev.upvotes || 0) + 1 }))
    }
    showToast('Upvoted! Thank you for supporting peer contributors.')
  }

  const filteredExperiences = experiences.filter(exp => {
    const matchesSearch =
      exp.company.toLowerCase().includes(search.toLowerCase()) ||
      exp.role.toLowerCase().includes(search.toLowerCase()) ||
      exp.quote.toLowerCase().includes(search.toLowerCase())
    const matchesStatus = statusFilter === 'All' || exp.status === statusFilter
    const matchesDiff = difficultyFilter === 'All' || exp.difficulty === difficultyFilter
    return matchesSearch && matchesStatus && matchesDiff
  })

  return (
    <div className="page-wrap module-page">
      {/* Module Heading */}
      <div className="module-heading">
        <div>
          <p className="eyebrow">PEER KNOWLEDGE VAULT · REAL STORIES</p>
          <h1>Learn from Those Who <em>Cleared the Room.</em></h1>
          <p className="subtitle">
            Authentic candidate accounts, round questions, mistakes to avoid, and battle-tested strategies.
          </p>
        </div>

        <button className="primary-button" onClick={() => setIsShareModalOpen(true)}>
          <Plus size={16} /> Share Your Experience
        </button>
      </div>

      {/* Filter Row */}
      <div className="filter-row" style={{ flexWrap: 'wrap', gap: 10 }}>
        <div className="search-field" style={{ minWidth: 260 }}>
          <Search size={17} />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by company, role, or keywords..."
          />
        </div>

        <select
          className="filter-select"
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option value="All">All Verdicts</option>
          <option value="Selected">Selected Only</option>
          <option value="Rejected">Rejected (Learnings)</option>
        </select>

        <select
          className="filter-select"
          value={difficultyFilter}
          onChange={(e) => setDifficultyFilter(e.target.value)}
        >
          <option value="All">All Difficulties</option>
          <option value="Easy">Easy</option>
          <option value="Medium">Medium</option>
          <option value="Hard">Hard</option>
        </select>
      </div>

      {/* Feed Grid */}
      <div className="experience-feed-grid">
        {filteredExperiences.map((exp) => {
          const markTone =
            exp.company === 'Google' ? 'google' :
            exp.company === 'Microsoft' ? 'microsoft' :
            exp.company === 'Deloitte' ? 'deloitte' : 'orange'

          return (
            <article
              className="feed-card interactive"
              key={exp.id}
              onClick={() => setViewingExperience(exp)}
            >
              <div className="experience-meta">
                <div className={`company-mark mini ${markTone}`}>
                  {exp.company[0]}
                </div>
                <div>
                  <strong>{exp.company}</strong>
                  <span>{exp.role} · {exp.author || 'Candidate'}</span>
                </div>
                <time>{exp.time || 'Recently'}</time>
              </div>

              <div className="round-tags">
                <span className={`status ${exp.status === 'Selected' ? 'complete' : 'in-progress'}`}>
                  {exp.status}
                </span>
                <span className={`diff-pill ${exp.difficulty.toLowerCase()}`}>
                  {exp.difficulty}
                </span>
                <small>{exp.roundsCount || (exp.rounds ? exp.rounds.length : 3)} Rounds</small>
              </div>

              <blockquote>“{exp.quote}”</blockquote>

              <div className="feed-card-foot">
                <button
                  className="upvote-btn"
                  onClick={(e) => handleUpvote(e, exp.id)}
                  title="Upvote helpful experience"
                >
                  <ThumbsUp size={14} />
                  <span>{exp.upvotes || 0} Helpful</span>
                </button>

                <span className="read-link">
                  Read Breakdown <ArrowUpRight size={15} />
                </span>
              </div>
            </article>
          )
        })}

        {filteredExperiences.length === 0 && (
          <div className="empty-state" style={{ gridColumn: '1 / -1' }}>
            No interview experiences found matching your filters.
          </div>
        )}
      </div>

      {/* Read Experience Deep Dive Modal */}
      {viewingExperience && (
        <div className="modal-backdrop" onClick={() => setViewingExperience(null)}>
          <div className="company-modal-dialog" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setViewingExperience(null)} aria-label="Close">
              <X size={20} />
            </button>

            <div className="modal-hero-header">
              <div className="company-mark large orange">{viewingExperience.company[0]}</div>
              <div>
                <span className={`status ${viewingExperience.status === 'Selected' ? 'complete' : 'in-progress'}`}>
                  {viewingExperience.status}
                </span>
                <h2>{viewingExperience.company} — {viewingExperience.role}</h2>
                <p>
                  Shared by <strong>{viewingExperience.author}</strong> · Package: <strong>{viewingExperience.package || 'Confidential'}</strong>
                </p>
              </div>
            </div>

            <div className="modal-quote-highlight">
              <blockquote>“{viewingExperience.quote}”</blockquote>
            </div>

            <div className="modal-body-scroll">
              <div className="modal-section">
                <span className="section-kicker">OVERVIEW & RECRUITMENT CONTEXT</span>
                <p className="modal-desc">{viewingExperience.overview}</p>
              </div>

              {/* Rounds Breakdown */}
              {viewingExperience.rounds && viewingExperience.rounds.length > 0 && (
                <div className="modal-section">
                  <span className="section-kicker">SELECTION ROUNDS & SPECIFIC QUESTIONS</span>
                  <div className="process-timeline">
                    {viewingExperience.rounds.map((r, idx) => (
                      <div className="process-step" key={idx}>
                        <div className="step-badge">{idx + 1}</div>
                        <div className="step-info">
                          <strong>{r.name}</strong>
                          {r.questions && <p className="round-q-text"><strong>Questions:</strong> {r.questions}</p>}
                          {r.experience && <p className="round-exp-text"><strong>Experience:</strong> {r.experience}</p>}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Actionable Tips */}
              {viewingExperience.tips && viewingExperience.tips.length > 0 && (
                <div className="modal-section">
                  <span className="section-kicker">KEY TIPS FOR FUTURE CANDIDATES</span>
                  <ul className="criteria-list">
                    {viewingExperience.tips.map((tip, idx) => (
                      <li key={idx}>
                        <CheckCircle2 size={16} color="#5c976a" /> {tip}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Mistakes to Avoid */}
              {viewingExperience.mistakesToAvoid && viewingExperience.mistakesToAvoid.length > 0 && (
                <div className="modal-section">
                  <span className="section-kicker">MISTAKES TO AVOID</span>
                  <ul className="criteria-list">
                    {viewingExperience.mistakesToAvoid.map((m, idx) => (
                      <li key={idx} style={{ color: '#c85e4c' }}>
                        <AlertCircle size={16} color="#c85e4c" /> {m}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            <div className="modal-footer-actions">
              <button
                className="upvote-btn"
                onClick={(e) => handleUpvote(e, viewingExperience.id)}
              >
                <ThumbsUp size={15} /> Upvote this experience ({viewingExperience.upvotes || 0})
              </button>
              <button
                className="primary-button"
                onClick={() => {
                  setViewingExperience(null)
                  showToast('Experience saved to your reading history.')
                }}
              >
                Close & Return
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Share Experience Modal */}
      <ShareExperienceModal
        isOpen={isShareModalOpen}
        onClose={() => setIsShareModalOpen(false)}
        onSubmitted={(newExp) => {
          setExperiences(prev => [newExp, ...prev])
        }}
        showToast={showToast}
        profile={profile}
      />
    </div>
  )
}

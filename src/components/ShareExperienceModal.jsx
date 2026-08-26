import { useState } from 'react'
import { X, Sparkles, ArrowUpRight, CheckCircle2, Plus, Trash2 } from 'lucide-react'
import { addExperience } from '../services/firestore'

export default function ShareExperienceModal({ isOpen, onClose, onSubmitted, showToast, profile }) {
  const [company, setCompany] = useState('')
  const [role, setRole] = useState('Software Engineer (SDE)')
  const [status, setStatus] = useState('Selected')
  const [difficulty, setDifficulty] = useState('Medium')
  const [packageOffered, setPackageOffered] = useState('₹18 - 24 LPA')
  const [cgpa, setCgpa] = useState('8.5')
  const [quote, setQuote] = useState('')
  const [overview, setOverview] = useState('')
  const [tips, setTips] = useState('')
  const [mistakes, setMistakes] = useState('')
  const [rounds, setRounds] = useState([
    { name: 'Round 1: Online Assessment', type: 'Online Assessment', questions: '', experience: '' },
    { name: 'Round 2: Technical Interview 1', type: 'Technical (DSA)', questions: '', experience: '' },
    { name: 'Round 3: HR / Managerial', type: 'HR & Values', questions: '', experience: '' }
  ])
  const [submitting, setSubmitting] = useState(false)

  if (!isOpen) return null

  const handleAddRound = () => {
    setRounds(prev => [
      ...prev,
      { name: `Round ${prev.length + 1}: Technical Interview`, type: 'Technical', questions: '', experience: '' }
    ])
  }

  const handleRemoveRound = (index) => {
    setRounds(prev => prev.filter((_, i) => i !== index))
  }

  const handleUpdateRound = (index, field, value) => {
    setRounds(prev => prev.map((r, i) => i === index ? { ...r, [field]: value } : r))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!company.trim() || !quote.trim()) {
      showToast('Please provide company name and your key quote / takeaway.')
      return
    }

    setSubmitting(true)
    try {
      const newExperience = {
        company: company.trim(),
        role: role.trim(),
        status,
        difficulty,
        package: packageOffered.trim(),
        author: profile?.name ? `${profile.name} (${profile.year || '2025'})` : 'Student Contributor',
        cgpa: cgpa.trim(),
        roundsCount: rounds.length,
        quote: quote.trim(),
        overview: overview.trim() || 'Comprehensive placement recruitment drive.',
        rounds: rounds.filter(r => r.questions.trim() || r.experience.trim()),
        tips: tips.split('\n').filter(t => t.trim().length > 0),
        mistakesToAvoid: mistakes.split('\n').filter(m => m.trim().length > 0)
      }

      const created = await addExperience(newExperience)
      if (onSubmitted) onSubmitted(created)
      showToast('🎉 Thank you! Your interview experience is published for the community.')
      onClose()
    } catch (err) {
      console.error(err)
      showToast('Failed to publish experience. Please try again.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="share-experience-dialog" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose} aria-label="Close">
          <X size={20} />
        </button>

        <div className="share-head">
          <span className="section-kicker">GIVE BACK TO THE COMMUNITY</span>
          <h2>Share Your Interview Experience</h2>
          <p>
            Help fellow students understand the real interview process, questions asked, and strategies to succeed.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="share-form">
          <div className="form-row-2">
            <label>
              Company Name *
              <input
                autoFocus
                type="text"
                required
                placeholder="e.g. Google, Microsoft, Atlassian"
                value={company}
                onChange={(e) => setCompany(e.target.value)}
              />
            </label>
            <label>
              Role Title *
              <input
                type="text"
                required
                placeholder="e.g. Software Engineer (SDE-1)"
                value={role}
                onChange={(e) => setRole(e.target.value)}
              />
            </label>
          </div>

          <div className="form-row-3">
            <label>
              Verdict / Status
              <select value={status} onChange={(e) => setStatus(e.target.value)}>
                <option value="Selected">Selected 🎉</option>
                <option value="Rejected">Rejected (Great Learning)</option>
                <option value="In Progress">In Progress</option>
              </select>
            </label>

            <label>
              Overall Difficulty
              <select value={difficulty} onChange={(e) => setDifficulty(e.target.value)}>
                <option value="Easy">Easy</option>
                <option value="Medium">Medium</option>
                <option value="Medium-Hard">Medium-Hard</option>
                <option value="Hard">Hard</option>
              </select>
            </label>

            <label>
              CTC / Stipend
              <input
                type="text"
                placeholder="e.g. ₹24 LPA or ₹1.0 L/mo"
                value={packageOffered}
                onChange={(e) => setPackageOffered(e.target.value)}
              />
            </label>
          </div>

          <label>
            Key Takeaway / Highlight Quote *
            <input
              type="text"
              required
              placeholder="e.g. Explaining time-space trade-offs out loud mattered more than finishing every line."
              value={quote}
              onChange={(e) => setQuote(e.target.value)}
            />
          </label>

          <label>
            Overall Experience Summary
            <textarea
              rows={2}
              placeholder="Brief overview of the recruitment drive, campus vs off-campus context, interview atmosphere..."
              value={overview}
              onChange={(e) => setOverview(e.target.value)}
            />
          </label>

          {/* Dynamic Rounds Breakdown */}
          <div className="rounds-form-block">
            <div className="rounds-form-header">
              <span className="section-kicker">ROUND-BY-ROUND BREAKDOWN</span>
              <button type="button" className="text-button" onClick={handleAddRound}>
                <Plus size={14} /> Add Another Round
              </button>
            </div>

            {rounds.map((round, idx) => (
              <div className="round-input-card" key={idx}>
                <div className="round-input-top">
                  <strong>Round 0{idx + 1}:</strong>
                  <input
                    type="text"
                    placeholder="Round Title (e.g. Pair Programming / DSA)"
                    value={round.name}
                    onChange={(e) => handleUpdateRound(idx, 'name', e.target.value)}
                  />
                  {rounds.length > 1 && (
                    <button
                      type="button"
                      className="delete-round-btn"
                      onClick={() => handleRemoveRound(idx)}
                      title="Remove round"
                    >
                      <Trash2 size={16} />
                    </button>
                  )}
                </div>

                <input
                  type="text"
                  placeholder="Questions asked (e.g. LRU Cache, Subarray Sum, SQL Joins)..."
                  value={round.questions}
                  onChange={(e) => handleUpdateRound(idx, 'questions', e.target.value)}
                />
                <textarea
                  rows={2}
                  placeholder="What happened during this round? Any tricky edge cases or interviewer nudges?"
                  value={round.experience}
                  onChange={(e) => handleUpdateRound(idx, 'experience', e.target.value)}
                />
              </div>
            ))}
          </div>

          <div className="form-row-2">
            <label>
              Tips for Future Candidates (One per line)
              <textarea
                rows={3}
                placeholder="• Think out loud&#10;• Practice writing unit tests&#10;• Master DBMS indexing"
                value={tips}
                onChange={(e) => setTips(e.target.value)}
              />
            </label>

            <label>
              Mistakes to Avoid (One per line)
              <textarea
                rows={3}
                placeholder="• Don't jump into coding before clarifying bounds&#10;• Don't stay silent when stuck"
                value={mistakes}
                onChange={(e) => setMistakes(e.target.value)}
              />
            </label>
          </div>

          <div className="form-submit-row">
            <button type="button" className="filter-button" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="primary-button" disabled={submitting}>
              {submitting ? 'Publishing...' : 'Publish Experience to Community ✦'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

import { useState } from 'react'
import {
  Milestone,
  CheckCircle2,
  Circle,
  ArrowUpRight,
  Clock3,
  Sparkles,
  Award,
  ChevronRight
} from 'lucide-react'
import { initialRoadmapPhases } from '../data/mockData'

export default function PreparationTimeline({
  showToast,
  completedTopics,
  toggleTopicCompletion,
  setActive
}) {
  const [phases, setPhases] = useState(initialRoadmapPhases)

  const handleTogglePhase = (phaseId) => {
    toggleTopicCompletion(phaseId)
    setPhases(prev =>
      prev.map(p => {
        if (p.id === phaseId) {
          const nextStatus = p.status === 'Completed' ? 'In Progress' : 'Completed'
          return { ...p, status: nextStatus }
        }
        return p
      })
    )
    showToast('Updated preparation timeline phase status!')
  }

  const completedCount = phases.filter(p => (completedTopics[p.id] || p.status === 'Completed')).length
  const progressPercent = Math.round((completedCount / phases.length) * 100)

  const handleNavigateForPhase = (phaseNumber) => {
    if (phaseNumber === '01' || phaseNumber === '02') setActive('Placement')
    else if (phaseNumber === '03' || phaseNumber === '04' || phaseNumber === '05' || phaseNumber === '06') setActive('Placement')
    else if (phaseNumber === '07') setActive('Companies')
    else if (phaseNumber === '08') setActive('Mock interviews')
    else if (phaseNumber === '09') setActive('Progress')
    else setActive('Overview')
  }

  return (
    <div className="page-wrap module-page">
      {/* Hero */}
      <div className="module-hero">
        <div>
          <p className="eyebrow">STEP-BY-STEP PREPARATION JOURNEY</p>
          <h1>Your Guided <em>Preparation Roadmap.</em></h1>
          <p className="subtitle">
            Never wonder what to do next. Follow the structured progression from fundamentals to placement selection.
          </p>
        </div>

        <div className="module-stat">
          <strong>{progressPercent}%</strong>
          <span>Journey Completed ({completedCount}/{phases.length})</span>
          <div className="bar">
            <span className="coral" style={{ width: `${progressPercent}%` }} />
          </div>
        </div>
      </div>

      {/* Timeline Progression Container */}
      <div className="timeline-container">
        <div className="timeline-spine" />

        <div className="timeline-phases-list">
          {phases.map((phase) => {
            const isDone = completedTopics[phase.id] || phase.status === 'Completed'
            return (
              <div
                key={phase.id}
                className={`timeline-phase-card ${isDone ? 'completed-phase' : ''}`}
              >
                <div className="phase-card-topline">
                  <div className="phase-number-badge">
                    <span>PHASE</span>
                    <strong>{phase.phaseNumber}</strong>
                  </div>

                  <div className="phase-title-block">
                    <div className="phase-meta-tags">
                      <span className="badge-tag">{phase.category}</span>
                      <span className="time-pill">
                        <Clock3 size={13} /> {phase.duration}
                      </span>
                      <span className={`status ${isDone ? 'complete' : phase.status === 'In Progress' ? 'in-progress' : 'locked'}`}>
                        {isDone ? 'Completed' : phase.status}
                      </span>
                    </div>
                    <h2>{phase.title}</h2>
                  </div>

                  <button
                    className="toggle-status-btn"
                    onClick={() => handleTogglePhase(phase.id)}
                    title="Toggle Phase Completion"
                  >
                    {isDone ? <CheckCircle2 size={24} color="#5c976a" /> : <Circle size={24} color="#c6c3bb" />}
                  </button>
                </div>

                <p className="phase-description">{phase.description}</p>

                <div className="phase-milestones">
                  <strong>Key Checkpoints & Deliverables:</strong>
                  <ul>
                    {phase.milestones.map((m, idx) => (
                      <li key={idx}>
                        <Sparkles size={14} color="#ed765f" />
                        <span>{m}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="phase-action-footer">
                  <button
                    className="text-button"
                    onClick={() => handleNavigateForPhase(phase.phaseNumber)}
                  >
                    Open Dedicated Module for Phase {phase.phaseNumber} <ArrowUpRight size={15} />
                  </button>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

import { useState, useEffect } from 'react'
import {
  Code2,
  Target,
  BookOpen,
  MessageSquareQuote,
  ArrowUpRight,
  Sparkles,
  Clock3,
  Check,
  MoreHorizontal,
  Flame,
  Briefcase,
  GraduationCap,
  Play,
  Pause,
  RotateCcw,
  Plus
} from 'lucide-react'
import { initialCompanies, initialExperiences } from '../data/mockData'

export default function Overview({
  goal,
  setGoal,
  setActive,
  setSelectedCompany,
  setSelectedExperience,
  showToast,
  completedTopics = {},
  profile
}) {
  // Focus session timer state
  const [sessionActive, setSessionActive] = useState(false)
  const [timeLeft, setTimeLeft] = useState(25 * 60) // 25 minutes
  const [newTaskInput, setNewTaskInput] = useState('')
  const [showAddModal, setShowAddModal] = useState(false)

  // Daily task items with persistence
  const [tasks, setTasks] = useState(() => {
    try {
      const saved = localStorage.getItem('lockin_daily_tasks')
      if (saved) return JSON.parse(saved)
    } catch (e) {
      console.warn('Failed to load tasks', e)
    }
    return [
      { id: 't-1', title: 'Solve 2 Medium DSA problems (Sliding Window & Trees)', duration: '25 min', done: true },
      { id: 't-2', title: 'Revise DBMS Normalization (1NF to BCNF) & SQL Joins', duration: '15 min', done: false },
      { id: 't-3', title: 'Practice 90-sec HR pitch ("Tell me about yourself")', duration: '10 min', done: false },
      { id: 't-4', title: 'Review ATS bullet points on your Resume project highlights', duration: '15 min', done: false }
    ]
  })

  useEffect(() => {
    try {
      localStorage.setItem('lockin_daily_tasks', JSON.stringify(tasks))
    } catch (e) {
      console.warn('Failed to save tasks', e)
    }
  }, [tasks])

  // Timer countdown
  useEffect(() => {
    let timer
    if (sessionActive && timeLeft > 0) {
      timer = setInterval(() => setTimeLeft(prev => prev - 1), 1000)
    } else if (timeLeft === 0 && sessionActive) {
      setSessionActive(false)
      showToast('🎉 Focus session completed! Take a 5-minute break.')
    }
    return () => clearInterval(timer)
  }, [sessionActive, timeLeft, showToast])

  const formatTimer = (seconds) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }

  const toggleTask = (taskId) => {
    setTasks(prev => prev.map(t => t.id === taskId ? { ...t, done: !t.done } : t))
    const task = tasks.find(t => t.id === taskId)
    if (task && !task.done) {
      showToast('Task marked as completed! Keep going!')
    }
  }

  const handleAddTask = (e) => {
    e.preventDefault()
    if (!newTaskInput.trim()) return
    const newTask = {
      id: `task-${Date.now()}`,
      title: newTaskInput.trim(),
      duration: '15 min',
      done: false
    }
    setTasks(prev => [...prev, newTask])
    setNewTaskInput('')
    setShowAddModal(false)
    showToast('New personal task added to your preparation path')
  }

  // Dynamic calculation of readiness score
  const completedCount = Object.values(completedTopics).filter(Boolean).length
  const calculatedReadiness = Math.min(94, Math.max(45, 55 + Math.round(completedCount * 2.8)))

  const progressMetrics = [
    { label: 'Coding & DSA', value: 82, color: 'coral', icon: Code2, sub: '28/35 solved' },
    { label: 'Aptitude & Reasoning', value: 74, color: 'gold', icon: Target, sub: '18/25 topics' },
    { label: 'Core CS Subjects', value: 68, color: 'blue', icon: BookOpen, sub: 'OS, DBMS, CN' },
    { label: 'Interview Skills', value: 60, color: 'mint', icon: MessageSquareQuote, sub: 'STAR method' }
  ]

  const featuredCompanies = initialCompanies.slice(0, 3)
  const recentExperiences = initialExperiences.slice(0, 2)

  return (
    <div className="page-wrap">
      {/* Header / Welcome Row */}
      <section className="welcome-row">
        <div>
          <p className="eyebrow">
            STUDENT PREPARATION PORTAL <span className="eyebrow-dot">•</span> TARGET 2025/2026
          </p>
          <h1>
            Good day, {profile?.name ? profile.name.split(' ')[0] : 'Arjun'} <span className="wave">✦</span>
          </h1>
          <p className="subtitle">
            Consistent preparation beats last-minute stress. Your targeted path for <strong>{goal}</strong> is ready.
          </p>
        </div>

        <div className="goal-switch">
          <span>Preparing for:</span>
          <button
            className={goal === 'Placement' ? 'selected' : ''}
            onClick={() => {
              setGoal('Placement')
              showToast('Switched focus to Placement Preparation')
            }}
          >
            <GraduationCap size={14} style={{ marginRight: 4 }} /> Placement
          </button>
          <button
            className={goal === 'Internship' ? 'selected' : ''}
            onClick={() => {
              setGoal('Internship')
              showToast('Switched focus to Internship Preparation')
            }}
          >
            <Briefcase size={14} style={{ marginRight: 4 }} /> Internship
          </button>
        </div>
      </section>

      {/* Hero Grid */}
      <section className="hero-grid">
        {/* Readiness Card */}
        <div className="readiness-card">
          <div className="card-topline">
            <span className="label-with-dot">
              <span className="live-dot"></span>OVERALL PREPARATION READINESS
            </span>
            <span className="badge-tag">{goal}</span>
          </div>

          <div className="readiness-main">
            <div>
              <div className="readiness-number">
                {calculatedReadiness}<span>%</span>
              </div>
              <div className="trend">
                <ArrowUpRight size={15} /> +14% <small>over last 3 weeks</small>
              </div>
            </div>

            <div className="ring" style={{ '--value': `${calculatedReadiness}%` }}>
              <div>
                <strong>On Track</strong>
                <span>{calculatedReadiness > 75 ? 'Interview Ready' : 'In Progress'}</span>
              </div>
            </div>
          </div>

          <div className="readiness-footer">
            <span>Next Target:</span>
            <strong>Complete 2 Mock Technical Interviews</strong>
            <button onClick={() => setActive('Mock interviews')}>
              Start Mock <ArrowUpRight size={15} />
            </button>
          </div>
        </div>

        {/* Focus Session Card */}
        <div className="focus-card">
          <div className="focus-heading">
            <div className="focus-icon">
              <Sparkles size={18} />
            </div>
            <div>
              <span className="card-kicker">INTERACTIVE FOCUS SESSION</span>
              <h2>Daily Deep-Work Sprint</h2>
            </div>
          </div>

          <p>
            Sharpen your problem-solving under deliberate focus. Select a high-impact task and time your deep-work block.
          </p>

          <div className="focus-actions">
            <div className="timer-badge">
              <Clock3 size={15} />
              <span>{formatTimer(timeLeft)}</span>
            </div>

            {!sessionActive ? (
              <button
                className="primary-button"
                onClick={() => {
                  setSessionActive(true)
                  showToast('Deep-work timer started. Focus on 1 task!')
                }}
              >
                <Play size={14} /> Start 25m Focus Session
              </button>
            ) : (
              <div style={{ display: 'flex', gap: 8 }}>
                <button
                  className="primary-button"
                  onClick={() => setSessionActive(false)}
                >
                  <Pause size={14} /> Pause
                </button>
                <button
                  className="filter-button"
                  onClick={() => {
                    setSessionActive(false)
                    setTimeLeft(25 * 60)
                  }}
                >
                  <RotateCcw size={14} />
                </button>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Progress Breakdown */}
      <section className="section-block">
        <div className="section-heading">
          <div>
            <span className="section-kicker">KEY PILLARS</span>
            <h2>Track Your Preparation Across Core Subjects</h2>
          </div>
          <button className="text-button" onClick={() => setActive('Progress')}>
            View Detailed Diagnostics <ArrowUpRight size={16} />
          </button>
        </div>

        <div className="progress-grid">
          {progressMetrics.map(({ label, value, color, icon: Icon, sub }) => (
            <div className="progress-card" key={label}>
              <div className={`progress-icon ${color}`}>
                <Icon size={17} />
              </div>
              <div className="progress-meta">
                <span>{label}</span>
                <strong>{value}%</strong>
              </div>
              <div className="bar">
                <span className={color} style={{ width: `${value}%` }} />
              </div>
              <small>{sub}</small>
            </div>
          ))}
        </div>
      </section>

      {/* Tasks & Weak Area Panels */}
      <section className="lower-grid">
        {/* Daily Tasks */}
        <div className="tasks-panel">
          <div className="section-heading compact">
            <div>
              <span className="section-kicker">TODAY'S ACTION ITEMS</span>
              <h2>Your Daily Preparation Path</h2>
            </div>
            <button className="icon-button" onClick={() => setShowAddModal(true)} title="Add Task">
              <Plus size={18} />
            </button>
          </div>

          <div className="task-list">
            {tasks.map((task) => (
              <button
                className={`task ${task.done ? 'done' : ''}`}
                key={task.id}
                onClick={() => toggleTask(task.id)}
              >
                <span className="checkbox">{task.done && <Check size={14} />}</span>
                <span>{task.title}</span>
                <small>{task.duration}</small>
              </button>
            ))}
          </div>

          <button className="add-task" onClick={() => setShowAddModal(true)}>
            <span>+</span> Add personal goal or revision topic
          </button>
        </div>

        {/* Focus & Weak Areas */}
        <div className="weak-panel">
          <div className="section-heading compact">
            <div>
              <span className="section-kicker">FOCUS AREAS</span>
              <h2>Turn Gaps Into Interview Advantages</h2>
            </div>
            <button className="text-button" onClick={() => setActive('Progress')}>
              View Gaps
            </button>
          </div>

          <div className="weak-list">
            <div
              className="weak-item"
              onClick={() => setActive('Placement')}
              role="button"
              tabIndex={0}
            >
              <div className="weak-badge coral-bg">◒</div>
              <div>
                <strong>Dynamic Programming & Graphs</strong>
                <span>Recommended: Solve 5 Medium DP problems</span>
              </div>
              <ArrowUpRight size={17} />
            </div>

            <div
              className="weak-item"
              onClick={() => setActive('Mock interviews')}
              role="button"
              tabIndex={0}
            >
              <div className="weak-badge blue-bg">◌</div>
              <div>
                <strong>STAR Behavioral Communication</strong>
                <span>Practice conflict resolution scenarios</span>
              </div>
              <ArrowUpRight size={17} />
            </div>
          </div>

          <div className="insight">
            <Sparkles size={17} />
            <p>
              <strong>Coach's Insight:</strong> You scored 85% in SQL queries this week. Shifting 30 mins to Tree Traversals will balance your technical readiness.
            </p>
          </div>
        </div>
      </section>

      {/* Featured Companies Section */}
      <section className="section-block company-section">
        <div className="section-heading">
          <div>
            <span className="section-kicker">COMPANY INTELLIGENCE</span>
            <h2>Prepare According to Actual Selection Patterns</h2>
          </div>
          <button className="text-button" onClick={() => setActive('Companies')}>
            Explore All Companies <ArrowUpRight size={16} />
          </button>
        </div>

        <div className="company-grid">
          {featuredCompanies.map((company) => (
            <button
              className="company-card"
              key={company.id}
              onClick={() => {
                if (setSelectedCompany) setSelectedCompany(company)
                setActive('Companies')
              }}
            >
              <div className={`company-mark ${company.tone}`}>{company.mark}</div>
              <div className="company-info">
                <strong>{company.name}</strong>
                <span>{company.role} · {company.package}</span>
                <div>
                  {company.tags.slice(0, 3).map((tag) => (
                    <small key={tag}>{tag}</small>
                  ))}
                </div>
              </div>
              <ArrowUpRight size={17} />
            </button>
          ))}
        </div>
      </section>

      {/* Community Experiences Preview */}
      <section className="section-block experience-section">
        <div className="section-heading">
          <div>
            <span className="section-kicker">FROM THE STUDENT COMMUNITY</span>
            <h2>Real Interview Stories & Strategies</h2>
          </div>
          <button className="text-button" onClick={() => setActive('Experiences')}>
            Read All Experiences <ArrowUpRight size={16} />
          </button>
        </div>

        <div className="experience-grid">
          {recentExperiences.map((experience) => (
            <article className="experience-card" key={experience.id}>
              <div className="experience-meta">
                <div className={`company-mark mini ${experience.company === 'Google' ? 'google' : 'orange'}`}>
                  {experience.company[0]}
                </div>
                <div>
                  <strong>{experience.company}</strong>
                  <span>{experience.role} · {experience.author}</span>
                </div>
                <time>{experience.time}</time>
              </div>

              <blockquote>“{experience.quote}”</blockquote>

              <button
                className="read-link"
                onClick={() => {
                  if (setSelectedExperience) setSelectedExperience(experience)
                  setActive('Experiences')
                }}
              >
                Read Full Experience <ArrowUpRight size={15} />
              </button>
            </article>
          ))}
        </div>
      </section>

      {/* Add Task Modal */}
      {showAddModal && (
        <div className="modal-backdrop" onClick={() => setShowAddModal(false)}>
          <div className="share-modal" onClick={(e) => e.stopPropagation()}>
            <span className="section-kicker">PERSONALIZED PATH</span>
            <h2>Add Custom Preparation Task</h2>
            <p>Set a specific topic or problem to tackle today.</p>

            <form onSubmit={handleAddTask}>
              <input
                autoFocus
                type="text"
                value={newTaskInput}
                onChange={(e) => setNewTaskInput(e.target.value)}
                placeholder="e.g. Practice 3 questions on Trie / Graph BFS"
                required
              />
              <button type="submit" className="primary-button" style={{ width: '100%', justifyContent: 'center' }}>
                Add Task
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

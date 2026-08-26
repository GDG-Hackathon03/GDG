import { useState } from 'react'
import {
  Target,
  Code2,
  BookOpen,
  MessageSquareQuote,
  CheckCircle2,
  Circle,
  ChevronRight,
  Sparkles,
  ClipboardCheck,
  FileText,
  Award,
  Layers,
  ArrowUpRight
} from 'lucide-react'
import {
  initialAptitudeTopics,
  initialDsaTopics,
  initialCoreCsTopics
} from '../data/mockData'

export default function PlacementPrep({
  showToast,
  completedTopics,
  toggleTopicCompletion
}) {
  const [activeTab, setActiveTab] = useState('aptitude')
  const [selectedDsaTopic, setSelectedDsaTopic] = useState(initialDsaTopics[0])
  const [activeAptitudeCategory, setActiveAptitudeCategory] = useState('All')
  const [selectedAptitudeTopic, setSelectedAptitudeTopic] = useState(null)
  const [activeCoreSubject, setActiveCoreSubject] = useState('core-os')

  const aptitudeCategories = ['All', 'Quantitative', 'Logical Reasoning', 'Verbal Ability']

  const filteredAptitude = activeAptitudeCategory === 'All'
    ? initialAptitudeTopics
    : initialAptitudeTopics.filter(t => t.category === activeAptitudeCategory)

  const hrQuestions = [
    {
      q: 'Tell me about yourself / Walk me through your resume.',
      framework: 'Present -> Past -> Future Framework (90 seconds)',
      tip: 'Start with your current degree and primary passion. Highlight 2 key technical projects and hackathons. End with why you are excited for this specific role.'
    },
    {
      q: 'What are your greatest strengths and real weaknesses?',
      framework: 'Strength + Evidence & Weakness + Active Mitigation',
      tip: 'Pick a genuine technical or soft gap (e.g. public speaking, over-optimizing early) and explain the concrete steps you take to overcome it.'
    },
    {
      q: 'Tell me about a time you faced a major project roadblock (STAR Method).',
      framework: 'Situation -> Task -> Action -> Result',
      tip: 'Explain the technical impasse, the data-driven troubleshooting you performed, and the measurable outcome achieved.'
    },
    {
      q: 'Why do you want to join our company over competitors?',
      framework: 'Company Mission + Culture + Technology Alignment',
      tip: 'Reference specific products, engineering blogs, or culture values of the company rather than giving generic flattery.'
    }
  ]

  const resumeChecklist = [
    { id: 'res-1', text: 'Single-page layout using clean ATS-friendly LaTeX / Jake\'s resume template' },
    { id: 'res-2', text: 'Quantified bullet points using XYZ formula (Accomplished X, measured by Y, by doing Z)' },
    { id: 'res-3', text: 'Active GitHub and live deployment links for all featured portfolio projects' },
    { id: 'res-4', text: 'Skills categorized into: Languages, Frameworks, Developer Tools, and Core CS' },
    { id: 'res-5', text: 'No spelling errors, consistent date formatting, and no generic subjective buzzwords' }
  ]

  return (
    <div className="page-wrap module-page">
      {/* Module Hero */}
      <div className="module-hero">
        <div>
          <p className="eyebrow">COMPREHENSIVE CURRICULUM · CAMPUS & OFF-CAMPUS</p>
          <h1>Master the <em>Placement Arena.</em></h1>
          <p className="subtitle">
            Structured modules covering Aptitude, DSA, Core CS, Technical Q&A, and HR rounds.
          </p>
        </div>

        <div className="module-stat">
          <strong>82%</strong>
          <span>Overall Module Readiness</span>
          <div className="bar">
            <span className="coral" style={{ width: '82%' }} />
          </div>
        </div>
      </div>

      {/* Sub-navigation tabs */}
      <div className="tab-bar">
        <button
          className={`tab-item ${activeTab === 'aptitude' ? 'active' : ''}`}
          onClick={() => setActiveTab('aptitude')}
        >
          <Target size={16} /> Aptitude & Reasoning
        </button>
        <button
          className={`tab-item ${activeTab === 'dsa' ? 'active' : ''}`}
          onClick={() => setActiveTab('dsa')}
        >
          <Code2 size={16} /> Coding & DSA Mastery
        </button>
        <button
          className={`tab-item ${activeTab === 'core' ? 'active' : ''}`}
          onClick={() => setActiveTab('core')}
        >
          <BookOpen size={16} /> Core CS Subjects
        </button>
        <button
          className={`tab-item ${activeTab === 'hr' ? 'active' : ''}`}
          onClick={() => setActiveTab('hr')}
        >
          <MessageSquareQuote size={16} /> HR & Behavioral
        </button>
        <button
          className={`tab-item ${activeTab === 'resume' ? 'active' : ''}`}
          onClick={() => setActiveTab('resume')}
        >
          <ClipboardCheck size={16} /> Resume Checklist
        </button>
      </div>

      {/* 1. Aptitude Tab */}
      {activeTab === 'aptitude' && (
        <div className="tab-content">
          <div className="filter-row">
            {aptitudeCategories.map((cat) => (
              <button
                key={cat}
                className={`filter-button ${activeAptitudeCategory === cat ? 'active-filter' : ''}`}
                onClick={() => setActiveAptitudeCategory(cat)}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="cards-split-layout">
            <div className="topics-list-col">
              {filteredAptitude.map((topic) => {
                const isCompleted = completedTopics[topic.id] ?? topic.completed
                return (
                  <div
                    key={topic.id}
                    className={`topic-card ${selectedAptitudeTopic?.id === topic.id ? 'selected' : ''}`}
                    onClick={() => setSelectedAptitudeTopic(topic)}
                  >
                    <button
                      className="check-btn"
                      onClick={(e) => {
                        e.stopPropagation()
                        toggleTopicCompletion(topic.id)
                        showToast(`Updated status for ${topic.title}`)
                      }}
                      aria-label="Toggle completion"
                    >
                      {isCompleted ? <CheckCircle2 size={20} color="#5c976a" /> : <Circle size={20} color="#c6c3bb" />}
                    </button>

                    <div className="topic-card-body">
                      <div className="topic-meta-row">
                        <span className="badge-tag">{topic.category}</span>
                        <span className={`diff-pill ${topic.difficulty.toLowerCase()}`}>{topic.difficulty}</span>
                      </div>
                      <h3>{topic.title}</h3>
                      <p>{topic.questionsCount} Standard Problems & Shortcuts</p>
                    </div>

                    <ChevronRight size={18} className="chevron" />
                  </div>
                )
              })}
            </div>

            {/* Topic Detail View */}
            <div className="topic-detail-col">
              {selectedAptitudeTopic ? (
                <div className="detail-panel">
                  <div className="detail-head">
                    <span className="section-kicker">{selectedAptitudeTopic.category} FORMULA GUIDE</span>
                    <h2>{selectedAptitudeTopic.title}</h2>
                  </div>

                  <div className="formula-box">
                    <strong>Key Formula & Theorem:</strong>
                    <code>{selectedAptitudeTopic.formula}</code>
                  </div>

                  <div className="trick-box">
                    <Sparkles size={16} />
                    <p><strong>Speed Trick:</strong> {selectedAptitudeTopic.tricks}</p>
                  </div>

                  <div className="practice-section">
                    <h4>Sample Practice Questions:</h4>
                    {selectedAptitudeTopic.practiceQuestions.map((pq, idx) => (
                      <div className="pq-card" key={idx}>
                        <p><strong>Q{idx + 1}:</strong> {pq.q}</p>
                        <div className="answer-pill">
                          <span>Answer:</span> <strong>{pq.ans}</strong>
                        </div>
                      </div>
                    ))}
                  </div>

                  <button
                    className="primary-button"
                    style={{ marginTop: 20, width: '100%', justifyContent: 'center' }}
                    onClick={() => {
                      toggleTopicCompletion(selectedAptitudeTopic.id)
                      showToast(`Progress synced for ${selectedAptitudeTopic.title}`)
                    }}
                  >
                    {completedTopics[selectedAptitudeTopic.id] ? 'Marked as Completed ✓' : 'Mark Topic as Mastered'}
                  </button>
                </div>
              ) : (
                <div className="detail-placeholder">
                  <Target size={36} color="#aaa69d" />
                  <h3>Select an Aptitude Topic</h3>
                  <p>Click on any topic on the left to view formulas, shortcut tricks, and standard questions.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* 2. Coding & DSA Tab */}
      {activeTab === 'dsa' && (
        <div className="tab-content">
          <div className="dsa-dashboard-layout">
            <div className="dsa-sidebar-topics">
              <span className="section-kicker">CORE DATA STRUCTURES</span>
              {initialDsaTopics.map((topic) => (
                <button
                  key={topic.id}
                  className={`dsa-nav-btn ${selectedDsaTopic.id === topic.id ? 'active' : ''}`}
                  onClick={() => setSelectedDsaTopic(topic)}
                >
                  <div className="dsa-btn-info">
                    <strong>{topic.name}</strong>
                    <small>{topic.problems.length} Curated Patterns · {topic.difficulty}</small>
                  </div>
                  <ChevronRight size={16} />
                </button>
              ))}
            </div>

            <div className="dsa-main-workspace">
              <div className="workspace-header">
                <div>
                  <span className="section-kicker">DATA STRUCTURE MASTERY</span>
                  <h2>{selectedDsaTopic.name}</h2>
                </div>
                <span className="diff-pill medium">{selectedDsaTopic.difficulty}</span>
              </div>

              {/* Code Snippet Box */}
              <div className="code-viewer-card">
                <div className="code-viewer-head">
                  <span>Standard Pattern Template (JavaScript / C++)</span>
                  <button
                    className="copy-btn"
                    onClick={() => {
                      navigator.clipboard.writeText(selectedDsaTopic.codeSnippet)
                      showToast('Code template copied to clipboard!')
                    }}
                  >
                    Copy Code
                  </button>
                </div>
                <pre className="code-block">
                  <code>{selectedDsaTopic.codeSnippet}</code>
                </pre>
              </div>

              {/* Key algorithmic patterns */}
              <div className="patterns-row">
                <strong>Essential Patterns:</strong>
                {selectedDsaTopic.keyPatterns.map((pat) => (
                  <span className="pattern-pill" key={pat}>✦ {pat}</span>
                ))}
              </div>

              {/* Problem List */}
              <div className="problems-table-wrap">
                <h3>Top Curated Practice Problems</h3>
                <div className="problems-list">
                  {selectedDsaTopic.problems.map((prob) => {
                    const probKey = `${selectedDsaTopic.id}-${prob.leetcode}`
                    const isDone = completedTopics[probKey] ?? prob.done
                    return (
                      <div className="problem-row" key={prob.leetcode}>
                        <button
                          className="check-btn"
                          onClick={() => {
                            toggleTopicCompletion(probKey)
                            showToast(`Toggled ${prob.name}`)
                          }}
                        >
                          {isDone ? <CheckCircle2 size={18} color="#5c976a" /> : <Circle size={18} color="#aaa69d" />}
                        </button>
                        <div className="problem-info">
                          <strong>{prob.name}</strong>
                          <span className={`diff-pill ${prob.diff.toLowerCase()}`}>{prob.diff}</span>
                        </div>
                        <a
                          href={`https://leetcode.com/problems/${prob.name.toLowerCase().replace(/[^a-z0-9]+/g, '-')}/`}
                          target="_blank"
                          rel="noreferrer"
                          className="text-button"
                        >
                          Solve on LeetCode <ArrowUpRight size={14} />
                        </a>
                      </div>
                    )
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 3. Core CS Subjects Tab */}
      {activeTab === 'core' && (
        <div className="tab-content">
          <div className="core-subject-tabs">
            {initialCoreCsTopics.map((subj) => (
              <button
                key={subj.id}
                className={`core-tab-btn ${activeCoreSubject === subj.id ? 'active' : ''}`}
                onClick={() => setActiveCoreSubject(subj.id)}
              >
                <strong>{subj.name}</strong>
                <span>{subj.topics.length} High-Yield Concepts</span>
              </button>
            ))}
          </div>

          <div className="core-topics-grid">
            {initialCoreCsTopics.find(s => s.id === activeCoreSubject)?.topics.map((t, idx) => (
              <div className="core-card" key={idx}>
                <div className="core-card-head">
                  <span className="topic-num">0{idx + 1}</span>
                  <h3>{t.title}</h3>
                </div>
                <p>{t.summary}</p>
                <div className="core-card-foot">
                  <span className="exam-tag">Frequently Asked in Technical Round</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 4. HR & Behavioral Tab */}
      {activeTab === 'hr' && (
        <div className="tab-content">
          <div className="hr-layout">
            <div className="hr-guide-box">
              <Sparkles size={24} color="#ed765f" />
              <h2>The Golden STAR Method for HR Rounds</h2>
              <p>
                Structure every behavioral answer to sound articulate, confident, and impact-driven:
              </p>
              <div className="star-breakdown">
                <div><strong>S - Situation:</strong> Set the context and challenge you faced.</div>
                <div><strong>T - Task:</strong> State the exact goal or responsibility required.</div>
                <div><strong>A - Action:</strong> Describe the specific technical or collaborative steps YOU took.</div>
                <div><strong>R - Result:</strong> Conclude with quantifiable impact, performance gains, or lessons learned.</div>
              </div>
            </div>

            <div className="hr-questions-list">
              <h3>Top Frequently Asked HR Questions</h3>
              {hrQuestions.map((hr, idx) => (
                <div className="hr-card" key={idx}>
                  <div className="hr-q-head">
                    <span className="badge-tag">QUESTION 0{idx + 1}</span>
                    <span className="framework-tag">{hr.framework}</span>
                  </div>
                  <h3>{hr.q}</h3>
                  <div className="tip-box">
                    <strong>Coach's Tip:</strong> {hr.tip}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* 5. Resume Preparation Tab */}
      {activeTab === 'resume' && (
        <div className="tab-content">
          <div className="resume-layout">
            <div className="resume-formula-card">
              <Award size={24} color="#5c976a" />
              <h2>The Google XYZ Resume Formula</h2>
              <p>
                Write high-impact project bullet points that impress recruiters and pass automated ATS parsers:
              </p>
              <div className="formula-display">
                <code>"Accomplished [X] as measured by [Y], by doing [Z]"</code>
              </div>
              <div className="example-box">
                <span className="bad-ex">❌ Weak: Built a real-time collaborative code editor using WebSockets.</span>
                <span className="good-ex">
                  ✅ Strong: Architected a collaborative code editor supporting 50+ concurrent users with sub-50ms latency using WebSockets, Redis pub/sub, and Docker sandboxes.
                </span>
              </div>
            </div>

            <div className="checklist-card">
              <h3>Engineering Resume Audit Checklist</h3>
              <div className="checklist-items">
                {resumeChecklist.map((item) => {
                  const isChecked = completedTopics[item.id] ?? false
                  return (
                    <button
                      key={item.id}
                      className={`checklist-row ${isChecked ? 'done' : ''}`}
                      onClick={() => {
                        toggleTopicCompletion(item.id)
                        showToast('Resume checklist item updated')
                      }}
                    >
                      <span className="checkbox">{isChecked && <CheckCircle2 size={16} />}</span>
                      <span>{item.text}</span>
                    </button>
                  )
                })}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

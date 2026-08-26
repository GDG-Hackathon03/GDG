import { useState } from 'react'
import {
  BarChart3,
  ArrowUpRight,
  Sparkles,
  TrendingUp,
  Download,
  CheckCircle2,
  AlertTriangle,
  BookOpen,
  Code2,
  Target,
  FileText
} from 'lucide-react'

export default function ProgressTracker({
  showToast,
  completedTopics = {},
  setActive,
  profile
}) {
  const completedCount = Object.values(completedTopics).filter(Boolean).length
  const overallScore = Math.min(96, Math.max(50, 62 + Math.round(completedCount * 2.5)))

  const pillars = [
    { name: 'Data Structures & Algorithms', score: 78, tone: 'coral', icon: Code2, status: 'Strong' },
    { name: 'Quantitative & Logical Aptitude', score: 72, tone: 'gold', icon: Target, status: 'Proficient' },
    { name: 'Operating Systems & DBMS', score: 84, tone: 'mint', icon: BookOpen, status: 'Mastered' },
    { name: 'System Design & Architecture', score: 54, tone: 'blue', icon: Sparkles, status: 'Needs Practice' },
    { name: 'STAR Behavioral & HR Skills', score: 65, tone: 'gold', icon: Sparkles, status: 'Growing' },
    { name: 'Resume & Portfolio Impact', score: 90, tone: 'mint', icon: FileText, status: 'Interview Ready' }
  ]

  const strongAreas = [
    { topic: 'SQL Queries & Normalization', score: '88%', tone: 'mint', remark: 'Solid relational database foundations' },
    { topic: 'Arrays & Two Pointers', score: '84%', tone: 'mint', remark: 'Consistent O(N) optimizations' },
    { topic: 'Object-Oriented Design (OOP)', score: '82%', tone: 'blue', remark: 'Good grasp of SOLID principles' },
    { topic: 'Percentages & Time-Work Aptitude', score: '80%', tone: 'gold', remark: 'Quick mental calculation speed' }
  ]

  const improvementAreas = [
    { topic: 'Dynamic Programming (2D & Trees)', score: '42%', tone: 'coral', action: 'Practice 0/1 Knapsack & LCS patterns', link: 'Placement' },
    { topic: 'Graph Shortest Paths (Dijkstra & DSU)', score: '48%', tone: 'coral', action: 'Review Kahn\'s topological sort & Min-Heap', link: 'Placement' },
    { topic: 'Behavioral STAR Story Formulation', score: '55%', tone: 'gold', action: 'Record 2 mock interview answers', link: 'Mock interviews' },
    { topic: 'TCP/IP Handshake & DNS Resolution', score: '60%', tone: 'blue', action: 'Revise Computer Networks flashcards', link: 'Placement' }
  ]

  const handleExport = () => {
    const reportData = {
      candidate: profile?.name || 'Arjun Kumar',
      overallReadiness: `${overallScore}%`,
      date: new Date().toLocaleDateString(),
      pillars,
      strongAreas,
      improvementAreas
    }
    const blob = new Blob([JSON.stringify(reportData, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `LockIn_Readiness_Report_${new Date().toISOString().split('T')[0]}.json`
    a.click()
    showToast('Preparation Diagnostic Report exported successfully!')
  }

  return (
    <div className="page-wrap module-page">
      {/* Module Heading */}
      <div className="module-heading">
        <div>
          <p className="eyebrow">DIAGNOSTIC & READINESS ENGINE</p>
          <h1>Progress <em>Intelligence.</em></h1>
          <p className="subtitle">
            Your readiness score is a compass. Focus deliberate practice where it generates the highest return.
          </p>
        </div>

        <button className="primary-button" onClick={handleExport}>
          <Download size={16} /> Export Readiness Report
        </button>
      </div>

      {/* Analysis Grid */}
      <div className="analysis-grid">
        {/* Score Card */}
        <div className="analysis-score">
          <span className="section-kicker">OVERALL PLACEMENT READINESS</span>
          <strong>{overallScore}<span>%</span></strong>
          <div className="trend">
            <TrendingUp size={16} /> +14% <small>over previous assessment</small>
          </div>
          <div className="bar">
            <span className="coral" style={{ width: `${overallScore}%` }} />
          </div>
          <p>
            You are scoring ahead of <strong>78%</strong> of engineering candidates preparing for 2025/2026 tech placements.
          </p>
        </div>

        {/* Historical Readiness Trend Chart */}
        <div className="analysis-chart">
          <div className="section-heading compact">
            <div>
              <span className="section-kicker">6-WEEK VELOCITY</span>
              <h2>Consistent Upward Trajectory</h2>
            </div>
            <span className="chart-legend">
              <i /> Readiness Index
            </span>
          </div>

          <div className="fake-chart">
            <span className="chart-line" />
            <span className="chart-point p1">44</span>
            <span className="chart-point p2">56</span>
            <span className="chart-point p3">68</span>
            <span className="chart-point p4">{overallScore}</span>
            <div className="chart-labels">
              <small>Week 1</small>
              <small>Week 2</small>
              <small>Week 4</small>
              <small>Current</small>
            </div>
          </div>
        </div>
      </div>

      {/* Core Preparation Pillars */}
      <section className="section-block">
        <div className="section-heading">
          <div>
            <span className="section-kicker">PILLAR-BY-PILLAR BREAKDOWN</span>
            <h2>Detailed Competency Assessment</h2>
          </div>
        </div>

        <div className="progress-grid">
          {pillars.map(({ name, score, tone, icon: Icon, status }) => (
            <div className="progress-card" key={name}>
              <div className={`progress-icon ${tone}`}>
                <Icon size={17} />
              </div>
              <div className="progress-meta">
                <span title={name}>{name.split(' ')[0]} {name.split(' ')[1]}</span>
                <strong>{score}%</strong>
              </div>
              <div className="bar">
                <span className={tone} style={{ width: `${score}%` }} />
              </div>
              <small>{status}</small>
            </div>
          ))}
        </div>
      </section>

      {/* Strengths & Weaknesses Columns */}
      <div className="section-heading analysis-title">
        <div>
          <span className="section-kicker">STRENGTHS VS KNOWLEDGE GAPS</span>
          <h2>Targeted Improvement Diagnostic</h2>
        </div>
      </div>

      <div className="analysis-columns">
        {/* Strong Areas */}
        <div className="analysis-list">
          <div className="analysis-list-head">
            <span>Verified Strong Areas</span>
            <span>Mastery</span>
          </div>
          {strongAreas.map(({ topic, score, tone, remark }) => (
            <div className="analysis-row" key={topic}>
              <div>
                <strong>{topic}</strong>
                <small className="remark-text">{remark}</small>
              </div>
              <div className="mini-bar">
                <span className={tone} style={{ width: score }} />
              </div>
              <b>{score}</b>
            </div>
          ))}
        </div>

        {/* Improvement Areas */}
        <div className="analysis-list gaps">
          <div className="analysis-list-head">
            <span>Priority Areas to Improve</span>
            <span>Current</span>
          </div>
          {improvementAreas.map(({ topic, score, tone, action, link }) => (
            <div className="analysis-row" key={topic}>
              <div>
                <strong>{topic}</strong>
                <small className="action-text">⚡ {action}</small>
              </div>
              <div className="mini-bar">
                <span className={tone} style={{ width: score }} />
              </div>
              <b>{score}</b>
              <button
                className="drill-btn"
                onClick={() => setActive(link)}
                title={`Practice ${topic}`}
              >
                <ArrowUpRight size={14} />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

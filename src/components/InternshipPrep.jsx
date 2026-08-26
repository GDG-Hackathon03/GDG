import { useState, useEffect } from 'react'
import {
  Briefcase,
  Layers,
  Code2,
  Mail,
  ListFilter,
  Plus,
  ArrowUpRight,
  Sparkles,
  CheckCircle2,
  Copy,
  ExternalLink,
  Calendar,
  Building,
  DollarSign
} from 'lucide-react'
import {
  initialInternshipRoadmap,
  initialProjectBlueprints,
  initialApplications
} from '../data/mockData'
import { getApplications, saveApplication } from '../services/firestore'

export default function InternshipPrep({ showToast }) {
  const [activeTab, setActiveTab] = useState('roadmap')
  const [applications, setApplications] = useState([])
  const [showAddAppModal, setShowAddAppModal] = useState(false)
  const [newApp, setNewApp] = useState({
    company: '',
    role: 'Software Engineer Intern',
    location: 'Bengaluru / Remote',
    status: 'Applied',
    stipend: '₹80,000 / mo',
    notes: ''
  })

  useEffect(() => {
    getApplications().then(apps => setApplications(apps))
  }, [])

  const handleCreateApp = async (e) => {
    e.preventDefault()
    if (!newApp.company.trim()) return
    const appToSave = {
      ...newApp,
      appliedDate: new Date().toISOString().split('T')[0]
    }
    const updated = await saveApplication(appToSave)
    setApplications(updated)
    setShowAddAppModal(false)
    setNewApp({
      company: '',
      role: 'Software Engineer Intern',
      location: 'Bengaluru / Remote',
      status: 'Applied',
      stipend: '₹80,000 / mo',
      notes: ''
    })
    showToast(`Added ${appToSave.company} to your Application Tracker!`)
  }

  const handleUpdateStatus = async (appId, newStatus) => {
    const target = applications.find(a => a.id === appId)
    if (!target) return
    const updated = await saveApplication({ ...target, status: newStatus })
    setApplications(updated)
    showToast(`Updated status to "${newStatus}"`)
  }

  const coldEmailTemplate = `Subject: Inquiry regarding [Role] Summer Internship 2025 - [Your Name] (Pre-Final Year CSE)

Dear [Hiring Manager / Recruiter Name],

I hope this email finds you well. I am a 3rd-year Computer Science student at [Your College Name], passionate about software craft and distributed systems.

I have been following [Company Name]'s work on [Specific Product or Feature, e.g. payment gateway low latency / microservices architecture], and I would love the opportunity to contribute as a Software Engineering Intern for Summer 2025.

Key Highlights of My Experience:
• Solved 350+ DSA problems on LeetCode with strong intuition for Trees, DP & Graphs.
• Built [Project 1 Name] ([Live Link]): A real-time collaborative system built with React, WebSockets, and Redis pub/sub.
• Built [Project 2 Name] ([GitHub Link]): An automated API gateway with rate limiting and Prometheus metrics.

My resume and GitHub portfolio are linked here:
• GitHub: [github.com/yourhandle]
• Portfolio: [yourportfolio.dev]
• Resume: [Link to Google Drive PDF]

Thank you so much for your time and consideration. I would be thrilled to jump on a quick 10-minute introductory call.

Warm regards,
[Your Name]
[Your Phone Number] | [LinkedIn Profile URL]`

  return (
    <div className="page-wrap module-page">
      {/* Module Hero */}
      <div className="module-hero">
        <div>
          <p className="eyebrow">CAREER ACCELERATOR · SUMMER & OFF-CAMPUS INTERNSHIPS</p>
          <h1>Land Your <em>Dream Internship.</em></h1>
          <p className="subtitle">
            Year-by-year roadmaps, project blueprints, online assessment strategies, and an integrated application tracker.
          </p>
        </div>

        <div className="module-stat">
          <strong>{applications.length}</strong>
          <span>Tracked Applications</span>
          <div className="bar">
            <span className="mint" style={{ width: '65%' }} />
          </div>
        </div>
      </div>

      {/* Sub navigation */}
      <div className="tab-bar">
        <button
          className={`tab-item ${activeTab === 'roadmap' ? 'active' : ''}`}
          onClick={() => setActiveTab('roadmap')}
        >
          <Layers size={16} /> Year-Wise Roadmap
        </button>
        <button
          className={`tab-item ${activeTab === 'projects' ? 'active' : ''}`}
          onClick={() => setActiveTab('projects')}
        >
          <Code2 size={16} /> Project Blueprints
        </button>
        <button
          className={`tab-item ${activeTab === 'tracker' ? 'active' : ''}`}
          onClick={() => setActiveTab('tracker')}
        >
          <Briefcase size={16} /> Application Tracker
        </button>
        <button
          className={`tab-item ${activeTab === 'outreach' ? 'active' : ''}`}
          onClick={() => setActiveTab('outreach')}
        >
          <Mail size={16} /> Cold Outreach Toolkit
        </button>
      </div>

      {/* 1. Year-Wise Roadmap Tab */}
      {activeTab === 'roadmap' && (
        <div className="tab-content">
          <div className="internship-roadmaps-grid">
            {initialInternshipRoadmap.map((road, idx) => (
              <div className="year-card" key={idx}>
                <div className="year-head">
                  <span className="year-badge">{road.year}</span>
                  <h3>{road.tagline}</h3>
                </div>

                <div className="year-steps">
                  {road.steps.map((step, sIdx) => (
                    <div className="year-step-item" key={sIdx}>
                      <span className="step-bullet">{sIdx + 1}</span>
                      <div>
                        <strong>{step.title}</strong>
                        <p>{step.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 2. Project Blueprints Tab */}
      {activeTab === 'projects' && (
        <div className="tab-content">
          <div className="blueprints-grid">
            {initialProjectBlueprints.map((proj) => (
              <div className="blueprint-card" key={proj.id}>
                <div className="blueprint-head">
                  <span className="badge-tag">{proj.category}</span>
                  <span className="diff-pill hard">{proj.difficulty}</span>
                </div>

                <h2>{proj.title}</h2>

                <div className="stack-pills">
                  {proj.stack.map(st => (
                    <span className="stack-badge" key={st}>{st}</span>
                  ))}
                </div>

                <div className="highlights-box">
                  <strong>Key Architectural Highlights:</strong>
                  <ul>
                    {proj.highlights.map((h, i) => (
                      <li key={i}>{h}</li>
                    ))}
                  </ul>
                </div>

                <div className="github-box">
                  <Sparkles size={16} />
                  <p><strong>GitHub Portfolio Tip:</strong> {proj.githubTips}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 3. Application Tracker Tab */}
      {activeTab === 'tracker' && (
        <div className="tab-content">
          <div className="tracker-toolbar">
            <div className="section-heading compact">
              <div>
                <span className="section-kicker">INTERNSHIP & SDE PIPELINE</span>
                <h2>Active Applications & Opportunities</h2>
              </div>
            </div>
            <button className="primary-button" onClick={() => setShowAddAppModal(true)}>
              <Plus size={16} /> Add New Application
            </button>
          </div>

          <div className="applications-table-card">
            <table className="apps-table">
              <thead>
                <tr>
                  <th>Company & Role</th>
                  <th>Applied Date</th>
                  <th>Location</th>
                  <th>Expected Stipend</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {applications.map((app) => (
                  <tr key={app.id}>
                    <td>
                      <strong>{app.company}</strong>
                      <small>{app.role}</small>
                    </td>
                    <td>{app.appliedDate}</td>
                    <td>{app.location}</td>
                    <td>{app.stipend}</td>
                    <td>
                      <select
                        className={`status-select ${app.status.toLowerCase().replace(/\s+/g, '-')}`}
                        value={app.status}
                        onChange={(e) => handleUpdateStatus(app.id, e.target.value)}
                      >
                        <option value="Applied">Applied</option>
                        <option value="Under Review">Under Review</option>
                        <option value="OA Completed">OA Completed</option>
                        <option value="Interview Scheduled">Interview Scheduled</option>
                        <option value="Offer Received">Offer Received 🎉</option>
                        <option value="Rejected">Rejected</option>
                      </select>
                    </td>
                    <td>
                      <span className="notes-preview" title={app.notes}>
                        {app.notes || 'No notes added'}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* 4. Cold Outreach Tab */}
      {activeTab === 'outreach' && (
        <div className="tab-content">
          <div className="outreach-card">
            <div className="outreach-head">
              <Sparkles size={20} color="#ed765f" />
              <h2>Proven LinkedIn & Cold Email Outreach Blueprint</h2>
              <p>
                Recruiters and engineering managers receive hundreds of generic messages. Use this high-conversion cold outreach template:
              </p>
            </div>

            <div className="template-box">
              <button
                className="copy-btn"
                onClick={() => {
                  navigator.clipboard.writeText(coldEmailTemplate)
                  showToast('Outreach template copied to clipboard!')
                }}
              >
                <Copy size={14} /> Copy Template
              </button>
              <pre className="template-pre">
                <code>{coldEmailTemplate}</code>
              </pre>
            </div>
          </div>
        </div>
      )}

      {/* Add Application Modal */}
      {showAddAppModal && (
        <div className="modal-backdrop" onClick={() => setShowAddAppModal(false)}>
          <div className="share-modal" onClick={(e) => e.stopPropagation()}>
            <span className="section-kicker">APPLICATION TRACKER</span>
            <h2>Track New Opportunity</h2>
            <p>Keep your internship and placement pipeline organized in one place.</p>

            <form onSubmit={handleCreateApp}>
              <input
                autoFocus
                type="text"
                placeholder="Company Name (e.g. Google, Atlassian, Razorpay)"
                value={newApp.company}
                onChange={(e) => setNewApp({ ...newApp, company: e.target.value })}
                required
              />
              <input
                type="text"
                placeholder="Role (e.g. Software Engineer Intern 2025)"
                value={newApp.role}
                onChange={(e) => setNewApp({ ...newApp, role: e.target.value })}
              />
              <input
                type="text"
                placeholder="Location (e.g. Bengaluru / Remote)"
                value={newApp.location}
                onChange={(e) => setNewApp({ ...newApp, location: e.target.value })}
              />
              <input
                type="text"
                placeholder="Stipend / CTC (e.g. ₹1.00 L/mo or ₹22 LPA)"
                value={newApp.stipend}
                onChange={(e) => setNewApp({ ...newApp, stipend: e.target.value })}
              />
              <textarea
                placeholder="Notes / Referral info / OA dates..."
                value={newApp.notes}
                onChange={(e) => setNewApp({ ...newApp, notes: e.target.value })}
              />
              <button type="submit" className="primary-button" style={{ width: '100%', justifyContent: 'center' }}>
                Save Application
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

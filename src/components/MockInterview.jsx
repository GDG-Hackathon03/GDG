import { useState, useEffect } from 'react'
import {
  Zap,
  Clock3,
  Mic,
  MicOff,
  Sparkles,
  CheckCircle2,
  AlertTriangle,
  RotateCcw,
  ArrowUpRight,
  Lightbulb,
  Award,
  ChevronRight
} from 'lucide-react'
import { initialMockQuestions } from '../data/mockData'
import { storage } from '../services/storage'

export default function MockInterview({ showToast }) {
  const [questions] = useState(initialMockQuestions)
  const [currentIdx, setCurrentIdx] = useState(0)
  const [userAnswer, setUserAnswer] = useState('')
  const [isRecording, setIsRecording] = useState(false)
  const [showHint, setShowHint] = useState(false)
  const [showModelAnswer, setShowModelAnswer] = useState(false)
  const [scorecard, setScorecard] = useState(null)
  const [timeLeft, setTimeLeft] = useState(questions[0].timeMinutes * 60)
  const [isTimerRunning, setIsTimerRunning] = useState(false)
  const [pastSessions, setPastSessions] = useState(() => storage.getMockSessions())

  const activeQuestion = questions[currentIdx]

  // Timer reset on question switch
  useEffect(() => {
    setTimeLeft(activeQuestion.timeMinutes * 60)
    setIsTimerRunning(false)
    setShowHint(false)
    setShowModelAnswer(false)
    setUserAnswer('')
    setScorecard(null)
    setIsRecording(false)
  }, [currentIdx, activeQuestion])

  // Timer tick
  useEffect(() => {
    let timer
    if (isTimerRunning && timeLeft > 0) {
      timer = setInterval(() => setTimeLeft(prev => prev - 1), 1000)
    } else if (timeLeft === 0 && isTimerRunning) {
      setIsTimerRunning(false)
      showToast('⏰ Time is up for this interview question!')
    }
    return () => clearInterval(timer)
  }, [isTimerRunning, timeLeft, showToast])

  const formatTimer = (seconds) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }

  const toggleRecording = () => {
    if (!isRecording) {
      setIsRecording(true)
      setIsTimerRunning(true)
      showToast('Microphone listening... Speak your answer aloud!')
      // Speech simulation starter if empty
      if (!userAnswer) {
        setUserAnswer('In this problem, my approach begins by identifying the core constraints...')
      }
    } else {
      setIsRecording(false)
      showToast('Recording paused.')
    }
  }

  const handleEvaluate = () => {
    if (!userAnswer.trim() || userAnswer.trim().length < 20) {
      showToast('Please provide a more detailed response to evaluate.')
      return
    }

    const lowerAns = userAnswer.toLowerCase()
    const matchedKeywords = activeQuestion.keywords.filter(kw => lowerAns.includes(kw.toLowerCase()))
    const matchRatio = matchedKeywords.length / activeQuestion.keywords.length

    // Dynamic scoring formula
    const lengthScore = Math.min(3, Math.max(1, userAnswer.length / 120))
    const keywordScore = Math.round(matchRatio * 5)
    const baseScore = Math.min(9.6, Math.max(5.8, +(keywordScore + lengthScore + 1.2).toFixed(1)))

    const evaluation = {
      score: baseScore,
      clarity: baseScore >= 8 ? 'Strong' : 'Moderate',
      technicalDepth: matchedKeywords.length >= 3 ? 'Comprehensive' : 'Needs More Technical Specifics',
      structure: lowerAns.includes('situation') || lowerAns.includes('step') || lowerAns.includes('approach') ? 'Well-Structured' : 'Good Structure',
      matchedKeywords,
      feedback: baseScore >= 8
        ? 'Excellent answer! You effectively articulated trade-offs and relevant architectural keywords.'
        : 'Solid start. Try to explicitly mention Big-O complexity, corner cases, and concrete metrics.',
      improvementTip: `Consider incorporating terms like: "${activeQuestion.keywords.slice(0, 3).join(', ')}"`
    }

    setScorecard(evaluation)
    setIsTimerRunning(false)

    // Save session to history
    const newSession = {
      id: `mock-${Date.now()}`,
      date: 'Today',
      category: activeQuestion.category,
      topic: activeQuestion.topic,
      score: baseScore,
      feedback: evaluation.feedback
    }
    const updated = [newSession, ...pastSessions]
    setPastSessions(updated)
    storage.setMockSessions(updated)
    showToast(`Evaluation complete! Score: ${baseScore}/10`)
  }

  return (
    <div className="page-wrap module-page">
      {/* Module Heading */}
      <div className="module-heading">
        <div>
          <p className="eyebrow">PRACTICE ROOM · TECHNICAL & HR SIMULATOR</p>
          <h1>Interview with <em>Confidence.</em></h1>
          <p className="subtitle">
            Practice answering real interview scenarios under timed conditions and receive instant AI feedback.
          </p>
        </div>

        <div className="interview-score">
          <span>LAST PRACTICE SESSION</span>
          <strong>{pastSessions[0]?.score || 7.8} <small>/ 10</small></strong>
          <span className="badge-tag">AI Evaluated</span>
        </div>
      </div>

      <div className="interview-layout">
        {/* Main Practice Card */}
        <div className="interview-card">
          <div className="interview-card-head">
            <div>
              <span className="card-kicker">{activeQuestion.category}</span>
              <span className="badge-tag" style={{ marginLeft: 8 }}>{activeQuestion.topic}</span>
            </div>

            <div className="timer-badge">
              <Clock3 size={15} />
              <span>{formatTimer(timeLeft)}</span>
            </div>
          </div>

          <h2>{activeQuestion.title}</h2>
          <p className="instruction-text">
            Take a breath. Structure your approach clearly: Context ➔ Technical Method ➔ Trade-offs.
          </p>

          {/* Answer Text Area */}
          <div className="answer-input-container">
            <textarea
              className="answer-textarea"
              placeholder="Type your response or click 'Speak Answer' to practice thinking aloud..."
              value={userAnswer}
              onChange={(e) => setUserAnswer(e.target.value)}
              rows={6}
            />

            <div className="answer-toolbar">
              <button
                className={`record-button ${isRecording ? 'recording-active' : ''}`}
                onClick={toggleRecording}
              >
                {isRecording ? <MicOff size={16} /> : <Mic size={16} />}
                <span>{isRecording ? 'Pause Speaking' : 'Speak Answer Aloud'}</span>
              </button>

              <button
                className="text-button"
                onClick={() => setShowHint(!showHint)}
              >
                <Lightbulb size={15} /> {showHint ? 'Hide Hint' : 'Need a Hint?'}
              </button>
            </div>
          </div>

          {/* Hint Card */}
          {showHint && (
            <div className="hint-card">
              <Sparkles size={16} color="#ed765f" />
              <div>
                <strong>Interviewer Hint:</strong>
                <p>{activeQuestion.hint}</p>
              </div>
            </div>
          )}

          {/* Evaluation Scorecard */}
          {scorecard && (
            <div className="scorecard-container">
              <div className="scorecard-head">
                <div className="score-circle">
                  <strong>{scorecard.score}</strong>
                  <small>/10</small>
                </div>
                <div>
                  <span className="section-kicker">AI INTERVIEW EVALUATION</span>
                  <h3>{scorecard.feedback}</h3>
                </div>
              </div>

              <div className="rubric-metrics">
                <div>
                  <span>Clarity:</span>
                  <strong>{scorecard.clarity}</strong>
                </div>
                <div>
                  <span>Technical Depth:</span>
                  <strong>{scorecard.technicalDepth}</strong>
                </div>
                <div>
                  <span>Structure:</span>
                  <strong>{scorecard.structure}</strong>
                </div>
              </div>

              <div className="keywords-matched">
                <span>Key Concepts Detected: </span>
                {scorecard.matchedKeywords.length > 0 ? (
                  scorecard.matchedKeywords.map(k => <strong key={k}>✓ {k} </strong>)
                ) : (
                  <em>None of the high-yield keywords were identified.</em>
                )}
              </div>

              <p className="tip-text">
                <Sparkles size={14} color="#ed765f" /> {scorecard.improvementTip}
              </p>

              <button
                className="text-button"
                style={{ marginTop: 8 }}
                onClick={() => setShowModelAnswer(!showModelAnswer)}
              >
                {showModelAnswer ? 'Hide Model Solution' : 'Reveal Ideal Benchmark Answer'}
              </button>
            </div>
          )}

          {/* Model Answer Box */}
          {showModelAnswer && (
            <div className="model-answer-card">
              <span className="section-kicker">BENCHMARK MODEL ANSWER</span>
              <p>{activeQuestion.modelAnswer}</p>
            </div>
          )}

          {/* Actions */}
          <div className="interview-actions">
            {!scorecard ? (
              <button className="primary-button" onClick={handleEvaluate}>
                <Sparkles size={16} /> Evaluate My Answer & Score
              </button>
            ) : (
              <button
                className="primary-button"
                onClick={() => {
                  if (currentIdx < questions.length - 1) {
                    setCurrentIdx(prev => prev + 1)
                  } else {
                    setCurrentIdx(0)
                  }
                }}
              >
                Next Question <ChevronRight size={16} />
              </button>
            )}

            <button
              className="filter-button"
              onClick={() => {
                if (currentIdx < questions.length - 1) setCurrentIdx(prev => prev + 1)
                else setCurrentIdx(0)
              }}
            >
              Skip Question
            </button>
          </div>
        </div>

        {/* Sidebar Session Navigation & Past Sessions */}
        <aside className="interview-sidebar">
          <span className="section-kicker">SESSION QUESTIONS ({currentIdx + 1}/{questions.length})</span>
          <div className="session-steps-list">
            {questions.map((q, idx) => (
              <button
                key={q.id}
                className={`session-step-btn ${idx === currentIdx ? 'active' : ''}`}
                onClick={() => setCurrentIdx(idx)}
              >
                <span className="step-num">{idx + 1}</span>
                <div className="step-info">
                  <strong>{q.topic}</strong>
                  <small>{q.category}</small>
                </div>
                {idx === currentIdx && <span className="now-tag">Active</span>}
              </button>
            ))}
          </div>

          <div className="interview-tip">
            <Sparkles size={16} />
            <p>
              <strong>Golden Rule:</strong> Clarity beats cleverness. Start with the problem definition, state your trade-offs, and verify edge cases.
            </p>
          </div>

          {pastSessions.length > 0 && (
            <div className="past-sessions-box">
              <span className="section-kicker">RECENT ATTEMPTS</span>
              {pastSessions.slice(0, 3).map((s, i) => (
                <div className="past-session-item" key={i}>
                  <div>
                    <strong>{s.topic}</strong>
                    <small>{s.date} · {s.category}</small>
                  </div>
                  <span className="score-pill">{s.score}/10</span>
                </div>
              ))}
            </div>
          )}
        </aside>
      </div>
    </div>
  )
}

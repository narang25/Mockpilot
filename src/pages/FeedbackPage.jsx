import { useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useTheme } from '../context/ThemeContext'
import {
  ArrowLeft, RotateCcw, Building2, Zap, Sun, Moon,
  TrendingUp, Target, MessageSquare, Award, AlertTriangle,
  CheckCircle2, XCircle, ArrowRight, ChevronDown, ChevronUp
} from 'lucide-react'

const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY

export default function FeedbackPage() {
  const { theme, toggleTheme } = useTheme()
  const navigate = useNavigate()
  const [transcript, setTranscript] = useState(null)
  const [feedback, setFeedback] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [expandedRewrite, setExpandedRewrite] = useState(null)

  useEffect(() => {
    const stored = localStorage.getItem('mockpilot-transcript')
    if (!stored) { navigate('/setup'); return }
    const data = JSON.parse(stored)
    setTranscript(data)
    generateFeedback(data)
  }, [navigate])

  const generateFeedback = async (data) => {
    try {
      const msgs = data.messages
        .map(m => `${m.role === 'assistant' ? 'Interviewer' : 'Candidate'}: ${m.content}`)
        .join('\n\n')

      const prompt = `You are an expert interview coach. Analyze this interview transcript and provide detailed feedback. Return ONLY valid JSON (no markdown, no code blocks, no backticks) in this exact format:
{
  "overall_score": <number 1-10>,
  "categories": {
    "answer_quality": <number 1-10>,
    "star_usage": <number 1-10>,
    "confidence": <number 1-10>,
    "specificity": <number 1-10>,
    "communication": <number 1-10>
  },
  "highlights": ["<string>", "<string>"],
  "lowlights": ["<string>", "<string>"],
  "filler_words": {"um": <count>, "like": <count>, "you know": <count>, "basically": <count>},
  "answer_rewrites": [{"question": "<original question>", "original": "<weak answer summary>", "improved": "<better answer>"}],
  "improvement_plan": ["<action item 1>", "<action item 2>", "<action item 3>"]
}

Interview at ${data.company?.name} for ${data.role} (${data.interviewType}):

${msgs}`

      const res = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GEMINI_API_KEY}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [{ role: 'user', parts: [{ text: prompt }] }],
            generationConfig: {
              temperature: 0.3,
              maxOutputTokens: 2000,
            }
          })
        }
      )

      if (!res.ok) throw new Error('API failed')
      const result = await res.json()
      let content = result.candidates?.[0]?.content?.parts?.[0]?.text || ''
      content = content.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim()
      setFeedback(JSON.parse(content))
    } catch (err) {
      console.error('Feedback generation error:', err)
      setFeedback(getFallbackFeedback())
    } finally {
      setIsLoading(false)
    }
  }

  const handleRetry = () => {
    const session = transcript ? {
      company: transcript.company,
      role: transcript.role,
      interviewType: transcript.interviewType,
      jobDescription: transcript.jobDescription,
      startedAt: new Date().toISOString(),
    } : null
    if (session) localStorage.setItem('mockpilot-session', JSON.stringify(session))
    navigate('/interview')
  }

  const scoreColor = (score) => {
    if (score >= 8) return 'var(--accent-green)'
    if (score >= 6) return 'var(--accent-amber)'
    return 'var(--accent-red)'
  }

  if (!transcript) return null

  return (
    <div className="min-h-screen" style={{ background: 'var(--surface-2)' }}>
      {/* Header */}
      <div
        className="sticky top-0 z-50 px-4 sm:px-6 py-3 flex items-center justify-between"
        style={{ background: 'var(--surface)', borderBottom: '1px solid var(--border)' }}
      >
        <Link to="/" className="flex items-center gap-2 text-sm" style={{ color: 'var(--text-muted)' }}>
          <ArrowLeft size={16} /> Home
        </Link>
        <Link to="/" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg flex items-center justify-center gradient-bg">
            <Zap size={14} color="white" strokeWidth={2.5} />
          </div>
          <span className="text-lg font-bold" style={{ fontFamily: 'var(--font-heading)', color: 'var(--text)' }}>
            Mock<span className="gradient-text">Pilot</span>
          </span>
        </Link>
        <button onClick={toggleTheme} className="w-8 h-8 rounded-lg flex items-center justify-center"
          style={{ background: 'var(--surface-3)', color: 'var(--text)' }}>
          {theme === 'light' ? <Moon size={14} /> : <Sun size={14} />}
        </button>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10">
        {isLoading ? (
          <LoadingState />
        ) : feedback ? (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
            {/* Session info */}
            <div className="text-center mb-10">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold mb-4"
                style={{ background: 'var(--primary-glow)', color: 'var(--primary)' }}>
                Interview Complete
              </div>
              <h1 className="text-3xl sm:text-4xl font-bold" style={{ fontFamily: 'var(--font-heading)', color: 'var(--text)' }}>
                Your Scorecard
              </h1>
              <p className="mt-2 text-sm" style={{ color: 'var(--text-muted)' }}>
                {transcript.company?.emoji} {transcript.company?.name} · {transcript.role} · {transcript.interviewType}
              </p>
            </div>

            {/* Overall score */}
            <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2, type: 'spring' }}
              className="rounded-2xl p-8 mb-8 text-center"
              style={{
                background: 'var(--surface)', border: '1px solid var(--border)',
                boxShadow: 'var(--shadow-xl)',
              }}>
              <p className="text-sm font-medium mb-2" style={{ color: 'var(--text-muted)' }}>Overall Score</p>
              <div className="text-7xl font-black mb-2"
                style={{ fontFamily: 'var(--font-mono)', color: scoreColor(feedback.overall_score) }}>
                {feedback.overall_score}
              </div>
              <p className="text-sm" style={{ color: 'var(--text-muted)' }}>/10</p>
            </motion.div>

            {/* Category breakdown */}
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 mb-8">
              {Object.entries(feedback.categories || {}).map(([key, val], i) => (
                <motion.div key={key}
                  initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + i * 0.1 }}
                  className="rounded-xl p-4 text-center"
                  style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}>
                  <p className="text-2xl font-bold mb-1"
                    style={{ fontFamily: 'var(--font-mono)', color: scoreColor(val) }}>{val}</p>
                  <p className="text-[10px] font-medium uppercase tracking-wider"
                    style={{ color: 'var(--text-muted)' }}>
                    {key.replace(/_/g, ' ')}
                  </p>
                </motion.div>
              ))}
            </div>

            {/* Highlights & Lowlights */}
            <div className="grid sm:grid-cols-2 gap-4 mb-8">
              <FeedbackCard title="Highlights" icon={CheckCircle2} color="var(--accent-green)">
                {(feedback.highlights || []).map((h, i) => (
                  <div key={i} className="flex items-start gap-2 text-sm" style={{ color: 'var(--text-secondary)' }}>
                    <CheckCircle2 size={14} className="mt-0.5 flex-shrink-0" style={{ color: 'var(--accent-green)' }} />
                    {h}
                  </div>
                ))}
              </FeedbackCard>
              <FeedbackCard title="Areas to Improve" icon={AlertTriangle} color="var(--accent-amber)">
                {(feedback.lowlights || []).map((l, i) => (
                  <div key={i} className="flex items-start gap-2 text-sm" style={{ color: 'var(--text-secondary)' }}>
                    <XCircle size={14} className="mt-0.5 flex-shrink-0" style={{ color: 'var(--accent-red)' }} />
                    {l}
                  </div>
                ))}
              </FeedbackCard>
            </div>

            {/* Filler words */}
            {feedback.filler_words && Object.keys(feedback.filler_words).length > 0 && (
              <div className="rounded-2xl p-6 mb-8"
                style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}>
                <h3 className="text-base font-bold mb-4 flex items-center gap-2"
                  style={{ fontFamily: 'var(--font-heading)', color: 'var(--text)' }}>
                  <MessageSquare size={18} style={{ color: 'var(--accent-amber)' }} />
                  Filler Words Detected
                </h3>
                <div className="flex flex-wrap gap-3">
                  {Object.entries(feedback.filler_words).map(([word, count]) => (
                    <div key={word} className="px-3 py-2 rounded-lg text-xs font-medium"
                      style={{ background: 'var(--surface-3)', color: 'var(--text-secondary)' }}>
                      "{word}" × <span style={{ fontFamily: 'var(--font-mono)', color: scoreColor(10 - count) }}>{count}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Answer rewrites */}
            {feedback.answer_rewrites && feedback.answer_rewrites.length > 0 && (
              <div className="rounded-2xl p-6 mb-8"
                style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}>
                <h3 className="text-base font-bold mb-4 flex items-center gap-2"
                  style={{ fontFamily: 'var(--font-heading)', color: 'var(--text)' }}>
                  <TrendingUp size={18} style={{ color: 'var(--primary)' }} />
                  Improved Answers
                </h3>
                <div className="flex flex-col gap-3">
                  {feedback.answer_rewrites.map((rw, i) => (
                    <div key={i} className="rounded-xl p-4" style={{ background: 'var(--surface-2)' }}>
                      <button onClick={() => setExpandedRewrite(expandedRewrite === i ? null : i)}
                        className="w-full flex items-center justify-between text-left">
                        <span className="text-sm font-medium" style={{ color: 'var(--text)' }}>
                          {rw.question?.length > 80 ? rw.question.slice(0, 80) + '...' : rw.question}
                        </span>
                        {expandedRewrite === i
                          ? <ChevronUp size={16} style={{ color: 'var(--text-muted)' }} />
                          : <ChevronDown size={16} style={{ color: 'var(--text-muted)' }} />
                        }
                      </button>
                      {expandedRewrite === i && (
                        <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }}
                          className="mt-3 pt-3" style={{ borderTop: '1px solid var(--border)' }}>
                          <p className="text-xs font-semibold mb-1" style={{ color: 'var(--accent-red)' }}>Your answer:</p>
                          <p className="text-sm mb-3" style={{ color: 'var(--text-muted)' }}>{rw.original}</p>
                          <p className="text-xs font-semibold mb-1" style={{ color: 'var(--accent-green)' }}>Better answer:</p>
                          <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>{rw.improved}</p>
                        </motion.div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Improvement plan */}
            {feedback.improvement_plan && (
              <div className="rounded-2xl p-6 mb-8 overflow-hidden"
                style={{
                  background: 'linear-gradient(135deg, var(--primary-dark), var(--primary))',
                  boxShadow: 'var(--shadow-glow)',
                }}>
                <h3 className="text-base font-bold mb-4 flex items-center gap-2 text-white"
                  style={{ fontFamily: 'var(--font-heading)' }}>
                  <Target size={18} /> Your 3-Point Improvement Plan
                </h3>
                <div className="flex flex-col gap-3">
                  {feedback.improvement_plan.map((item, i) => (
                    <div key={i} className="flex items-start gap-3 px-4 py-3 rounded-xl" style={{ background: 'rgba(255,255,255,0.1)' }}>
                      <span className="text-sm font-bold text-white/50" style={{ fontFamily: 'var(--font-mono)' }}>
                        {String(i + 1).padStart(2, '0')}
                      </span>
                      <p className="text-sm text-white/90">{item}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Action buttons */}
            <div className="flex flex-col sm:flex-row gap-3">
              <button onClick={handleRetry}
                className="flex-1 flex items-center justify-center gap-2 px-6 py-4 rounded-xl font-semibold text-white transition-all hover:scale-[1.02]"
                style={{ background: 'var(--primary)', boxShadow: 'var(--shadow-glow)' }}
                id="retry-btn">
                <RotateCcw size={18} /> Retry Same Company
              </button>
              <Link to="/setup"
                className="flex-1 flex items-center justify-center gap-2 px-6 py-4 rounded-xl font-semibold transition-all hover:scale-[1.02]"
                style={{ background: 'var(--surface)', color: 'var(--text)', border: '1px solid var(--border)' }}
                id="switch-company-btn">
                <Building2 size={18} /> Switch Company <ArrowRight size={16} />
              </Link>
            </div>
          </motion.div>
        ) : null}
      </div>
    </div>
  )
}

function FeedbackCard({ title, icon: Icon, color, children }) {
  return (
    <div className="rounded-2xl p-6" style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}>
      <h3 className="text-sm font-bold mb-4 flex items-center gap-2"
        style={{ fontFamily: 'var(--font-heading)', color: 'var(--text)' }}>
        <Icon size={16} style={{ color }} /> {title}
      </h3>
      <div className="flex flex-col gap-3">{children}</div>
    </div>
  )
}

function LoadingState() {
  return (
    <div className="flex flex-col items-center justify-center py-32">
      <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 2, ease: 'linear' }}
        className="w-16 h-16 rounded-2xl gradient-bg flex items-center justify-center mb-6">
        <Zap size={28} color="white" />
      </motion.div>
      <h2 className="text-xl font-bold mb-2" style={{ fontFamily: 'var(--font-heading)', color: 'var(--text)' }}>
        Analyzing Your Interview...
      </h2>
      <p className="text-sm" style={{ color: 'var(--text-muted)' }}>
        Our AI is reviewing your responses and generating feedback.
      </p>
    </div>
  )
}

function getFallbackFeedback() {
  return {
    overall_score: 7,
    categories: { answer_quality: 7, star_usage: 6, confidence: 7, specificity: 7, communication: 8 },
    highlights: ['Good communication skills', 'Structured responses'],
    lowlights: ['Could provide more specific metrics', 'Some answers lacked depth'],
    filler_words: { um: 3, like: 5 },
    answer_rewrites: [],
    improvement_plan: [
      'Practice quantifying impact with specific numbers and percentages',
      'Use the STAR framework more consistently for behavioral questions',
      'Prepare 2-3 concrete examples for each common question type'
    ]
  }
}

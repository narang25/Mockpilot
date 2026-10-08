import { useState, useEffect, useRef } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useTheme } from '../context/ThemeContext'
import { ArrowLeft, Send, Zap, Sun, Moon, Clock, StopCircle } from 'lucide-react'

const GROQ_API_KEY = import.meta.env.VITE_GROQ_API_KEY
const GROQ_MODEL = 'openai/gpt-oss-20b'

export default function InterviewPage() {
  const { theme, toggleTheme } = useTheme()
  const navigate = useNavigate()
  const [session, setSession] = useState(null)
  const [messages, setMessages] = useState([])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [questionCount, setQuestionCount] = useState(0)
  const [elapsed, setElapsed] = useState(0)
  const messagesEndRef = useRef(null)
  const inputRef = useRef(null)

  useEffect(() => {
    const stored = localStorage.getItem('mockpilot-session')
    if (!stored) { navigate('/setup'); return }
    const config = JSON.parse(stored)
    setSession(config)
    const greeting = getGreeting(config)
    setMessages([{ role: 'assistant', content: greeting }])
    setQuestionCount(1)
  }, [navigate])

  useEffect(() => {
    const timer = setInterval(() => setElapsed(e => e + 1), 1000)
    return () => clearInterval(timer)
  }, [])

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const formatTime = (s) => {
    const m = Math.floor(s / 60)
    const sec = s % 60
    return `${m.toString().padStart(2,'0')}:${sec.toString().padStart(2,'0')}`
  }

  const handleSend = async () => {
    if (!input.trim() || isLoading) return
    const userMsg = { role: 'user', content: input.trim() }
    setMessages(prev => [...prev, userMsg])
    setInput('')
    setIsLoading(true)

    try {
      const systemPrompt = buildSystemPrompt(session, questionCount)

      // Build Groq (OpenAI-compatible) messages format
      const groqMessages = [
        { role: 'system', content: systemPrompt }
      ]

      // Add conversation history
      for (const m of messages) {
        groqMessages.push({
          role: m.role === 'user' ? 'user' : 'assistant',
          content: m.content
        })
      }

      // Add the new user message
      groqMessages.push({ role: 'user', content: userMsg.content })

      const res = await fetch(
        'https://api.groq.com/openai/v1/chat/completions',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${GROQ_API_KEY}`,
          },
          body: JSON.stringify({
            model: GROQ_MODEL,
            messages: groqMessages,
            temperature: 0.75,
            max_tokens: 500,
          })
        }
      )

      if (!res.ok) {
        const err = await res.json()
        throw new Error(err.error?.message || 'API request failed')
      }

      const data = await res.json()
      const aiMsg = data.choices?.[0]?.message?.content || 'I couldn\'t generate a response. Please try again.'
      setMessages(prev => [...prev, { role: 'assistant', content: aiMsg }])
      setQuestionCount(q => q + 1)
    } catch (err) {
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: `⚠️ Error: ${err.message}. Please check your connection and try again.`
      }])
    } finally {
      setIsLoading(false)
      setTimeout(() => inputRef.current?.focus(), 100)
    }
  }

  const handleEndSession = () => {
    const transcript = { ...session, messages, endedAt: new Date().toISOString(), elapsed }
    localStorage.setItem('mockpilot-transcript', JSON.stringify(transcript))
    navigate('/feedback')
  }

  if (!session) return null

  return (
    <div className="h-screen flex flex-col" style={{ background: 'var(--surface-2)' }}>
      {/* Header */}
      <div
        className="flex-shrink-0 px-4 sm:px-6 py-3 flex items-center justify-between z-10"
        style={{ background: 'var(--surface)', borderBottom: '1px solid var(--border)' }}
      >
        <div className="flex items-center gap-3">
          <Link to="/setup" className="p-2 rounded-lg transition-colors"
            style={{ color: 'var(--text-muted)' }}>
            <ArrowLeft size={18} />
          </Link>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-sm font-bold" style={{ fontFamily: 'var(--font-heading)', color: 'var(--text)' }}>
                {session.company?.emoji} {session.company?.name}
              </span>
              <span className="text-xs px-2 py-0.5 rounded-full"
                style={{ background: 'var(--primary-glow)', color: 'var(--primary)' }}>
                {session.interviewType}
              </span>
            </div>
            <span className="text-xs" style={{ color: 'var(--text-muted)' }}>{session.role}</span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs"
            style={{ background: 'var(--surface-3)', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
            <Clock size={12} /> {formatTime(elapsed)}
          </div>
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold"
            style={{ background: 'var(--accent-green-light)', color: 'var(--accent-green)' }}>
            Q{questionCount}
          </div>
          <button onClick={toggleTheme}
            className="w-8 h-8 rounded-lg flex items-center justify-center"
            style={{ background: 'var(--surface-3)', color: 'var(--text)' }}>
            {theme === 'light' ? <Moon size={14} /> : <Sun size={14} />}
          </button>
          <button onClick={handleEndSession}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold"
            style={{ background: 'var(--accent-red-light)', color: 'var(--accent-red)' }}
            id="end-session-btn">
            <StopCircle size={14} /> End
          </button>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 sm:px-6 py-6">
        <div className="max-w-3xl mx-auto flex flex-col gap-4">
          {messages.map((msg, i) => (
            <motion.div key={i}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className={`flex items-start gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
              <div className="w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0"
                style={{
                  background: msg.role === 'assistant' ? 'var(--primary-glow)' : 'var(--accent-green-light)',
                  color: msg.role === 'assistant' ? 'var(--primary)' : 'var(--accent-green)'
                }}>
                {msg.role === 'assistant' ? session.company?.name?.[0] || 'AI' : 'Y'}
              </div>
              <div className={`px-4 py-3 rounded-2xl max-w-[80%] text-sm leading-relaxed whitespace-pre-wrap
                ${msg.role === 'assistant' ? 'rounded-tl-sm' : 'rounded-tr-sm'}`}
                style={{
                  background: msg.role === 'assistant' ? 'var(--surface)' : 'var(--primary)',
                  color: msg.role === 'assistant' ? 'var(--text)' : 'white',
                  border: msg.role === 'assistant' ? '1px solid var(--border)' : 'none',
                  boxShadow: 'var(--shadow-sm)',
                }}>
                {msg.content}
              </div>
            </motion.div>
          ))}
          {isLoading && (
            <div className="flex items-start gap-3">
              <div className="w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold"
                style={{ background: 'var(--primary-glow)', color: 'var(--primary)' }}>
                {session.company?.name?.[0] || 'AI'}
              </div>
              <div className="px-4 py-3 rounded-2xl rounded-tl-sm flex items-center gap-1.5"
                style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}>
                {[0, 0.15, 0.3].map(d => (
                  <motion.div key={d} className="w-2 h-2 rounded-full"
                    style={{ background: 'var(--text-muted)' }}
                    animate={{ scale: [1,1.3,1], opacity: [0.4,1,0.4] }}
                    transition={{ repeat: Infinity, duration: 1, delay: d }} />
                ))}
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Input */}
      <div className="flex-shrink-0 px-4 sm:px-6 py-4" style={{ borderTop: '1px solid var(--border)', background: 'var(--surface)' }}>
        <div className="max-w-3xl mx-auto flex items-end gap-3">
          <textarea ref={inputRef} value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleSend() } }}
            placeholder="Type your answer... (Shift+Enter for new line)"
            rows={1}
            className="flex-1 px-4 py-3 rounded-xl text-sm outline-none resize-none transition-all focus:ring-2"
            style={{
              background: 'var(--surface-2)', border: '1px solid var(--border)',
              color: 'var(--text)', maxHeight: '120px',
            }}
            id="message-input" />
          <button onClick={handleSend} disabled={!input.trim() || isLoading}
            className="w-11 h-11 rounded-xl flex items-center justify-center text-white transition-all hover:scale-105 flex-shrink-0"
            style={{
              background: input.trim() && !isLoading ? 'var(--primary)' : 'var(--border)',
              boxShadow: input.trim() ? 'var(--shadow-glow)' : 'none',
            }}
            id="send-btn">
            <Send size={18} />
          </button>
        </div>
      </div>
    </div>
  )
}

function getGreeting(config) {
  const { company, role, interviewType } = config
  return `Hi there! I'm your ${company?.name || ''} interviewer today. I'll be conducting a ${interviewType} interview for the ${role} position.\n\nLet's dive right in — no warmup.\n\nTell me about yourself and why you're interested in this role at ${company?.name || 'our company'}.`
}

function buildSystemPrompt(config, questionCount) {
  const { company, role, interviewType, jobDescription } = config
  return `You are an experienced interviewer at ${company?.name || 'a top tech company'}. 
Company culture: ${company?.culture || 'excellence and innovation'}.
You are conducting a ${interviewType} interview for the "${role}" position.
${jobDescription ? `Job Description:\n${jobDescription}\n` : ''}

RULES:
- Stay in character as a ${company?.name} interviewer throughout
- Ask one question at a time, then wait for the response
- Ask follow-up questions when answers are vague or lack specifics
- Push back professionally on weak answers
- Adapt difficulty: if answers are strong, ask harder questions
- For behavioral: use STAR framework expectations
- For technical: ask system design or problem-solving questions
- For case: present business scenarios
- You are on question ${questionCount} of approximately 6-8 total
- Keep responses concise (2-4 sentences for follow-ups, slightly longer for new questions)
- Be professional but direct — this is a real interview simulation
- NEVER break character or acknowledge you are an AI`
}

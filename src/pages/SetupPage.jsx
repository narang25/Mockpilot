import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { useTheme } from '../context/ThemeContext'
import {
  ArrowLeft, ArrowRight, Zap, Building2, Briefcase,
  Code2, Users, MessageCircle, FileText, ChevronDown,
  Sun, Moon, Sparkles
} from 'lucide-react'

const companies = [
  { id: 'google', name: 'Google', emoji: '🔍', color: '#4285F4', culture: 'Googliness, structured thinking' },
  { id: 'meta', name: 'Meta', emoji: '📘', color: '#1877F2', culture: 'Move fast, impact-driven' },
  { id: 'amazon', name: 'Amazon', emoji: '📦', color: '#FF9900', culture: 'Leadership Principles' },
  { id: 'apple', name: 'Apple', emoji: '🍎', color: '#A2AAAD', culture: 'Craft, attention to detail' },
  { id: 'microsoft', name: 'Microsoft', emoji: '🪟', color: '#00BCF2', culture: 'Growth mindset' },
  { id: 'netflix', name: 'Netflix', emoji: '🎬', color: '#E50914', culture: 'Freedom & responsibility' },
  { id: 'startup', name: 'Startup', emoji: '🚀', color: '#10B981', culture: 'Scrappy, move fast' },
  { id: 'consulting', name: 'Consulting', emoji: '📊', color: '#6C3BF4', culture: 'Structured problem-solving' },
]

const interviewTypes = [
  { id: 'behavioral', name: 'Behavioral', icon: Users, desc: 'STAR method, leadership, past experiences' },
  { id: 'technical', name: 'Technical', icon: Code2, desc: 'System design, coding, problem solving' },
  { id: 'case', name: 'Case Study', icon: FileText, desc: 'Business problems, estimation, strategy' },
]

export default function SetupPage() {
  const { theme, toggleTheme } = useTheme()
  const navigate = useNavigate()
  const [company, setCompany] = useState(null)
  const [role, setRole] = useState('')
  const [interviewType, setInterviewType] = useState(null)
  const [jobDescription, setJobDescription] = useState('')
  const [showJD, setShowJD] = useState(false)

  const canStart = company && role.trim() && interviewType

  const handleStart = () => {
    const config = {
      company: companies.find(c => c.id === company),
      role, interviewType,
      jobDescription: jobDescription.trim() || null,
      startedAt: new Date().toISOString(),
    }
    localStorage.setItem('mockpilot-session', JSON.stringify(config))
    navigate('/interview')
  }

  return (
    <div className="min-h-screen flex flex-col" style={{ background: 'var(--surface-2)' }}>
      {/* Top bar */}
      <div
        className="sticky top-0 z-50 px-6 py-4 flex items-center justify-between"
        style={{ background: 'var(--surface)', borderBottom: '1px solid var(--border)' }}
      >
        <Link to="/" className="flex items-center gap-2 text-sm font-medium" style={{ color: 'var(--text-muted)' }}>
          <ArrowLeft size={16} /> Back
        </Link>
        <Link to="/" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg flex items-center justify-center gradient-bg">
            <Zap size={14} color="white" strokeWidth={2.5} />
          </div>
          <span className="text-lg font-bold" style={{ fontFamily: 'var(--font-heading)', color: 'var(--text)' }}>
            Mock<span className="gradient-text">Pilot</span>
          </span>
        </Link>
        <button onClick={toggleTheme} className="w-9 h-9 rounded-lg flex items-center justify-center"
          style={{ background: 'var(--surface-3)', color: 'var(--text)' }}>
          {theme === 'light' ? <Moon size={16} /> : <Sun size={16} />}
        </button>
      </div>

      <div className="flex-1 w-full max-w-2xl mx-auto px-6 sm:px-8 py-12">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold mb-4"
              style={{ background: 'var(--primary-glow)', color: 'var(--primary)' }}>
              <Sparkles size={14} /> Session Setup
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold" style={{ fontFamily: 'var(--font-heading)', color: 'var(--text)' }}>
              Configure Your Interview
            </h1>
            <p className="mt-3 text-sm" style={{ color: 'var(--text-muted)' }}>
              Choose your target company, role, and interview style.
            </p>
          </div>

          {/* Company Selection */}
          <div className="mb-10">
            <label className="text-sm font-semibold mb-4 flex items-center gap-2"
              style={{ fontFamily: 'var(--font-heading)', color: 'var(--text)' }}>
              <Building2 size={16} style={{ color: 'var(--primary)' }} /> Select Company
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-3">
              {companies.map(c => (
                <button key={c.id} onClick={() => setCompany(c.id)}
                  className="rounded-xl p-4 text-left transition-all duration-200 hover:-translate-y-0.5"
                  style={{
                    background: company === c.id ? 'var(--primary-glow)' : 'var(--surface)',
                    border: `2px solid ${company === c.id ? 'var(--primary)' : 'var(--border)'}`,
                    boxShadow: company === c.id ? 'var(--shadow-glow)' : 'var(--shadow-sm)',
                  }}>
                  <span className="text-2xl block mb-2">{c.emoji}</span>
                  <span className="text-sm font-semibold block" style={{ color: 'var(--text)' }}>{c.name}</span>
                  <span className="text-[10px] block mt-1 leading-tight" style={{ color: 'var(--text-muted)' }}>{c.culture}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Role */}
          <div className="mb-10">
            <label className="text-sm font-semibold mb-3 flex items-center gap-2"
              style={{ fontFamily: 'var(--font-heading)', color: 'var(--text)' }}>
              <Briefcase size={16} style={{ color: 'var(--primary)' }} /> Role / Position
            </label>
            <input type="text" placeholder="e.g. Software Engineer, Product Manager..."
              value={role} onChange={e => setRole(e.target.value)}
              className="w-full mt-2 px-5 py-3.5 rounded-xl text-sm outline-none transition-all focus:ring-2"
              style={{
                background: 'var(--surface)',
                border: '1px solid var(--border)',
                color: 'var(--text)',
              }} />
          </div>

          {/* Interview Type */}
          <div className="mb-10">
            <label className="text-sm font-semibold mb-4 flex items-center gap-2"
              style={{ fontFamily: 'var(--font-heading)', color: 'var(--text)' }}>
              <MessageCircle size={16} style={{ color: 'var(--primary)' }} /> Interview Type
            </label>
            <div className="grid sm:grid-cols-3 gap-3 mt-3">
              {interviewTypes.map(t => (
                <button key={t.id} onClick={() => setInterviewType(t.id)}
                  className="rounded-xl p-5 text-left transition-all duration-200 hover:-translate-y-0.5"
                  style={{
                    background: interviewType === t.id ? 'var(--primary-glow)' : 'var(--surface)',
                    border: `2px solid ${interviewType === t.id ? 'var(--primary)' : 'var(--border)'}`,
                    boxShadow: interviewType === t.id ? 'var(--shadow-glow)' : 'var(--shadow-sm)',
                  }}>
                  <t.icon size={20} className="mb-3"
                    style={{ color: interviewType === t.id ? 'var(--primary)' : 'var(--text-muted)' }} />
                  <span className="text-sm font-semibold block" style={{ color: 'var(--text)' }}>{t.name}</span>
                  <span className="text-xs mt-1 block" style={{ color: 'var(--text-muted)' }}>{t.desc}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Optional JD */}
          <div className="mb-12">
            <button onClick={() => setShowJD(!showJD)}
              className="flex items-center gap-2 text-sm font-medium" style={{ color: 'var(--text-muted)' }}>
              <ChevronDown size={16} className="transition-transform" style={{ transform: showJD ? 'rotate(180deg)' : 'rotate(0)' }} />
              Paste Job Description (optional)
            </button>
            <AnimatePresence>
              {showJD && (
                <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3 }} className="overflow-hidden">
                  <textarea placeholder="Paste the job description here..." value={jobDescription}
                    onChange={e => setJobDescription(e.target.value)} rows={5}
                    className="w-full mt-3 px-5 py-3.5 rounded-xl text-sm outline-none resize-none"
                    style={{ background: 'var(--surface)', border: '1px solid var(--border)', color: 'var(--text)' }} />
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Start Button */}
          <motion.button onClick={handleStart} disabled={!canStart}
            whileHover={canStart ? { scale: 1.02 } : {}} whileTap={canStart ? { scale: 0.98 } : {}}
            className="w-full flex items-center justify-center gap-3 px-8 py-4 rounded-2xl text-base font-bold text-white transition-all"
            style={{
              background: canStart ? 'var(--primary)' : 'var(--border)',
              boxShadow: canStart ? 'var(--shadow-glow-strong)' : 'none',
              opacity: canStart ? 1 : 0.5, cursor: canStart ? 'pointer' : 'not-allowed',
            }}>
            <Zap size={20} /> Start Interview <ArrowRight size={18} />
          </motion.button>
          {!canStart && (
            <p className="text-center mt-3 text-xs" style={{ color: 'var(--text-muted)' }}>
              Select a company, enter a role, and choose an interview type.
            </p>
          )}
        </motion.div>
      </div>
    </div>
  )
}

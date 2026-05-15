import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Zap, ArrowRight, MessageSquare, Star, BarChart3 } from 'lucide-react'
import { fadeUp, staggerContainer, scaleIn } from '../../utils/animations'

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-28 pb-20" id="hero">
      {/* Background gradient mesh */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute -top-[40%] -right-[20%] w-[70%] h-[70%] rounded-full opacity-30 blur-3xl animate-gradient"
          style={{
            background: 'radial-gradient(circle, rgba(108,59,244,0.3) 0%, rgba(59,130,246,0.2) 50%, transparent 70%)'
          }}
        />
        <div
          className="absolute -bottom-[30%] -left-[20%] w-[60%] h-[60%] rounded-full opacity-20 blur-3xl animate-gradient"
          style={{
            background: 'radial-gradient(circle, rgba(16,185,129,0.25) 0%, rgba(108,59,244,0.15) 50%, transparent 70%)',
            animationDelay: '4s'
          }}
        />
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `linear-gradient(var(--text) 1px, transparent 1px), linear-gradient(90deg, var(--text) 1px, transparent 1px)`,
            backgroundSize: '60px 60px'
          }}
        />
      </div>

      <div className="relative w-full max-w-6xl mx-auto px-6 sm:px-8 lg:px-12 text-center">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="flex flex-col items-center"
        >
          {/* Badge */}
          <motion.div
            variants={fadeUp}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-semibold mb-8"
            style={{
              background: 'var(--primary-glow)',
              color: 'var(--primary)',
              border: '1px solid rgba(108,59,244,0.2)'
            }}
          >
            <Zap size={14} />
            Powered by Gemini — Ultra-Fast AI Responses
          </motion.div>

          {/* Headline */}
          <motion.h1
            variants={fadeUp}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-tight leading-[1.1] max-w-4xl"
            style={{ fontFamily: 'var(--font-heading)', color: 'var(--text)' }}
          >
            Ace Your Next{' '}
            <span className="gradient-text">Interview</span>
            <br />
            With AI
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            variants={fadeUp}
            className="mt-6 text-base sm:text-lg md:text-xl max-w-2xl leading-relaxed"
            style={{ color: 'var(--text-secondary)' }}
          >
            Real company culture. Real questions. Brutally honest feedback.
            Practice with an AI that interviews like Google, Meta, and top startups.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            variants={fadeUp}
            className="mt-10 flex flex-col sm:flex-row items-center gap-4"
          >
            <Link
              to="/setup"
              className="group relative inline-flex items-center gap-2.5 px-8 py-4 rounded-2xl text-base font-bold text-white transition-all hover:scale-[1.03] active:scale-[0.98]"
              style={{ background: 'var(--primary)', boxShadow: 'var(--shadow-glow-strong)' }}
              id="hero-cta-primary"
            >
              <Zap size={20} />
              Start Free Interview
              <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
            </Link>
            <a
              href="#how-it-works"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl text-base font-semibold transition-all hover:scale-[1.03]"
              style={{
                background: 'var(--surface)',
                color: 'var(--text)',
                border: '1px solid var(--border)',
                boxShadow: 'var(--shadow-md)'
              }}
              id="hero-cta-secondary"
            >
              See How It Works
            </a>
          </motion.div>

          {/* Stats */}
          <motion.div
            variants={fadeUp}
            className="mt-16 flex flex-wrap items-center justify-center gap-8 md:gap-14"
          >
            {[
              { icon: MessageSquare, value: '10K+', label: 'Mock Interviews' },
              { icon: Star, value: '4.8★', label: 'Average Rating' },
              { icon: BarChart3, value: '70%', label: 'Improved Confidence' },
            ].map((stat) => (
              <div key={stat.label} className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center"
                  style={{ background: 'var(--primary-glow)', color: 'var(--primary)' }}>
                  <stat.icon size={18} />
                </div>
                <div className="text-left">
                  <p className="text-lg font-bold" style={{ fontFamily: 'var(--font-mono)', color: 'var(--text)' }}>
                    {stat.value}
                  </p>
                  <p className="text-xs" style={{ color: 'var(--text-muted)' }}>{stat.label}</p>
                </div>
              </div>
            ))}
          </motion.div>

          {/* Mock Chat Preview */}
          <motion.div variants={scaleIn} className="mt-20 w-full max-w-3xl mx-auto">
            <div className="rounded-2xl overflow-hidden"
              style={{
                background: 'var(--surface)',
                border: '1px solid var(--border)',
                boxShadow: 'var(--shadow-xl)'
              }}>
              {/* Window bar */}
              <div className="flex items-center gap-2 px-5 py-3.5"
                style={{ background: 'var(--surface-3)', borderBottom: '1px solid var(--border)' }}>
                <div className="flex gap-2">
                  <div className="w-3 h-3 rounded-full" style={{ background: '#EF4444' }} />
                  <div className="w-3 h-3 rounded-full" style={{ background: '#F59E0B' }} />
                  <div className="w-3 h-3 rounded-full" style={{ background: '#10B981' }} />
                </div>
                <span className="ml-4 text-xs font-medium" style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
                  MockPilot — Google SWE Behavioral Interview
                </span>
              </div>

              {/* Chat messages */}
              <div className="p-5 sm:p-6 flex flex-col gap-4">
                <ChatBubble role="ai" message="Hi, I'm your Google interviewer today. Tell me about a time you navigated a technically complex project with ambiguous requirements." delay={0.2} />
                <ChatBubble role="user" message="Sure! At my last role, we had a project where the product requirements kept changing every sprint..." delay={0.8} />
                <ChatBubble role="ai" message="Interesting. How did you handle stakeholder alignment when priorities shifted? Walk me through the specific actions you took." delay={1.4} />
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 2.0, duration: 0.3 }}
                  className="flex items-center gap-2 ml-1"
                >
                  <div className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold"
                    style={{ background: 'var(--primary-glow)', color: 'var(--primary)' }}>Y</div>
                  <div className="px-4 py-3 rounded-2xl flex items-center gap-1.5" style={{ background: 'var(--surface-3)' }}>
                    {[0, 0.15, 0.3].map(d => (
                      <motion.div key={d} className="w-2 h-2 rounded-full" style={{ background: 'var(--text-muted)' }}
                        animate={{ scale: [1, 1.3, 1], opacity: [0.4, 1, 0.4] }}
                        transition={{ repeat: Infinity, duration: 1, delay: d }} />
                    ))}
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

function ChatBubble({ role, message, delay }) {
  const isAI = role === 'ai'
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.4 }}
      className={`flex items-start gap-3 ${isAI ? '' : 'flex-row-reverse'}`}
    >
      <div className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0"
        style={{
          background: isAI ? 'var(--primary-glow)' : 'var(--accent-green-light)',
          color: isAI ? 'var(--primary)' : 'var(--accent-green)'
        }}>
        {isAI ? 'G' : 'Y'}
      </div>
      <div className={`px-4 py-3 rounded-2xl max-w-[80%] text-sm leading-relaxed ${isAI ? 'rounded-tl-sm' : 'rounded-tr-sm'}`}
        style={{
          background: isAI ? 'var(--surface-3)' : 'var(--primary)',
          color: isAI ? 'var(--text)' : 'white'
        }}>
        {message}
      </div>
    </motion.div>
  )
}

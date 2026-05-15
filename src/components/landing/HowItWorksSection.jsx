import { motion } from 'framer-motion'
import { useScrollReveal, fadeUp, staggerContainer } from '../../utils/animations'
import { Settings, MessageSquare, Clock, FileBarChart, RotateCcw } from 'lucide-react'

const steps = [
  {
    number: '01',
    icon: Settings,
    title: 'Set Up Your Session',
    description: 'Choose company, role, and interview type — behavioral, technical, or case. Optionally paste the job description.',
    color: 'var(--primary)',
    bg: 'var(--primary-glow)',
  },
  {
    number: '02',
    icon: MessageSquare,
    title: 'AI Becomes the Interviewer',
    description: 'Gemini-powered AI greets you in character and starts the interview — no warmup, straight to the first question.',
    color: 'var(--accent-green)',
    bg: 'var(--accent-green-light)',
  },
  {
    number: '03',
    icon: Clock,
    title: 'Live Conversation',
    description: '5–8 questions with follow-ups. AI adapts difficulty based on how well you\'re answering. 30–45 minutes.',
    color: 'var(--accent-blue)',
    bg: 'var(--accent-blue-light)',
  },
  {
    number: '04',
    icon: FileBarChart,
    title: 'Brutally Honest Feedback',
    description: 'Detailed report with scores, highlights, lowlights, and specific rewrites for your weakest answers.',
    color: 'var(--accent-amber)',
    bg: 'var(--accent-amber-light)',
  },
  {
    number: '05',
    icon: RotateCcw,
    title: 'Retry or Switch Company',
    description: 'One-click retry with a fresh question set, or jump to another company to compare difficulty.',
    color: 'var(--accent-red)',
    bg: 'var(--accent-red-light)',
  }
]

export default function HowItWorksSection() {
  const { ref, isInView } = useScrollReveal()

  return (
    <section className="py-28 relative" id="how-it-works" style={{ background: 'var(--surface-2)' }}>
      <div className="max-w-6xl mx-auto px-6 sm:px-8 lg:px-12">
        <motion.div
          ref={ref}
          variants={staggerContainer}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="text-center mb-16"
        >
          <motion.div
            variants={fadeUp}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold mb-6"
            style={{ background: 'var(--accent-blue-light)', color: 'var(--accent-blue)' }}
          >
            How It Works
          </motion.div>
          <motion.h2
            variants={fadeUp}
            className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight"
            style={{ fontFamily: 'var(--font-heading)', color: 'var(--text)' }}
          >
            Five Steps to{' '}
            <span className="gradient-text">Interview Ready</span>
          </motion.h2>
          <motion.p
            variants={fadeUp}
            className="mt-5 text-base md:text-lg max-w-2xl mx-auto leading-relaxed"
            style={{ color: 'var(--text-secondary)' }}
          >
            From setup to scorecard in under an hour. No scheduling, no awkwardness, no holding back.
          </motion.p>
        </motion.div>

        {/* Steps — simple stacked cards */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="max-w-2xl mx-auto flex flex-col gap-4"
        >
          {steps.map((step) => (
            <motion.div
              key={step.number}
              variants={fadeUp}
              className="rounded-2xl p-6 flex items-start gap-5 transition-all hover:shadow-lg"
              style={{
                background: 'var(--surface)',
                border: '1px solid var(--border)',
                boxShadow: 'var(--shadow-sm)',
              }}
            >
              {/* Step number + icon */}
              <div className="flex flex-col items-center gap-2 flex-shrink-0">
                <div className="w-11 h-11 rounded-xl flex items-center justify-center"
                  style={{ background: step.bg, color: step.color }}>
                  <step.icon size={20} />
                </div>
                <span className="text-xs font-bold" style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
                  {step.number}
                </span>
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <h3 className="text-base font-bold mb-1" style={{ fontFamily: 'var(--font-heading)', color: 'var(--text)' }}>
                  {step.title}
                </h3>
                <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                  {step.description}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

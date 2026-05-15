import { motion } from 'framer-motion'
import { useScrollReveal, fadeUp, staggerContainer } from '../../utils/animations'
import { Building2, MessageCircle, FileText, Mic } from 'lucide-react'

const features = [
  {
    icon: Building2,
    title: 'Company-Mode Simulator',
    description: 'Select any company — Google, startup, consulting firm. AI adopts their actual interview style, values, and difficulty level.',
    color: 'var(--primary)',
    bg: 'var(--primary-glow)',
    tag: 'MVP'
  },
  {
    icon: MessageCircle,
    title: 'Live AI Interviewer',
    description: 'Ultra-fast responses powered by Gemini. Real-time follow-ups that push back on weak answers — just like a real interviewer.',
    color: 'var(--accent-green)',
    bg: 'var(--accent-green-light)',
    tag: 'MVP'
  },
  {
    icon: FileText,
    title: 'Instant Feedback Report',
    description: 'End-of-session scorecard: answer quality, STAR method usage, filler word count, confidence signals, and improvement plan.',
    color: 'var(--accent-amber)',
    bg: 'var(--accent-amber-light)',
    tag: 'MVP'
  },
  {
    icon: Mic,
    title: 'Voice Mode',
    description: 'Speak your answers instead of typing. AI analyzes speech pace, filler words, and tone using voice transcription.',
    color: 'var(--accent-blue)',
    bg: 'var(--accent-blue-light)',
    tag: 'v2'
  }
]

export default function FeaturesSection() {
  const { ref, isInView } = useScrollReveal()

  return (
    <section className="py-28 relative" id="features" style={{ background: 'var(--surface)' }}>
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
            style={{ background: 'var(--accent-green-light)', color: 'var(--accent-green)' }}
          >
            Core Features
          </motion.div>
          <motion.h2
            variants={fadeUp}
            className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight"
            style={{ fontFamily: 'var(--font-heading)', color: 'var(--text)' }}
          >
            Everything You Need to{' '}
            <span className="gradient-text">Nail It</span>
          </motion.h2>
          <motion.p
            variants={fadeUp}
            className="mt-5 text-base md:text-lg max-w-2xl mx-auto leading-relaxed"
            style={{ color: 'var(--text-secondary)' }}
          >
            From company-specific simulations to brutally honest scorecards —
            we've built every tool you need to walk in confident.
          </motion.p>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5"
        >
          {features.map((feature) => (
            <motion.div
              key={feature.title}
              variants={fadeUp}
              className="group relative rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1"
              style={{
                background: 'var(--surface-2)',
                border: '1px solid var(--border)',
                boxShadow: 'var(--shadow-sm)',
              }}
            >
              {/* Tag */}
              <div
                className="absolute top-5 right-5 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider"
                style={{
                  background: feature.tag === 'MVP' ? 'var(--accent-green-light)' : 'var(--accent-blue-light)',
                  color: feature.tag === 'MVP' ? 'var(--accent-green)' : 'var(--accent-blue)',
                }}
              >
                {feature.tag}
              </div>

              {/* Icon */}
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center mb-5 transition-transform group-hover:scale-110"
                style={{ background: feature.bg, color: feature.color }}
              >
                <feature.icon size={22} />
              </div>

              <h3 className="text-lg font-bold mb-2" style={{ fontFamily: 'var(--font-heading)', color: 'var(--text)' }}>
                {feature.title}
              </h3>
              <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                {feature.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

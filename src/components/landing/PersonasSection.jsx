import { motion } from 'framer-motion'
import { useScrollReveal, fadeUp, staggerContainer } from '../../utils/animations'
import { GraduationCap, Briefcase, Code2, Plane } from 'lucide-react'

const personas = [
  {
    initials: 'AR',
    name: 'Arjun, 24',
    role: 'CS fresher, campus placements',
    traits: ['First job anxiety', 'No interview experience', 'Needs structure'],
    gradient: 'linear-gradient(135deg, #6C3BF4, #8B5CF6)',
  },
  {
    initials: 'PS',
    name: 'Priya, 31',
    role: 'PM switching to FAANG',
    traits: ['Targeting Google/Meta', 'Needs company-specific prep', 'Time-poor'],
    gradient: 'linear-gradient(135deg, #3B82F6, #60A5FA)',
  },
  {
    initials: 'MK',
    name: 'Mike, 28',
    role: 'Non-CS, breaking into tech',
    traits: ['Career switcher', 'Impostor syndrome', 'Needs confidence'],
    gradient: 'linear-gradient(135deg, #10B981, #34D399)',
  },
  {
    initials: 'SR',
    name: 'Sara, 26',
    role: 'International student, visa deadline',
    traits: ['Urgent timeline', 'Communication barriers', 'Multiple applications'],
    gradient: 'linear-gradient(135deg, #F59E0B, #FBBF24)',
  },
]

export default function PersonasSection() {
  const { ref, isInView } = useScrollReveal()

  return (
    <section className="py-28 relative" id="personas" style={{ background: 'var(--surface)' }}>
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
            style={{ background: 'var(--accent-amber-light)', color: 'var(--accent-amber)' }}
          >
            Who It's For
          </motion.div>
          <motion.h2
            variants={fadeUp}
            className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight"
            style={{ fontFamily: 'var(--font-heading)', color: 'var(--text)' }}
          >
            Built for{' '}
            <span className="gradient-text">Real People</span>
          </motion.h2>
          <motion.p
            variants={fadeUp}
            className="mt-5 text-base md:text-lg max-w-2xl mx-auto leading-relaxed"
            style={{ color: 'var(--text-secondary)' }}
          >
            Whether you're a fresher or a career switcher, MockPilot adapts to your unique situation.
          </motion.p>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5"
        >
          {personas.map((persona) => (
            <motion.div
              key={persona.initials}
              variants={fadeUp}
              className="group rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1"
              style={{
                background: 'var(--surface-2)',
                border: '1px solid var(--border)',
                boxShadow: 'var(--shadow-sm)',
              }}
            >
              {/* Avatar */}
              <div
                className="w-14 h-14 rounded-2xl flex items-center justify-center text-white text-lg font-bold mb-5 transition-transform group-hover:scale-110"
                style={{
                  background: persona.gradient,
                  fontFamily: 'var(--font-heading)',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.15)'
                }}
              >
                {persona.initials}
              </div>

              <h3 className="text-lg font-bold mb-1" style={{ fontFamily: 'var(--font-heading)', color: 'var(--text)' }}>
                {persona.name}
              </h3>
              <p className="text-xs font-medium mb-4" style={{ color: 'var(--text-muted)' }}>
                {persona.role}
              </p>

              <div className="flex flex-col gap-2.5">
                {persona.traits.map(trait => (
                  <div key={trait} className="flex items-center gap-2.5 text-xs" style={{ color: 'var(--text-secondary)' }}>
                    <div className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: persona.gradient }} />
                    {trait}
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

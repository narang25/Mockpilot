import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { useScrollReveal, fadeUp, staggerContainer } from '../../utils/animations'
import { Zap, ArrowRight } from 'lucide-react'

export default function CTASection() {
  const { ref, isInView } = useScrollReveal()

  return (
    <section className="py-28 relative overflow-hidden" style={{ background: 'var(--surface-2)' }}>
      <div className="max-w-6xl mx-auto px-6 sm:px-8 lg:px-12">
        <motion.div
          ref={ref}
          variants={staggerContainer}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="relative rounded-3xl overflow-hidden"
          style={{
            background: 'linear-gradient(135deg, var(--primary-dark) 0%, var(--primary) 40%, #818CF8 100%)',
          }}
        >
          {/* Background pattern */}
          <div
            className="absolute inset-0 opacity-10"
            style={{
              backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 0)`,
              backgroundSize: '30px 30px'
            }}
          />

          <div className="relative px-8 py-20 md:px-16 md:py-24 text-center">
            <motion.h2
              variants={fadeUp}
              className="text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight max-w-3xl mx-auto"
              style={{ fontFamily: 'var(--font-heading)' }}
            >
              Your Next Interview Doesn't Have to Be Your First Practice
            </motion.h2>
            <motion.p
              variants={fadeUp}
              className="mt-6 text-base md:text-lg text-white/70 max-w-xl mx-auto"
            >
              Start practicing right now — free, instant, no sign-up required.
              Your AI interviewer is ready when you are.
            </motion.p>
            <motion.div
              variants={fadeUp}
              className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
            >
              <Link
                to="/setup"
                className="group inline-flex items-center gap-2.5 px-8 py-4 rounded-2xl text-base font-bold transition-all hover:scale-[1.03] active:scale-[0.98]"
                style={{
                  background: 'white',
                  color: 'var(--primary)',
                  boxShadow: '0 10px 30px rgba(0,0,0,0.2)'
                }}
                id="cta-primary"
              >
                <Zap size={20} />
                Start Free Interview
                <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
              </Link>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import HeroSection from '../components/landing/HeroSection'
import FeaturesSection from '../components/landing/FeaturesSection'
import HowItWorksSection from '../components/landing/HowItWorksSection'
import PersonasSection from '../components/landing/PersonasSection'
import CTASection from '../components/landing/CTASection'

export default function LandingPage() {
  return (
    <div className="min-h-screen" style={{ background: 'var(--surface-2)' }}>
      <Navbar />
      <main>
        <HeroSection />
        <FeaturesSection />
        <HowItWorksSection />
        <PersonasSection />
        <CTASection />
      </main>
      <Footer />
    </div>
  )
}

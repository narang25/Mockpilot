import { Zap, ExternalLink, Heart } from 'lucide-react'
import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer style={{ background: 'var(--surface)', borderTop: '1px solid var(--border)' }}>
      {/* Gradient accent line */}
      <div className="h-[2px] gradient-bg" />

      <div className="max-w-6xl mx-auto px-6 sm:px-8 lg:px-12 py-16">
        <div className="grid md:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="md:col-span-2">
            <Link to="/" className="flex items-center gap-2.5 mb-4">
              <div className="w-9 h-9 rounded-xl flex items-center justify-center gradient-bg">
                <Zap size={18} color="white" strokeWidth={2.5} />
              </div>
              <span className="text-xl font-bold tracking-tight"
                style={{ fontFamily: 'var(--font-heading)', color: 'var(--text)' }}>
                Mock<span className="gradient-text">Pilot</span>
              </span>
            </Link>
            <p className="text-sm max-w-md leading-relaxed mb-6" style={{ color: 'var(--text-muted)' }}>
              AI-powered interview simulation that puts you in the hot seat.
              Real company culture, real questions, brutally honest feedback.
            </p>
            <div className="flex items-center gap-3">
              <a href="#" className="w-10 h-10 rounded-xl flex items-center justify-center transition-all hover:scale-105"
                style={{ background: 'var(--surface-3)', color: 'var(--text-muted)' }} aria-label="GitHub">
                <ExternalLink size={18} />
              </a>
              <a href="#" className="w-10 h-10 rounded-xl flex items-center justify-center transition-all hover:scale-105"
                style={{ background: 'var(--surface-3)', color: 'var(--text-muted)' }} aria-label="Support">
                <Heart size={18} />
              </a>
            </div>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider mb-4"
              style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-heading)' }}>
              Product
            </h4>
            <ul className="flex flex-col gap-3">
              {['Features', 'How it Works', 'Pricing', 'Changelog'].map(item => (
                <li key={item}>
                  <a href="#" className="text-sm transition-colors hover:opacity-70"
                    style={{ color: 'var(--text-secondary)' }}>{item}</a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider mb-4"
              style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-heading)' }}>
              Company
            </h4>
            <ul className="flex flex-col gap-3">
              {['About', 'Blog', 'Careers', 'Contact'].map(item => (
                <li key={item}>
                  <a href="#" className="text-sm transition-colors hover:opacity-70"
                    style={{ color: 'var(--text-secondary)' }}>{item}</a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-16 pt-8 flex flex-col md:flex-row items-center justify-between gap-4"
          style={{ borderTop: '1px solid var(--border)' }}>
          <p className="text-xs" style={{ color: 'var(--text-muted)' }}>
            © 2026 MockPilot. Built with Gemini for blazing-fast AI.
          </p>
          <div className="flex items-center gap-6">
            {['Privacy', 'Terms', 'Cookies'].map(item => (
              <a key={item} href="#" className="text-xs transition-colors hover:opacity-70"
                style={{ color: 'var(--text-muted)' }}>{item}</a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}

import Link from 'next/link'
import { Activity } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-[var(--color-primary)] text-white py-10 mt-auto">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <Link href="/" className="flex items-center gap-2 font-serif text-lg font-semibold text-white hover:text-[var(--color-accent)] transition-colors">
            <span className="w-7 h-7 rounded-md bg-white/20 flex items-center justify-center">
              <Activity size={14} color="white" />
            </span>
            Zenith Healthcare
          </Link>
          <nav className="flex flex-wrap justify-center gap-x-6 gap-y-2" aria-label="Footer navigation">
            <Link href="/#services" className="text-sm text-white/70 hover:text-white transition-colors">Services</Link>
            <Link href="/#doctors" className="text-sm text-white/70 hover:text-white transition-colors">Doctors</Link>
            <Link href="/appointments" className="text-sm text-white/70 hover:text-white transition-colors">Appointments</Link>
            <Link href="/wellness" className="text-sm text-white/70 hover:text-white transition-colors">Wellness</Link>
            <Link href="/feedback" className="text-sm text-white/70 hover:text-white transition-colors">Feedback</Link>
          </nav>
          <p className="text-sm text-white/60">&copy; 2025 Zenith Healthcare. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, X, Activity } from 'lucide-react'

const navLinks = [
  { href: '/dashboard', label: 'Dashboard' },
  { href: '/appointments', label: 'Appointments' },
  { href: '/profile', label: 'Profile' },
  { href: '/prescriptions', label: 'Prescriptions' },
  { href: '/wellness', label: 'Wellness' },
  { href: '/feedback', label: 'Feedback' },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const pathname = usePathname()
  const isHome = pathname === '/'

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-xl border-b border-[var(--color-border)]">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 font-serif text-xl font-semibold text-[var(--color-foreground)] hover:text-[var(--color-primary)] transition-colors">
          <span className="w-8 h-8 rounded-lg bg-[var(--color-primary)] flex items-center justify-center">
            <Activity size={16} color="white" />
          </span>
          Zenith <span className="text-[var(--color-primary)]">Healthcare</span>
        </Link>

        {/* Desktop Nav */}
        {isHome ? (
          <nav className="hidden md:flex items-center gap-1" aria-label="Primary">
            <Link href="/#services" className="px-3 py-2 text-sm font-medium text-[var(--color-text-secondary)] hover:text-[var(--color-primary)] hover:bg-[var(--color-surface)] rounded-md transition-all">Services</Link>
            <Link href="/#doctors" className="px-3 py-2 text-sm font-medium text-[var(--color-text-secondary)] hover:text-[var(--color-primary)] hover:bg-[var(--color-surface)] rounded-md transition-all">Doctors</Link>
            <Link href="/#wellness" className="px-3 py-2 text-sm font-medium text-[var(--color-text-secondary)] hover:text-[var(--color-primary)] hover:bg-[var(--color-surface)] rounded-md transition-all">Wellness</Link>
            <Link href="/#contact" className="ml-2 px-4 py-2 text-sm font-semibold bg-[var(--color-accent)] text-[var(--color-foreground)] rounded-md hover:bg-[var(--color-accent-light)] transition-all">
              Book Appointment
            </Link>
          </nav>
        ) : (
          <nav className="hidden md:flex items-center gap-1" aria-label="Primary">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`px-3 py-2 text-sm font-medium rounded-md transition-all ${
                  pathname === link.href
                    ? 'text-[var(--color-primary)] bg-[var(--color-primary)]/10 font-semibold'
                    : 'text-[var(--color-text-secondary)] hover:text-[var(--color-primary)] hover:bg-[var(--color-surface)]'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>
        )}

        {/* Mobile Toggle */}
        <button
          className="md:hidden p-2 rounded-md text-[var(--color-text-secondary)] hover:text-[var(--color-primary)] hover:bg-[var(--color-surface)] transition-all"
          onClick={() => setOpen(!open)}
          aria-label="Toggle navigation"
          aria-expanded={open}
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {open && (
        <div className="md:hidden border-t border-[var(--color-border)] bg-white">
          <nav className="flex flex-col py-2" aria-label="Mobile navigation">
            {isHome ? (
              <>
                <Link href="/#services" onClick={() => setOpen(false)} className="px-6 py-3 text-sm font-medium text-[var(--color-text-secondary)] hover:text-[var(--color-primary)] hover:bg-[var(--color-surface)] border-b border-[var(--color-border)] transition-all">Services</Link>
                <Link href="/#doctors" onClick={() => setOpen(false)} className="px-6 py-3 text-sm font-medium text-[var(--color-text-secondary)] hover:text-[var(--color-primary)] hover:bg-[var(--color-surface)] border-b border-[var(--color-border)] transition-all">Doctors</Link>
                <Link href="/#wellness" onClick={() => setOpen(false)} className="px-6 py-3 text-sm font-medium text-[var(--color-text-secondary)] hover:text-[var(--color-primary)] hover:bg-[var(--color-surface)] border-b border-[var(--color-border)] transition-all">Wellness</Link>
                <Link href="/#contact" onClick={() => setOpen(false)} className="mx-6 my-3 px-4 py-2 text-sm font-semibold text-center bg-[var(--color-accent)] text-[var(--color-foreground)] rounded-md hover:bg-[var(--color-accent-light)] transition-all">Book Appointment</Link>
              </>
            ) : (
              navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className={`px-6 py-3 text-sm font-medium border-b border-[var(--color-border)] transition-all ${
                    pathname === link.href
                      ? 'text-[var(--color-primary)] bg-[var(--color-primary)]/10 font-semibold'
                      : 'text-[var(--color-text-secondary)] hover:text-[var(--color-primary)] hover:bg-[var(--color-surface)]'
                  }`}
                >
                  {link.label}
                </Link>
              ))
            )}
          </nav>
        </div>
      )}
    </header>
  )
}

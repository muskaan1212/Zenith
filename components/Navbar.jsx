'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, X } from 'lucide-react'

const NAV = [
  { href: '/dashboard', label: 'Dashboard' },
  { href: '/appointments', label: 'Appointments' },
  { href: '/prescriptions', label: 'Prescriptions' },
  { href: '/wellness', label: 'Wellness' },
  { href: '/feedback', label: 'Feedback' },
  { href: '/profile', label: 'Profile' },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const pathname = usePathname()
  const isHome = pathname === '/'

  return (
    <header className="fixed inset-x-0 top-0 z-50 bg-[var(--color-background)]/90 backdrop-blur-md border-b border-[var(--color-border)]">
      <div className="max-w-6xl mx-auto px-6 h-14 flex items-center justify-between gap-8">

        <Link href="/" className="font-serif text-lg font-semibold tracking-tight text-[var(--color-foreground)] hover:text-[var(--color-primary)] transition-colors shrink-0">
          Zenith
        </Link>

        {/* Desktop */}
        <nav className="hidden md:flex items-center gap-1 flex-1" aria-label="Primary">
          {isHome ? (
            <>
              <Link href="/#services" className="px-3 py-1.5 text-sm text-[var(--color-text-muted)] hover:text-[var(--color-foreground)] transition-colors rounded">Services</Link>
              <Link href="/#doctors" className="px-3 py-1.5 text-sm text-[var(--color-text-muted)] hover:text-[var(--color-foreground)] transition-colors rounded">Doctors</Link>
              <Link href="/#wellness" className="px-3 py-1.5 text-sm text-[var(--color-text-muted)] hover:text-[var(--color-foreground)] transition-colors rounded">Wellness</Link>
            </>
          ) : (
            NAV.map(({ href, label }) => (
              <Link key={href} href={href}
                className={`px-3 py-1.5 text-sm rounded transition-colors ${pathname === href ? 'text-[var(--color-primary)] font-semibold' : 'text-[var(--color-text-muted)] hover:text-[var(--color-foreground)]'}`}>
                {label}
              </Link>
            ))
          )}
        </nav>

        <Link href="/#contact"
          className="hidden md:inline-flex items-center gap-2 px-4 py-2 bg-[var(--color-primary)] text-white text-sm font-medium rounded hover:bg-[var(--color-primary-light)] transition-colors shrink-0">
          Book Now
        </Link>

        <button className="md:hidden p-1.5 text-[var(--color-text-muted)] hover:text-[var(--color-foreground)] transition-colors"
          onClick={() => setOpen(!open)} aria-label="Toggle menu">
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {open && (
        <div className="md:hidden border-t border-[var(--color-border)] bg-[var(--color-background)]">
          <nav className="flex flex-col py-1" aria-label="Mobile navigation">
            {(isHome
              ? [{ href: '/#services', label: 'Services' }, { href: '/#doctors', label: 'Doctors' }, { href: '/#wellness', label: 'Wellness' }, { href: '/#contact', label: 'Book Appointment' }]
              : NAV
            ).map(({ href, label }) => (
              <Link key={href} href={href} onClick={() => setOpen(false)}
                className={`px-6 py-3 text-sm border-b border-[var(--color-border-subtle)] transition-colors ${pathname === href ? 'text-[var(--color-primary)] font-semibold bg-[var(--color-surface)]' : 'text-[var(--color-text-secondary)] hover:bg-[var(--color-surface)]'}`}>
                {label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  )
}

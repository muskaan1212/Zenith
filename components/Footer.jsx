import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="border-t border-[var(--color-border)] bg-[var(--color-background)]">
      <div className="max-w-6xl mx-auto px-6 py-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div>
          <p className="font-serif text-lg font-semibold text-[var(--color-foreground)]">Zenith Healthcare</p>
          <p className="text-sm text-[var(--color-text-muted)] mt-0.5">Your trusted health companion.</p>
        </div>
        <nav className="flex flex-wrap gap-x-6 gap-y-2" aria-label="Footer">
          {[
            { href: '/dashboard', label: 'Dashboard' },
            { href: '/appointments', label: 'Appointments' },
            { href: '/prescriptions', label: 'Prescriptions' },
            { href: '/wellness', label: 'Wellness' },
            { href: '/feedback', label: 'Feedback' },
          ].map(({ href, label }) => (
            <Link key={href} href={href} className="text-sm text-[var(--color-text-muted)] hover:text-[var(--color-foreground)] transition-colors">
              {label}
            </Link>
          ))}
        </nav>
        <p className="text-xs text-[var(--color-text-light)]">&copy; {new Date().getFullYear()} Zenith Healthcare</p>
      </div>
    </footer>
  )
}

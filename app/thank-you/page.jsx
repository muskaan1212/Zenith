import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import Link from 'next/link'
import { CheckCircle } from 'lucide-react'

export const metadata = {
  title: 'Thank You | Zenith Healthcare',
  description: 'Your appointment request has been received.',
}

export default function ThankYouPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main
        className="flex-1 flex items-center justify-center relative overflow-hidden"
        style={{
          background: 'linear-gradient(rgba(0,0,0,0.45), rgba(0,0,0,0.55)), url(/images/thank-you-bg.jpg) center/cover no-repeat fixed',
        }}
      >
        <div className="relative z-10 max-w-md w-full mx-4 bg-white/95 backdrop-blur-sm rounded-2xl p-10 text-center shadow-2xl">
          <div className="w-16 h-16 rounded-full bg-[var(--color-primary)]/10 flex items-center justify-center mx-auto mb-5">
            <CheckCircle size={36} className="text-[var(--color-primary)]" />
          </div>
          <h1 className="font-serif text-3xl font-medium text-[var(--color-foreground)] mb-3">Thank you!</h1>
          <p className="text-[var(--color-text-secondary)] leading-relaxed font-light mb-8">
            Your appointment request has been received. Our care team will contact you within 24 hours to confirm your appointment and answer any questions.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/" className="px-6 py-2.5 bg-[var(--color-accent)] text-[var(--color-foreground)] font-semibold text-sm rounded-md hover:bg-[var(--color-accent-light)] transition-all hover:-translate-y-0.5">
              Return Home
            </Link>
            <Link href="/#contact" className="px-6 py-2.5 border border-[var(--color-border)] text-sm font-medium text-[var(--color-text-secondary)] rounded-md hover:border-[var(--color-primary)] hover:text-[var(--color-primary)] transition-all">
              Schedule Another
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}

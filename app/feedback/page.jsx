'use client'

import { useState } from 'react'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { Star, Plus, X } from 'lucide-react'

const initialFeedback = [
  { id: 1, author: 'Sarah Johnson', type: 'doctor', rating: 5, subject: 'Excellent Service', message: 'Dr. Sharma provided excellent care and was very attentive to my concerns.', date: '2025-10-20' },
  { id: 2, author: 'Michael Chen', type: 'service', rating: 4, subject: 'Good Experience', message: 'Overall good experience, but the waiting time could be reduced.', date: '2025-10-18' },
]

export default function FeedbackPage() {
  const [feedbackList, setFeedbackList] = useState(initialFeedback)
  const [showModal, setShowModal] = useState(false)
  const [form, setForm] = useState({ type: '', rating: 0, subject: '', message: '' })

  async function handleSubmit(e) {
    e.preventDefault()
    if (!form.type || !form.rating || !form.subject || !form.message) return

    const newFeedback = {
      id: Date.now(),
      author: 'You',
      type: form.type,
      rating: form.rating,
      subject: form.subject,
      message: form.message,
      date: new Date().toISOString().split('T')[0],
    }

    try {
      await fetch('http://localhost:5000/feedback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newFeedback),
      })
    } catch (_) {}

    setFeedbackList(prev => [newFeedback, ...prev])
    setForm({ type: '', rating: 0, subject: '', message: '' })
    setShowModal(false)
  }

  function StarRating({ value, onChange }) {
    return (
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map(n => (
          <button
            key={n}
            type="button"
            onClick={() => onChange(n)}
            className={`text-xl transition-colors ${n <= value ? 'text-[var(--color-accent)]' : 'text-[var(--color-border)]'} hover:text-[var(--color-accent)]`}
          >
            <Star size={20} fill={n <= value ? 'currentColor' : 'none'} />
          </button>
        ))}
      </div>
    )
  }

  return (
    <div className="min-h-screen flex flex-col bg-[var(--color-surface)]">
      <Navbar />
      <main className="flex-1 max-w-4xl mx-auto w-full px-6 pt-24 pb-12">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="font-serif text-3xl font-medium text-[var(--color-foreground)]">Feedback</h1>
            <p className="text-[var(--color-text-muted)] mt-1">Share your experience to help us improve.</p>
          </div>
          <button onClick={() => setShowModal(true)} className="flex items-center gap-2 px-4 py-2.5 bg-[var(--color-primary)] text-white text-sm font-semibold rounded-md hover:bg-[var(--color-primary-light)] transition-colors">
            <Plus size={15} /> Submit Feedback
          </button>
        </div>

        {feedbackList.length === 0 ? (
          <p className="text-sm text-[var(--color-text-muted)] bg-white border border-[var(--color-border)] rounded-xl p-10 text-center">No feedback yet. Be the first to share!</p>
        ) : (
          <div className="space-y-4">
            {feedbackList.map(fb => (
              <div key={fb.id} className="bg-white border border-[var(--color-border)] rounded-xl p-6">
                <div className="flex items-start justify-between gap-4 mb-3">
                  <div>
                    <p className="font-semibold text-[var(--color-foreground)]">{fb.author}</p>
                    <p className="text-sm font-medium text-[var(--color-text-secondary)] mt-0.5">{fb.subject}</p>
                  </div>
                  <div className="flex items-center gap-0.5 flex-shrink-0">
                    {[1, 2, 3, 4, 5].map(n => (
                      <Star key={n} size={14} className={n <= fb.rating ? 'text-[var(--color-accent)] fill-current' : 'text-[var(--color-border)]'} fill={n <= fb.rating ? 'currentColor' : 'none'} />
                    ))}
                  </div>
                </div>
                <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed mb-3">{fb.message}</p>
                <div className="flex items-center gap-3">
                  <span className="text-xs font-semibold uppercase tracking-wide px-2 py-0.5 bg-[var(--color-surface)] rounded-full text-[var(--color-text-muted)]">{fb.type}</span>
                  <span className="text-xs text-[var(--color-text-light)]">{new Date(fb.date).toLocaleDateString()}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      {showModal && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={() => setShowModal(false)}>
          <div className="bg-white rounded-xl p-6 w-full max-w-md shadow-xl" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-5">
              <h3 className="font-serif text-xl font-medium text-[var(--color-foreground)]">Submit Feedback</h3>
              <button onClick={() => setShowModal(false)} className="text-[var(--color-text-muted)] hover:text-[var(--color-foreground)] transition-colors"><X size={18} /></button>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold uppercase tracking-wider text-[var(--color-text-muted)]">Type *</label>
                <select value={form.type} onChange={e => setForm(p => ({ ...p, type: e.target.value }))} required className="px-4 py-2.5 border border-[var(--color-border)] rounded-md text-sm focus:outline-none focus:border-[var(--color-primary)] bg-white">
                  <option value="">Select type</option>
                  <option value="doctor">Doctor</option>
                  <option value="service">Service</option>
                  <option value="facility">Facility</option>
                </select>
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold uppercase tracking-wider text-[var(--color-text-muted)]">Rating *</label>
                <StarRating value={form.rating} onChange={v => setForm(p => ({ ...p, rating: v }))} />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold uppercase tracking-wider text-[var(--color-text-muted)]">Subject *</label>
                <input value={form.subject} onChange={e => setForm(p => ({ ...p, subject: e.target.value }))} required className="px-4 py-2.5 border border-[var(--color-border)] rounded-md text-sm focus:outline-none focus:border-[var(--color-primary)]" placeholder="Brief subject" />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold uppercase tracking-wider text-[var(--color-text-muted)]">Message *</label>
                <textarea value={form.message} onChange={e => setForm(p => ({ ...p, message: e.target.value }))} required rows={3} className="px-4 py-2.5 border border-[var(--color-border)] rounded-md text-sm focus:outline-none focus:border-[var(--color-primary)] resize-none" placeholder="Share your experience..." />
              </div>
              <div className="flex gap-3 pt-2">
                <button type="button" onClick={() => setShowModal(false)} className="flex-1 px-4 py-2.5 border border-[var(--color-border)] text-sm font-medium text-[var(--color-text-secondary)] rounded-md hover:bg-[var(--color-surface)] transition-colors">Cancel</button>
                <button type="submit" className="flex-1 px-4 py-2.5 bg-[var(--color-primary)] text-white text-sm font-semibold rounded-md hover:bg-[var(--color-primary-light)] transition-colors">Submit</button>
              </div>
            </form>
          </div>
        </div>
      )}

      <Footer />
    </div>
  )
}

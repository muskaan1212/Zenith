'use client'

import { useState } from 'react'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { Star, Plus, X } from 'lucide-react'

const INIT = [
  { id: 1, author: 'Sarah Johnson', type: 'doctor', rating: 5, subject: 'Excellent Service', message: 'Dr. Sharma provided exceptional care and was very attentive to my concerns.', date: '2025-10-20' },
  { id: 2, author: 'Michael Chen', type: 'service', rating: 4, subject: 'Good Experience', message: 'Overall a great experience. Waiting time could be slightly reduced.', date: '2025-10-18' },
]

function Stars({ value, onChange }) {
  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((n) => (
        <button key={n} type={onChange ? 'button' : undefined} onClick={() => onChange?.(n)} className="transition-colors">
          <Star size={onChange ? 20 : 14} className={n <= value ? 'text-[var(--color-accent)] fill-[var(--color-accent)]' : 'text-[var(--color-border)]'} fill={n <= value ? 'currentColor' : 'none'} />
        </button>
      ))}
    </div>
  )
}

const input = 'w-full px-3 py-2.5 border border-[var(--color-border)] rounded text-sm bg-white focus:outline-none focus:border-[var(--color-primary)] transition-colors'

export default function FeedbackPage() {
  const [list, setList] = useState(INIT)
  const [modal, setModal] = useState(false)
  const [form, setForm] = useState({ type: '', rating: 0, subject: '', message: '' })
  const set = (k) => (e) => setForm((p) => ({ ...p, [k]: e.target.value }))

  async function submit(e) {
    e.preventDefault()
    if (!form.type || !form.rating || !form.subject || !form.message) return
    const fb = { id: Date.now(), author: 'You', ...form, date: new Date().toISOString().split('T')[0] }
    try { await fetch('http://localhost:5000/feedback', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(fb) }) } catch (_) {}
    setList((p) => [fb, ...p])
    setForm({ type: '', rating: 0, subject: '', message: '' })
    setModal(false)
  }

  return (
    <div className="min-h-screen flex flex-col bg-[var(--color-surface)]">
      <Navbar />
      <main className="flex-1 max-w-4xl mx-auto w-full px-6 pt-20 pb-16">
        <div className="py-8 border-b border-[var(--color-border)] mb-8 flex items-end justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.15em] text-[var(--color-primary)] mb-1">Reviews</p>
            <h1 className="font-serif text-3xl md:text-4xl font-light text-[var(--color-foreground)]">Feedback</h1>
          </div>
          <button onClick={() => setModal(true)} className="flex items-center gap-2 px-4 py-2.5 bg-[var(--color-primary)] text-white text-sm font-medium rounded hover:bg-[var(--color-primary-light)] transition-colors">
            <Plus size={14} /> Submit Feedback
          </button>
        </div>

        {list.length === 0
          ? <p className="text-sm text-[var(--color-text-muted)] bg-white border border-[var(--color-border)] rounded-lg p-10 text-center">No feedback yet. Be the first to share!</p>
          : <div className="space-y-3">
            {list.map((fb) => (
              <div key={fb.id} className="bg-white border border-[var(--color-border)] rounded-lg p-6">
                <div className="flex items-start justify-between gap-4 mb-3">
                  <div>
                    <p className="font-semibold text-[var(--color-foreground)] text-sm">{fb.author}</p>
                    <p className="text-sm text-[var(--color-text-secondary)] mt-0.5">{fb.subject}</p>
                  </div>
                  <Stars value={fb.rating} />
                </div>
                <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed mb-4">{fb.message}</p>
                <div className="flex items-center gap-3">
                  <span className="text-xs font-medium uppercase tracking-wide px-2 py-0.5 bg-[var(--color-surface)] border border-[var(--color-border)] rounded text-[var(--color-text-muted)] capitalize">{fb.type}</span>
                  <span className="text-xs text-[var(--color-text-light)]">{new Date(fb.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
                </div>
              </div>
            ))}
          </div>
        }
      </main>

      {modal && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4" onClick={() => setModal(false)}>
          <div className="bg-white rounded-lg p-6 w-full max-w-sm shadow-xl" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-5">
              <h3 className="font-serif text-xl font-medium text-[var(--color-foreground)]">Submit Feedback</h3>
              <button onClick={() => setModal(false)} className="text-[var(--color-text-muted)] hover:text-[var(--color-foreground)] transition-colors"><X size={18} /></button>
            </div>
            <form onSubmit={submit} className="space-y-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold uppercase tracking-wider text-[var(--color-text-muted)]">Type *</label>
                <select value={form.type} onChange={set('type')} required className={input}>
                  <option value="">Select type</option>
                  <option value="doctor">Doctor</option>
                  <option value="service">Service</option>
                  <option value="facility">Facility</option>
                </select>
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold uppercase tracking-wider text-[var(--color-text-muted)]">Rating *</label>
                <Stars value={form.rating} onChange={(v) => setForm((p) => ({ ...p, rating: v }))} />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold uppercase tracking-wider text-[var(--color-text-muted)]">Subject *</label>
                <input value={form.subject} onChange={set('subject')} required placeholder="Brief subject" className={input} />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold uppercase tracking-wider text-[var(--color-text-muted)]">Message *</label>
                <textarea value={form.message} onChange={set('message')} required rows={3} placeholder="Share your experience..." className={input + ' resize-none'} />
              </div>
              <div className="flex gap-3 pt-1">
                <button type="button" onClick={() => setModal(false)} className="flex-1 py-2.5 border border-[var(--color-border)] text-sm rounded text-[var(--color-text-secondary)] hover:border-[var(--color-foreground)] transition-colors">Cancel</button>
                <button type="submit" className="flex-1 py-2.5 bg-[var(--color-primary)] text-white text-sm font-medium rounded hover:bg-[var(--color-primary-light)] transition-colors">Submit</button>
              </div>
            </form>
          </div>
        </div>
      )}
      <Footer />
    </div>
  )
}

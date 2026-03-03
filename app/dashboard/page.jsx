'use client'

import { useState } from 'react'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { Bell, Calendar, CheckCircle, Clock, Plus, Trash2, RefreshCw } from 'lucide-react'

const INIT_REMINDERS = [
  { id: 1, title: 'Take Morning Medication', time: '08:00', note: 'Take prescribed medication with breakfast', done: false },
  { id: 2, title: 'Cardiology Consultation', time: '14:30', note: 'With Dr. A. Sharma — Room 204', done: false },
]
const CONSULTATIONS = [
  { id: 1, doctor: 'Dr. A. Sharma', spec: 'Cardiology', date: '2025-10-28', time: '14:30' },
  { id: 2, doctor: 'Dr. P. Gupta', spec: 'Neurology', date: '2025-11-05', time: '10:00' },
]

function Modal({ onClose, onAdd }) {
  const [form, setForm] = useState({ title: '', time: '', note: '' })
  const set = (k) => (e) => setForm((p) => ({ ...p, [k]: e.target.value }))
  return (
    <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div className="bg-white rounded-lg p-6 w-full max-w-sm shadow-xl" onClick={(e) => e.stopPropagation()}>
        <h3 className="font-serif text-xl font-medium text-[var(--color-foreground)] mb-5">Add Reminder</h3>
        <form onSubmit={(e) => { e.preventDefault(); onAdd(form); }} className="space-y-4">
          <Field label="Title" required><input value={form.title} onChange={set('title')} required placeholder="e.g. Take medication" className={input} /></Field>
          <Field label="Time" required><input type="time" value={form.time} onChange={set('time')} required className={input} /></Field>
          <Field label="Note"><input value={form.note} onChange={set('note')} placeholder="Optional" className={input} /></Field>
          <div className="flex gap-3 pt-1">
            <button type="button" onClick={onClose} className={btnOutline + ' flex-1'}>Cancel</button>
            <button type="submit" className={btnPrimary + ' flex-1'}>Add</button>
          </div>
        </form>
      </div>
    </div>
  )
}

const input = 'w-full px-3 py-2.5 border border-[var(--color-border)] rounded text-sm focus:outline-none focus:border-[var(--color-primary)] bg-white transition-colors'
const btnPrimary = 'px-4 py-2.5 bg-[var(--color-primary)] text-white text-sm font-medium rounded hover:bg-[var(--color-primary-light)] transition-colors'
const btnOutline = 'px-4 py-2.5 border border-[var(--color-border)] text-sm text-[var(--color-text-secondary)] rounded hover:border-[var(--color-foreground)] transition-colors'

function Field({ label, required, children }) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-xs font-semibold uppercase tracking-wider text-[var(--color-text-muted)]">{label}{required && ' *'}</label>
      {children}
    </div>
  )
}

export default function DashboardPage() {
  const [reminders, setReminders] = useState(INIT_REMINDERS)
  const [notes, setNotes] = useState([
    { id: 1, msg: 'Remember to stay hydrated today.', time: '09:15' },
    { id: 2, msg: 'Your health score is improving!', time: '08:00' },
  ])
  const [showModal, setShowModal] = useState(false)

  function addReminder(form) {
    setReminders((p) => [...p, { id: Date.now(), title: form.title, time: form.time, note: form.note, done: false }])
    setNotes((p) => [{ id: Date.now(), msg: `Reminder added: ${form.title}`, time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }, ...p])
    setShowModal(false)
  }

  const stats = [
    { label: 'Reminders', value: reminders.length, icon: Bell },
    { label: 'Consultations', value: CONSULTATIONS.length, icon: Calendar },
    { label: 'Completed', value: reminders.filter((r) => r.done).length, icon: CheckCircle },
    { label: 'Upcoming', value: CONSULTATIONS.filter((c) => new Date(c.date) >= new Date()).length, icon: Clock },
  ]

  return (
    <div className="min-h-screen flex flex-col bg-[var(--color-surface)]">
      <Navbar />
      <main className="flex-1 max-w-6xl mx-auto w-full px-6 pt-20 pb-16">

        {/* Header */}
        <div className="py-8 border-b border-[var(--color-border)] mb-8 flex items-end justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.15em] text-[var(--color-primary)] mb-1">Overview</p>
            <h1 className="font-serif text-3xl md:text-4xl font-light text-[var(--color-foreground)]">Dashboard</h1>
          </div>
          <button onClick={() => setShowModal(true)} className={btnPrimary + ' flex items-center gap-2'}>
            <Plus size={14} /> Add Reminder
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
          {stats.map(({ label, value, icon: Icon }) => (
            <div key={label} className="bg-white border border-[var(--color-border)] rounded-lg p-5">
              <Icon size={16} className="text-[var(--color-primary)] mb-3" />
              <p className="font-serif text-3xl font-light text-[var(--color-foreground)]">{value}</p>
              <p className="text-xs text-[var(--color-text-muted)] mt-1">{label}</p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Reminders */}
          <div className="lg:col-span-2 bg-white border border-[var(--color-border)] rounded-lg p-6">
            <h2 className="font-serif text-xl font-medium text-[var(--color-foreground)] mb-5">Reminders</h2>
            {reminders.length === 0 ? (
              <p className="text-sm text-[var(--color-text-muted)] py-10 text-center">No reminders yet.</p>
            ) : (
              <ul className="space-y-2">
                {reminders.map((r) => (
                  <li key={r.id} className={`flex items-start gap-3 p-4 rounded-md border transition-all ${r.done ? 'opacity-50 bg-[var(--color-surface)] border-[var(--color-border)]' : 'bg-white border-[var(--color-border)]'}`}>
                    <button onClick={() => setReminders((p) => p.map((x) => x.id === r.id ? { ...x, done: !x.done } : x))}
                      className={`mt-0.5 w-4 h-4 rounded-full border-2 shrink-0 flex items-center justify-center transition-colors ${r.done ? 'bg-[var(--color-success)] border-[var(--color-success)]' : 'border-[var(--color-border)] hover:border-[var(--color-primary)]'}`}>
                      {r.done && <CheckCircle size={10} color="white" />}
                    </button>
                    <div className="flex-1 min-w-0">
                      <p className={`text-sm font-medium ${r.done ? 'line-through text-[var(--color-text-muted)]' : 'text-[var(--color-foreground)]'}`}>{r.title}</p>
                      {r.note && <p className="text-xs text-[var(--color-text-muted)] mt-0.5">{r.note}</p>}
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      <span className="text-xs text-[var(--color-text-light)] font-mono">{r.time}</span>
                      <button onClick={() => setReminders((p) => p.filter((x) => x.id !== r.id))} className="text-[var(--color-text-light)] hover:text-[var(--color-error)] transition-colors">
                        <Trash2 size={13} />
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-5">
            <div className="bg-white border border-[var(--color-border)] rounded-lg p-6">
              <h2 className="font-serif text-xl font-medium text-[var(--color-foreground)] mb-4">Consultations</h2>
              <ul className="space-y-3">
                {CONSULTATIONS.map((c) => (
                  <li key={c.id} className="p-3 bg-[var(--color-surface)] rounded-md border border-[var(--color-border)]">
                    <p className="text-sm font-medium text-[var(--color-foreground)]">{c.doctor}</p>
                    <p className="text-xs text-[var(--color-primary)] font-semibold uppercase tracking-wide mt-0.5">{c.spec}</p>
                    <p className="text-xs text-[var(--color-text-muted)] mt-1 font-mono">{c.date} · {c.time}</p>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-white border border-[var(--color-border)] rounded-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-serif text-xl font-medium text-[var(--color-foreground)]">Notifications</h2>
                <button onClick={() => setNotes([])} className="text-xs text-[var(--color-text-muted)] hover:text-[var(--color-error)] transition-colors flex items-center gap-1">
                  <RefreshCw size={11} /> Clear
                </button>
              </div>
              {notes.length === 0
                ? <p className="text-sm text-[var(--color-text-muted)] text-center py-4">No notifications.</p>
                : <ul className="space-y-2">{notes.map((n) => (
                  <li key={n.id} className="flex gap-2 p-3 bg-[var(--color-primary)]/5 rounded-md">
                    <Bell size={12} className="text-[var(--color-primary)] mt-0.5 shrink-0" />
                    <div>
                      <p className="text-xs text-[var(--color-foreground)]">{n.msg}</p>
                      <p className="text-xs text-[var(--color-text-light)] mt-0.5 font-mono">{n.time}</p>
                    </div>
                  </li>
                ))}</ul>
              }
            </div>
          </div>
        </div>
      </main>

      {showModal && <Modal onClose={() => setShowModal(false)} onAdd={addReminder} />}
      <Footer />
    </div>
  )
}

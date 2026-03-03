'use client'

import { useState } from 'react'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { Bell, Calendar, ClipboardList, Clock, Plus, Trash2, CheckCircle, RefreshCw } from 'lucide-react'

const mockReminders = [
  { id: 1, title: 'Take Morning Medication', time: '08:00', description: 'Take prescribed medication with breakfast', completed: false },
  { id: 2, title: 'Doctor Appointment', time: '14:30', description: 'Cardiology consultation with Dr. A. Sharma', completed: false },
]

const mockConsultations = [
  { id: 1, doctor: 'Dr. A. Sharma', specialty: 'Cardiology', date: '2025-10-28', time: '14:30' },
  { id: 2, doctor: 'Dr. P. Gupta', specialty: 'Neurology', date: '2025-11-05', time: '10:00' },
]

const mockNotifications = [
  { id: 1, message: 'Remember to stay hydrated!', time: '09:15' },
  { id: 2, message: 'Your health score is improving!', time: '08:00' },
]

export default function DashboardPage() {
  const [reminders, setReminders] = useState(mockReminders)
  const [notifications, setNotifications] = useState(mockNotifications)
  const [showModal, setShowModal] = useState(false)
  const [form, setForm] = useState({ title: '', time: '', description: '' })

  function addReminder(e) {
    e.preventDefault()
    if (!form.title || !form.time) return
    setReminders(prev => [...prev, { id: Date.now(), ...form, completed: false }])
    setNotifications(prev => [{ id: Date.now(), message: `New reminder: ${form.title}`, time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }, ...prev])
    setForm({ title: '', time: '', description: '' })
    setShowModal(false)
  }

  function toggleReminder(id) {
    setReminders(prev => prev.map(r => r.id === id ? { ...r, completed: !r.completed } : r))
  }

  function deleteReminder(id) {
    setReminders(prev => prev.filter(r => r.id !== id))
  }

  return (
    <div className="min-h-screen flex flex-col bg-[var(--color-surface)]">
      <Navbar />
      <main className="flex-1 max-w-6xl mx-auto w-full px-6 pt-24 pb-12">
        <div className="mb-8">
          <h1 className="font-serif text-3xl font-medium text-[var(--color-foreground)]">Dashboard</h1>
          <p className="text-[var(--color-text-muted)] mt-1">Welcome back. Here is your health summary.</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {[
            { label: 'Reminders', value: reminders.length, icon: Bell },
            { label: 'Consultations', value: mockConsultations.length, icon: Calendar },
            { label: 'Completed', value: reminders.filter(r => r.completed).length, icon: CheckCircle },
            { label: 'Upcoming', value: mockConsultations.filter(c => new Date(c.date) >= new Date()).length, icon: Clock },
          ].map(({ label, value, icon: Icon }) => (
            <div key={label} className="bg-white border border-[var(--color-border)] rounded-xl p-5">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-9 h-9 rounded-lg bg-[var(--color-primary)]/10 flex items-center justify-center">
                  <Icon size={16} className="text-[var(--color-primary)]" />
                </div>
                <span className="text-sm font-medium text-[var(--color-text-muted)]">{label}</span>
              </div>
              <p className="text-3xl font-serif font-light text-[var(--color-foreground)]">{value}</p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Reminders */}
          <div className="lg:col-span-2 bg-white border border-[var(--color-border)] rounded-xl p-6">
            <div className="flex items-center justify-between mb-5">
              <h2 className="font-serif text-xl font-medium text-[var(--color-foreground)]">Reminders</h2>
              <button onClick={() => setShowModal(true)} className="flex items-center gap-1.5 px-3 py-1.5 bg-[var(--color-primary)] text-white text-xs font-semibold rounded-md hover:bg-[var(--color-primary-light)] transition-colors">
                <Plus size={13} /> Add
              </button>
            </div>
            {reminders.length === 0 ? (
              <p className="text-sm text-[var(--color-text-muted)] py-6 text-center">No reminders yet. Add one to get started.</p>
            ) : (
              <ul className="space-y-3">
                {reminders.map(r => (
                  <li key={r.id} className={`flex items-start gap-3 p-4 rounded-lg border ${r.completed ? 'bg-[var(--color-surface)] border-[var(--color-border)] opacity-60' : 'bg-white border-[var(--color-border)]'}`}>
                    <button onClick={() => toggleReminder(r.id)} className={`mt-0.5 w-5 h-5 rounded-full border-2 flex-shrink-0 flex items-center justify-center transition-colors ${r.completed ? 'bg-[var(--color-success)] border-[var(--color-success)]' : 'border-[var(--color-border)] hover:border-[var(--color-primary)]'}`}>
                      {r.completed && <CheckCircle size={12} color="white" />}
                    </button>
                    <div className="flex-1 min-w-0">
                      <p className={`text-sm font-medium ${r.completed ? 'line-through text-[var(--color-text-muted)]' : 'text-[var(--color-foreground)]'}`}>{r.title}</p>
                      {r.description && <p className="text-xs text-[var(--color-text-muted)] mt-0.5">{r.description}</p>}
                    </div>
                    <div className="flex items-center gap-2 flex-shrink-0">
                      <span className="text-xs text-[var(--color-text-light)]">{r.time}</span>
                      <button onClick={() => deleteReminder(r.id)} className="text-[var(--color-text-light)] hover:text-[var(--color-error)] transition-colors">
                        <Trash2 size={13} />
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Consultations */}
            <div className="bg-white border border-[var(--color-border)] rounded-xl p-6">
              <h2 className="font-serif text-xl font-medium text-[var(--color-foreground)] mb-4">Consultations</h2>
              <ul className="space-y-3">
                {mockConsultations.map(c => (
                  <li key={c.id} className="flex flex-col gap-1 p-3 bg-[var(--color-surface)] rounded-lg border border-[var(--color-border)]">
                    <p className="text-sm font-medium text-[var(--color-foreground)]">{c.doctor}</p>
                    <p className="text-xs text-[var(--color-primary)] font-semibold uppercase tracking-wide">{c.specialty}</p>
                    <p className="text-xs text-[var(--color-text-muted)]">{c.date} at {c.time}</p>
                  </li>
                ))}
              </ul>
            </div>

            {/* Notifications */}
            <div className="bg-white border border-[var(--color-border)] rounded-xl p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-serif text-xl font-medium text-[var(--color-foreground)]">Notifications</h2>
                <button onClick={() => setNotifications([])} className="text-xs text-[var(--color-text-muted)] hover:text-[var(--color-error)] transition-colors flex items-center gap-1">
                  <RefreshCw size={11} /> Clear
                </button>
              </div>
              {notifications.length === 0 ? (
                <p className="text-sm text-[var(--color-text-muted)] text-center py-4">No notifications.</p>
              ) : (
                <ul className="space-y-2">
                  {notifications.map(n => (
                    <li key={n.id} className="flex items-start gap-2 p-3 bg-[var(--color-primary)]/5 rounded-lg">
                      <Bell size={13} className="text-[var(--color-primary)] mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="text-xs text-[var(--color-foreground)]">{n.message}</p>
                        <p className="text-xs text-[var(--color-text-light)] mt-0.5">{n.time}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </div>
      </main>

      {/* Add Reminder Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={() => setShowModal(false)}>
          <div className="bg-white rounded-xl p-6 w-full max-w-md shadow-xl" onClick={e => e.stopPropagation()}>
            <h3 className="font-serif text-xl font-medium text-[var(--color-foreground)] mb-5">Add Reminder</h3>
            <form onSubmit={addReminder} className="space-y-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold uppercase tracking-wider text-[var(--color-text-muted)]">Title *</label>
                <input value={form.title} onChange={e => setForm(p => ({ ...p, title: e.target.value }))} required className="px-4 py-2.5 border border-[var(--color-border)] rounded-md text-sm focus:outline-none focus:border-[var(--color-primary)]" placeholder="e.g. Take medication" />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold uppercase tracking-wider text-[var(--color-text-muted)]">Time *</label>
                <input type="time" value={form.time} onChange={e => setForm(p => ({ ...p, time: e.target.value }))} required className="px-4 py-2.5 border border-[var(--color-border)] rounded-md text-sm focus:outline-none focus:border-[var(--color-primary)]" />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold uppercase tracking-wider text-[var(--color-text-muted)]">Description</label>
                <input value={form.description} onChange={e => setForm(p => ({ ...p, description: e.target.value }))} className="px-4 py-2.5 border border-[var(--color-border)] rounded-md text-sm focus:outline-none focus:border-[var(--color-primary)]" placeholder="Optional details" />
              </div>
              <div className="flex gap-3 pt-2">
                <button type="button" onClick={() => setShowModal(false)} className="flex-1 px-4 py-2.5 border border-[var(--color-border)] text-sm font-medium text-[var(--color-text-secondary)] rounded-md hover:bg-[var(--color-surface)] transition-colors">Cancel</button>
                <button type="submit" className="flex-1 px-4 py-2.5 bg-[var(--color-primary)] text-white text-sm font-semibold rounded-md hover:bg-[var(--color-primary-light)] transition-colors">Add Reminder</button>
              </div>
            </form>
          </div>
        </div>
      )}

      <Footer />
    </div>
  )
}

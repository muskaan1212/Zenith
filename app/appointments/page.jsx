'use client'

import { useState } from 'react'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { Plus, X, Calendar, Clock, User, FileText } from 'lucide-react'

const initialAppointments = [
  { id: 1, doctor: 'Dr. A. Sharma', specialty: 'Cardiology', date: '2025-10-28', time: '14:30', reason: 'Regular checkup' },
  { id: 2, doctor: 'Dr. P. Gupta', specialty: 'Neurology', date: '2025-11-05', time: '10:00', reason: 'Consultation' },
  { id: 3, doctor: 'Dr. R. Mehta', specialty: 'Orthopaedics', date: '2024-09-12', time: '11:00', reason: 'Follow-up' },
]

export default function AppointmentsPage() {
  const [appointments, setAppointments] = useState(initialAppointments)
  const [showModal, setShowModal] = useState(false)
  const [form, setForm] = useState({ doctor: '', date: '', time: '', reason: '' })

  const now = new Date()
  const upcoming = appointments.filter(a => new Date(a.date) >= now)
  const past = appointments.filter(a => new Date(a.date) < now)

  async function handleBook(e) {
    e.preventDefault()
    if (!form.doctor || !form.date || !form.time) return

    const doctorSpecialties = {
      'Dr. A. Sharma': 'Cardiology',
      'Dr. P. Gupta': 'Neurology',
      'Dr. R. Mehta': 'Orthopaedics',
      'Dr. S. Patel': 'Paediatrics',
    }

    const newAppt = {
      id: Date.now(),
      doctor: form.doctor,
      specialty: doctorSpecialties[form.doctor] || 'General',
      date: form.date,
      time: form.time,
      reason: form.reason,
    }

    try {
      await fetch('http://localhost:5000/appointments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newAppt),
      })
    } catch (_) {
      // Backend offline — use local state
    }

    setAppointments(prev => [newAppt, ...prev])
    setForm({ doctor: '', date: '', time: '', reason: '' })
    setShowModal(false)
    window.location.href = '/thank-you'
  }

  function AppointmentCard({ appt }) {
    const isUpcoming = new Date(appt.date) >= now
    return (
      <div className="bg-white border border-[var(--color-border)] rounded-xl p-5 hover:shadow-sm transition-shadow">
        <div className="flex items-start justify-between gap-3 mb-4">
          <div>
            <p className="font-semibold text-[var(--color-foreground)]">{appt.doctor}</p>
            <p className="text-xs text-[var(--color-primary)] font-semibold uppercase tracking-wide mt-0.5">{appt.specialty}</p>
          </div>
          <span className={`text-xs font-semibold px-2.5 py-1 rounded-full flex-shrink-0 ${isUpcoming ? 'bg-[var(--color-primary)]/10 text-[var(--color-primary)]' : 'bg-[var(--color-border)] text-[var(--color-text-muted)]'}`}>
            {isUpcoming ? 'Upcoming' : 'Completed'}
          </span>
        </div>
        <div className="grid grid-cols-2 gap-y-2 gap-x-4 mb-4 text-sm">
          <div className="flex items-center gap-2 text-[var(--color-text-secondary)]">
            <Calendar size={13} className="text-[var(--color-text-light)]" />
            <span>{new Date(appt.date).toLocaleDateString()}</span>
          </div>
          <div className="flex items-center gap-2 text-[var(--color-text-secondary)]">
            <Clock size={13} className="text-[var(--color-text-light)]" />
            <span>{appt.time}</span>
          </div>
          {appt.reason && (
            <div className="flex items-center gap-2 text-[var(--color-text-secondary)] col-span-2">
              <FileText size={13} className="text-[var(--color-text-light)]" />
              <span>{appt.reason}</span>
            </div>
          )}
        </div>
        {isUpcoming && (
          <div className="flex gap-2">
            <button className="flex-1 py-1.5 text-xs font-medium border border-[var(--color-border)] rounded-md text-[var(--color-text-secondary)] hover:border-[var(--color-primary)] hover:text-[var(--color-primary)] transition-colors">Reschedule</button>
            <button onClick={() => setAppointments(prev => prev.filter(a => a.id !== appt.id))} className="flex-1 py-1.5 text-xs font-medium border border-[var(--color-border)] rounded-md text-[var(--color-text-secondary)] hover:border-[var(--color-error)] hover:text-[var(--color-error)] transition-colors">Cancel</button>
          </div>
        )}
      </div>
    )
  }

  return (
    <div className="min-h-screen flex flex-col bg-[var(--color-surface)]">
      <Navbar />
      <main className="flex-1 max-w-6xl mx-auto w-full px-6 pt-24 pb-12">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="font-serif text-3xl font-medium text-[var(--color-foreground)]">Appointments</h1>
            <p className="text-[var(--color-text-muted)] mt-1">Manage your upcoming and past consultations.</p>
          </div>
          <button onClick={() => setShowModal(true)} className="flex items-center gap-2 px-4 py-2.5 bg-[var(--color-primary)] text-white text-sm font-semibold rounded-md hover:bg-[var(--color-primary-light)] transition-colors">
            <Plus size={15} /> Book Appointment
          </button>
        </div>

        <div className="mb-10">
          <h2 className="font-serif text-xl font-medium text-[var(--color-foreground)] mb-4">Upcoming ({upcoming.length})</h2>
          {upcoming.length === 0 ? (
            <p className="text-sm text-[var(--color-text-muted)] bg-white border border-[var(--color-border)] rounded-xl p-8 text-center">No upcoming appointments. Book one now.</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {upcoming.map(a => <AppointmentCard key={a.id} appt={a} />)}
            </div>
          )}
        </div>

        <div>
          <h2 className="font-serif text-xl font-medium text-[var(--color-foreground)] mb-4">Past ({past.length})</h2>
          {past.length === 0 ? (
            <p className="text-sm text-[var(--color-text-muted)] bg-white border border-[var(--color-border)] rounded-xl p-8 text-center">No past appointments.</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {past.map(a => <AppointmentCard key={a.id} appt={a} />)}
            </div>
          )}
        </div>
      </main>

      {showModal && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={() => setShowModal(false)}>
          <div className="bg-white rounded-xl p-6 w-full max-w-md shadow-xl" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-5">
              <h3 className="font-serif text-xl font-medium text-[var(--color-foreground)]">Book Appointment</h3>
              <button onClick={() => setShowModal(false)} className="text-[var(--color-text-muted)] hover:text-[var(--color-foreground)] transition-colors"><X size={18} /></button>
            </div>
            <form onSubmit={handleBook} className="space-y-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold uppercase tracking-wider text-[var(--color-text-muted)]">Doctor *</label>
                <select value={form.doctor} onChange={e => setForm(p => ({ ...p, doctor: e.target.value }))} required className="px-4 py-2.5 border border-[var(--color-border)] rounded-md text-sm focus:outline-none focus:border-[var(--color-primary)] bg-white">
                  <option value="">Select a doctor</option>
                  <option>Dr. A. Sharma</option>
                  <option>Dr. P. Gupta</option>
                  <option>Dr. R. Mehta</option>
                  <option>Dr. S. Patel</option>
                </select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold uppercase tracking-wider text-[var(--color-text-muted)]">Date *</label>
                  <input type="date" value={form.date} onChange={e => setForm(p => ({ ...p, date: e.target.value }))} required min={new Date().toISOString().split('T')[0]} className="px-4 py-2.5 border border-[var(--color-border)] rounded-md text-sm focus:outline-none focus:border-[var(--color-primary)]" />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold uppercase tracking-wider text-[var(--color-text-muted)]">Time *</label>
                  <input type="time" value={form.time} onChange={e => setForm(p => ({ ...p, time: e.target.value }))} required className="px-4 py-2.5 border border-[var(--color-border)] rounded-md text-sm focus:outline-none focus:border-[var(--color-primary)]" />
                </div>
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold uppercase tracking-wider text-[var(--color-text-muted)]">Reason</label>
                <input value={form.reason} onChange={e => setForm(p => ({ ...p, reason: e.target.value }))} className="px-4 py-2.5 border border-[var(--color-border)] rounded-md text-sm focus:outline-none focus:border-[var(--color-primary)]" placeholder="Briefly describe your concern" />
              </div>
              <div className="flex gap-3 pt-2">
                <button type="button" onClick={() => setShowModal(false)} className="flex-1 px-4 py-2.5 border border-[var(--color-border)] text-sm font-medium text-[var(--color-text-secondary)] rounded-md hover:bg-[var(--color-surface)] transition-colors">Cancel</button>
                <button type="submit" className="flex-1 px-4 py-2.5 bg-[var(--color-primary)] text-white text-sm font-semibold rounded-md hover:bg-[var(--color-primary-light)] transition-colors">Book</button>
              </div>
            </form>
          </div>
        </div>
      )}

      <Footer />
    </div>
  )
}

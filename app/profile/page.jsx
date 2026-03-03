'use client'

import { useState } from 'react'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { User, Heart, Edit2, Check, X } from 'lucide-react'

const DEFAULT = { name: 'John Doe', email: 'john@example.com', phone: '+91 98765 43210', dob: '1990-01-15', blood: 'O+', height: "5'10\"", weight: '75 kg', allergies: 'None' }

const input = 'w-full px-3 py-2.5 border border-[var(--color-border)] rounded text-sm bg-white focus:outline-none focus:border-[var(--color-primary)] transition-colors'

export default function ProfilePage() {
  const [profile, setProfile] = useState(DEFAULT)
  const [editPersonal, setEditPersonal] = useState(false)
  const [editHealth, setEditHealth] = useState(false)
  const [draft, setDraft] = useState(DEFAULT)
  const set = (k) => (e) => setDraft((p) => ({ ...p, [k]: e.target.value }))

  function savePersonal() { setProfile((p) => ({ ...p, name: draft.name, email: draft.email, phone: draft.phone, dob: draft.dob })); setEditPersonal(false) }
  function saveHealth() { setProfile((p) => ({ ...p, blood: draft.blood, height: draft.height, weight: draft.weight, allergies: draft.allergies })); setEditHealth(false) }
  function cancel() { setDraft(profile); setEditPersonal(false); setEditHealth(false) }

  function Field({ label, field, editing }) {
    return (
      <div className="flex flex-col gap-1.5">
        <span className="text-xs font-semibold uppercase tracking-wider text-[var(--color-text-muted)]">{label}</span>
        {editing
          ? <input value={draft[field]} onChange={set(field)} className={input} />
          : <span className="text-sm font-medium text-[var(--color-foreground)]">{profile[field]}</span>
        }
      </div>
    )
  }

  function CardHeader({ icon: Icon, title, editing, onEdit, onSave }) {
    return (
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-2">
          <Icon size={15} className="text-[var(--color-primary)]" />
          <h3 className="font-serif text-lg font-medium text-[var(--color-foreground)]">{title}</h3>
        </div>
        {editing ? (
          <div className="flex gap-2">
            <button onClick={onSave} className="flex items-center gap-1 px-3 py-1.5 bg-[var(--color-primary)] text-white text-xs font-medium rounded hover:bg-[var(--color-primary-light)] transition-colors"><Check size={11} /> Save</button>
            <button onClick={cancel} className="flex items-center gap-1 px-3 py-1.5 border border-[var(--color-border)] text-xs rounded text-[var(--color-text-secondary)] hover:border-[var(--color-foreground)] transition-colors"><X size={11} /> Cancel</button>
          </div>
        ) : (
          <button onClick={() => { setDraft(profile); onEdit() }} className="flex items-center gap-1.5 px-3 py-1.5 border border-[var(--color-border)] text-xs rounded text-[var(--color-text-secondary)] hover:border-[var(--color-foreground)] transition-colors">
            <Edit2 size={11} /> Edit
          </button>
        )}
      </div>
    )
  }

  return (
    <div className="min-h-screen flex flex-col bg-[var(--color-surface)]">
      <Navbar />
      <main className="flex-1 max-w-3xl mx-auto w-full px-6 pt-20 pb-16">
        <div className="py-8 border-b border-[var(--color-border)] mb-8">
          <p className="text-xs font-semibold uppercase tracking-[0.15em] text-[var(--color-primary)] mb-1">Account</p>
          <h1 className="font-serif text-3xl md:text-4xl font-light text-[var(--color-foreground)]">My Profile</h1>
        </div>

        {/* Avatar */}
        <div className="flex items-center gap-4 bg-white border border-[var(--color-border)] rounded-lg p-6 mb-5">
          <div className="w-14 h-14 rounded-full bg-[var(--color-primary)]/10 flex items-center justify-center shrink-0">
            <span className="font-serif text-2xl font-semibold text-[var(--color-primary)]">{profile.name[0]}</span>
          </div>
          <div>
            <h2 className="font-serif text-xl font-medium text-[var(--color-foreground)]">{profile.name}</h2>
            <p className="text-sm text-[var(--color-text-muted)]">{profile.email}</p>
          </div>
        </div>

        {/* Personal */}
        <div className="bg-white border border-[var(--color-border)] rounded-lg p-6 mb-5">
          <CardHeader icon={User} title="Personal Information" editing={editPersonal} onEdit={() => setEditPersonal(true)} onSave={savePersonal} />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {[['Full Name', 'name'], ['Email', 'email'], ['Phone', 'phone'], ['Date of Birth', 'dob']].map(([l, f]) => (
              <Field key={f} label={l} field={f} editing={editPersonal} />
            ))}
          </div>
        </div>

        {/* Health */}
        <div className="bg-white border border-[var(--color-border)] rounded-lg p-6">
          <CardHeader icon={Heart} title="Health Information" editing={editHealth} onEdit={() => setEditHealth(true)} onSave={saveHealth} />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {[['Blood Group', 'blood'], ['Height', 'height'], ['Weight', 'weight'], ['Allergies', 'allergies']].map(([l, f]) => (
              <Field key={f} label={l} field={f} editing={editHealth} />
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}

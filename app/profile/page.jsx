'use client'

import { useState } from 'react'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { User, Heart, Edit2, Check, X } from 'lucide-react'

const defaultProfile = {
  name: 'John Doe',
  email: 'john@example.com',
  phone: '+91 98765 43210',
  dob: '1990-01-15',
  blood: 'O+',
  height: "5'10\"",
  weight: '75 kg',
  allergies: 'None',
}

export default function ProfilePage() {
  const [profile, setProfile] = useState(defaultProfile)
  const [editPersonal, setEditPersonal] = useState(false)
  const [editHealth, setEditHealth] = useState(false)
  const [draft, setDraft] = useState(profile)

  function savePersonal() {
    setProfile(p => ({ ...p, name: draft.name, email: draft.email, phone: draft.phone, dob: draft.dob }))
    setEditPersonal(false)
  }

  function saveHealth() {
    setProfile(p => ({ ...p, blood: draft.blood, height: draft.height, weight: draft.weight, allergies: draft.allergies }))
    setEditHealth(false)
  }

  function cancelEdit() {
    setDraft(profile)
    setEditPersonal(false)
    setEditHealth(false)
  }

  function Field({ label, value, field, editing }) {
    return (
      <div className="flex flex-col gap-1">
        <span className="text-xs font-semibold uppercase tracking-wider text-[var(--color-text-muted)]">{label}</span>
        {editing ? (
          <input
            value={draft[field]}
            onChange={e => setDraft(p => ({ ...p, [field]: e.target.value }))}
            className="px-3 py-2 border border-[var(--color-border)] rounded-md text-sm focus:outline-none focus:border-[var(--color-primary)]"
          />
        ) : (
          <span className="text-sm font-medium text-[var(--color-foreground)]">{value}</span>
        )}
      </div>
    )
  }

  return (
    <div className="min-h-screen flex flex-col bg-[var(--color-surface)]">
      <Navbar />
      <main className="flex-1 max-w-3xl mx-auto w-full px-6 pt-24 pb-12">
        <div className="mb-8">
          <h1 className="font-serif text-3xl font-medium text-[var(--color-foreground)]">My Profile</h1>
          <p className="text-[var(--color-text-muted)] mt-1">Manage your personal and health information.</p>
        </div>

        {/* Avatar */}
        <div className="flex items-center gap-5 bg-white border border-[var(--color-border)] rounded-xl p-6 mb-6">
          <div className="w-16 h-16 rounded-full bg-[var(--color-primary)]/10 flex items-center justify-center flex-shrink-0">
            <User size={28} className="text-[var(--color-primary)]" />
          </div>
          <div>
            <h2 className="font-serif text-xl font-medium text-[var(--color-foreground)]">{profile.name}</h2>
            <p className="text-sm text-[var(--color-text-muted)]">{profile.email}</p>
          </div>
        </div>

        {/* Personal Info */}
        <div className="bg-white border border-[var(--color-border)] rounded-xl p-6 mb-6">
          <div className="flex items-center justify-between mb-5">
            <div className="flex items-center gap-2">
              <User size={16} className="text-[var(--color-primary)]" />
              <h3 className="font-serif text-lg font-medium text-[var(--color-foreground)]">Personal Information</h3>
            </div>
            {editPersonal ? (
              <div className="flex gap-2">
                <button onClick={savePersonal} className="flex items-center gap-1 px-3 py-1.5 bg-[var(--color-primary)] text-white text-xs font-semibold rounded-md hover:bg-[var(--color-primary-light)] transition-colors">
                  <Check size={12} /> Save
                </button>
                <button onClick={cancelEdit} className="flex items-center gap-1 px-3 py-1.5 border border-[var(--color-border)] text-xs font-medium text-[var(--color-text-secondary)] rounded-md hover:bg-[var(--color-surface)] transition-colors">
                  <X size={12} /> Cancel
                </button>
              </div>
            ) : (
              <button onClick={() => { setDraft(profile); setEditPersonal(true) }} className="flex items-center gap-1.5 px-3 py-1.5 border border-[var(--color-border)] text-xs font-medium text-[var(--color-text-secondary)] rounded-md hover:border-[var(--color-primary)] hover:text-[var(--color-primary)] transition-colors">
                <Edit2 size={12} /> Edit
              </button>
            )}
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <Field label="Full Name" value={profile.name} field="name" editing={editPersonal} />
            <Field label="Email" value={profile.email} field="email" editing={editPersonal} />
            <Field label="Phone" value={profile.phone} field="phone" editing={editPersonal} />
            <Field label="Date of Birth" value={profile.dob} field="dob" editing={editPersonal} />
          </div>
        </div>

        {/* Health Info */}
        <div className="bg-white border border-[var(--color-border)] rounded-xl p-6">
          <div className="flex items-center justify-between mb-5">
            <div className="flex items-center gap-2">
              <Heart size={16} className="text-[var(--color-primary)]" />
              <h3 className="font-serif text-lg font-medium text-[var(--color-foreground)]">Health Information</h3>
            </div>
            {editHealth ? (
              <div className="flex gap-2">
                <button onClick={saveHealth} className="flex items-center gap-1 px-3 py-1.5 bg-[var(--color-primary)] text-white text-xs font-semibold rounded-md hover:bg-[var(--color-primary-light)] transition-colors">
                  <Check size={12} /> Save
                </button>
                <button onClick={cancelEdit} className="flex items-center gap-1 px-3 py-1.5 border border-[var(--color-border)] text-xs font-medium text-[var(--color-text-secondary)] rounded-md hover:bg-[var(--color-surface)] transition-colors">
                  <X size={12} /> Cancel
                </button>
              </div>
            ) : (
              <button onClick={() => { setDraft(profile); setEditHealth(true) }} className="flex items-center gap-1.5 px-3 py-1.5 border border-[var(--color-border)] text-xs font-medium text-[var(--color-text-secondary)] rounded-md hover:border-[var(--color-primary)] hover:text-[var(--color-primary)] transition-colors">
                <Edit2 size={12} /> Edit
              </button>
            )}
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <Field label="Blood Group" value={profile.blood} field="blood" editing={editHealth} />
            <Field label="Height" value={profile.height} field="height" editing={editHealth} />
            <Field label="Weight" value={profile.weight} field="weight" editing={editHealth} />
            <Field label="Allergies" value={profile.allergies} field="allergies" editing={editHealth} />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}

'use client'

import { useState } from 'react'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { Pill, Download, RefreshCw } from 'lucide-react'

const prescriptionsData = {
  active: [
    { id: 1, medication: 'Aspirin', dosage: '100mg', frequency: 'Once daily', prescribedBy: 'Dr. A. Sharma', startDate: '2025-10-01', endDate: '2025-12-31', refillsRemaining: 2 },
    { id: 2, medication: 'Metformin', dosage: '500mg', frequency: 'Twice daily', prescribedBy: 'Dr. P. Gupta', startDate: '2025-09-15', endDate: '2026-03-15', refillsRemaining: 5 },
  ],
  completed: [
    { id: 3, medication: 'Amoxicillin', dosage: '250mg', frequency: 'Three times daily', prescribedBy: 'Dr. R. Mehta', startDate: '2025-09-01', endDate: '2025-09-14' },
  ],
}

const tabs = ['active', 'completed', 'refill']

export default function PrescriptionsPage() {
  const [activeTab, setActiveTab] = useState('active')

  const data = activeTab === 'refill'
    ? prescriptionsData.active.filter(p => p.refillsRemaining > 0)
    : prescriptionsData[activeTab] || []

  function PrescriptionCard({ rx, type }) {
    return (
      <div className="bg-white border border-[var(--color-border)] rounded-xl p-5 hover:shadow-sm transition-shadow">
        <div className="flex items-start justify-between gap-3 mb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-[var(--color-primary)]/10 flex items-center justify-center flex-shrink-0">
              <Pill size={18} className="text-[var(--color-primary)]" />
            </div>
            <div>
              <p className="font-semibold text-[var(--color-foreground)]">{rx.medication}</p>
              <p className="text-xs text-[var(--color-text-muted)] mt-0.5">{rx.prescribedBy}</p>
            </div>
          </div>
          {type === 'active' && (
            <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-[var(--color-success)]/10 text-[var(--color-success)] flex-shrink-0">Active</span>
          )}
        </div>
        <div className="grid grid-cols-2 gap-y-2 gap-x-4 mb-4 text-sm">
          {[
            { label: 'Dosage', value: rx.dosage },
            { label: 'Frequency', value: rx.frequency },
            { label: 'Start', value: new Date(rx.startDate).toLocaleDateString() },
            { label: 'End', value: new Date(rx.endDate).toLocaleDateString() },
            ...(rx.refillsRemaining !== undefined ? [{ label: 'Refills Left', value: rx.refillsRemaining }] : []),
          ].map(({ label, value }) => (
            <div key={label}>
              <p className="text-xs text-[var(--color-text-muted)] mb-0.5">{label}</p>
              <p className="font-medium text-[var(--color-foreground)]">{value}</p>
            </div>
          ))}
        </div>
        <div className="flex gap-2">
          {type === 'active' && rx.refillsRemaining > 0 && (
            <button onClick={() => alert('Refill request submitted! You will receive it within 2-3 business days.')} className="flex-1 flex items-center justify-center gap-1.5 py-1.5 text-xs font-semibold bg-[var(--color-accent)] text-[var(--color-foreground)] rounded-md hover:bg-[var(--color-accent-light)] transition-colors">
              <RefreshCw size={12} /> Request Refill
            </button>
          )}
          <button onClick={() => alert('Prescription downloaded successfully!')} className="flex-1 flex items-center justify-center gap-1.5 py-1.5 text-xs font-medium border border-[var(--color-border)] text-[var(--color-text-secondary)] rounded-md hover:border-[var(--color-primary)] hover:text-[var(--color-primary)] transition-colors">
            <Download size={12} /> Download
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex flex-col bg-[var(--color-surface)]">
      <Navbar />
      <main className="flex-1 max-w-6xl mx-auto w-full px-6 pt-24 pb-12">
        <div className="mb-8">
          <h1 className="font-serif text-3xl font-medium text-[var(--color-foreground)]">Prescriptions</h1>
          <p className="text-[var(--color-text-muted)] mt-1">View and manage your medication prescriptions.</p>
        </div>

        {/* Tabs */}
        <div className="flex gap-1 p-1 bg-white border border-[var(--color-border)] rounded-xl w-fit mb-8">
          {tabs.map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-5 py-2 text-sm font-medium rounded-lg capitalize transition-all ${
                activeTab === tab
                  ? 'bg-[var(--color-primary)] text-white shadow-sm'
                  : 'text-[var(--color-text-secondary)] hover:text-[var(--color-foreground)]'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {data.length === 0 ? (
          <p className="text-sm text-[var(--color-text-muted)] bg-white border border-[var(--color-border)] rounded-xl p-10 text-center">No prescriptions found.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {data.map(rx => <PrescriptionCard key={rx.id} rx={rx} type={activeTab} />)}
          </div>
        )}
      </main>
      <Footer />
    </div>
  )
}

'use client'

import { useState } from 'react'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { Pill, Download, RefreshCw } from 'lucide-react'

const DATA = {
  active: [
    { id: 1, med: 'Aspirin', dose: '100mg', freq: 'Once daily', by: 'Dr. A. Sharma', start: '2025-10-01', end: '2025-12-31', refills: 2 },
    { id: 2, med: 'Metformin', dose: '500mg', freq: 'Twice daily', by: 'Dr. P. Gupta', start: '2025-09-15', end: '2026-03-15', refills: 5 },
  ],
  completed: [
    { id: 3, med: 'Amoxicillin', dose: '250mg', freq: 'Three times daily', by: 'Dr. R. Mehta', start: '2025-09-01', end: '2025-09-14', refills: 0 },
  ],
}
const TABS = ['active', 'completed', 'refill']

function fmt(d) { return new Date(d).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }) }

export default function PrescriptionsPage() {
  const [tab, setTab] = useState('active')
  const list = tab === 'refill' ? DATA.active.filter((p) => p.refills > 0) : DATA[tab] || []

  return (
    <div className="min-h-screen flex flex-col bg-[var(--color-surface)]">
      <Navbar />
      <main className="flex-1 max-w-6xl mx-auto w-full px-6 pt-20 pb-16">
        <div className="py-8 border-b border-[var(--color-border)] mb-8">
          <p className="text-xs font-semibold uppercase tracking-[0.15em] text-[var(--color-primary)] mb-1">Medications</p>
          <h1 className="font-serif text-3xl md:text-4xl font-light text-[var(--color-foreground)]">Prescriptions</h1>
        </div>

        <div className="flex gap-1 p-1 bg-white border border-[var(--color-border)] rounded-lg w-fit mb-8">
          {TABS.map((t) => (
            <button key={t} onClick={() => setTab(t)}
              className={`px-5 py-2 text-sm capitalize rounded-md transition-all ${tab === t ? 'bg-[var(--color-primary)] text-white font-medium' : 'text-[var(--color-text-muted)] hover:text-[var(--color-foreground)]'}`}>
              {t}
            </button>
          ))}
        </div>

        {list.length === 0
          ? <p className="text-sm text-[var(--color-text-muted)] bg-white border border-[var(--color-border)] rounded-lg p-10 text-center">No prescriptions found.</p>
          : <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {list.map((rx) => (
              <div key={rx.id} className="bg-white border border-[var(--color-border)] rounded-lg p-5 hover:shadow-sm transition-shadow">
                <div className="flex items-start gap-3 mb-4">
                  <div className="w-9 h-9 rounded-md bg-[var(--color-primary)]/10 flex items-center justify-center shrink-0">
                    <Pill size={16} className="text-[var(--color-primary)]" />
                  </div>
                  <div>
                    <p className="font-semibold text-[var(--color-foreground)] text-sm">{rx.med}</p>
                    <p className="text-xs text-[var(--color-text-muted)] mt-0.5">{rx.by}</p>
                  </div>
                  {tab === 'active' && <span className="ml-auto text-xs font-medium px-2 py-0.5 rounded-full bg-[var(--color-success)]/10 text-[var(--color-success)] shrink-0">Active</span>}
                </div>
                <div className="grid grid-cols-2 gap-y-3 mb-4">
                  {[['Dosage', rx.dose], ['Frequency', rx.freq], ['Start', fmt(rx.start)], ['End', fmt(rx.end)], ...(rx.refills != null ? [['Refills Left', rx.refills]] : [])].map(([l, v]) => (
                    <div key={l}>
                      <p className="text-xs text-[var(--color-text-muted)] mb-0.5">{l}</p>
                      <p className="text-sm font-medium text-[var(--color-foreground)]">{v}</p>
                    </div>
                  ))}
                </div>
                <div className="flex gap-2">
                  {tab === 'active' && rx.refills > 0 && (
                    <button onClick={() => alert('Refill requested!')} className="flex-1 flex items-center justify-center gap-1.5 py-2 text-xs font-medium bg-[var(--color-accent)] text-[var(--color-foreground)] rounded hover:bg-[var(--color-accent-light)] transition-colors">
                      <RefreshCw size={11} /> Refill
                    </button>
                  )}
                  <button onClick={() => alert('Downloaded!')} className="flex-1 flex items-center justify-center gap-1.5 py-2 text-xs border border-[var(--color-border)] rounded text-[var(--color-text-secondary)] hover:border-[var(--color-foreground)] transition-colors">
                    <Download size={11} /> Download
                  </button>
                </div>
              </div>
            ))}
          </div>
        }
      </main>
      <Footer />
    </div>
  )
}

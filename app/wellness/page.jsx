'use client'

import { useState, useMemo } from 'react'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { Search } from 'lucide-react'

const ARTICLES = [
  { id: 1, title: '10 Tips for Better Sleep', cat: 'Sleep', excerpt: 'Proven techniques to improve your sleep quality and wake up refreshed every morning.', read: '5 min' },
  { id: 2, title: 'Healthy Eating Habits', cat: 'Nutrition', excerpt: 'Balanced nutrition and how to make healthier food choices for long-term wellness.', read: '7 min' },
  { id: 3, title: 'Daily Exercise Routine', cat: 'Fitness', excerpt: 'Simple exercises you can do at home to stay fit and energised throughout the day.', read: '6 min' },
  { id: 4, title: 'Stress Management Techniques', cat: 'Stress', excerpt: 'Effective ways to manage stress and improve your mental wellbeing with daily practice.', read: '8 min' },
  { id: 5, title: 'Mental Health Awareness', cat: 'Mental Health', excerpt: 'Understanding mental health and when to seek professional help — a comprehensive guide.', read: '10 min' },
  { id: 6, title: 'Hydration and Health', cat: 'Nutrition', excerpt: 'Why staying hydrated is crucial for your overall health and how much water you really need.', read: '4 min' },
]
const CATS = ['All', 'Nutrition', 'Fitness', 'Mental Health', 'Sleep', 'Stress']

export default function WellnessPage() {
  const [search, setSearch] = useState('')
  const [cat, setCat] = useState('All')

  const filtered = useMemo(() =>
    ARTICLES.filter((a) =>
      (cat === 'All' || a.cat === cat) &&
      (a.title.toLowerCase().includes(search.toLowerCase()) || a.excerpt.toLowerCase().includes(search.toLowerCase()))
    ), [search, cat])

  return (
    <div className="min-h-screen flex flex-col bg-[var(--color-surface)]">
      <Navbar />
      <main className="flex-1 max-w-6xl mx-auto w-full px-6 pt-20 pb-16">
        <div className="py-8 border-b border-[var(--color-border)] mb-8">
          <p className="text-xs font-semibold uppercase tracking-[0.15em] text-[var(--color-primary)] mb-1">Health Resources</p>
          <h1 className="font-serif text-3xl md:text-4xl font-light text-[var(--color-foreground)]">Wellness Tips</h1>
        </div>

        {/* Search + Filter */}
        <div className="flex flex-col sm:flex-row gap-3 mb-8">
          <div className="relative flex-1">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--color-text-light)]" />
            <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search articles..."
              className="w-full pl-9 pr-4 py-2.5 border border-[var(--color-border)] rounded text-sm bg-white focus:outline-none focus:border-[var(--color-primary)] transition-colors" />
          </div>
          <div className="flex gap-1 flex-wrap">
            {CATS.map((c) => (
              <button key={c} onClick={() => setCat(c)}
                className={`px-3 py-2 text-xs font-medium rounded transition-colors ${cat === c ? 'bg-[var(--color-primary)] text-white' : 'bg-white border border-[var(--color-border)] text-[var(--color-text-muted)] hover:border-[var(--color-foreground)]'}`}>
                {c}
              </button>
            ))}
          </div>
        </div>

        {filtered.length === 0
          ? <p className="text-sm text-[var(--color-text-muted)] bg-white border border-[var(--color-border)] rounded-lg p-10 text-center">No articles found. Try a different search.</p>
          : <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filtered.map((a) => (
              <div key={a.id} className="bg-white border border-[var(--color-border)] rounded-lg p-6 flex flex-col gap-3 hover:shadow-sm transition-shadow group">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold uppercase tracking-wide text-[var(--color-primary)]">{a.cat}</span>
                  <span className="text-xs text-[var(--color-text-light)]">{a.read} read</span>
                </div>
                <h3 className="font-serif text-lg font-medium text-[var(--color-foreground)] leading-snug">{a.title}</h3>
                <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed flex-1 text-pretty">{a.excerpt}</p>
                <button className="self-start text-xs font-semibold uppercase tracking-wider text-[var(--color-primary)] group-hover:text-[var(--color-primary-light)] transition-colors">
                  Read More &rarr;
                </button>
              </div>
            ))}
          </div>
        }
      </main>
      <Footer />
    </div>
  )
}

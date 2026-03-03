'use client'

import { useState, useMemo } from 'react'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { Search } from 'lucide-react'

const articles = [
  { id: 1, title: '10 Tips for Better Sleep', category: 'sleep', excerpt: 'Discover proven techniques to improve your sleep quality and wake up refreshed every morning.', readTime: '5 min' },
  { id: 2, title: 'Healthy Eating Habits', category: 'nutrition', excerpt: 'Learn about balanced nutrition and how to make healthier food choices for long-term wellness.', readTime: '7 min' },
  { id: 3, title: 'Daily Exercise Routine', category: 'fitness', excerpt: 'Simple exercises you can do at home to stay fit, active, and energised throughout the day.', readTime: '6 min' },
  { id: 4, title: 'Stress Management Techniques', category: 'stress', excerpt: 'Effective ways to manage stress and improve your mental wellbeing with daily practice.', readTime: '8 min' },
  { id: 5, title: 'Mental Health Awareness', category: 'mental-health', excerpt: 'Understanding mental health and when to seek professional help — a comprehensive guide.', readTime: '10 min' },
  { id: 6, title: 'Hydration and Health', category: 'nutrition', excerpt: 'Why staying hydrated is crucial for your overall health and how much water you really need.', readTime: '4 min' },
]

const categoryColors = {
  sleep: 'bg-blue-50 text-blue-700',
  nutrition: 'bg-green-50 text-green-700',
  fitness: 'bg-orange-50 text-orange-700',
  stress: 'bg-purple-50 text-purple-700',
  'mental-health': 'bg-pink-50 text-pink-700',
}

const categories = ['', 'nutrition', 'fitness', 'mental-health', 'sleep', 'stress']

export default function WellnessPage() {
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('')

  const filtered = useMemo(() => articles.filter(a => {
    const matchSearch = a.title.toLowerCase().includes(search.toLowerCase()) || a.excerpt.toLowerCase().includes(search.toLowerCase())
    const matchCat = !category || a.category === category
    return matchSearch && matchCat
  }), [search, category])

  return (
    <div className="min-h-screen flex flex-col bg-[var(--color-surface)]">
      <Navbar />
      <main className="flex-1 max-w-5xl mx-auto w-full px-6 pt-24 pb-12">
        <div className="text-center mb-10">
          <h1 className="font-serif text-4xl font-light text-[var(--color-foreground)] mb-3 text-balance">
            Wellness <em className="italic text-[var(--color-primary)]">Tips & Blog</em>
          </h1>
          <p className="text-[var(--color-text-secondary)] font-light">Daily health tips and wellness articles to improve your lifestyle</p>
        </div>

        {/* Search & Filter */}
        <div className="flex flex-col sm:flex-row gap-3 mb-8">
          <div className="relative flex-1">
            <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--color-text-light)]" />
            <input
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search wellness tips..."
              className="w-full pl-9 pr-4 py-2.5 border border-[var(--color-border)] rounded-md text-sm focus:outline-none focus:border-[var(--color-primary)] bg-white"
            />
          </div>
          <select
            value={category}
            onChange={e => setCategory(e.target.value)}
            className="px-4 py-2.5 border border-[var(--color-border)] rounded-md text-sm focus:outline-none focus:border-[var(--color-primary)] bg-white"
          >
            <option value="">All Categories</option>
            <option value="nutrition">Nutrition</option>
            <option value="fitness">Fitness</option>
            <option value="mental-health">Mental Health</option>
            <option value="sleep">Sleep</option>
            <option value="stress">Stress Management</option>
          </select>
        </div>

        {filtered.length === 0 ? (
          <p className="text-sm text-[var(--color-text-muted)] bg-white border border-[var(--color-border)] rounded-xl p-10 text-center">No wellness tips found. Try a different search.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {filtered.map(article => (
              <div key={article.id} className="bg-white border border-[var(--color-border)] rounded-xl p-6 hover:shadow-md transition-all duration-300 hover:-translate-y-0.5 flex flex-col gap-3">
                <div className="flex items-center justify-between">
                  <span className={`text-xs font-semibold uppercase tracking-wider px-2.5 py-1 rounded-full capitalize ${categoryColors[article.category] || 'bg-gray-50 text-gray-700'}`}>
                    {article.category.replace('-', ' ')}
                  </span>
                  <span className="text-xs text-[var(--color-text-light)]">{article.readTime} read</span>
                </div>
                <h3 className="font-serif text-lg font-medium text-[var(--color-foreground)] leading-snug">{article.title}</h3>
                <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed font-light flex-1">{article.excerpt}</p>
                <button className="self-start text-xs font-semibold uppercase tracking-widest text-[var(--color-primary)] hover:text-[var(--color-primary-light)] transition-colors mt-1">
                  Read More
                </button>
              </div>
            ))}
          </div>
        )}
      </main>
      <Footer />
    </div>
  )
}

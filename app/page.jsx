import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import Link from 'next/link'
import Image from 'next/image'

const SPECIALTIES = [
  { title: 'Cardiology', sub: 'Heart & Vascular', desc: 'World-class cardiac care from diagnosis to treatment with board-certified interventional specialists.', img: '/images/cardiology.jpeg' },
  { title: 'Neurology', sub: 'Brain & Spine', desc: 'Advanced care for disorders of the brain and nervous system using the latest diagnostics.', img: '/images/neurology.jpg' },
  { title: 'Orthopaedics', sub: 'Bones & Joints', desc: 'Expert care for musculoskeletal conditions, from sports injuries to complex joint replacements.', img: '/images/ortho.jpg' },
  { title: 'Paediatrics', sub: "Children's Health", desc: 'Compassionate, specialised care for children from newborns through adolescence.', img: '/images/pediatrics.jpeg' },
]

const DOCTORS = [
  { name: 'Dr. A. Sharma', spec: 'Cardiology', bio: '15+ years of cardiac excellence. Board-certified interventional cardiologist.' },
  { name: 'Dr. P. Gupta', spec: 'Neurology', bio: 'Pioneer in minimally invasive neurosurgery with a global patient base.' },
  { name: 'Dr. R. Mehta', spec: 'Orthopaedics', bio: 'Sports medicine expert and joint replacement specialist.' },
]

const STATS = [
  { value: '20+', label: 'Years of care' },
  { value: '50k+', label: 'Patients treated' },
  { value: '98%', label: 'Satisfaction rate' },
  { value: '40+', label: 'Specialists' },
]

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      {/* Hero */}
      <section id="home" className="min-h-screen flex items-center pt-14 bg-[var(--color-background)]">
        <div className="max-w-6xl mx-auto px-6 w-full py-24 grid md:grid-cols-2 gap-16 items-center">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--color-primary)] mb-5">Zenith Healthcare</p>
            <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl font-light leading-[1.1] text-[var(--color-foreground)] text-balance mb-6">
              Care that puts <em className="italic">you</em> first.
            </h1>
            <p className="text-base text-[var(--color-text-secondary)] leading-relaxed max-w-md mb-10 text-pretty">
              Manage your appointments, prescriptions, and wellness journey — all in one seamlessly designed experience built around your health.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link href="/#contact" className="px-6 py-3 bg-[var(--color-primary)] text-white text-sm font-medium rounded hover:bg-[var(--color-primary-light)] transition-colors">
                Book Appointment
              </Link>
              <Link href="/dashboard" className="px-6 py-3 border border-[var(--color-border)] text-sm font-medium text-[var(--color-text-secondary)] rounded hover:border-[var(--color-foreground)] hover:text-[var(--color-foreground)] transition-colors">
                Go to Dashboard
              </Link>
            </div>
          </div>
          <div className="hidden md:grid grid-cols-2 gap-3">
            <div className="rounded-lg overflow-hidden aspect-[3/4]">
              <Image src="/images/cardiology.jpeg" alt="Cardiology" width={300} height={400} className="object-cover w-full h-full" />
            </div>
            <div className="rounded-lg overflow-hidden aspect-[3/4] mt-8">
              <Image src="/images/neurology.jpg" alt="Neurology" width={300} height={400} className="object-cover w-full h-full" />
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="border-y border-[var(--color-border)] bg-[var(--color-surface)]">
        <div className="max-w-6xl mx-auto px-6 py-10 grid grid-cols-2 md:grid-cols-4 gap-8">
          {STATS.map(({ value, label }) => (
            <div key={label} className="text-center">
              <p className="font-serif text-4xl font-light text-[var(--color-foreground)]">{value}</p>
              <p className="text-sm text-[var(--color-text-muted)] mt-1">{label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Services */}
      <section id="services" className="py-24 bg-[var(--color-background)]">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex items-end justify-between mb-14 gap-6">
            <h2 className="font-serif text-4xl md:text-5xl font-light text-[var(--color-foreground)] text-balance leading-tight">
              Our <em className="italic text-[var(--color-primary)]">specialities</em>
            </h2>
            <p className="text-sm text-[var(--color-text-muted)] max-w-xs text-right hidden md:block text-pretty">
              Expert departments staffed by world-class physicians dedicated to exceptional outcomes.
            </p>
          </div>
          <div className="divide-y divide-[var(--color-border)]">
            {SPECIALTIES.map((s, i) => (
              <div key={s.title} className="py-8 grid grid-cols-1 md:grid-cols-[1fr_180px] gap-6 md:gap-12 items-center group">
                <div className="flex items-start gap-6">
                  <span className="text-xs text-[var(--color-text-light)] font-mono mt-1 shrink-0">0{i + 1}</span>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.15em] text-[var(--color-primary)] mb-1">{s.sub}</p>
                    <h3 className="font-serif text-2xl font-medium text-[var(--color-foreground)] mb-2">{s.title}</h3>
                    <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed max-w-xl text-pretty">{s.desc}</p>
                  </div>
                </div>
                <div className="w-full h-28 md:h-24 rounded-md overflow-hidden shrink-0">
                  <Image src={s.img} alt={s.title} width={180} height={96} className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Doctors */}
      <section id="doctors" className="py-24 bg-[var(--color-surface)]">
        <div className="max-w-6xl mx-auto px-6">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--color-primary)] mb-4">Our team</p>
          <h2 className="font-serif text-4xl md:text-5xl font-light text-[var(--color-foreground)] mb-14 text-balance">
            Meet the <em className="italic">specialists</em>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-[var(--color-border)]">
            {DOCTORS.map((d) => (
              <div key={d.name} className="bg-[var(--color-surface)] p-8 hover:bg-[var(--color-surface-2)] transition-colors">
                <div className="w-12 h-12 rounded-full bg-[var(--color-primary)]/10 flex items-center justify-center mb-5">
                  <span className="font-serif text-lg font-semibold text-[var(--color-primary)]">{d.name.split(' ')[1][0]}</span>
                </div>
                <p className="text-xs font-semibold uppercase tracking-[0.15em] text-[var(--color-primary)] mb-1">{d.spec}</p>
                <h3 className="font-serif text-xl font-medium text-[var(--color-foreground)] mb-2">{d.name}</h3>
                <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed">{d.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Wellness */}
      <section id="wellness" className="py-24 bg-[var(--color-background)]">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--color-primary)] mb-4">Wellness Hub</p>
              <h2 className="font-serif text-4xl md:text-5xl font-light text-[var(--color-foreground)] mb-5 text-balance leading-tight">
                Live <em className="italic">healthier,</em><br />every day.
              </h2>
              <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed mb-6 max-w-sm text-pretty">
                Access expert articles, nutrition guides, mental health resources, and fitness routines curated by our specialists.
              </p>
              <Link href="/wellness" className="inline-flex items-center gap-2 text-sm font-medium text-[var(--color-primary)] hover:text-[var(--color-primary-light)] transition-colors">
                Explore wellness &rarr;
              </Link>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {[
                { title: 'Nutrition Guide', img: '/images/wellness.jpg' },
                { title: 'Mental Wellbeing', img: '/images/tech.jpg' },
                { title: 'Fitness & Exercise', img: '/images/ortho.jpg' },
                { title: 'Better Sleep', img: '/images/neurology.jpg' },
              ].map((w) => (
                <Link href="/wellness" key={w.title} className="group relative rounded-md overflow-hidden aspect-square block">
                  <Image src={w.img} alt={w.title} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-colors" />
                  <p className="absolute bottom-3 left-3 right-3 text-xs font-semibold text-white">{w.title}</p>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="py-24 bg-[var(--color-surface)]">
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-start">
          <div className="md:sticky md:top-24">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--color-primary)] mb-4">Get in touch</p>
            <h2 className="font-serif text-4xl md:text-5xl font-light text-[var(--color-foreground)] mb-5 text-balance leading-tight">
              Book an <em className="italic">appointment</em>
            </h2>
            <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed max-w-sm text-pretty">
              Fill in the form and our team will contact you within 24 hours to confirm your appointment.
            </p>
          </div>
          <form action="/thank-you" method="GET" className="space-y-4">
            {[
              { id: 'name', label: 'Full Name', type: 'text', placeholder: 'John Doe' },
              { id: 'email', label: 'Email', type: 'email', placeholder: 'john@example.com' },
              { id: 'phone', label: 'Phone', type: 'tel', placeholder: '+91 98765 43210' },
            ].map(({ id, label, type, placeholder }) => (
              <div key={id} className="flex flex-col gap-1.5">
                <label htmlFor={id} className="text-xs font-semibold uppercase tracking-wider text-[var(--color-text-muted)]">{label}</label>
                <input id={id} type={type} placeholder={placeholder} className="px-4 py-3 border border-[var(--color-border)] rounded text-sm bg-white focus:outline-none focus:border-[var(--color-primary)] transition-colors" />
              </div>
            ))}
            <div className="flex flex-col gap-1.5">
              <label htmlFor="dept" className="text-xs font-semibold uppercase tracking-wider text-[var(--color-text-muted)]">Department</label>
              <select id="dept" className="px-4 py-3 border border-[var(--color-border)] rounded text-sm bg-white focus:outline-none focus:border-[var(--color-primary)] transition-colors">
                <option value="">Select department</option>
                <option>Cardiology</option>
                <option>Neurology</option>
                <option>Orthopaedics</option>
                <option>Paediatrics</option>
              </select>
            </div>
            <div className="flex flex-col gap-1.5">
              <label htmlFor="message" className="text-xs font-semibold uppercase tracking-wider text-[var(--color-text-muted)]">Message</label>
              <textarea id="message" rows={3} placeholder="Briefly describe your concern..." className="px-4 py-3 border border-[var(--color-border)] rounded text-sm bg-white focus:outline-none focus:border-[var(--color-primary)] transition-colors resize-none" />
            </div>
            <button type="submit" className="w-full py-3 bg-[var(--color-primary)] text-white text-sm font-medium rounded hover:bg-[var(--color-primary-light)] transition-colors">
              Submit Request
            </button>
          </form>
        </div>
      </section>

      <Footer />
    </div>
  )
}

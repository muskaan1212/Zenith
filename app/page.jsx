import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import Link from 'next/link'
import Image from 'next/image'

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      {/* Hero */}
      <section id="home" className="relative min-h-screen flex items-center justify-center pt-16">
        <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-surface)] to-[var(--color-surface-2)]" />
        <div className="absolute inset-0 opacity-30">
          <div className="w-full h-full" style={{ backgroundImage: 'radial-gradient(circle at 20% 50%, rgba(44,85,48,0.12) 0%, transparent 60%), radial-gradient(circle at 80% 20%, rgba(201,169,110,0.1) 0%, transparent 50%)' }} />
        </div>
        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
          <p className="text-xs font-semibold uppercase tracking-widest text-[var(--color-primary)] mb-4">Your Health Companion</p>
          <h1 className="font-serif text-5xl md:text-7xl font-light text-[var(--color-foreground)] mb-6 leading-tight text-balance">
            Healthcare, <em className="italic text-[var(--color-primary)]">elevated</em><br />for your wellbeing
          </h1>
          <p className="text-lg text-[var(--color-text-secondary)] mb-10 max-w-xl mx-auto font-light leading-relaxed text-pretty">
            Manage your appointments, prescriptions, and wellness journey in one seamless, beautifully designed experience.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/#contact" className="px-8 py-3 bg-[var(--color-accent)] text-[var(--color-foreground)] font-semibold rounded-md hover:bg-[var(--color-accent-light)] transition-all hover:-translate-y-0.5 shadow-md">
              Book Appointment
            </Link>
            <Link href="/dashboard" className="px-8 py-3 border border-[var(--color-border)] text-[var(--color-text-secondary)] font-medium rounded-md hover:border-[var(--color-primary)] hover:text-[var(--color-primary)] transition-all hover:-translate-y-0.5">
              Go to Dashboard
            </Link>
          </div>
          <p className="mt-12 text-xs text-[var(--color-text-light)] uppercase tracking-widest">Scroll to explore</p>
        </div>
      </section>

      {/* Services */}
      <section id="services" className="py-24 bg-[var(--color-surface)]">
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="font-serif text-4xl md:text-5xl font-light text-center text-[var(--color-foreground)] mb-16 text-balance">
            Our <em className="italic text-[var(--color-primary)]">specialities</em>
          </h2>
          <div className="space-y-10">
            {[
              { title: 'Cardiology', location: 'Heart & Vascular', desc: 'Comprehensive cardiac care from diagnosis to treatment, with world-class specialists dedicated to your heart health.', img: '/images/cardiology.jpeg' },
              { title: 'Neurology', location: 'Brain & Spine', desc: 'Advanced neurological care for disorders of the brain and nervous system, using cutting-edge diagnostics.', img: '/images/neurology.jpg' },
              { title: 'Orthopaedics', location: 'Bones & Joints', desc: 'Expert care for musculoskeletal conditions, from sports injuries to joint replacements.', img: '/images/ortho.jpg' },
              { title: 'Paediatrics', location: "Children's Health", desc: 'Compassionate and specialised care for children from birth through adolescence.', img: '/images/pediatrics.jpeg' },
            ].map((s) => (
              <div key={s.title} className="grid grid-cols-1 md:grid-cols-[200px_1fr] gap-6 md:gap-10 items-center py-8 border-b border-[var(--color-border)] last:border-0 group">
                <div className="w-full md:w-[200px] h-[140px] rounded-md overflow-hidden flex-shrink-0">
                  <Image src={s.img} alt={s.title} width={200} height={140} className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500" />
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-widest text-[var(--color-primary)] mb-1">{s.location}</p>
                  <h3 className="font-serif text-2xl font-medium text-[var(--color-foreground)] mb-2">{s.title}</h3>
                  <p className="text-[var(--color-text-secondary)] font-light leading-relaxed text-pretty">{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Doctors */}
      <section id="doctors" className="py-24 bg-[var(--color-background)]">
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="font-serif text-4xl md:text-5xl font-light text-center text-[var(--color-foreground)] mb-16 text-balance">
            Meet our <em className="italic text-[var(--color-primary)]">specialists</em>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { name: 'Dr. A. Sharma', specialty: 'Cardiology', bio: '15+ years of cardiac excellence. Board-certified interventional cardiologist.', img: '/images/placeholder-user.jpg' },
              { name: 'Dr. P. Gupta', specialty: 'Neurology', bio: 'Pioneer in minimally invasive neurosurgery with a global patient base.', img: '/images/placeholder-user.jpg' },
              { name: 'Dr. R. Mehta', specialty: 'Orthopaedics', bio: 'Sports medicine expert and joint replacement specialist with 12 years experience.', img: '/images/placeholder-user.jpg' },
            ].map((d) => (
              <div key={d.name} className="text-center p-6 rounded-xl hover:bg-[var(--color-surface)] hover:shadow-md transition-all duration-300 hover:-translate-y-2">
                <div className="w-28 h-28 rounded-full overflow-hidden mx-auto mb-4 border-4 border-[var(--color-border)]">
                  <Image src={d.img} alt={d.name} width={112} height={112} className="object-cover w-full h-full" />
                </div>
                <p className="text-xs font-semibold uppercase tracking-widest text-[var(--color-primary)] mb-1">{d.specialty}</p>
                <h3 className="font-serif text-xl font-medium text-[var(--color-foreground)] mb-2">{d.name}</h3>
                <p className="text-sm text-[var(--color-text-secondary)] font-light leading-relaxed">{d.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Wellness preview */}
      <section id="wellness" className="py-24 bg-[var(--color-surface)]">
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="font-serif text-4xl md:text-5xl font-light text-center text-[var(--color-foreground)] mb-4 text-balance">
            Wellness <em className="italic text-[var(--color-primary)]">resources</em>
          </h2>
          <p className="text-center text-[var(--color-text-secondary)] mb-12 font-light">Expert guidance for a healthier lifestyle</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { title: 'Nutrition Guide', desc: 'Balanced eating habits for long-term health.', img: '/images/wellness.jpg' },
              { title: 'Mental Wellbeing', desc: 'Stress management and mindfulness techniques.', img: '/images/tech.jpg' },
              { title: 'Fitness & Exercise', desc: 'Home workouts and daily movement routines.', img: '/images/placeholder.jpg' },
            ].map((w) => (
              <div key={w.title} className="rounded-xl overflow-hidden bg-[var(--color-background)] shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1">
                <div className="h-44 overflow-hidden">
                  <Image src={w.img} alt={w.title} width={400} height={176} className="object-cover w-full h-full hover:scale-105 transition-transform duration-500" />
                </div>
                <div className="p-5">
                  <h3 className="font-serif text-lg font-medium text-[var(--color-foreground)] mb-1">{w.title}</h3>
                  <p className="text-sm text-[var(--color-text-secondary)] font-light mb-3">{w.desc}</p>
                  <Link href="/wellness" className="text-xs font-semibold uppercase tracking-widest text-[var(--color-primary)] hover:text-[var(--color-primary-light)] transition-colors">Read More</Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact / Book */}
      <section id="contact" className="py-24 bg-[var(--color-background)]">
        <div className="max-w-2xl mx-auto px-6">
          <h2 className="font-serif text-4xl md:text-5xl font-light text-center text-[var(--color-foreground)] mb-4 text-balance">
            Book an <em className="italic text-[var(--color-primary)]">appointment</em>
          </h2>
          <p className="text-center text-[var(--color-text-secondary)] mb-10 font-light">Fill the form below and our team will contact you within 24 hours.</p>
          <form action="/appointments" method="GET" className="space-y-5 bg-[var(--color-surface)] border border-[var(--color-border)] rounded-xl p-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div className="flex flex-col gap-1.5">
                <label htmlFor="name" className="text-xs font-semibold uppercase tracking-wider text-[var(--color-text-muted)]">Full Name</label>
                <input id="name" type="text" placeholder="John Doe" className="px-4 py-2.5 border border-[var(--color-border)] rounded-md text-sm focus:outline-none focus:border-[var(--color-primary)] bg-white transition-colors" />
              </div>
              <div className="flex flex-col gap-1.5">
                <label htmlFor="email" className="text-xs font-semibold uppercase tracking-wider text-[var(--color-text-muted)]">Email</label>
                <input id="email" type="email" placeholder="john@example.com" className="px-4 py-2.5 border border-[var(--color-border)] rounded-md text-sm focus:outline-none focus:border-[var(--color-primary)] bg-white transition-colors" />
              </div>
              <div className="flex flex-col gap-1.5">
                <label htmlFor="phone" className="text-xs font-semibold uppercase tracking-wider text-[var(--color-text-muted)]">Phone</label>
                <input id="phone" type="tel" placeholder="+91 98765 43210" className="px-4 py-2.5 border border-[var(--color-border)] rounded-md text-sm focus:outline-none focus:border-[var(--color-primary)] bg-white transition-colors" />
              </div>
              <div className="flex flex-col gap-1.5">
                <label htmlFor="dept" className="text-xs font-semibold uppercase tracking-wider text-[var(--color-text-muted)]">Department</label>
                <select id="dept" className="px-4 py-2.5 border border-[var(--color-border)] rounded-md text-sm focus:outline-none focus:border-[var(--color-primary)] bg-white transition-colors">
                  <option value="">Select department</option>
                  <option>Cardiology</option>
                  <option>Neurology</option>
                  <option>Orthopaedics</option>
                  <option>Paediatrics</option>
                </select>
              </div>
            </div>
            <div className="flex flex-col gap-1.5">
              <label htmlFor="message" className="text-xs font-semibold uppercase tracking-wider text-[var(--color-text-muted)]">Message</label>
              <textarea id="message" rows={3} placeholder="Briefly describe your concern..." className="px-4 py-2.5 border border-[var(--color-border)] rounded-md text-sm focus:outline-none focus:border-[var(--color-primary)] bg-white transition-colors resize-none" />
            </div>
            <div className="text-center pt-2">
              <Link href="/thank-you" className="inline-block px-8 py-3 bg-[var(--color-accent)] text-[var(--color-foreground)] font-semibold rounded-md hover:bg-[var(--color-accent-light)] transition-all hover:-translate-y-0.5 shadow-sm">
                Submit Request
              </Link>
            </div>
          </form>
        </div>
      </section>

      <Footer />
    </div>
  )
}

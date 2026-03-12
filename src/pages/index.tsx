import Head from 'next/head'
import Link from 'next/link'
import Image from 'next/image'
import {
  Calendar,
  CreditCard,
  Users,
  BarChart3,
  Bell,
  Zap,
  ArrowRight,
  Check,
  Star,
  PlayCircle,
  ShoppingBag,
  Sparkles,
} from 'lucide-react'

const FEATURES = [
  {
    icon: Calendar,
    color: 'from-primary-500 to-violet-600',
    title: 'Smart Booking Calendar',
    desc: 'Drag-and-drop bookings across day, week, and month views. Conflict detection built in.',
  },
  {
    icon: CreditCard,
    color: 'from-mint-500 to-primary-500',
    title: 'Stripe Payments & Deposits',
    desc: 'Collect deposits automatically, issue refunds, and manage invoices — all from one place.',
  },
  {
    icon: Users,
    color: 'from-violet-500 to-primary-500',
    title: 'Client CRM',
    desc: 'Full client profiles with booking history, session notes, and total lifetime spend.',
  },
  {
    icon: BarChart3,
    color: 'from-orange-500 to-violet-500',
    title: 'Operational Analytics',
    desc: 'Revenue trends, room utilization heatmaps, peak booking hours, and top clients.',
  },
  {
    icon: Bell,
    color: 'from-mint-400 to-mint-600',
    title: 'Automated Reminders',
    desc: 'Zero no-shows. Clients get confirmation emails, 24h reminders, and cancellation notices.',
  },
  {
    icon: Sparkles,
    color: 'from-orange-400 to-orange-600',
    title: 'AI Session Predictor',
    desc: 'Predict session duration based on genre, artist type, and historical data to optimize scheduling.',
  },
  {
    icon: ShoppingBag,
    color: 'from-violet-400 to-violet-600',
    title: 'Studio Marketplace',
    desc: 'List your studio publicly. Artists discover and book you directly from the marketplace.',
  },
  {
    icon: Zap,
    color: 'from-primary-400 to-primary-600',
    title: 'Instant Confirmations',
    desc: 'Eliminate back-and-forth. Clients see live availability and book in under 20 seconds.',
  },
]

const STATS = [
  { value: '80%', label: 'Less Admin Time' },
  { value: '60%', label: 'Fewer No-Shows' },
  { value: '3×', label: 'More Bookings' },
  { value: '99%', label: 'Uptime SLA' },
]

const WORKFLOW = [
  {
    num: '01',
    title: 'Open Dashboard',
    desc: 'Studio manager sees all bookings, revenue, and availability at a glance.',
  },
  {
    num: '02',
    title: 'Client Books Online',
    desc: 'Clients visit your public booking page, choose a room, and pick a time slot.',
  },
  {
    num: '03',
    title: 'Deposit Collected',
    desc: 'Stripe automatically charges the deposit. No invoice chasing needed.',
  },
  {
    num: '04',
    title: 'Reminders Sent',
    desc: '24-hour automated reminders keep clients on track.',
  },
  {
    num: '05',
    title: 'Session Logged',
    desc: 'Session notes, recordings, and client feedback all stored in one place.',
  },
  {
    num: '06',
    title: 'Analytics Updated',
    desc: 'Revenue and utilization metrics update in real time on your dashboard.',
  },
]

export default function Home() {
  return (
    <>
      <Head>
        <title>By the Book — Studio Scheduling Platform</title>
        <meta
          name="description"
          content="The most beautiful and intuitive studio booking platform for recording, photography, podcast, and content studios."
        />
        <link rel="icon" href="/images/logo.png" />
      </Head>

      <div className="min-h-screen bg-night-950 text-white overflow-x-hidden">
        {/* ─── NAVBAR ─── */}
        <nav className="fixed top-0 inset-x-0 z-50 flex items-center px-6 md:px-12 py-4 bg-night-950/80 backdrop-blur-xl border-b border-white/5">
          <div className="flex items-center gap-3">
            <Image
              src="/images/logo.png"
              alt="By the Book"
              width={36}
              height={36}
              className="rounded-xl object-contain"
            />
            <span className="font-display font-bold text-lg">By the Book</span>
          </div>
          <div className="flex-1" />
          <div className="hidden md:flex items-center gap-2">
            <Link
              href="#features"
              className="px-4 py-2 text-sm text-night-300 hover:text-white transition-colors"
            >
              Features
            </Link>
            <Link
              href="#workflow"
              className="px-4 py-2 text-sm text-night-300 hover:text-white transition-colors"
            >
              How It Works
            </Link>
            <Link
              href="/studio/dashboard"
              className="px-4 py-2 text-sm text-night-300 hover:text-white transition-colors"
            >
              Demo
            </Link>
            <Link
              href="/book"
              className="ml-2 px-5 py-2 bg-primary-600 hover:bg-primary-500 text-white text-sm font-semibold rounded-xl transition-all duration-200 shadow-sm hover:shadow-glow-indigo"
            >
              Book a Session
            </Link>
          </div>
        </nav>

        {/* ─── HERO ─── */}
        <section className="relative pt-32 pb-24 px-6 md:px-12 overflow-hidden">
          {/* Background mesh */}
          <div className="absolute inset-0 bg-mesh pointer-events-none" />
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] rounded-full bg-primary-600/10 blur-3xl pointer-events-none" />

          <div className="relative max-w-5xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary-950/60 border border-primary-800/40 rounded-full text-sm text-primary-300 mb-8">
              <Sparkles size={14} />
              Now with AI Session Predictor & Studio Marketplace
            </div>

            {/* Logo hero */}
            <div className="flex justify-center mb-8">
              <div className="relative animate-float">
                <div className="absolute inset-0 bg-primary-500/20 blur-2xl rounded-full" />
                <Image
                  src="/images/logo.png"
                  alt="By the Book"
                  width={120}
                  height={120}
                  className="relative rounded-3xl object-contain shadow-2xl"
                />
              </div>
            </div>

            <h1 className="font-display text-5xl md:text-7xl font-bold leading-tight mb-6">
              Studio Booking, <span className="text-gradient">Done Right.</span>
            </h1>
            <p className="text-xl text-night-300 max-w-2xl mx-auto mb-12 leading-relaxed">
              By the Book is the modern scheduling platform built for creative studios — from
              recording booths and podcast rooms to photo studios and editing suites.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/studio/dashboard"
                className="inline-flex items-center gap-2 px-8 py-4 bg-primary-600 hover:bg-primary-500 text-white font-semibold rounded-2xl transition-all duration-200 hover:shadow-glow-indigo text-lg"
              >
                <PlayCircle size={20} />
                Explore Live Demo
              </Link>
              <Link
                href="/book"
                className="inline-flex items-center gap-2 px-8 py-4 bg-white/8 hover:bg-white/12 border border-white/10 text-white font-semibold rounded-2xl transition-all duration-200 text-lg backdrop-blur-sm"
              >
                Book a Session
                <ArrowRight size={20} />
              </Link>
            </div>
          </div>

          {/* Stats strip */}
          <div className="relative max-w-4xl mx-auto mt-20 grid grid-cols-2 md:grid-cols-4 gap-4">
            {STATS.map((s) => (
              <div
                key={s.value}
                className="bg-white/5 border border-white/8 rounded-2xl p-6 text-center backdrop-blur-sm"
              >
                <p className="font-display text-4xl font-bold text-gradient mb-1">{s.value}</p>
                <p className="text-sm text-night-400">{s.label}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ─── FEATURES ─── */}
        <section id="features" className="py-24 px-6 md:px-12 bg-night-900/40">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="font-display text-4xl md:text-5xl font-bold mb-4">
                Everything a studio needs,
                <br />
                <span className="text-gradient">nothing it doesn't.</span>
              </h2>
              <p className="text-night-400 text-lg max-w-xl mx-auto">
                Built from the ground up for creative professionals who want to spend less time
                managing and more time creating.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
              {FEATURES.map((f) => (
                <div
                  key={f.title}
                  className="group bg-night-800/50 border border-white/5 rounded-2xl p-6 hover:border-primary-500/30 hover:bg-night-800/80 transition-all duration-300"
                >
                  <div
                    className={`w-11 h-11 rounded-xl bg-gradient-to-br ${f.color} flex items-center justify-center mb-5 group-hover:scale-110 transition-transform`}
                  >
                    <f.icon size={22} className="text-white" />
                  </div>
                  <h3 className="font-display font-semibold text-white mb-2">{f.title}</h3>
                  <p className="text-sm text-night-400 leading-relaxed">{f.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── WORKFLOW ─── */}
        <section id="workflow" className="py-24 px-6 md:px-12">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="font-display text-4xl md:text-5xl font-bold mb-4">
                Six steps to a fully <span className="text-gradient">automated studio.</span>
              </h2>
              <p className="text-night-400 text-lg">
                From booking to billing — completely hands-off.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
              {WORKFLOW.map((w) => (
                <div
                  key={w.num}
                  className="bg-night-800/40 border border-white/5 rounded-2xl p-6 hover:border-mint-500/30 transition-all duration-300"
                >
                  <span className="font-display text-5xl font-bold text-primary-900/60">
                    {w.num}
                  </span>
                  <h3 className="font-display font-semibold text-white mt-2 mb-2">{w.title}</h3>
                  <p className="text-sm text-night-400 leading-relaxed">{w.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── CTA ─── */}
        <section className="py-24 px-6 md:px-12">
          <div className="max-w-3xl mx-auto text-center">
            <div className="relative bg-gradient-to-br from-primary-900/60 to-violet-900/40 border border-primary-700/30 rounded-3xl p-12 overflow-hidden">
              <div className="absolute inset-0 bg-mesh pointer-events-none opacity-50" />
              <div className="relative">
                <Image
                  src="/images/logo.png"
                  alt="By the Book"
                  width={64}
                  height={64}
                  className="rounded-2xl object-contain mx-auto mb-6"
                />
                <h2 className="font-display text-4xl font-bold mb-4">
                  Ready to run your studio <span className="text-gradient">by the book?</span>
                </h2>
                <p className="text-night-300 text-lg mb-8">
                  Join studios that replaced spreadsheets and endless back-and-forth with one
                  elegant platform.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link
                    href="/studio/dashboard"
                    className="inline-flex items-center gap-2 px-8 py-4 bg-primary-600 hover:bg-primary-500 text-white font-semibold rounded-2xl transition-all duration-200 hover:shadow-glow-indigo"
                  >
                    <PlayCircle size={20} />
                    Try the Demo
                  </Link>
                  <Link
                    href="/book"
                    className="inline-flex items-center gap-2 px-8 py-4 bg-white/8 hover:bg-white/12 border border-white/10 text-white font-semibold rounded-2xl transition-all duration-200"
                  >
                    Book a Session <ArrowRight size={18} />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ─── FOOTER ─── */}
        <footer className="border-t border-white/5 py-10 px-6 md:px-12">
          <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <Image
                src="/images/logo.png"
                alt="By the Book"
                width={28}
                height={28}
                className="rounded-lg object-contain"
              />
              <span className="font-display font-semibold text-night-300">By the Book</span>
            </div>
            <p className="text-sm text-night-500">
              © {new Date().getFullYear()} By the Book · Built by{' '}
              <a
                href="mailto:balentinetechsolutions@gmail.com"
                className="text-primary-400 hover:text-primary-300"
              >
                Balentine Tech Solutions
              </a>
            </p>
            <div className="flex items-center gap-4 text-sm text-night-500">
              <Link href="/studio/dashboard" className="hover:text-white transition-colors">
                Dashboard
              </Link>
              <Link href="/book" className="hover:text-white transition-colors">
                Book
              </Link>
              <Link href="/studio/marketplace" className="hover:text-white transition-colors">
                Marketplace
              </Link>
            </div>
          </div>
        </footer>
      </div>
    </>
  )
}

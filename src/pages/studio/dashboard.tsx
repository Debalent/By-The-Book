import Head from 'next/head'
import Link from 'next/link'
import {
  Calendar,
  DollarSign,
  Users,
  Star,
  Clock,
  TrendingUp,
  ArrowUpRight,
  Mic2,
  Camera,
  Radio,
  Tv2,
  CheckCircle2,
  AlertCircle,
  XCircle,
} from 'lucide-react'
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts'

// ── Demo data ──────────────────────────────────────────────
const REVENUE_DATA = [
  { month: 'Sep', revenue: 4200, bookings: 18 },
  { month: 'Oct', revenue: 5800, bookings: 23 },
  { month: 'Nov', revenue: 5100, bookings: 20 },
  { month: 'Dec', revenue: 7400, bookings: 31 },
  { month: 'Jan', revenue: 6900, bookings: 28 },
  { month: 'Feb', revenue: 8300, bookings: 35 },
  { month: 'Mar', revenue: 9100, bookings: 39 },
]

const TODAY_BOOKINGS = [
  {
    id: '1',
    client: 'Marcus Webb',
    room: 'Studio A',
    time: '9:00 AM',
    duration: '3h',
    status: 'CONFIRMED',
    amount: 450,
    avatar: 'MW',
  },
  {
    id: '2',
    client: 'Layla Rivers',
    room: 'Podcast Room',
    time: '11:00 AM',
    duration: '2h',
    status: 'IN_PROGRESS',
    amount: 180,
    avatar: 'LR',
  },
  {
    id: '3',
    client: 'Jordan Park',
    room: 'Vocal Booth',
    time: '1:00 PM',
    duration: '2h',
    status: 'CONFIRMED',
    amount: 200,
    avatar: 'JP',
  },
  {
    id: '4',
    client: 'Nadia Flores',
    room: 'Photo Studio',
    time: '3:00 PM',
    duration: '4h',
    status: 'PENDING',
    amount: 360,
    avatar: 'NF',
  },
  {
    id: '5',
    client: 'Devon Cross',
    room: 'Studio A',
    time: '6:00 PM',
    duration: '3h',
    status: 'CONFIRMED',
    amount: 450,
    avatar: 'DC',
  },
]

const ROOMS = [
  { name: 'Studio A', icon: Mic2, rate: 150, booked: 85, color: 'from-primary-500 to-violet-600' },
  {
    name: 'Vocal Booth',
    icon: Radio,
    rate: 100,
    booked: 62,
    color: 'from-mint-500 to-primary-500',
  },
  {
    name: 'Podcast Room',
    icon: Radio,
    rate: 90,
    booked: 70,
    color: 'from-orange-400 to-orange-600',
  },
  {
    name: 'Photo Studio',
    icon: Camera,
    rate: 90,
    booked: 45,
    color: 'from-violet-400 to-violet-600',
  },
  { name: 'Editing Suite', icon: Tv2, rate: 75, booked: 38, color: 'from-night-400 to-night-600' },
]

const RECENT_CLIENTS = [
  { name: 'Marcus Webb', sessions: 12, spend: 5400, avatar: 'MW' },
  { name: 'Layla Rivers', sessions: 8, spend: 2800, avatar: 'LR' },
  { name: 'Jordan Park', sessions: 6, spend: 1800, avatar: 'JP' },
  { name: 'Nadia Flores', sessions: 5, spend: 2200, avatar: 'NF' },
]

function statusBadge(status: string) {
  if (status === 'CONFIRMED') return <span className="badge-confirmed">Confirmed</span>
  if (status === 'IN_PROGRESS') return <span className="badge-progress">In Progress</span>
  if (status === 'PENDING') return <span className="badge-pending">Pending</span>
  if (status === 'CANCELLED') return <span className="badge-cancelled">Cancelled</span>
  return <span className="badge-completed">Completed</span>
}

export default function Dashboard() {
  return (
    <>
      <Head>
        <title>Dashboard — By the Book</title>
      </Head>

      <div className="p-6 md:p-8 space-y-8 animate-fade-in">
        {/* Page header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="page-title">Good morning, SoundForge 👋</h1>
            <p className="text-night-500 text-sm mt-1">
              Here's what's happening at your studio today.
            </p>
          </div>
          <Link href="/book" className="btn-primary hidden md:inline-flex">
            + New Booking
          </Link>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            {
              label: "Today's Revenue",
              value: '$1,640',
              trend: '+18% vs yesterday',
              up: true,
              icon: DollarSign,
              color: 'text-mint-500',
            },
            {
              label: "Today's Bookings",
              value: '5',
              trend: '3 confirmed · 1 live',
              up: true,
              icon: Calendar,
              color: 'text-primary-500',
            },
            {
              label: 'Available Rooms',
              value: '2 / 5',
              trend: 'Right now',
              up: null,
              icon: Clock,
              color: 'text-orange-500',
            },
            {
              label: 'Monthly Revenue',
              value: '$9,100',
              trend: '+10% vs last month',
              up: true,
              icon: TrendingUp,
              color: 'text-violet-500',
            },
          ].map((k) => (
            <div key={k.label} className="stat-card">
              <div className="flex items-center justify-between">
                <span className="stat-label">{k.label}</span>
                <k.icon size={18} className={k.color} />
              </div>
              <span className="stat-value">{k.value}</span>
              {k.up === true && (
                <span className="stat-trend-up">
                  <ArrowUpRight size={12} />
                  {k.trend}
                </span>
              )}
              {k.up === null && <span className="text-xs text-night-400 mt-1">{k.trend}</span>}
            </div>
          ))}
        </div>

        {/* Revenue chart + rooms */}
        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 card p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="section-title">Revenue Overview</h2>
              <span className="text-xs text-night-400 bg-night-100 px-3 py-1 rounded-full">
                Last 7 months
              </span>
            </div>
            <ResponsiveContainer width="100%" height={220}>
              <AreaChart data={REVENUE_DATA} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="revenueGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="10%" stopColor="#6366f1" stopOpacity={0.3} />
                    <stop offset="90%" stopColor="#6366f1" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis
                  dataKey="month"
                  tick={{ fontSize: 12, fill: '#94a3b8' }}
                  axisLine={false}
                  tickLine={false}
                />
                <YAxis
                  tick={{ fontSize: 12, fill: '#94a3b8' }}
                  axisLine={false}
                  tickLine={false}
                  tickFormatter={(v) => `$${v / 1000}k`}
                />
                <Tooltip
                  contentStyle={{
                    background: '#fff',
                    border: '1px solid #e2e8f0',
                    borderRadius: 12,
                    fontSize: 13,
                  }}
                  formatter={(v: number) => [`$${v.toLocaleString()}`, 'Revenue']}
                />
                <Area
                  type="monotone"
                  dataKey="revenue"
                  stroke="#6366f1"
                  strokeWidth={2.5}
                  fill="url(#revenueGrad)"
                  dot={false}
                  activeDot={{ r: 5 }}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          {/* Room utilization */}
          <div className="card p-6">
            <h2 className="section-title mb-5">Room Utilization</h2>
            <div className="space-y-4">
              {ROOMS.map((r) => (
                <div key={r.name}>
                  <div className="flex items-center justify-between mb-1.5">
                    <div className="flex items-center gap-2">
                      <div
                        className={`w-7 h-7 rounded-lg bg-gradient-to-br ${r.color} flex items-center justify-center`}
                      >
                        <r.icon size={13} className="text-white" />
                      </div>
                      <span className="text-sm font-medium text-night-800">{r.name}</span>
                    </div>
                    <span className="text-xs font-semibold text-night-600">{r.booked}%</span>
                  </div>
                  <div className="h-2 bg-night-100 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full bg-gradient-to-r ${r.color} transition-all duration-700`}
                      style={{ width: `${r.booked}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Today's schedule + top clients */}
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Schedule */}
          <div className="lg:col-span-2 card p-6">
            <div className="flex items-center justify-between mb-5">
              <h2 className="section-title">Today's Schedule</h2>
              <Link
                href="/studio/calendar"
                className="text-sm text-primary-600 hover:text-primary-500 font-medium flex items-center gap-1"
              >
                View calendar <ArrowUpRight size={14} />
              </Link>
            </div>
            <div className="space-y-3">
              {TODAY_BOOKINGS.map((b) => (
                <div
                  key={b.id}
                  className="flex items-center gap-4 p-3 rounded-xl hover:bg-night-50 transition-colors group"
                >
                  <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-primary-500 to-violet-600 flex items-center justify-center text-white text-xs font-bold shrink-0">
                    {b.avatar}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-night-900 text-sm truncate">{b.client}</p>
                    <p className="text-xs text-night-500">
                      {b.room} · {b.duration}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-semibold text-night-900">{b.time}</p>
                    <p className="text-xs text-night-400">${b.amount}</p>
                  </div>
                  <div className="shrink-0">{statusBadge(b.status)}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Top clients */}
          <div className="card p-6">
            <div className="flex items-center justify-between mb-5">
              <h2 className="section-title">Top Clients</h2>
              <Link
                href="/studio/clients"
                className="text-sm text-primary-600 hover:text-primary-500 font-medium flex items-center gap-1"
              >
                All <ArrowUpRight size={14} />
              </Link>
            </div>
            <div className="space-y-4">
              {RECENT_CLIENTS.map((c, i) => (
                <div key={c.name} className="flex items-center gap-3">
                  <span className="text-xs font-bold text-night-400 w-4">{i + 1}</span>
                  <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-violet-500 to-primary-600 flex items-center justify-center text-white text-xs font-bold shrink-0">
                    {c.avatar}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-night-900 truncate">{c.name}</p>
                    <p className="text-xs text-night-500">{c.sessions} sessions</p>
                  </div>
                  <span className="text-sm font-semibold text-night-900">
                    ${c.spend.toLocaleString()}
                  </span>
                </div>
              ))}
            </div>
            <div className="mt-5 pt-4 border-t border-night-100">
              <div className="flex items-center justify-between text-sm">
                <span className="text-night-500">Avg. Client Value</span>
                <span className="font-bold text-primary-600">$3,050</span>
              </div>
            </div>
          </div>
        </div>

        {/* Quick actions */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            {
              label: 'Manage Rooms',
              href: '/studio/rooms',
              color: 'from-primary-500 to-violet-600',
            },
            {
              label: 'View Clients',
              href: '/studio/clients',
              color: 'from-mint-500 to-primary-500',
            },
            {
              label: 'Revenue Report',
              href: '/studio/analytics',
              color: 'from-orange-400 to-orange-600',
            },
            {
              label: 'Studio Marketplace',
              href: '/studio/marketplace',
              color: 'from-violet-500 to-violet-700',
            },
          ].map((a) => (
            <Link
              key={a.label}
              href={a.href}
              className={`p-4 rounded-2xl bg-gradient-to-br ${a.color} text-white font-semibold text-sm text-center hover:opacity-90 transition-opacity shadow-sm`}
            >
              {a.label}
            </Link>
          ))}
        </div>
      </div>
    </>
  )
}

import Head from 'next/head'
import { useState } from 'react'
import {
  BarChart3,
  TrendingUp,
  DollarSign,
  Calendar,
  Users,
  Clock,
  ArrowUpRight,
  ArrowDownRight,
} from 'lucide-react'
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from 'recharts'

// ── Demo data ───────────────────────────────────────────────
const MONTHLY = [
  { month: 'Sep', revenue: 4200, bookings: 18, hours: 72 },
  { month: 'Oct', revenue: 5800, bookings: 23, hours: 96 },
  { month: 'Nov', revenue: 5100, bookings: 20, hours: 84 },
  { month: 'Dec', revenue: 7400, bookings: 31, hours: 120 },
  { month: 'Jan', revenue: 6900, bookings: 28, hours: 112 },
  { month: 'Feb', revenue: 8300, bookings: 35, hours: 136 },
  { month: 'Mar', revenue: 9100, bookings: 39, hours: 148 },
]

const ROOM_REVENUE = [
  { name: 'Studio A', revenue: 18600, color: '#6366f1' },
  { name: 'Vocal Booth', revenue: 9200, color: '#34d399' },
  { name: 'Podcast Room', revenue: 7800, color: '#f97316' },
  { name: 'Photo Studio', revenue: 6400, color: '#7c3aed' },
  { name: 'Editing Suite', revenue: 4800, color: '#94a3b8' },
]

const HOURS_HEATMAP = (() => {
  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
  const hours = [9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21]
  return days.map((day) => ({
    day,
    slots: hours.map((h) => ({
      hour: `${h > 12 ? h - 12 : h}${h >= 12 ? 'pm' : 'am'}`,
      value: Math.floor(Math.random() * 100),
    })),
  }))
})()

function heatColor(v: number) {
  if (v > 80) return 'bg-primary-600 text-white'
  if (v > 60) return 'bg-primary-400 text-white'
  if (v > 40) return 'bg-primary-200 text-primary-800'
  if (v > 20) return 'bg-primary-100 text-primary-700'
  return 'bg-night-50 text-night-400'
}

export default function AnalyticsPage() {
  const [period, setPeriod] = useState<'7d' | '30d' | '90d' | '1y'>('30d')

  return (
    <>
      <Head>
        <title>Analytics — By the Book</title>
      </Head>

      <div className="p-6 md:p-8 space-y-6 animate-fade-in">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="page-title">Analytics</h1>
            <p className="text-night-500 text-sm mt-1">Studio performance at a glance.</p>
          </div>
          <div className="flex bg-night-100 p-1 rounded-xl gap-1">
            {(['7d', '30d', '90d', '1y'] as const).map((p) => (
              <button
                key={p}
                onClick={() => setPeriod(p)}
                className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                  period === p
                    ? 'bg-white text-night-900 shadow-sm'
                    : 'text-night-500 hover:text-night-700'
                }`}
              >
                {p}
              </button>
            ))}
          </div>
        </div>

        {/* KPIs */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            {
              label: 'Total Revenue',
              value: '$46,800',
              change: '+18%',
              up: true,
              icon: DollarSign,
            },
            { label: 'Total Bookings', value: '194', change: '+24%', up: true, icon: Calendar },
            { label: 'Avg. Session', value: '2.8 hrs', change: '-4%', up: false, icon: Clock },
            { label: 'New Clients', value: '28', change: '+12%', up: true, icon: Users },
          ].map((k) => (
            <div key={k.label} className="stat-card">
              <div className="flex items-center justify-between">
                <span className="stat-label">{k.label}</span>
                <k.icon size={16} className="text-night-400" />
              </div>
              <span className="stat-value">{k.value}</span>
              <span className={k.up ? 'stat-trend-up' : 'stat-trend-down'}>
                {k.up ? <ArrowUpRight size={12} /> : <ArrowDownRight size={12} />}
                {k.change} vs prev. period
              </span>
            </div>
          ))}
        </div>

        {/* Revenue chart + pie */}
        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 card p-6">
            <h2 className="section-title mb-6">Revenue & Bookings</h2>
            <ResponsiveContainer width="100%" height={240}>
              <AreaChart data={MONTHLY} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="grad1" x1="0" y1="0" x2="0" y2="1">
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
                  fill="url(#grad1)"
                  dot={false}
                  activeDot={{ r: 5 }}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          <div className="card p-6">
            <h2 className="section-title mb-6">Revenue by Room</h2>
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie
                  data={ROOM_REVENUE}
                  dataKey="revenue"
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  paddingAngle={3}
                >
                  {ROOM_REVENUE.map((r) => (
                    <Cell key={r.name} fill={r.color} />
                  ))}
                </Pie>
                <Tooltip
                  formatter={(v: number) => [`$${v.toLocaleString()}`, 'Revenue']}
                  contentStyle={{ borderRadius: 10, fontSize: 12 }}
                />
              </PieChart>
            </ResponsiveContainer>
            <div className="space-y-2 mt-3">
              {ROOM_REVENUE.map((r) => (
                <div key={r.name} className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full" style={{ background: r.color }} />
                    <span className="text-night-700">{r.name}</span>
                  </div>
                  <span className="font-semibold text-night-800">
                    ${r.revenue.toLocaleString()}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Booking hours heatmap */}
        <div className="card p-6">
          <div className="flex items-center justify-between mb-5">
            <h2 className="section-title">Peak Booking Hours</h2>
            <div className="flex items-center gap-2 text-xs text-night-500">
              <span className="w-3 h-3 rounded bg-night-100" /> Low
              <span className="w-3 h-3 rounded bg-primary-200 ml-1" /> Med
              <span className="w-3 h-3 rounded bg-primary-600 ml-1" /> High
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead>
                <tr>
                  <th className="w-10" />
                  {HOURS_HEATMAP[0]!.slots.map((s) => (
                    <th key={s.hour} className="text-night-400 font-normal pb-2 px-0.5 text-center">
                      {s.hour}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {HOURS_HEATMAP.map((row) => (
                  <tr key={row.day}>
                    <td className="text-night-500 font-medium pr-2 py-0.5">{row.day}</td>
                    {row.slots.map((s) => (
                      <td key={s.hour} className="px-0.5 py-0.5">
                        <div
                          className={`w-full h-7 rounded-md ${heatColor(s.value)} flex items-center justify-center font-semibold transition-all`}
                        />
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Monthly bookings bar chart */}
        <div className="card p-6">
          <h2 className="section-title mb-6">Monthly Bookings</h2>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={MONTHLY} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis
                dataKey="month"
                tick={{ fontSize: 12, fill: '#94a3b8' }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis tick={{ fontSize: 12, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
              <Tooltip
                contentStyle={{
                  background: '#fff',
                  border: '1px solid #e2e8f0',
                  borderRadius: 12,
                  fontSize: 13,
                }}
              />
              <Bar dataKey="bookings" fill="#6366f1" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </>
  )
}

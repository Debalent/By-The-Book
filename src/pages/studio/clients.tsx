import Head from 'next/head'
import { useState } from 'react'
import { Search, Plus, ArrowUpRight, Mail, Phone, Calendar, DollarSign, Star } from 'lucide-react'

const CLIENTS = [
  {
    id: '1',
    name: 'Marcus Webb',
    email: 'marcus@example.com',
    phone: '+1 (555) 201-3344',
    sessions: 12,
    spend: 5400,
    lastSeen: 'Mar 10, 2026',
    rating: 5,
    avatar: 'MW',
    tags: ['Recording', 'VIP'],
  },
  {
    id: '2',
    name: 'Layla Rivers',
    email: 'layla@example.com',
    phone: '+1 (555) 876-5432',
    sessions: 8,
    spend: 2800,
    lastSeen: 'Mar 11, 2026',
    rating: 5,
    avatar: 'LR',
    tags: ['Podcast'],
  },
  {
    id: '3',
    name: 'Jordan Park',
    email: 'jordan@example.com',
    phone: '+1 (555) 332-1120',
    sessions: 6,
    spend: 1800,
    lastSeen: 'Feb 28, 2026',
    rating: 4,
    avatar: 'JP',
    tags: ['Vocal', 'Mixing'],
  },
  {
    id: '4',
    name: 'Nadia Flores',
    email: 'nadia@example.com',
    phone: '+1 (555) 554-7890',
    sessions: 5,
    spend: 2200,
    lastSeen: 'Mar 8, 2026',
    rating: 5,
    avatar: 'NF',
    tags: ['Photography'],
  },
  {
    id: '5',
    name: 'Devon Cross',
    email: 'devon@example.com',
    phone: '+1 (555) 120-4455',
    sessions: 9,
    spend: 3600,
    lastSeen: 'Mar 5, 2026',
    rating: 4,
    avatar: 'DC',
    tags: ['Recording'],
  },
  {
    id: '6',
    name: 'Priya Menon',
    email: 'priya@example.com',
    phone: '+1 (555) 987-6543',
    sessions: 3,
    spend: 810,
    lastSeen: 'Feb 14, 2026',
    rating: 4,
    avatar: 'PM',
    tags: ['Podcast', 'Video'],
  },
  {
    id: '7',
    name: 'Alex Torres',
    email: 'alex@example.com',
    phone: '+1 (555) 456-7891',
    sessions: 15,
    spend: 7200,
    lastSeen: 'Mar 9, 2026',
    rating: 5,
    avatar: 'AT',
    tags: ['Recording', 'VIP'],
  },
  {
    id: '8',
    name: 'Sam Nguyen',
    email: 'sam@example.com',
    phone: '+1 (555) 321-6540',
    sessions: 4,
    spend: 1200,
    lastSeen: 'Jan 30, 2026',
    rating: 3,
    avatar: 'SN',
    tags: ['Photography'],
  },
]

const TAG_COLORS: Record<string, string> = {
  Recording: 'bg-primary-50 text-primary-700 border-primary-200',
  VIP: 'bg-orange-50 text-orange-700 border-orange-200',
  Podcast: 'bg-violet-50 text-violet-700 border-violet-200',
  Vocal: 'bg-mint-50 text-mint-700 border-mint-200',
  Mixing: 'bg-primary-50 text-primary-700 border-primary-200',
  Photography: 'bg-night-50 text-night-600 border-night-200',
  Video: 'bg-orange-50 text-orange-700 border-orange-200',
}

export default function ClientsPage() {
  const [search, setSearch] = useState('')
  const [selected, setSelected] = useState<string | null>(null)

  const filtered = CLIENTS.filter(
    (c) =>
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.email.toLowerCase().includes(search.toLowerCase())
  )

  const selectedClient = CLIENTS.find((c) => c.id === selected)

  return (
    <>
      <Head>
        <title>Clients — By the Book</title>
      </Head>

      <div className="p-6 md:p-8 animate-fade-in">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="page-title">Clients</h1>
            <p className="text-night-500 text-sm mt-1">{CLIENTS.length} total clients</p>
          </div>
          <button className="btn-primary">
            <Plus size={16} /> Add Client
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          {[
            { label: 'Total Clients', value: '8' },
            { label: 'Active This Month', value: '5' },
            { label: 'Avg. Sessions', value: '7.8' },
            { label: 'Avg. Lifetime Value', value: '$3,126' },
          ].map((s) => (
            <div key={s.label} className="stat-card">
              <span className="stat-label">{s.label}</span>
              <span className="stat-value">{s.value}</span>
            </div>
          ))}
        </div>

        <div className="flex gap-6 h-[calc(100vh-320px)] min-h-[500px]">
          {/* Client list */}
          <div className="flex-1 flex flex-col card overflow-hidden">
            <div className="p-4 border-b border-night-100">
              <div className="relative">
                <Search
                  size={16}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-night-400"
                />
                <input
                  className="input pl-9 py-2 text-sm"
                  placeholder="Search clients…"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>
            </div>
            <div className="flex-1 overflow-y-auto divide-y divide-night-50">
              {filtered.map((c) => (
                <button
                  key={c.id}
                  onClick={() => setSelected(c.id)}
                  className={`w-full flex items-center gap-4 px-5 py-4 text-left hover:bg-night-50 transition-colors
                    ${selected === c.id ? 'bg-primary-50 border-l-2 border-primary-500' : ''}`}
                >
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary-500 to-violet-600 flex items-center justify-center text-white text-sm font-bold shrink-0">
                    {c.avatar}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-night-900 text-sm">{c.name}</p>
                    <p className="text-xs text-night-500 truncate">{c.email}</p>
                  </div>
                  <div className="text-right shrink-0">
                    <p className="text-sm font-bold text-night-900">${c.spend.toLocaleString()}</p>
                    <p className="text-xs text-night-400">{c.sessions} sessions</p>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Client detail */}
          {selectedClient ? (
            <div className="w-80 card p-6 overflow-y-auto space-y-5">
              <div className="text-center">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary-500 to-violet-600 flex items-center justify-center text-white text-xl font-bold mx-auto mb-3">
                  {selectedClient.avatar}
                </div>
                <h2 className="font-display font-bold text-night-900 text-lg">
                  {selectedClient.name}
                </h2>
                <div className="flex justify-center gap-1 mt-1">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      size={13}
                      className={
                        i < selectedClient.rating
                          ? 'fill-orange-400 text-orange-400'
                          : 'text-night-200'
                      }
                    />
                  ))}
                </div>
              </div>

              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2 text-night-600">
                  <Mail size={14} className="text-night-400" />
                  {selectedClient.email}
                </div>
                <div className="flex items-center gap-2 text-night-600">
                  <Phone size={14} className="text-night-400" />
                  {selectedClient.phone}
                </div>
                <div className="flex items-center gap-2 text-night-600">
                  <Calendar size={14} className="text-night-400" />
                  Last seen {selectedClient.lastSeen}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="bg-night-50 rounded-xl p-3 text-center">
                  <p className="text-xl font-bold text-night-900">{selectedClient.sessions}</p>
                  <p className="text-xs text-night-500">Sessions</p>
                </div>
                <div className="bg-night-50 rounded-xl p-3 text-center">
                  <p className="text-xl font-bold text-night-900">
                    ${selectedClient.spend.toLocaleString()}
                  </p>
                  <p className="text-xs text-night-500">Total Spend</p>
                </div>
              </div>

              <div>
                <p className="text-xs font-semibold text-night-500 uppercase tracking-wider mb-2">
                  Tags
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {selectedClient.tags.map((t) => (
                    <span
                      key={t}
                      className={`text-xs border px-2 py-0.5 rounded-full font-medium ${TAG_COLORS[t] ?? ''}`}
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex gap-2 pt-2">
                <button className="flex-1 btn-primary text-sm py-2 justify-center">
                  Book Session
                </button>
                <button className="btn-secondary text-sm py-2">
                  <Mail size={14} />
                </button>
              </div>
            </div>
          ) : (
            <div className="w-80 card flex items-center justify-center text-night-400">
              <div className="text-center">
                <Users size={32} className="mx-auto mb-2 opacity-30" />
                <p className="text-sm">Select a client to view details</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  )
}

function Users({ size, className }: { size: number; className?: string }) {
  return (
    <svg
      width={size}
      height={size}
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
    >
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  )
}

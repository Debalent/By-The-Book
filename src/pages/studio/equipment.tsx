import Head from 'next/head'
import { useState } from 'react'
import { Search, Plus, Cpu, AlertTriangle, CheckCircle, Package } from 'lucide-react'

const EQUIPMENT = [
  {
    id: '1',
    name: 'SSL 4000 Console',
    category: 'Mixing',
    room: 'Studio A',
    status: 'available',
    value: 85000,
    condition: 'Excellent',
  },
  {
    id: '2',
    name: 'Neumann U87 (×3)',
    category: 'Microphone',
    room: 'Studio A',
    status: 'in-use',
    value: 9000,
    condition: 'Excellent',
  },
  {
    id: '3',
    name: 'Pro Tools HDX',
    category: 'Software',
    room: 'Studio A',
    status: 'available',
    value: 6000,
    condition: 'Good',
  },
  {
    id: '4',
    name: 'Universal Audio Apollo 16',
    category: 'Interface',
    room: 'Vocal Booth',
    status: 'in-use',
    value: 3200,
    condition: 'Good',
  },
  {
    id: '5',
    name: 'Yamaha NS10',
    category: 'Monitors',
    room: 'Studio A',
    status: 'available',
    value: 1200,
    condition: 'Good',
  },
  {
    id: '6',
    name: 'Shure SM7B (×4)',
    category: 'Microphone',
    room: 'Podcast Room',
    status: 'available',
    value: 1600,
    condition: 'Excellent',
  },
  {
    id: '7',
    name: 'Profoto B10 Strobe (×3)',
    category: 'Lighting',
    room: 'Photo Studio',
    status: 'available',
    value: 5400,
    condition: 'Excellent',
  },
  {
    id: '8',
    name: 'Mac Pro M2',
    category: 'Computer',
    room: 'Editing Suite',
    status: 'in-use',
    value: 8000,
    condition: 'Excellent',
  },
  {
    id: '9',
    name: 'Genelec 8351',
    category: 'Monitors',
    room: 'Editing Suite',
    status: 'maintenance',
    value: 4800,
    condition: 'Fair',
  },
  {
    id: '10',
    name: 'Savage Backdrop System',
    category: 'Backdrop',
    room: 'Photo Studio',
    status: 'available',
    value: 800,
    condition: 'Good',
  },
]

const STATUS_STYLES: Record<string, string> = {
  available: 'badge-confirmed',
  'in-use': 'badge-progress',
  maintenance: 'badge-pending',
}

const STATUS_LABELS: Record<string, string> = {
  available: 'Available',
  'in-use': 'In Use',
  maintenance: 'Maintenance',
}

export default function EquipmentPage() {
  const [search, setSearch] = useState('')
  const [filter, setFilter] = useState('All')

  const categories = ['All', ...Array.from(new Set(EQUIPMENT.map((e) => e.category)))]

  const filtered = EQUIPMENT.filter((e) => {
    const matchSearch =
      e.name.toLowerCase().includes(search.toLowerCase()) ||
      e.room.toLowerCase().includes(search.toLowerCase())
    const matchCat = filter === 'All' || e.category === filter
    return matchSearch && matchCat
  })

  const totalValue = EQUIPMENT.reduce((s, e) => s + e.value, 0)

  return (
    <>
      <Head>
        <title>Equipment — By the Book</title>
      </Head>

      <div className="p-6 md:p-8 space-y-6 animate-fade-in">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="page-title">Equipment</h1>
            <p className="text-night-500 text-sm mt-1">Track and manage studio gear.</p>
          </div>
          <button className="btn-primary">
            <Plus size={16} /> Add Item
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: 'Total Items', value: EQUIPMENT.length.toString() },
            {
              label: 'Available',
              value: EQUIPMENT.filter((e) => e.status === 'available').length.toString(),
            },
            {
              label: 'In Use',
              value: EQUIPMENT.filter((e) => e.status === 'in-use').length.toString(),
            },
            { label: 'Total Asset Value', value: `$${(totalValue / 1000).toFixed(0)}k` },
          ].map((s) => (
            <div key={s.label} className="stat-card">
              <span className="stat-label">{s.label}</span>
              <span className="stat-value">{s.value}</span>
            </div>
          ))}
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-night-400" />
            <input
              className="input pl-9 py-2 text-sm"
              placeholder="Search equipment or room…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <div className="flex gap-2 flex-wrap">
            {categories.map((c) => (
              <button
                key={c}
                onClick={() => setFilter(c)}
                className={`px-3 py-2 rounded-xl text-sm font-medium transition-colors ${
                  filter === c
                    ? 'bg-primary-600 text-white'
                    : 'bg-white border border-night-200 text-night-600 hover:border-primary-300'
                }`}
              >
                {c}
              </button>
            ))}
          </div>
        </div>

        {/* Table */}
        <div className="card overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-night-50 border-b border-night-100">
              <tr>
                {['Item', 'Category', 'Room', 'Condition', 'Value', 'Status', ''].map((h) => (
                  <th
                    key={h}
                    className="px-5 py-3 text-left text-xs font-semibold text-night-500 uppercase tracking-wider"
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-night-50">
              {filtered.map((e) => (
                <tr key={e.id} className="hover:bg-night-50 transition-colors">
                  <td className="px-5 py-3.5">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-primary-50 flex items-center justify-center">
                        <Cpu size={15} className="text-primary-600" />
                      </div>
                      <span className="font-medium text-night-900">{e.name}</span>
                    </div>
                  </td>
                  <td className="px-5 py-3.5 text-night-600">{e.category}</td>
                  <td className="px-5 py-3.5 text-night-600">{e.room}</td>
                  <td className="px-5 py-3.5">
                    <span
                      className={`text-xs font-medium ${
                        e.condition === 'Excellent'
                          ? 'text-mint-600'
                          : e.condition === 'Good'
                            ? 'text-primary-600'
                            : 'text-orange-600'
                      }`}
                    >
                      {e.condition}
                    </span>
                  </td>
                  <td className="px-5 py-3.5 font-semibold text-night-900">
                    ${e.value.toLocaleString()}
                  </td>
                  <td className="px-5 py-3.5">
                    <span className={`badge ${STATUS_STYLES[e.status]}`}>
                      {STATUS_LABELS[e.status]}
                    </span>
                  </td>
                  <td className="px-5 py-3.5">
                    <button className="text-xs text-primary-600 hover:text-primary-500 font-medium">
                      Edit
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {filtered.length === 0 && (
            <div className="text-center py-12 text-night-400">
              <Package size={32} className="mx-auto mb-2 opacity-30" />
              <p>No equipment found</p>
            </div>
          )}
        </div>
      </div>
    </>
  )
}

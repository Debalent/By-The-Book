import Head from 'next/head'
import { useState } from 'react'
import { Mic2, Camera, Radio, Tv2, Plus, Edit2, Trash2, Users, DollarSign, Cpu } from 'lucide-react'

const ROOMS_DATA = [
  {
    id: '1',
    name: 'Studio A',
    type: 'Recording',
    icon: Mic2,
    rate: 150,
    capacity: 6,
    color: 'from-primary-500 to-violet-600',
    status: 'occupied',
    equipment: ['SSL 4000 Console', 'Pro Tools HDX', 'Neumann U87', 'Yamaha NS10'],
    description: 'Flagship recording suite with world-class gear and full acoustic treatment.',
    utilization: 85,
  },
  {
    id: '2',
    name: 'Vocal Booth',
    type: 'Recording',
    icon: Mic2,
    rate: 100,
    capacity: 2,
    color: 'from-mint-500 to-primary-500',
    status: 'available',
    equipment: ['Neumann U87', 'Universal Audio Apollo', 'Pro Tools'],
    description: 'Isolated vocal booth with pristine acoustics for tracking and overdubs.',
    utilization: 62,
  },
  {
    id: '3',
    name: 'Podcast Room',
    type: 'Podcast',
    icon: Radio,
    rate: 90,
    capacity: 4,
    color: 'from-orange-400 to-orange-600',
    status: 'occupied',
    equipment: ['Shure SM7B ×4', 'Focusrite Scarlett 18i8', 'Zoom H6'],
    description: 'Broadcast-ready podcast studio with multi-mic setup and video capability.',
    utilization: 70,
  },
  {
    id: '4',
    name: 'Photo Studio',
    type: 'Photography',
    icon: Camera,
    rate: 90,
    capacity: 8,
    color: 'from-violet-400 to-violet-600',
    status: 'available',
    equipment: ['Profoto B10 ×3', 'Savage Backdrop System', 'Godox 600W'],
    description: 'Fully equipped photography studio with seamless backdrops and pro lighting.',
    utilization: 45,
  },
  {
    id: '5',
    name: 'Editing Suite',
    type: 'Post-Production',
    icon: Tv2,
    rate: 75,
    capacity: 3,
    color: 'from-night-400 to-night-700',
    status: 'available',
    equipment: ['Mac Pro M2', 'DaVinci Resolve', 'Avid Media Composer', 'Genelec 8351'],
    description: 'Professional post-production suite for audio mixing and video editing.',
    utilization: 38,
  },
]

export default function RoomsPage() {
  const [view, setView] = useState<'grid' | 'list'>('grid')

  return (
    <>
      <Head>
        <title>Rooms — By the Book</title>
      </Head>

      <div className="p-6 md:p-8 space-y-6 animate-fade-in">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="page-title">Studio Rooms</h1>
            <p className="text-night-500 text-sm mt-1">Manage your rooms, rates, and equipment.</p>
          </div>
          <button className="btn-primary">
            <Plus size={16} /> Add Room
          </button>
        </div>

        {/* Summary row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: 'Total Rooms', value: '5' },
            { label: 'Currently Occupied', value: '2' },
            { label: 'Available Now', value: '3' },
            { label: 'Avg. Utilization', value: '60%' },
          ].map((s) => (
            <div key={s.label} className="stat-card">
              <span className="stat-label">{s.label}</span>
              <span className="stat-value">{s.value}</span>
            </div>
          ))}
        </div>

        {/* Room cards */}
        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-5">
          {ROOMS_DATA.map((room) => (
            <div key={room.id} className="card-hover overflow-hidden">
              {/* Color banner */}
              <div className={`h-2 w-full bg-gradient-to-r ${room.color}`} />
              <div className="p-5">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-10 h-10 rounded-xl bg-gradient-to-br ${room.color} flex items-center justify-center`}
                    >
                      <room.icon size={20} className="text-white" />
                    </div>
                    <div>
                      <h3 className="font-display font-bold text-night-900">{room.name}</h3>
                      <span className="text-xs text-night-400">{room.type}</span>
                    </div>
                  </div>
                  <span
                    className={`badge ${room.status === 'occupied' ? 'badge-progress' : 'badge-confirmed'}`}
                  >
                    {room.status === 'occupied' ? 'Occupied' : 'Available'}
                  </span>
                </div>

                <p className="text-sm text-night-500 mb-4 leading-relaxed">{room.description}</p>

                {/* Stats row */}
                <div className="flex items-center gap-4 mb-4 text-sm">
                  <div className="flex items-center gap-1.5 text-night-600">
                    <DollarSign size={14} className="text-mint-500" />
                    <span className="font-semibold">${room.rate}/hr</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-night-600">
                    <Users size={14} className="text-primary-500" />
                    <span>Up to {room.capacity}</span>
                  </div>
                </div>

                {/* Utilization */}
                <div className="mb-4">
                  <div className="flex justify-between text-xs text-night-500 mb-1.5">
                    <span>Utilization this month</span>
                    <span className="font-semibold">{room.utilization}%</span>
                  </div>
                  <div className="h-1.5 bg-night-100 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full bg-gradient-to-r ${room.color}`}
                      style={{ width: `${room.utilization}%` }}
                    />
                  </div>
                </div>

                {/* Equipment tags */}
                <div className="flex items-start gap-2 mb-4">
                  <Cpu size={13} className="text-night-400 mt-0.5 shrink-0" />
                  <div className="flex flex-wrap gap-1.5">
                    {room.equipment.slice(0, 3).map((e) => (
                      <span
                        key={e}
                        className="text-xs bg-night-50 border border-night-200 text-night-600 px-2 py-0.5 rounded-full"
                      >
                        {e}
                      </span>
                    ))}
                    {room.equipment.length > 3 && (
                      <span className="text-xs bg-night-50 border border-night-200 text-night-600 px-2 py-0.5 rounded-full">
                        +{room.equipment.length - 3}
                      </span>
                    )}
                  </div>
                </div>

                <div className="flex gap-2 pt-3 border-t border-night-100">
                  <button className="flex-1 btn-secondary text-sm py-2 justify-center">
                    <Edit2 size={14} /> Edit
                  </button>
                  <button className="btn-ghost text-sm py-2 text-red-500 hover:text-red-600 hover:bg-red-50">
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}

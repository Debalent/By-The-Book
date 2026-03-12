import Head from 'next/head'
import { useState } from 'react'
import Link from 'next/link'
import {
  MapPin,
  Star,
  Clock,
  DollarSign,
  Search,
  Mic2,
  Camera,
  Radio,
  Tv2,
  ArrowRight,
} from 'lucide-react'

const STUDIOS = [
  {
    id: '1',
    name: 'SoundForge Studios',
    location: 'Atlanta, GA',
    type: 'Recording',
    rooms: 5,
    rating: 4.9,
    reviews: 128,
    priceFrom: 90,
    tags: ['Recording', 'Podcast', 'Photography'],
    icon: Mic2,
    color: 'from-primary-500 to-violet-600',
    description:
      "Atlanta's premier multi-room studio. SSL console, world-class acoustics, and experienced engineers on staff.",
    booked: 85,
    badge: 'Featured',
  },
  {
    id: '2',
    name: 'Echo Chamber NYC',
    location: 'New York, NY',
    type: 'Recording',
    rooms: 3,
    rating: 4.8,
    reviews: 94,
    priceFrom: 120,
    tags: ['Recording', 'Mixing', 'Mastering'],
    icon: Mic2,
    color: 'from-mint-500 to-primary-500',
    description: 'Boutique NYC recording studio specializing in hip-hop, R&B, and pop production.',
    booked: 78,
    badge: 'Top Rated',
  },
  {
    id: '3',
    name: 'The Lens Lab',
    location: 'Los Angeles, CA',
    type: 'Photography',
    rooms: 2,
    rating: 4.7,
    reviews: 62,
    priceFrom: 85,
    tags: ['Photography', 'Video', 'Content'],
    icon: Camera,
    color: 'from-orange-400 to-orange-600',
    description:
      'Creative photography studio with seamless backdrops, cyc wall, and full lighting rental.',
    booked: 55,
    badge: null,
  },
  {
    id: '4',
    name: 'PodHaus Miami',
    location: 'Miami, FL',
    type: 'Podcast',
    rooms: 4,
    rating: 4.6,
    reviews: 41,
    priceFrom: 75,
    tags: ['Podcast', 'Live Stream', 'Radio'],
    icon: Radio,
    color: 'from-violet-400 to-violet-700',
    description:
      'State-of-the-art podcast studio with live streaming capability and video production.',
    booked: 62,
    badge: 'New',
  },
  {
    id: '5',
    name: 'CutBay Post',
    location: 'Austin, TX',
    type: 'Post-Production',
    rooms: 2,
    rating: 4.5,
    reviews: 33,
    priceFrom: 65,
    tags: ['Editing', 'Color Grading', 'Mixing'],
    icon: Tv2,
    color: 'from-night-400 to-night-700',
    description:
      'Full-service post-production facility for film, TV, and digital content creators.',
    booked: 40,
    badge: null,
  },
  {
    id: '6',
    name: 'VocalBox Chicago',
    location: 'Chicago, IL',
    type: 'Recording',
    rooms: 3,
    rating: 4.8,
    reviews: 77,
    priceFrom: 95,
    tags: ['Recording', 'Vocal', 'Production'],
    icon: Mic2,
    color: 'from-primary-400 to-primary-700',
    description:
      'Specialized vocal recording studio with professional producers and session musicians available.',
    booked: 70,
    badge: null,
  },
]

const BADGE_COLORS: Record<string, string> = {
  Featured: 'bg-orange-100 text-orange-700 border-orange-200',
  'Top Rated': 'bg-mint-100 text-mint-700 border-mint-200',
  New: 'bg-primary-100 text-primary-700 border-primary-200',
}

export default function MarketplacePage() {
  const [search, setSearch] = useState('')
  const [typeFilter, setTypeFilter] = useState('All')

  const types = ['All', 'Recording', 'Photography', 'Podcast', 'Post-Production']

  const filtered = STUDIOS.filter((s) => {
    const matchSearch =
      s.name.toLowerCase().includes(search.toLowerCase()) ||
      s.location.toLowerCase().includes(search.toLowerCase())
    const matchType = typeFilter === 'All' || s.type === typeFilter
    return matchSearch && matchType
  })

  return (
    <>
      <Head>
        <title>Marketplace — By the Book</title>
      </Head>

      <div className="p-6 md:p-8 space-y-6 animate-fade-in">
        {/* Hero */}
        <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-night-900 to-primary-900 p-8 text-white">
          <div className="absolute inset-0 bg-mesh opacity-60 pointer-events-none" />
          <div className="relative max-w-2xl">
            <h1 className="font-display text-3xl font-bold mb-2">Studio Marketplace</h1>
            <p className="text-night-300 mb-6">
              Discover and book top-rated studios near you. All venues verified and reviewed.
            </p>
            <div className="flex gap-3">
              <div className="relative flex-1">
                <Search
                  size={16}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-night-400"
                />
                <input
                  className="w-full pl-9 pr-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-night-400 focus:outline-none focus:ring-2 focus:ring-white/30 text-sm"
                  placeholder="Search by name or city…"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>
              <button className="px-5 py-3 bg-primary-600 hover:bg-primary-500 rounded-xl font-medium text-sm transition-colors">
                Search
              </button>
            </div>
          </div>
        </div>

        {/* Type filters */}
        <div className="flex gap-2 flex-wrap">
          {types.map((t) => (
            <button
              key={t}
              onClick={() => setTypeFilter(t)}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-colors ${
                typeFilter === t
                  ? 'bg-primary-600 text-white'
                  : 'bg-white border border-night-200 text-night-600 hover:border-primary-300'
              }`}
            >
              {t}
            </button>
          ))}
        </div>

        <p className="text-sm text-night-500">{filtered.length} studios found</p>

        {/* Studio grid */}
        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-5">
          {filtered.map((s) => (
            <div key={s.id} className="card-hover overflow-hidden group">
              {/* Banner */}
              <div
                className={`h-28 w-full bg-gradient-to-br ${s.color} flex items-center justify-center relative`}
              >
                <s.icon size={44} className="text-white/30" />
                {s.badge && (
                  <span
                    className={`absolute top-3 right-3 text-xs font-semibold px-2.5 py-1 rounded-full border ${BADGE_COLORS[s.badge]}`}
                  >
                    {s.badge}
                  </span>
                )}
              </div>

              <div className="p-5">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h3 className="font-display font-bold text-night-900 text-base">{s.name}</h3>
                    <div className="flex items-center gap-1 text-xs text-night-500 mt-0.5">
                      <MapPin size={12} /> {s.location}
                    </div>
                  </div>
                  <div className="flex items-center gap-1 text-sm">
                    <Star size={14} className="fill-orange-400 text-orange-400" />
                    <span className="font-bold text-night-900">{s.rating}</span>
                    <span className="text-night-400 text-xs">({s.reviews})</span>
                  </div>
                </div>

                <p className="text-sm text-night-500 mb-4 leading-relaxed line-clamp-2">
                  {s.description}
                </p>

                <div className="flex items-center gap-4 text-sm mb-4">
                  <span className="flex items-center gap-1 text-night-600">
                    <DollarSign size={13} className="text-mint-500" />
                    From ${s.priceFrom}/hr
                  </span>
                  <span className="flex items-center gap-1 text-night-600">
                    <Clock size={13} className="text-primary-500" />
                    {s.rooms} rooms
                  </span>
                </div>

                <div className="flex flex-wrap gap-1.5 mb-4">
                  {s.tags.map((t) => (
                    <span
                      key={t}
                      className="text-xs bg-night-50 border border-night-200 text-night-600 px-2 py-0.5 rounded-full"
                    >
                      {t}
                    </span>
                  ))}
                </div>

                <div className="pt-3 border-t border-night-100 flex gap-2">
                  <Link href="/book" className="flex-1 btn-primary text-sm py-2 justify-center">
                    Book Now <ArrowRight size={14} />
                  </Link>
                  <button className="btn-secondary text-sm py-2 px-3">View</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}

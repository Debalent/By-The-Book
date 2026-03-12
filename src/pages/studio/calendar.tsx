import Head from 'next/head'
import { useState } from 'react'
import { ChevronLeft, ChevronRight, Clock, DollarSign, Plus } from 'lucide-react'
import { format, addDays, startOfWeek, addWeeks, subWeeks, isSameDay } from 'date-fns'

const BOOKINGS_DEMO = [
  {
    id: '1',
    client: 'Marcus Webb',
    room: 'Studio A',
    date: new Date(2026, 2, 11),
    start: 9,
    end: 12,
    color: 'bg-primary-500',
    amount: 450,
  },
  {
    id: '2',
    client: 'Layla Rivers',
    room: 'Podcast Room',
    date: new Date(2026, 2, 11),
    start: 11,
    end: 13,
    color: 'bg-orange-500',
    amount: 180,
  },
  {
    id: '3',
    client: 'Jordan Park',
    room: 'Vocal Booth',
    date: new Date(2026, 2, 11),
    start: 13,
    end: 15,
    color: 'bg-mint-500',
    amount: 200,
  },
  {
    id: '4',
    client: 'Nadia Flores',
    room: 'Photo Studio',
    date: new Date(2026, 2, 12),
    start: 10,
    end: 14,
    color: 'bg-violet-500',
    amount: 360,
  },
  {
    id: '5',
    client: 'Devon Cross',
    room: 'Studio A',
    date: new Date(2026, 2, 13),
    start: 14,
    end: 17,
    color: 'bg-primary-500',
    amount: 450,
  },
  {
    id: '6',
    client: 'Alex Torres',
    room: 'Studio A',
    date: new Date(2026, 2, 14),
    start: 10,
    end: 14,
    color: 'bg-primary-600',
    amount: 600,
  },
  {
    id: '7',
    client: 'Priya Menon',
    room: 'Podcast Room',
    date: new Date(2026, 2, 15),
    start: 13,
    end: 15,
    color: 'bg-orange-400',
    amount: 180,
  },
]

const HOURS = Array.from({ length: 14 }, (_, i) => i + 8) // 8am–9pm

export default function CalendarPage() {
  const [week, setWeek] = useState(startOfWeek(new Date(2026, 2, 11), { weekStartsOn: 1 }))
  const days = Array.from({ length: 7 }, (_, i) => addDays(week, i))

  const bookingsForDay = (day: Date) => BOOKINGS_DEMO.filter((b) => isSameDay(b.date, day))

  return (
    <>
      <Head>
        <title>Calendar — By the Book</title>
      </Head>

      <div
        className="p-6 md:p-8 animate-fade-in flex flex-col h-full"
        style={{ minHeight: 'calc(100vh - 80px)' }}
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="page-title">Calendar</h1>
            <p className="text-night-500 text-sm mt-1">
              Week of {format(week, 'MMMM d')} – {format(addDays(week, 6), 'd, yyyy')}
            </p>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center bg-night-100 p-1 rounded-xl gap-1">
              <button
                onClick={() => setWeek((w) => subWeeks(w, 1))}
                className="p-2 hover:bg-white rounded-lg transition-colors"
                aria-label="Previous week"
              >
                <ChevronLeft size={16} />
              </button>
              <span className="text-sm font-medium px-2">{format(week, 'MMM yyyy')}</span>
              <button
                onClick={() => setWeek((w) => addWeeks(w, 1))}
                className="p-2 hover:bg-white rounded-lg transition-colors"
                aria-label="Next week"
              >
                <ChevronRight size={16} />
              </button>
            </div>
            <button className="btn-primary text-sm">
              <Plus size={15} /> Add Booking
            </button>
          </div>
        </div>

        {/* Week grid */}
        <div className="card overflow-hidden flex-1">
          {/* Day headers */}
          <div
            className="grid border-b border-night-100"
            style={{ gridTemplateColumns: '60px repeat(7, 1fr)' }}
          >
            <div className="border-r border-night-100" />
            {days.map((d) => (
              <div
                key={d.toISOString()}
                className={`py-3 text-center border-r border-night-100 last:border-r-0 ${
                  isSameDay(d, new Date(2026, 2, 11)) ? 'bg-primary-50' : ''
                }`}
              >
                <p className="text-xs text-night-500 uppercase tracking-wider">
                  {format(d, 'EEE')}
                </p>
                <p
                  className={`text-lg font-bold mt-0.5 ${
                    isSameDay(d, new Date(2026, 2, 11)) ? 'text-primary-600' : 'text-night-900'
                  }`}
                >
                  {format(d, 'd')}
                </p>
                <p className="text-xs text-night-400">{bookingsForDay(d).length} bookings</p>
              </div>
            ))}
          </div>

          {/* Time slots */}
          <div className="overflow-y-auto" style={{ maxHeight: 'calc(100vh - 320px)' }}>
            {HOURS.map((hour) => (
              <div
                key={hour}
                className="grid border-b border-night-50 hover:bg-night-50/50 transition-colors"
                style={{ gridTemplateColumns: '60px repeat(7, 1fr)', minHeight: '56px' }}
              >
                <div className="border-r border-night-100 px-2 py-2 text-right">
                  <span className="text-xs text-night-400">
                    {hour > 12 ? `${hour - 12}pm` : hour === 12 ? '12pm' : `${hour}am`}
                  </span>
                </div>
                {days.map((d) => {
                  const booking = bookingsForDay(d).find((b) => b.start === hour)
                  return (
                    <div
                      key={d.toISOString()}
                      className="border-r border-night-50 last:border-r-0 p-1 relative"
                    >
                      {booking && (
                        <div
                          className={`${booking.color} text-white rounded-lg px-2 py-1 text-xs font-medium cursor-pointer hover:opacity-90 transition-opacity overflow-hidden`}
                          style={{ minHeight: `${(booking.end - booking.start) * 56 - 8}px` }}
                        >
                          <p className="font-semibold truncate">{booking.client}</p>
                          <p className="opacity-80 truncate">{booking.room}</p>
                          <div className="flex items-center gap-1 mt-1 opacity-70">
                            <Clock size={10} />
                            <span>
                              {booking.start > 12 ? booking.start - 12 : booking.start}–
                              {booking.end > 12 ? booking.end - 12 : booking.end}
                              {booking.end >= 12 ? 'pm' : 'am'}
                            </span>
                          </div>
                        </div>
                      )}
                    </div>
                  )
                })}
              </div>
            ))}
          </div>
        </div>

        {/* Legend */}
        <div className="flex items-center gap-4 mt-4 text-xs text-night-500">
          {[
            { label: 'Studio A', color: 'bg-primary-500' },
            { label: 'Vocal Booth', color: 'bg-mint-500' },
            { label: 'Podcast Room', color: 'bg-orange-500' },
            { label: 'Photo Studio', color: 'bg-violet-500' },
          ].map((l) => (
            <div key={l.label} className="flex items-center gap-1.5">
              <span className={`w-3 h-3 rounded ${l.color}`} />
              {l.label}
            </div>
          ))}
        </div>
      </div>
    </>
  )
}

import { useState } from 'react'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { api } from '@/utils/api'
import { format, parseISO } from 'date-fns'
import {
  Check,
  ChevronRight,
  Clock,
  Music2,
  DollarSign,
  Calendar,
  User,
  FileText,
} from 'lucide-react'

const STEPS = [
  { num: 1, label: 'Select Room', icon: Music2 },
  { num: 2, label: 'Choose Time', icon: Calendar },
  { num: 3, label: 'Your Info', icon: User },
  { num: 4, label: 'Confirm', icon: Check },
]

export default function BookSession() {
  const router = useRouter()
  const [step, setStep] = useState(1)
  const [selectedStudio, setSelectedStudio] = useState<string>('')
  const [selectedDate, setSelectedDate] = useState<string>('')
  const [selectedSlot, setSelectedSlot] = useState<{ start: string; end: string } | null>(null)
  const [duration, setDuration] = useState<number>(60)
  const [clientInfo, setClientInfo] = useState({ name: '', email: '', phone: '', notes: '' })

  const { data: studios } = api.studio.getAll.useQuery()
  const { data: studio } = api.studio.getById.useQuery(
    { id: selectedStudio },
    { enabled: !!selectedStudio }
  )
  const { data: availableSlots } = api.booking.getAvailableSlots.useQuery(
    { studioId: selectedStudio, date: selectedDate, duration },
    { enabled: !!selectedStudio && !!selectedDate }
  )

  const createClientMutation = api.client.getOrCreate.useMutation()
  const createBookingMutation = api.booking.create.useMutation()

  const handleSubmit = async () => {
    if (!selectedStudio || !selectedSlot) return
    try {
      const client = await createClientMutation.mutateAsync({
        studioId: selectedStudio,
        email: clientInfo.email,
        name: clientInfo.name,
        phone: clientInfo.phone,
      })
      const booking = await createBookingMutation.mutateAsync({
        studioId: selectedStudio,
        clientId: client.id,
        startTime: selectedSlot.start,
        duration,
        notes: clientInfo.notes,
      })
      router.push(`/booking/${booking.id}/payment`)
    } catch (error) {
      console.error('Booking error:', error)
    }
  }

  const total = studio ? (duration / 60) * studio.hourlyRate : 0
  const deposit = studio?.requireDeposit
    ? studio.depositType === 'PERCENTAGE'
      ? (total * studio.depositAmount) / 100
      : studio.depositAmount
    : 0

  return (
    <>
      <Head>
        <title>Book a Session — By the Book</title>
      </Head>

      <div className="min-h-screen bg-night-950 text-white">
        {/* Top nav */}
        <nav className="border-b border-white/10 px-6 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <div className="relative w-8 h-8">
              <Image src="/images/logo.png" alt="By the Book" fill className="object-contain" />
            </div>
            <span className="font-display font-bold text-lg">By the Book</span>
          </Link>
          <Link href="/" className="text-sm text-night-400 hover:text-white transition-colors">
            ← Back to home
          </Link>
        </nav>

        <div className="max-w-3xl mx-auto px-4 py-12">
          {/* Step indicator */}
          <div className="flex items-center justify-between mb-10">
            {STEPS.map((s, idx) => (
              <div key={s.num} className="flex items-center flex-1 last:flex-none">
                <div className="flex flex-col items-center">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${
                      step > s.num
                        ? 'bg-mint-500 text-white'
                        : step === s.num
                          ? 'bg-primary-500 text-white shadow-glow-indigo'
                          : 'bg-white/10 text-night-400'
                    }`}
                  >
                    {step > s.num ? <Check size={16} /> : <s.icon size={16} />}
                  </div>
                  <span
                    className={`text-xs mt-1.5 font-medium hidden md:block ${
                      step >= s.num ? 'text-white' : 'text-night-500'
                    }`}
                  >
                    {s.label}
                  </span>
                </div>
                {idx < STEPS.length - 1 && (
                  <div
                    className={`flex-1 h-px mx-3 mb-4 md:mb-0 transition-colors ${
                      step > s.num ? 'bg-mint-500' : 'bg-white/10'
                    }`}
                  />
                )}
              </div>
            ))}
          </div>

          <div className="bg-night-900 border border-white/10 rounded-2xl p-8">
            {/* ─── Step 1: Select Room ─── */}
            {step === 1 && (
              <div className="animate-fade-in">
                <h2 className="text-2xl font-display font-bold mb-1">Select a Room</h2>
                <p className="text-night-400 text-sm mb-6">
                  Choose the perfect space for your session.
                </p>
                <div className="space-y-3">
                  {studios?.map((s) => (
                    <button
                      key={s.id}
                      onClick={() => {
                        setSelectedStudio(s.id)
                        setStep(2)
                      }}
                      className="w-full text-left p-5 border border-white/10 rounded-xl hover:border-primary-500 hover:bg-white/5 transition-all group"
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="font-semibold text-white group-hover:text-primary-400 transition-colors">
                            {s.name}
                          </h3>
                          {s.description && (
                            <p className="text-sm text-night-400 mt-0.5">{s.description}</p>
                          )}
                          <div className="flex items-center gap-3 mt-2 text-xs text-night-500">
                            <span className="flex items-center gap-1">
                              <DollarSign size={11} />${s.hourlyRate}/hr
                            </span>
                            {s._count.reviews > 0 && <span>{s._count.reviews} reviews</span>}
                          </div>
                        </div>
                        <ChevronRight
                          size={18}
                          className="text-night-500 group-hover:text-primary-400 transition-colors"
                        />
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* ─── Step 2: Choose Time ─── */}
            {step === 2 && (
              <div className="animate-fade-in">
                <h2 className="text-2xl font-display font-bold mb-1">Choose Your Time</h2>
                <p className="text-night-400 text-sm mb-6">Pick a date and available time slot.</p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  <div>
                    <label className="label" htmlFor="duration">
                      Duration
                    </label>
                    <select
                      id="duration"
                      value={duration}
                      onChange={(e) => setDuration(Number(e.target.value))}
                      className="input"
                    >
                      <option value={60}>1 hour</option>
                      <option value={120}>2 hours</option>
                      <option value={180}>3 hours</option>
                      <option value={240}>4 hours</option>
                      <option value={480}>Full day (8 hours)</option>
                    </select>
                  </div>
                  <div>
                    <label className="label" htmlFor="session-date">
                      Date
                    </label>
                    <input
                      id="session-date"
                      type="date"
                      value={selectedDate}
                      onChange={(e) => setSelectedDate(e.target.value)}
                      min={format(new Date(), 'yyyy-MM-dd')}
                      className="input"
                    />
                  </div>
                </div>

                {selectedDate && (
                  <div>
                    <h3 className="text-sm font-medium text-night-300 mb-3 flex items-center gap-2">
                      <Clock size={14} /> Available Slots
                    </h3>
                    <div className="grid grid-cols-3 md:grid-cols-4 gap-2">
                      {availableSlots?.length === 0 ? (
                        <p className="col-span-full text-night-500 text-center py-8 text-sm">
                          No available slots for this date
                        </p>
                      ) : (
                        availableSlots?.map((slot) => (
                          <button
                            key={slot.startTime.toString()}
                            onClick={() => {
                              setSelectedSlot({
                                start: slot.startTime.toString(),
                                end: slot.endTime.toString(),
                              })
                              setStep(3)
                            }}
                            className="py-2.5 border border-white/10 rounded-lg text-sm font-medium hover:border-primary-500 hover:bg-primary-500/10 hover:text-primary-400 transition-all"
                          >
                            {format(parseISO(slot.startTime.toString()), 'h:mm a')}
                          </button>
                        ))
                      )}
                    </div>
                  </div>
                )}

                <button onClick={() => setStep(1)} className="btn-ghost mt-6 text-sm">
                  ← Back
                </button>
              </div>
            )}

            {/* ─── Step 3: Client Info ─── */}
            {step === 3 && (
              <div className="animate-fade-in">
                <h2 className="text-2xl font-display font-bold mb-1">Your Information</h2>
                <p className="text-night-400 text-sm mb-6">
                  We'll use this to confirm your booking.
                </p>

                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="label">
                        Full Name <span className="text-orange-400">*</span>
                      </label>
                      <input
                        type="text"
                        value={clientInfo.name}
                        onChange={(e) => setClientInfo({ ...clientInfo, name: e.target.value })}
                        className="input"
                        placeholder="Your name"
                      />
                    </div>
                    <div>
                      <label className="label">
                        Email <span className="text-orange-400">*</span>
                      </label>
                      <input
                        type="email"
                        value={clientInfo.email}
                        onChange={(e) => setClientInfo({ ...clientInfo, email: e.target.value })}
                        className="input"
                        placeholder="you@example.com"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="label">
                      Phone <span className="text-night-500 text-xs">(optional)</span>
                    </label>
                    <input
                      type="tel"
                      value={clientInfo.phone}
                      onChange={(e) => setClientInfo({ ...clientInfo, phone: e.target.value })}
                      className="input"
                      placeholder="+1 (555) 000-0000"
                    />
                  </div>
                  <div>
                    <label className="label flex items-center gap-1.5">
                      <FileText size={13} /> Session Notes{' '}
                      <span className="text-night-500 text-xs">(optional)</span>
                    </label>
                    <textarea
                      value={clientInfo.notes}
                      onChange={(e) => setClientInfo({ ...clientInfo, notes: e.target.value })}
                      className="input resize-none h-24"
                      placeholder="Equipment needs, special requests, genre..."
                    />
                  </div>
                </div>

                <div className="flex gap-3 mt-6">
                  <button onClick={() => setStep(2)} className="btn-ghost text-sm">
                    ← Back
                  </button>
                  <button
                    onClick={() => setStep(4)}
                    disabled={!clientInfo.name || !clientInfo.email}
                    className="btn-primary"
                  >
                    Continue <ChevronRight size={15} />
                  </button>
                </div>
              </div>
            )}

            {/* ─── Step 4: Confirm ─── */}
            {step === 4 && studio && selectedSlot && (
              <div className="animate-fade-in">
                <h2 className="text-2xl font-display font-bold mb-1">Confirm Booking</h2>
                <p className="text-night-400 text-sm mb-6">
                  Review your details before proceeding to payment.
                </p>

                <div className="bg-white/5 border border-white/10 rounded-xl p-5 space-y-3 mb-6">
                  {[
                    { label: 'Room', value: studio.name },
                    {
                      label: 'Date',
                      value: format(parseISO(selectedSlot.start), 'EEEE, MMMM d, yyyy'),
                    },
                    {
                      label: 'Time',
                      value: `${format(parseISO(selectedSlot.start), 'h:mm a')} – ${format(parseISO(selectedSlot.end), 'h:mm a')}`,
                    },
                    {
                      label: 'Duration',
                      value: `${duration / 60} hour${duration > 60 ? 's' : ''}`,
                    },
                    { label: 'Rate', value: `$${studio.hourlyRate}/hr` },
                    { label: 'Name', value: clientInfo.name },
                    { label: 'Email', value: clientInfo.email },
                  ].map((row) => (
                    <div key={row.label} className="flex justify-between text-sm">
                      <span className="text-night-400">{row.label}</span>
                      <span className="font-medium text-white">{row.value}</span>
                    </div>
                  ))}
                  <div className="pt-3 border-t border-white/10 flex justify-between">
                    <span className="font-semibold">Total</span>
                    <span className="text-xl font-bold text-primary-400">${total.toFixed(2)}</span>
                  </div>
                  {studio.requireDeposit && (
                    <div className="flex justify-between text-sm text-night-400">
                      <span>Due today (deposit)</span>
                      <span className="text-mint-400 font-medium">${deposit.toFixed(2)}</span>
                    </div>
                  )}
                </div>

                <div className="flex gap-3">
                  <button onClick={() => setStep(3)} className="btn-ghost text-sm">
                    ← Back
                  </button>
                  <button
                    onClick={handleSubmit}
                    disabled={createBookingMutation.isLoading}
                    className="btn-primary flex-1 justify-center text-base py-3"
                  >
                    {createBookingMutation.isLoading
                      ? 'Creating booking…'
                      : 'Continue to Payment →'}
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  )
}

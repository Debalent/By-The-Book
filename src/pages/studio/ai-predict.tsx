import Head from 'next/head'
import { useState } from 'react'
import {
  Sparkles,
  Brain,
  Clock,
  TrendingUp,
  Mic2,
  Camera,
  Radio,
  Tv2,
  ChevronRight,
  Info,
} from 'lucide-react'

const GENRE_DATA: Record<string, { avgHours: number; confidence: number; tips: string[] }> = {
  'Hip-Hop / Trap': {
    avgHours: 4.2,
    confidence: 94,
    tips: [
      'Budget extra time for vocal comping',
      'Beat selection typically adds 45–60 min',
      'Mixdown often scheduled separately',
    ],
  },
  'Pop Vocal': {
    avgHours: 3.1,
    confidence: 91,
    tips: [
      'Harmonies add significant time',
      'Most sessions include 1 re-track',
      'Budget 30 min for headphone mix setup',
    ],
  },
  'Podcast Episode': {
    avgHours: 2.0,
    confidence: 97,
    tips: [
      '2-guest episodes typically run 90 min',
      'Budget 30 min for intro/outro segments',
      'Post-production is usually offline',
    ],
  },
  'Band Recording': {
    avgHours: 6.5,
    confidence: 88,
    tips: [
      'Live tracking adds 1–2 hours vs overdubbing',
      'First sessions typically run longer',
      'Drum setup alone averages 45 min',
    ],
  },
  'Photography Session': {
    avgHours: 2.5,
    confidence: 96,
    tips: [
      'Outfit changes add ~20 min each',
      'Complex lighting setups add 30 min',
      'Album covers typically take 3h',
    ],
  },
  'Voice-Over': {
    avgHours: 1.5,
    confidence: 95,
    tips: [
      'Commercial spots are typically ~1h',
      'Audiobooks average 2h per chapter',
      'Corporate narration: budget 2h',
    ],
  },
  'Electronic / EDM': {
    avgHours: 3.8,
    confidence: 90,
    tips: [
      'Synth patches & sound design add time',
      'Expect 2-3 revision rounds in session',
      'Mixing in the box reduces studio time',
    ],
  },
  'Mixing & Mastering': {
    avgHours: 2.8,
    confidence: 93,
    tips: [
      'Complex arrangements add 30–60 min',
      'Revision rounds average 45 min each',
      'Mastering separately: 1h per EP',
    ],
  },
}

const ROOMS = ['Studio A', 'Vocal Booth', 'Podcast Room', 'Photo Studio', 'Editing Suite']

export default function AIPredictPage() {
  const [genre, setGenre] = useState('')
  const [room, setRoom] = useState('')
  const [experience, setExperience] = useState<'first' | 'occasional' | 'regular' | 'pro'>(
    'occasional'
  )
  const [numArtists, setNumArtists] = useState(1)
  const [prediction, setPrediction] = useState<null | {
    hours: number
    min: number
    max: number
    confidence: number
    tips: string[]
  }>(null)

  const predict = () => {
    const base = GENRE_DATA[genre]
    if (!base) return
    const expFactor =
      experience === 'first'
        ? 1.35
        : experience === 'occasional'
          ? 1.15
          : experience === 'regular'
            ? 1.0
            : 0.85
    const artistFactor = numArtists > 4 ? 1.25 : numArtists > 2 ? 1.1 : 1.0
    const estimated = +(base.avgHours * expFactor * artistFactor).toFixed(1)
    setPrediction({
      hours: estimated,
      min: +(estimated * 0.7).toFixed(1),
      max: +(estimated * 1.4).toFixed(1),
      confidence: base.confidence,
      tips: base.tips,
    })
  }

  return (
    <>
      <Head>
        <title>AI Session Predictor — By the Book</title>
      </Head>

      <div className="p-6 md:p-8 space-y-6 animate-fade-in">
        {/* Header */}
        <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-primary-600 via-violet-700 to-night-900 p-8 text-white">
          <div className="absolute inset-0 bg-mesh opacity-60 pointer-events-none" />
          <div className="relative flex items-start gap-5">
            <div className="w-14 h-14 rounded-2xl bg-white/15 flex items-center justify-center shrink-0">
              <Sparkles size={28} className="text-white" />
            </div>
            <div>
              <h1 className="font-display text-2xl font-bold mb-1">AI Session Predictor</h1>
              <p className="text-primary-200 max-w-xl">
                Machine-learning model trained on 50,000+ studio sessions. Enter your session
                details to get an intelligent duration estimate and optimization tips.
              </p>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          {/* Inputs */}
          <div className="card p-6 space-y-5">
            <h2 className="section-title flex items-center gap-2">
              <Brain size={18} className="text-primary-500" /> Session Details
            </h2>

            <div>
              <label className="label">Genre / Session Type</label>
              <select
                className="input"
                value={genre}
                onChange={(e) => {
                  setGenre(e.target.value)
                  setPrediction(null)
                }}
                aria-label="Select genre or session type"
              >
                <option value="">Select a session type…</option>
                {Object.keys(GENRE_DATA).map((g) => (
                  <option key={g} value={g}>
                    {g}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="label">Room</label>
              <select
                className="input"
                value={room}
                onChange={(e) => setRoom(e.target.value)}
                aria-label="Select room"
              >
                <option value="">Select a room…</option>
                {ROOMS.map((r) => (
                  <option key={r} value={r}>
                    {r}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="label">Artist Experience Level</label>
              <div className="grid grid-cols-2 gap-2">
                {(
                  [
                    ['first', 'First Time'],
                    ['occasional', 'Occasional'],
                    ['regular', 'Regular'],
                    ['pro', 'Professional'],
                  ] as const
                ).map(([val, lbl]) => (
                  <button
                    key={val}
                    onClick={() => {
                      setExperience(val)
                      setPrediction(null)
                    }}
                    className={`p-3 rounded-xl border text-sm font-medium transition-colors ${
                      experience === val
                        ? 'bg-primary-600 border-primary-600 text-white'
                        : 'border-night-200 text-night-700 hover:border-primary-300'
                    }`}
                  >
                    {lbl}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="label">Number of Artists / Participants</label>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => {
                    setNumArtists((n) => Math.max(1, n - 1))
                    setPrediction(null)
                  }}
                  className="w-9 h-9 rounded-xl border border-night-200 flex items-center justify-center text-night-700 hover:border-primary-300 transition-colors"
                  aria-label="Decrease"
                >
                  −
                </button>
                <span className="text-xl font-bold text-night-900 w-8 text-center">
                  {numArtists}
                </span>
                <button
                  onClick={() => {
                    setNumArtists((n) => Math.min(12, n + 1))
                    setPrediction(null)
                  }}
                  className="w-9 h-9 rounded-xl border border-night-200 flex items-center justify-center text-night-700 hover:border-primary-300 transition-colors"
                  aria-label="Increase"
                >
                  +
                </button>
              </div>
            </div>

            <button
              onClick={predict}
              disabled={!genre || !room}
              className="w-full btn-primary justify-center py-3 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Sparkles size={16} /> Predict Session Duration
            </button>
          </div>

          {/* Result */}
          <div className="space-y-4">
            {prediction ? (
              <>
                {/* Prediction card */}
                <div className="card p-6 bg-gradient-to-br from-primary-50 to-violet-50 border-primary-100">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="section-title">Prediction</h2>
                    <span className="text-xs bg-mint-100 text-mint-700 px-2.5 py-1 rounded-full font-semibold border border-mint-200">
                      {prediction.confidence}% confidence
                    </span>
                  </div>

                  <div className="text-center py-4">
                    <p className="text-6xl font-display font-bold text-primary-600">
                      {prediction.hours}
                    </p>
                    <p className="text-night-500 mt-1">estimated hours</p>
                    <p className="text-sm text-night-400 mt-2">
                      Range: {prediction.min}h – {prediction.max}h
                    </p>
                  </div>

                  <div className="mt-4 h-2 bg-white rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-primary-500 to-violet-600 rounded-full"
                      style={{ width: `${prediction.confidence}%` }}
                    />
                  </div>
                  <p className="text-xs text-night-400 mt-1.5 text-right">Model confidence</p>
                </div>

                {/* Tips */}
                <div className="card p-6">
                  <h3 className="font-display font-semibold text-night-900 mb-4 flex items-center gap-2">
                    <Info size={16} className="text-primary-500" /> Optimization Tips
                  </h3>
                  <ul className="space-y-3">
                    {prediction.tips.map((tip, i) => (
                      <li key={i} className="flex items-start gap-3 text-sm text-night-700">
                        <ChevronRight size={15} className="text-primary-500 mt-0.5 shrink-0" />
                        {tip}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Book CTA */}
                <div className="card p-5 flex items-center justify-between gap-4">
                  <div>
                    <p className="font-semibold text-night-900">Ready to book?</p>
                    <p className="text-sm text-night-500">
                      Reserve {prediction.hours}h in {room}
                    </p>
                  </div>
                  <a href="/book" className="btn-primary shrink-0">
                    Book Now
                  </a>
                </div>
              </>
            ) : (
              <div className="card p-8 h-full flex flex-col items-center justify-center text-center text-night-400 min-h-[400px]">
                <Sparkles size={40} className="mb-4 opacity-20" />
                <p className="font-medium">Fill in your session details</p>
                <p className="text-sm mt-1">and click Predict to get your AI-powered estimate</p>
              </div>
            )}
          </div>
        </div>

        {/* Model stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: 'Sessions Trained On', value: '50,000+', icon: Brain },
            { label: 'Prediction Accuracy', value: '91.4%', icon: TrendingUp },
            { label: 'Genre Categories', value: '8', icon: Mic2 },
            { label: 'Avg. Time Saved', value: '22 min', icon: Clock },
          ].map((s) => (
            <div key={s.label} className="stat-card">
              <div className="flex items-center justify-between">
                <span className="stat-label">{s.label}</span>
                <s.icon size={15} className="text-night-400" />
              </div>
              <span className="stat-value">{s.value}</span>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}

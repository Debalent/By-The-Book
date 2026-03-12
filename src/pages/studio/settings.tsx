import Head from 'next/head'
import { useState } from 'react'
import { Building2, Bell, CreditCard, Shield, Palette, Clock, Save, Check } from 'lucide-react'
import Image from 'next/image'

type Tab = 'studio' | 'hours' | 'payments' | 'notifications' | 'appearance' | 'security'

const TABS: { id: Tab; label: string; icon: any }[] = [
  { id: 'studio', label: 'Studio Profile', icon: Building2 },
  { id: 'hours', label: 'Business Hours', icon: Clock },
  { id: 'payments', label: 'Payments & Rates', icon: CreditCard },
  { id: 'notifications', label: 'Notifications', icon: Bell },
  { id: 'appearance', label: 'Appearance', icon: Palette },
  { id: 'security', label: 'Security', icon: Shield },
]

const DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']

function SaveBanner({ onSave }: { onSave: () => void }) {
  return (
    <div className="flex justify-end mt-6">
      <button onClick={onSave} className="btn-primary">
        <Save size={15} /> Save Changes
      </button>
    </div>
  )
}

function StudioTab({ saved }: { saved: boolean }) {
  return (
    <div className="space-y-6">
      <div className="card p-6">
        <h3 className="font-semibold text-night-900 mb-4">Studio Information</h3>
        <div className="flex items-center gap-6 mb-6">
          <div className="relative w-20 h-20 rounded-2xl overflow-hidden ring-2 ring-night-100">
            <Image src="/images/logo.png" alt="Logo" fill className="object-contain" />
          </div>
          <div>
            <button className="btn-secondary text-sm px-4 py-2">Change Logo</button>
            <p className="text-xs text-night-400 mt-1">PNG, JPG up to 2 MB</p>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="label">Studio Name</label>
            <input className="input" defaultValue="SoundForge Studios" />
          </div>
          <div>
            <label className="label">Contact Email</label>
            <input className="input" defaultValue="balentinetechsolutions@gmail.com" />
          </div>
          <div>
            <label className="label">Phone Number</label>
            <input className="input" defaultValue="+1 (555) 200-4444" />
          </div>
          <div>
            <label className="label">Website</label>
            <input className="input" defaultValue="https://bythebook.studio" />
          </div>
          <div className="md:col-span-2">
            <label className="label">Studio Bio</label>
            <textarea
              className="input resize-none h-24"
              defaultValue="Professional recording, podcast, and photo studio in the heart of downtown. State-of-the-art equipment, expert engineers, and a creative space that brings your vision to life."
            />
          </div>
          <div>
            <label className="label">City</label>
            <input className="input" defaultValue="Atlanta, GA" />
          </div>
          <div>
            <label className="label">Timezone</label>
            <select className="input">
              <option>America/New_York (EST)</option>
              <option>America/Chicago (CST)</option>
              <option>America/Los_Angeles (PST)</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  )
}

function HoursTab() {
  const [hours, setHours] = useState(
    DAYS.map((d) => ({ day: d, open: d !== 'Sunday', from: '09:00', to: '21:00' }))
  )
  return (
    <div className="card p-6">
      <h3 className="font-semibold text-night-900 mb-4">Business Hours</h3>
      <div className="space-y-3">
        {hours.map((h, i) => (
          <div key={h.day} className="flex items-center gap-4">
            <div className="w-28 text-sm font-medium text-night-700">{h.day}</div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={h.open}
                onChange={() =>
                  setHours((prev) => {
                    const next = [...prev]
                    next[i] = { ...next[i], open: !next[i].open }
                    return next
                  })
                }
                className="sr-only peer"
              />
              <div className="w-9 h-5 bg-night-200 peer-checked:bg-primary-500 rounded-full transition-colors" />
              <div className="absolute left-0.5 top-0.5 w-4 h-4 bg-white rounded-full shadow transition-transform peer-checked:translate-x-4" />
            </label>
            {h.open ? (
              <div className="flex items-center gap-2 flex-1">
                <input
                  type="time"
                  value={h.from}
                  onChange={(e) =>
                    setHours((prev) => {
                      const next = [...prev]
                      next[i] = { ...next[i], from: e.target.value }
                      return next
                    })
                  }
                  className="input py-1.5 text-sm w-32"
                />
                <span className="text-night-400 text-sm">to</span>
                <input
                  type="time"
                  value={h.to}
                  onChange={(e) =>
                    setHours((prev) => {
                      const next = [...prev]
                      next[i] = { ...next[i], to: e.target.value }
                      return next
                    })
                  }
                  className="input py-1.5 text-sm w-32"
                />
              </div>
            ) : (
              <span className="text-night-400 text-sm">Closed</span>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

function PaymentsTab() {
  return (
    <div className="space-y-6">
      <div className="card p-6">
        <h3 className="font-semibold text-night-900 mb-4">Stripe Integration</h3>
        <div className="flex items-center gap-3 p-4 bg-mint-50 border border-mint-200 rounded-xl mb-4">
          <Check size={16} className="text-mint-600" />
          <span className="text-sm font-medium text-mint-700">
            Stripe account connected — acct_1ExampleXYZ
          </span>
        </div>
        <button className="btn-secondary text-sm">Disconnect Stripe</button>
      </div>
      <div className="card p-6">
        <h3 className="font-semibold text-night-900 mb-4">Default Rates</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="label">Deposit Percentage</label>
            <div className="relative">
              <input className="input pr-8" defaultValue="25" type="number" min={0} max={100} />
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-night-400">%</span>
            </div>
          </div>
          <div>
            <label className="label">Cancellation Window (hours)</label>
            <input className="input" defaultValue="24" type="number" min={0} />
          </div>
          <div>
            <label className="label">Late Cancellation Fee</label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-night-400">$</span>
              <input className="input pl-7" defaultValue="50" type="number" min={0} />
            </div>
          </div>
          <div>
            <label className="label">Tax Rate</label>
            <div className="relative">
              <input className="input pr-8" defaultValue="8.25" type="number" step={0.01} />
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-night-400">%</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function NotificationsTab() {
  const prefs = [
    { label: 'New booking created', email: true, sms: true },
    { label: 'Booking cancelled', email: true, sms: false },
    { label: 'Payment received', email: true, sms: true },
    { label: 'Booking reminder (24 hr)', email: true, sms: true },
    { label: 'New client registration', email: false, sms: false },
    { label: 'Equipment issue reported', email: true, sms: false },
  ]
  return (
    <div className="card p-6">
      <h3 className="font-semibold text-night-900 mb-4">Notification Preferences</h3>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-night-500 border-b border-night-100">
              <th className="pb-3 font-medium">Event</th>
              <th className="pb-3 font-medium text-center">Email</th>
              <th className="pb-3 font-medium text-center">SMS</th>
            </tr>
          </thead>
          <tbody>
            {prefs.map((p) => (
              <tr key={p.label} className="border-b border-night-50 last:border-0">
                <td className="py-3 text-night-700">{p.label}</td>
                <td className="py-3 text-center">
                  <input
                    type="checkbox"
                    defaultChecked={p.email}
                    className="accent-primary-500 w-4 h-4"
                  />
                </td>
                <td className="py-3 text-center">
                  <input
                    type="checkbox"
                    defaultChecked={p.sms}
                    className="accent-primary-500 w-4 h-4"
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

function AppearanceTab() {
  const themes = [
    { id: 'light', label: 'Light', bg: 'bg-white border-2', text: 'text-night-900' },
    {
      id: 'dark',
      label: 'Dark',
      bg: 'bg-night-900 border-2 border-transparent',
      text: 'text-white',
    },
    {
      id: 'auto',
      label: 'System',
      bg: 'bg-gradient-to-r from-white to-night-900 border-2 border-transparent',
      text: 'text-night-900',
    },
  ]
  const [theme, setTheme] = useState('light')
  const accents = ['#6366f1', '#7c3aed', '#34d399', '#f97316', '#ec4899', '#0ea5e9']
  const [accent, setAccent] = useState('#6366f1')
  return (
    <div className="space-y-6">
      <div className="card p-6">
        <h3 className="font-semibold text-night-900 mb-4">Theme</h3>
        <div className="flex gap-3">
          {themes.map((t) => (
            <button
              key={t.id}
              onClick={() => setTheme(t.id)}
              className={`flex-1 h-16 rounded-xl flex items-center justify-center font-medium text-sm transition-all ${t.bg} ${
                theme === t.id ? 'border-primary-500 ring-2 ring-primary-200' : 'border-night-200'
              } ${t.text}`}
            >
              {t.label}
            </button>
          ))}
        </div>
      </div>
      <div className="card p-6">
        <h3 className="font-semibold text-night-900 mb-4">Accent Color</h3>
        <div className="flex gap-3">
          {accents.map((c) => (
            <button
              key={c}
              onClick={() => setAccent(c)}
              style={{ backgroundColor: c }}
              className={`w-10 h-10 rounded-full transition-transform hover:scale-110 ${
                accent === c ? 'ring-2 ring-offset-2 ring-night-400 scale-110' : ''
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

function SecurityTab() {
  return (
    <div className="space-y-6">
      <div className="card p-6">
        <h3 className="font-semibold text-night-900 mb-4">Change Password</h3>
        <div className="space-y-4 max-w-md">
          <div>
            <label className="label">Current Password</label>
            <input type="password" className="input" placeholder="••••••••" />
          </div>
          <div>
            <label className="label">New Password</label>
            <input type="password" className="input" placeholder="••••••••" />
          </div>
          <div>
            <label className="label">Confirm New Password</label>
            <input type="password" className="input" placeholder="••••••••" />
          </div>
          <button className="btn-primary">Update Password</button>
        </div>
      </div>
      <div className="card p-6">
        <h3 className="font-semibold text-night-900 mb-2">Two-Factor Authentication</h3>
        <p className="text-sm text-night-500 mb-4">
          Add an extra layer of security to your account.
        </p>
        <button className="btn-secondary text-sm">Enable 2FA</button>
      </div>
      <div className="card p-6">
        <h3 className="font-semibold text-night-900 mb-2">Active Sessions</h3>
        <div className="space-y-3 text-sm">
          {[
            { device: 'Chrome on Windows', ip: '128.101.72.5', active: true },
            { device: 'Safari on iPhone', ip: '192.168.1.22', active: false },
          ].map((s) => (
            <div
              key={s.ip}
              className="flex items-center justify-between py-2 border-b border-night-50 last:border-0"
            >
              <div>
                <p className="font-medium text-night-700">{s.device}</p>
                <p className="text-night-400">{s.ip}</p>
              </div>
              {s.active ? (
                <span className="badge badge-confirmed">Current</span>
              ) : (
                <button className="text-xs text-red-500 hover:underline">Revoke</button>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default function SettingsPage() {
  const [tab, setTab] = useState<Tab>('studio')
  const [saved, setSaved] = useState(false)

  const handleSave = () => {
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  return (
    <>
      <Head>
        <title>Settings — By the Book</title>
      </Head>

      <div className="p-6 md:p-8 animate-fade-in">
        {/* Header */}
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h1 className="page-title">Settings</h1>
            <p className="text-night-500 text-sm mt-1">
              Manage your studio preferences and account
            </p>
          </div>
          {saved && (
            <div className="flex items-center gap-2 text-sm font-medium text-mint-600 animate-fade-in">
              <Check size={15} /> Saved!
            </div>
          )}
        </div>

        <div className="flex gap-6">
          {/* Sidebar tabs */}
          <nav className="w-52 flex-shrink-0">
            <ul className="space-y-1">
              {TABS.map((t) => (
                <li key={t.id}>
                  <button
                    onClick={() => setTab(t.id)}
                    className={`sidebar-link w-full ${tab === t.id ? 'sidebar-link-active' : ''}`}
                  >
                    <t.icon size={16} />
                    {t.label}
                  </button>
                </li>
              ))}
            </ul>
          </nav>

          {/* Content */}
          <div className="flex-1">
            {tab === 'studio' && <StudioTab saved={saved} />}
            {tab === 'hours' && <HoursTab />}
            {tab === 'payments' && <PaymentsTab />}
            {tab === 'notifications' && <NotificationsTab />}
            {tab === 'appearance' && <AppearanceTab />}
            {tab === 'security' && <SecurityTab />}
            <SaveBanner onSave={handleSave} />
          </div>
        </div>
      </div>
    </>
  )
}

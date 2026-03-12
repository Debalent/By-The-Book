import Head from 'next/head'
import {
  DollarSign,
  TrendingUp,
  ArrowUpRight,
  CreditCard,
  RefreshCw,
  CheckCircle,
} from 'lucide-react'

const TRANSACTIONS = [
  {
    id: 'txn_001',
    client: 'Marcus Webb',
    room: 'Studio A',
    date: 'Mar 11, 2026',
    amount: 450,
    type: 'Full Payment',
    status: 'succeeded',
    avatar: 'MW',
  },
  {
    id: 'txn_002',
    client: 'Layla Rivers',
    room: 'Podcast Room',
    date: 'Mar 11, 2026',
    amount: 90,
    type: 'Deposit',
    status: 'succeeded',
    avatar: 'LR',
  },
  {
    id: 'txn_003',
    client: 'Jordan Park',
    room: 'Vocal Booth',
    date: 'Mar 10, 2026',
    amount: 200,
    type: 'Full Payment',
    status: 'succeeded',
    avatar: 'JP',
  },
  {
    id: 'txn_004',
    client: 'Nadia Flores',
    room: 'Photo Studio',
    date: 'Mar 9, 2026',
    amount: 180,
    type: 'Deposit',
    status: 'succeeded',
    avatar: 'NF',
  },
  {
    id: 'txn_005',
    client: 'Devon Cross',
    room: 'Studio A',
    date: 'Mar 8, 2026',
    amount: 450,
    type: 'Full Payment',
    status: 'succeeded',
    avatar: 'DC',
  },
  {
    id: 'txn_006',
    client: 'Priya Menon',
    room: 'Podcast Room',
    date: 'Mar 7, 2026',
    amount: 45,
    type: 'Deposit',
    status: 'succeeded',
    avatar: 'PM',
  },
  {
    id: 'txn_007',
    client: 'Alex Torres',
    room: 'Studio A',
    date: 'Mar 6, 2026',
    amount: 600,
    type: 'Full Payment',
    status: 'succeeded',
    avatar: 'AT',
  },
  {
    id: 'txn_008',
    client: 'Sam Nguyen',
    room: 'Photo Studio',
    date: 'Mar 4, 2026',
    amount: 90,
    type: 'Refund',
    status: 'refunded',
    avatar: 'SN',
  },
]

const STATUS_BADGE: Record<string, string> = {
  succeeded: 'badge-confirmed',
  pending: 'badge-pending',
  refunded: 'badge-cancelled',
  failed: 'badge-cancelled',
}

export default function PaymentsPage() {
  const totalRevenue = TRANSACTIONS.filter((t) => t.status === 'succeeded').reduce(
    (s, t) => s + t.amount,
    0
  )
  const deposits = TRANSACTIONS.filter((t) => t.type === 'Deposit').length
  const refunds = TRANSACTIONS.filter((t) => t.status === 'refunded').reduce(
    (s, t) => s + t.amount,
    0
  )

  return (
    <>
      <Head>
        <title>Payments — By the Book</title>
      </Head>

      <div className="p-6 md:p-8 space-y-6 animate-fade-in">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="page-title">Payments</h1>
            <p className="text-night-500 text-sm mt-1">
              Powered by Stripe. All transactions secured.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1.5 px-3 py-1.5 bg-mint-50 border border-mint-200 rounded-lg text-xs font-medium text-mint-700">
              <CheckCircle size={13} /> Stripe Connected
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            {
              label: 'Revenue (30 days)',
              value: `$${totalRevenue.toLocaleString()}`,
              icon: DollarSign,
              color: 'text-mint-500',
            },
            {
              label: 'Deposits Collected',
              value: deposits.toString(),
              icon: TrendingUp,
              color: 'text-primary-500',
            },
            { label: 'Avg Transaction', value: '$271', icon: CreditCard, color: 'text-violet-500' },
            {
              label: 'Total Refunds',
              value: `-$${refunds}`,
              icon: RefreshCw,
              color: 'text-red-400',
            },
          ].map((s) => (
            <div key={s.label} className="stat-card">
              <div className="flex items-center justify-between">
                <span className="stat-label">{s.label}</span>
                <s.icon size={16} className={s.color} />
              </div>
              <span className="stat-value">{s.value}</span>
            </div>
          ))}
        </div>

        {/* Transaction table */}
        <div className="card overflow-hidden">
          <div className="flex items-center justify-between px-6 py-4 border-b border-night-100">
            <h2 className="section-title">Recent Transactions</h2>
            <span className="text-xs text-night-400">Showing last 30 days</span>
          </div>
          <table className="w-full text-sm">
            <thead className="bg-night-50">
              <tr>
                {['Client', 'Room', 'Date', 'Type', 'Amount', 'Status'].map((h) => (
                  <th
                    key={h}
                    className="px-6 py-3 text-left text-xs font-semibold text-night-500 uppercase tracking-wider"
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-night-50">
              {TRANSACTIONS.map((t) => (
                <tr key={t.id} className="hover:bg-night-50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-primary-500 to-violet-600 flex items-center justify-center text-white text-xs font-bold shrink-0">
                        {t.avatar}
                      </div>
                      <span className="font-medium text-night-900">{t.client}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-night-600">{t.room}</td>
                  <td className="px-6 py-4 text-night-600">{t.date}</td>
                  <td className="px-6 py-4">
                    <span
                      className={`text-xs font-medium ${
                        t.type === 'Refund'
                          ? 'text-red-500'
                          : t.type === 'Deposit'
                            ? 'text-orange-600'
                            : 'text-night-600'
                      }`}
                    >
                      {t.type}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`font-bold ${t.status === 'refunded' ? 'text-red-500' : 'text-night-900'}`}
                    >
                      {t.status === 'refunded' ? '-' : '+'}${t.amount}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`badge ${STATUS_BADGE[t.status]}`}>{t.status}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  )
}

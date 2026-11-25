import { useState } from 'react'
import { SHIFT_DAYS, shifts, type Staff, type TimeOff } from '../data'
import { Badge, GhostButton, Icon, inputCls } from '../components/ui'

export default function HR({
  staffList,
  timeOffList,
  onTimeOff,
  notify,
}: {
  staffList: Staff[]
  timeOffList: TimeOff[]
  onTimeOff: (list: TimeOff[]) => void
  notify: (msg: string) => void
}) {
  const [q, setQ] = useState('')
  const [loc, setLoc] = useState('All')
  const [shiftView, setShiftView] = useState<'Campbell River' | 'Comox'>('Campbell River')

  const filtered = staffList.filter(
    (s) =>
      (loc === 'All' || s.location === loc || s.location === 'Both') &&
      (q.trim() === '' || `${s.name} ${s.role}`.toLowerCase().includes(q.toLowerCase())),
  )
  const onShift = staffList.filter((s) => s.location === shiftView || s.location === 'Both')

  function decide(req: TimeOff, status: 'Approved' | 'Denied') {
    onTimeOff(timeOffList.map((t) => (t.id === req.id ? { ...t, status } : t)))
    notify(`${req.staff}'s time off ${status.toLowerCase()} (${req.from} – ${req.to})`)
  }

  const shiftTone = (code: string) =>
    code === 'Off' || code === 'Leave'
      ? 'bg-slate-50 text-slate-400'
      : code === 'Delivery'
        ? 'bg-violet-50 text-violet-700'
        : 'bg-mint text-teal-dark'

  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-xl font-bold text-ink sm:text-2xl">Human Resources</h1>
        <p className="text-sm text-slate-500">Staff across both showrooms, the weekly shift grid and time-off requests.</p>
      </div>

      <div className="flex flex-wrap gap-2">
        <div className="relative min-w-52 flex-1 sm:max-w-xs">
          <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
            <Icon name="search" size={17} />
          </span>
          <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search staff…" className={`${inputCls} pl-9`} />
        </div>
        <select value={loc} onChange={(e) => setLoc(e.target.value)} className={`${inputCls} w-auto`} aria-label="Location">
          <option>All</option>
          <option>Campbell River</option>
          <option>Comox</option>
        </select>
      </div>

      <div className="overflow-x-auto rounded-2xl border border-slate-200 bg-white shadow-sm">
        <table className="w-full min-w-[640px] text-left text-sm">
          <thead>
            <tr className="border-b border-slate-100 text-xs uppercase tracking-wide text-slate-400">
              <th className="px-4 py-3 font-semibold">Name</th>
              <th className="px-4 py-3 font-semibold">Role</th>
              <th className="px-4 py-3 font-semibold">Location</th>
              <th className="px-4 py-3 font-semibold">Phone</th>
              <th className="px-4 py-3 font-semibold">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {filtered.map((s) => (
              <tr key={s.id} className="hover:bg-cream/60">
                <td className="px-4 py-2.5">
                  <span className="block font-medium text-ink">{s.name}</span>
                  <span className="text-xs text-slate-400">{s.email}</span>
                </td>
                <td className="px-4 py-2.5 text-slate-600">{s.role}</td>
                <td className="px-4 py-2.5 text-slate-600">{s.location}</td>
                <td className="px-4 py-2.5 text-slate-600">{s.phone}</td>
                <td className="px-4 py-2.5">
                  <Badge tone={s.status === 'Active' ? 'green' : 'amber'}>{s.status}</Badge>
                </td>
              </tr>
            ))}
            {filtered.length === 0 && (
              <tr>
                <td colSpan={5} className="px-4 py-10 text-center text-slate-400">
                  No staff match your filters.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <section className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
        <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
          <h2 className="font-bold text-ink">Weekly shift schedule — week of Nov 23, 2026</h2>
          <div className="flex gap-1 rounded-xl bg-slate-100 p-1">
            {(['Campbell River', 'Comox'] as const).map((l) => (
              <button
                key={l}
                onClick={() => setShiftView(l)}
                className={`rounded-lg px-3 py-1.5 text-sm font-semibold ${shiftView === l ? 'bg-white text-ink shadow-sm' : 'text-slate-500'}`}
              >
                {l}
              </button>
            ))}
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[720px] text-left text-sm">
            <thead>
              <tr className="text-xs uppercase tracking-wide text-slate-400">
                <th className="py-2 pr-3 font-semibold">Staff</th>
                {SHIFT_DAYS.map((d) => (
                  <th key={d} className="px-2 py-2 text-center font-semibold">
                    {d}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {onShift.map((s) => (
                <tr key={s.id}>
                  <td className="py-2 pr-3 font-medium text-ink">{s.name}</td>
                  {(shifts[s.id] ?? []).map((code, i) => (
                    <td key={i} className="px-1.5 py-1.5">
                      <span className={`block rounded-lg px-1 py-1.5 text-center text-xs font-semibold ${shiftTone(code)}`}>{code}</span>
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-2 text-xs text-slate-400">Showrooms: Mon–Fri 8:30–5, Sat 10–5, Sundays &amp; holidays closed. Delivery crews run Fri–Mon during event season.</p>
      </section>

      <section className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
        <h2 className="mb-3 font-bold text-ink">Time-off requests</h2>
        <ul className="divide-y divide-slate-100">
          {timeOffList.map((t) => (
            <li key={t.id} className="flex flex-wrap items-center gap-3 py-3">
              <span className="min-w-0 flex-1">
                <span className="block font-medium text-ink">{t.staff}</span>
                <span className="text-sm text-slate-500">
                  {t.from} – {t.to} · {t.reason}
                </span>
              </span>
              <Badge tone={t.status === 'Approved' ? 'green' : t.status === 'Denied' ? 'red' : 'amber'}>{t.status}</Badge>
              {t.status === 'Pending' && (
                <span className="flex gap-2">
                  <GhostButton onClick={() => decide(t, 'Approved')}>Approve</GhostButton>
                  <GhostButton danger onClick={() => decide(t, 'Denied')}>
                    Deny
                  </GhostButton>
                </span>
              )}
            </li>
          ))}
        </ul>
      </section>
    </div>
  )
}

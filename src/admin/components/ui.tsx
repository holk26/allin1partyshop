import { type ReactNode, useEffect, useState } from 'react'

// ---------------------------------------------------------------------------
// Icons — small inline SVGs (stroke style), no icon library needed.
// ---------------------------------------------------------------------------

const PATHS: Record<string, ReactNode> = {
  dashboard: (
    <>
      <rect x="3" y="3" width="7" height="7" rx="1.5" />
      <rect x="14" y="3" width="7" height="7" rx="1.5" />
      <rect x="3" y="14" width="7" height="7" rx="1.5" />
      <rect x="14" y="14" width="7" height="7" rx="1.5" />
    </>
  ),
  inventory: (
    <>
      <path d="M21 8 12 3 3 8v8l9 5 9-5V8Z" />
      <path d="M3 8l9 5 9-5M12 13v8" />
    </>
  ),
  orders: (
    <>
      <rect x="5" y="4" width="14" height="17" rx="2" />
      <path d="M9 4a3 3 0 0 1 6 0M9 11h6M9 15h4" />
    </>
  ),
  sales: (
    <>
      <path d="M20 12 12 20a2 2 0 0 1-2.8 0L3 13.8A2 2 0 0 1 3 11V4a1 1 0 0 1 1-1h7a2 2 0 0 1 1.4.6l7.6 7.6a2 2 0 0 1 0 2.8Z" />
      <circle cx="7.5" cy="7.5" r="1.5" />
    </>
  ),
  finance: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M15 9.5c-.6-1-1.7-1.5-3-1.5-1.7 0-3 .9-3 2.2 0 2.9 6.2 1.4 6.2 3.6 0 1.3-1.3 2.2-3.2 2.2-1.4 0-2.5-.6-3-1.6M12 6v12" />
    </>
  ),
  customers: (
    <>
      <circle cx="9" cy="8" r="3.5" />
      <path d="M2.5 20c.8-3.2 3.4-5 6.5-5s5.7 1.8 6.5 5" />
      <circle cx="17" cy="9" r="2.5" />
      <path d="M16 15.2c2.6.3 4.6 1.8 5.3 4.3" />
    </>
  ),
  hr: (
    <>
      <rect x="3" y="5" width="18" height="16" rx="2" />
      <path d="M8 3v4M16 3v4M3 10h18M8 15l2.5 2.5L16 13" />
    </>
  ),
  content: (
    <>
      <rect x="3" y="4" width="18" height="16" rx="2" />
      <circle cx="9" cy="10" r="1.8" />
      <path d="M3 17l5-4 4 3 4-4 5 5" />
    </>
  ),
  reports: (
    <>
      <path d="M4 20V4M4 20h16" />
      <rect x="7" y="12" width="3" height="8" rx="0.5" />
      <rect x="12" y="8" width="3" height="12" rx="0.5" />
      <rect x="17" y="5" width="3" height="15" rx="0.5" />
    </>
  ),
  settings: (
    <>
      <circle cx="12" cy="12" r="3" />
      <path d="M12 2.5v3M12 18.5v3M2.5 12h3M18.5 12h3M5 5l2 2M17 17l2 2M19 5l-2 2M7 17l-2 2" />
    </>
  ),
  search: (
    <>
      <circle cx="11" cy="11" r="7" />
      <path d="M21 21l-4.3-4.3" />
    </>
  ),
  plus: <path d="M12 5v14M5 12h14" />,
  x: <path d="M6 6l12 12M18 6L6 18" />,
  check: <path d="M4.5 12.5 10 18 19.5 7" />,
  truck: (
    <>
      <path d="M1.5 6h12v10h-12zM13.5 10h4l3 3.5V16h-7" />
      <circle cx="6" cy="18" r="1.8" />
      <circle cx="17" cy="18" r="1.8" />
    </>
  ),
  alert: (
    <>
      <path d="M12 3 2.5 20h19L12 3Z" />
      <path d="M12 10v4.5M12 17.5v.5" />
    </>
  ),
  external: (
    <>
      <path d="M14 4h6v6M20 4 10 14" />
      <path d="M20 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1h5" />
    </>
  ),
  logout: (
    <>
      <path d="M9 21H6a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h3M16 17l5-5-5-5M21 12H9" />
    </>
  ),
}

export function Icon({ name, size = 20, className = '' }: { name: string; size?: number; className?: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden
    >
      {PATHS[name]}
    </svg>
  )
}

// ---------------------------------------------------------------------------
// Badges / cards / charts
// ---------------------------------------------------------------------------

export function Badge({ children, tone = 'slate' }: { children: ReactNode; tone?: 'slate' | 'green' | 'red' | 'amber' | 'sky' | 'rose' | 'violet' | 'teal' }) {
  const tones: Record<string, string> = {
    slate: 'bg-slate-100 text-slate-700 border-slate-200',
    green: 'bg-emerald-100 text-emerald-800 border-emerald-200',
    red: 'bg-rose-100 text-rose-800 border-rose-200',
    amber: 'bg-amber-100 text-amber-800 border-amber-200',
    sky: 'bg-sky-100 text-sky-800 border-sky-200',
    rose: 'bg-rose-100 text-rose-800 border-rose-200',
    violet: 'bg-violet-100 text-violet-800 border-violet-200',
    teal: 'bg-teal-100 text-teal-800 border-teal-200',
  }
  return (
    <span className={`inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-xs font-semibold ${tones[tone]}`}>
      {children}
    </span>
  )
}

export function StatCard({
  label,
  value,
  sub,
  accent,
  icon,
}: {
  label: string
  value: string
  sub: string
  accent: string
  icon: string
}) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
      <div className="flex items-start justify-between gap-2">
        <p className="text-sm font-medium text-slate-500">{label}</p>
        <span className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl ${accent}`}>
          <Icon name={icon} size={19} />
        </span>
      </div>
      <p className="mt-1 text-2xl font-bold tracking-tight text-ink">{value}</p>
      <p className="mt-0.5 text-xs text-slate-500">{sub}</p>
    </div>
  )
}

/** Vertical bar chart rendered with plain divs (no chart lib). */
export function VBarChart({ data, format }: { data: { label: string; value: number }[]; format: (n: number) => string }) {
  const max = Math.max(...data.map((d) => d.value), 1)
  return (
    <div>
      <div className="flex h-44 items-end gap-3 sm:gap-5">
        {data.map((d) => (
          <div key={d.label} className="flex h-full flex-1 flex-col items-center justify-end gap-1.5">
            <span className="text-[11px] font-semibold text-slate-600">{format(d.value)}</span>
            <div
              className="w-full max-w-12 rounded-t-lg bg-gradient-to-t from-teal to-coral transition-all"
              style={{ height: `${Math.max(6, (d.value / max) * 100)}%` }}
              title={`${d.label}: ${format(d.value)}`}
            />
            <span className="text-xs font-medium text-slate-500">{d.label}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

/** Horizontal bar list, good for category breakdowns. */
export function HBarList({ data, format }: { data: { label: string; value: number; color: string }[]; format: (n: number) => string }) {
  const max = Math.max(...data.map((d) => d.value), 1)
  return (
    <div className="space-y-3">
      {data.map((d) => (
        <div key={d.label}>
          <div className="mb-1 flex items-center justify-between text-sm">
            <span className="font-medium text-ink">{d.label}</span>
            <span className="font-semibold text-slate-600">{format(d.value)}</span>
          </div>
          <div className="h-2.5 overflow-hidden rounded-full bg-slate-100">
            <div className={`h-full rounded-full ${d.color}`} style={{ width: `${(d.value / max) * 100}%` }} />
          </div>
        </div>
      ))}
    </div>
  )
}

// ---------------------------------------------------------------------------
// Modal / form bits
// ---------------------------------------------------------------------------

export function Modal({
  title,
  onClose,
  children,
  wide = false,
}: {
  title: string
  onClose: () => void
  children: ReactNode
  wide?: boolean
}) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onClose])
  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-ink/50 p-0 sm:items-center sm:p-6" onMouseDown={(e) => e.target === e.currentTarget && onClose()}>
      <div
        className={`max-h-[92vh] w-full overflow-y-auto rounded-t-2xl bg-white shadow-2xl sm:rounded-2xl ${wide ? 'sm:max-w-3xl' : 'sm:max-w-lg'}`}
        role="dialog"
        aria-modal
      >
        <div className="sticky top-0 flex items-center justify-between border-b border-slate-100 bg-white px-5 py-4">
          <h2 className="text-base font-bold text-ink">{title}</h2>
          <button onClick={onClose} className="rounded-lg p-1.5 text-slate-500 hover:bg-slate-100" aria-label="Close">
            <Icon name="x" size={18} />
          </button>
        </div>
        <div className="px-5 py-4">{children}</div>
      </div>
    </div>
  )
}

export function Field({ label, children, hint }: { label: string; children: ReactNode; hint?: string }) {
  return (
    <label className="block">
      <span className="mb-1 block text-sm font-medium text-slate-700">{label}</span>
      {children}
      {hint && <span className="mt-1 block text-xs text-slate-400">{hint}</span>}
    </label>
  )
}

export const inputCls =
  'w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm text-ink outline-none focus:border-coral focus:ring-2 focus:ring-coral/25'

export function PrimaryButton({ children, onClick, type = 'button' }: { children: ReactNode; onClick?: () => void; type?: 'button' | 'submit' }) {
  return (
    <button
      type={type}
      onClick={onClick}
      className="inline-flex items-center gap-1.5 rounded-xl bg-coral px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-coral-dark"
    >
      {children}
    </button>
  )
}

export function GhostButton({ children, onClick, danger = false }: { children: ReactNode; onClick: () => void; danger?: boolean }) {
  return (
    <button
      onClick={onClick}
      className={`inline-flex items-center gap-1.5 rounded-xl border px-3 py-2 text-sm font-semibold transition ${
        danger
          ? 'border-rose-200 bg-white text-rose-700 hover:bg-rose-50'
          : 'border-slate-300 bg-white text-slate-700 hover:bg-slate-50'
      }`}
    >
      {children}
    </button>
  )
}

export function Toggle({ checked, onChange, label }: { checked: boolean; onChange: (v: boolean) => void; label: string }) {
  return (
    <button type="button" role="switch" aria-checked={checked} onClick={() => onChange(!checked)} className="flex items-center gap-2.5">
      <span className={`relative h-6 w-11 rounded-full transition ${checked ? 'bg-teal' : 'bg-slate-300'}`}>
        <span
          className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition-all ${checked ? 'left-[22px]' : 'left-0.5'}`}
        />
      </span>
      <span className="text-sm font-medium text-slate-700">{label}</span>
    </button>
  )
}

// ---------------------------------------------------------------------------
// Toasts
// ---------------------------------------------------------------------------

export interface ToastMsg {
  id: number
  text: string
}

export function Toasts({ toasts }: { toasts: ToastMsg[] }) {
  const [visible, setVisible] = useState<ToastMsg[]>([])
  useEffect(() => {
    setVisible(toasts)
    if (toasts.length === 0) return
    const t = setTimeout(() => setVisible([]), 3200)
    return () => clearTimeout(t)
  }, [toasts])
  if (visible.length === 0) return null
  return (
    <div className="pointer-events-none fixed bottom-4 left-1/2 z-[60] flex w-full max-w-sm -translate-x-1/2 flex-col items-center gap-2 px-4">
      {visible.map((t) => (
        <div
          key={t.id}
          className="flex w-full items-center gap-2 rounded-xl bg-ink px-4 py-3 text-sm font-medium text-white shadow-xl"
        >
          <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-teal text-white">
            <Icon name="check" size={14} />
          </span>
          {t.text}
        </div>
      ))}
    </div>
  )
}

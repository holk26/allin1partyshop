import { useState } from 'react'
import { type SettingsState } from '../data'
import { Field, GhostButton, inputCls, PrimaryButton, Toggle } from '../components/ui'

interface DemoUser {
  id: string
  name: string
  email: string
  role: 'Admin' | 'Manager' | 'Staff'
  active: boolean
}

const INITIAL_USERS: DemoUser[] = [
  { id: 'u1', name: 'Tessa Tomlinson', email: 'tessa@allin1partyshop.com', role: 'Admin', active: true },
  { id: 'u2', name: 'Megan Fraser', email: 'megan@allin1partyshop.com', role: 'Manager', active: true },
  { id: 'u3', name: 'Daniel Okafor', email: 'daniel@allin1partyshop.com', role: 'Manager', active: true },
  { id: 'u4', name: 'Grace Liu', email: 'grace@allin1partyshop.com', role: 'Staff', active: true },
  { id: 'u5', name: 'Lucas Tremblay', email: 'lucas@allin1partyshop.com', role: 'Staff', active: false },
]

export default function Settings({
  settings,
  onChange,
  notify,
}: {
  settings: SettingsState
  onChange: (s: SettingsState) => void
  notify: (msg: string) => void
}) {
  const [draft, setDraft] = useState(settings)
  const [users, setUsers] = useState(INITIAL_USERS)
  const [dirty, setDirty] = useState(false)

  function set<K extends keyof SettingsState>(key: K, value: SettingsState[K]) {
    setDraft({ ...draft, [key]: value })
    setDirty(true)
  }

  function save() {
    onChange(draft)
    setDirty(false)
    notify('Settings saved for this demo session')
  }

  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-xl font-bold text-ink sm:text-2xl">Settings</h1>
        <p className="text-sm text-slate-500">Business details, rental terms, taxes and who can use this dashboard.</p>
      </div>

      <form
        onSubmit={(e) => { e.preventDefault(); save() }}
        className="space-y-5"
      >
        <section className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
          <h2 className="mb-3 font-bold text-ink">Business info</h2>
          <div className="grid gap-3 sm:grid-cols-2">
            <Field label="Business name">
              <input value={draft.businessName} onChange={(e) => set('businessName', e.target.value)} className={inputCls} />
            </Field>
            <Field label="Tagline">
              <input value={draft.tagline} onChange={(e) => set('tagline', e.target.value)} className={inputCls} />
            </Field>
            <Field label="Phone">
              <input value={draft.phone} onChange={(e) => set('phone', e.target.value)} className={inputCls} />
            </Field>
            <Field label="Email">
              <input value={draft.email} onChange={(e) => set('email', e.target.value)} className={inputCls} />
            </Field>
            <Field label="Campbell River showroom">
              <input value={draft.addrCR} onChange={(e) => set('addrCR', e.target.value)} className={inputCls} />
            </Field>
            <Field label="Comox showroom">
              <input value={draft.addrComox} onChange={(e) => set('addrComox', e.target.value)} className={inputCls} />
            </Field>
            <div className="sm:col-span-2">
              <Field label="Opening hours">
                <input value={draft.hours} onChange={(e) => set('hours', e.target.value)} className={inputCls} />
              </Field>
            </div>
          </div>
        </section>

        <section className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
          <h2 className="mb-3 font-bold text-ink">Rental terms</h2>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            <Field label="Minimum rental (days)" hint="Standard: Friday–Monday">
              <input type="number" min={1} value={draft.minDays} onChange={(e) => set('minDays', Number(e.target.value))} className={inputCls} />
            </Field>
            <Field label="Deposit (%)" hint="Of the order total">
              <input type="number" min={0} max={100} value={draft.depositPct} onChange={(e) => set('depositPct', Number(e.target.value))} className={inputCls} />
            </Field>
            <Field label="Tent deposit (CAD)" hint="Tents must be reserved in advance">
              <input type="number" min={0} value={draft.tentDeposit} onChange={(e) => set('tentDeposit', Number(e.target.value))} className={inputCls} />
            </Field>
            <Field label="Free cancellation (days before)" hint="After this, deposit is kept">
              <input type="number" min={0} value={draft.cancelDays} onChange={(e) => set('cancelDays', Number(e.target.value))} className={inputCls} />
            </Field>
          </div>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            <Field label="GST (%)">
              <input type="number" min={0} step="0.5" value={draft.gst} onChange={(e) => set('gst', Number(e.target.value))} className={inputCls} />
            </Field>
            <Field label="PST (%)">
              <input type="number" min={0} step="0.5" value={draft.pst} onChange={(e) => set('pst', Number(e.target.value))} className={inputCls} />
            </Field>
          </div>
        </section>

        <div className="flex justify-end">
          <PrimaryButton type="submit" className="w-full sm:w-auto">{dirty ? 'Save settings' : 'Settings saved ✓'}</PrimaryButton>
        </div>
      </form>

      <section className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
        <h2 className="mb-1 font-bold text-ink">Users &amp; roles</h2>
        <p className="mb-3 text-sm text-slate-500">Demo accounts. Toggling access or changing a role updates this session only.</p>
        <ul className="divide-y divide-slate-100">
          {users.map((u) => (
            <li key={u.id} className="flex flex-wrap items-center gap-3 py-2.5">
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-blush text-sm font-bold text-coral">
                {u.name.split(' ').map((w) => w[0]).join('')}
              </span>
              <span className="min-w-0 flex-1">
                <span className="block font-medium text-ink">{u.name}</span>
                <span className="text-xs text-slate-400">{u.email}</span>
              </span>
              <select
                value={u.role}
                onChange={(e) => { setUsers(users.map((x) => (x.id === u.id ? { ...x, role: e.target.value as DemoUser['role'] } : x))); notify(`${u.name} is now ${e.target.value}`) }}
                className={`${inputCls} w-full sm:w-auto`}
                aria-label={`Role for ${u.name}`}
              >
                <option>Admin</option>
                <option>Manager</option>
                <option>Staff</option>
              </select>
              <Toggle
                checked={u.active}
                onChange={(v) => { setUsers(users.map((x) => (x.id === u.id ? { ...x, active: v } : x))); notify(`${u.name} ${v ? 'activated' : 'deactivated'}`) }}
                label={u.active ? 'Active' : 'Inactive'}
              />
            </li>
          ))}
        </ul>
        <GhostButton onClick={() => notify('Invite link copied (demo) — new users start as Staff')}>
          Invite team member
        </GhostButton>
      </section>
    </div>
  )
}

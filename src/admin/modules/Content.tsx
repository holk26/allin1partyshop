import { useState } from 'react'
import { type Album, type Announcement, type CmsPage } from '../data'
import { Badge, Field, GhostButton, Icon, inputCls, Modal, PrimaryButton, Toggle } from '../components/ui'

export default function Content({
  pages,
  albums,
  announcements,
  onPages,
  onAlbums,
  onAnnouncements,
  notify,
}: {
  pages: CmsPage[]
  albums: Album[]
  announcements: Announcement[]
  onPages: (p: CmsPage[]) => void
  onAlbums: (a: Album[]) => void
  onAnnouncements: (a: Announcement[]) => void
  notify: (msg: string) => void
}) {
  const [editingPage, setEditingPage] = useState<CmsPage | null>(null)
  const [titleDraft, setTitleDraft] = useState('')
  const [showAnnouncement, setShowAnnouncement] = useState(false)
  const [annDraft, setAnnDraft] = useState({ title: '', body: '', starts: 'Dec 1, 2026' })

  function saveTitle() {
    if (!editingPage || !titleDraft.trim()) return
    onPages(pages.map((p) => (p.id === editingPage.id ? { ...p, title: titleDraft, updated: 'Nov 25, 2026' } : p)))
    notify(`Page renamed to “${titleDraft}”`)
    setEditingPage(null)
  }

  function togglePage(p: CmsPage) {
    onPages(pages.map((x) => (x.id === p.id ? { ...x, published: !x.published } : x)))
    notify(`“${p.title}” ${p.published ? 'unpublished' : 'published'} on the website`)
  }

  function toggleAlbum(a: Album) {
    onAlbums(albums.map((x) => (x.id === a.id ? { ...x, published: !x.published } : x)))
    notify(`Album “${a.title}” ${a.published ? 'hidden' : 'published'}`)
  }

  function toggleAnnouncement(a: Announcement) {
    onAnnouncements(announcements.map((x) => (x.id === a.id ? { ...x, active: !x.active } : x)))
    notify(`Announcement “${a.title}” ${a.active ? 'deactivated' : 'activated'}`)
  }

  function addAnnouncement() {
    if (!annDraft.title.trim()) {
      notify('Give the announcement a title first')
      return
    }
    onAnnouncements([
      ...announcements,
      { id: `n${Date.now().toString().slice(-4)}`, title: annDraft.title, body: annDraft.body || 'Details to follow.', starts: annDraft.starts, active: true },
    ])
    setShowAnnouncement(false)
    notify(`Announcement “${annDraft.title}” created and active`)
    setAnnDraft({ title: '', body: '', starts: 'Dec 1, 2026' })
  }

  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-xl font-bold text-ink sm:text-2xl">Website Content</h1>
        <p className="text-sm text-slate-500">Pages, photo galleries and homepage announcements for allin1partyshop.com.</p>
      </div>

      <section className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
        <h2 className="mb-3 font-bold text-ink">Pages</h2>
        <ul className="divide-y divide-slate-100">
          {pages.map((p) => (
            <li key={p.id} className="flex flex-wrap items-center gap-3 py-2.5">
              <span className="min-w-0 flex-1">
                <span className="block font-medium text-ink">{p.title}</span>
                <span className="text-xs text-slate-400">
                  {p.slug} · Updated {p.updated} · {p.visits.toLocaleString()} visits
                </span>
              </span>
              <Badge tone={p.published ? 'green' : 'amber'}>{p.published ? 'Published' : 'Draft'}</Badge>
              <button
                onClick={() => { setEditingPage(p); setTitleDraft(p.title) }}
                className="rounded-lg px-2.5 py-1.5 text-xs font-semibold text-coral hover:bg-blush"
              >
                Edit title
              </button>
              <button onClick={() => togglePage(p)} className="rounded-lg px-2.5 py-1.5 text-xs font-semibold text-teal-dark hover:bg-mint">
                {p.published ? 'Unpublish' : 'Publish'}
              </button>
            </li>
          ))}
        </ul>
      </section>

      <section className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
        <h2 className="mb-3 font-bold text-ink">Photo galleries</h2>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {albums.map((a) => (
            <article key={a.id} className="overflow-hidden rounded-2xl border border-slate-200">
              <div className="flex h-24 items-end bg-gradient-to-br from-sun via-coral to-violet-400 p-3">
                <span className="flex items-center gap-1.5 rounded-full bg-white/90 px-2.5 py-1 text-xs font-semibold text-ink">
                  <Icon name="content" size={14} /> {a.photos} photos
                </span>
              </div>
              <div className="p-3">
                <p className="font-semibold text-ink">{a.title}</p>
                <p className="text-xs text-slate-400">Updated {a.updated}</p>
                <div className="mt-2 flex items-center justify-between">
                  <Badge tone={a.published ? 'green' : 'amber'}>{a.published ? 'Live' : 'Draft'}</Badge>
                  <button onClick={() => toggleAlbum(a)} className="text-xs font-semibold text-coral hover:underline">
                    {a.published ? 'Hide album' : 'Publish album'}
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
        <p className="mt-3 text-xs text-slate-400">Galleries also feed the shop's Facebook and Instagram pages.</p>
      </section>

      <section className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
        <div className="mb-3 flex items-center justify-between">
          <h2 className="font-bold text-ink">Announcements &amp; banners</h2>
          <PrimaryButton onClick={() => setShowAnnouncement(true)}>
            <Icon name="plus" size={16} /> New announcement
          </PrimaryButton>
        </div>
        <ul className="space-y-3">
          {announcements.map((a) => (
            <li key={a.id} className="flex flex-wrap items-start gap-3 rounded-xl bg-cream px-3 py-2.5">
              <span className="min-w-0 flex-1">
                <span className="block font-semibold text-ink">{a.title}</span>
                <span className="block text-sm text-slate-600">{a.body}</span>
                <span className="text-xs text-slate-400">Starts {a.starts}</span>
              </span>
              <Toggle checked={a.active} onChange={() => toggleAnnouncement(a)} label={a.active ? 'Showing' : 'Hidden'} />
            </li>
          ))}
        </ul>
      </section>

      {editingPage && (
        <Modal title="Edit page title" onClose={() => setEditingPage(null)}>
          <form
            onSubmit={(e) => { e.preventDefault(); saveTitle() }}
            className="space-y-3"
          >
            <Field label="Page title">
              <input value={titleDraft} onChange={(e) => setTitleDraft(e.target.value)} className={inputCls} />
            </Field>
            <p className="text-xs text-slate-400">Slug {editingPage.slug} stays unchanged so links don't break.</p>
            <div className="flex justify-end gap-2 pt-1">
              <GhostButton onClick={() => setEditingPage(null)}>Cancel</GhostButton>
              <PrimaryButton type="submit">Save title</PrimaryButton>
            </div>
          </form>
        </Modal>
      )}

      {showAnnouncement && (
        <Modal title="New announcement" onClose={() => setShowAnnouncement(false)}>
          <form
            onSubmit={(e) => { e.preventDefault(); addAnnouncement() }}
            className="space-y-3"
          >
            <Field label="Title">
              <input value={annDraft.title} onChange={(e) => setAnnDraft({ ...annDraft, title: e.target.value })} className={inputCls} placeholder="e.g. Summer 2027 bookings open" />
            </Field>
            <Field label="Message">
              <textarea value={annDraft.body} onChange={(e) => setAnnDraft({ ...annDraft, body: e.target.value })} rows={3} className={inputCls} />
            </Field>
            <Field label="Start date">
              <input value={annDraft.starts} onChange={(e) => setAnnDraft({ ...annDraft, starts: e.target.value })} className={inputCls} />
            </Field>
            <div className="flex justify-end gap-2 pt-1">
              <GhostButton onClick={() => setShowAnnouncement(false)}>Cancel</GhostButton>
              <PrimaryButton type="submit">Publish announcement</PrimaryButton>
            </div>
          </form>
        </Modal>
      )}
    </div>
  )
}

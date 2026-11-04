import { useEffect, useMemo, useRef, useState, type CSSProperties, type FormEvent, type PointerEvent as ReactPointerEvent, type ReactNode } from 'react'
import {
  ArrowRight,
  ArrowUpRight,
  Building2,
  CalendarDays,
  Check,
  ChevronDown,
  Clock3,
  Heart,
  Mail,
  MapPin,
  Menu,
  PartyPopper,
  Phone,
  Plus,
  Sparkles,
  Tent,
  Truck,
  UsersRound,
  X,
} from 'lucide-react'
import './App.css'

const IMG = {
  hero: '/images/hero-celebration.webp',
  reception: '/images/tented-reception.webp',
  farm: '/images/farm-table.webp',
  wedding: '/images/wedding-tablescape.webp',
  longTable: '/images/long-table.webp',
  tabletop: '/images/table-top.webp',
  placeSetting: '/images/place-setting.webp',
}

type Occasion = 'Weddings' | 'Corporate' | 'Private parties'
type Category = {
  title: string
  description: string
  image: string
  occasions: Occasion[]
}

const CATEGORIES: Category[] = [
  { title: 'Tents & canopies', description: 'Frame, pole and marquee tents, with professional installation for celebrations of every scale.', image: IMG.reception, occasions: ['Weddings', 'Corporate', 'Private parties'] },
  { title: 'Tables & seating', description: 'Farm tables, folding tables, chairs and lounge pieces that bring everyone comfortably together.', image: IMG.farm, occasions: ['Weddings', 'Corporate', 'Private parties'] },
  { title: 'Tableware', description: 'Plates, glassware, cutlery and serving pieces for a table that feels considered from every angle.', image: IMG.placeSetting, occasions: ['Weddings', 'Corporate', 'Private parties'] },
  { title: 'Linens & napkins', description: 'Colours, textures and finishes to soften a room, set a mood and make the whole table yours.', image: IMG.tabletop, occasions: ['Weddings', 'Corporate', 'Private parties'] },
  { title: 'Decor & lighting', description: 'The details that transform a space: arches, centrepieces, chandeliers, string lights and more.', image: IMG.wedding, occasions: ['Weddings', 'Private parties'] },
  { title: 'Dance floors & staging', description: 'Practical foundations for speeches, performances, dance floors and unforgettable entrances.', image: IMG.longTable, occasions: ['Weddings', 'Corporate', 'Private parties'] },
]

const OCCASIONS: Record<Occasion, { eyebrow: string; title: string; text: string; image: string; details: string[] }> = {
  Weddings: {
    eyebrow: 'Weddings & ceremonies',
    title: 'Your day, down to the last detail.',
    text: 'From an intimate backyard ceremony to a reception for thousands, our team helps you shape a celebration that feels entirely your own.',
    image: IMG.wedding,
    details: ['Tents, flooring & climate comfort', 'Complete table settings', 'Delivery, setup & takedown'],
  },
  Corporate: {
    eyebrow: 'Corporate & community',
    title: 'Big ideas deserve room to happen.',
    text: 'Galas, conferences, trade shows and community gatherings backed by experienced planning, a deep inventory and reliable logistics.',
    image: IMG.reception,
    details: ['Scalable event infrastructure', 'Staging & seating solutions', 'Island-wide coordination'],
  },
  'Private parties': {
    eyebrow: 'Birthdays & backyard gatherings',
    title: 'Make room for a really good time.',
    text: 'A milestone birthday, an anniversary or simply a reason to gather. Choose the pieces you need and enjoy being present at your own party.',
    image: IMG.farm,
    details: ['Flexible pickup for smaller items', 'Tables, chairs & tableware', 'Decor that sets the mood'],
  },
}

const FAQS = [
  ['What areas do you serve?', 'We serve Vancouver Island and the Gulf Islands, with showrooms in Comox Valley and Campbell River. Delivery is available throughout the region.'],
  ['How far in advance should I book?', 'As early as possible, especially for peak season from May to September and for weekends. Popular items such as wedding tents can book six to twelve months ahead.'],
  ['Do you deliver and set up?', 'Yes. We offer professional delivery, setup and takedown. Pricing depends on your location and the size of your rental order, so our team will prepare a custom quote.'],
  ['Can I pick up my rental items?', 'Smaller items can be picked up from either showroom. Large items such as tents require delivery and professional setup.'],
  ['How long can I keep my rentals?', 'Rentals are typically available for a minimum of four days, often Friday to Monday. Our associates can confirm the timing for your specific order.'],
]

function Reveal({ children, className = '', delay = 0 }: { children: ReactNode; className?: string; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const node = ref.current
    if (!node || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return
      node.animate([
        { opacity: 0.01, transform: 'translateY(36px) rotate(.4deg)' },
        { opacity: 1, transform: 'translateY(0) rotate(0)' },
      ], { duration: 720, delay, easing: 'cubic-bezier(.2,.75,.2,1)', fill: 'both' })
      observer.disconnect()
    }, { threshold: 0.12 })
    observer.observe(node)
    return () => observer.disconnect()
  }, [delay])
  return <div ref={ref} className={className}>{children}</div>
}

function AnimatedLine({ text }: { text: string }) {
  return <span className="animated-line" aria-hidden="true">{[...text].map((char, index) => (
    <span className="char-wrap" key={`${char}-${index}`}><span className="char" style={{ '--char-index': index } as CSSProperties}>{char === ' ' ? '\u00a0' : char}</span></span>
  ))}</span>
}

function DraggableBadge({ children, className }: { children: ReactNode; className: string }) {
  const [offset, setOffset] = useState({ x: 0, y: 0 })
  const frame = useRef(0)
  const position = useRef({ x: 0, y: 0 })
  const drag = useRef({ active: false, startX: 0, startY: 0, baseX: 0, baseY: 0, lastX: 0, lastY: 0, vx: 0, vy: 0 })
  useEffect(() => () => cancelAnimationFrame(frame.current), [])
  const onDown = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    cancelAnimationFrame(frame.current)
    event.currentTarget.setPointerCapture(event.pointerId)
    drag.current = { active: true, startX: event.clientX, startY: event.clientY, baseX: position.current.x, baseY: position.current.y, lastX: event.clientX, lastY: event.clientY, vx: 0, vy: 0 }
  }
  const onMove = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (!drag.current.active) return
    drag.current.vx = event.clientX - drag.current.lastX
    drag.current.vy = event.clientY - drag.current.lastY
    drag.current.lastX = event.clientX
    drag.current.lastY = event.clientY
    position.current = { x: drag.current.baseX + event.clientX - drag.current.startX, y: drag.current.baseY + event.clientY - drag.current.startY }
    setOffset(position.current)
  }
  const onUp = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (!drag.current.active) return
    drag.current.active = false
    event.currentTarget.releasePointerCapture(event.pointerId)
    const spring = () => {
      const d = drag.current
      d.vx = (d.vx - position.current.x * 0.12) * 0.76
      d.vy = (d.vy - position.current.y * 0.12) * 0.76
      position.current = { x: position.current.x + d.vx, y: position.current.y + d.vy }
      setOffset(position.current)
      if (Math.abs(position.current.x) + Math.abs(position.current.y) + Math.abs(d.vx) + Math.abs(d.vy) > 0.35) frame.current = requestAnimationFrame(spring)
      else { position.current = { x: 0, y: 0 }; setOffset(position.current) }
    }
    frame.current = requestAnimationFrame(spring)
  }
  return <div className={`draggable-badge ${className}`} style={{ transform: `translate3d(${offset.x}px,${offset.y}px,0)` }} onPointerDown={onDown} onPointerMove={onMove} onPointerUp={onUp} onPointerCancel={onUp}><div className="draggable-badge-inner">{children}</div></div>
}

export default function App() {
  const [filter, setFilter] = useState<'All' | Occasion>('All')
  const [occasion, setOccasion] = useState<Occasion>('Weddings')
  const [quoteOpen, setQuoteOpen] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [toast, setToast] = useState('')
  const [mailto, setMailto] = useState('')
  const [selectedRentals, setSelectedRentals] = useState<string[]>(() => {
    try { return JSON.parse(localStorage.getItem('allinone-quote') || '[]') } catch { return [] }
  })
  const heroRef = useRef<HTMLElement>(null)
  const visibleCategories = useMemo(() => filter === 'All' ? CATEGORIES : CATEGORIES.filter(category => category.occasions.includes(filter)), [filter])

  useEffect(() => { localStorage.setItem('allinone-quote', JSON.stringify(selectedRentals)) }, [selectedRentals])
  useEffect(() => {
    if (!toast) return
    const timer = window.setTimeout(() => setToast(''), 2800)
    return () => window.clearTimeout(timer)
  }, [toast])
  useEffect(() => {
    let ticking = false
    const update = () => {
      const y = window.scrollY
      setScrolled(y > 20)
      heroRef.current?.style.setProperty('--hero-scroll', String(Math.min(1, y / Math.max(window.innerHeight, 1))))
      ticking = false
    }
    const onScroll = () => { if (!ticking) { ticking = true; requestAnimationFrame(update) } }
    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])
  useEffect(() => {
    const onKey = (event: KeyboardEvent) => { if (event.key === 'Escape') { setQuoteOpen(false); setMenuOpen(false) } }
    window.addEventListener('keydown', onKey)
    document.documentElement.style.overflow = quoteOpen || menuOpen ? 'hidden' : ''
    return () => { window.removeEventListener('keydown', onKey); document.documentElement.style.overflow = '' }
  }, [quoteOpen, menuOpen])

  const moveHero = (event: ReactPointerEvent<HTMLElement>) => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const rect = event.currentTarget.getBoundingClientRect()
    event.currentTarget.style.setProperty('--pointer-x', String((event.clientX - rect.left) / rect.width - 0.5))
    event.currentTarget.style.setProperty('--pointer-y', String((event.clientY - rect.top) / rect.height - 0.5))
  }
  const addRental = (title: string) => {
    if (selectedRentals.includes(title)) { setQuoteOpen(true); return }
    setSelectedRentals(items => [...items, title])
    setToast(`${title} added to your quote`)
  }
  const removeRental = (title: string) => setSelectedRentals(items => items.filter(item => item !== title))
  const openQuote = () => { setMenuOpen(false); setMailto(''); setQuoteOpen(true) }
  const prepareRequest = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const data = new FormData(event.currentTarget)
    const recipient = data.get('showroom') === 'campbell' ? 'cr@allin1partyshop.com' : 'cv@allin1partyshop.com'
    const body = [
      `Name: ${data.get('name')}`,
      `Email: ${data.get('email')}`,
      `Event type: ${data.get('eventType')}`,
      `Event date: ${data.get('date') || 'To be confirmed'}`,
      `Estimated guests: ${data.get('guests') || 'To be confirmed'}`,
      `Preferred showroom: ${data.get('showroom') === 'campbell' ? 'Campbell River' : 'Comox Valley'}`,
      `Rental interests: ${selectedRentals.length ? selectedRentals.join(', ') : 'I would like guidance'}`,
      '',
      `Event notes: ${data.get('notes') || 'None'}`,
    ].join('\n')
    setMailto(`mailto:${recipient}?subject=${encodeURIComponent(`Event rental request — ${data.get('name')}`)}&body=${encodeURIComponent(body)}`)
  }

  return <div className="site-shell">
    <a className="skip-link" href="#main">Skip to content</a>
    <div className="top-marquee" aria-hidden="true"><div className="marquee-track">{Array.from({ length: 4 }).map((_, index) => <span key={index}>CREATE <i /> DECORATE <i /> CELEBRATE <i /> VANCOUVER ISLAND <i /> SINCE 1994 <i /></span>)}</div></div>

    <header className={`site-header ${scrolled ? 'is-scrolled' : ''}`}>
      <a href="#main" className="brand" aria-label="All In One Party Shop home"><span className="brand-small">all in one</span><span className="brand-main"><em>Party</em> SHOP</span><span className="brand-sub">EVENT RENTALS</span></a>
      <nav className="desktop-nav" aria-label="Main navigation"><a href="#rentals">Rentals</a><a href="#occasions">Occasions</a><a href="#story">Our story</a><a href="#faq">FAQ</a><a href="#contact">Contact</a></nav>
      <div className="header-actions"><button className="quote-button" onClick={openQuote} aria-label={selectedRentals.length ? `Plan your event, ${selectedRentals.length} saved ${selectedRentals.length === 1 ? 'category' : 'categories'}` : 'Plan your event'}><span>Plan your event</span><CalendarDays className="quote-mobile-icon" size={17} />{selectedRentals.length > 0 && <b>{selectedRentals.length.toString().padStart(2, '0')}</b>}<ArrowUpRight size={16} /></button><button className="menu-button" onClick={() => setMenuOpen(true)} aria-label="Open menu"><Menu size={23} /></button></div>
    </header>

    <main id="main">
      <section className="hero" ref={heroRef} onPointerMove={moveHero}>
        <div className="hero-copy">
          <p className="eyebrow"><span className="live-dot" /> VANCOUVER ISLAND · EST. 1994</p>
          <h1 aria-label="Create. Decorate. Celebrate."><AnimatedLine text="Create." /><AnimatedLine text="Decorate." /><span className="hero-accent"><AnimatedLine text="Celebrate." /></span></h1>
          <p className="hero-intro">Everything you need to bring people together — from the first table to the last dance. Party and event rentals, delivered with three decades of local experience.</p>
          <div className="hero-actions"><a className="button button-primary" href="#rentals">Explore rentals <ArrowRight size={17} /></a><button className="text-link" onClick={openQuote}>Start your quote <ArrowUpRight size={16} /></button></div>
          <div className="hero-proof"><div><MapPin size={16} /><span>Comox Valley<br />Campbell River</span></div><div><Truck size={17} /><span>Island-wide<br />delivery & setup</span></div></div>
        </div>
        <div className="hero-visual">
          <div className="hero-orbit" aria-hidden="true"><svg viewBox="0 0 600 600"><path d="M73 354C30 177 199 36 362 75c151 36 224 207 141 342-75 122-255 151-363 56" /></svg></div>
          <div className="hero-photo-shell"><img src={IMG.hero} alt="A beautifully set wedding table beneath a white event tent" fetchPriority="high" /></div>
          <div className="hero-inset"><img src={IMG.placeSetting} alt="Elegant place setting with gold cutlery and a blue napkin" /></div>
          <DraggableBadge className="badge-experience"><strong>30+</strong><span>years of<br />celebrating</span></DraggableBadge>
          <DraggableBadge className="badge-delivery"><Truck size={20} /><span>WE DELIVER<br />& SET UP</span></DraggableBadge>
          <div className="hero-photo-label"><span>REAL EVENTS / REAL ISLAND</span><span>DRAG THE DETAILS ↗</span></div>
        </div>
      </section>

      <section className="trust-strip" aria-label="Company highlights"><div><strong>1994</strong><span>Family-owned since</span></div><div><strong>2</strong><span>Island showrooms</span></div><div><strong>5,000</strong><span>Guest capacity, up to</span></div><div><strong>1</strong><span>Team for every detail</span></div></section>

      <section className="rentals-section section-pad" id="rentals">
        <Reveal className="section-heading split-heading"><div><p className="eyebrow">THE RENTAL COLLECTION / 01</p><h2>Everything your<br />event needs.</h2></div><div className="heading-aside"><p>From elegant tablescapes to large-scale tents, build your celebration piece by piece. Save your favourites and start a quote.</p><a href="https://allin1partyshop.com/shop/rentals" target="_blank" rel="noreferrer">Browse full catalogue <ArrowUpRight size={15} /></a></div></Reveal>
        <div className="filter-row" role="group" aria-label="Filter rental categories">{(['All', 'Weddings', 'Corporate', 'Private parties'] as const).map(item => <button key={item} className={filter === item ? 'active' : ''} onClick={() => setFilter(item)} aria-pressed={filter === item}>{item}</button>)}</div>
        <div className="rental-grid">{visibleCategories.map((category, index) => {
          const selected = selectedRentals.includes(category.title)
          return <Reveal className={`rental-card card-${index % 6}`} delay={(index % 3) * 80} key={category.title}><div className="rental-image"><img src={category.image} alt={category.title} loading="lazy" /><span className="card-index">{(index + 1).toString().padStart(2, '0')}</span><button className={selected ? 'add-rental selected' : 'add-rental'} onClick={() => addRental(category.title)} aria-label={selected ? `Open quote for ${category.title}` : `Add ${category.title} to quote`}>{selected ? <Check size={18} /> : <Plus size={19} />}</button></div><div className="rental-card-copy"><h3>{category.title}</h3><p>{category.description}</p><button onClick={() => addRental(category.title)}>{selected ? 'In your quote' : 'Add to quote'} {selected ? <Check size={14} /> : <ArrowRight size={14} />}</button></div></Reveal>
        })}</div>
      </section>

      <section className="process-section section-pad" id="service">
        <div className="process-heading"><p className="eyebrow">HOW IT COMES TOGETHER / 02</p><h2>From first idea<br />to last dance.</h2><p>One experienced team, one deep inventory, and a plan shaped around your event.</p><button className="button button-light" onClick={openQuote}>Plan with us <ArrowUpRight size={16} /></button></div>
        <div className="process-steps">
          <Reveal className="process-step"><span>01</span><div><CalendarDays size={26} /><h3>Dream & discover</h3><p>Tell us what you are celebrating, browse the collection and save the pieces that catch your eye.</p></div></Reveal>
          <Reveal className="process-step" delay={90}><span>02</span><div><UsersRound size={26} /><h3>Shape it together</h3><p>Our rental specialists help with quantities, layout, logistics and the practical details behind the magic.</p></div></Reveal>
          <Reveal className="process-step" delay={180}><span>03</span><div><PartyPopper size={26} /><h3>Be there for it</h3><p>We deliver, install and collect, so you can focus on your guests — not the folding chairs.</p></div></Reveal>
        </div>
      </section>

      <section className="occasions-section section-pad" id="occasions">
        <Reveal className="section-heading split-heading"><div><p className="eyebrow">MADE FOR THE MOMENT / 03</p><h2>What are we<br />celebrating?</h2></div><p className="heading-aside">Different occasion, different energy. Explore a few ways we can help bring yours to life.</p></Reveal>
        <div className="occasion-tabs" role="tablist" aria-label="Event occasions">{(Object.keys(OCCASIONS) as Occasion[]).map(item => <button role="tab" aria-selected={occasion === item} className={occasion === item ? 'active' : ''} onClick={() => setOccasion(item)} key={item}>{item === 'Weddings' ? <Heart size={16} /> : item === 'Corporate' ? <Building2 size={16} /> : <Sparkles size={16} />}{item}</button>)}</div>
        <div className="occasion-panel" key={occasion}>
          <div className="occasion-image"><img src={OCCASIONS[occasion].image} alt={`${occasion} event setup`} /><span>ALL IN ONE / {occasion.toUpperCase()}</span></div>
          <div className="occasion-copy"><p className="eyebrow">{OCCASIONS[occasion].eyebrow}</p><h3>{OCCASIONS[occasion].title}</h3><p>{OCCASIONS[occasion].text}</p><ul>{OCCASIONS[occasion].details.map(detail => <li key={detail}><Check size={16} />{detail}</li>)}</ul><button className="button button-primary" onClick={openQuote}>Start planning <ArrowUpRight size={16} /></button></div>
        </div>
      </section>

      <section className="gallery-band" aria-label="Event inspiration gallery">
        <figure className="gallery-large"><img src={IMG.tabletop} alt="Overhead view of an elegant floral tablescape" loading="lazy" /><figcaption>Details worth gathering around.</figcaption></figure>
        <figure><img src={IMG.longTable} alt="Long wedding table with overhead string lights" loading="lazy" /><figcaption>Room for everyone.</figcaption></figure>
        <figure><img src={IMG.reception} alt="Large tented reception with round dining tables" loading="lazy" /><figcaption>Ready for the big moments.</figcaption></figure>
      </section>

      <section className="story-section section-pad" id="story">
        <div className="story-visual"><div className="story-main-image"><img src={IMG.hero} alt="Event table prepared by All In One Party Shop" loading="lazy" /></div><div className="story-inset"><img src={IMG.farm} alt="Outdoor farm table celebration" loading="lazy" /></div><DraggableBadge className="badge-story"><Tent size={21} /><span>LOCAL SINCE<br /><strong>1994</strong></span></DraggableBadge></div>
        <Reveal className="story-copy"><p className="eyebrow">OUR STORY / 04</p><h2>A local team.<br />A long history of<br />showing up.</h2><p>All In One Party Shop began in 1994 as Campbell River Party Rentals, founded by Tessa Tomlinson with a modest collection of tents, tables and chairs — and a genuine passion for helping the community celebrate.</p><p>In 2001, we acquired Comox Valley Party Rentals and became All In One Party Shop. Today, our two showrooms support everything from backyard dinners to gatherings of 5,000 guests.</p><div className="story-timeline"><div><strong>1994</strong><span>Campbell River beginnings</span></div><div><strong>2001</strong><span>Two communities, one team</span></div><div><strong>Today</strong><span>Celebrating across the Island</span></div></div><a className="text-link" href="https://allin1partyshop.com/about" target="_blank" rel="noreferrer">Read our full story <ArrowUpRight size={16} /></a></Reveal>
      </section>

      <section className="benefits-section section-pad">
        <Reveal className="section-heading split-heading"><div><p className="eyebrow">WHY ALL IN ONE / 05</p><h2>Less juggling.<br />More celebrating.</h2></div><p className="heading-aside">The largest rental selection on Northern Vancouver Island, backed by people who know how to make it all work.</p></Reveal>
        <div className="benefit-grid"><Reveal><Tent size={25} /><h3>A deeper inventory</h3><p>Tents, tables, chairs, linens, tableware and decor — all in one place, for events of every scale.</p></Reveal><Reveal delay={70}><Truck size={25} /><h3>Island-wide logistics</h3><p>Delivery, professional setup and takedown throughout Vancouver Island and the Gulf Islands.</p></Reveal><Reveal delay={140}><Heart size={25} /><h3>A team that cares</h3><p>Family-owned and community-focused, with practical guidance from your first question to pickup day.</p></Reveal></div>
      </section>

      <section className="faq-section section-pad" id="faq">
        <div className="faq-intro"><p className="eyebrow">GOOD TO KNOW / 06</p><h2>Questions,<br />meet answers.</h2><p>Need something more specific? Our rental specialists are happy to help.</p><a href="mailto:cv@allin1partyshop.com">Ask us anything <ArrowUpRight size={15} /></a></div>
        <div className="faq-list">{FAQS.map(([question, answer], index) => <details key={question} open={index === 0 ? true : undefined}><summary><span>{(index + 1).toString().padStart(2, '0')}</span>{question}<ChevronDown size={19} /></summary><p>{answer}</p></details>)}</div>
      </section>

      <section className="contact-section section-pad" id="contact">
        <Reveal className="contact-heading"><p className="eyebrow">COME SAY HELLO / 07</p><h2>Two showrooms.<br />One very good party.</h2><p>Visit a display, talk through your ideas or call a rental expert.</p></Reveal>
        <div className="location-grid">
          <Reveal className="location-card"><div className="location-top"><MapPin size={23} /><span>01 / COMOX VALLEY</span></div><h3>Comox Valley</h3><address>861 Shamrock Place<br />Comox, BC V9M 4G4</address><div className="location-hours"><Clock3 size={16} /><span>Mon–Fri, 10am–4pm<br />Saturday by appointment</span></div><div className="location-links"><a href="tel:+12503386678"><Phone size={15} />250-338-6678</a><a href="mailto:cv@allin1partyshop.com"><Mail size={15} />cv@allin1partyshop.com</a><a href="https://www.google.com/maps/search/?api=1&query=861+Shamrock+Place+Comox+BC" target="_blank" rel="noreferrer">Get directions <ArrowUpRight size={14} /></a></div></Reveal>
          <Reveal className="location-card" delay={90}><div className="location-top"><MapPin size={23} /><span>02 / CAMPBELL RIVER</span></div><h3>Campbell River</h3><address>1360 Homewood Road<br />Campbell River, BC V9W 6Y5</address><div className="location-hours"><Clock3 size={16} /><span>Mon–Fri, 10am–4pm<br />Weekends by appointment</span></div><div className="location-links"><a href="tel:+12502878159"><Phone size={15} />250-287-8159</a><a href="mailto:cr@allin1partyshop.com"><Mail size={15} />cr@allin1partyshop.com</a><a href="https://www.google.com/maps/search/?api=1&query=1360+Homewood+Road+Campbell+River+BC" target="_blank" rel="noreferrer">Get directions <ArrowUpRight size={14} /></a></div></Reveal>
        </div>
      </section>

      <section className="closing-section">
        <div className="closing-photo"><img src={IMG.placeSetting} alt="Celebration table setting" loading="lazy" /></div>
        <div className="closing-copy"><p className="eyebrow">YOUR EVENT STARTS HERE</p><h2>Let’s make it<br /><em>unforgettable.</em></h2><p>Tell us the occasion. We’ll help with everything else.</p><button className="button button-mint" onClick={openQuote}>Build your rental quote <ArrowUpRight size={18} /></button></div>
        <DraggableBadge className="badge-closing"><Sparkles size={21} /><span>CREATE<br />DECORATE<br />CELEBRATE</span></DraggableBadge>
      </section>
    </main>

    <footer className="site-footer"><a href="#main" className="brand footer-brand" aria-label="Back to top"><span className="brand-small">all in one</span><span className="brand-main"><em>Party</em> SHOP</span><span className="brand-sub">EVENT RENTALS</span></a><div className="footer-links"><a href="#rentals">Rentals</a><a href="#occasions">Occasions</a><a href="#story">Our story</a><a href="#contact">Contact</a></div><div className="footer-links"><a href="https://allin1partyshop.com/shop/rentals" target="_blank" rel="noreferrer">Full catalogue ↗</a><a href="https://www.instagram.com/allin1partyshop/" target="_blank" rel="noreferrer">Instagram ↗</a></div><p>© {new Date().getFullYear()} All In One Party Shop<br />Vancouver Island, British Columbia</p></footer>

    {menuOpen && <div className="overlay"><button className="overlay-backdrop" onClick={() => setMenuOpen(false)} aria-label="Close menu" /><aside className="mobile-menu" role="dialog" aria-modal="true" aria-label="Navigation menu"><div className="drawer-header"><span>MENU</span><button autoFocus onClick={() => setMenuOpen(false)} aria-label="Close menu"><X /></button></div><nav>{[['Rentals', '#rentals'], ['Occasions', '#occasions'], ['Our story', '#story'], ['FAQ', '#faq'], ['Contact', '#contact']].map(([label, href], index) => <a href={href} key={href} onClick={() => setMenuOpen(false)}><span>0{index + 1}</span>{label}<ArrowUpRight /></a>)}</nav><button className="button button-primary" onClick={openQuote}>Plan your event <ArrowRight size={17} /></button><p>Comox Valley · Campbell River<br />Creating celebrations since 1994.</p></aside></div>}

    {quoteOpen && <div className="overlay"><button className="overlay-backdrop" onClick={() => setQuoteOpen(false)} aria-label="Close quote planner" /><aside className="quote-drawer" role="dialog" aria-modal="true" aria-labelledby="quote-title"><div className="drawer-header"><div><p className="eyebrow">EVENT RENTAL REQUEST</p><h2 id="quote-title">Let’s plan your event.</h2></div><button autoFocus onClick={() => setQuoteOpen(false)} aria-label="Close quote planner"><X /></button></div>
      <div className="quote-scroll"><div className="quote-selection"><div><strong>Your rental shortlist</strong><span>{selectedRentals.length} {selectedRentals.length === 1 ? 'category' : 'categories'}</span></div>{selectedRentals.length ? <div className="quote-chips">{selectedRentals.map(item => <button key={item} onClick={() => removeRental(item)} aria-label={`Remove ${item}`}>{item}<X size={13} /></button>)}</div> : <p>No categories saved yet. You can still send a request and we’ll help you choose.</p>}</div>
        {mailto ? <div className="request-ready"><span><Check size={25} /></span><h3>Your request is ready.</h3><p>Open the draft in your email app, review the details and send it to our team. Nothing has been sent automatically.</p><a className="button button-primary" href={mailto}>Open email draft <Mail size={16} /></a><button className="text-link" onClick={() => setMailto('')}>Edit request</button></div> : <form className="quote-form" onSubmit={prepareRequest}>
          <div className="form-row"><label>Event type<select name="eventType" defaultValue={occasion}><option>Weddings</option><option>Corporate</option><option>Private parties</option><option>Community event</option><option>Other</option></select></label><label>Event date<input type="date" name="date" /></label></div>
          <div className="form-row"><label>Estimated guests<input name="guests" type="number" min="1" max="5000" placeholder="e.g. 120" /></label><label>Preferred showroom<select name="showroom" defaultValue="comox"><option value="comox">Comox Valley</option><option value="campbell">Campbell River</option></select></label></div>
          <label>Your name<input name="name" autoComplete="name" required placeholder="Name" /></label>
          <label>Email address<input name="email" type="email" autoComplete="email" required placeholder="you@example.com" /></label>
          <label>Tell us about your event<textarea name="notes" rows={4} placeholder="Location, atmosphere, items you need…" /></label>
          <button className="button button-primary" type="submit">Prepare request <ArrowRight size={17} /></button><p className="form-note">This prepares an email in your mail app. Your request is not sent until you choose to send it.</p>
        </form>}
      </div></aside></div>}
    {toast && <div className="toast" role="status"><Check size={17} />{toast}<button onClick={openQuote}>View quote</button></div>}
  </div>
}

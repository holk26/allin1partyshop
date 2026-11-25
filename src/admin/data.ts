// ---------------------------------------------------------------------------
// Demo data for the All in One Party Shop CMS dashboard.
// Everything here is invented sample data for demonstration purposes.
// Money is CAD. Dates cluster around Nov–Dec 2026.
// ---------------------------------------------------------------------------

export const DEMO_TODAY = 'Wed, Nov 25, 2026'

export type Location = 'Campbell River' | 'Comox' | 'Both'

export interface RentalItem {
  id: string
  sku: string
  name: string
  category: string
  dailyRate: number
  stock: number
  reserved: number
  condition: 'Excellent' | 'Good' | 'Fair'
  location: Location
}

export type OrderStatus =
  | 'Requested'
  | 'Confirmed'
  | 'Out for delivery'
  | 'On site'
  | 'Returned'
  | 'Completed'
  | 'Cancelled'

export interface OrderLine {
  itemId: string
  name: string
  qty: number
  rate: number
  days: number
}

export interface Order {
  id: string
  customer: string
  customerId: string
  eventDate: string
  venue: string
  location: Location
  lines: OrderLine[]
  deposit: number
  depositPaid: boolean
  status: OrderStatus
  kind: 'Rental' | 'Retail'
  notes: string
  created: string
}

export interface SaleProduct {
  id: string
  name: string
  category: string
  price: number
  compareAt?: number
  stock: number
  sold: number
  clearance: boolean
}

export interface Invoice {
  id: string
  orderId: string
  customer: string
  amount: number
  due: string
  status: 'Paid' | 'Pending' | 'Overdue'
  method: 'Card' | 'E-transfer' | 'Cheque' | 'Cash'
}

export interface Expense {
  id: string
  label: string
  category: string
  amount: number
  date: string
}

export interface Customer {
  id: string
  name: string
  email: string
  phone: string
  town: string
  events: number
  lifetime: number
  lastEvent: string
  notes: string
}

export interface Staff {
  id: string
  name: string
  role: string
  location: Location
  phone: string
  email: string
  status: 'Active' | 'On leave'
}

export interface TimeOff {
  id: string
  staff: string
  from: string
  to: string
  reason: string
  status: 'Pending' | 'Approved' | 'Denied'
}

export interface CmsPage {
  id: string
  title: string
  slug: string
  updated: string
  published: boolean
  visits: number
}

export interface Album {
  id: string
  title: string
  photos: number
  updated: string
  published: boolean
}

export interface Announcement {
  id: string
  title: string
  body: string
  starts: string
  active: boolean
}

export interface ActivityItem {
  id: string
  text: string
  time: string
  kind: 'order' | 'payment' | 'stock' | 'staff' | 'site'
}

export interface SettingsState {
  businessName: string
  tagline: string
  phone: string
  email: string
  addrCR: string
  addrComox: string
  hours: string
  minDays: number
  depositPct: number
  tentDeposit: number
  gst: number
  pst: number
  cancelDays: number
}

export const RENTAL_CATEGORIES = [
  'Tents',
  'Tables',
  'Chairs',
  'Linen',
  'Dishware',
  'Glassware',
  'Flatware',
  'Lighting',
  'Staging',
  'Heaters & BBQ',
  'Backdrops',
  'A/V Equipment',
  'Food Service',
]

export const rentalItems: RentalItem[] = [
  { id: 'r01', sku: 'TNT-2020', name: "20' × 20' Frame Tent", category: 'Tents', dailyRate: 425, stock: 6, reserved: 4, condition: 'Excellent', location: 'Both' },
  { id: 'r02', sku: 'TNT-2040', name: "20' × 40' Pole Tent", category: 'Tents', dailyRate: 695, stock: 3, reserved: 2, condition: 'Good', location: 'Campbell River' },
  { id: 'r03', sku: 'TNT-3060', name: "30' × 60' Marquee Tent", category: 'Tents', dailyRate: 1450, stock: 2, reserved: 1, condition: 'Excellent', location: 'Comox' },
  { id: 'r04', sku: 'TNT-1010', name: "10' × 10' Pop-Up Canopy", category: 'Tents', dailyRate: 85, stock: 12, reserved: 5, condition: 'Good', location: 'Both' },
  { id: 'r05', sku: 'TNT-WALL', name: "Tent Sidewall 20' (per section)", category: 'Tents', dailyRate: 35, stock: 40, reserved: 18, condition: 'Good', location: 'Both' },
  { id: 'r06', sku: 'TBL-8FT', name: "8' Banquet Table", category: 'Tables', dailyRate: 12, stock: 120, reserved: 64, condition: 'Good', location: 'Both' },
  { id: 'r07', sku: 'TBL-60R', name: '60" Round Table', category: 'Tables', dailyRate: 14, stock: 80, reserved: 41, condition: 'Good', location: 'Both' },
  { id: 'r08', sku: 'TBL-COCK', name: '36" Cocktail Table', category: 'Tables', dailyRate: 11, stock: 40, reserved: 22, condition: 'Excellent', location: 'Comox' },
  { id: 'r09', sku: 'TBL-HARV', name: "6' Harvest Table", category: 'Tables', dailyRate: 38, stock: 16, reserved: 9, condition: 'Excellent', location: 'Campbell River' },
  { id: 'r10', sku: 'TBL-KID', name: "Kids Table 4'", category: 'Tables', dailyRate: 8, stock: 20, reserved: 6, condition: 'Fair', location: 'Both' },
  { id: 'r11', sku: 'CHR-RES', name: 'White Resin Folding Chair', category: 'Chairs', dailyRate: 2.5, stock: 600, reserved: 380, condition: 'Good', location: 'Both' },
  { id: 'r12', sku: 'CHR-CHI', name: 'Gold Chiavari Chair', category: 'Chairs', dailyRate: 6.5, stock: 240, reserved: 150, condition: 'Excellent', location: 'Both' },
  { id: 'r13', sku: 'CHR-XBK', name: 'Cross-Back Vineyard Chair', category: 'Chairs', dailyRate: 7.5, stock: 120, reserved: 58, condition: 'Excellent', location: 'Comox' },
  { id: 'r14', sku: 'CHR-KID', name: 'Kids Chair', category: 'Chairs', dailyRate: 1.75, stock: 60, reserved: 12, condition: 'Fair', location: 'Campbell River' },
  { id: 'r15', sku: 'LIN-120W', name: '120" Round Linen — White', category: 'Linen', dailyRate: 18, stock: 90, reserved: 44, condition: 'Excellent', location: 'Both' },
  { id: 'r16', sku: 'LIN-90132N', name: '90" × 132" Linen — Navy', category: 'Linen', dailyRate: 16, stock: 60, reserved: 31, condition: 'Good', location: 'Both' },
  { id: 'r17', sku: 'LIN-90132B', name: '90" × 132" Linen — Blush', category: 'Linen', dailyRate: 16, stock: 45, reserved: 20, condition: 'Good', location: 'Comox' },
  { id: 'r18', sku: 'LIN-RUN', name: 'Table Runner — Gold Sequin', category: 'Linen', dailyRate: 6, stock: 70, reserved: 25, condition: 'Excellent', location: 'Both' },
  { id: 'r19', sku: 'LIN-NAP', name: 'Linen Napkin — White (each)', category: 'Linen', dailyRate: 1.25, stock: 800, reserved: 320, condition: 'Good', location: 'Both' },
  { id: 'r20', sku: 'DSH-DIN', name: 'Dinner Plate 10" — White', category: 'Dishware', dailyRate: 0.85, stock: 900, reserved: 410, condition: 'Good', location: 'Both' },
  { id: 'r21', sku: 'DSH-SAL', name: 'Salad Plate 7" — White', category: 'Dishware', dailyRate: 0.65, stock: 700, reserved: 260, condition: 'Good', location: 'Both' },
  { id: 'r22', sku: 'DSH-BWL', name: 'Soup Bowl — White', category: 'Dishware', dailyRate: 0.6, stock: 400, reserved: 120, condition: 'Good', location: 'Campbell River' },
  { id: 'r23', sku: 'GLS-WAT', name: 'Water Goblet 12 oz', category: 'Glassware', dailyRate: 0.9, stock: 800, reserved: 350, condition: 'Excellent', location: 'Both' },
  { id: 'r24', sku: 'GLS-WIN', name: 'Wine Glass 8 oz', category: 'Glassware', dailyRate: 0.8, stock: 700, reserved: 290, condition: 'Good', location: 'Both' },
  { id: 'r25', sku: 'GLS-FLU', name: 'Champagne Flute', category: 'Glassware', dailyRate: 0.8, stock: 360, reserved: 140, condition: 'Excellent', location: 'Comox' },
  { id: 'r26', sku: 'FLT-FRK', name: 'Dinner Fork (each)', category: 'Flatware', dailyRate: 0.45, stock: 1000, reserved: 430, condition: 'Good', location: 'Both' },
  { id: 'r27', sku: 'FLT-KNF', name: 'Dinner Knife (each)', category: 'Flatware', dailyRate: 0.45, stock: 1000, reserved: 420, condition: 'Good', location: 'Both' },
  { id: 'r28', sku: 'FLT-SPN', name: 'Teaspoon (each)', category: 'Flatware', dailyRate: 0.35, stock: 900, reserved: 300, condition: 'Good', location: 'Both' },
  { id: 'r29', sku: 'LGT-UPL', name: 'LED Uplight (wireless)', category: 'Lighting', dailyRate: 22, stock: 48, reserved: 26, condition: 'Excellent', location: 'Both' },
  { id: 'r30', sku: 'LGT-STR', name: "String Lights 50'", category: 'Lighting', dailyRate: 45, stock: 20, reserved: 9, condition: 'Excellent', location: 'Both' },
  { id: 'r31', sku: 'LGT-MRQ', name: "Marquee Letters 4' (each)", category: 'Lighting', dailyRate: 55, stock: 26, reserved: 10, condition: 'Good', location: 'Campbell River' },
  { id: 'r32', sku: 'STG-48', name: "4' × 8' Stage Deck", category: 'Staging', dailyRate: 65, stock: 12, reserved: 6, condition: 'Good', location: 'Both' },
  { id: 'r33', sku: 'STG-DNC', name: "Dance Floor 12' × 12'", category: 'Staging', dailyRate: 285, stock: 3, reserved: 2, condition: 'Excellent', location: 'Comox' },
  { id: 'r34', sku: 'STG-PD', name: "Pipe & Drape 10' section", category: 'Staging', dailyRate: 28, stock: 30, reserved: 12, condition: 'Good', location: 'Both' },
  { id: 'r35', sku: 'HEA-PAT', name: 'Patio Heater (propane)', category: 'Heaters & BBQ', dailyRate: 75, stock: 14, reserved: 8, condition: 'Good', location: 'Both' },
  { id: 'r36', sku: 'HEA-TNT', name: 'Tent Heater 170K BTU', category: 'Heaters & BBQ', dailyRate: 145, stock: 4, reserved: 2, condition: 'Good', location: 'Campbell River' },
  { id: 'r37', sku: 'BKD-SEQ', name: "Sequin Wall Backdrop 8' × 8'", category: 'Backdrops', dailyRate: 95, stock: 5, reserved: 3, condition: 'Excellent', location: 'Both' },
  { id: 'r38', sku: 'BKD-ARCH', name: 'Wooden Arch + Floral Frame', category: 'Backdrops', dailyRate: 120, stock: 3, reserved: 1, condition: 'Excellent', location: 'Comox' },
  { id: 'r39', sku: 'BKD-GAR', name: 'Balloon Garland Kit (DIY)', category: 'Backdrops', dailyRate: 65, stock: 10, reserved: 4, condition: 'Good', location: 'Both' },
  { id: 'r40', sku: 'AV-PA', name: 'PA System + 2 Speakers', category: 'A/V Equipment', dailyRate: 95, stock: 6, reserved: 3, condition: 'Good', location: 'Both' },
  { id: 'r41', sku: 'AV-PROJ', name: "Projector + 8' Screen", category: 'A/V Equipment', dailyRate: 110, stock: 3, reserved: 1, condition: 'Excellent', location: 'Campbell River' },
  { id: 'r42', sku: 'FDS-CHF', name: 'Chafing Dish (full size)', category: 'Food Service', dailyRate: 14, stock: 40, reserved: 17, condition: 'Good', location: 'Both' },
  { id: 'r43', sku: 'FDS-BEV', name: 'Beverage Dispenser 5 gal', category: 'Food Service', dailyRate: 18, stock: 12, reserved: 5, condition: 'Excellent', location: 'Both' },
  { id: 'r44', sku: 'FDS-POP', name: 'Popcorn Machine', category: 'Food Service', dailyRate: 55, stock: 3, reserved: 2, condition: 'Good', location: 'Comox' },
]

export const customers: Customer[] = [
  { id: 'c01', name: 'Sarah & Tom Mitchell', email: 's.mitchell@example.ca', phone: '(250) 338-2140', town: 'Courtenay', events: 6, lifetime: 8420, lastEvent: 'Oct 17, 2026', notes: 'Wedding clients. Prefer Comox pickup.' },
  { id: 'c02', name: 'Crown Isle Resort & Golf Community', email: 'events@crownisle.example.ca', phone: '(250) 703-5000', town: 'Courtenay', events: 14, lifetime: 31250, lastEvent: 'Nov 8, 2026', notes: 'Corporate account, net-30 billing.' },
  { id: 'c03', name: 'Rotary Club of Campbell River', email: 'rotary.cr@example.ca', phone: '(250) 287-4410', town: 'Campbell River', events: 9, lifetime: 9870, lastEvent: 'Nov 14, 2026', notes: 'Annual gala every November.' },
  { id: 'c04', name: 'Emily & James Carter', email: 'emily.carter@example.ca', phone: '(250) 334-9082', town: 'Comox', events: 2, lifetime: 4310, lastEvent: 'Sep 5, 2026', notes: 'Summer wedding, marquee tent.' },
  { id: 'c05', name: 'School District 72', email: 'facilities@sd72.example.ca', phone: '(250) 286-0500', town: 'Campbell River', events: 11, lifetime: 12480, lastEvent: 'Oct 30, 2026', notes: 'Grad ceremonies + gym events.' },
  { id: 'c06', name: 'Filberg Festival Society', email: 'info@filberg.example.ca', phone: '(250) 339-2712', town: 'Comox', events: 7, lifetime: 15340, lastEvent: 'Aug 2, 2026', notes: 'Filberg Park events, staging + tents.' },
  { id: 'c07', name: 'Kingfisher Oceanside Resort', email: 'banquets@kingfisher.example.ca', phone: '(250) 338-1323', town: 'Courtenay', events: 5, lifetime: 18960, lastEvent: 'Oct 3, 2026', notes: 'Spa resort weddings.' },
  { id: 'c08', name: 'Hannah Nguyen', email: 'h.nguyen@example.ca', phone: '(250) 287-7721', town: 'Campbell River', events: 3, lifetime: 2210, lastEvent: 'Nov 1, 2026', notes: 'Birthday + baby shower regular.' },
  { id: 'c09', name: 'Mt. Washington Alpine Resort', email: 'groups@mountwashington.example.ca', phone: '(250) 338-1386', town: 'Comox Valley', events: 8, lifetime: 22140, lastEvent: 'Oct 24, 2026', notes: 'Winter events, heaters essential.' },
  { id: 'c10', name: 'Derek & Priya Anand', email: 'd.anand@example.ca', phone: '(250) 334-5519', town: 'Cumberland', events: 1, lifetime: 3890, lastEvent: 'Aug 22, 2026', notes: 'First booking, backyard reception.' },
  { id: 'c11', name: 'Comox Valley Chamber of Commerce', email: 'events@comoxchamber.example.ca', phone: '(250) 334-3234', town: 'Courtenay', events: 6, lifetime: 7630, lastEvent: 'Nov 19, 2026', notes: 'Business awards + mixers.' },
  { id: 'c12', name: 'Laura Jensen', email: 'laura.jensen@example.ca', phone: '(250) 286-9034', town: 'Campbell River', events: 4, lifetime: 3120, lastEvent: 'Oct 10, 2026', notes: 'Lawn bomb + balloon orders.' },
  { id: 'c13', name: 'Maritime Heritage Centre', email: 'rentals@maritime.example.ca', phone: '(250) 287-2441', town: 'Campbell River', events: 5, lifetime: 6940, lastEvent: 'Nov 7, 2026', notes: 'Fundraiser galas.' },
  { id: 'c14', name: 'Seaview Game Farm', email: 'hello@seaview.example.ca', phone: '(250) 337-5182', town: 'Black Creek', events: 2, lifetime: 2740, lastEvent: 'Sep 19, 2026', notes: 'Outdoor farm events.' },
  { id: 'c15', name: 'North Island College', email: 'events@nic.example.ca', phone: '(250) 334-5200', town: 'Courtenay', events: 4, lifetime: 5890, lastEvent: 'Oct 16, 2026', notes: 'Convocation staging + chairs.' },
]

export const orders: Order[] = [
  {
    id: 'Q-2417', customer: 'Sarah & Tom Mitchell', customerId: 'c01', eventDate: 'Nov 28, 2026',
    venue: 'Crown Isle Resort — Courtenay', location: 'Comox', kind: 'Rental', created: 'Nov 10, 2026',
    lines: [
      { itemId: 'r03', name: "30' × 60' Marquee Tent", qty: 1, rate: 1450, days: 4 },
      { itemId: 'r13', name: 'Cross-Back Vineyard Chair', qty: 120, rate: 7.5, days: 4 },
      { itemId: 'r07', name: '60" Round Table', qty: 15, rate: 14, days: 4 },
      { itemId: 'r29', name: 'LED Uplight (wireless)', qty: 16, rate: 22, days: 4 },
    ],
    deposit: 1200, depositPaid: true, status: 'Confirmed',
    notes: 'Winter wedding. Tent needs concrete weights (no staking on patio). Delivery Fri 8am, pickup Mon.',
  },
  {
    id: 'Q-2418', customer: 'Rotary Club of Campbell River', customerId: 'c03', eventDate: 'Dec 5, 2026',
    venue: 'Campbell River Community Centre', location: 'Campbell River', kind: 'Rental', created: 'Nov 12, 2026',
    lines: [
      { itemId: 'r11', name: 'White Resin Folding Chair', qty: 300, rate: 2.5, days: 4 },
      { itemId: 'r06', name: "8' Banquet Table", qty: 40, rate: 12, days: 4 },
      { itemId: 'r15', name: '120" Round Linen — White', qty: 40, rate: 18, days: 4 },
      { itemId: 'r32', name: "4' × 8' Stage Deck", qty: 4, rate: 65, days: 4 },
    ],
    deposit: 800, depositPaid: true, status: 'Confirmed',
    notes: 'Annual gala + auction. Stage for live band. Early setup Thu 4pm.',
  },
  {
    id: 'Q-2419', customer: 'Hannah Nguyen', customerId: 'c08', eventDate: 'Nov 29, 2026',
    venue: 'Private residence — Campbell River', location: 'Campbell River', kind: 'Rental', created: 'Nov 18, 2026',
    lines: [
      { itemId: 'r04', name: "10' × 10' Pop-Up Canopy", qty: 2, rate: 85, days: 4 },
      { itemId: 'r39', name: 'Balloon Garland Kit (DIY)', qty: 2, rate: 65, days: 4 },
      { itemId: 'r08', name: '36" Cocktail Table', qty: 6, rate: 11, days: 4 },
    ],
    deposit: 150, depositPaid: true, status: 'Requested',
    notes: 'Birthday party. Customer pickup Sat 10am, Comox showroom? No — Campbell River.',
  },
  {
    id: 'Q-2420', customer: 'Crown Isle Resort & Golf Community', customerId: 'c02', eventDate: 'Dec 12, 2026',
    venue: 'Crown Isle Resort — Courtenay', location: 'Comox', kind: 'Rental', created: 'Nov 15, 2026',
    lines: [
      { itemId: 'r01', name: "20' × 20' Frame Tent", qty: 2, rate: 425, days: 4 },
      { itemId: 'r12', name: 'Gold Chiavari Chair', qty: 180, rate: 6.5, days: 4 },
      { itemId: 'r23', name: 'Water Goblet 12 oz', qty: 200, rate: 0.9, days: 4 },
      { itemId: 'r24', name: 'Wine Glass 8 oz', qty: 200, rate: 0.8, days: 4 },
      { itemId: 'r37', name: "Sequin Wall Backdrop 8' × 8'", qty: 1, rate: 95, days: 4 },
    ],
    deposit: 950, depositPaid: false, status: 'Requested',
    notes: 'Holiday corporate party. Awaiting deposit before confirming.',
  },
  {
    id: 'Q-2421', customer: 'School District 72', customerId: 'c05', eventDate: 'Dec 18, 2026',
    venue: 'Timberline Secondary gym — Campbell River', location: 'Campbell River', kind: 'Rental', created: 'Nov 20, 2026',
    lines: [
      { itemId: 'r32', name: "4' × 8' Stage Deck", qty: 6, rate: 65, days: 4 },
      { itemId: 'r40', name: 'PA System + 2 Speakers', qty: 1, rate: 95, days: 4 },
      { itemId: 'r34', name: "Pipe & Drape 10' section", qty: 10, rate: 28, days: 4 },
    ],
    deposit: 400, depositPaid: true, status: 'Confirmed',
    notes: 'Winter concert. School PO, invoice after event.',
  },
  {
    id: 'Q-2412', customer: 'Comox Valley Chamber of Commerce', customerId: 'c11', eventDate: 'Nov 27, 2026',
    venue: 'Kingfisher Oceanside Resort', location: 'Comox', kind: 'Rental', created: 'Oct 28, 2026',
    lines: [
      { itemId: 'r12', name: 'Gold Chiavari Chair', qty: 150, rate: 6.5, days: 4 },
      { itemId: 'r07', name: '60" Round Table', qty: 18, rate: 14, days: 4 },
      { itemId: 'r30', name: "String Lights 50'", qty: 8, rate: 45, days: 4 },
    ],
    deposit: 700, depositPaid: true, status: 'Out for delivery',
    notes: 'Business awards night. Truck 2 leaves Comox warehouse Thu 1pm.',
  },
  {
    id: 'Q-2411', customer: 'Maritime Heritage Centre', customerId: 'c13', eventDate: 'Nov 26, 2026',
    venue: 'Maritime Heritage Centre — Campbell River', location: 'Campbell River', kind: 'Rental', created: 'Oct 22, 2026',
    lines: [
      { itemId: 'r11', name: 'White Resin Folding Chair', qty: 180, rate: 2.5, days: 4 },
      { itemId: 'r20', name: 'Dinner Plate 10" — White', qty: 200, rate: 0.85, days: 4 },
      { itemId: 'r42', name: 'Chafing Dish (full size)', qty: 8, rate: 14, days: 4 },
    ],
    deposit: 350, depositPaid: true, status: 'On site',
    notes: 'Fundraiser dinner. Delivery completed Wed morning; pickup Mon.',
  },
  {
    id: 'Q-2409', customer: 'Laura Jensen', customerId: 'c12', eventDate: 'Nov 21, 2026',
    venue: 'Private residence — Campbell River', location: 'Campbell River', kind: 'Rental', created: 'Oct 15, 2026',
    lines: [
      { itemId: 'r39', name: 'Balloon Garland Kit (DIY)', qty: 1, rate: 65, days: 4 },
      { itemId: 'r04', name: "10' × 10' Pop-Up Canopy", qty: 1, rate: 85, days: 4 },
    ],
    deposit: 100, depositPaid: true, status: 'Returned',
    notes: 'Returned Mon Nov 24, all pieces counted, no damage.',
  },
  {
    id: 'Q-2405', customer: 'Emily & James Carter', customerId: 'c04', eventDate: 'Nov 14, 2026',
    venue: 'Filberg Park — Comox', location: 'Comox', kind: 'Rental', created: 'Sep 30, 2026',
    lines: [
      { itemId: 'r02', name: "20' × 40' Pole Tent", qty: 1, rate: 695, days: 4 },
      { itemId: 'r13', name: 'Cross-Back Vineyard Chair', qty: 90, rate: 7.5, days: 4 },
      { itemId: 'r33', name: "Dance Floor 12' × 12'", qty: 1, rate: 285, days: 4 },
    ],
    deposit: 900, depositPaid: true, status: 'Completed',
    notes: 'Completed, deposit refunded Nov 19. 5-star review left.',
  },
  {
    id: 'Q-2422', customer: 'Mt. Washington Alpine Resort', customerId: 'c09', eventDate: 'Dec 19, 2026',
    venue: 'Alpine Lodge — Mt. Washington', location: 'Comox', kind: 'Rental', created: 'Nov 22, 2026',
    lines: [
      { itemId: 'r35', name: 'Patio Heater (propane)', qty: 8, rate: 75, days: 4 },
      { itemId: 'r36', name: 'Tent Heater 170K BTU', qty: 2, rate: 145, days: 4 },
      { itemId: 'r01', name: "20' × 20' Frame Tent", qty: 1, rate: 425, days: 4 },
    ],
    deposit: 600, depositPaid: false, status: 'Requested',
    notes: 'Apres-ski holiday party. Chain-up required for mountain delivery.',
  },
  {
    id: 'Q-2423', customer: 'North Island College', customerId: 'c15', eventDate: 'Dec 4, 2026',
    venue: 'NIC Courtenay campus', location: 'Comox', kind: 'Rental', created: 'Nov 23, 2026',
    lines: [
      { itemId: 'r11', name: 'White Resin Folding Chair', qty: 220, rate: 2.5, days: 4 },
      { itemId: 'r06', name: "8' Banquet Table", qty: 24, rate: 12, days: 4 },
    ],
    deposit: 300, depositPaid: true, status: 'Confirmed',
    notes: 'Holiday market. Drop-off Fri 7am.',
  },
  {
    id: 'Q-2401', customer: 'Derek & Priya Anand', customerId: 'c10', eventDate: 'Nov 20, 2026',
    venue: 'Private residence — Cumberland', location: 'Comox', kind: 'Rental', created: 'Sep 12, 2026',
    lines: [
      { itemId: 'r02', name: "20' × 40' Pole Tent", qty: 1, rate: 695, days: 4 },
      { itemId: 'r11', name: 'White Resin Folding Chair', qty: 80, rate: 2.5, days: 4 },
    ],
    deposit: 500, depositPaid: true, status: 'Cancelled',
    notes: 'Cancelled Nov 2 — event moved indoors. Deposit refunded less $75 admin fee.',
  },
]

export const saleProducts: SaleProduct[] = [
  { id: 's01', name: 'Latex Balloon Bouquet (6)', category: 'Balloons', price: 24.99, stock: 40, sold: 212, clearance: false },
  { id: 's02', name: 'Foil Number Balloon 34"', category: 'Balloons', price: 12.99, stock: 60, sold: 340, clearance: false },
  { id: 's03', name: 'Balloon Garland — Custom Colours', category: 'Balloons', price: 89.99, stock: 12, sold: 96, clearance: false },
  { id: 's04', name: '"Happy Birthday" Banner', category: 'Birthday', price: 9.99, stock: 85, sold: 190, clearance: false },
  { id: 's05', name: 'Birthday Table Cover Pack', category: 'Birthday', price: 14.99, stock: 70, sold: 155, clearance: false },
  { id: 's06', name: 'Wedding Sparklers (box of 24)', category: 'Wedding', price: 19.99, stock: 45, sold: 260, clearance: false },
  { id: 's07', name: '"Just Married" Banner', category: 'Wedding', price: 11.99, stock: 50, sold: 88, clearance: false },
  { id: 's08', name: 'LED Fairy Lights 10 m (retail)', category: 'Wedding', price: 16.99, stock: 38, sold: 122, clearance: false },
  { id: 's09', name: 'Gold Sequin Table Runner (retail)', category: 'Clearance', price: 9.99, compareAt: 19.99, stock: 22, sold: 64, clearance: true },
  { id: 's10', name: 'Glass Vase Set (3)', category: 'Clearance', price: 14.99, compareAt: 29.99, stock: 15, sold: 41, clearance: true },
  { id: 's11', name: 'Paper Lantern Pack (6)', category: 'Clearance', price: 6.99, compareAt: 12.99, stock: 30, sold: 73, clearance: true },
  { id: 's12', name: 'Lawn Bomb Kit — "BOY or GIRL?"', category: 'Birthday', price: 34.99, stock: 18, sold: 57, clearance: false },
]

export const invoices: Invoice[] = [
  { id: 'INV-2601', orderId: 'Q-2405', customer: 'Emily & James Carter', amount: 5740, due: 'Nov 19, 2026', status: 'Paid', method: 'Card' },
  { id: 'INV-2602', orderId: 'Q-2409', customer: 'Laura Jensen', amount: 600, due: 'Nov 25, 2026', status: 'Paid', method: 'E-transfer' },
  { id: 'INV-2603', orderId: 'Q-2411', customer: 'Maritime Heritage Centre', amount: 2612, due: 'Nov 30, 2026', status: 'Pending', method: 'Cheque' },
  { id: 'INV-2604', orderId: 'Q-2412', customer: 'Comox Valley Chamber of Commerce', amount: 5940, due: 'Dec 1, 2026', status: 'Pending', method: 'E-transfer' },
  { id: 'INV-2605', orderId: 'Q-2417', customer: 'Sarah & Tom Mitchell', amount: 11552, due: 'Dec 2, 2026', status: 'Pending', method: 'Card' },
  { id: 'INV-2606', orderId: 'Q-2418', customer: 'Rotary Club of Campbell River', amount: 7680, due: 'Dec 9, 2026', status: 'Pending', method: 'Cheque' },
  { id: 'INV-2598', orderId: 'Q-2399', customer: 'Filberg Festival Society', amount: 3280, due: 'Nov 10, 2026', status: 'Overdue', method: 'E-transfer' },
  { id: 'INV-2595', orderId: 'Q-2395', customer: 'Kingfisher Oceanside Resort', amount: 4920, due: 'Nov 5, 2026', status: 'Overdue', method: 'Card' },
]

export const expenses: Expense[] = [
  { id: 'e1', label: 'Delivery fuel — Truck 1 & 2', category: 'Fleet', amount: 486.2, date: 'Nov 21, 2026' },
  { id: 'e2', label: 'Propane refill — heaters', category: 'Supplies', amount: 312.5, date: 'Nov 20, 2026' },
  { id: 'e3', label: 'Linen laundry service', category: 'Operations', amount: 428.0, date: 'Nov 19, 2026' },
  { id: 'e4', label: 'Tent repair — 20×40 pole tent seam', category: 'Repairs', amount: 265.0, date: 'Nov 17, 2026' },
  { id: 'e5', label: 'Instagram + Google ads', category: 'Marketing', amount: 350.0, date: 'Nov 15, 2026' },
  { id: 'e6', label: 'Warehouse insurance (monthly)', category: 'Insurance', amount: 412.75, date: 'Nov 1, 2026' },
]

export const staff: Staff[] = [
  { id: 'st1', name: 'Tessa Tomlinson', role: 'Owner / General Manager', location: 'Both', phone: '(250) 287-8159', email: 'tessa@allin1partyshop.com', status: 'Active' },
  { id: 'st2', name: 'Megan Fraser', role: 'Showroom Manager', location: 'Campbell River', phone: '(250) 287-8142', email: 'megan@allin1partyshop.com', status: 'Active' },
  { id: 'st3', name: 'Daniel Okafor', role: 'Showroom Manager', location: 'Comox', phone: '(250) 338-6671', email: 'daniel@allin1partyshop.com', status: 'Active' },
  { id: 'st4', name: 'Liam Patterson', role: 'Warehouse Lead', location: 'Campbell River', phone: '(250) 287-8190', email: 'liam@allin1partyshop.com', status: 'Active' },
  { id: 'st5', name: 'Sofia Reyes', role: 'Rental Expert / Event Stylist', location: 'Comox', phone: '(250) 338-6645', email: 'sofia@allin1partyshop.com', status: 'Active' },
  { id: 'st6', name: 'Noah Bennett', role: 'Delivery Driver', location: 'Both', phone: '(250) 287-8118', email: 'noah@allin1partyshop.com', status: 'Active' },
  { id: 'st7', name: 'Ava Kowalski', role: 'Balloon Artist / Retail Lead', location: 'Campbell River', phone: '(250) 287-8133', email: 'ava@allin1partyshop.com', status: 'Active' },
  { id: 'st8', name: 'Ethan Wright', role: 'Delivery & Setup Crew', location: 'Comox', phone: '(250) 338-6690', email: 'ethan@allin1partyshop.com', status: 'Active' },
  { id: 'st9', name: 'Grace Liu', role: 'Bookkeeper / Admin', location: 'Campbell River', phone: '(250) 287-8155', email: 'grace@allin1partyshop.com', status: 'Active' },
  { id: 'st10', name: 'Lucas Tremblay', role: 'Sales Associate', location: 'Comox', phone: '(250) 338-6612', email: 'lucas@allin1partyshop.com', status: 'On leave' },
]

export const SHIFT_DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']

// shift code per staff, Mon..Sun
export const shifts: Record<string, string[]> = {
  st1: ['Office', 'Office', 'Office', 'Office', 'Office', 'Off', 'Off'],
  st2: ['8:30–5', '8:30–5', '8:30–5', '8:30–5', '8:30–5', '10–5', 'Off'],
  st3: ['8:30–5', '8:30–5', '8:30–5', '8:30–5', '8:30–5', '10–5', 'Off'],
  st4: ['7:30–4', '7:30–4', '7:30–4', '7:30–4', '7:30–4', '8–12', 'Off'],
  st5: ['9–5', '9–5', 'Off', '9–5', '9–5', '10–5', 'Off'],
  st6: ['Delivery', 'Delivery', 'Delivery', 'Delivery', 'Delivery', 'Delivery', 'Off'],
  st7: ['9–5', '9–5', '9–5', '9–5', '9–5', '10–5', 'Off'],
  st8: ['Delivery', 'Delivery', 'Off', 'Delivery', 'Delivery', 'Delivery', 'Off'],
  st9: ['9–4', '9–4', '9–4', '9–4', '9–4', 'Off', 'Off'],
  st10: ['Leave', 'Leave', 'Leave', 'Leave', 'Leave', 'Leave', 'Leave'],
}

export const timeOff: TimeOff[] = [
  { id: 't1', staff: 'Ava Kowalski', from: 'Dec 23, 2026', to: 'Dec 27, 2026', reason: 'Christmas with family', status: 'Pending' },
  { id: 't2', staff: 'Ethan Wright', from: 'Nov 30, 2026', to: 'Nov 30, 2026', reason: 'Personal appointment', status: 'Approved' },
  { id: 't3', staff: 'Sofia Reyes', from: 'Dec 5, 2026', to: 'Dec 5, 2026', reason: 'Styling workshop in Nanaimo', status: 'Pending' },
]

export const cmsPages: CmsPage[] = [
  { id: 'p1', title: 'Home', slug: '/', updated: 'Nov 20, 2026', published: true, visits: 4820 },
  { id: 'p2', title: 'Rental Catalogue', slug: '/shop/rentals', updated: 'Nov 24, 2026', published: true, visits: 3910 },
  { id: 'p3', title: 'Frequently Asked Questions', slug: '/faq', updated: 'Nov 12, 2026', published: true, visits: 2140 },
  { id: 'p4', title: 'Photo Galleries', slug: '/galleries', updated: 'Nov 18, 2026', published: true, visits: 1730 },
  { id: 'p5', title: 'Corporate Events', slug: '/corporate-events', updated: 'Oct 30, 2026', published: true, visits: 960 },
  { id: 'p6', title: 'Party Venues', slug: '/partners/party-venues', updated: 'Nov 3, 2026', published: true, visits: 820 },
  { id: 'p7', title: 'Winter Weddings Guide (draft)', slug: '/winter-weddings', updated: 'Nov 25, 2026', published: false, visits: 0 },
]

export const albums: Album[] = [
  { id: 'a1', title: 'Weddings 2026', photos: 84, updated: 'Nov 22, 2026', published: true },
  { id: 'a2', title: 'Tented Events', photos: 57, updated: 'Nov 15, 2026', published: true },
  { id: 'a3', title: 'Balloons & Lawn Bombs', photos: 63, updated: 'Nov 9, 2026', published: true },
  { id: 'a4', title: 'Corporate Galas', photos: 29, updated: 'Oct 28, 2026', published: true },
  { id: 'a5', title: 'Christmas 2026 setups (draft)', photos: 6, updated: 'Nov 25, 2026', published: false },
]

export const announcements: Announcement[] = [
  { id: 'n1', title: 'Holiday hours', body: 'Closed Dec 25–26 and Jan 1. Open Dec 24 & 31 until 2 pm for pickups.', starts: 'Dec 20, 2026', active: true },
  { id: 'n2', title: 'New 30×60 marquee tent', body: 'Our largest marquee is now booking for the 2027 season — reserve early for summer weekends.', starts: 'Nov 18, 2026', active: true },
  { id: 'n3', title: 'Balloon bar Saturdays', body: 'The Comox showroom balloon bar is now open Saturdays 10 am – 4 pm.', starts: 'Nov 8, 2026', active: false },
]

export const activity: ActivityItem[] = [
  { id: 'ac1', text: 'Q-2423 confirmed — North Island College holiday market', time: '9:41 am', kind: 'order' },
  { id: 'ac2', text: 'Deposit $900 received — Q-2417 Mitchell wedding', time: '9:12 am', kind: 'payment' },
  { id: 'ac3', text: 'Low stock alert — Champagne flutes: 140 of 360 available', time: '8:55 am', kind: 'stock' },
  { id: 'ac4', text: 'Ethan Wright approved time off — Nov 30', time: 'Yesterday', kind: 'staff' },
  { id: 'ac5', text: 'FAQ page updated — cancellation policy 2026', time: 'Yesterday', kind: 'site' },
  { id: 'ac6', text: 'Q-2412 out for delivery — Chamber awards night', time: 'Yesterday', kind: 'order' },
  { id: 'ac7', text: 'Invoice INV-2598 overdue — Filberg Festival Society', time: '2 days ago', kind: 'payment' },
  { id: 'ac8', text: 'New quote requested — Mt. Washington holiday party', time: '2 days ago', kind: 'order' },
]

export const revenueByMonth = [
  { month: 'Jul', revenue: 42300 },
  { month: 'Aug', revenue: 51800 },
  { month: 'Sep', revenue: 61400 },
  { month: 'Oct', revenue: 54700 },
  { month: 'Nov', revenue: 38400 },
  { month: 'Dec', revenue: 21400 },
]

export const defaultSettings: SettingsState = {
  businessName: 'All in One Party Shop',
  tagline: 'Create. Decorate. Celebrate.',
  phone: '1-844-338-6678',
  email: 'info@allin1partyshop.com',
  addrCR: '1360A Homewood Rd, Campbell River, BC',
  addrComox: '861 Shamrock Pl, Comox, BC',
  hours: 'Mon–Fri 8:30–5, Sat 10–5, Sun & holidays closed',
  minDays: 4,
  depositPct: 25,
  tentDeposit: 200,
  gst: 5,
  pst: 7,
  cancelDays: 14,
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

export function money(n: number): string {
  return new Intl.NumberFormat('en-CA', {
    style: 'currency',
    currency: 'CAD',
    maximumFractionDigits: n % 1 === 0 ? 0 : 2,
  }).format(n)
}

export function orderSubtotal(o: Order): number {
  return o.lines.reduce((sum, l) => sum + l.qty * l.rate * l.days, 0)
}

export function orderTax(o: Order, s: SettingsState): number {
  return (orderSubtotal(o) * (s.gst + s.pst)) / 100
}

export function orderTotal(o: Order, s: SettingsState): number {
  return orderSubtotal(o) + orderTax(o, s)
}

export function available(item: RentalItem): number {
  return Math.max(0, item.stock - item.reserved)
}

export const STATUS_FLOW: OrderStatus[] = [
  'Requested',
  'Confirmed',
  'Out for delivery',
  'On site',
  'Returned',
  'Completed',
]

export const STATUS_COLORS: Record<OrderStatus, string> = {
  Requested: 'bg-amber-100 text-amber-800 border-amber-200',
  Confirmed: 'bg-sky-100 text-sky-800 border-sky-200',
  'Out for delivery': 'bg-violet-100 text-violet-800 border-violet-200',
  'On site': 'bg-teal-100 text-teal-800 border-teal-200',
  Returned: 'bg-slate-100 text-slate-700 border-slate-200',
  Completed: 'bg-emerald-100 text-emerald-800 border-emerald-200',
  Cancelled: 'bg-rose-100 text-rose-800 border-rose-200',
}

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  ShieldCheck,
  FileText,
  Lock,
  Clock,
  ChevronRight,
  MapPin,
  Award,
  Wrench,
  Umbrella,
  Gift,
  Check,
  ArrowRightLeft,
  ScrollText,
  Receipt,
  BadgeCheck,
  Gem,
} from 'lucide-react'

/* ===========================================================================
   MAISON ARCHIVE
   A private digital vault for the discerning watch collector.

   All data below is hardcoded mock data — structured for easy editing.
   Replace any field and the UI updates accordingly.
   =========================================================================== */

const COLLECTOR = {
  name: 'Al Habtoor',
  honorific: 'Mr.',
  initial: 'A',
  edition: 'Private Edition',
  estate: 'The Al Habtoor Family Archive',
  beneficiary: 'Mr. Rashid Al Habtoor',
}

/* The three timepieces. Each watch carries its own provenance, documents and
   legacy state, so the Provenance / Documents / Legacy tabs stay in sync with
   whichever piece is selected in The Collection. */
const WATCHES = [
  {
    id: 'pp-5711',
    maker: 'Patek Philippe',
    model: 'Nautilus 5711/1A',
    reference: 'Ref. 5711/1A-010',
    material: 'Stainless Steel',
    year: 2021,
    value: '$165,000',
    accent: '#1F3A5F', // muted midnight-blue dial nod
    authenticated: true,
    provenance: [
      {
        stage: 'Acquired',
        date: '14 March 2021',
        location: 'Patek Philippe Salon, Geneva',
        ref: 'INV-PP-2021-0457',
        note: 'Purchased new, full set with sealed certificate and Origin papers.',
      },
      {
        stage: 'Authenticated',
        date: '02 April 2021',
        location: 'Maison Archive Atelier, Geneva',
        ref: 'AUTH-5711-88102',
        note: 'Movement, case and dial verified against Patek Philippe Extract from the Archives.',
      },
      {
        stage: 'Documented',
        date: '09 April 2021',
        location: 'Maison Archive Vault',
        ref: 'DOC-5711-88102',
        note: 'High-resolution imaging, Extract from the Archives and full set catalogued.',
      },
      {
        stage: 'Serviced',
        date: '21 June 2024',
        location: 'Patek Philippe Service, Geneva',
        ref: 'SVC-PP-2024-1190',
        note: 'Complete service. Caliber 26-330 S C regulated, water resistance restored.',
      },
      {
        stage: 'Insured',
        date: '01 July 2024',
        location: 'Lloyd’s of London — Fine Art & Specie',
        ref: 'POL-LL-77451',
        note: 'Agreed-value worldwide cover at current market valuation.',
      },
      {
        stage: 'Ready for Transfer',
        date: 'Pending',
        location: '—',
        ref: '—',
        note: 'Provenance complete. Eligible for generational transfer at any time.',
      },
    ],
    documents: [
      { type: 'certificate', title: 'Certificate of Authenticity', date: '02 Apr 2021' },
      { type: 'invoice', title: 'Original Purchase Invoice', date: '14 Mar 2021' },
      { type: 'service', title: 'Service Records', date: '21 Jun 2024' },
      { type: 'insurance', title: 'Insurance Valuation', date: '01 Jul 2024' },
      { type: 'warranty', title: 'Warranty Card', date: '14 Mar 2021' },
    ],
  },
  {
    id: 'rm-011',
    maker: 'Richard Mille',
    model: 'RM 011 Flyback Chronograph',
    reference: 'Ref. RM 011 Ti',
    material: 'Grade 5 Titanium',
    year: 2019,
    value: '$285,000',
    accent: '#3A2E25', // warm titanium/charcoal nod
    authenticated: true,
    provenance: [
      {
        stage: 'Acquired',
        date: '28 November 2019',
        location: 'Luxury Souq, Dubai',
        ref: 'INV-RM-2019-2231',
        note: 'Acquired with complete delivery set and signed guarantee certificate.',
      },
      {
        stage: 'Authenticated',
        date: '10 December 2019',
        location: 'Maison Archive Atelier, Geneva',
        ref: 'AUTH-RM011-44190',
        note: 'Skeletonised calibre RMAC1 and titanium case authenticated by certified watchmaker.',
      },
      {
        stage: 'Documented',
        date: '18 December 2019',
        location: 'Maison Archive Vault',
        ref: 'DOC-RM011-44190',
        note: 'Full photographic dossier and component register recorded to the archive.',
      },
      {
        stage: 'Serviced',
        date: '05 February 2023',
        location: 'Richard Mille Service, Geneva',
        ref: 'SVC-RM-2023-0884',
        note: 'Flyback chronograph overhauled, gaskets and rotor bearings renewed.',
      },
      {
        stage: 'Insured',
        date: '20 February 2023',
        location: 'AXA Art — Private Client',
        ref: 'POL-AXA-30219',
        note: 'Agreed-value cover including transit between residences.',
      },
      {
        stage: 'Ready for Transfer',
        date: 'Pending',
        location: '—',
        ref: '—',
        note: 'Provenance complete. Eligible for generational transfer at any time.',
      },
    ],
    documents: [
      { type: 'certificate', title: 'Certificate of Authenticity', date: '10 Dec 2019' },
      { type: 'invoice', title: 'Original Purchase Invoice', date: '28 Nov 2019' },
      { type: 'service', title: 'Service Records', date: '05 Feb 2023' },
      { type: 'insurance', title: 'Insurance Valuation', date: '20 Feb 2023' },
      { type: 'warranty', title: 'Warranty Card', date: '28 Nov 2019' },
    ],
  },
  {
    id: 'ap-15500',
    maker: 'Audemars Piguet',
    model: 'Royal Oak 15500ST',
    reference: 'Ref. 15500ST.OO.1220ST.01',
    material: 'Stainless Steel',
    year: 2022,
    value: '$78,000',
    accent: '#23323A', // slate-blue "Grande Tapisserie" nod
    authenticated: true,
    provenance: [
      {
        stage: 'Acquired',
        date: '06 May 2022',
        location: 'AP House, London',
        ref: 'INV-AP-2022-0912',
        note: 'Delivered new with full kit, certificate of origin and complimentary first service.',
      },
      {
        stage: 'Authenticated',
        date: '19 May 2022',
        location: 'Maison Archive Atelier, Geneva',
        ref: 'AUTH-15500-67320',
        note: 'Calibre 4302 and “Grande Tapisserie” dial verified to factory specification.',
      },
      {
        stage: 'Documented',
        date: '27 May 2022',
        location: 'Maison Archive Vault',
        ref: 'DOC-15500-67320',
        note: 'Macro imaging and full set inventoried and sealed in the archive.',
      },
      {
        stage: 'Serviced',
        date: 'Not yet due',
        location: '—',
        ref: '—',
        note: 'Within manufacturer interval. No service required to date.',
      },
      {
        stage: 'Insured',
        date: '02 June 2022',
        location: 'Hiscox — Fine Art & Valuables',
        ref: 'POL-HX-51288',
        note: 'Agreed-value worldwide cover, reviewed annually.',
      },
      {
        stage: 'Ready for Transfer',
        date: 'Pending',
        location: '—',
        ref: '—',
        note: 'Provenance complete. Eligible for generational transfer at any time.',
      },
    ],
    documents: [
      { type: 'certificate', title: 'Certificate of Authenticity', date: '19 May 2022' },
      { type: 'invoice', title: 'Original Purchase Invoice', date: '06 May 2022' },
      { type: 'service', title: 'Service Records', date: '—' },
      { type: 'insurance', title: 'Insurance Valuation', date: '02 Jun 2022' },
      { type: 'warranty', title: 'Warranty Card', date: '06 May 2022' },
    ],
  },
]

const TABS = ['The Collection', 'Provenance', 'Documents', 'Legacy']

/* The current "live" stage in each watch's journey — used to softly glow the
   active provenance node. (Index into the provenance array.) */
const CURRENT_STAGE_INDEX = 4 // "Insured" — provenance complete, awaiting transfer

/* Icon + label mapping for provenance stages. */
const STAGE_META = {
  Acquired: { icon: Gem },
  Authenticated: { icon: ShieldCheck },
  Documented: { icon: ScrollText },
  Serviced: { icon: Wrench },
  Insured: { icon: Umbrella },
  'Ready for Transfer': { icon: ArrowRightLeft },
}

/* Icon mapping for document types. */
const DOC_META = {
  certificate: { icon: Award },
  invoice: { icon: Receipt },
  service: { icon: Wrench },
  insurance: { icon: Umbrella },
  warranty: { icon: BadgeCheck },
}

/* ===========================================================================
   Small presentational primitives
   =========================================================================== */

/* Thin gold "MA" monogram in a circle. */
function Monogram({ size = 40 }) {
  return (
    <div
      className="relative flex items-center justify-center rounded-full border border-vault-gold/60"
      style={{ width: size, height: size }}
    >
      <span
        className="font-serif text-vault-gold leading-none"
        style={{ fontSize: size * 0.42, letterSpacing: '0.04em' }}
      >
        MA
      </span>
    </div>
  )
}

/* A thin 1px champagne-gold hairline divider. */
function Hairline({ className = '' }) {
  return <div className={`h-px w-full hairline ${className}`} />
}

/* Tiny uppercase tracked label, lookbook style. */
function Label({ children, className = '' }) {
  return (
    <span
      className={`text-[10px] uppercase text-vault-grey tracking-[0.3em] ${className}`}
    >
      {children}
    </span>
  )
}

/* The small gold "Authenticated / Verified" pill. */
function GoldBadge({ children, icon: Icon = ShieldCheck }) {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full border border-vault-gold/30 bg-vault-gold/5 px-2.5 py-1 text-[10px] uppercase tracking-[0.18em] text-vault-gold">
      <Icon size={11} strokeWidth={1.75} />
      {children}
    </span>
  )
}

/* Elegant thin gold watch-outline used as the card image placeholder.
   Pure SVG — no external images are ever fetched. */
function WatchOutline({ className = '', stroke = '#C5A572' }) {
  return (
    <svg
      viewBox="0 0 120 120"
      fill="none"
      className={className}
      stroke={stroke}
      strokeWidth="1"
    >
      {/* lugs */}
      <path d="M44 22 L48 36 M76 22 L72 36 M44 98 L48 84 M76 98 L72 84" opacity="0.7" />
      {/* case */}
      <circle cx="60" cy="60" r="30" />
      {/* bezel */}
      <circle cx="60" cy="60" r="25" opacity="0.5" />
      {/* crown */}
      <path d="M90 57 h5 v6 h-5" opacity="0.7" />
      {/* hour markers */}
      <g opacity="0.55">
        <line x1="60" y1="37" x2="60" y2="41" />
        <line x1="60" y1="79" x2="60" y2="83" />
        <line x1="37" y1="60" x2="41" y2="60" />
        <line x1="79" y1="60" x2="83" y2="60" />
      </g>
      {/* hands */}
      <line x1="60" y1="60" x2="60" y2="44" strokeLinecap="round" />
      <line x1="60" y1="60" x2="73" y2="66" strokeLinecap="round" />
      <circle cx="60" cy="60" r="1.6" fill={stroke} stroke="none" />
    </svg>
  )
}

/* ---------------------------------------------------------------------------
   Per-watch silhouettes for The Collection cards.

   Each is an abstract, thin-line champagne-gold suggestion of the model's
   signature case shape — luxury-minimal, not a detailed illustration. All three
   share the same 120×120 viewBox, 1.5px stroke and #C5A572 colour so the cards
   stay cohesive while reading as distinct at a glance. Pure SVG, no images.
   --------------------------------------------------------------------------- */

const SILHOUETTE_STROKE = '#C5A572'

/* Patek Philippe Nautilus — its iconic porthole / rounded-octagonal bezel.
   A horizontally-elongated rounded octagon with a faint inner bezel echo. */
function NautilusSilhouette({ className = '', stroke = SILHOUETTE_STROKE }) {
  return (
    <svg
      viewBox="0 0 120 120"
      fill="none"
      className={className}
      stroke={stroke}
      strokeWidth="1.5"
      strokeLinejoin="round"
      strokeLinecap="round"
    >
      {/* outer porthole bezel — rounded octagon */}
      <path d="M34 26 H86 L104 44 V76 L86 94 H34 L16 76 V44 Z" />
      {/* inner bezel echo */}
      <path
        d="M40 36 H80 L94 50 V70 L80 84 H40 L26 70 V50 Z"
        opacity="0.45"
      />
    </svg>
  )
}

/* Richard Mille RM 011 — its tonneau (barrel / cushion) case, with two faint
   subdial hints nodding to the flyback chronograph layout. */
function TonneauSilhouette({ className = '', stroke = SILHOUETTE_STROKE }) {
  return (
    <svg
      viewBox="0 0 120 120"
      fill="none"
      className={className}
      stroke={stroke}
      strokeWidth="1.5"
      strokeLinejoin="round"
      strokeLinecap="round"
    >
      {/* tonneau / barrel case — vertical rounded rectangle with convex sides,
          wider in the middle and narrowing at top and bottom */}
      <path d="M46 22 H74 Q98 30 98 60 Q98 90 74 98 H46 Q22 90 22 60 Q22 30 46 22 Z" />
      {/* subdial hint, upper-right */}
      <circle cx="70" cy="44" r="7" opacity="0.55" />
    </svg>
  )
}

/* Audemars Piguet Royal Oak — its octagonal bezel with eight exposed screws,
   suggested by a regular octagon and eight tiny dots at the corners. */
function RoyalOakSilhouette({ className = '', stroke = SILHOUETTE_STROKE }) {
  const corners = [
    [45, 24],
    [75, 24],
    [96, 45],
    [96, 75],
    [75, 96],
    [45, 96],
    [24, 75],
    [24, 45],
  ]
  return (
    <svg
      viewBox="0 0 120 120"
      fill="none"
      className={className}
      stroke={stroke}
      strokeWidth="1.5"
      strokeLinejoin="round"
      strokeLinecap="round"
    >
      {/* octagonal bezel */}
      <path d="M45 24 H75 L96 45 V75 L75 96 H45 L24 75 V45 Z" />
      {/* eight exposed screws */}
      {corners.map(([cx, cy], i) => (
        <circle key={i} cx={cx} cy={cy} r="2" fill={stroke} stroke="none" />
      ))}
    </svg>
  )
}

/* Resolves a watch to its signature silhouette, falling back to the generic
   watch outline for any future piece without a dedicated shape. */
function WatchSilhouette({ watch, className = '', stroke = SILHOUETTE_STROKE }) {
  switch (watch.id) {
    case 'pp-5711':
      return <NautilusSilhouette className={className} stroke={stroke} />
    case 'rm-011':
      return <TonneauSilhouette className={className} stroke={stroke} />
    case 'ap-15500':
      return <RoyalOakSilhouette className={className} stroke={stroke} />
    default:
      return <WatchOutline className={className} stroke={stroke} />
  }
}

/* Slow-rotating concentric-ring / clock-face motif for the header background.
   Very low opacity so it reads as a quiet watch-face echo, not decoration. */
function HeaderMotif() {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 overflow-hidden"
    >
      <div className="absolute -right-24 -top-40 opacity-[0.06]">
        <svg width="520" height="520" viewBox="0 0 520 520" fill="none">
          <g stroke="#C5A572" strokeWidth="0.75">
            <circle
              cx="260"
              cy="260"
              r="250"
              className="origin-center animate-spin-slower"
              strokeDasharray="2 10"
            />
            <circle cx="260" cy="260" r="200" />
            <circle
              cx="260"
              cy="260"
              r="150"
              className="origin-center animate-spin-slow"
              strokeDasharray="1 14"
            />
            <circle cx="260" cy="260" r="100" />
            {/* slow sweeping hand */}
            <line
              x1="260"
              y1="260"
              x2="260"
              y2="40"
              className="origin-center animate-spin-slow"
            />
          </g>
        </svg>
      </div>
    </div>
  )
}

/* Shared fade/slide transition for tab panels. */
const panelMotion = {
  initial: { opacity: 0, y: 14 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -8 },
  transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
}

/* ===========================================================================
   TAB 1 — THE COLLECTION
   =========================================================================== */

function WatchCard({ watch, index, onOpen }) {
  return (
    <motion.button
      type="button"
      onClick={() => onOpen(watch)}
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55, delay: index * 0.12, ease: [0.22, 1, 0.36, 1] }}
      className="group relative flex flex-col overflow-hidden rounded-sm border border-white/5 bg-vault-panel/60 text-left transition-all duration-500 hover:-translate-y-1 hover:border-vault-gold/40 hover:gold-glow"
    >
      {/* Image placeholder — dark gradient + thin gold per-watch silhouette */}
      <div
        className="relative flex h-56 items-center justify-center"
        style={{
          background: `radial-gradient(120% 120% at 50% 25%, ${watch.accent}55 0%, #0A0A0C 70%)`,
        }}
      >
        <WatchSilhouette
          watch={watch}
          className="h-32 w-32 transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute left-4 top-4">
          {watch.authenticated && <GoldBadge>Authenticated</GoldBadge>}
        </div>
        <Hairline className="absolute bottom-0 left-0" />
      </div>

      {/* Details */}
      <div className="flex flex-1 flex-col gap-3 px-6 py-6">
        <div>
          <Label>{watch.maker}</Label>
          <h3 className="mt-1 font-serif text-2xl leading-tight text-vault-ivory">
            {watch.model}
          </h3>
        </div>

        <div className="flex items-center gap-3 text-xs text-vault-grey">
          <span>{watch.reference}</span>
          <span className="text-vault-gold/40">·</span>
          <span>{watch.material}</span>
          <span className="text-vault-gold/40">·</span>
          <span>{watch.year}</span>
        </div>

        <div className="mt-auto flex items-end justify-between pt-4">
          <div>
            <Label>Estimated Value</Label>
            <p className="mt-1 font-serif text-xl text-vault-gold">{watch.value}</p>
          </div>
          <span className="inline-flex items-center gap-1 text-[11px] uppercase tracking-[0.2em] text-vault-grey transition-colors duration-300 group-hover:text-vault-gold">
            View
            <ChevronRight size={14} className="transition-transform duration-300 group-hover:translate-x-1" />
          </span>
        </div>
      </div>
    </motion.button>
  )
}

function CollectionTab({ onOpen }) {
  return (
    <div>
      <div className="mb-10 flex items-end justify-between">
        <div>
          <Label>The Collection</Label>
          <h2 className="mt-2 font-serif text-4xl font-light text-vault-ivory">
            Three pieces, fully accounted for.
          </h2>
        </div>
        <p className="hidden max-w-xs text-right text-sm font-light leading-relaxed text-vault-grey md:block">
          Each timepiece in the archive is authenticated, documented and held in
          perpetual record.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {WATCHES.map((watch, i) => (
          <WatchCard key={watch.id} watch={watch} index={i} onOpen={onOpen} />
        ))}
      </div>
    </div>
  )
}

/* ===========================================================================
   TAB 2 — PROVENANCE (the showpiece)
   =========================================================================== */

function ProvenanceNode({ stage, index, isCurrent, isLast, expanded, onToggle }) {
  const Icon = STAGE_META[stage.stage]?.icon ?? Clock
  const isReadyForTransfer = stage.stage === 'Ready for Transfer'

  return (
    <div className="relative pl-16">
      {/* Vertical gold-dotted connector */}
      {!isLast && (
        <span
          aria-hidden
          className="absolute left-[27px] top-12 bottom-[-28px] w-px"
          style={{
            backgroundImage:
              'linear-gradient(to bottom, rgba(197,165,114,0.55) 0 4px, transparent 4px 10px)',
            backgroundSize: '1px 10px',
          }}
        />
      )}

      {/* Node marker */}
      <span
        className={[
          'absolute left-2 top-0 flex h-12 w-12 items-center justify-center rounded-full border transition-all duration-500',
          isCurrent
            ? 'border-vault-gold bg-vault-gold/10 text-vault-gold gold-glow'
            : isReadyForTransfer
              ? 'border-dashed border-vault-gold/40 text-vault-gold/60'
              : 'border-white/10 bg-vault-panel text-vault-grey',
        ].join(' ')}
      >
        <Icon size={18} strokeWidth={1.5} />
      </span>

      {/* Content */}
      <button
        type="button"
        onClick={onToggle}
        className="group flex w-full items-center justify-between gap-4 pb-2 pt-1 text-left"
      >
        <div>
          <div className="flex items-center gap-3">
            <h4
              className={`font-serif text-2xl leading-none ${
                isCurrent ? 'text-vault-gold' : 'text-vault-ivory'
              }`}
            >
              {stage.stage}
            </h4>
            {isCurrent && (
              <span className="inline-flex items-center gap-1 text-[10px] uppercase tracking-[0.2em] text-vault-gold">
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-vault-gold" />
                Current
              </span>
            )}
          </div>
          <p className="mt-1.5 text-xs uppercase tracking-[0.18em] text-vault-grey">
            {stage.date}
          </p>
        </div>
        <ChevronRight
          size={18}
          className={`shrink-0 text-vault-grey transition-transform duration-300 ${
            expanded ? 'rotate-90 text-vault-gold' : 'group-hover:translate-x-0.5'
          }`}
        />
      </button>

      {/* Expandable detail */}
      <AnimatePresence initial={false}>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <div className="mb-8 mt-3 space-y-3 rounded-sm border border-white/5 bg-vault-panel/50 p-5">
              <div className="flex items-start gap-3 text-sm text-vault-ivory/90">
                <MapPin size={15} className="mt-0.5 shrink-0 text-vault-gold" strokeWidth={1.5} />
                <span>{stage.location}</span>
              </div>
              <div className="flex items-start gap-3 text-sm text-vault-grey">
                <FileText size={15} className="mt-0.5 shrink-0 text-vault-gold/70" strokeWidth={1.5} />
                <span className="font-mono text-xs tracking-wide">{stage.ref}</span>
              </div>
              <Hairline className="my-1 opacity-60" />
              <p className="text-sm font-light leading-relaxed text-vault-ivory/70">
                {stage.note}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

function ProvenanceTab({ watch, onSelectWatch }) {
  // First node open by default to invite exploration.
  const [openIndex, setOpenIndex] = useState(0)

  return (
    <div className="grid grid-cols-1 gap-10 lg:grid-cols-[260px_1fr]">
      {/* Left rail — select which piece's story to view */}
      <aside>
        <Label>Select a Piece</Label>
        <div className="mt-4 space-y-2">
          {WATCHES.map((w) => {
            const active = w.id === watch.id
            return (
              <button
                key={w.id}
                type="button"
                onClick={() => {
                  onSelectWatch(w.id)
                  setOpenIndex(0)
                }}
                className={[
                  'flex w-full items-center gap-3 rounded-sm border px-4 py-3 text-left transition-all duration-300',
                  active
                    ? 'border-vault-gold/40 bg-vault-gold/5'
                    : 'border-white/5 bg-vault-panel/40 hover:border-white/15',
                ].join(' ')}
              >
                <WatchOutline
                  className="h-8 w-8 shrink-0"
                  stroke={active ? '#C5A572' : '#8B8B8F'}
                />
                <div className="min-w-0">
                  <p
                    className={`truncate font-serif text-base ${
                      active ? 'text-vault-gold' : 'text-vault-ivory'
                    }`}
                  >
                    {w.model}
                  </p>
                  <p className="truncate text-[11px] text-vault-grey">{w.maker}</p>
                </div>
              </button>
            )
          })}
        </div>

        <div className="mt-8 rounded-sm border border-white/5 bg-vault-panel/40 p-5">
          <Label>Journey</Label>
          <p className="mt-3 font-serif text-3xl text-vault-ivory">
            {watch.provenance.length} stages
          </p>
          <p className="mt-2 text-sm font-light leading-relaxed text-vault-grey">
            From the first handshake to the moment it passes on — every chapter
            held in record.
          </p>
        </div>
      </aside>

      {/* The timeline itself */}
      <div>
        <div className="mb-10">
          <Label>{watch.maker} — Provenance</Label>
          <h2 className="mt-2 font-serif text-4xl font-light text-vault-ivory">
            {watch.model}
          </h2>
          <p className="mt-3 max-w-xl text-sm font-light leading-relaxed text-vault-grey">
            The life of a timepiece, told in full. Each chapter is dated, located
            and certified — an unbroken chain of custody.
          </p>
        </div>

        <div className="space-y-7">
          {watch.provenance.map((stage, i) => (
            <ProvenanceNode
              key={stage.stage}
              stage={stage}
              index={i}
              isCurrent={i === CURRENT_STAGE_INDEX}
              isLast={i === watch.provenance.length - 1}
              expanded={openIndex === i}
              onToggle={() => setOpenIndex(openIndex === i ? -1 : i)}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

/* ===========================================================================
   TAB 3 — DOCUMENTS
   =========================================================================== */

function DocumentRow({ doc, index }) {
  const Icon = DOC_META[doc.type]?.icon ?? FileText
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, delay: index * 0.07 }}
      className="group flex items-center gap-5 border-b border-white/5 px-2 py-5 transition-colors duration-300 hover:bg-white/[0.015]"
    >
      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-sm border border-white/10 bg-vault-panel text-vault-gold transition-colors duration-300 group-hover:border-vault-gold/40">
        <Icon size={18} strokeWidth={1.5} />
      </div>
      <div className="min-w-0 flex-1">
        <p className="font-serif text-lg text-vault-ivory">{doc.title}</p>
        <p className="mt-0.5 text-xs uppercase tracking-[0.16em] text-vault-grey">
          {doc.date}
        </p>
      </div>
      <GoldBadge icon={Check}>Verified</GoldBadge>
      <ChevronRight
        size={16}
        className="ml-2 hidden text-vault-grey transition-transform duration-300 group-hover:translate-x-1 sm:block"
      />
    </motion.div>
  )
}

function DocumentsTab({ watch, onSelectWatch }) {
  return (
    <div>
      <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
        <div>
          <Label>Documents</Label>
          <h2 className="mt-2 font-serif text-4xl font-light text-vault-ivory">
            The paper trail, immaculate.
          </h2>
        </div>
        <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-vault-panel/60 px-3 py-1.5 text-[11px] uppercase tracking-[0.18em] text-vault-grey">
          <Lock size={12} className="text-vault-gold" strokeWidth={1.75} />
          Encrypted &amp; Private
        </div>
      </div>

      {/* Piece selector */}
      <div className="mb-6 flex flex-wrap gap-2">
        {WATCHES.map((w) => {
          const active = w.id === watch.id
          return (
            <button
              key={w.id}
              type="button"
              onClick={() => onSelectWatch(w.id)}
              className={[
                'rounded-full border px-4 py-2 text-xs tracking-wide transition-all duration-300',
                active
                  ? 'border-vault-gold/50 bg-vault-gold/5 text-vault-gold'
                  : 'border-white/10 text-vault-grey hover:border-white/25 hover:text-vault-ivory',
              ].join(' ')}
            >
              {w.model}
            </button>
          )
        })}
      </div>

      <div className="rounded-sm border border-white/5 bg-vault-panel/30 px-5 py-2 sm:px-8">
        {watch.documents.map((doc, i) => (
          <DocumentRow key={doc.title} doc={doc} index={i} />
        ))}
        <div className="flex items-center gap-2 py-5 text-xs text-vault-grey">
          <Lock size={13} className="text-vault-gold/70" strokeWidth={1.5} />
          All documents are end-to-end encrypted and accessible only to the
          collector and designated parties.
        </div>
      </div>
    </div>
  )
}

/* ===========================================================================
   TAB 4 — LEGACY (the most premium-feeling tab)
   =========================================================================== */

function LegacyChecklistItem({ label, done, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -8 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: 0.2 + index * 0.12 }}
      className="flex items-center gap-4 border-b border-white/5 py-4 last:border-0"
    >
      <span
        className={[
          'flex h-7 w-7 items-center justify-center rounded-full border',
          done
            ? 'border-vault-gold/50 bg-vault-gold/10 text-vault-gold'
            : 'border-white/15 text-vault-grey',
        ].join(' ')}
      >
        <Check size={14} strokeWidth={2} />
      </span>
      <span className="flex-1 text-sm font-light tracking-wide text-vault-ivory/90">
        {label}
      </span>
      <span className="text-[10px] uppercase tracking-[0.2em] text-vault-gold">
        {done ? 'Complete' : 'Pending'}
      </span>
    </motion.div>
  )
}

function LegacyTab() {
  const checklist = [
    { label: 'Provenance complete across all pieces', done: true },
    { label: 'Documents verified & encrypted', done: true },
    { label: 'Valuation current (reviewed 2025)', done: true },
    { label: 'Beneficiary designated & notified', done: true },
  ]

  return (
    <div className="relative mx-auto max-w-3xl text-center">
      {/* Quiet ceremonial motif */}
      <div className="mb-8 flex justify-center">
        <div className="relative flex h-20 w-20 items-center justify-center rounded-full border border-vault-gold/30">
          <div className="absolute inset-0 animate-spin-slower rounded-full border border-dashed border-vault-gold/20" />
          <Gift size={26} className="text-vault-gold" strokeWidth={1.25} />
        </div>
      </div>

      <Label>Legacy</Label>
      <h2 className="mx-auto mt-3 max-w-2xl font-serif text-4xl font-light leading-tight text-vault-ivory md:text-5xl">
        Prepare this collection for the next generation.
      </h2>
      <p className="mx-auto mt-5 max-w-xl text-base font-light leading-relaxed text-vault-grey">
        A timepiece is held, never truly owned. MAISON ARCHIVE ensures that when
        the moment arrives, the entire story — provenance, documents and
        valuation — transfers as one.
      </p>

      <Hairline className="my-12" />

      {/* Beneficiary */}
      <div className="mx-auto max-w-xl rounded-sm border border-white/5 bg-vault-panel/40 p-8 text-left">
        <Label>Designated Beneficiary</Label>
        <div className="mt-4 flex items-center justify-between gap-4 border-b border-vault-gold/20 pb-4">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-full border border-vault-gold/40 font-serif text-lg text-vault-gold">
              R
            </div>
            <div>
              <p className="font-serif text-xl text-vault-ivory">
                {COLLECTOR.beneficiary}
              </p>
              <p className="text-xs uppercase tracking-[0.18em] text-vault-grey">
                Son · Primary Heir
              </p>
            </div>
          </div>
          <BadgeCheck size={22} className="text-vault-gold" strokeWidth={1.25} />
        </div>

        {/* Transfer-readiness checklist */}
        <div className="mt-6">
          <Label>Transfer Readiness</Label>
          <div className="mt-2">
            {checklist.map((item, i) => (
              <LegacyChecklistItem
                key={item.label}
                label={item.label}
                done={item.done}
                index={i}
              />
            ))}
          </div>
        </div>

        <button
          type="button"
          className="mt-8 inline-flex w-full items-center justify-center gap-2 rounded-sm border border-vault-gold/40 bg-vault-gold/5 px-6 py-3.5 text-xs uppercase tracking-[0.25em] text-vault-gold transition-all duration-500 hover:bg-vault-gold/10 hover:gold-glow"
        >
          <ArrowRightLeft size={14} strokeWidth={1.5} />
          Initiate Generational Transfer
        </button>
      </div>

      <p className="mx-auto mt-12 max-w-lg font-serif text-xl font-light italic leading-relaxed text-vault-gold/90">
        “When the time comes, the story transfers as completely as the
        timepiece.”
      </p>
    </div>
  )
}

/* ===========================================================================
   TOP BAR + WELCOME + TAB NAV
   =========================================================================== */

function TopBar() {
  return (
    <header className="relative border-b border-white/5">
      <HeaderMotif />
      <div className="relative mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
        {/* Left — monogram mark */}
        <div className="flex flex-1 items-center">
          <Monogram size={40} />
        </div>

        {/* Center — wordmark */}
        <div className="flex flex-col items-center">
          <h1 className="font-serif text-2xl tracking-[0.3em] text-vault-ivory md:text-3xl">
            MAISON ARCHIVE
          </h1>
          <span className="mt-1 hidden text-[9px] uppercase tracking-[0.4em] text-vault-gold/70 sm:block">
            Private Custody of Fine Timepieces
          </span>
        </div>

        {/* Right — edition tag + avatar */}
        <div className="flex flex-1 items-center justify-end gap-4">
          <span className="hidden items-center gap-2 rounded-full border border-vault-gold/30 px-3 py-1 text-[10px] uppercase tracking-[0.22em] text-vault-gold md:inline-flex">
            {COLLECTOR.edition}
          </span>
          <div className="flex h-9 w-9 items-center justify-center rounded-full border border-vault-gold/40 bg-vault-panel font-serif text-sm text-vault-gold">
            {COLLECTOR.initial}
          </div>
        </div>
      </div>
    </header>
  )
}

function WelcomeBar() {
  return (
    <section className="relative border-b border-white/5">
      <HeaderMotif />
      <div className="relative mx-auto flex max-w-6xl flex-col gap-6 px-6 py-10 md:flex-row md:items-end md:justify-between">
        <div>
          <Label>Welcome back</Label>
          <h2 className="mt-2 font-serif text-4xl font-light text-vault-ivory md:text-5xl">
            {COLLECTOR.honorific} {COLLECTOR.name}
          </h2>
          <p className="mt-2 text-sm font-light text-vault-grey">
            {COLLECTOR.estate}
          </p>
        </div>

        {/* Collection summary */}
        <div className="flex items-center gap-8">
          <div>
            <Label>Pieces</Label>
            <p className="mt-1 font-serif text-3xl text-vault-ivory">
              {WATCHES.length}
            </p>
          </div>
          <div className="h-12 w-px bg-white/10" />
          <div>
            <Label>Estimated Combined Value</Label>
            <p className="mt-1 font-serif text-3xl text-vault-gold">$528,000</p>
          </div>
          <div className="h-12 w-px bg-white/10" />
          <div>
            <Label>Status</Label>
            <p className="mt-1.5 inline-flex items-center gap-1.5 text-sm text-vault-gold">
              <ShieldCheck size={16} strokeWidth={1.75} />
              Fully Authenticated
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

function TabNav({ active, onChange }) {
  return (
    <nav className="relative mx-auto max-w-6xl px-6">
      <div className="flex gap-8 overflow-x-auto md:gap-12">
        {TABS.map((tab) => {
          const isActive = tab === active
          return (
            <button
              key={tab}
              type="button"
              onClick={() => onChange(tab)}
              className={`relative whitespace-nowrap py-5 text-[11px] uppercase tracking-[0.25em] transition-colors duration-300 ${
                isActive ? 'text-vault-gold' : 'text-vault-grey hover:text-vault-ivory'
              }`}
            >
              {tab}
              {isActive && (
                <motion.span
                  layoutId="tab-underline"
                  className="absolute inset-x-0 bottom-0 h-px bg-vault-gold"
                  transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                />
              )}
            </button>
          )
        })}
      </div>
      <Hairline />
    </nav>
  )
}

/* ===========================================================================
   ROOT COMPONENT
   =========================================================================== */

export default function MaisonArchive() {
  const [activeTab, setActiveTab] = useState('The Collection')
  const [selectedWatchId, setSelectedWatchId] = useState(WATCHES[0].id)

  const selectedWatch =
    WATCHES.find((w) => w.id === selectedWatchId) ?? WATCHES[0]

  // Clicking a collection card opens that watch's Provenance (Tab 2 prefilled).
  const openWatch = (watch) => {
    setSelectedWatchId(watch.id)
    setActiveTab('Provenance')
  }

  return (
    <div className="min-h-screen bg-vault-black">
      <TopBar />
      <WelcomeBar />
      <TabNav active={activeTab} onChange={setActiveTab} />

      <main className="mx-auto max-w-6xl px-6 py-14">
        <AnimatePresence mode="wait">
          <motion.div key={activeTab} {...panelMotion}>
            {activeTab === 'The Collection' && (
              <CollectionTab onOpen={openWatch} />
            )}
            {activeTab === 'Provenance' && (
              <ProvenanceTab
                watch={selectedWatch}
                onSelectWatch={setSelectedWatchId}
              />
            )}
            {activeTab === 'Documents' && (
              <DocumentsTab
                watch={selectedWatch}
                onSelectWatch={setSelectedWatchId}
              />
            )}
            {activeTab === 'Legacy' && <LegacyTab />}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Quiet footer */}
      <footer className="border-t border-white/5">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-6 py-8 sm:flex-row">
          <div className="flex items-center gap-3">
            <Monogram size={28} />
            <span className="text-[10px] uppercase tracking-[0.3em] text-vault-grey">
              Maison Archive — Private Custody
            </span>
          </div>
          <p className="text-[10px] uppercase tracking-[0.25em] text-vault-grey">
            Encrypted · Insured · Eternal
          </p>
        </div>
      </footer>
    </div>
  )
}

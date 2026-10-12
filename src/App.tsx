import { useCallback, useEffect, useLayoutEffect, useRef, useState, type ReactNode } from 'react'
import { AnimatePresence, MotionConfig, motion } from 'motion/react'
import { ChevronLeft, ChevronRight, LayoutGrid, Maximize, Minimize, NotebookText, X } from 'lucide-react'
import { SLIDES } from './slides'
import { StaticCtx } from './components/ui'

const W = 1920
const H = 1080
const COUNT = SLIDES.length
const BG = { dark: '#0a0e18', light: '#f2f3f6' } as const

function readHash() {
  const n = parseInt(window.location.hash.replace('#', ''), 10)
  return Number.isFinite(n) && n >= 1 && n <= COUNT ? n - 1 : 0
}

function useViewport() {
  const [vp, setVp] = useState({ w: window.innerWidth, h: window.innerHeight })
  useLayoutEffect(() => {
    const onResize = () => setVp({ w: window.innerWidth, h: window.innerHeight })
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])
  return vp
}

/** A slide rendered at 1920×1080 and scaled to `width`, with entrance animations disabled. */
function StaticSlide({ index, width }: { index: number; width: number }) {
  const { Component } = SLIDES[index]
  const k = width / W
  return (
    <div className="relative overflow-hidden" style={{ width, height: H * k }}>
      <div className="is-static pointer-events-none absolute left-0 top-0 origin-top-left" style={{ width: W, height: H, transform: `scale(${k})` }} inert>
        <StaticCtx.Provider value>
          <Component />
        </StaticCtx.Provider>
      </div>
    </div>
  )
}

export default function App() {
  const vp = useViewport()
  const [index, setIndex] = useState(readHash)
  const [overview, setOverview] = useState(false)
  const [notes, setNotes] = useState(false)
  const [isFs, setIsFs] = useState(false)
  const [chrome, setChrome] = useState(true)
  const hideTimer = useRef<number | undefined>(undefined)

  const scrollMode = vp.w < 820 && vp.h > vp.w
  const scale = Math.min(vp.w / W, vp.h / H)
  const slide = SLIDES[index]

  const go = useCallback((i: number) => setIndex(Math.max(0, Math.min(COUNT - 1, i))), [])
  const next = useCallback(() => setIndex((i) => Math.min(COUNT - 1, i + 1)), [])
  const prev = useCallback(() => setIndex((i) => Math.max(0, i - 1)), [])

  const toggleFs = useCallback(() => {
    if (document.fullscreenElement) void document.exitFullscreen()
    else void document.documentElement.requestFullscreen?.().catch(() => {})
  }, [])

  useEffect(() => {
    history.replaceState(null, '', `#${index + 1}`)
    document.title = `${index + 1}/${COUNT} · ${slide.title} · Stake-Sync`
  }, [index, slide.title])

  useEffect(() => {
    document.body.style.backgroundColor = scrollMode ? BG.dark : BG[slide.theme]
    document.body.classList.toggle('scroll-mode', scrollMode)
  }, [slide.theme, scrollMode])

  useEffect(() => {
    const onHash = () => setIndex(readHash())
    const onFs = () => setIsFs(!!document.fullscreenElement)
    window.addEventListener('hashchange', onHash)
    document.addEventListener('fullscreenchange', onFs)
    return () => {
      window.removeEventListener('hashchange', onHash)
      document.removeEventListener('fullscreenchange', onFs)
    }
  }, [])

  // Keyboard navigation
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.metaKey || e.ctrlKey || e.altKey) return
      const t = e.target as HTMLElement
      const interactive = ['BUTTON', 'A', 'INPUT', 'TEXTAREA', 'SELECT'].includes(t.tagName)
      switch (e.key) {
        case 'ArrowRight':
        case 'PageDown':
          e.preventDefault()
          next()
          break
        case 'ArrowLeft':
        case 'PageUp':
          e.preventDefault()
          prev()
          break
        case ' ':
          if (interactive) return
          e.preventDefault()
          if (e.shiftKey) prev()
          else next()
          break
        case 'Home':
          e.preventDefault()
          go(0)
          break
        case 'End':
          e.preventDefault()
          go(COUNT - 1)
          break
        case 'Escape':
          e.preventDefault()
          setOverview((o) => !o)
          break
        case 'Enter':
          if (overview && !interactive) setOverview(false)
          break
        case 'f':
        case 'F':
          toggleFs()
          break
        case 'n':
        case 'N':
          setNotes((v) => !v)
          break
        default:
          if (/^[0-9]$/.test(e.key)) go(e.key === '0' ? 9 : Number(e.key) - 1)
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [next, prev, go, toggleFs, overview])

  // Auto-hide the control bar while presenting
  const wake = useCallback(() => {
    setChrome(true)
    window.clearTimeout(hideTimer.current)
    hideTimer.current = window.setTimeout(() => setChrome(false), 2800)
  }, [])
  useEffect(() => {
    wake()
    window.addEventListener('mousemove', wake)
    return () => window.removeEventListener('mousemove', wake)
  }, [wake])

  if (scrollMode) {
    const width = vp.w - 32
    return (
      <main className="mx-auto flex flex-col gap-4 px-4 py-6">
        <p className="text-center text-[14px] text-white/60">Rotate your device for presentation mode.</p>
        {SLIDES.map((s, i) => (
          <section key={s.title} aria-label={`Slide ${i + 1}: ${s.title}`} className="overflow-hidden rounded-xl">
            <StaticSlide index={i} width={width} />
          </section>
        ))}
      </main>
    )
  }

  const dark = slide.theme === 'dark'
  const Current = slide.Component

  return (
    <MotionConfig reducedMotion="user">
      <main className="fixed inset-0 overflow-hidden" aria-roledescription="presentation" aria-label="Stake-Sync presentation">
        {/* Stage */}
        <div
          className="absolute left-1/2 top-1/2"
          style={{ width: W, height: H, transform: `translate(-50%, -50%) scale(${scale})` }}
        >
          <AnimatePresence mode="wait" initial={false}>
            <motion.section
              key={index}
              className="absolute inset-0"
              aria-roledescription="slide"
              aria-label={`Slide ${index + 1} of ${COUNT}: ${slide.title}`}
              initial={{ opacity: 0, scale: 0.985 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.01 }}
              transition={{ duration: 0.32, ease: [0.4, 0, 0.2, 1] }}
            >
              <Current />
            </motion.section>
          </AnimatePresence>
        </div>

        {/* Progress */}
        <div className="fixed left-0 right-0 top-0 h-[3px] bg-transparent" aria-hidden="true">
          <div className="h-full bg-brand transition-[width] duration-500 ease-out" style={{ width: `${((index + 1) / COUNT) * 100}%` }} />
        </div>

        {/* Controls */}
        <nav
          aria-label="Slide controls"
          onFocus={wake}
          onMouseEnter={wake}
          className={`fixed bottom-4 left-1/2 z-40 flex -translate-x-1/2 items-center gap-1 rounded-full border px-2 py-1.5 shadow-lg backdrop-blur-md transition-opacity duration-300 focus-within:opacity-100 ${
            chrome || overview ? 'opacity-100' : 'opacity-0'
          } ${dark ? 'border-white/10 bg-[#121826]/80 text-white' : 'border-black/10 bg-white/85 text-ink'}`}
        >
          <CtrlButton label="Previous slide" onClick={prev} disabled={index === 0} dark={dark}>
            <ChevronLeft size={18} />
          </CtrlButton>
          <div className="mx-1 flex items-center gap-1.5">
            {SLIDES.map((s, i) => (
              <button
                key={s.title}
                type="button"
                onClick={() => go(i)}
                aria-label={`Go to slide ${i + 1}: ${s.title}`}
                aria-current={i === index ? 'true' : undefined}
                className="group flex h-6 items-center px-0.5"
              >
                <span
                  className={`block h-1.5 rounded-full transition-all duration-300 ${
                    i === index ? 'w-6 bg-brand' : `w-1.5 ${dark ? 'bg-white/30 group-hover:bg-white/60' : 'bg-black/20 group-hover:bg-black/45'}`
                  }`}
                />
              </button>
            ))}
          </div>
          <CtrlButton label="Next slide" onClick={next} disabled={index === COUNT - 1} dark={dark}>
            <ChevronRight size={18} />
          </CtrlButton>
          <span className={`tnum mx-2 text-[13px] font-medium ${dark ? 'text-white/60' : 'text-muted'}`}>
            {index + 1} / {COUNT}
          </span>
          <span className={`mx-1 h-5 w-px ${dark ? 'bg-white/15' : 'bg-black/10'}`} />
          <CtrlButton label="Slide overview (Esc)" onClick={() => setOverview((o) => !o)} pressed={overview} dark={dark}>
            <LayoutGrid size={17} />
          </CtrlButton>
          <CtrlButton label="Presenter notes (N)" onClick={() => setNotes((v) => !v)} pressed={notes} dark={dark}>
            <NotebookText size={17} />
          </CtrlButton>
          <CtrlButton label={isFs ? 'Exit fullscreen (F)' : 'Fullscreen (F)'} onClick={toggleFs} dark={dark}>
            {isFs ? <Minimize size={17} /> : <Maximize size={17} />}
          </CtrlButton>
        </nav>

        {/* Presenter notes */}
        <AnimatePresence>
          {notes && (
            <motion.aside
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 16 }}
              className="fixed bottom-20 left-4 z-40 w-[min(560px,calc(100vw-32px))] rounded-2xl border border-white/10 bg-[#121826]/95 p-5 text-white shadow-2xl backdrop-blur"
              aria-label="Presenter notes"
            >
              <div className="mb-2 flex items-center justify-between text-[12px] font-semibold uppercase tracking-[0.14em] text-white/50">
                Notes · slide {index + 1}
                <button type="button" onClick={() => setNotes(false)} aria-label="Close notes" className="rounded-md p-1 hover:bg-white/10">
                  <X size={15} />
                </button>
              </div>
              <p className="text-[15px] leading-relaxed text-white/85">{slide.notes}</p>
            </motion.aside>
          )}
        </AnimatePresence>

        {/* Overview */}
        <AnimatePresence>
          {overview && <Overview index={index} vpw={vp.w} onPick={(i) => { go(i); setOverview(false) }} onClose={() => setOverview(false)} />}
        </AnimatePresence>
      </main>
    </MotionConfig>
  )
}

function CtrlButton({
  label,
  onClick,
  children,
  disabled,
  pressed,
  dark,
}: {
  label: string
  onClick: () => void
  children: ReactNode
  disabled?: boolean
  pressed?: boolean
  dark: boolean
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={label}
      title={label}
      aria-pressed={pressed}
      className={`flex h-9 w-9 items-center justify-center rounded-full transition disabled:opacity-30 ${
        pressed ? 'bg-brand text-white' : dark ? 'hover:bg-white/10' : 'hover:bg-black/5'
      }`}
    >
      {children}
    </button>
  )
}

function Overview({ index, vpw, onPick, onClose }: { index: number; vpw: number; onPick: (i: number) => void; onClose: () => void }) {
  const currentRef = useRef<HTMLButtonElement>(null)
  useEffect(() => {
    currentRef.current?.focus()
  }, [index])
  const cols = vpw >= 1100 ? 5 : vpw >= 700 ? 3 : 2
  const thumbW = Math.min(340, (vpw - 64 - (cols - 1) * 20) / cols)

  return (
    <motion.div
      role="dialog"
      aria-modal="true"
      aria-label="Slide overview"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="fixed inset-0 z-50 overflow-auto bg-[#070a12]/92 p-8 backdrop-blur-md"
      onClick={onClose}
    >
      <div className="mx-auto flex max-w-[1900px] flex-col items-center">
        <div className="mb-6 flex w-full items-center justify-between text-white" style={{ maxWidth: cols * thumbW + (cols - 1) * 20 }}>
          <h2 className="font-display text-[22px] font-bold">All slides</h2>
          <span className="text-[13px] text-white/50">← → to move · Enter to open · Esc to close</span>
        </div>
        <div className="grid gap-5" style={{ gridTemplateColumns: `repeat(${cols}, ${thumbW}px)` }}>
          {SLIDES.map((s, i) => (
            <button
              key={s.title}
              ref={i === index ? currentRef : undefined}
              type="button"
              onClick={(e) => {
                e.stopPropagation()
                onPick(i)
              }}
              aria-label={`Open slide ${i + 1}: ${s.title}`}
              aria-current={i === index ? 'true' : undefined}
              className={`group text-left transition ${i === index ? '' : 'opacity-75 hover:opacity-100'}`}
            >
              <div className={`overflow-hidden rounded-xl ring-2 transition ${i === index ? 'ring-brand' : 'ring-white/10 group-hover:ring-white/40'}`}>
                <StaticSlide index={i} width={thumbW} />
              </div>
              <div className="mt-2 flex gap-2 text-[13px] text-white/80">
                <span className="tnum text-white/45">{String(i + 1).padStart(2, '0')}</span>
                <span className="truncate">{s.title}</span>
              </div>
            </button>
          ))}
        </div>
      </div>
    </motion.div>
  )
}

import { useEffect, useState, type ReactNode } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import { Heart, RotateCcw, ShieldCheck, Code2 } from 'lucide-react'
import { LIVE_HOST, LogoMark, Reveal, SlideShell, useIsStatic } from '../components/ui'

const MISSED = new Set([9, 21])
const TOTAL = 30

/** Animated recreation of the 30-day card shown on the Stake-Sync landing page. */
function ChallengeCard() {
  const isStatic = useIsStatic()
  const reduce = useReducedMotion()
  const instant = isStatic || !!reduce
  const [day, setDay] = useState(instant ? TOTAL : 0)
  const [run, setRun] = useState(0)

  useEffect(() => {
    if (instant) {
      setDay(TOTAL)
      return
    }
    setDay(0)
    let d = 0
    let timer: number
    const start = window.setTimeout(() => {
      timer = window.setInterval(() => {
        d += 1
        setDay(d)
        if (d >= TOTAL) window.clearInterval(timer)
      }, 85)
    }, 900)
    return () => {
      window.clearTimeout(start)
      window.clearInterval(timer)
    }
  }, [instant, run])

  const misses = [...MISSED].filter((m) => m <= day).length
  const strikesLeft = 3 - misses
  const verified = day - misses
  const done = day >= TOTAL

  return (
    <div className="relative">
      <div className="rounded-[30px] bg-white px-9 pb-[84px] pt-9 text-ink shadow-[0_50px_140px_-30px_rgba(48,85,245,0.6)] ring-1 ring-white/30">
        <div className="flex items-start justify-between">
          <div>
            <div className="flex items-center gap-2 text-[19px] text-muted">
              <Code2 size={20} strokeWidth={2.2} /> 30 Days of Code
            </div>
            <div className="font-display mt-1 text-[52px] font-bold leading-none tracking-[-0.03em]">
              Day <span className="tnum">{Math.max(day, 1)}</span>
              <span className="text-[#a3a9b6]"> / 30</span>
            </div>
          </div>
          <div className="text-right">
            <div className="text-[18px] text-muted">Strikes left</div>
            <div className="mt-2 flex justify-end gap-1.5">
              {[0, 1, 2].map((i) => (
                <Heart
                  key={i}
                  size={26}
                  strokeWidth={1.8}
                  className={i < strikesLeft ? 'fill-strike text-strike' : 'text-[#c9ced8]'}
                  style={{ transition: 'all .3s' }}
                />
              ))}
            </div>
          </div>
        </div>

        <div className="mt-7 grid grid-cols-10 gap-[9px]" role="img" aria-label="30-day progress grid: 28 verified days and 2 missed days">
          {Array.from({ length: TOTAL }, (_, i) => {
            const n = i + 1
            const filled = n <= day
            const missed = MISSED.has(n)
            const current = n === day && !done
            return (
              <div
                key={i}
                className={`aspect-square rounded-[10px] transition-all duration-300 ${
                  filled ? (missed ? 'bg-strike' : 'bg-brand') : 'bg-[#eef0f4]'
                } ${current ? 'pulse-ring scale-105' : ''}`}
              />
            )
          })}
        </div>
        <div className="mt-4 text-[18px] text-muted">Needs 25 of 30 days. Three free strikes.</div>

        <div className="mt-6 grid grid-cols-3 border-t border-line pt-6">
          <Stat label="Verified" value={<><span className="tnum">{verified}</span> <span className="text-[20px] text-muted">days</span></>} />
          <Stat label="Your stake" value="$20" />
          <Stat label="Penalties" value="$0" />
        </div>
      </div>

      <AnimatePresence>
        {done && (
          <motion.div
            initial={instant ? false : { opacity: 0, y: 24, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="absolute -bottom-[64px] left-8 right-8 flex items-center justify-between rounded-[18px] bg-[#161a24] px-7 py-5 text-white shadow-2xl ring-1 ring-white/10"
          >
            <div>
              <div className="text-[17px] text-white/60">Challenge complete. Ready to claim</div>
              <div className="mt-1 flex items-baseline gap-3">
                <span className="font-display text-[36px] font-bold tracking-[-0.02em]">$25.94</span>
                <span className="text-[18px] text-white/55">$20 stake + $5.94 reward</span>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setRun((r) => r + 1)}
              aria-label="Replay the challenge animation"
              className="flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-white/80 transition hover:bg-white/20"
            >
              <RotateCcw size={20} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

function Stat({ label, value }: { label: string; value: ReactNode }) {
  return (
    <div>
      <div className="text-[17px] text-muted">{label}</div>
      <div className="font-display mt-1 text-[32px] font-bold tracking-[-0.02em]">{value}</div>
    </div>
  )
}

export default function S01Opening() {
  return (
    <SlideShell theme="dark" number={1} label="Stake-Sync" hideBrand>
      <div className="flex h-full items-center justify-between gap-16">
        <div className="w-[980px]">
          <Reveal delay={0.05} className="mb-10 flex items-center gap-5">
            <LogoMark size={76} className="rounded-[19px] ring-1 ring-white/20" />
            <div>
              <div className="font-display text-[46px] font-bold leading-none tracking-[-0.02em]">Stake-Sync</div>
              <div className="mt-2 text-[19px] text-white/55">Accountability challenges, settled on Solana</div>
            </div>
          </Reveal>
          <h1 className="font-display text-[120px] font-extrabold leading-[0.98] tracking-[-0.03em]">
            <Reveal delay={0.15}>Commit to it.</Reveal>
            <Reveal delay={0.3}>Prove it.</Reveal>
            <Reveal delay={0.45}>
              <span className="bg-gradient-to-r from-brand-glow via-[#8fa6ff] to-sol-green bg-clip-text text-transparent">
                Get paid for it.
              </span>
            </Reveal>
          </h1>
          <Reveal delay={0.65}>
            <p className="mt-10 max-w-[820px] text-[30px] leading-[1.4] text-white/70">
              Turn a goal into a challenge with your own USDC on the line. Show up, let your progress be
              verified, and finish to get your stake back with a share of the rewards.
            </p>
          </Reveal>
          <Reveal delay={0.8} className="mt-10 flex items-center gap-6 text-[19px] text-white/55">
            <span className="flex items-center gap-2">
              <ShieldCheck size={20} className="text-sol-green" /> Stakes held by a Solana escrow program
            </span>
            <span className="h-5 w-px bg-white/20" />
            <span>{LIVE_HOST}</span>
          </Reveal>
        </div>
        <Reveal delay={0.35} y={40} className="w-[640px] shrink-0">
          <ChallengeCard />
          <div className="mt-[96px] text-center text-[15px] uppercase tracking-[0.18em] text-white/35">
            Illustrative example from the Stake-Sync landing page
          </div>
        </Reveal>
      </div>
    </SlideShell>
  )
}

import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { ArrowUpRight, FlaskConical } from 'lucide-react'
import { BrowserFrame, Kicker, LIVE_HOST, LIVE_URL, Reveal, SCREENS, SlideShell, useIsStatic } from '../components/ui'

const WALKTHROUGH = [
  { step: 'Open the dashboard', src: SCREENS.dashboard, path: '', caption: 'Overview: today’s checklist, balance, commitment score and activity.' },
  { step: 'Explore or create a challenge', src: SCREENS.createBasics, path: '/create', caption: 'The seven-step builder, starting with the basics and a live preview.' },
  { step: 'Configure requirements and rules', src: SCREENS.createAccess, path: '/create', caption: 'Category, who can join and an optional participant limit.' },
  { step: 'Show stake and reward settings', src: SCREENS.createBasics, path: '/create', caption: 'The preview card shows the stake, pool, length and free strikes.' },
  { step: 'Demonstrate invitation options', src: SCREENS.invite, path: '/i/CWG833ZJ', caption: 'Invite link, code, username invites and one-tap sharing.' },
  { step: 'Explain verification and settlement', src: SCREENS.landing, path: '', caption: 'Verified days, stake, penalties, then a claim when the challenge ends.' },
]

export default function S09Demo() {
  const isStatic = useIsStatic()
  const [active, setActive] = useState(0)

  // Up/Down steps through the offline walkthrough while this slide is showing.
  useEffect(() => {
    if (isStatic) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowDown') {
        e.preventDefault()
        setActive((a) => Math.min(a + 1, WALKTHROUGH.length - 1))
      } else if (e.key === 'ArrowUp') {
        e.preventDefault()
        setActive((a) => Math.max(a - 1, 0))
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [isStatic])

  const cur = WALKTHROUGH[active]

  return (
    <SlideShell theme="dark" number={9} label="Live demo">
      <div className="flex h-full items-center justify-between gap-14">
        <div className="flex w-[640px] shrink-0 flex-col">
          <Reveal>
            <Kicker dark>Live product demo</Kicker>
            <h2 className="font-display text-[92px] font-bold leading-[1] tracking-[-0.03em]">
              It’s built.
              <br />
              <span className="text-brand-glow">Let’s show you.</span>
            </h2>
          </Reveal>
          <Reveal delay={0.15} className="mt-9">
            <a
              href={LIVE_URL}
              target="_blank"
              rel="noreferrer"
              className="group inline-flex items-center gap-4 rounded-[18px] bg-brand px-8 py-5 text-[28px] font-semibold text-white shadow-[0_20px_60px_-10px_rgba(48,85,245,0.8)] transition hover:bg-brand-deep"
            >
              {LIVE_HOST}
              <ArrowUpRight size={30} className="transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </a>
            <div className="mt-4 flex items-center gap-2 text-[18px] text-amber">
              <FlaskConical size={19} /> Running on Solana Devnet with test funds, not mainnet.
            </div>
          </Reveal>

          <Reveal delay={0.3} className="mt-9">
            <div className="mb-3 text-[15px] font-semibold uppercase tracking-[0.16em] text-white/45">
              Demo path · offline? click through, or use ↑ ↓
            </div>
            <ol className="space-y-1.5">
              {WALKTHROUGH.map((w, i) => (
                <li key={w.step}>
                  <button
                    type="button"
                    onClick={() => setActive(i)}
                    aria-current={i === active ? 'step' : undefined}
                    className={`flex w-full items-center gap-4 rounded-[14px] px-4 py-2.5 text-left text-[21px] transition ${
                      i === active ? 'bg-white/10 text-white' : 'text-white/55 hover:bg-white/5 hover:text-white/80'
                    }`}
                  >
                    <span
                      className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-[15px] font-bold ${
                        i === active ? 'bg-brand text-white' : 'bg-white/10'
                      }`}
                    >
                      {i + 1}
                    </span>
                    {w.step}
                  </button>
                </li>
              ))}
            </ol>
          </Reveal>
        </div>

        <Reveal delay={0.2} y={50} className="relative w-[1000px]">
          <div className="absolute -inset-12 rounded-[48px] bg-brand/25 blur-[90px]" aria-hidden="true" />
          <div className="relative">
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={active}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.25 }}
              >
                <BrowserFrame dark src={cur.src} path={cur.path} alt={`${cur.step}: Stake-Sync screenshot`} fit={{ aspect: '2048 / 1149' }} />
              </motion.div>
            </AnimatePresence>
            <div className="mt-5 flex items-center justify-between text-[19px]">
              <span className="text-white/75">{cur.caption}</span>
              <span className="shrink-0 pl-6 text-[15px] uppercase tracking-[0.14em] text-white/40">Screenshot · Devnet</span>
            </div>
          </div>
        </Reveal>
      </div>
    </SlideShell>
  )
}

import { CircleCheckBig, Coins, ListChecks, Rocket, ShieldCheck, Wallet } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { Headline, Kicker, Reveal, SlideShell } from '../components/ui'

const STAGES: { icon: LucideIcon; title: string; line: string }[] = [
  { icon: Rocket, title: 'Create or join', line: 'Start your own challenge, or join one from Explore, a link or a code.' },
  { icon: Wallet, title: 'Commit USDC', line: 'Your stake, plus a 2% joining fee, goes into the challenge escrow.' },
  { icon: ListChecks, title: 'Do the work', line: 'Complete the daily requirement: commits, solved problems, coding time.' },
  { icon: ShieldCheck, title: 'Get verified', line: 'Each day is checked against the rules everyone agreed to.' },
  { icon: Coins, title: 'Claim', line: 'Finishers claim their stake back plus their share of rewards.' },
]

const LADDER = [
  { misses: '1–3 misses', what: 'Free strikes. Nothing lost.', tone: 'bg-white/[0.06] text-white border-white/10' },
  { misses: '4th miss', what: '5% penalty (1 USDC). Still a finisher.', tone: 'bg-amber/10 text-amber border-amber/30' },
  { misses: '5th miss', what: '10% more (3 USDC in total). Still a finisher.', tone: 'bg-amber/15 text-[#ffc861] border-amber/40' },
  { misses: '6th miss or more', what: 'Whole stake forfeited. No share of rewards.', tone: 'bg-strike/15 text-[#ff8a8e] border-strike/40' },
]

export default function S05HowItWorks() {
  return (
    <SlideShell theme="dark" number={5} label="How it works">
      <div className="flex h-full flex-col">
        <div className="flex items-end justify-between gap-16">
          <Reveal>
            <Kicker dark>How it works</Kicker>
            <Headline>From intention to verified action.</Headline>
          </Reveal>
        </div>

        {/* Pipeline */}
        <div className="relative mt-16">
          <div className="absolute left-[8%] right-[8%] top-[37px] h-[2px] text-brand-glow/60" aria-hidden="true">
            <div className="flow-line h-full w-full" />
            <div className="travel-dot absolute top-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-sol-green shadow-[0_0_20px_6px_rgba(20,241,149,0.6)]" />
          </div>
          <ol className="relative grid grid-cols-5 gap-7">
            {STAGES.map(({ icon: Icon, title, line }, i) => (
              <li key={title}>
                <Reveal delay={0.15 + i * 0.12}>
                  <div className="mx-auto flex h-[76px] w-[76px] items-center justify-center rounded-[20px] bg-brand text-white shadow-[0_0_40px_-4px_rgba(48,85,245,0.9)] ring-4 ring-navy">
                    <Icon size={32} />
                  </div>
                  <div className="mt-7 h-[262px] rounded-[22px] border border-white/10 bg-navy-2/80 p-6 backdrop-blur">
                    <div className="text-[17px] font-semibold uppercase tracking-[0.14em] text-brand-glow">Step {i + 1}</div>
                    <div className="font-display mt-3 text-[34px] font-bold leading-tight tracking-[-0.02em]">{title}</div>
                    <p className="mt-3 text-[21px] leading-[1.45] text-white/65">{line}</p>
                  </div>
                </Reveal>
              </li>
            ))}
          </ol>
        </div>

        {/* Missed days */}
        <Reveal delay={0.8} className="mt-auto">
          <div className="flex items-baseline justify-between">
            <div className="font-display text-[28px] font-bold tracking-[-0.02em]">
              Miss a day? <span className="text-white/55">The rules decide, not us.</span>
            </div>
            <div className="text-[17px] text-white/45">
              Example: default “Gentle” rules · 30-day challenge needing 25 days · 20 USDC stake
            </div>
          </div>
          <div className="mt-4 grid grid-cols-4 gap-3">
            {LADDER.map((l) => (
              <div key={l.misses} className={`rounded-[16px] border px-5 py-4 ${l.tone}`}>
                <div className="text-[21px] font-bold">{l.misses}</div>
                <div className="mt-1 text-[18px] text-white/70">{l.what}</div>
              </div>
            ))}
          </div>
          <div className="mt-5 flex items-center gap-3 text-[19px] text-white/60">
            <CircleCheckBig size={20} className="shrink-0 text-sol-green" />
            Payouts depend on results and are never guaranteed. A day only counts as missed when the source
            confirms it; provider outages protect the day, and every miss can be disputed.
          </div>
        </Reveal>
      </div>
    </SlideShell>
  )
}

import { BadgeCheck, Coins, Lock, Target } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { BrowserFrame, Headline, Kicker, Reveal, SCREENS, SlideShell } from '../components/ui'

const STEPS: { icon: LucideIcon; title: string; line: string }[] = [
  { icon: Target, title: 'Commit to a goal', line: 'Pick or create a challenge with clear daily rules.' },
  { icon: Lock, title: 'Put something at stake', line: 'Deposit USDC, a digital dollar, into the challenge escrow.' },
  { icon: BadgeCheck, title: 'Prove your progress', line: 'Connected sources like GitHub or LeetCode confirm each day.' },
  { icon: Coins, title: 'Earn eligible rewards', line: 'Finish, and claim your stake back plus a share of rewards.' },
]

export default function S03Solution() {
  return (
    <SlideShell theme="dark" number={3} label="The solution">
      <div className="flex h-full items-center justify-between gap-16">
        <div className="w-[660px] shrink-0">
          <Reveal>
            <Kicker dark>The solution</Kicker>
            <Headline>Meet Stake-Sync.</Headline>
          </Reveal>
          <Reveal delay={0.12}>
            <p className="mt-7 text-[27px] leading-[1.45] text-white/75">
              A deposit on your own discipline. Turn a goal into a challenge with clear rules and automatic
              progress checks, then back it with your own money.
            </p>
          </Reveal>
          <div className="mt-10 space-y-3">
            {STEPS.map(({ icon: Icon, title, line }, i) => (
              <Reveal key={title} delay={0.25 + i * 0.1} x={-20} y={0}>
                <div className="flex items-center gap-5 rounded-[18px] border border-white/10 bg-white/[0.04] px-6 py-[18px]">
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-[14px] bg-brand text-white">
                    <Icon size={24} />
                  </span>
                  <div>
                    <div className="font-display text-[25px] font-bold tracking-[-0.02em]">{title}</div>
                    <div className="mt-0.5 text-[20px] text-white/60">{line}</div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>

        <Reveal delay={0.3} y={50} scale={0.97} className="relative w-[960px]">
          <div className="absolute -inset-10 rounded-[40px] bg-brand/20 blur-[80px]" aria-hidden="true" />
          <div style={{ perspective: 2000 }}>
            <div style={{ transform: 'rotateY(-7deg) rotateX(3deg)', transformOrigin: 'left center' }}>
              <BrowserFrame dark src={SCREENS.landing} alt="Stake-Sync landing page: Commit to it. Prove it. Get paid for it." />
            </div>
          </div>
          <div className="relative mt-6 text-center text-[17px] uppercase tracking-[0.16em] text-white/40">
            The live Stake-Sync landing page
          </div>
        </Reveal>
      </div>
    </SlideShell>
  )
}

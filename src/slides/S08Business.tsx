import type { ReactNode } from 'react'
import { AlertTriangle, Sparkles } from 'lucide-react'
import { Headline, Kicker, Reveal, SlideShell } from '../components/ui'

const FEES = [
  {
    big: '2%',
    color: 'text-brand',
    bg: 'bg-brand-soft',
    title: 'Joining fee, on top of each stake',
    line: 'A 20 USDC stake costs 20.40. Held in escrow, paid at settlement, refunded in full if the challenge is cancelled before it starts. Capped at 5%.',
  },
  {
    big: '60%',
    color: 'text-[#9a6200]',
    bg: 'bg-[#fff1d6]',
    title: 'Platform share of forfeits',
    line: 'Of forfeited stakes and penalties. The other 40% is split equally among finishers. Capped at 60% by the program.',
  },
  {
    big: '0%',
    color: 'text-mint',
    bg: 'bg-[#dcf3e8]',
    title: 'On sponsor prizes and returned stakes',
    line: 'Sponsor money all goes to finishers. A finisher’s own stake comes back untouched by fees.',
  },
]

const OUT = [
  { who: 'Ada', note: 'finished, no misses', amt: '474.20' },
  { who: 'Bola', note: 'finished, 1 USDC penalty', amt: '473.20' },
  { who: 'Chidi', note: 'too many misses, forfeited', amt: '0.00' },
]

const FUTURE = ['Organization plans', 'Sponsored campaigns', 'Premium analytics & branding', 'Verification as a service']

export default function S08Business() {
  return (
    <SlideShell theme="light" number={8} label="Business model">
      <div className="flex h-full flex-col">
        <Reveal>
          <Kicker>Business model · live in the escrow program today</Kicker>
          <Headline className="text-[76px]">A sustainable platform for accountability.</Headline>
        </Reveal>

        <div className="mt-10 flex min-h-0 flex-1 gap-8">
          {/* Fees */}
          <div className="flex w-[600px] shrink-0 flex-col gap-4">
            {FEES.map((f, i) => (
              <Reveal key={f.big} delay={0.15 + i * 0.1} className="flex-1">
                <div className="flex h-full items-center gap-6 rounded-[22px] border border-line bg-white px-7 py-5">
                  <div className={`font-display flex h-[118px] w-[150px] shrink-0 items-center justify-center rounded-[18px] text-[66px] font-extrabold tracking-[-0.04em] ${f.bg} ${f.color}`}>
                    {f.big}
                  </div>
                  <div>
                    <div className="text-[22px] font-semibold leading-tight tracking-[-0.01em]">{f.title}</div>
                    <div className="mt-1.5 text-[17px] leading-[1.4] text-muted">{f.line}</div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

          <div className="flex flex-1 flex-col gap-4">
            {/* Worked example */}
            <Reveal delay={0.3}>
              <div className="rounded-[24px] bg-ink p-7 text-white">
                <div className="flex items-baseline justify-between">
                  <div className="font-display text-[26px] font-bold tracking-[-0.02em]">Worked example</div>
                  <div className="text-[16px] text-white/50">Example economics from our revenue model, not actual revenue</div>
                </div>
                <div className="mt-1 text-[18px] text-white/60">Three people stake 20 USDC each. A sponsor adds 900 USDC.</div>

                <div className="mt-5 grid grid-cols-[1fr_auto_1.35fr] items-center gap-6">
                  <div className="space-y-2 text-[19px]">
                    <div className="text-[14px] font-semibold uppercase tracking-[0.14em] text-white/45">Paid in</div>
                    <Row k="Participants (3 × 20.40)" v="61.20" />
                    <Row k="Sponsor" v="900.00" />
                    <div className="border-t border-white/15 pt-2">
                      <Row k="Escrow total" v="961.20" strong />
                    </div>
                  </div>
                  <div className="h-full w-px bg-white/15" />
                  <div className="space-y-2 text-[19px]">
                    <div className="text-[14px] font-semibold uppercase tracking-[0.14em] text-white/45">Paid out (USDC)</div>
                    {OUT.map((o) => (
                      <Row key={o.who} k={<><b className="font-semibold text-white">{o.who}</b> <span className="text-white/50">· {o.note}</span></>} v={o.amt} />
                    ))}
                    <div className="border-t border-white/15 pt-2">
                      <Row k={<b className="font-semibold text-brand-glow">Stake-Sync</b>} v="13.80" strong />
                    </div>
                  </div>
                </div>

                <div className="mt-5">
                  <div className="flex h-9 overflow-hidden rounded-[10px] text-[15px] font-semibold">
                    <div className="flex items-center bg-brand px-3" style={{ width: `${(1.2 / 13.8) * 100}%`, minWidth: 150 }}>
                      1.20 joining fees
                    </div>
                    <div className="flex flex-1 items-center bg-[#c98a12] px-3">12.60 = 60% of 21.00 forfeited (Chidi’s stake + Bola’s penalty)</div>
                  </div>
                </div>
              </div>
            </Reveal>

            <div className="grid min-h-0 flex-1 grid-cols-2 gap-4">
              <Reveal delay={0.5} className="h-full">
                <div className="h-full rounded-[22px] border border-[#f3c9c9] bg-[#fdeeee] p-6">
                  <div className="flex items-center gap-2 text-[20px] font-semibold text-[#a3262b]">
                    <AlertTriangle size={20} /> The honest trade-off
                  </div>
                  <p className="mt-3 text-[19px] leading-[1.5] text-ink-2">
                    Today, revenue leans on forfeits: about 88% at 75% completion in our model. Keeping lost stakes can
                    be treated as gambling in some markets, including Nigeria, so each launch market needs legal review
                    before real money.
                  </p>
                </div>
              </Reveal>
              <Reveal delay={0.6} className="h-full">
                <div className="h-full rounded-[22px] border border-line bg-white p-6">
                  <div className="flex items-center gap-2 text-[20px] font-semibold">
                    <Sparkles size={20} className="text-brand" /> Next: rely less on failure
                  </div>
                  <div className="mt-1 text-[14px] font-semibold uppercase tracking-[0.12em] text-muted">Planned, not built yet</div>
                  <ul className="mt-3 flex flex-wrap gap-2">
                    {FUTURE.map((f) => (
                      <li key={f} className="rounded-full border border-dashed border-[#b9c3e6] bg-brand-soft/50 px-3.5 py-1.5 text-[16px] font-medium text-ink-2">
                        {f}
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </div>
    </SlideShell>
  )
}

function Row({ k, v, strong = false }: { k: ReactNode; v: string; strong?: boolean }) {
  return (
    <div className="flex items-baseline justify-between gap-4">
      <span className={strong ? 'font-semibold' : 'text-white/75'}>{k}</span>
      <span className={`tnum ${strong ? 'font-display text-[24px] font-bold' : 'font-semibold'}`}>{v}</span>
    </div>
  )
}

import { motion } from 'motion/react'
import { Building2, Eye, Layers, Lock, Users } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { Headline, Kicker, Reveal, SCREENS, SlideShell, useIsStatic } from '../components/ui'

const STEPS = ['Basics', 'Requirement', 'Rules', 'Stake', 'Strikes', 'Rewards', 'Review']

const CALLOUTS: { n: number; icon: LucideIcon; title: string; line: string }[] = [
  { n: 1, icon: Building2, title: 'Host as you or an organization', line: 'Org challenges can be limited to members.' },
  { n: 2, icon: Eye, title: 'Live preview as you build', line: 'Requirement, stake, length and strikes at a glance.' },
  { n: 3, icon: Layers, title: 'Eight categories', line: 'Coding, Web3, Fitness, Learning, Building, Writing, Content Creation, Productivity.' },
  { n: 4, icon: Lock, title: 'Choose who can join', line: 'Anyone (listed in Explore), private link, or members only.' },
  { n: 5, icon: Users, title: 'Optional participant limit', line: 'Keep it small, or leave it open.' },
]

function Pin({ n, className }: { n: number; className: string }) {
  return (
    <span
      className={`absolute z-10 flex h-10 w-10 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-brand text-[19px] font-bold text-white shadow-[0_0_0_6px_rgba(48,85,245,0.25)] ${className}`}
    >
      {n}
    </span>
  )
}

export default function S04Create() {
  const isStatic = useIsStatic()
  return (
    <SlideShell theme="light" number={4} label="Create a challenge">
      <div className="flex h-full flex-col">
        <div className="flex items-end justify-between">
          <Reveal>
            <Kicker>Create your own challenge</Kicker>
            <Headline>
              Your goals. Your rules. <span className="text-brand">Your stake.</span>
            </Headline>
          </Reveal>
        </div>

        {/* Seven-step builder */}
        <Reveal delay={0.1} className="mt-9">
          <ol className="grid grid-cols-7 gap-3" aria-label="Seven-step challenge builder">
            {STEPS.map((s, i) => (
              <li key={s}>
                <div className="h-[6px] overflow-hidden rounded-full bg-[#dfe3ea]">
                  <motion.div
                    className="h-full rounded-full bg-brand"
                    initial={isStatic ? false : { scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    style={{ transformOrigin: 'left' }}
                    transition={{ duration: 0.35, delay: 0.35 + i * 0.22, ease: 'easeOut' }}
                  />
                </div>
                <div className="mt-3 flex items-baseline gap-2 text-[22px]">
                  <span className="tnum font-semibold text-brand">{i + 1}.</span>
                  <span className="font-semibold text-ink">{s}</span>
                </div>
              </li>
            ))}
          </ol>
        </Reveal>

        <div className="mt-10 flex min-h-0 flex-1 gap-14">
          <div className="flex w-[560px] shrink-0 flex-col justify-center gap-4">
            {CALLOUTS.map(({ n, icon: Icon, title, line }, i) => (
              <Reveal key={n} delay={0.3 + i * 0.08} x={-16} y={0}>
                <div className="flex gap-4">
                  <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-brand text-[17px] font-bold text-white">
                    {n}
                  </span>
                  <div>
                    <div className="flex items-center gap-2 text-[23px] font-semibold tracking-[-0.01em]">
                      <Icon size={20} className="text-brand" /> {title}
                    </div>
                    <div className="mt-0.5 text-[19px] leading-[1.4] text-muted">{line}</div>
                  </div>
                </div>
              </Reveal>
            ))}
            <Reveal delay={0.75}>
              <div className="mt-2 text-[18px] text-muted">Drafts save as you go.</div>
            </Reveal>
          </div>

          <div className="relative flex-1">
            <Reveal delay={0.2} y={40} className="absolute right-0 top-0 w-[960px]">
              <div className="relative overflow-hidden rounded-[18px] border border-line bg-white shadow-[0_30px_80px_-24px_rgba(18,22,32,0.3)]">
                <img src={SCREENS.createBasics} alt="Create a challenge: step 1, Basics, with live preview" className="block w-full" draggable={false} />
              </div>
              {/* Pins positioned in % of the screenshot */}
              <Pin n={1} className="left-[5%] top-[60%]" />
              <Pin n={2} className="left-[97%] top-[42%]" />
            </Reveal>
            {/* Cropped to the category / access / limit fields of PDF page 4 (aspect preserved) */}
            <Reveal delay={0.45} y={40} className="absolute bottom-[-30px] left-[40px] w-[620px]">
              <div
                className="relative overflow-hidden rounded-[18px] border border-line bg-white shadow-[0_40px_90px_-20px_rgba(18,22,32,0.45)] ring-4 ring-white"
                style={{ aspectRatio: '1390 / 615' }}
              >
                <img
                  src={SCREENS.createAccess}
                  alt="Challenge categories, who can join, and participant limit"
                  className="absolute left-0 top-0 block max-w-none"
                  style={{ width: `${(2048 / 1390) * 100}%` }}
                  draggable={false}
                />
              </div>
              <Pin n={3} className="left-[1%] top-[19%]" />
              <Pin n={4} className="left-[1%] top-[52%]" />
              <Pin n={5} className="left-[1%] top-[90%]" />
            </Reveal>
          </div>
        </div>
      </div>
    </SlideShell>
  )
}

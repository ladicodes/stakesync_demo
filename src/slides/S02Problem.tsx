import { Bell, Bookmark, CalendarClock, Code2, Dumbbell, GraduationCap, Layers, PenLine, PlayCircle } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { Headline, Kicker, Reveal, SlideShell, useIsStatic } from '../components/ui'

// Illustrative streak: strong start, then the gaps take over.
const STREAK = [1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]

const DISTRACTIONS: { icon: LucideIcon; text: string; pos: string; r: string }[] = [
  { icon: PlayCircle, text: 'Just one more video', pos: 'left-[-40px] top-[-34px]', r: '-4deg' },
  { icon: Bell, text: '12 new notifications', pos: 'right-[-30px] top-[-46px]', r: '3deg' },
  { icon: Layers, text: 'Too many open tabs', pos: 'right-[-60px] top-[176px]', r: '-2deg' },
  { icon: CalendarClock, text: "I'll start again Monday", pos: 'left-[-96px] top-[262px]', r: '2deg' },
  { icon: Bookmark, text: 'Saved for later', pos: 'right-[30px] bottom-[-30px]', r: '-3deg' },
]

const PEOPLE: { icon: LucideIcon; who: string; line: string }[] = [
  { icon: GraduationCap, who: 'Students', line: 'The course you enrolled in, and the module you never finished.' },
  { icon: Code2, who: 'Developers', line: 'The side project whose last commit was weeks ago.' },
  { icon: PenLine, who: 'Creators', line: 'The posting schedule that lasted two weeks.' },
  { icon: Dumbbell, who: 'Habit builders', line: 'The streak that broke and never restarted.' },
]

export default function S02Problem() {
  const isStatic = useIsStatic()
  return (
    <SlideShell theme="light" number={2} label="The problem">
      <div className="flex h-full flex-col justify-between">
        <div className="flex items-start justify-between gap-20">
          <div className="w-[820px] pt-6">
            <Reveal>
              <Kicker>The problem</Kicker>
              <Headline>
                More information.
                <br />
                <span className="text-brand">Less consistency.</span>
              </Headline>
            </Reveal>
            <Reveal delay={0.15}>
              <p className="mt-9 text-[29px] leading-[1.45] text-ink-2">
                Courses, tutorials, docs, free workouts, open-source projects. We've never had more ways to get
                better, yet goals quietly stall. Not for lack of resources, but because nothing holds us to them.
              </p>
            </Reveal>
            <Reveal delay={0.25}>
              <p className="mt-6 border-l-4 border-brand pl-5 text-[24px] leading-[1.45] text-muted">
                We've lived this ourselves, and watched friends and classmates go through it too.
              </p>
            </Reveal>
          </div>

          <Reveal delay={0.2} className="relative mr-[56px] mt-[40px] w-[680px] shrink-0">
            <div className="rounded-[28px] border border-line bg-white p-9 shadow-[0_30px_80px_-30px_rgba(18,22,32,0.25)]">
              <div className="flex items-center justify-between text-[19px] font-semibold">
                <span className="text-brand">Day 1: all in</span>
                <span className="text-muted">Day 30: ?</span>
              </div>
              <div className="mt-5 grid grid-cols-10 gap-2" role="img" aria-label="An illustrative streak that starts strong and fades out">
                {STREAK.map((v, i) => (
                  <div
                    key={i}
                    className={`aspect-square rounded-[9px] ${v ? 'bg-brand' : 'border-2 border-dashed border-[#d6dae2]'}`}
                    style={{
                      opacity: v ? Math.max(0.25, 1 - i / 26) : 1,
                      ...(isStatic ? {} : { animation: `fadein .4s ${0.5 + i * 0.04}s both` }),
                    }}
                  />
                ))}
              </div>
              <div className="mt-7 flex items-baseline justify-between border-t border-line pt-6">
                <div className="font-display text-[34px] font-bold tracking-[-0.02em]">
                  Starting is easy.
                  <br />
                  <span className="text-strike">Finishing is the hard part.</span>
                </div>
              </div>
            </div>
            {DISTRACTIONS.map(({ icon: Icon, text, pos, r }, i) => (
              <div
                key={text}
                className={`float-slow absolute ${pos} flex items-center gap-2.5 rounded-full border border-line bg-white px-5 py-3 text-[19px] font-medium text-ink-2 shadow-[0_12px_30px_-12px_rgba(18,22,32,0.3)]`}
                style={{ ['--r' as string]: r, animationDelay: `${i * 0.7}s` }}
              >
                <Icon size={20} className="text-muted" /> {text}
              </div>
            ))}
          </Reveal>
        </div>

        <div className="grid grid-cols-4 gap-6">
          {PEOPLE.map(({ icon: Icon, who, line }, i) => (
            <Reveal key={who} delay={0.45 + i * 0.08}>
              <div className="h-full rounded-[22px] border border-line bg-white/80 p-7 backdrop-blur">
                <div className="flex items-center gap-3">
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-soft text-brand">
                    <Icon size={22} />
                  </span>
                  <span className="font-display text-[26px] font-bold tracking-[-0.02em]">{who}</span>
                </div>
                <p className="mt-4 text-[21px] leading-[1.4] text-muted">{line}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
      <style>{`@keyframes fadein{from{opacity:0;transform:scale(.6)}}`}</style>
    </SlideShell>
  )
}

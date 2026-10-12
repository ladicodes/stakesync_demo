import { useEffect, useState } from 'react'
import QRCode from 'qrcode'
import { ArrowUpRight, Code2, Dumbbell, GraduationCap, Users } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { Headline, Kicker, LIVE_HOST, LIVE_URL, LogoMark, Reveal, SlideShell } from '../components/ui'

const AUDIENCES: { icon: LucideIcon; who: string; line: string }[] = [
  { icon: GraduationCap, who: 'Students & learning communities', line: 'Study sprints and course cohorts that actually finish.' },
  { icon: Code2, who: 'Developers & builders', line: 'Daily commits, problem sets and ship-it challenges.' },
  { icon: Dumbbell, who: 'Fitness & productivity groups', line: 'Shared streaks with something real on the line.' },
  { icon: Users, who: 'Teams & organizations', line: 'Member-only challenges for clubs, bootcamps and companies.' },
]

const PATH = [
  'Start with the developer and student communities we belong to.',
  'Organization-hosted challenges for clubs, bootcamps and teams.',
  'Sponsored challenges from ecosystems and brands.',
]

export default function S10Vision() {
  const [qr, setQr] = useState<string>('')
  useEffect(() => {
    QRCode.toString(LIVE_URL, { type: 'svg', margin: 0, color: { dark: '#121620', light: '#ffffff' } })
      .then(setQr)
      .catch(() => setQr(''))
  }, [])

  return (
    <SlideShell theme="light" number={10} label="Vision">
      <div className="flex h-full gap-14">
        <div className="flex flex-1 flex-col">
          <Reveal>
            <Kicker>The vision and opportunity</Kicker>
            <Headline className="text-[96px]">
              Make consistency
              <br />
              <span className="text-brand">worth something.</span>
            </Headline>
          </Reveal>
          <Reveal delay={0.12}>
            <p className="mt-7 max-w-[960px] text-[26px] leading-[1.45] text-ink-2">
              Accountability should be accessible to anyone with a goal: on their own, with friends, or across a whole
              community.
            </p>
          </Reveal>

          <div className="mt-8 grid grid-cols-2 gap-4">
            {AUDIENCES.map(({ icon: Icon, who, line }, i) => (
              <Reveal key={who} delay={0.2 + i * 0.07}>
                <div className="flex h-full gap-4 rounded-[20px] border border-line bg-white p-5">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-brand-soft text-brand">
                    <Icon size={22} />
                  </span>
                  <div>
                    <div className="text-[21px] font-semibold tracking-[-0.01em]">{who}</div>
                    <div className="text-[18px] leading-[1.35] text-muted">{line}</div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.5} className="mt-auto">
            <div className="grid grid-cols-[1.25fr_1fr] gap-6">
              <div>
                <div className="text-[15px] font-semibold uppercase tracking-[0.14em] text-muted">Path to adoption</div>
                <ol className="mt-2 space-y-1.5 text-[19px] text-ink-2">
                  {PATH.map((p, i) => (
                    <li key={p} className="flex gap-3">
                      <span className="tnum font-semibold text-brand">{i + 1}</span>
                      {p}
                    </li>
                  ))}
                </ol>
              </div>
              <div className="rounded-[18px] border border-dashed border-[#c7cdd8] p-5 text-[18px] leading-[1.45] text-muted">
                <b className="font-semibold text-ink">Where we are:</b> the product is built and running on Devnet. Our
                own experience explains why we started; it isn’t market proof. Next we validate with real cohorts.
              </div>
            </div>
          </Reveal>
        </div>

        <Reveal delay={0.3} y={40} className="w-[520px] shrink-0">
          <div className="relative flex h-full flex-col overflow-hidden rounded-[32px] bg-ink p-10 text-white">
            <div className="pointer-events-none absolute -right-24 -top-24 h-[380px] w-[380px] rounded-full bg-brand/40 blur-[100px]" aria-hidden="true" />
            <div className="relative flex items-center gap-4">
              <LogoMark size={64} className="rounded-[16px] ring-1 ring-white/20" />
              <span className="font-display text-[40px] font-bold tracking-[-0.03em]">Stake-Sync</span>
            </div>
            <div className="font-display relative mt-12 text-[66px] font-extrabold leading-[1.02] tracking-[-0.03em]">
              Commit to it.
              <br />
              Prove it.
              <br />
              <span className="text-brand-glow">Get paid for it.</span>
            </div>
            <p className="relative mt-6 text-[22px] leading-[1.45] text-white/60">
              Join a challenge or start your own. Bring your friends.
            </p>
            <div className="relative mt-auto flex items-end gap-6">
              <div className="h-[176px] w-[176px] shrink-0 rounded-[16px] bg-white p-3">
                {qr && (
                  <div
                    className="h-full w-full [&>svg]:h-full [&>svg]:w-full"
                    role="img"
                    aria-label={`QR code for ${LIVE_URL}`}
                    dangerouslySetInnerHTML={{ __html: qr }}
                  />
                )}
              </div>
              <div className="pb-1 text-[19px] text-white/60">
                Try it today.
                <br />
                Scan, or open the link.
              </div>
            </div>
            <a
              href={LIVE_URL}
              target="_blank"
              rel="noreferrer"
              className="relative mt-6 flex items-center justify-between rounded-[16px] bg-brand px-6 py-4 text-[23px] font-semibold transition hover:bg-brand-deep"
            >
              {LIVE_HOST}
              <ArrowUpRight size={26} />
            </a>
          </div>
        </Reveal>
      </div>
    </SlideShell>
  )
}

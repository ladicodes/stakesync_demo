import { AtSign, Building2, LayoutDashboard, Link2, Lock, Share2 } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { BrowserFrame, Headline, Kicker, Reveal, SCREENS, SlideShell } from '../components/ui'

const FEATURES: { icon: LucideIcon; title: string; line: string }[] = [
  { icon: LayoutDashboard, title: 'Your dashboard', line: 'Today’s checklist, balance, commitment score and completion rate.' },
  { icon: Lock, title: 'Public or private', line: 'List it in Explore, or keep it to people with the link.' },
  { icon: Link2, title: 'Invite links and codes', line: 'Every challenge gets a link and a unique code.' },
  { icon: AtSign, title: 'Invite by username', line: 'Bring in friends who are already on Stake-Sync.' },
  { icon: Share2, title: 'Share anywhere', line: 'One tap to WhatsApp, X, Telegram or email.' },
  { icon: Building2, title: 'Organizations', line: 'Host as an organization and limit challenges to members.' },
]

export default function S06Together() {
  return (
    <SlideShell theme="light" number={6} label="Accountability together">
      <div className="flex h-full gap-16">
        <div className="flex w-[1000px] shrink-0 flex-col">
          <Reveal>
            <Kicker>Accountability together</Kicker>
            <Headline>
              You don’t have to do it <span className="text-brand">alone.</span>
            </Headline>
          </Reveal>
          <div className="relative mt-10 flex-1">
            <Reveal delay={0.15} y={40} className="w-[880px]">
              <BrowserFrame src={SCREENS.dashboard} alt="Stake-Sync signed-in dashboard on Devnet" />
            </Reveal>
            <Reveal delay={0.4} y={40} className="absolute bottom-[-40px] right-0 w-[400px]">
              <div className="overflow-hidden rounded-[22px] shadow-[0_40px_90px_-20px_rgba(18,22,32,0.5)] ring-4 ring-white">
                <img src={SCREENS.invite} alt="Invite dialog: link, invite code, username invite and share buttons" className="block w-full" draggable={false} />
              </div>
            </Reveal>
          </div>
        </div>

        <div className="flex flex-1 flex-col justify-center gap-[22px]">
          {FEATURES.map(({ icon: Icon, title, line }, i) => (
            <Reveal key={title} delay={0.25 + i * 0.07} x={20} y={0}>
              <div className="flex gap-4">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-brand-soft text-brand">
                  <Icon size={22} />
                </span>
                <div>
                  <div className="text-[23px] font-semibold tracking-[-0.01em]">{title}</div>
                  <div className="text-[19px] leading-[1.35] text-muted">{line}</div>
                </div>
              </div>
            </Reveal>
          ))}
          <Reveal delay={0.75}>
            <div className="font-display mt-3 rounded-[18px] bg-ink px-6 py-4 text-[24px] font-bold tracking-[-0.02em] text-white">
              Personal discipline <span className="text-brand-glow">+</span> social accountability.
            </div>
          </Reveal>
        </div>
      </div>
    </SlideShell>
  )
}

import { ArrowRight, Eye, FileCode2, Landmark, LockKeyhole, Monitor, Server, ShieldCheck, Zap } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { Kicker, Reveal, SlideShell } from '../components/ui'

type Node = { icon: LucideIcon; title: string; items: string[] }

const OFFCHAIN: Node[] = [
  { icon: Monitor, title: 'User interface', items: ['Create, join, invite', 'Track progress', 'Connect your wallet'] },
  { icon: Server, title: 'Stake-Sync backend', items: ['Challenge rules', 'Invites and organizations', 'Recorded daily results'] },
  {
    icon: ShieldCheck,
    title: 'Verification & results',
    items: ['GitHub, LeetCode, Codeforces, WakaTime', 'Strikes and penalties', 'Disputes · outage protection'],
  },
]

const ESCROW: Node = {
  icon: LockKeyhole,
  title: 'Solana escrow program',
  items: ['One USDC vault per challenge', 'Fee rules with hard caps', 'Settlement after disputes close', 'Claims to finishers’ wallets'],
}

const BENEFITS: { icon: LucideIcon; title: string; line: string }[] = [
  { icon: Landmark, title: 'Program-controlled vaults', line: 'Stakes sit in a vault the program owns. Nobody at Stake-Sync can withdraw from it.' },
  { icon: FileCode2, title: 'Rules enforced in code', line: 'Fees are fixed per challenge and capped on-chain. No backend change can take more.' },
  { icon: Eye, title: 'Transparent settlement', line: 'Every payout is an on-chain transaction anyone can inspect.' },
  { icon: Zap, title: 'Practical for small stakes', line: 'Low transaction costs make everyday USDC commitments workable.' },
]

function NodeCard({ node, delay }: { node: Node; delay: number }) {
  const Icon = node.icon
  return (
    <Reveal delay={delay} className="h-full">
      <div className="h-full rounded-[20px] border border-white/12 bg-navy-2 p-6">
        <div className="flex items-center gap-3">
          <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/[0.07] text-brand-glow">
            <Icon size={22} />
          </span>
          <span className="font-display text-[25px] font-bold tracking-[-0.02em]">{node.title}</span>
        </div>
        <ul className="mt-4 space-y-2 text-[20px] text-white/70">
          {node.items.map((it) => (
            <li key={it} className="flex gap-2">
              <span className="mt-[10px] h-1.5 w-1.5 shrink-0 rounded-full bg-white/35" />
              {it}
            </li>
          ))}
        </ul>
      </div>
    </Reveal>
  )
}

function Arrow({ label }: { label?: string }) {
  return (
    <div className={`relative flex ${label ? 'w-[96px]' : 'w-[56px]'} shrink-0 items-center text-brand-glow`} aria-hidden="true">
      <div className="flow-line h-[2px] w-full" />
      <ArrowRight size={18} className="absolute -right-1.5" />
      {label && (
        <span className="absolute -top-8 left-1/2 -translate-x-1/2 whitespace-nowrap text-[15px] font-semibold uppercase tracking-[0.12em] text-sol-green">
          {label}
        </span>
      )}
    </div>
  )
}

export default function S07Solana() {
  return (
    <SlideShell theme="dark" number={7} label="Why Solana">
      <div className="flex h-full flex-col">
        <div className="flex items-end justify-between gap-16">
          <Reveal>
            <Kicker dark>Why Solana?</Kicker>
            <h2 className="font-display text-[76px] font-bold leading-[1.02] tracking-[-0.028em]">
              Verification off-chain.
              <br />
              <span className="bg-gradient-to-r from-[#b48cff] via-brand-glow to-sol-green bg-clip-text text-transparent">
                Settlement on-chain.
              </span>
            </h2>
          </Reveal>
          <Reveal delay={0.1} className="w-[620px] pb-2">
            <p className="text-[23px] leading-[1.45] text-white/65">
              Solana doesn’t check your GitHub. Stake-Sync’s backend verifies activity, and the escrow program
              settles the money from the recorded results.
            </p>
          </Reveal>
        </div>

        {/* Architecture */}
        <div className="mt-12 flex items-stretch">
          <div className="relative flex-1 rounded-[26px] border border-dashed border-white/20 px-6 pb-6 pt-12">
            <span className="absolute left-6 top-4 text-[15px] font-semibold uppercase tracking-[0.16em] text-white/45">
              Off-chain · Stake-Sync
            </span>
            <div className="flex items-stretch">
              <div className="flex-1">
                <NodeCard node={OFFCHAIN[0]} delay={0.2} />
              </div>
              <Arrow />
              <div className="flex-1">
                <NodeCard node={OFFCHAIN[1]} delay={0.32} />
              </div>
              <Arrow />
              <div className="flex-[1.2]">
                <NodeCard node={OFFCHAIN[2]} delay={0.44} />
              </div>
            </div>
          </div>
          <div className="flex items-center px-2">
            <Arrow label="Results" />
          </div>
          <Reveal delay={0.6} className="w-[420px] shrink-0">
            <div className="sol-border relative h-full rounded-[26px] px-6 pb-6 pt-12 shadow-[0_0_80px_-10px_rgba(153,69,255,0.45)]">
              <span className="absolute left-6 top-4 text-[15px] font-semibold uppercase tracking-[0.16em] text-sol-green">
                On-chain · Solana
              </span>
              <NodeCard node={ESCROW} delay={0.65} />
            </div>
          </Reveal>
        </div>
        <Reveal delay={0.75}>
          <div className="mt-3 flex items-center justify-end gap-3 pr-2 text-[17px] text-white/55">
            <span className="h-px w-24 bg-gradient-to-r from-transparent to-sol-green/70" />
            USDC moves directly between each user’s own wallet and the challenge vault: stakes in, claims out.
          </div>
        </Reveal>

        <div className="mt-auto grid grid-cols-4 gap-5">
          {BENEFITS.map(({ icon: Icon, title, line }, i) => (
            <Reveal key={title} delay={0.85 + i * 0.08}>
              <div className="h-full rounded-[20px] border border-white/10 bg-white/[0.04] p-6">
                <div className="flex items-center gap-3 text-[21px] font-semibold">
                  <Icon size={21} className="text-sol-green" /> {title}
                </div>
                <p className="mt-2 text-[18px] leading-[1.4] text-white/60">{line}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </SlideShell>
  )
}

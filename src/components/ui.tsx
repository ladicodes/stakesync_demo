import { createContext, useContext, type ReactNode } from 'react'
import { motion } from 'motion/react'

export const LIVE_URL = 'https://stake-sync-ui.vercel.app'
export const LIVE_HOST = 'stake-sync-ui.vercel.app'

/** True when a slide is rendered as a thumbnail or in scroll mode: no entrance animation. */
export const StaticCtx = createContext(false)
export const useIsStatic = () => useContext(StaticCtx)

const EASE = [0.22, 1, 0.36, 1] as const

type RevealProps = {
  children?: ReactNode
  delay?: number
  y?: number
  x?: number
  scale?: number
  className?: string
}

export function Reveal({ children, delay = 0, y = 28, x = 0, scale = 1, className }: RevealProps) {
  const isStatic = useIsStatic()
  if (isStatic) return <div className={className}>{children}</div>
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y, x, scale }}
      animate={{ opacity: 1, y: 0, x: 0, scale: 1 }}
      transition={{ duration: 0.8, delay, ease: EASE }}
    >
      {children}
    </motion.div>
  )
}

export function LogoMark({ size = 40, className = '' }: { size?: number; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" className={className} aria-hidden="true">
      <rect width="32" height="32" rx="8" fill="#121620" />
      <rect x="7" y="7" width="8" height="8" rx="2" fill="#3055F5" />
      <rect x="17" y="7" width="8" height="8" rx="2" fill="#3055F5" />
      <rect x="7" y="17" width="8" height="8" rx="2" fill="#3055F5" />
      <rect x="17" y="17" width="8" height="8" rx="2" fill="#F5A524" />
    </svg>
  )
}

export type Theme = 'dark' | 'light'

export function SlideShell({
  theme,
  number,
  label,
  children,
  background,
  hideBrand = false,
}: {
  theme: Theme
  number: number
  label: string
  children: ReactNode
  background?: ReactNode
  hideBrand?: boolean
}) {
  const dark = theme === 'dark'
  return (
    <div
      className={`relative h-[1080px] w-[1920px] overflow-hidden ${dark ? 'bg-navy text-white' : 'bg-paper text-ink'}`}
    >
      {background ?? (dark ? <DarkBackdrop /> : <LightBackdrop />)}
      <header className="absolute left-[112px] right-[112px] top-[44px] flex items-center justify-between">
        <div className={`flex items-center gap-3 ${hideBrand ? 'invisible' : ''}`}>
          <LogoMark size={30} className={dark ? 'ring-1 ring-white/15 rounded-[8px]' : ''} />
          <span className="font-display text-[22px] font-bold tracking-[-0.02em]">Stake-Sync</span>
        </div>
        <div
          className={`flex items-center gap-3 text-[17px] font-medium uppercase tracking-[0.16em] ${dark ? 'text-white/50' : 'text-muted'}`}
        >
          <span className="tnum">{String(number).padStart(2, '0')}</span>
          <span className={`h-px w-8 ${dark ? 'bg-white/25' : 'bg-ink/20'}`} />
          <span>{label}</span>
        </div>
      </header>
      <div className="absolute bottom-[84px] left-[112px] right-[112px] top-[128px]">{children}</div>
    </div>
  )
}

export function DarkBackdrop({ glow = 'right' }: { glow?: 'right' | 'left' | 'center' }) {
  const pos = glow === 'right' ? 'left-[55%] top-[-10%]' : glow === 'left' ? 'left-[-15%] top-[20%]' : 'left-[25%] top-[-25%]'
  return (
    <div className="pointer-events-none absolute inset-0" aria-hidden="true">
      <div className={`absolute ${pos} h-[900px] w-[1100px] rounded-full bg-brand/25 blur-[160px]`} />
      <div className="absolute bottom-[-30%] left-[10%] h-[600px] w-[800px] rounded-full bg-sol-purple/10 blur-[160px]" />
      <div className="bg-grid-dark absolute inset-0" />
      <div className="absolute left-0 right-0 top-[118px] h-px overflow-hidden">
        <div className="glow-sweep h-px w-1/2" />
      </div>
    </div>
  )
}

export function LightBackdrop() {
  return (
    <div className="pointer-events-none absolute inset-0" aria-hidden="true">
      <div className="absolute right-[-10%] top-[-20%] h-[800px] w-[1000px] rounded-full bg-brand/10 blur-[140px]" />
      <div className="bg-grid-light absolute inset-0" />
    </div>
  )
}

export function Kicker({ children, dark = false }: { children: ReactNode; dark?: boolean }) {
  return (
    <div
      className={`mb-5 inline-flex items-center gap-2.5 text-[19px] font-semibold uppercase tracking-[0.14em] ${dark ? 'text-brand-glow' : 'text-brand'}`}
    >
      <span className={`h-2 w-2 rounded-[2px] ${dark ? 'bg-brand-glow' : 'bg-brand'}`} />
      {children}
    </div>
  )
}

export function Headline({ children, className = '' }: { children: ReactNode; className?: string }) {
  return (
    <h2
      className={`font-display font-bold leading-[1] tracking-[-0.028em] ${className.includes('text-[') ? '' : 'text-[84px]'} ${className}`}
    >
      {children}
    </h2>
  )
}

export function BrowserFrame({
  src,
  alt,
  path = '',
  className = '',
  dark = false,
  fit,
}: {
  src: string
  alt: string
  path?: string
  className?: string
  dark?: boolean
  /** When set, the image area has a fixed aspect and the screenshot is contained (aspect preserved). */
  fit?: { aspect: string }
}) {
  return (
    <div
      className={`overflow-hidden rounded-[18px] border ${dark ? 'border-white/15 shadow-[0_40px_120px_-20px_rgba(48,85,245,0.45)]' : 'border-line shadow-[0_30px_80px_-24px_rgba(18,22,32,0.28)]'} bg-white ${className}`}
    >
      <div className="flex h-[42px] items-center gap-2 border-b border-line bg-[#f7f8fa] px-4">
        <span className="h-3 w-3 rounded-full bg-[#ff5f57]" />
        <span className="h-3 w-3 rounded-full bg-[#febc2e]" />
        <span className="h-3 w-3 rounded-full bg-[#28c840]" />
        <div className="mx-auto flex h-[26px] min-w-[46%] items-center justify-center gap-2 rounded-md bg-white px-4 text-[14px] text-muted ring-1 ring-line">
          <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
            <rect x="4" y="11" width="16" height="10" rx="2" />
            <path d="M8 11V7a4 4 0 0 1 8 0v4" />
          </svg>
          {LIVE_HOST}
          {path}
        </div>
        <span className="w-[52px]" />
      </div>
      {fit ? (
        <div className="relative bg-[#e9ebf0]" style={{ aspectRatio: fit.aspect }}>
          <img src={src} alt={alt} className="absolute inset-0 h-full w-full object-contain" draggable={false} />
        </div>
      ) : (
        <img src={src} alt={alt} className="block h-auto w-full" draggable={false} />
      )}
    </div>
  )
}

export const SCREENS = {
  landing: '/screens/01-landing.png',
  dashboard: '/screens/02-dashboard.png',
  createBasics: '/screens/03-create-basics.png',
  createAccess: '/screens/04-create-access.png',
  invite: '/screens/05-invite.png',
} as const

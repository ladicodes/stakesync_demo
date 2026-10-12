import type { ComponentType } from 'react'
import type { Theme } from '../components/ui'
import S01Opening from './S01Opening'
import S02Problem from './S02Problem'
import S03Solution from './S03Solution'
import S04Create from './S04Create'
import S05HowItWorks from './S05HowItWorks'
import S06Together from './S06Together'
import S07Solana from './S07Solana'
import S08Business from './S08Business'
import S09Demo from './S09Demo'
import S10Vision from './S10Vision'

export type SlideMeta = { title: string; theme: Theme; Component: ComponentType; notes: string }

export const SLIDES: SlideMeta[] = [
  {
    title: 'Commit to it. Prove it. Get paid for it.',
    theme: 'dark',
    Component: S01Opening,
    notes:
      'Stake-Sync turns goals into challenges with your own USDC on the line. The grid is the 30-day card from our landing page: 28 verified days, two misses absorbed by free strikes, then a claim. Click the replay button to run it again.',
  },
  {
    title: 'More information. Less consistency.',
    theme: 'light',
    Component: S02Problem,
    notes:
      'We have more resources than ever, yet we struggle to follow through. Personal story: we have experienced this ourselves and seen it in friends. No statistics here, just the relatable gap between starting and finishing.',
  },
  {
    title: 'Meet Stake-Sync.',
    theme: 'dark',
    Component: S03Solution,
    notes:
      'Explain for non-Web3 people: it is a deposit on your own discipline. USDC is a digital dollar. Commit, stake, prove, earn. The screenshot is the real landing page.',
  },
  {
    title: 'Your goals. Your rules. Your stake.',
    theme: 'light',
    Component: S04Create,
    notes:
      'Seven steps: Basics, Requirement, Rules, Stake, Strikes, Rewards, Review. Point to the numbered pins: host as you or an organization, the live preview, eight categories, who can join, and the optional participant limit.',
  },
  {
    title: 'From intention to verified action.',
    theme: 'dark',
    Component: S05HowItWorks,
    notes:
      'Five stages. Then the strike ladder from our revenue model (default Gentle rules, 30 days needing 25). Stress: payouts are conditional on results, outages never cause a miss, and every miss can be disputed.',
  },
  {
    title: 'You don’t have to do it alone.',
    theme: 'light',
    Component: S06Together,
    notes:
      'The dashboard is the personal side. The invite dialog is the social side: link, code, username, and sharing to WhatsApp, X, Telegram and email. Organizations can host member-only challenges.',
  },
  {
    title: 'Verification off-chain. Settlement on-chain.',
    theme: 'dark',
    Component: S07Solana,
    notes:
      'Be precise: Solana does not verify GitHub or LeetCode. Our backend verifies and records results; the escrow program holds USDC, enforces capped fees and settles. Funds move between users’ own wallets and the vault.',
  },
  {
    title: 'A sustainable platform for accountability.',
    theme: 'light',
    Component: S08Business,
    notes:
      'Two live fees: 2% joining fee (cap 5%) and 60% of forfeits (cap 60%). 0% on sponsor prizes and returned stakes. Worked example totals 13.80 USDC. These are example economics. Be upfront: revenue leans on forfeits today, legal review per market is required, and the diversification ideas are not built yet.',
  },
  {
    title: 'It’s built. Let’s show you.',
    theme: 'dark',
    Component: S09Demo,
    notes:
      'Open stake-sync-ui.vercel.app. If the network fails, click the six demo steps (or press Up/Down) to walk through the screenshots. Everything runs on Devnet with test funds.',
  },
  {
    title: 'Make consistency worth something.',
    theme: 'light',
    Component: S10Vision,
    notes:
      'Target audiences, a realistic path to adoption, and an honest status: built and on Devnet, motivation from our own experience, validation still ahead. Invite everyone to scan the QR code and try it.',
  },
]

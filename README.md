# Stake-Sync presentation

A 10-slide, 16:9 pitch deck for Stake-Sync, built with React, Vite, Tailwind CSS v4, Motion and Lucide.
Slides are laid out on a fixed 1920×1080 stage that scales to fit any screen, so nothing reflows or clips on a projector.

## Run locally

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # type-check + production build into dist/
npm run preview    # serve the production build at http://localhost:4173
```

## Presenting

| Key | Action |
| --- | --- |
| → / Space / PageDown | Next slide |
| ← / Shift+Space / PageUp | Previous slide |
| Home / End, 1–9, 0 | Jump to first / last / numbered slide |
| Esc | Open or close the slide overview |
| F | Toggle fullscreen |
| N | Toggle presenter notes |
| ↑ / ↓ (slide 9) | Step through the offline demo walkthrough |

The control bar at the bottom fades out after a few seconds without mouse movement. The URL hash (`#1`–`#10`) tracks the current slide.
On a narrow portrait screen (a phone), the deck switches to a scrollable list of all slides.

Everything is bundled locally (screenshots in `public/screens/`, fonts via Fontsource, the QR code generated in the browser), so the deck works offline. Only the live demo link needs the internet.

## Deploy

**Vercel:** import the folder (or run `npx vercel`). Framework preset: Vite. Build command `npm run build`, output directory `dist`.

**Netlify:** `netlify.toml` is included (build `npm run build`, publish `dist`). Run `npx netlify deploy --prod` or connect the repo.

## Sources

The source PDFs (`Stake-Sync-Presentation-Screenshots.pdf`, `Stake-Sync-Revenue-Model.pdf`) are kept locally in `source-docs/`, which is git-ignored.

- The screenshots PDF supplied the five images in `public/screens/`, extracted at native resolution.
- The revenue-model PDF is the source for every fee, cap, strike rule and worked-example figure on slides 5 and 8.

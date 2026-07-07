# Highlight's — Portfolio

A minimal black-and-white portfolio site for showcasing YouTube video work.
Built with React, Vite, TypeScript, and Tailwind CSS.

## What it does

- Fullscreen cinematic hero with your name and tagline
- A numbered "reel" of your videos — click any row to play it in a lightbox
- A "+" button (bottom right) lets you paste a YouTube link, give it a title,
  and add it to the reel — no code required
- Videos you add are saved in your own browser (`localStorage`), so they'll
  still be there next time you visit from the same device/browser

**Note on the add-video feature:** because this is a static site with no
backend, videos added through the "+" button are only visible to the browser
that added them — not to every visitor. If you want every visitor to see the
same reel, open `src/App.tsx` and pass a starter list of videos into
`useVideos` (or hardcode an array), then redeploy. Ask if you'd like a version
with shared videos, e.g. via a small database.

## Run locally

```bash
npm install
npm run dev
```

Visit the URL Vite prints (usually http://localhost:5173).

## Deploy to Vercel

**Option A — Vercel dashboard**
1. Push this folder to a GitHub repo (or drag-and-drop the folder into
   [vercel.com/new](https://vercel.com/new)).
2. Vercel auto-detects Vite. Build command: `npm run build`, output
   directory: `dist`. Click Deploy.

**Option B — Vercel CLI**
```bash
npm i -g vercel
vercel
```
Follow the prompts; it will build and deploy automatically.

## Customize

- **Name / tagline:** `src/components/Hero.tsx`
- **Nav links:** `src/components/Nav.tsx`
- **About text:** `src/components/About.tsx`
- **Email / social links:** `src/components/Footer.tsx`
- **Colors:** `tailwind.config.js` (`ink` = background, `paper` = text)
- **Fonts:** loaded in `index.html` (Instrument Serif + Inter)

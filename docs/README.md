# 4SightAI Network

Reference for the interactive mock in this repository. The app is a signed-in preview of the network — Learn AI, Build Trust, Connect the Future — not a hosted community. You start as **Angelo Smith**, Founder. There is no account server.

## Read this first

| Doc | What it covers |
| --- | --- |
| [Architecture](ARCHITECTURE.md) | Routes, client state, what persists, the one API |
| [Screens](DESKTOP_MOCKUPS.md) | Desktop layout and every page |
| [Mobile](MOBILE_APP_MOCKUPS.md) | The bottom bar and what it hides |
| [Academy](ACADEMY.md) | The four paths, progress, and the CAFP certificate |
| [Design system](DESIGN_SYSTEM.md) | Color, type, glass, emblem |
| [Roadmap](PRODUCT_ROADMAP.md) | What this build includes, and what it does not |

## Run

```bash
npm install
npm run dev
```

Open [http://localhost:43147](http://localhost:43147). Production mode is `npm run build && npm start` on the same port. Use `npm start` when a preview proxy blocks Turbopack chunk URLs from `next dev`.

## What is real in this preview

- Academy progress, the issued certificate, and the profile (including a photo) stay in this browser.
- The home tech wire calls `/api/tech-news`, which reads public RSS feeds and falls back to a seeded brief if those feeds fail.
- Job search builds outbound links to LinkedIn, Indeed, and Google, plus three sample openings inside the network.
- Copilot replies from a small script keyed to trust, groups, courses, threats, and collaboration. It is not a model call.
- The CAFP checkout accepts a card-shaped form and then stores the certificate locally. The dialog says nothing is charged.

Posts you write, likes, group joins, read notifications, and Copilot turns live in memory for the tab. A refresh restores the seed for those.

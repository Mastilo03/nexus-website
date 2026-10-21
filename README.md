# NEXUS website

FORME and APEX now have dedicated interactive concept demos. See [running, deployment and data editing](docs/CONCEPTS-README.md) and [APEX video generation and frame replacement](docs/APEX-VIDEO.md).

Marketing site for NEXUS: websites and automation for service businesses. React 19, TypeScript, Vite and React Router, pre-rendered to static HTML.

## Run locally

Requires Node.js 20.19+ or 22.12+.

```sh
npm install
npm run dev      # http://127.0.0.1:5173
npm test
npm run build    # typecheck, client build, server build, pre-render
npm run preview
```

## Configuration

Copy `.env.example` to `.env.local` and fill in what you have. `VITE_` variables end up in the public bundle, so never put secrets in them.

| Variable | What it does |
| --- | --- |
| `VITE_SITE_URL` | The live origin, e.g. `https://nexus.example`. Needed for canonical URLs, `og:image` and `sitemap.xml`; the build skips those and warns when it is missing. |
| `VITE_CONTACT_ENDPOINT` | HTTPS endpoint that receives the contact form as JSON and answers `{ "received": true, "id": "..." }` once it has stored it. Without it, the form downloads the brief as a text file instead. |
| `VITE_BOOKING_URL` | Cal.com or Calendly link. Shows a "Choose a time" button on the contact page. |
| `VITE_CONTACT_EMAIL` | Inbox shown on the contact page. |

## How it is put together

- `src/App.tsx` is the app shell and homepage; `src/pages.tsx` holds the other routes; `src/components.tsx` the shared demos (assistant, workflow, ROI calculator, industries, FAQ).
- `src/seo.ts` is the single source for page titles and descriptions, used in the browser and at build time.
- `npm run build` renders every route, including each concept at `/work/<slug>`, with `src/entry-server.tsx` and `scripts/prerender.mjs`. Search engines get real HTML; the browser hydrates it. A `404.html` is generated for static hosts.
- `src/style.css` is the whole design system: graphite surfaces, one lime accent, self-hosted Geist. No UI text is smaller than 12px.
- The Three.js hero object loads lazily on desktop only, and is skipped for reduced motion or missing WebGL.
- Demos are scripted and use sample data. Nothing is sent, booked or saved, and each demo says so once.
- There are no analytics or cookies. After a confirmed inquiry the page dispatches a `nexus:conversion` event that a consent-aware analytics script can listen for.

## Before going live

- Set `VITE_SITE_URL`, and the contact endpoint or booking link, so inquiries can actually arrive.
- Fill in the business identity, privacy contact and retention details on the privacy page.
- The six portfolio pieces are concepts. Replace or supplement them with real work as it exists.

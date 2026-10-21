# FORME and APEX demos

Integrated into the existing NEXUS Vite + React + TypeScript repository:

- `/work/forme`: procedural seven-storey building, residence explorer, material study, fictional neighbourhood and viewing demo.
- `/work/apex`: progressive frame player, services, process, keyboard-operable finish inspector and booking demo.

## Run

Use Node 22.12+ or 24 LTS. Node 21 is unsupported by this Vite version.

```sh
npm ci
npm run dev
npm run build
npm run preview
npm test
```

Open `http://127.0.0.1:5173/work/forme` and `/work/apex`. The production build type-checks and pre-renders the existing routes, including both concepts.

## Deploy to Vercel

Import this Git repository in Vercel. Select Vite, use `npm run build`, and set the output directory to `dist`. The included `vercel.json` records those settings. Set `VITE_SITE_URL` to the actual NEXUS origin, for example `https://your-domain.example`, without a final slash. Then deploy. Preview deployments can use their intended public NEXUS origin too.

`src/concepts/config.ts` owns the single `NEXUS_ORIGIN` constant. Both slim concept bars and footers derive their links from it. Without configuration it is deliberately `https://nexus.example`; this placeholder must be replaced before publication. No deployment was performed by this build phase.

## Edit residences

Edit **`src/concepts/forme/residences.ts`**. It exports a `Residence` type, the entire 18-residence inventory and sample-price formatting. Floor 0 is the ground floor; floor 6 is the penthouse. Keep identifiers unique. The floor selector derives its contents and counts from this file. Area, bedroom count, orientation and price are displayed from the selected record. Plans are illustrative diagrams, not construction drawings or measured apartment plans.

## Demo privacy

Both forms validate required fields in the browser, show a local confirmation, and clear the contact fields. No request, email, booking, localStorage entry or analytics event is made. The confirmation explicitly says nothing was sent or booked. All prices, residences, locations, timings and longevity values are illustrative.

## Motion and loading

FORME lazy-loads the Three.js scene on desktops with WebGL and no reduced-motion preference. A mutable ref carries scroll progress directly to the render loop. Pixel ratio is capped at 1.5. One shadow-casting directional light uses a bounded shadow camera. Rooftop plants use instanced geometry. Rendering pauses when the hero is off screen.

`public/forme/axonometric.png` is exported from the actual scene canvas by `scripts/check-forme.cjs`. Re-run that export after changing the model. Mobile, reduced-motion and missing-WebGL modes show that saved image plus the four statements in normal document flow.

APEX loads frame 1 first and then prioritizes the target and nearby frames. It keeps the nearest decoded frame visible, uses time-based damping, handles all IntersectionObserver entries and stops the animation loop off screen. Its canvas backing size tracks device pixel ratio up to 2. Reduced motion, Save-Data, 2G and 3G use four stills. See [APEX-VIDEO.md](APEX-VIDEO.md) for the exact generation prompt, compression commands and replacement slots.

## Verification

Run `npm run build` and `node scripts/check-production.mjs` to verify clean-route HTML, styles present before JavaScript, the complete route JS budgets and both frame directory budgets. Start `npm run preview` on port 4173 before running browser checks. See [VERIFICATION.md](VERIFICATION.md) for completed checks and the remaining visual recheck.

Browser checks live in `scripts/check-forme.cjs`, `scripts/check-apex.cjs` and `scripts/check-concepts.cjs`. Their current Playwright import points at the bundled runtime on the authoring machine. For another machine install Playwright as a dev dependency and replace that import with `require('playwright')`; use its installed Chromium or Edge channel.

Screenshots are development evidence under `.impeccable/review/`. They are not served with the website. Automated checks cover keyboard floor selection, residence selection, inspector arrow keys, both completed forms, absence of POST requests, mobile overflow and reduced-motion fallbacks. APEX's true orbit and final side-profile composition remain dependent on the supplied video.

## Images

FORME material close-ups are generated 1000 × 1000 WebP assets in `public/forme/`: concrete, oak, glass and stone. No interior photos or live map are required by the implemented layout. APEX source and paint images are generated concept imagery. Provenance and prompts are recorded in [ASSETS.md](ASSETS.md).

# NEXUS — Automation & Digital Experiences

A complete React + TypeScript/Vite website with ten routes, two distinct service identities, six concept projects, scripted assistant demos, a workflow simulator, a website comparison and an editable opportunity calculator.

## Run locally

Requires Node.js 22.12+ (Node 24 recommended).

```sh
npm install
npm run dev
npm test
npm run build
npm run preview
```

The running development preview is at `http://127.0.0.1:5173`. Vite updates it as source files change.

## Service identities

- `/services/web-design`: violet studio identity, editorial device composition, before/after comparison, concept work and design process.
- `/services/automation`: emerald operations identity, customer-journey diagram, interactive workflow, scripted assistant and opportunity calculator.
- The homepage exposes both service paths side by side.

## Configuration

Copy `.env.example` to `.env.local`, supply real values and restart/rebuild. `VITE_` variables are public build-time configuration; never put secret credentials in them.

| Variable | Purpose |
| --- | --- |
| `VITE_SITE_URL` | Canonical deployed origin; also set in the build environment for generated metadata. |
| `VITE_CONTACT_ENDPOINT` | HTTPS JSON endpoint owned by the business. Must acknowledge durable receipt with `{ "received": true, "id": "receipt-id" }`. |
| `VITE_BOOKING_URL` | Verified Cal.com/Calendly booking URL. |
| `VITE_CONTACT_EMAIL` | Verified business inbox for an email link. |

Without an endpoint, the form validates and downloads a local project brief. It explicitly says the brief was not submitted. Without a booking URL, the contact page offers brief preparation instead of a broken calendar embed. No live inquiry or calendar integration is claimed.

The endpoint must implement server-side validation, allowed origins, request limits, abuse protection and durable storage/delivery. Never treat browser validation or a successful HTTP response alone as receipt. The UI additionally requires the explicit receipt contract. A failed/timeout response preserves form values and offers a local copy.

## Data & behavior

- Scripted assistants use sample data, never a paid AI API.
- Workflow playback does not send messages, create appointments or update CRM systems.
- All six portfolio projects are clearly labeled concepts.
- Calculator assumptions travel to contact via non-personal query parameters and can be excluded from the brief.
- Revenue opportunity is not profit or a guarantee. Calculations follow the supplied brief exactly.
- There are no analytics trackers. A `nexus:conversion` browser event is dispatched only after a confirmed inquiry receipt; a consent-aware analytics integration can subscribe later.
- Draft form values stay in memory, not local storage.

## Implementation

- React Router handles navigation; the production build emits a static HTML entry point with unique metadata for every route.
- The Three.js scene is lazy loaded on supported desktop viewports. Mobile, reduced-motion and unavailable-WebGL views use a lightweight static composition.
- Motion honors `prefers-reduced-motion`; controls are keyboard operable with visible focus states.
- Google Fonts currently provides Space Grotesk and Inter. Self-host licensed font files if removing third-party font requests is required.
- Concept artwork is original CSS geometry; there are no stock-image dependencies or invented customer endorsements.

## Validation

`npm test` covers the calculator’s baseline, zero cases, upper bounds and invalid values. `npm run build` performs TypeScript checks, production bundling and ten-route metadata generation. Browser checks cover service navigation, comparison toggling, a full scripted conversation, workflow playback, portfolio filters and required-form validation.

## Before accepting public inquiries

Configure and test the real inquiry/booking services. Complete the operator's business identity, privacy contact, provider and retention details in the website notices. Confirm the actual engagement terms. The current private preview intentionally does not fabricate those details.

No Lighthouse scores or live delivery results have been claimed.

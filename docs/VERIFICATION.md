# Concept verification

## Completed

- TypeScript, client production build, SSR build and 16 prerendered routes plus 404.
- Five existing ROI tests pass.
- Production browser: FORME keyboard floor selection from level 6 to 5, residence 502 selection and viewing form completion; APEX inspector arrow key changes 50 to 51 and booking form completion. Both confirmations explicitly state nothing was sent or booked.
- Desktop 1440 and mobile 390 screenshot checks. APEX forward sequence and fast reverse scroll retain an image. Mobile four-beat viewport captures supplement the full-page capture because a sticky hero leaves its scroll runway blank in a full-page screenshot.
- Earlier automated checks covered reduced-motion, mobile overflow and zero form POST requests. Final production browser visits after the clean-route fix produced no new hydration errors.
- Fixed production clean routes serving homepage HTML, and separated lazy import branches so Vite associates each concept with its own stylesheet. Prerendered HTML now includes route CSS for a styled first paint.

## Current verification boundary

The browser connection became unavailable after the final source edits. Fresh captures of the latest APEX bead bounds, the removed duplicate FORME residence label and FORME transparent-depth correction remain pending. Do not describe those three fixes as visually signed off. Independent review confirmed the replacement mobile evidence and correction-headline contrast, then stopped at an account usage limit before a complete final verdict. No whole-surface ship verdict was obtained.

The local screenshots in `.impeccable/review/` are development evidence and are excluded from Git. Files ending `confirmation-final.jpg` were captured during the production styling diagnosis; use the earlier styled confirmation PNGs for visual assessment. The interactive completion assertions remain valid.

## Asset and publication dependencies

APEX uses a labelled still-derived sequence. It needs the continuous orbit video described in `APEX-VIDEO.md` to achieve the requested camera movement and final side profile. The current 160-frame sets test playback mechanics.

Set `VITE_SITE_URL` to the real NEXUS origin before publishing. The configured fallback `https://nexus.example` is intentionally a placeholder. No deployment or push was performed.

Run `node scripts/check-production.mjs` after each production build for current gzip and asset weights. This covers shared React, GSAP/Lenis and the FORME Three chunk, not only the page-specific module. It does not substitute for visual or screen-reader testing, and this project has not had an independent WCAG conformance audit.

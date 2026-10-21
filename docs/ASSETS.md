# Generated asset provenance

All images are fictional concept assets generated with the built-in Imagegen tool on 2026-10-20. No stock licensing, real building, real client car, or commercial relationship is implied.

## FORME material photographs

Shared prompt, with each subject substituted verbatim:

> Square architectural material close-up photograph of SUBJECT. For fictional residential concept FORME. Fill frame with the actual material at tactile macro scale, soft raking daylight, restrained sophisticated editorial photography, physically real detail, no text, no graphic overlays, no props, no watermark.

| File                         | SUBJECT                                                                                         |
| ---------------------------- | ----------------------------------------------------------------------------------------------- |
| `public/forme/concrete.webp` | board-formed architectural concrete, subtle horizontal timber grain and tiny pores, cool grey   |
| `public/forme/oak.webp`      | quarter-sawn oak timber soffit, precise linear grain, warm natural restrained tan               |
| `public/forme/glass.webp`    | a thick low-iron architectural glass edge with soft blue-grey reflections and subtle refraction |
| `public/forme/stone.webp`    | honed pale limestone slab, quiet mineral variation, a finely cut edge                           |

Source outputs were 1254 × 1254 PNG. Shipping copies are 1000 × 1000 WebP. `public/forme/axonometric.png` is an original procedural render of `src/concepts/forme/scene.tsx`, exported directly from the WebGL canvas with no page text, using `scripts/check-forme.cjs`.

## APEX studio image and placeholder frames

`public/apex/studio-source.png`, 1672 × 941. Exact prompt:

> Create a cinematic automotive studio photograph, wide 16:9 composition, for a fictional detailing studio APEX. A single completely unbadged original-design graphite sports coupe, no recognizable brand design or logos, front three-quarter angle with nose at left and tail at right, entire car in frame including tires, car placed across middle lower half of image, generous black-plum negative space above. Dark plum black studio backdrop #0E0C11 and polished almost-black floor. Long thin soft white light strips create exact sweeping highlights along curved hood, roof and doors. One restrained signal red reflection along lower sill. Perfectly smooth detailed paint, subtle real reflections, extremely premium restrained product photography, realistic tires, no lettering, no watermark. Image will be used as an honestly labelled still-based placeholder sequence while final orbit video is produced.

Both 160-frame WebP tiers derive from this still, with FFmpeg zoompan from 1.06× to 1× and brightness from −0.13 to 0. They are explicitly a still-based preview, not a real orbit. Desktop is 1920 × 1080, quality 68; mobile is 900 × 506, quality 64. The desktop dimensions upscale the source and are not evidence of native 1920px photographic detail. The final video should be at least 1920 × 1080.

## APEX paint sample

`public/apex/paint.webp`, 1536 × 1024. Exact prompt:

> A macro automotive detailing inspection photograph, landscape 3:2. A gently curved graphite black painted car body panel fills the entire image. One long soft white studio strip reflection arcs across the upper third, dark plum black surroundings. Left half of the paint shows fine realistic concentric car wash swirl marks under the inspection light; right half is perfectly corrected mirror-smooth paint, exact same surface and light. Subtle continuous transition near the middle, no graphic dividing line. No vehicle badges, no text, no labels, no watermark. High photographic detail; fictional demonstration asset for APEX finish inspector.

The image is also used in the hero correction wipe. The interactive inspector moves a light mask over this still; it does not calculate a physical coating or paint-correction simulation.

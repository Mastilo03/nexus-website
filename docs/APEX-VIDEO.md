# APEX video and frame pipeline

The shipped sequence is a still-based placeholder, labelled in the page. It tests the loading and scrub mechanics. It does not depict a true camera orbit or finish on a new side profile. Replace it with the following video before presenting it as the finished cinematic sequence.

## Exact video generation prompt

Create a single continuous 7-second cinematic product shot, 24 fps, 16:9, at least 1920 × 1080. An original, completely unbadged dark graphite sports coupe stands still in a seamless plum-black (#0E0C11) studio. No real manufacturer design, badge, lettering, licence plate text, logo, people or watermark. The camera makes one slow, mechanically smooth 120-degree orbit, starting at a low front three-quarter view and ending at a perfectly framed full side profile. Keep the entire car and all four tire contact points inside the frame with 12 percent safe space. Keep the lens, car geometry, wheels, materials and studio consistent throughout. One long soft white light strip travels continuously along the bodywork, describing the hood, curved shoulders and doors. Begin in near darkness with a subtle signal-red (#E5263F) reflection. Gradually reveal a precise mirror finish and end with the side profile evenly lit by long studio strips. Restrained reflections on the dark floor. No cuts, transitions, camera shakes, morphing panels, wheel movement, changing car identity or additional light effects. Reserve the upper quarter of the composition as quiet dark space for website copy. Photoreal, technically exact, controlled automotive studio cinematography.

The website supplies the red streak, correction wipe, bead effect and text. Do not bake those overlays into the video.

## Extract and compress

Install FFmpeg with libwebp. From the repository root, create `public/apex/frames/desktop` and `public/apex/frames/mobile`. The following commands write exactly 160 frames from a 7-second source. They overwrite the placeholder frames only when you pass `-y`.

```sh
ffmpeg -i apex-orbit.mp4 -vf "fps=160/7,scale=1920:1080:force_original_aspect_ratio=increase,crop=1920:1080" -frames:v 160 -start_number 1 -c:v libwebp -quality 68 public/apex/frames/desktop/frame_%03d.webp
ffmpeg -i apex-orbit.mp4 -vf "fps=160/7,scale=900:506:force_original_aspect_ratio=increase,crop=900:506" -frames:v 160 -start_number 1 -c:v libwebp -quality 64 public/apex/frames/mobile/frame_%03d.webp
```

For a 6- or 8-second video change `160/7` to `160/6` or `160/8`. Keep 160 frames and the 001–160 names. Lower quality in steps of 4 if the desktop directory exceeds 12 MB or mobile exceeds 5 MB. Inspect reflections after compression. Final weight depends on the video; the placeholder including provenance metadata measures 10.79 MB desktop and 4.08 MB mobile.

Run `npm run dev` and check forward/backward scrubbing, a fast jump to the bottom and back, resizing, reduced-motion and slow-network modes. The player keeps the nearest decoded image on screen while requested frames load. It never clears the canvas in anticipation of an unavailable frame.

After the real video is installed, change the visible “Still-based sequence preview. Orbit video to follow.” note in `src/concepts/apex/Apex.tsx` to an accurate description. Preserve the NEXUS concept credit.

## Asset slots

| Slot             | File                                                      | Required size                          | State                                                           |
| ---------------- | --------------------------------------------------------- | -------------------------------------- | --------------------------------------------------------------- |
| Orbit master     | `apex-orbit.mp4`, stored outside public                   | 1920 × 1080 minimum, 7 seconds, 24 fps | User-supplied video required                                    |
| Desktop sequence | `public/apex/frames/desktop/frame_001.webp` through `160` | 1920 × 1080                            | Generated still-based placeholder                               |
| Mobile sequence  | `public/apex/frames/mobile/frame_001.webp` through `160`  | 900 × 506                              | Generated still-based placeholder                               |
| Paint sample     | `public/apex/paint.webp`                                  | 1536 × 1024                            | Generated concept imagery, may be replaced with an owned sample |

There is no connected AI video tool in this task. The prompt above is ready for the video tool you choose.

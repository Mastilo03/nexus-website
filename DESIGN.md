---
name: FORME and APEX concept systems
description: Two scoped visual worlds within the NEXUS concept portfolio.
colors:
  forme-orange: "#ff5b1f"
  forme-ground: "#121417"
  forme-paper: "#f2f3f1"
  forme-concrete: "#8e9192"
  forme-glass: "#9fb7c4"
  forme-body-muted: "#bec3c4"
  forme-sheet-muted: "#b9bfc0"
  forme-plan-note: "#54595c"
  forme-dimension-on-paper: "#b93808"
  apex-red: "#e5263f"
  apex-black: "#0e0c11"
  apex-surface: "#1c1a21"
  apex-pearl: "#ece8ee"
  apex-muted: "#c6bdcb"
typography:
  forme-display:
    fontFamily: '"Host Grotesk Variable", sans-serif'
    fontSize: "clamp(44px, 5.8vw, 84px)"
    fontWeight: 400
    lineHeight: 1.01
    letterSpacing: "-0.04em"
  forme-headline:
    fontFamily: '"Host Grotesk Variable", sans-serif'
    fontSize: "clamp(38px, 4.8vw, 68px)"
    fontWeight: 400
    lineHeight: 1.05
    letterSpacing: "-0.035em"
  forme-title:
    fontFamily: '"Host Grotesk Variable", sans-serif'
    fontSize: "32px"
    fontWeight: 400
    lineHeight: 1.15
  forme-body:
    fontFamily: '"Host Grotesk Variable", sans-serif'
    fontSize: "17px"
    lineHeight: 1.5
  apex-display:
    fontFamily: '"Michroma", sans-serif'
    fontSize: "clamp(30px, 4.4vw, 64px)"
    fontWeight: 400
    lineHeight: 1.15
    letterSpacing: "-0.025em"
  apex-headline:
    fontFamily: '"Michroma", sans-serif'
    fontSize: "clamp(28px, 3.5vw, 50px)"
    fontWeight: 400
    lineHeight: 1.25
    letterSpacing: "-0.025em"
  apex-title:
    fontFamily: '"Inter Tight Variable", sans-serif'
    fontSize: "30px"
    fontWeight: 450
    lineHeight: 1.2
  apex-body:
    fontFamily: '"Inter Tight Variable", sans-serif'
    fontSize: "17px"
    lineHeight: 1.5
  mono-label:
    fontFamily: '"Geist Mono Variable", monospace'
    fontSize: "13px"
    lineHeight: 1.5
rounded:
  square: "0"
spacing:
  control-padding: "12px"
  paired-fields: "20px"
  form-stack: "22px"
  mobile-section: "75px 6%"
  wide-section: "130px 7%"
components:
  forme-action:
    backgroundColor: "{colors.forme-orange}"
    textColor: "{colors.forme-ground}"
    padding: "16px 22px"
  apex-action:
    backgroundColor: "{colors.apex-red}"
    textColor: "{colors.apex-pearl}"
    padding: "17px 24px"
  forme-field:
    backgroundColor: "{colors.forme-ground}"
    textColor: "{colors.forme-paper}"
    typography: "{typography.forme-body}"
    rounded: "{rounded.square}"
    padding: "{spacing.control-padding}"
  apex-field:
    backgroundColor: "{colors.apex-surface}"
    textColor: "{colors.apex-pearl}"
    typography: "{typography.apex-body}"
    rounded: "{rounded.square}"
    padding: "{spacing.control-padding}"
  forme-residence-choice:
    backgroundColor: "transparent"
    textColor: "{colors.forme-ground}"
  forme-residence-choice-selected:
    backgroundColor: "{colors.forme-ground}"
    textColor: "{colors.forme-paper}"
  forme-reset:
    backgroundColor: "{colors.forme-paper}"
    textColor: "{colors.forme-ground}"
    typography: "{typography.forme-body}"
    padding: "16px"
  apex-reset:
    backgroundColor: "{colors.apex-pearl}"
    textColor: "{colors.apex-black}"
    padding: "15px 20px"
---

# Design System: FORME and APEX

## Overview

**Creative North Star: "Architectural drawing sheet / Plum-black automotive studio"**

FORME uses a graphite drawing sheet, pale architectural paper, open geometric typography and measured orange marks. Its density alternates between a large architectural study and practical residence information. Material imagery, plans and fine rules give the interface its character.

APEX uses a plum-black studio, wide technical display lettering and restrained red actions. The car and its finish carry the depth; service information uses open rows and fine separators. Both worlds are fictional NEXUS concepts, with a plain concept credit and local demonstration forms.

This document records only the shipped FORME and APEX surfaces in `src/concepts/forme` and `src/concepts/apex`, grounded in their stylesheets, components and `docs/concepts.md`. The existing NEXUS system outside those surfaces is untouched and is not governed by these tokens.

**Key Characteristics:**
- Two independent, route-scoped palettes and type systems.
- Square controls, fine separators and generous section spacing.
- Object-led scenes with readable static alternatives.
- Operable explorers and local form confirmations.

## Colors

FORME combines graphite, paper and cool construction materials with orange geometry; APEX combines plum neutrals and pearl text with red actions.

### Primary
- **FORME orange:** action fills, meaningful dimension marks, focus outlines and link rules.
- **APEX red:** action fills, link rules, the inspection slider and the moving studio streak.

### Secondary
- **FORME concrete / glass:** scene materials and architectural drawing context; not generic UI accent fills.
- **FORME dimension on paper:** darker orange for fine dimensions and paths on pale diagrams.

### Neutral
- **FORME ground / paper:** alternating dark studies and light residence or neighbourhood surfaces.
- **FORME body muted / sheet muted:** supporting prose and drawing-sheet metadata.
- **FORME plan note:** supporting text on the pale residence surface.
- **APEX black / surface:** studio ground and slightly lifted process or booking sections.
- **APEX pearl / muted:** primary text and supporting service information.

**The Scoped Palette Rule.** Keep each concept's palette inside its own route; these tokens do not replace NEXUS identity.

## Typography

**FORME display and body:** Host Grotesk Variable, sans-serif fallback.  
**APEX display:** Michroma, sans-serif fallback.  
**APEX body:** Inter Tight Variable, sans-serif fallback.  
**Shared data face:** Geist Mono Variable, monospace fallback.

FORME's unforced geometric headlines read like a drawing title. APEX's broad Michroma lettering belongs to the studio headings; its compact body face keeps comparison and booking readable.

### Hierarchy
- **Display:** the concept-specific display tokens govern the animated hero headings. FORME static headings use `clamp(38px, 6vw, 64px)`; APEX static headings use `clamp(27px, 4vw, 50px)`. APEX animated mobile headings are 31px.
- **Headline:** concept-specific headline tokens govern the main section titles.
- **Title:** FORME residence names use its title token; material names use 29px, falling to 24px on mobile. APEX service titles use its title token; process titles use 40px, falling to 32px.
- **Body:** both concepts use 17px with 1.5 line height. Supporting prose commonly spans 29–40ch.
- **Label:** Geist Mono carries numerical facts, plans and scene notes with tabular numerals. Navigation, field labels and compact metadata use 13–14px.
- **Action:** FORME uses 16px/600, with a compact residence variant at 14px. APEX's final action override is 19px/700.

**The Data Voice Rule.** Use the mono face for measured facts and technical annotations; keep reading prose in the concept's body face.

## Layout

Desktop navigation is 100px high with 4% side gutters, below a 34px concept credit. At 767px and below navigation becomes 84px with 6% gutters and hides its middle descriptor. Main sections commonly use 7% gutters and 100–130px vertical padding; mobile sections share the mobile-section spacing token.

FORME's residence explorer uses a 1 : 1.7 : 1 grid. At 1000px and below, details move beneath a two-column explorer; at 767px and below the explorer stacks. Its materials remain a two-column staggered composition, with the even column offset reducing from 130px to 65px on mobile. Neighbourhood and viewing layouts collapse to a single column.

APEX services use open three-column rows, with the middle service indented on wide screens. At 899px and below they become two columns and lose the indent; at 767px and below they stack. Booking is two columns on desktop, one on mobile. Paired booking fields stack at 899px.

FORME's animated study spans 500svh with a sticky 100svh stage; animation requires a viewport of at least 768px, no reduced-motion preference and WebGL2. Otherwise the saved architectural rendering and four copy sections stack. APEX's animated sequence spans 400svh with a sticky 100svh stage, including supported mobile devices. Reduced motion, data saving or a reported slow connection selects stacked stills. Its process track moves horizontally only at 900px and above without reduced motion; otherwise it stacks.

## Elevation & Depth

UI surfaces use tonal changes, photographic or rendered depth, and fine rules rather than card shadows. FORME's scene has real material transparency, edges and lighting; APEX's finish inspector uses a movable light mask and its scene uses image overlays. These effects belong to the depicted objects, not to generic containers.

**The Object Depth Rule.** Keep depth in architectural material and automotive finish; UI structure stays flat and ruled.

## Shapes

Fields and actions are rectangular. Fields explicitly use the square radius token; navigation and service rows use fine straight separators. Floor selectors echo the stepped elevation, while the plan remains an actual diagram. APEX water beads are rounded physical details; their ellipse is not a control-radius precedent.

## Components

### Buttons
FORME actions use orange with graphite type, a 35px content gap and the action padding token. Its residence action is more compact with 15px padding. APEX actions use red with pearl type and a 50px content gap. Hover expands letter spacing to 0.02em for FORME and 0.025em for APEX; motion-enabled users receive the shared 800ms easing. Reset actions invert to the light neutral surface.

FORME keyboard focus uses a 2px orange outline with 6px offset. APEX uses the same dimensions in pearl. No special disabled style is established.

### Inputs / Fields
Dark, square fields use a one-pixel translucent light border, at least 50px height and the concept body face. Labels sit above fields with 10px gaps; form rows have 22px gaps. Native select/date behavior is retained, with dark color-scheme and inherited concept focus treatment.

### Navigation
The wordmark anchors the left, a quiet descriptor occupies the middle, and an underlined action sits right. FORME's wordmark is Host Grotesk at 38px/600 with negative tracking; APEX's is Michroma at 28px with positive tracking. On mobile they become 32px and 24px respectively. Concept attribution remains a separate thin strip.

### Residence controls
Floor selectors have at least 48px height and a stepped silhouette. Selection inverts graphite and paper and gives the floor border an orange accent. Residence choices are at least 52px wide and 44px high; their selected state inverts the same neutrals. Both communicate selection through `aria-pressed`. The details update in a polite live region.

### Service rows and material figures
APEX service information is arranged in ruled rows rather than enclosed cards. FORME material photographs use square crops, staggered placement and plain captions. Neither establishes a raised card component.

### Finish inspector
The inspection image has a movable masked shade and a one-pixel guide. A labelled native range input provides keyboard access to the same position, with a descriptive value. The image region is 500px tall on desktop and 350px on mobile.

### Scene and form behavior
GSAP scroll progress controls reversible scene beats. FORME uses a 0.65 scrub setting; APEX uses 0.4 for its hero and 0.6 for its process track. Local form confirmations are visually integrated, and must continue to describe their demonstration status. The APEX sequence is an interim still-based preview; do not document it as a completed continuous orbit.

## Do's and Don'ts

### Do:
- **Do** preserve the separate FORME and APEX visual worlds.
- **Do** keep body copy at 17px and compact labels at or above 13px.
- **Do** retain visible keyboard focus, explicit labels and static reduced-motion content.
- **Do** keep concept and local-demo status clear.
- **Do** use geometric marks and lighting to explain the depicted object.

### Don't:
- **Don't** apply these scoped tokens to existing NEXUS surfaces.
- **Don't** turn scene lighting or water-bead shapes into generic control styling.
- **Don't** replace stacked fallback content with an inaccessible frozen animation.
- **Don't** present the interim APEX still sequence as the final orbit asset.


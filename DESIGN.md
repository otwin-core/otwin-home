# Otwin Home design guide

Otwin Home is for householders, not engineers. It inherits the Otwin
identity — the colours keep their meanings, the typeface is the same, the
voice is the same — but everything about size, shape, navigation and tone is
decided for someone who has never seen a model and never will. The reference
for how that feels is Apple's Human Interface Guidelines; the principles
below are their 2026 set (purpose, agency, responsibility, familiarity,
flexibility, simplicity, craft, delight), applied to this product.

## Principles

1. **One thing per screen.** Each page asks one question or shows one
   answer. The next step is always a single obvious button. Everything else
   can be reached, but nothing else competes. (Simplicity.)
2. **The traffic light speaks first.** The householder's first answer is
   always visual and instant: green keeps the heat well, orange fairly, red
   loses it fast. Numbers come second, words third. Every state colour keeps
   its Otwin meaning. (Purpose.)
3. **Plain words, sentence case.** No capitals-as-shouting, no jargon, no
   "model", "fit" or "calibration" in anything the householder reads: the
   page says "build my digital home", "how sure we are", "where the money
   goes". Never the word "honest". (Simplicity, and the Otwin voice.)
4. **Nothing happens without you, and everything can be undone.** No file is
   read, no weather fetched, no model built until the householder presses
   the button that says so; every step has "undo this step". Errors are
   written as what to do next, never as fault. (Agency.)
5. **Privacy is said where it matters.** "Your files never leave this
   computer" appears at the moment files are added, not only in the footer.
   (Responsibility.)
6. **Familiar before clever.** Controls look like what they are: switches
   switch, sliders slide, cards group, the back button goes back. A
   householder who has used a phone has used this app. (Familiarity.)
7. **Care in every detail.** Alignment to the 8 px grid, one radius scale,
   one shadow, one motion curve. If a detail looks improvised, it is wrong.
   (Craft.)

## Colour

The Otwin tokens, selected and re-weighted for a consumer surface. Light
theme only for now.

| Token | Value | Use in Otwin Home |
|---|---|---|
| `surface` | `#ffffff` | Page background |
| `surface-raised` | `#f5f5f7` | Grouped background behind cards |
| `card` | `#ffffff` | Cards, sheets, dialogs |
| `hairline` | `#d2d2d7` | Separators inside cards |
| `muted` | `#6e6e73` | Captions, units, secondary text |
| `ink` | `#1d1d1f` | Text and measured numbers |
| `brand` | `#7a2ffc` | THE interactive colour: primary buttons, links, selected state, progress, focus ring |
| `success` | `#c6ff3d` | The green light; chips and fills with `ink` text, never text itself on white |
| `success-deep` | `#3d7c00` | The word beside the green light, on white |
| `warn` | `#b45309` | The orange light and anything to correct |
| `alarm` | `#b8102e` | The red light and real failure only |
| `band` | `#efe6ff` | Uncertainty bands and the "how sure" meter fill |

Rules. Violet means "you can act here" and nothing else: if it is violet, it
is tappable or it shows progress — so violet never decorates. The traffic
light colours mean states and nothing else. One screen carries at most the
violet, one state colour and the neutrals. Charts follow the Otwin chart
rules (model in violet with its band, measured in ink, thresholds labelled)
with bigger type and fewer ticks.

## Typography

Helvetica Neue, with the system stack as fallback
(`"Helvetica Neue", -apple-system, system-ui, Arial, sans-serif`). Sentence
case everywhere; capitals only in chips of one word. Weights 400, 600, 700 —
never 800, never letter-spaced uppercase headings.

| Style | Size/line | Weight | Use |
|---|---|---|---|
| Large title | 32/38 | 700 | One per page |
| Title | 22/28 | 700 | Card and section titles |
| Headline | 17/24 | 600 | Step names, emphasis |
| Body | 17/26 | 400 | Everything readable |
| Caption | 14/20 | 400, `muted` | Captions, units, legal |
| Figure | mono, 600 | — | Every number that gets compared, aligned right |

Body text is 17 px because the audience reads at arm's length and over
forty. Nothing interactive is written under 14 px.

## Shape, depth and touch

This is where Otwin Home deliberately departs from the instrument look of
the library. Radius: 12 px for cards and dialogs, 10 px for buttons and
inputs, 999 px for chips and the traffic lights. One shadow, used only by
floating surfaces (dialogs, menus): `0 8px 30px rgba(0,0,0,0.12)`; cards on
the page use `surface-raised` and hairlines instead, no shadow. A card's
border is the same on all four sides, always: coloured edges on one side of
a block are prohibited — a series or state is marked with a dot or a chip,
never with a margin. Spacing on
the 8 px grid; a screen breathes or it fails review. Every tappable target
is at least 44×44 px, with 8 px between targets. Focus is a 2 px `brand`
ring with 2 px offset, visible on every control.

## App anatomy

Four areas, and not one more: **Overview** (the answer: traffic light, money,
the home card), **Your records** (the bills and readings, step by step, and
the build), **Simulate** (the next twelve months and up to three changes),
**Help**. Settings is not an area: it is a sheet behind the gear, at the far
right of the top bar. Every screen belongs to exactly one area, and the
same thing never lives in two places.

The top bar is 56 px: the mark and the name on the left (tapping them goes
to the start), the engine state and the gear on the right, nothing else.
Below it, one line of orientation: back arrow + where you are. Content is a
single column on an 8 px grid: 680 px max for reading, 1040 px for the
overview; section spacing 32 px, card padding 20 px, page side padding
20 px. Every page ends in one primary button that names the next thing;
destructive actions confirm in a sheet that says what will be lost.

## Iconography

One family, the Otwin one: single-stroke line icons, round caps and joins,
2.4 stroke on a 24 px grid (the component icons of the library, scaled
down). The gear, the fuels (bolt, flame, drop), the thermometer, the
machines (fan, coil) are all drawn this way, never filled blobs, never two
styles on one screen. An icon is always beside its word, except the four
that need no word: back, close, settings, info.

## Illustration: the home card

The one illustration in the product, and its signature. A full-width ink
card (`#1d1d1f`, radius 18) carrying the householder's month: the house
drawn as a single continuous stroke in the loud green — roof first, eaves
overhanging, then the walls — with the fuels arriving on thin lines from
the left, the figures in white monospace, the bill on a raised panel, and
the green returning only on what matters: the conditioning energy and the
total. Nothing else in the app sits on ink, so this card is where the eye
lands. (The loud green lives here because ink is the only background that
gives it contrast, 16:1; on white it disappears. It also keeps the house
visibly ours — not the orange of other home apps.) The traffic light keeps
the state; the house itself is always green.

## Components

Radix UI primitives give the behaviour; this guide gives the look. Buttons:
primary is filled `brand` with white text; secondary is `surface-raised`
with `ink` text; destructive is text in `alarm`; one primary per screen.
Cards group one idea with a Title and at most one action. The traffic light
is three 28 px circles, the active one filled, with its word in
`success-deep`/`warn`/`alarm` beside it. The "how sure" meter is a three-segment
bar filled in `band` with a one-word label. Switches, sliders, selects,
progress and dialogs are the Radix parts styled to these tokens — behaviour
is never reimplemented by hand. A temperature is set the way every other
number is: the figure first, big and monospaced, over a violet track with a
round thumb — the same family as the sliders. No dials, no needles, no
blue-to-red gradients, anywhere. Chips ("estimated", "done", "optional") are
999 px pills, 12 px text: `brand` fill for estimated, `success` fill with
ink text for done.

## Motion

One curve (`ease-out`, 200 ms) for everything that appears or moves; 120 ms
for hovers. The engine's loading and the model build always show determinate
progress with a sentence of what is happening. `prefers-reduced-motion`
disables everything but opacity.

## Accessibility

Contrast AA minimum for all text (the tokens above pass on their stated
backgrounds — loud green is never text on white). Every control is reachable
by keyboard in reading order; every image and chart carries a sentence of
alt text; the language switch covers every string, including errors. Hit
areas, focus and motion as above.

## Voice

Plain declarative sentences a householder reads in seconds, in their own
language. The measured figure replaces the adjective. The app says what it
did, what it needs, and what the householder can do next — never what the
householder did wrong, and never a claim about itself.

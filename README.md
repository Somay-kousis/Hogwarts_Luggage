<div align="center">

```
███╗   ███╗██╗   ██╗ ██████╗  ██████╗ ██╗     ███████╗██████╗ ██████╗  ██████╗  ██████╗ ███████╗
████╗ ████║██║   ██║██╔════╝ ██╔════╝ ██║     ██╔════╝██╔══██╗██╔══██╗██╔═══██╗██╔═══██╗██╔════╝
██╔████╔██║██║   ██║██║  ███╗██║  ███╗██║     █████╗  ██████╔╝██████╔╝██║   ██║██║   ██║█████╗  
██║╚██╔╝██║██║   ██║██║   ██║██║   ██║██║     ██╔══╝  ██╔═══╝ ██╔══██╗██║   ██║██║   ██║██╔══╝  
██║ ╚═╝ ██║╚██████╔╝╚██████╔╝╚██████╔╝███████╗███████╗██║     ██║  ██║╚██████╔╝╚██████╔╝██║     
╚═╝     ╚═╝ ╚═════╝  ╚═════╝  ╚═════╝ ╚══════╝╚══════╝╚═╝     ╚═╝  ╚═╝ ╚═════╝  ╚═════╝╚═╝     
```

**More Than A Bag. It's Travelling Magic.**

[![HTML](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/HTML)
[![CSS](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/CSS)
[![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![Web Audio API](https://img.shields.io/badge/Web_Audio_API-9369d9?style=for-the-badge&logo=googlechrome&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API)

*A Hogwarts-inspired, enchanted luggage companion — my first-ever GitHub project.*

</div>

---

<div align="center">

```
  /\         *    .  *       .        *    .    *
 /  \    .       *      .        *          .
/----\       .      *       .     *    .         *
  ||     M U G G L E P R O O F   L U G G A G E
  ||   . *     .       *      .        *     .
```

</div>

---

## What Is This?

A multi-page, pure front-end web experience for a fictional Harry Potter-themed smart luggage brand called **MuggleProof Luggage**. Built with zero frameworks, zero build tools, and zero npm installs — just raw HTML, CSS, and vanilla JavaScript.

It was my first GitHub repository, so yes, the code is messy in places. But it has more magic packed into it than most first projects do.

---

## Pages

| Page | File | Description |
|------|------|-------------|
| Home | `index.html` | Login form with Alohomora spell animation |
| Features | `features.html` | Luggage dashboard with live Marauder's Map |
| Purchases | `purchases.html` | Shop page featuring interactive Dobby |
| Sorting Hat Quiz | `hat.html` | 5-question quiz that assigns your Hogwarts house |
| Contact | `contactus.html` | Owl Post dispatch form |

---

## Features

### The Marauder's Map Tracker
A live `<canvas>` animation renders a parchment-style map of Hogwarts corridors. Named characters (Harry Potter, Ron Weasley, Dumbledore) walk the hallways, leaving fading footprint trails. GPS refresh causes them to scatter and re-position.

### Audio Synthesis Engine
Powered entirely by the **Web Audio API** — no audio files, no external libraries. All sounds are synthesized from scratch:
- Brown noise filtered through a low-pass to simulate fireplace crackle
- A low sine-wave drone for ambient magical hum
- Arpeggio chimes for success states
- Dissonant sawtooth chords for validation errors
- A frequency-sweep wand swoosh for page transitions

### Alohomora Form Validation
Empty fields trigger a red glow border, a CSS shake animation, and a dissonant buzzer chord. Correct submission plays a C-major arpeggio and launches a wand-wipe page transition.

### House Sorting System
The quiz calculates your Hogwarts house from answer patterns and:
- Swaps the full-page background gradient to house colors
- Repigments UI buttons and active states
- Persists the result to `localStorage` across pages

### Spell Cursor Trail
A fullscreen transparent canvas overlays every page. Mouse movement and clicks spawn particle systems — gold, purple, parchment, and silver-blue sparks that drift upward and fade.

### Interactive Dobby
Click Dobby on the Purchases page for randomized House Elf dialogue, a wobble-and-jump animation, and chirping synthesized sounds.

### Enchanted Product Slots
Since no product images exist, the product grid uses CSS `radial-gradient` and `::after` pseudo-elements to create glowing velvet-and-magic-circle placeholders with pulsing text.

---

## How to Run

No build step. No package manager. No dependencies.

```bash
git clone https://github.com/your-username/muggleproof-luggage.git
cd muggleproof-luggage
open index.html
```

Or just double-click `index.html`. Turn your volume up.

---

## File Structure

```
muggleproof-luggage/
|
|-- index.html           # Homepage + login
|-- features.html        # Luggage control dashboard
|-- purchases.html       # Shop page
|-- hat.html             # Sorting Hat quiz
|-- contactus.html       # Contact form
|
|-- css/
|   |-- magic-common.css # Global animations, overlays, cursor trail
|   |-- homepage.css
|   |-- features.css
|   |-- purchases.css
|   |-- hat.css
|   |-- contactus.css
|
|-- magic-common.js      # Core engine: audio synth, transitions, spell trail
|-- homepage.js          # Login logic, floating card animations
|-- features.js          # Marauder's Map canvas, GPS mock, house themes
|-- purchase.js          # Dobby interactivity, cart counter, modal reveals
|-- quiz.js              # Quiz logic, house scoring, result rendering
|-- contact.js           # Form validation, owl post notification
```

---

## Technical Notes

**Web Audio API synthesis** — The fireplace ambient sound is built from a brown noise buffer (generated via a first-order IIR filter loop over white noise), passed through a low-pass biquad filter at 300Hz, with randomized gain ramps every 400ms to simulate crackle. Fire pops are short-lived triangle oscillators with bandpass filters. None of this required a single audio file.

**Canvas rendering** — The Marauder's Map runs at 60fps via `requestAnimationFrame`. Wall geometry is procedural. Character positions interpolate along fixed paths and reverse direction on reaching endpoints. Footprints are stamped with alpha values that decay each frame.

**No frameworks** — Everything is vanilla JavaScript ES6. No React, no Vue, no jQuery. DOM manipulation is all manual. This was intentional — learning the fundamentals first.

**localStorage persistence** — Selected Hogwarts house, follow-me toggle state, and audio mute preference persist across page navigations.

---

## Known Quirks

- The chevron slider navigation is visual-only — the "slides" it implies don't exist yet
- Product images are intentionally absent; the enchanted slots are the replacement
- The login form accepts any credentials (it's a front-end demo, no backend)
- Audio requires a user gesture to start (browser autoplay policy) — click anything

---

## What I Learned Building This

- Web Audio API is genuinely capable of complex synthesis without any audio files
- `requestAnimationFrame` canvas loops need careful cleanup to avoid memory leaks
- CSS `backdrop-filter: blur()` is expensive — use sparingly
- Page transitions via a fullscreen overlay div feel surprisingly cinematic
- `localStorage` is an easy way to persist state across pages without a backend
- First projects are supposed to be messy. Ship it anyway.

---

<div align="center">

```
                  .
                 /|\
                / | \       "I solemnly swear that I am up to no good."
               /  |  \
              /   |   \                      — The Marauder's Map
```

*Mischief Managed.*

</div>

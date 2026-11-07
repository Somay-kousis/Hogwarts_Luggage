<div align="center">

```
███╗   ███╗██╗   ██╗ ██████╗  ██████╗ ██╗     ███████╗██████╗ ██████╗  ██████╗  ██████╗ ███████╗
████╗ ████║██║   ██║██╔════╝ ██╔════╝ ██║     ██╔════╝██╔══██╗██╔══██╗██╔═══██╗██╔═══██╗██╔════╝
██╔████╔██║██║   ██║██║  ███╗██║  ███╗██║     █████╗  ██████╔╝██████╔╝██║   ██║██║   ██║█████╗  
██║╚██╔╝██║██║   ██║██║   ██║██║   ██║██║     ██╔══╝  ██╔═══╝ ██╔══██╗██║   ██║██║   ██║██╔══╝  
██║ ╚═╝ ██║╚██████╔╝╚██████╔╝╚██████╔╝███████╗███████╗██║     ██║  ██║╚██████╔╝╚██████╔╝██║     
╚═╝     ╚═╝ ╚═════╝  ╚═════╝  ╚═════╝ ╚══════╝╚══════╝╚═╝     ╚═╝  ╚═╝ ╚═════╝  ╚═════╝╚═╝     
```

<p align="center">
  <img src="https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white" alt="HTML" />
  <img src="https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white" alt="CSS" />
  <img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black" alt="JavaScript" />
</p>

*A Harry Potter themed shop for a made-up luggage brand. My first GitHub project.*

**Live:** https://somay-kousis.github.io/Hogwarts_Luggage/

</div>

---

## What is this?

A five-page front-end site for **MuggleProof Luggage**, a fictional magic luggage brand. Plain HTML, CSS and JavaScript: no framework, no build step, no npm.

It was my first repository, so the code is messy in places.

## Pages

| Page | File | What's on it |
|------|------|-------------|
| Home | `index.html` | Login form with an "Alohomora" animation |
| Features | `features.html` | Luggage dashboard with an animated Marauder's Map |
| Purchases | `purchases.html` | Shop page with a clickable Dobby |
| Sorting Hat Quiz | `hat.html` | 5 questions that pick your Hogwarts house |
| Contact | `contactus.html` | "Owl Post" contact form |

## Features

- **Marauder's Map.** A `<canvas>` map where Harry, Ron and Dumbledore walk the corridors and leave fading footprints.
- **Sound with no audio files.** Every sound is generated with the Web Audio API: a fireplace crackle (brown noise through a 300 Hz low-pass filter, gain changed every 400 ms), chimes on success, a harsh sawtooth chord on errors, a swoosh on page change.
- **Form validation.** Empty fields glow red, shake and buzz. A valid submit plays a C-major arpeggio.
- **House sorting.** The quiz result recolours the page and buttons in your house colours and is saved in `localStorage`, along with the mute setting and map toggle.
- **Cursor trail.** A full-page canvas spawns sparks wherever the mouse moves or clicks.
- **Dobby.** Click him for random lines, a jump animation and chirps.
- **Product slots.** There are no product photos, so the grid uses CSS gradients and pseudo-elements as glowing placeholders.

## Run it

```bash
git clone https://github.com/Somay-kousis/Hogwarts_Luggage.git
cd Hogwarts_Luggage
open index.html
```

Or double-click `index.html`. Sound is muted until you turn it on (browsers block autoplay).

## Files

```
index.html, features.html, purchases.html, hat.html, contactus.html
css/              one stylesheet per page + magic-common.css
magic-common.js   shared audio, page transitions, cursor trail
homepage.js       login logic
features.js       Marauder's Map, house themes
purchase.js       Dobby, cart counter
quiz.js           quiz and house scoring
contact.js        form validation
```

## Known quirks

- The chevron arrows look like a slider, but there are no slides behind them yet.
- The login accepts anything. There is no backend.

## What I learned

- The Web Audio API can make every sound a small site needs.
- `requestAnimationFrame` loops need cleanup or they leak.
- `backdrop-filter: blur()` is expensive.
- `localStorage` is enough to carry state between pages without a server.

<div align="center">

*Mischief Managed.*

</div>

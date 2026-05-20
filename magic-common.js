// Shared Magical Core Engine for MuggleProof Luggage

const magicPages = [
  "index.html",
  "features.html",
  "purchases.html",
  "hat.html",
  "contactus.html"
];

document.addEventListener("DOMContentLoaded", () => {
  // 1. Dynamic Page and Navigation Menu Standardization
  standardizeMenu();

  // 2. Inject Dynamic HTML Elements (Canvas, Wipe Overlay, Audio Toggle)
  injectMagicalElements();

  // 3. Initialize Spell Cursor Trail
  initSpellTrail();

  // 4. Initialize Web Audio Synthesizer
  initMagicalAudio();

  // 5. Hijack Clicks for Magical Transitions
  setupPageTransitions();

  // 6. Hook Hover sounds to interactive elements
  attachInteractiveSounds();
});

// =================== NAVIGATION STANDARDIZATION ===================
function standardizeMenu() {
  const nav = document.querySelector(".menu");
  if (!nav) return;

  const currentPath = window.location.pathname.split("/").pop() || "index.html";

  // Define standardized menu tabs
  const tabs = [
    { name: "Home", href: "index.html" },
    { name: "Features", href: "features.html" },
    { name: "Purchases", href: "purchases.html" },
    { name: "Sorting Hat", href: "hat.html" },
    { name: "Contact Us", href: "contactus.html" }
  ];

  // Re-render menu buttons consistently
  nav.innerHTML = "";
  tabs.forEach(tab => {
    const isCurrent = currentPath === tab.href;
    const box = document.createElement("div");
    box.className = `menuboxes${isCurrent ? " active" : ""}`;
    
    const link = document.createElement("a");
    link.href = tab.href;
    link.textContent = tab.name;
    
    box.appendChild(link);
    nav.appendChild(box);
  });
}

function standardizeCircles() {
  const currentPath = window.location.pathname.split("/").pop() || "index.html";
  let currentIndex = magicPages.indexOf(currentPath);
  if (currentIndex === -1) currentIndex = 0;

  // Manage Chevron Arrows
  const arrowLeft = document.querySelector(".arrow-left");
  const arrowRight = document.querySelector(".arrow-right");

  if (arrowLeft) {
    arrowLeft.replaceWith(arrowLeft.cloneNode(true)); // remove old listeners
    const newArrowLeft = document.querySelector(".arrow-left");
    newArrowLeft.addEventListener("click", () => {
      const prevIndex = (currentIndex - 1 + magicPages.length) % magicPages.length;
      playWandSweep();
      triggerWipeTransition(() => {
        window.location.href = magicPages[prevIndex];
      });
    });
  }

  if (arrowRight) {
    arrowRight.replaceWith(arrowRight.cloneNode(true)); // remove old listeners
    const newArrowRight = document.querySelector(".arrow-right");
    newArrowRight.addEventListener("click", () => {
      const nextIndex = (currentIndex + 1) % magicPages.length;
      playWandSweep();
      triggerWipeTransition(() => {
        window.location.href = magicPages[nextIndex];
      });
    });
  }

  // Manage Dots
  const circlesContainer = document.querySelector(".circles");
  if (circlesContainer) {
    circlesContainer.innerHTML = "";
    magicPages.forEach((page, index) => {
      const span = document.createElement("span");
      span.className = `dot${index === currentIndex ? " active" : ""}`;
      span.addEventListener("click", () => {
        if (index === currentIndex) return;
        playWandSweep();
        triggerWipeTransition(() => {
          window.location.href = page;
        });
      });
      circlesContainer.appendChild(span);
    });
  }
}

// =================== DYNAMIC ELEMENT INJECTION ===================
let magicGate;
function injectMagicalElements() {
  // Inject Canvas for Spell Trail
  if (!document.getElementById("magic-canvas")) {
    const canvas = document.createElement("canvas");
    canvas.id = "magic-canvas";
    document.body.appendChild(canvas);
  }

  // Inject Page Transition Gate
  if (!document.getElementById("magic-gate")) {
    magicGate = document.createElement("div");
    magicGate.id = "magic-gate";
    
    // Add glowing crest or title on the overlay
    const crest = document.createElement("h2");
    crest.style.fontFamily = "'Cinzel', serif";
    crest.style.color = "#deb887";
    crest.style.fontSize = "2.5rem";
    crest.style.animation = "goldenGlitter 2s infinite";
    crest.textContent = "✨ MuggleProof ✨";
    magicGate.appendChild(crest);
    
    // Add page transition overlay active class first to fade-in the page on load
    magicGate.classList.add("active");
    document.body.appendChild(magicGate);

    // Fade-in page (remove active class)
    setTimeout(() => {
      magicGate.classList.remove("active");
    }, 100);
  }

  // Set up dot slider navigation
  standardizeCircles();

  // Inject Ambient Glow Overlay
  if (!document.querySelector(".ambient-glow")) {
    const glow = document.createElement("div");
    glow.className = "ambient-glow";
    document.body.appendChild(glow);
  }

  // Inject Floating Sound Toggle Button
  if (!document.querySelector(".magic-sound-toggle")) {
    const toggle = document.createElement("div");
    toggle.className = "magic-sound-toggle";
    toggle.setAttribute("title", "Toggle Magic Ambient Sounds & SFX");
    
    const isMuted = localStorage.getItem("magicMuted") !== "false"; // Default to muted to avoid autoplay blocks
    if (isMuted) {
      toggle.classList.add("muted");
      toggle.innerHTML = "🪄🔇";
    } else {
      toggle.innerHTML = "🪄🔊";
    }
    
    document.body.appendChild(toggle);
    toggle.addEventListener("click", () => {
      toggleAudioMute();
    });
  }
}

// =================== SPELL CURSOR TRAIL ===================
function initSpellTrail() {
  const canvas = document.getElementById("magic-canvas");
  if (!canvas) return;
  const ctx = canvas.getContext("2d");
  
  let particles = [];
  
  function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  
  window.addEventListener("resize", resize);
  resize();

  class Particle {
    constructor(x, y) {
      this.x = x;
      this.y = y;
      this.size = Math.random() * 4 + 1.5;
      this.speedX = Math.random() * 2 - 1;
      this.speedY = Math.random() * -1.5 - 0.5; // Drift upwards
      this.color = this.getRandomColor();
      this.alpha = 1;
      this.decay = Math.random() * 0.02 + 0.015;
      this.wobble = Math.random() * 0.1;
      this.wobbleSpeed = Math.random() * 0.05 + 0.02;
      this.wobblePhase = Math.random() * Math.PI;
    }

    getRandomColor() {
      const colors = [
        "rgba(238, 186, 48, ", // Gold
        "rgba(147, 105, 217, ", // Purple
        "rgba(222, 184, 135, ", // Parchment
        "rgba(176, 224, 230, "  // Silver blue
      ];
      return colors[Math.floor(Math.random() * colors.length)];
    }

    update() {
      this.x += this.speedX + Math.sin(this.wobblePhase) * 0.5;
      this.y += this.speedY;
      this.alpha -= this.decay;
      this.wobblePhase += this.wobbleSpeed;
      if (this.size > 0.2) this.size -= 0.05;
    }

    draw() {
      ctx.save();
      ctx.globalAlpha = this.alpha;
      ctx.fillStyle = this.color + this.alpha + ")";
      ctx.shadowBlur = 10;
      ctx.shadowColor = this.color + "1)";
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    }
  }

  window.addEventListener("mousemove", (e) => {
    // Generate particles on mouse movement
    for (let i = 0; i < 2; i++) {
      particles.push(new Particle(e.clientX, e.clientY));
    }
  });

  window.addEventListener("click", (e) => {
    // Burst of particles on click
    for (let i = 0; i < 20; i++) {
      const p = new Particle(e.clientX, e.clientY);
      p.speedX = (Math.random() * 6 - 3);
      p.speedY = (Math.random() * 6 - 3);
      p.decay = Math.random() * 0.03 + 0.02;
      particles.push(p);
    }
  });

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let i = 0; i < particles.length; i++) {
      particles[i].update();
      particles[i].draw();
      if (particles[i].alpha <= 0 || particles[i].size <= 0.2) {
        particles.splice(i, 1);
        i--;
        }
    }
    requestAnimationFrame(animate);
  }
  animate();
}

// =================== WEB AUDIO SYNTHESIZER ===================
let audioCtx = null;
let fireNoiseNode = null;
let fireGainNode = null;
let ambientSynthGain = null;
let isAudioInitialized = false;

function initMagicalAudio() {
  const isMuted = localStorage.getItem("magicMuted") !== "false";
  if (!isMuted) {
    const triggerStart = () => {
      startAmbientAudio();
      window.removeEventListener("click", triggerStart);
      window.removeEventListener("keydown", triggerStart);
    };
    window.addEventListener("click", triggerStart);
    window.addEventListener("keydown", triggerStart);
  }
}

function startAmbientAudio() {
  if (isAudioInitialized) return;
  
  try {
    audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    
    // Create master gain control
    ambientSynthGain = audioCtx.createGain();
    ambientSynthGain.gain.setValueAtTime(0.08, audioCtx.currentTime); // keep ambient soft
    ambientSynthGain.connect(audioCtx.destination);

    // 1. Synthesize fire crackle
    createFireplaceSynth();

    // 2. Synthesize low drone chime hum
    createMagicalDrone();

    isAudioInitialized = true;
    console.log("Magical audio ambient engine synthesized successfully!");
  } catch (err) {
    console.warn("Failed to initialize Web Audio:", err);
  }
}

function stopAmbientAudio() {
  if (audioCtx) {
    audioCtx.close();
    audioCtx = null;
  }
  isAudioInitialized = false;
}

function toggleAudioMute() {
  const toggle = document.querySelector(".magic-sound-toggle");
  const isCurrentlyMuted = localStorage.getItem("magicMuted") !== "false";
  
  if (isCurrentlyMuted) {
    localStorage.setItem("magicMuted", "false");
    toggle.classList.remove("muted");
    toggle.innerHTML = "🪄🔊";
    playChime(440, "sine", 0.1);
    setTimeout(() => playChime(660, "sine", 0.15), 80);
    setTimeout(() => playChime(880, "sine", 0.2), 160);
    
    if (audioCtx && audioCtx.state === "suspended") {
      audioCtx.resume();
    }
    startAmbientAudio();
  } else {
    localStorage.setItem("magicMuted", "true");
    toggle.classList.add("muted");
    toggle.innerHTML = "🪄🔇";
    stopAmbientAudio();
  }
}

function createFireplaceSynth() {
  const bufferSize = audioCtx.sampleRate * 2;
  const noiseBuffer = audioCtx.createBuffer(1, bufferSize, audioCtx.sampleRate);
  const output = noiseBuffer.getChannelData(0);
  
  let lastOut = 0.0;
  for (let i = 0; i < bufferSize; i++) {
    const white = Math.random() * 2 - 1;
    output[i] = (lastOut + (0.02 * white)) / 1.02;
    lastOut = output[i];
    output[i] *= 3.5;
  }

  const noiseSource = audioCtx.createBufferSource();
  noiseSource.buffer = noiseBuffer;
  noiseSource.loop = true;

  const lowFilter = audioCtx.createBiquadFilter();
  lowFilter.type = "lowpass";
  lowFilter.frequency.setValueAtTime(300, audioCtx.currentTime);

  fireGainNode = audioCtx.createGain();
  fireGainNode.gain.setValueAtTime(0.3, audioCtx.currentTime);

  noiseSource.connect(lowFilter);
  lowFilter.connect(fireGainNode);
  fireGainNode.connect(ambientSynthGain);
  noiseSource.start(0);

  setInterval(() => {
    if (!audioCtx || !fireGainNode) return;
    const crackleVol = Math.random() * 0.4 + 0.15;
    fireGainNode.gain.linearRampToValueAtTime(crackleVol, audioCtx.currentTime + 0.3);
  }, 400);

  setInterval(() => {
    if (!audioCtx || localStorage.getItem("magicMuted") === "true") return;
    if (Math.random() < 0.45) {
      triggerFirePop();
    }
  }, 250);
}

function triggerFirePop() {
  const osc = audioCtx.createOscillator();
  const gain = audioCtx.createGain();
  const filter = audioCtx.createBiquadFilter();
  
  osc.type = "triangle";
  osc.frequency.setValueAtTime(Math.random() * 800 + 400, audioCtx.currentTime);
  
  filter.type = "bandpass";
  filter.frequency.setValueAtTime(1000, audioCtx.currentTime);
  filter.Q.setValueAtTime(3, audioCtx.currentTime);

  gain.gain.setValueAtTime(Math.random() * 0.15 + 0.05, audioCtx.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + Math.random() * 0.04 + 0.01);

  osc.connect(filter);
  filter.connect(gain);
  gain.connect(ambientSynthGain);
  
  osc.start();
  osc.stop(audioCtx.currentTime + 0.1);
}

function createMagicalDrone() {
  const osc1 = audioCtx.createOscillator();
  const osc2 = audioCtx.createOscillator();
  const droneGain = audioCtx.createGain();

  osc1.type = "sine";
  osc1.frequency.setValueAtTime(110, audioCtx.currentTime);

  osc2.type = "sine";
  osc2.frequency.setValueAtTime(165, audioCtx.currentTime);

  droneGain.gain.setValueAtTime(0.05, audioCtx.currentTime);

  osc1.connect(droneGain);
  osc2.connect(droneGain);
  droneGain.connect(ambientSynthGain);

  osc1.start(0);
  osc2.start(0);
}

function playChime(freq, type = "sine", duration = 0.3, volume = 0.15) {
  if (localStorage.getItem("magicMuted") === "true") return;
  
  if (!audioCtx) {
    try {
      audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    } catch(e) { return; }
  }
  
  if (audioCtx.state === "suspended") {
    audioCtx.resume();
  }

  const osc = audioCtx.createOscillator();
  const gainNode = audioCtx.createGain();
  
  osc.type = type;
  osc.frequency.setValueAtTime(freq, audioCtx.currentTime);
  
  gainNode.gain.setValueAtTime(volume, audioCtx.currentTime);
  gainNode.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + duration);
  
  osc.connect(gainNode);
  gainNode.connect(audioCtx.destination);
  
  osc.start();
  osc.stop(audioCtx.currentTime + duration + 0.05);
}

function playWandSweep() {
  if (localStorage.getItem("magicMuted") === "true") return;
  if (!audioCtx) return;

  const osc = audioCtx.createOscillator();
  const gainNode = audioCtx.createGain();
  
  osc.type = "sine";
  osc.frequency.setValueAtTime(300, audioCtx.currentTime);
  osc.frequency.exponentialRampToValueAtTime(1800, audioCtx.currentTime + 0.4);
  
  gainNode.gain.setValueAtTime(0.12, audioCtx.currentTime);
  gainNode.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.45);
  
  osc.connect(gainNode);
  gainNode.connect(audioCtx.destination);
  
  osc.start();
  osc.stop(audioCtx.currentTime + 0.5);
}

// =================== INTERACTIVE SOUND EFFECTS ===================
function attachInteractiveSounds() {
  const hoverElements = document.querySelectorAll(
    "button, .menuboxes, .social-link, .dot, .chevron img, .option label, .house-option"
  );
  
  hoverElements.forEach(el => {
    el.addEventListener("mouseenter", () => {
      playChime(Math.random() * 200 + 700, "triangle", 0.08, 0.03);
    });
  });
}

// =================== PAGE TRANSITIONS ===================
function setupPageTransitions() {
  const links = document.querySelectorAll("a, .menuboxes, .chevron img, .dot");
  
  links.forEach(link => {
    link.addEventListener("click", (e) => {
      let targetHref = "";
      
      if (link.tagName === "A") {
        targetHref = link.getAttribute("href");
      } else {
        const innerLink = link.querySelector("a");
        if (innerLink) {
          targetHref = innerLink.getAttribute("href");
        }
      }

      const isCustomLink = link.classList.contains("dot") || 
                           link.classList.contains("arrow-left") || 
                           link.classList.contains("arrow-right");

      if (isCustomLink) {
        playWandSweep();
        triggerWipeTransition();
        return;
      }

      if (!targetHref || targetHref === "#" || targetHref.startsWith("javascript:")) {
        return;
      }

      e.preventDefault();
      playWandSweep();

      triggerWipeTransition(() => {
        window.location.href = targetHref;
      });
    });
  });
}

function triggerWipeTransition(callback) {
  if (magicGate) {
    magicGate.classList.add("active");
    setTimeout(() => {
      if (callback) callback();
    }, 450);
  } else {
    if (callback) callback();
  }
}

window.MagicEngine = {
  playChime: playChime,
  playWandSweep: playWandSweep,
  triggerWipeTransition: triggerWipeTransition
};

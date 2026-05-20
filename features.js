// Features.js - MuggleProof Luggage Control System

let mapCanvas = null;
let mapCtx = null;
let footprints = [];
let mapWalls = [];
let mapLoop = null;
let characters = [];

document.addEventListener("DOMContentLoaded", function () {
  initializeApp();
  setupEventListeners();
});

// =================== INITIALIZATION ===================
function initializeApp() {
  updateGPSLocation(true); // silent on initial load
  updateWeightDisplay();
  displayRandomQuote();
  setupHouseSelection();
  checkSavedPreferences();
  initMaraudersMap();

  console.log("MuggleProof Luggage Control System initialized");
}

function checkSavedPreferences() {
  const savedHouse = localStorage.getItem("selectedHouse");
  if (savedHouse) {
    applyHouseTheme(savedHouse);
    highlightSelectedHouse(savedHouse);
  }

  const followMeState = localStorage.getItem("followMeEnabled");
  if (followMeState === "true") {
    const toggle = document.getElementById("followToggle");
    if (toggle) toggle.checked = true;
    updateFollowStatus(true);
  }
}

function setupEventListeners() {
  // GPS Location refresh button
  const refreshBtn = document.getElementById("refreshLocation");
  if (refreshBtn) {
    refreshBtn.addEventListener("click", () => {
      if (window.MagicEngine) window.MagicEngine.playChime(660, "sine", 0.25, 0.15);
      updateGPSLocation();
    });
  }

  // Follow Me toggle
  const followToggle = document.getElementById("followToggle");
  if (followToggle) {
    followToggle.addEventListener("change", function (e) {
      if (window.MagicEngine) {
        if (e.target.checked) {
          window.MagicEngine.playChime(587.33, "sine", 0.1, 0.12);
          setTimeout(() => window.MagicEngine.playChime(880, "sine", 0.3, 0.15), 80);
        } else {
          window.MagicEngine.playChime(440, "sine", 0.2, 0.1);
        }
      }
      updateFollowStatus(e.target.checked);
      localStorage.setItem("followMeEnabled", e.target.checked);
    });
  }

  // House selection
  document.querySelectorAll(".house-option").forEach((option) => {
    option.style.cursor = "pointer";
    option.addEventListener("click", function () {
      const house = this.getAttribute("data-house");
      if (window.MagicEngine) {
        // Play wand sweep and a chord fitting the house
        window.MagicEngine.playWandSweep();
        if (house === "gryffindor") setTimeout(() => window.MagicEngine.playChime(392, "triangle", 0.5, 0.15), 150);
        if (house === "slytherin") setTimeout(() => window.MagicEngine.playChime(329.6, "sawtooth", 0.5, 0.1), 150);
        if (house === "ravenclaw") setTimeout(() => window.MagicEngine.playChime(523.2, "sine", 0.5, 0.15), 150);
        if (house === "hufflepuff") setTimeout(() => window.MagicEngine.playChime(440, "sine", 0.5, 0.15), 150);
      }
      applyHouseTheme(house);
      localStorage.setItem("selectedHouse", house);
      highlightSelectedHouse(house);
    });
  });

  // New quote button
  const newQuoteBtn = document.getElementById("newQuote");
  if (newQuoteBtn) {
    newQuoteBtn.addEventListener("click", () => {
      if (window.MagicEngine) window.MagicEngine.playChime(784, "sine", 0.2, 0.12);
      displayRandomQuote();
    });
  }

  // Password update
  const updatePassBtn = document.getElementById("updatePassword");
  if (updatePassBtn) {
    updatePassBtn.addEventListener("click", updatePassword);
  }

  // Password reset
  const resetPassBtn = document.getElementById("resetPassword");
  if (resetPassBtn) {
    resetPassBtn.addEventListener("click", resetPassword);
  }

  // Sorting Hat
  const sortingHatBtn = document.getElementById("sortingHat");
  if (sortingHatBtn) {
    sortingHatBtn.addEventListener("click", consultSortingHat);
  }
}

// =================== GPS LOCATION FEATURE ===================
function updateGPSLocation(silent = false) {
  const locationCoords = document.getElementById("locationCoords");
  const gpsStatus = document.getElementById("gpsStatus");
  if (!locationCoords || !gpsStatus) return;

  gpsStatus.textContent = "Connecting...";
  gpsStatus.style.backgroundColor = "rgba(255, 165, 0, 0.35)";

  setTimeout(() => {
    const locations = [
      { lat: 51.5074, lng: -0.1278, name: "London (King's Cross)" },
      { lat: 57.0481, lng: -3.8522, name: "Scottish Highlands" },
      { lat: 55.9533, lng: -3.1883, name: "Edinburgh (Diagon Alley)" },
      { lat: 51.1789, lng: -1.8262, name: "Stonehenge" },
      { lat: 53.4808, lng: -2.2426, name: "Manchester" }
    ];

    const randomLocation = locations[Math.floor(Math.random() * locations.length)];

    gpsStatus.textContent = "Connected";
    gpsStatus.style.backgroundColor = "rgba(34, 139, 34, 0.4)";

    locationCoords.innerHTML = `Your luggage is in <strong>${randomLocation.name}</strong><br>
                                 Coordinates: ${randomLocation.lat.toFixed(4)}, ${randomLocation.lng.toFixed(4)}`;

    if (!silent && window.MagicEngine) {
      window.MagicEngine.playChime(880, "sine", 0.3, 0.15);
    }

    // Trigger map canvas ripple/scurry
    triggerMapGlitch();

    const mapContainer = document.getElementById("map");
    if (mapContainer) {
      mapContainer.style.transition = "transform 0.4s, filter 0.4s";
      mapContainer.style.transform = "scale(0.97)";
      mapContainer.style.filter = "brightness(1.3) saturate(1.2)";

      setTimeout(() => {
        mapContainer.style.transform = "scale(1)";
        mapContainer.style.filter = "brightness(1) saturate(1)";
      }, 400);
    }
  }, silent ? 100 : 1500);
}

// =================== MARAUDER'S MAP CANVAS DRAWING ===================
function initMaraudersMap() {
  mapCanvas = document.getElementById("maraudersMapCanvas");
  if (!mapCanvas) return;
  mapCtx = mapCanvas.getContext("2d");

  // Size correctly
  const rect = mapCanvas.getBoundingClientRect();
  mapCanvas.width = rect.width || 320;
  mapCanvas.height = rect.height || 200;

  const w = mapCanvas.width;
  const h = mapCanvas.height;

  // Build simulated corridors
  mapWalls = [
    {x1: 15, y1: 15, x2: w-15, y2: 15},
    {x1: w-15, y1: 15, x2: w-15, y2: h-15},
    {x1: w-15, y1: h-15, x2: 15, y2: h-15},
    {x1: 15, y1: h-15, x2: 15, y2: 15},

    // Horizontal hallways
    {x1: 15, y1: h/2 - 15, x2: w-15, y2: h/2 - 15},
    {x1: 15, y1: h/2 + 15, x2: w-15, y2: h/2 + 15},

    // Vertical hallway left
    {x1: w/3 - 15, y1: 15, x2: w/3 - 15, y2: h-15},
    {x1: w/3 + 15, y1: 15, x2: w/3 + 15, y2: h-15},

    // Vertical hallway right
    {x1: 2*w/3 - 15, y1: 15, x2: 2*w/3 - 15, y2: h-15},
    {x1: 2*w/3 + 15, y1: 15, x2: 2*w/3 + 15, y2: h-15},
  ];

  // Set up character paths
  characters = [
    { name: "Harry Potter", path: [{x: 25, y: h/2}, {x: w - 25, y: h/2}], progress: 0, speed: 0.4 },
    { name: "Ron Weasley", path: [{x: w/3, y: 25}, {x: w/3, y: h - 25}], progress: 0, speed: 0.35 },
    { name: "A. Dumbledore", path: [{x: 2*w/3, y: h - 25}, {x: 2*w/3, y: 25}], progress: 0, speed: 0.25 }
  ];

  if (mapLoop) cancelAnimationFrame(mapLoop);
  drawMap();
}

function triggerMapGlitch() {
  // Scramble character locations momentarily when GPS refreshes
  characters.forEach(char => {
    char.progress = Math.random() * 100;
  });
}

function drawMap() {
  if (!mapCtx || !mapCanvas) return;
  const w = mapCanvas.width;
  const h = mapCanvas.height;

  // 1. Clear & Draw Vintage Parchment background
  mapCtx.fillStyle = "#edd9be";
  mapCtx.fillRect(0, 0, w, h);

  // Subtle circular lines representing astronomical orbits/scroll rings
  mapCtx.strokeStyle = "rgba(139, 90, 43, 0.12)";
  mapCtx.lineWidth = 1;
  mapCtx.beginPath();
  mapCtx.arc(w/2, h/2, 40, 0, Math.PI * 2);
  mapCtx.arc(w/2, h/2, 80, 0, Math.PI * 2);
  mapCtx.stroke();

  // 2. Draw vintage architecture (corridor walls)
  mapCtx.strokeStyle = "rgba(90, 61, 38, 0.7)";
  mapCtx.lineWidth = 2;
  mapCtx.beginPath();
  mapWalls.forEach(wall => {
    mapCtx.moveTo(wall.x1, wall.y1);
    mapCtx.lineTo(wall.x2, wall.y2);
  });
  mapCtx.stroke();

  // 3. Draw compass grid
  mapCtx.save();
  mapCtx.strokeStyle = "rgba(90, 61, 38, 0.2)";
  mapCtx.lineWidth = 1;
  mapCtx.beginPath();
  mapCtx.moveTo(w/2, 15); mapCtx.lineTo(w/2, h-15);
  mapCtx.moveTo(15, h/2); mapCtx.lineTo(w-15, h/2);
  mapCtx.stroke();
  mapCtx.restore();

  // 4. Update and Draw Characters & footprints
  characters.forEach(char => {
    const start = char.path[0];
    const end = char.path[1];

    const dx = end.x - start.x;
    const dy = end.y - start.y;
    const dist = Math.sqrt(dx*dx + dy*dy);

    char.progress += char.speed;
    if (char.progress >= dist) {
      char.path = [end, start]; // turn around
      char.progress = 0;
    }

    const r = char.progress / dist;
    const curX = start.x + dx * r;
    const curY = start.y + dy * r;

    // Drop footprints periodically
    if (Math.floor(char.progress * 1.5) % 15 === 0) {
      footprints.push({
        x: curX,
        y: curY,
        angle: Math.atan2(dy, dx),
        alpha: 1.0,
        left: footprints.length % 2 === 0
      });
    }

    // Draw Character Name Banner
    mapCtx.save();
    mapCtx.font = "bold 9px 'Cinzel', serif";
    mapCtx.textAlign = "center";
    const textWidth = mapCtx.measureText(char.name).width;

    // Draw parchment paper tag
    mapCtx.fillStyle = "#ebd4b9";
    mapCtx.shadowColor = "rgba(0,0,0,0.15)";
    mapCtx.shadowBlur = 4;
    mapCtx.fillRect(curX - textWidth/2 - 4, curY - 18, textWidth + 8, 12);
    mapCtx.strokeStyle = "rgba(90, 61, 38, 0.5)";
    mapCtx.lineWidth = 1;
    mapCtx.strokeRect(curX - textWidth/2 - 4, curY - 18, textWidth + 8, 12);
    
    // Draw Name in blood-red ink
    mapCtx.fillStyle = "#740001";
    mapCtx.shadowColor = "transparent";
    mapCtx.fillText(char.name, curX, curY - 9);
    mapCtx.restore();
  });

  // Render footprints
  for (let i = 0; i < footprints.length; i++) {
    const fp = footprints[i];
    fp.alpha -= 0.004; // fade footprints
    if (fp.alpha <= 0) {
      footprints.splice(i, 1);
      i--;
      continue;
    }

    mapCtx.save();
    mapCtx.translate(fp.x, fp.y);
    mapCtx.rotate(fp.angle + Math.PI/2);
    mapCtx.fillStyle = `rgba(116, 0, 1, ${fp.alpha * 0.75})`;
    
    // Draw footprints slightly offset
    const offset = fp.left ? -2.5 : 2.5;
    mapCtx.font = "8px sans-serif";
    mapCtx.fillText("🐾", offset, 0);
    mapCtx.restore();
  }

  mapLoop = requestAnimationFrame(drawMap);
}

// =================== FOLLOW ME FEATURE ===================
function updateFollowStatus(isFollowing) {
  const followStatus = document.getElementById("followStatus");
  if (!followStatus) return;

  if (isFollowing) {
    followStatus.textContent = "Your luggage is now following you";
    followStatus.style.color = "#ebd4b9";
    followStatus.style.textShadow = "0 0 10px rgba(238, 186, 48, 0.6)";
    followStatus.style.animation = "pulse 2s infinite";
  } else {
    followStatus.textContent = "Your luggage is staying put";
    followStatus.style.color = "white";
    followStatus.style.textShadow = "none";
    followStatus.style.animation = "none";
  }
}

// =================== WEIGHT MONITOR FEATURE ===================
function updateWeightDisplay() {
  const weightFill = document.getElementById("weightFill");
  const weightValue = document.getElementById("weightValue");
  const weightStatus = document.getElementById("weightStatus");
  if (!weightFill || !weightValue || !weightStatus) return;

  const randomWeight = (Math.random() * 20 + 5).toFixed(1);
  const percentage = (randomWeight / 23) * 100;

  weightFill.style.width = `${Math.min(percentage, 100)}%`;
  weightValue.textContent = `${randomWeight} kg`;

  if (randomWeight > 23) {
    weightStatus.textContent = "Warning: Exceeds airline weight limit";
    weightFill.style.background = "linear-gradient(90deg, #740001, #ae0001)";
  } else if (randomWeight > 20) {
    weightStatus.textContent = "Approaching airline weight limit";
    weightFill.style.background = "linear-gradient(90deg, #ecb939, #eeba30)";
  } else if (randomWeight > 15) {
    weightStatus.textContent = "Weight within carry-on limits";
    weightFill.style.background = "linear-gradient(90deg, #1a472a, #2a623d)";
  } else {
    weightStatus.textContent = "Plenty of room for more items";
    weightFill.style.background = "linear-gradient(90deg, #3a1d6e, #9369d9)";
  }
}

// =================== HARRY POTTER QUOTES ===================
function displayRandomQuote() {
  const quotes = [
    { text: "It does not do to dwell on dreams and forget to live.", author: "Albus Dumbledore" },
    { text: "Happiness can be found, even in the darkest of times, if one only remembers to turn on the light.", author: "Albus Dumbledore" },
    { text: "It takes a great deal of bravery to stand up to our enemies, but just as much to stand up to our friends.", author: "Albus Dumbledore" },
    { text: "Fear of a name only increases fear of the thing itself.", author: "Hermione Granger" },
    { text: "It is our choices that show what we truly are, far more than our abilities.", author: "Albus Dumbledore" },
    { text: "I solemnly swear that I am up to no good.", author: "The Marauder's Map" },
    { text: "After all this time? Always.", author: "Severus Snape" },
    { text: "We've all got both light and dark inside us. What matters is the part we choose to act on.", author: "Sirius Black" },
    { text: "Just because you have the emotional range of a teaspoon doesn't mean we all have.", author: "Hermione Granger" },
    { text: "Mischief managed!", author: "Harry Potter" }
  ];

  const randomIndex = Math.floor(Math.random() * quotes.length);
  const quote = quotes[randomIndex];

  const qText = document.getElementById("quoteText");
  const qAuthor = document.getElementById("quoteAuthor");
  const quoteContainer = document.querySelector(".quote-container");

  if (!qText || !qAuthor || !quoteContainer) return;

  quoteContainer.style.opacity = 0;

  setTimeout(() => {
    qText.textContent = quote.text;
    qAuthor.textContent = `— ${quote.author}`;
    quoteContainer.style.transition = "opacity 0.6s";
    quoteContainer.style.opacity = 1;
  }, 200);
}

// =================== HOUSE SELECTION & THEMES ===================
function setupHouseSelection() {
  document.querySelectorAll(".house-option").forEach((option) => {
    option.style.cursor = "pointer";
  });
}

function applyHouseTheme(house) {
  document.body.classList.remove(
    "gryffindor-theme",
    "slytherin-theme",
    "ravenclaw-theme",
    "hufflepuff-theme"
  );

  document.body.classList.add(`${house}-theme`);
  updateUIForHouse(house);

  const main = document.querySelector("main");
  if (main) {
    main.style.transition = "transform 0.4s, opacity 0.4s";
    main.style.transform = "scale(0.99)";
    main.style.opacity = "0.9";

    setTimeout(() => {
      main.style.transform = "scale(1)";
      main.style.opacity = "1";
    }, 400);
  }
}

function updateUIForHouse(house) {
  const featureButtons = document.querySelectorAll(".feature-btn");
  const houseColors = {
    gryffindor: { primary: "#740001", secondary: "#ae0001", accent: "#eeba30" },
    slytherin: { primary: "#1a472a", secondary: "#2a623d", accent: "#aaaaaa" },
    ravenclaw: { primary: "#0e1a40", secondary: "#222f5b", accent: "#bebebe" },
    hufflepuff: { primary: "#ecb939", secondary: "#f0c75e", accent: "#726255" }
  };

  featureButtons.forEach((button) => {
    if (!button.classList.contains("btn-secondary") && !button.id.includes("reset")) {
      const colors = houseColors[house];
      if (colors) {
        button.style.background = `linear-gradient(135deg, ${colors.primary} 0%, ${colors.secondary} 100%)`;
      }
    }
  });

  const activeMenu = document.querySelector(".menuboxes.active");
  if (activeMenu && houseColors[house]) {
    activeMenu.style.backgroundColor = `rgba(${getRGBValues(houseColors[house].primary)}, 0.45)`;
    activeMenu.style.borderColor = `rgba(${getRGBValues(houseColors[house].accent)}, 0.7)`;
  }
}

function getRGBValues(hex) {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `${r}, ${g}, ${b}`;
}

function highlightSelectedHouse(house) {
  document.querySelectorAll(".house-option").forEach((option) => {
    option.classList.remove("active");
  });

  const targetOption = document.querySelector(`.house-option[data-house="${house}"]`);
  if (targetOption) targetOption.classList.add("active");
}

// =================== PASSWORD MANAGEMENT ===================
function updatePassword() {
  const currentPassword = document.getElementById("currentPassword").value;
  const newPassword = document.getElementById("newPassword").value;
  const confirmPassword = document.getElementById("confirmPassword").value;

  if (!currentPassword || !newPassword || !confirmPassword) {
    if (window.MagicEngine) window.MagicEngine.playChime(180, "sawtooth", 0.3, 0.1);
    showPasswordNotification("Please fill in all password fields", false);
    return;
  }

  if (newPassword !== confirmPassword) {
    if (window.MagicEngine) window.MagicEngine.playChime(180, "sawtooth", 0.3, 0.1);
    showPasswordNotification("New passwords do not match", false);
    return;
  }

  if (window.MagicEngine) {
    window.MagicEngine.playChime(523.25, "sine", 0.15, 0.1);
    setTimeout(() => window.MagicEngine.playChime(659.25, "sine", 0.2, 0.12), 80);
  }
  showPasswordNotification("Password updated successfully!", true);

  document.getElementById("currentPassword").value = "";
  document.getElementById("newPassword").value = "";
  document.getElementById("confirmPassword").value = "";
}

function resetPassword() {
  if (window.MagicEngine) {
    window.MagicEngine.playChime(392, "sine", 0.1, 0.1);
    setTimeout(() => window.MagicEngine.playChime(523.25, "sine", 0.25, 0.12), 100);
  }
  showPasswordNotification("Password reset instructions sent via Owl Post", true);
}

function showPasswordNotification(message, isSuccess) {
  let notification = document.getElementById("passwordNotification");
  if (!notification) {
    notification = document.createElement("div");
    notification.id = "passwordNotification";
    notification.style.padding = "10px 15px";
    notification.style.borderRadius = "8px";
    notification.style.marginTop = "15px";
    notification.style.textAlign = "center";
    notification.style.transition = "opacity 0.5s";

    const securitySection = document.querySelector(".feature-card:nth-child(2) .feature-content");
    if (securitySection) securitySection.appendChild(notification);
  }

  if (isSuccess) {
    notification.style.backgroundColor = "rgba(34, 139, 34, 0.25)";
    notification.style.border = "1px solid rgba(0, 255, 0, 0.4)";
    notification.style.color = "#ebd4b9";
  } else {
    notification.style.backgroundColor = "rgba(139, 0, 0, 0.25)";
    notification.style.border = "1px solid rgba(255, 0, 0, 0.4)";
    notification.style.color = "#ff8888";
  }

  notification.textContent = message;
  notification.style.opacity = "1";

  setTimeout(() => {
    notification.style.opacity = "0";
  }, 4000);
}

// =================== SORTING HAT CONVERSE ===================
function consultSortingHat() {
  const sortingResult = document.getElementById("sortingResult");
  if (!sortingResult) return;

  sortingResult.textContent = "The Sorting Hat is thinking...";
  sortingResult.className = "sorting-result active";

  if (window.MagicEngine) {
    // Play dark low-frequency rumble chime for sorting suspense
    window.MagicEngine.playChime(220, "triangle", 1.8, 0.1);
    window.MagicEngine.playChime(223, "triangle", 1.8, 0.1);
  }

  setTimeout(() => {
    const houses = ["gryffindor", "slytherin", "ravenclaw", "hufflepuff"];
    const randomHouse = houses[Math.floor(Math.random() * houses.length)];
    const houseNames = {
      gryffindor: "Gryffindor",
      slytherin: "Slytherin",
      ravenclaw: "Ravenclaw",
      hufflepuff: "Hufflepuff",
    };

    sortingResult.textContent = `The Sorting Hat has decided: ${houseNames[randomHouse]}!`;
    sortingResult.className = `sorting-result active ${randomHouse}`;

    // Apply the house theme automatically
    applyHouseTheme(randomHouse);
    highlightSelectedHouse(randomHouse);
    localStorage.setItem("selectedHouse", randomHouse);

    if (window.MagicEngine) {
      // Play a high, sparkling, triumphant arpeggio chime!
      window.MagicEngine.playChime(523.25, "sine", 0.1, 0.12); // C5
      setTimeout(() => window.MagicEngine.playChime(659.25, "sine", 0.1, 0.14), 70); // E5
      setTimeout(() => window.MagicEngine.playChime(783.99, "sine", 0.1, 0.16), 140); // G5
      setTimeout(() => window.MagicEngine.playChime(1046.50, "sine", 0.35, 0.2), 210); // C6
    }

    const sortingHatBtn = document.getElementById("sortingHat");
    if (sortingHatBtn) {
      sortingHatBtn.classList.add("inactive");
      sortingHatBtn.textContent = "Sorted!";
    }

    setTimeout(() => {
      if (sortingHatBtn) {
        sortingHatBtn.classList.remove("inactive");
        sortingHatBtn.textContent = "Consult the Sorting Hat";
      }
    }, 4000);
  }, 1800);
}

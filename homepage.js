// Homepage Magical Interactivity

document.addEventListener("DOMContentLoaded", () => {
  initAlohomoraForm();
  initLuggageFloating();
});

// =================== ALOHOMORA FORM LOCKING ===================
function initAlohomoraForm() {
  const alohomoraButton = document.querySelector(".login_btn");
  const loginCard = document.querySelector(".login_card");
  const usernameInput = document.getElementById("Username");
  const passwordInput = document.getElementById("Password");

  if (!alohomoraButton || !loginCard) return;

  alohomoraButton.addEventListener("click", (e) => {
    e.preventDefault();

    const username = usernameInput ? usernameInput.value.trim() : "";
    const password = passwordInput ? passwordInput.value.trim() : "";

    // 1. Validation Check
    if (!username || !password) {
      // Play low dissonant buzzer chord
      if (window.MagicEngine) {
        window.MagicEngine.playChime(150, "sawtooth", 0.3, 0.15);
        window.MagicEngine.playChime(155, "sawtooth", 0.3, 0.15);
      }

      // Add Red Glow Border and Shake Card
      loginCard.style.boxShadow = "0 0 25px rgba(255, 0, 0, 0.4)";
      loginCard.style.borderColor = "rgba(255, 0, 0, 0.6)";
      loginCard.classList.add("spell-shake");

      // Reset styles after animation completes
      setTimeout(() => {
        loginCard.classList.remove("spell-shake");
      }, 500);

      // Flash empty fields
      if (!username && usernameInput) {
        usernameInput.style.borderColor = "rgba(255, 0, 0, 0.5)";
        setTimeout(() => usernameInput.style.borderColor = "", 1500);
      }
      if (!password && passwordInput) {
        passwordInput.style.borderColor = "rgba(255, 0, 0, 0.5)";
        setTimeout(() => passwordInput.style.borderColor = "", 1500);
      }
      return;
    }

    // 2. Successful Login Spell
    if (window.MagicEngine) {
      // Arpeggiated Major Chord (C major) for success!
      window.MagicEngine.playChime(261.63, "sine", 0.15, 0.1); // C4
      setTimeout(() => window.MagicEngine.playChime(329.63, "sine", 0.15, 0.12), 60); // E4
      setTimeout(() => window.MagicEngine.playChime(392.00, "sine", 0.15, 0.14), 120); // G4
      setTimeout(() => window.MagicEngine.playChime(523.25, "sine", 0.25, 0.18), 180); // C5
      
      // Dynamic Sparkle Burst in JavaScript coordinates
      const rect = alohomoraButton.getBoundingClientRect();
      const clickEvent = new MouseEvent("click", {
        clientX: rect.left + rect.width / 2,
        clientY: rect.top + rect.height / 2
      });
      window.dispatchEvent(clickEvent);
    }

    // Golden glow flash
    loginCard.style.boxShadow = "0 0 40px rgba(238, 186, 48, 0.8)";
    loginCard.style.borderColor = "#eeba30";

    // Trigger Wipe Transition and Navigate to Quiz after delay
    setTimeout(() => {
      if (window.MagicEngine) {
        window.MagicEngine.triggerWipeTransition(() => {
          window.location.href = "hat.html";
        });
      } else {
        window.location.href = "hat.html";
      }
    }, 400);
  });
}

// =================== FLOATING SVG LUGGAGE ===================
function initLuggageFloating() {
  // Animate elements inside the interactive SVGs (e.g. circles, dials)
  const features = document.querySelectorAll(".feature-card");
  
  features.forEach((card, index) => {
    // Add slow float keyframes animation
    card.style.animation = `magicFloat ${5 + index}s ease-in-out infinite`;
    
    // Add hover listener to rotate mechanical dials inside SVG if any
    card.addEventListener("mouseenter", () => {
      const dials = card.querySelectorAll("circle, rect, path");
      dials.forEach(dial => {
        // Find center of dials and rotate them slightly
        dial.style.transition = "transform 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275)";
        dial.style.transformOrigin = "center";
        dial.style.transform = `rotate(${Math.random() * 360}deg)`;
      });
    });
  });
}

// Contact Us Page Magical Interactivity

document.addEventListener("DOMContentLoaded", () => {
  initContactForm();
});

function initContactForm() {
  const formElement = document.querySelector(".form");
  const submitBtn = document.querySelector(".submit_btn");
  const nameInput = document.getElementById("name");
  const emailInput = document.getElementById("email");
  const subjectInput = document.getElementById("subject");
  const messageInput = document.getElementById("message");

  if (!formElement || !submitBtn) return;

  submitBtn.addEventListener("click", (e) => {
    e.preventDefault();

    const name = nameInput ? nameInput.value.trim() : "";
    const email = emailInput ? emailInput.value.trim() : "";
    const subject = subjectInput ? subjectInput.value.trim() : "";
    const message = messageInput ? messageInput.value.trim() : "";

    // 1. Validation check
    if (!name || !email || !message) {
      // Play low dissonant buzzer chord
      if (window.MagicEngine) {
        window.MagicEngine.playChime(150, "sawtooth", 0.3, 0.15);
        window.MagicEngine.playChime(155, "sawtooth", 0.3, 0.15);
      }

      // Add Red Glow Border and Shake Form Card
      formElement.style.boxShadow = "0 0 25px rgba(255, 0, 0, 0.4)";
      formElement.style.borderColor = "rgba(255, 0, 0, 0.6)";
      formElement.classList.add("spell-shake");

      // Reset styles after animation completes
      setTimeout(() => {
        formElement.classList.remove("spell-shake");
      }, 500);

      // Highlight empty inputs
      if (!name && nameInput) nameInput.style.borderColor = "rgba(255, 0, 0, 0.5)";
      if (!email && emailInput) emailInput.style.borderColor = "rgba(255, 0, 0, 0.5)";
      if (!message && messageInput) messageInput.style.borderColor = "rgba(255, 0, 0, 0.5)";

      // Reset input highlights after 1.5s
      setTimeout(() => {
        if (nameInput) nameInput.style.borderColor = "";
        if (emailInput) emailInput.style.borderColor = "";
        if (messageInput) messageInput.style.borderColor = "";
      }, 1500);

      return;
    }

    // 2. Successful owl post dispatch spell
    if (window.MagicEngine) {
      window.MagicEngine.playWandSweep();
      // Arpeggiated C major sweep
      setTimeout(() => window.MagicEngine.playChime(261.63, "sine", 0.15, 0.1), 100);
      setTimeout(() => window.MagicEngine.playChime(329.63, "sine", 0.15, 0.12), 160);
      setTimeout(() => window.MagicEngine.playChime(392.00, "sine", 0.15, 0.14), 220);
      setTimeout(() => window.MagicEngine.playChime(523.25, "sine", 0.25, 0.18), 280);

      // Dynamic Sparkle Burst in JavaScript coordinates
      const rect = submitBtn.getBoundingClientRect();
      const clickEvent = new MouseEvent("click", {
        clientX: rect.left + rect.width / 2,
        clientY: rect.top + rect.height / 2
      });
      window.dispatchEvent(clickEvent);
    }

    // Golden glow flash
    formElement.style.boxShadow = "0 0 40px rgba(238, 186, 48, 0.8)";
    formElement.style.borderColor = "#eeba30";

    // Show owl post banner
    showOwlNotification();

    // Clear the inputs
    if (nameInput) nameInput.value = "";
    if (emailInput) emailInput.value = "";
    if (subjectInput) subjectInput.value = "";
    if (messageInput) messageInput.value = "";

    // Reset glow border after delay
    setTimeout(() => {
      formElement.style.boxShadow = "";
      formElement.style.borderColor = "";
    }, 3000);
  });
}

function showOwlNotification() {
  let notification = document.getElementById("owlNotification");
  if (!notification) {
    notification = document.createElement("div");
    notification.id = "owlNotification";
    notification.style.position = "fixed";
    notification.style.bottom = "2rem";
    notification.style.right = "2rem";
    notification.style.padding = "1rem 2rem";
    notification.style.background = "radial-gradient(circle at center, #ebd4b9 0%, #dbb88d 100%)";
    notification.style.border = "3px double #8b0000";
    notification.style.borderRadius = "8px";
    notification.style.color = "#3b2306";
    notification.style.fontFamily = "Cinzel, serif";
    notification.style.fontSize = "1rem";
    notification.style.boxShadow = "0 8px 24px rgba(0,0,0,0.5)";
    notification.style.zIndex = "100000";
    notification.style.transition = "opacity 0.5s ease, transform 0.5s ease";
    notification.style.transform = "translateY(20px)";
    notification.style.opacity = "0";
    document.body.appendChild(notification);
  }

  notification.innerHTML = `✉️ Message sealed & dispatched via Owl Post!`;
  
  // Slide in
  setTimeout(() => {
    notification.style.transform = "translateY(0)";
    notification.style.opacity = "1";
  }, 50);

  // Fade out
  setTimeout(() => {
    notification.style.transform = "translateY(20px)";
    notification.style.opacity = "0";
  }, 4000);
}

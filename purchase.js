// Purchases / Shop Page Magical Interactivity

document.addEventListener("DOMContentLoaded", () => {
  initDobbyInteractivity();
  initCartAndReveal();
});

// =================== INTERACTIVE DOBBY THE HOUSE ELF ===================
const dobbyQuotes = [
  "Dobby is a free elf, but Dobby is happy to help Master pack!",
  "Master must be careful, dark wizards are always after fine suitcases!",
  "Alohomora-proof locks are very good, sir! No sneaky thieves!",
  "Dobby sorted your socks! The left ones are now in the vanishing cubes!",
  "A suitcase! Master is too kind, too generous to Dobby...",
  "Dobby will guard Master's luggage with his life! Yes, sir!"
];

function initDobbyInteractivity() {
  const dobbyImg = document.querySelector(".dobby-img");
  const dobbyCaption = document.querySelector(".dobby-caption");

  if (!dobbyImg || !dobbyCaption) return;

  // Make Dobby clickable
  dobbyImg.style.cursor = "pointer";
  dobbyImg.style.transition = "transform 0.5s ease";

  dobbyImg.addEventListener("click", () => {
    // 1. Play cute elf chirping sounds
    if (window.MagicEngine) {
      window.MagicEngine.playChime(880, "sine", 0.08, 0.12);
      setTimeout(() => window.MagicEngine.playChime(1100, "sine", 0.12, 0.1), 60);
    }

    // 2. Animate Dobby (wobble and jump)
    dobbyImg.style.transform = "scale(1.15) rotate(15deg) translateY(-10px)";
    setTimeout(() => {
      dobbyImg.style.transform = "scale(1) rotate(0deg) translateY(0px)";
    }, 400);

    // 3. Swap Quote
    const randomQuote = dobbyQuotes[Math.floor(Math.random() * dobbyQuotes.length)];
    dobbyCaption.style.opacity = 0;
    setTimeout(() => {
      dobbyCaption.textContent = randomQuote;
      dobbyCaption.style.transition = "opacity 0.4s";
      dobbyCaption.style.opacity = 1;
    }, 150);
  });
}

// =================== CART INCREMENT & LUGGAGE MANIFEST REVEAL ===================
let cartCount = 0;

function initCartAndReveal() {
  const addToCartButtons = document.querySelectorAll(".add-to-cart, .accessory-button");
  const dobbyImg = document.querySelector(".dobby-img");
  const dobbyCaption = document.querySelector(".dobby-caption");

  // Create simple cart counter in header if not present
  let cartBadge = document.querySelector(".cart-badge");
  if (!cartBadge) {
    const nav = document.querySelector(".menu");
    if (nav) {
      const cartWrapper = document.createElement("div");
      cartWrapper.className = "menuboxes cart-box";
      cartWrapper.style.cursor = "pointer";
      cartWrapper.innerHTML = `🛒 Cart (<span class="cart-badge">0</span>)`;
      nav.appendChild(cartWrapper);
      cartBadge = cartWrapper.querySelector(".cart-badge");
    }
  }

  addToCartButtons.forEach(btn => {
    btn.addEventListener("click", (e) => {
      e.stopPropagation(); // prevent triggering card clicks
      
      cartCount++;
      if (cartBadge) {
        cartBadge.textContent = cartCount;
        cartBadge.parentElement.style.animation = "spellShake 0.4s ease";
        setTimeout(() => {
          cartBadge.parentElement.style.animation = "";
        }, 400);
      }

      // Play success arpeggio
      if (window.MagicEngine) {
        window.MagicEngine.playChime(523.25, "sine", 0.1, 0.1); // C5
        setTimeout(() => window.MagicEngine.playChime(659.25, "sine", 0.1, 0.1), 50); // E5
        setTimeout(() => window.MagicEngine.playChime(783.99, "sine", 0.2, 0.12), 100); // G5
      }

      // Make Dobby react!
      if (dobbyImg && dobbyCaption) {
        dobbyImg.style.transform = "scale(1.2) rotate(-10deg) translateY(-15px)";
        dobbyCaption.textContent = "Oh! Master bought something! Dobby is so excited!";
        setTimeout(() => {
          dobbyImg.style.transform = "scale(1) rotate(0) translateY(0)";
        }, 500);
      }

      // Add a little floating particle from button
      createFloatingSpark(e.clientX, e.clientY);
    });
  });

  // Setup Manifest Modal on Product Card Click
  const productCards = document.querySelectorAll(".product-card");
  productCards.forEach(card => {
    // Add clickable styling
    card.style.cursor = "pointer";
    
    card.addEventListener("click", () => {
      const name = card.querySelector(".product-name").textContent;
      showManifestModal(name);
    });
  });
}

function createFloatingSpark(x, y) {
  const spark = document.createElement("div");
  spark.className = "floating-spark";
  spark.textContent = "✨";
  spark.style.position = "fixed";
  spark.style.left = `${x}px`;
  spark.style.top = `${y}px`;
  spark.style.fontSize = "1.5rem";
  spark.style.pointerEvents = "none";
  spark.style.transition = "transform 0.8s ease-out, opacity 0.8s ease-out";
  spark.style.zIndex = "10000";
  document.body.appendChild(spark);

  // Target cart position
  const cartBox = document.querySelector(".cart-box");
  let targetX = window.innerWidth - 100;
  let targetY = 80;
  if (cartBox) {
    const rect = cartBox.getBoundingClientRect();
    targetX = rect.left + rect.width / 2;
    targetY = rect.top + rect.height / 2;
  }

  setTimeout(() => {
    spark.style.transform = `translate(${targetX - x}px, ${targetY - y}px) scale(0.5)`;
    spark.style.opacity = "0";
  }, 20);

  setTimeout(() => {
    spark.remove();
  }, 850);
}

// =================== MANIFEST PARCHMENT MODAL ===================
const manifests = {
  "Hogwarts Express Trunk": [
    "1x Pewter Cauldron (Standard Size 2)",
    "1x Set of Fine Brass Scales",
    "1x Collapsible Brass Telescope",
    "3x Hogwarts Black Work Robes (Self-fitting)",
    "1x Wand Sleeve (Lined with dragon heartstring velvet)"
  ],
  "Ravenclaw Carry-On": [
    "1x Advanced Potion-Making Textbook (Annotated)",
    "1x Self-Inking Eagle Feather Quill",
    "2x Bottles of Midnight Blue Writing Ink",
    "1x Replica Diadem Compartment",
    "1x Pocket Sneakoscope"
  ],
  "Gryffindor Adventure Set": [
    "1x Concealed compartment fitting a replica sword",
    "1x Enchanted Wool Scarf (Gryffindor Colors)",
    "1x Remembrall pocket",
    "1x Box of Bertie Bott's Every Flavour Beans (Secret slot)",
    "1x Golden Snitch pouch"
  ]
};

function showManifestModal(productName) {
  const manifestList = manifests[productName];
  if (!manifestList) return;

  if (window.MagicEngine) {
    window.MagicEngine.playChime(600, "sine", 0.4, 0.1);
  }

  // Create Modal element
  const modal = document.createElement("div");
  modal.className = "magic-modal";
  modal.innerHTML = `
    <div class="magic-modal-content">
      <span class="magic-modal-close">&times;</span>
      <h2 class="modal-title">✨ Luggage Manifest ✨</h2>
      <h3 class="modal-product-name">${productName}</h3>
      <p class="modal-intro">Each enchanted trunk comes pre-packed with the following essentials:</p>
      <ul class="manifest-list">
        ${manifestList.map(item => `<li>📜 ${item}</li>`).join("")}
      </ul>
      <p class="modal-footer">"Mischief Managed"</p>
    </div>
  `;
  document.body.appendChild(modal);

  // Close handlers
  const closeBtn = modal.querySelector(".magic-modal-close");
  closeBtn.addEventListener("click", () => {
    closeModal(modal);
  });

  modal.addEventListener("click", (e) => {
    if (e.target === modal) closeModal(modal);
  });
}

function closeModal(modal) {
  if (window.MagicEngine) {
    window.MagicEngine.playChime(400, "sine", 0.15, 0.05);
  }
  modal.style.opacity = 0;
  setTimeout(() => {
    modal.remove();
  }, 300);
}

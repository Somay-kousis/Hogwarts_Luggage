// quiz.js - Magical Luggage Sorting Quiz

document.addEventListener("DOMContentLoaded", function () {
  // Quiz data
  const quizData = [
    {
      question: "When packing for a journey, which approach describes you best?",
      options: [
        "I plan everything meticulously weeks in advance",
        "I pack light and only bring essentials",
        "I bring everything I might possibly need, just in case",
        "I usually pack at the last minute but somehow make it work"
      ]
    },
    {
      question: "What's most important to you in luggage?",
      options: [
        "Durability and protection for my belongings",
        "Lightweight and easy to carry around",
        "Maximum storage space and organization",
        "Style and unique appearance"
      ]
    },
    {
      question: "When faced with a travel challenge, you typically:",
      options: [
        "Research thoroughly and prepare for all possibilities",
        "Adapt quickly and find creative solutions",
        "Rely on having packed the right tools for any situation",
        "Ask locals or fellow travelers for advice"
      ]
    },
    {
      question: "Your ideal travel destination would be:",
      options: [
        "A historical city with museums and cultural landmarks",
        "An outdoor adventure in nature",
        "A comfortable resort with amenities",
        "An unexplored location off the beaten path"
      ]
    },
    {
      question: "Which magical feature would you most value in your luggage?",
      options: [
        "Anti-theft protection and security spells",
        "Self-lightening charm that makes it weightless",
        "Undetectable extension charm for unlimited space",
        "Self-navigation to always find its way back to you"
      ]
    }
  ];

  // Luggage personalities with their descriptions and house associations
  const luggageTypes = [
    {
      name: "The Sentinel Trunk",
      house: "slytherin",
      description: "Protected by powerful guardian charms, this trunk is perfect for the meticulous planner who values security and organization above all. Its reinforced structure and magical locks keep your belongings safe in any circumstance.",
    },
    {
      name: "The Nomad Backpack",
      house: "gryffindor",
      description: "Lightweight and adaptable, this enchanted backpack is ideal for the minimalist traveler. With terrain-adjusting straps and weather-resistant fabrics, it's the perfect companion for any adventure.",
    },
    {
      name: "The Cornucopia Case",
      house: "hufflepuff",
      description: "Featuring an undetectable extension charm, this deceptively spacious case is for those who like to be prepared for anything. Multiple compartments organize your belongings while maintaining a reasonable exterior size.",
    },
    {
      name: "The Pathfinder Satchel",
      house: "ravenclaw",
      description: "This intuitive satchel seems to anticipate your needs before you do. With a knack for rearranging its contents to bring forward exactly what you're looking for, it's perfect for the spontaneous traveler.",
    }
  ];

  // Store DOM elements
  const quizContainer = document.querySelector(".quiz-container");

  // Show initial options
  function showInitialOptions() {
    const initialOptionsHTML = `
      <div class="welcome-container">
        <h2 class="welcome-title">Magical Luggage Sorting Companion</h2>
        <p class="welcome-description">What would you like to do today, wizard traveler?</p>
        
        <div class="initial-options-container">
          <button class="option-btn find-new-btn">
            <span class="option-icon">🧳</span>
            <span class="option-label">Consult the Sorting Quiz</span>
            <p class="option-description">Take our magical quiz to discover which enchanted luggage matches your travel personality</p>
          </button>
          
          <button class="option-btn view-features-btn">
            <span class="option-icon">✨</span>
            <span class="option-label">Control Suitcase Features</span>
            <p class="option-description">Manage and explore the features of your existing active luggage</p>
          </button>
        </div>
      </div>
    `;

    quizContainer.innerHTML = initialOptionsHTML;

    // Add event listeners
    document.querySelector(".find-new-btn").addEventListener("click", () => {
      if (window.MagicEngine) window.MagicEngine.playChime(660, "sine", 0.2, 0.15);
      startQuiz();
    });

    document.querySelector(".view-features-btn").addEventListener("click", () => {
      if (window.MagicEngine) {
        window.MagicEngine.playWandSweep();
        window.MagicEngine.triggerWipeTransition(() => {
          window.location.href = "features.html";
        });
      } else {
        window.location.href = "features.html";
      }
    });

    // Apply custom styles
    addInitialStyles();
  }

  // Start the quiz
  function startQuiz() {
    setupQuizInterface();
    loadQuestion();
    updateProgress();

    document.querySelector(".prev-btn").addEventListener("click", () => {
      if (window.MagicEngine) window.MagicEngine.playChime(440, "sine", 0.15, 0.1);
      goToPrevQuestion();
    });

    document.querySelector(".next-btn").addEventListener("click", () => {
      if (window.MagicEngine) window.MagicEngine.playChime(587.33, "sine", 0.15, 0.1);
      goToNextQuestion();
    });
  }

  // Set up the quiz interface
  function setupQuizInterface() {
    const quizInterfaceHTML = `
      <div class="sorting-hat">
        <div class="hat-image">
          <img src="sorting.png" alt="Sorting Hat" class="spinning-hat" />
        </div>
        <h2 class="sorting-title">The Luggage Sorting Quiz</h2>
        <p class="sorting-subtitle">
          Answer honestly, and let the Sorting Hat match your character...
        </p>
      </div>
      
      <div class="quiz-header">
        <div class="progress-container">
          <div class="progress"></div>
        </div>
        <div class="progress-text">Question 1/5</div>
      </div>
      <div class="question-container">
        <h2 class="question-text"></h2>
        <div class="options-container"></div>
      </div>
      <div class="navigation">
        <button class="quiz-btn prev-btn" disabled>Previous</button>
        <button class="quiz-btn next-btn" disabled>Next Question</button>
      </div>
    `;

    quizContainer.innerHTML = quizInterfaceHTML;
    attachInteractiveSounds(); // Hook hover noises to new buttons
  }

  // Store state variables
  let currentQuestion = 0;
  let selectedAnswers = [];

  // Load question and options
  function loadQuestion() {
    const currentQuizData = quizData[currentQuestion];
    const questionText = document.querySelector(".question-text");
    const optionsContainer = document.querySelector(".options-container");

    questionText.textContent = currentQuizData.question;
    optionsContainer.innerHTML = "";

    currentQuizData.options.forEach((option, index) => {
      const isChecked = selectedAnswers[currentQuestion] === index ? "checked" : "";

      const optionHTML = `
        <div class="option">
          <input type="radio" name="question${currentQuestion}" id="option${index}" ${isChecked} />
          <label for="option${index}">
            <span class="checkmark"></span>
            <span class="option-text">${option}</span>
          </label>
        </div>
      `;

      optionsContainer.insertAdjacentHTML("beforeend", optionHTML);
    });

    // Add event listeners to options
    document.querySelectorAll(`input[name="question${currentQuestion}"]`).forEach((input, index) => {
      input.addEventListener("change", () => {
        if (window.MagicEngine) window.MagicEngine.playChime(784, "sine", 0.06, 0.08);
        selectedAnswers[currentQuestion] = index;
        updateButtonStates();
      });
    });

    updateButtonStates();
    attachInteractiveSounds();
  }

  // Update progress bar and text
  function updateProgress() {
    const progressBar = document.querySelector(".progress");
    const progressText = document.querySelector(".progress-text");
    const progressPercentage = ((currentQuestion + 1) / quizData.length) * 100;

    if (progressBar) progressBar.style.width = `${progressPercentage}%`;
    if (progressText) progressText.textContent = `Question ${currentQuestion + 1}/${quizData.length}`;
  }

  // Update button states
  function updateButtonStates() {
    const prevBtn = document.querySelector(".prev-btn");
    const nextBtn = document.querySelector(".next-btn");

    if (prevBtn) prevBtn.disabled = currentQuestion === 0;

    if (nextBtn) {
      if (currentQuestion === quizData.length - 1) {
        nextBtn.textContent = "See Results";
        nextBtn.disabled = selectedAnswers[currentQuestion] === undefined;
      } else {
        nextBtn.textContent = "Next Question";
        nextBtn.disabled = selectedAnswers[currentQuestion] === undefined;
      }
    }
  }

  // Go to previous question
  function goToPrevQuestion() {
    if (currentQuestion > 0) {
      currentQuestion--;
      loadQuestion();
      updateProgress();
    }
  }

  // Go to next question or show results
  function goToNextQuestion() {
    if (currentQuestion < quizData.length - 1) {
      currentQuestion++;
      loadQuestion();
      updateProgress();
    } else {
      showResults();
    }
  }

  // Calculate and show results
  function showResults() {
    const answerCounts = [0, 0, 0, 0];

    selectedAnswers.forEach((answer) => {
      answerCounts[answer]++;
    });

    let maxCount = -1;
    let personalityIndex = 0;

    answerCounts.forEach((count, index) => {
      if (count > maxCount) {
        maxCount = count;
        personalityIndex = index;
      }
    });

    const resultLuggage = luggageTypes[personalityIndex];

    // Persist sorted house preference!
    localStorage.setItem("selectedHouse", resultLuggage.house);

    // Apply sorted house theme colors right away
    applyHouseTheme(resultLuggage.house);

    if (window.MagicEngine) {
      // Play dramatic sorting hats chimes
      window.MagicEngine.playChime(220, "triangle", 1.2, 0.1);
      setTimeout(() => {
        window.MagicEngine.playChime(329.63, "sine", 0.12, 0.12);
        window.MagicEngine.playChime(392.00, "sine", 0.12, 0.14);
        window.MagicEngine.playChime(523.25, "sine", 0.35, 0.2);
      }, 500);
    }

    // Build results HTML (leaving image block empty and styling as a magical glass slot)
    const resultsHTML = `
      <div class="results-container">
        <h2 class="sorting-title">Your Sorted Luggage</h2>
        <div class="luggage-glass-slot">
          <div class="magic-sphere"></div>
          <span class="slot-text">✨ ${resultLuggage.name} ✨</span>
        </div>
        <h3 class="luggage-name">${resultLuggage.name}</h3>
        <p class="luggage-house-sub">House Affinity: <span class="house-name-highlight">${resultLuggage.house.toUpperCase()}</span></p>
        <p class="luggage-description">${resultLuggage.description}</p>
        <button class="quiz-btn restart-btn">Sort Again</button>
        <button class="quiz-btn shop-btn">View purchases</button>
      </div>
    `;

    quizContainer.innerHTML = resultsHTML;
    attachInteractiveSounds();

    // Restart button
    document.querySelector(".restart-btn").addEventListener("click", () => {
      if (window.MagicEngine) window.MagicEngine.playChime(523, "sine", 0.2, 0.12);
      window.location.reload();
    });

    // Shop button
    document.querySelector(".shop-btn").addEventListener("click", () => {
      if (window.MagicEngine) {
        window.MagicEngine.playWandSweep();
        window.MagicEngine.triggerWipeTransition(() => {
          window.location.href = "purchases.html";
        });
      } else {
        window.location.href = "purchases.html";
      }
    });
  }

  // Hover sounds helper
  function attachInteractiveSounds() {
    const hoverElements = document.querySelectorAll(
      ".option-btn, .quiz-btn, .option label"
    );
    hoverElements.forEach(el => {
      el.addEventListener("mouseenter", () => {
        if (window.MagicEngine) {
          window.MagicEngine.playChime(Math.random() * 200 + 700, "triangle", 0.08, 0.03);
        }
      });
    });
  }

  // Dynamically change house class for preview
  function applyHouseTheme(house) {
    document.body.classList.remove(
      "gryffindor-theme",
      "slytherin-theme",
      "ravenclaw-theme",
      "hufflepuff-theme"
    );
    document.body.classList.add(`${house}-theme`);
  }

  // Add custom styles for initial options
  function addInitialStyles() {
    const style = document.createElement("style");
    style.id = "quiz-inline-styles";
    style.textContent = `
      .welcome-container {
        text-align: center;
        padding: 1.5rem;
        animation: fadeIn 0.8s ease;
      }
      
      .welcome-title {
        font-family: "Cinzel", serif;
        font-size: 2.2rem;
        margin-bottom: 0.8rem;
        color: #deb887;
        text-shadow: 0 2px 8px rgba(0, 0, 0, 0.4);
      }
      
      .welcome-description {
        font-family: "Poppins", sans-serif;
        font-weight: 300;
        font-size: 1.1rem;
        margin-bottom: 2.5rem;
        color: rgba(255, 255, 255, 0.85);
      }
      
      .initial-options-container {
        display: flex;
        flex-direction: column;
        gap: 1.5rem;
        max-width: 600px;
        margin: 0 auto;
      }
      
      .option-btn {
        display: flex;
        flex-direction: column;
        align-items: center;
        padding: 2rem;
        background: rgba(0, 0, 0, 0.4);
        border: 1px solid rgba(255, 255, 255, 0.1);
        border-radius: 12px;
        cursor: pointer;
        transition: all 0.3s ease;
        backdrop-filter: blur(10px);
      }
      
      .option-btn:hover {
        background: rgba(147, 105, 217, 0.15);
        border-color: rgba(238, 186, 48, 0.4);
        transform: translateY(-4px);
        box-shadow: 0 10px 20px rgba(0, 0, 0, 0.3);
      }
      
      .option-icon {
        font-size: 2.5rem;
        margin-bottom: 0.8rem;
      }
      
      .option-label {
        font-family: "Cinzel", serif;
        font-size: 1.35rem;
        margin-bottom: 0.5rem;
        color: #eeba30;
      }
      
      .option-description {
        font-family: "Poppins", sans-serif;
        font-weight: 300;
        font-size: 0.95rem;
        line-height: 1.5;
        color: rgba(255, 255, 255, 0.7);
        margin: 0;
      }
      
      .results-container {
        text-align: center;
        animation: fadeIn 0.8s ease;
      }

      /* Beautiful empty slot container replacing image per user request */
      .luggage-glass-slot {
        width: 180px;
        height: 180px;
        margin: 2rem auto;
        border-radius: 50%;
        border: 2px solid rgba(238, 186, 48, 0.45);
        background: radial-gradient(circle at center, rgba(147, 105, 217, 0.25) 0%, rgba(26, 9, 66, 0.6) 100%);
        box-shadow: 0 8px 32px rgba(147, 105, 217, 0.3), inset 0 0 20px rgba(238, 186, 48, 0.2);
        display: flex;
        align-items: center;
        justify-content: center;
        position: relative;
        overflow: hidden;
      }

      .magic-sphere {
        width: 60px;
        height: 60px;
        border-radius: 50%;
        background: radial-gradient(circle at 30% 30%, rgba(255, 255, 255, 0.8) 0%, rgba(238, 186, 48, 0.6) 40%, rgba(147, 105, 217, 0.2) 80%);
        filter: blur(2px);
        position: absolute;
        animation: floatSphere 4s ease-in-out infinite;
      }

      @keyframes floatSphere {
        0%, 100% { transform: translateY(-8px) scale(0.95); opacity: 0.7; }
        50% { transform: translateY(8px) scale(1.05); opacity: 0.95; }
      }

      .slot-text {
        font-family: 'Cinzel', serif;
        font-size: 0.7rem;
        color: #deb887;
        position: absolute;
        bottom: 1.2rem;
        width: 100%;
        text-align: center;
        letter-spacing: 0.05rem;
      }
      
      .luggage-name {
        font-family: "Cinzel", serif;
        font-size: 2.2rem;
        margin-bottom: 0.5rem;
        color: #deb887;
        text-shadow: 0 2px 5px rgba(0, 0, 0, 0.3);
      }

      .luggage-house-sub {
        font-family: "Cinzel", serif;
        font-size: 0.95rem;
        color: rgba(255, 255, 255, 0.6);
        margin-bottom: 1.5rem;
        letter-spacing: 0.15rem;
      }

      .house-name-highlight {
        color: #eeba30;
        font-weight: bold;
      }
      
      .luggage-description {
        font-family: "Poppins", sans-serif;
        font-weight: 300;
        font-size: 1.1rem;
        line-height: 1.7;
        margin-bottom: 2.5rem;
        color: rgba(255, 255, 255, 0.85);
      }
      
      .shop-btn {
        background: linear-gradient(135deg, #740001 0%, #ae0001 100%);
        margin-left: 1rem;
      }

      .spinning-hat {
        animation: swayHat 6s ease-in-out infinite;
        transform-origin: bottom center;
      }

      @keyframes swayHat {
        0%, 100% { transform: rotate(-3deg); }
        50% { transform: rotate(3deg); }
      }
      
      @keyframes fadeIn {
        from { opacity: 0; transform: translateY(15px); }
        to { opacity: 1; transform: translateY(0); }
      }
    `;

    // Only append if not already exists
    if (!document.getElementById("quiz-inline-styles")) {
      document.head.appendChild(style);
    }
  }

  showInitialOptions();
});

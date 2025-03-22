const arrowLeft = document.querySelector(".arrow-left");
const arrowRight = document.querySelector(".arrow-right");
const dots = document.querySelectorAll(".dot");
const alohomoraButton = document.querySelector(".login_btn"); // Add this line to select the Alohomora button

const pages = ["index.html", "contactus.html", "purchases.html", "hat.html"]; // Added hat.html to your pages array

const skipIndex = 2;

let currentPageIndex = 0;

function updateActiveDot() {
  dots.forEach((dot, index) => {
    dot.classList.remove("active");

    if (index === 0) {
      dot.classList.add("active");
    }
  });
}

updateActiveDot();

arrowLeft.addEventListener("click", () => {
  window.location.href = pages[2];
});

arrowRight.addEventListener("click", () => {
  window.location.href = pages[1];
});

dots.forEach((dot, index) => {
  dot.addEventListener("click", () => {
    if (index === 0) {
      return;
    } else if (index === 1) {
      window.location.href = "contactus.html";
    } else if (index === skipIndex) {
      return;
    } else if (index === 3) {
      window.location.href = "purchases.html";
    }
  });
});

// Add event listener for the Alohomora button
alohomoraButton.addEventListener("click", () => {
  window.location.href = "hat.html"; // Redirect to hat.html when button is clicked
});

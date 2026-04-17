const heroBtn = document.querySelector(".hero-btn");
const hero = document.querySelector(".hero");
const cards = document.querySelector(".main-cards");
const footer = document.querySelector("footer");

heroBtn.addEventListener("click", () => {
  hero.classList.add("hidden");
  cards.style.display = "flex";
  footer.style.display = "flex";
});

cards.classList.add("show");
footer.classList.add("show");

const heroCard = document.querySelector(".hero-card");

heroCard.addEventListener("click", () => {
  heroCard.classList.toggle("flip");
});


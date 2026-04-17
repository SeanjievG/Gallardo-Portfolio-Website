function toggleMenu() {
  const menu = document.querySelector('.menu-links');
  const icon = document.querySelector('.hamburger-icon');
  menu.classList.toggle("open");
  icon.classList.toggle("open");
}

//For the updated modal
let selectedFile = "";

function openModal(filePath) {
  selectedFile = filePath;
  document.getElementById("download-modal").classList.add("show");
}

function closeModal() {
  document.getElementById("download-modal").classList.remove("show");
}

// Confirm button
document.getElementById("confirm-btn").addEventListener("click", () => {
  const link = document.createElement("a");
  link.href = selectedFile;
  link.download = selectedFile.split('/').pop();
  link.click();

  closeModal();
});

// Cancel button
document.getElementById("cancel-btn").addEventListener("click", closeModal);

//Gallery Modal
function openGallery() {
  document.getElementById("gallery-modal").classList.add("show");
}

function closeGallery() {
  document.getElementById("gallery-modal").classList.remove("show");
}
document.getElementById("gallery-modal").addEventListener("click", function (e) {
  if (e.target === this) {
    closeGallery();
  }
});

//Writing modal
let currentPDF = "";

function openWriting(title, desc, pdfFile) {
  document.getElementById("writing-title").innerText = title;
  document.getElementById("writing-desc").innerText = desc;
  
  currentPDF = pdfFile;
  
  document.getElementById("writing-modal").classList.add("show");
}

function closeWriting() {
  document.getElementById("writing-modal").classList.remove("show");
}

document.getElementById("writing-modal").addEventListener("click", function (e) {
  if (e.target === this) {
    closeWriting();
  }
});

//Change theme
/*
function changeMode() {
  const html = document.documentElement;

  let theme = html.getAttribute("data-theme");

  if (theme === "light") {
    html.setAttribute("data-theme", "dark");
    localStorage.setItem("theme", "dark");
  } else {
    html.setAttribute("data-theme", "light");
    localStorage.setItem("theme", "light");
  }
}
*/

function changeMode() {
  const logos = document.querySelectorAll(".logo");
  
  logos.forEach(logo => logo.classList.add("animate"));
  
  setTimeout(() => {
    const html = document.documentElement;
    const theme = html.getAttribute("data-theme");
    
    if (theme === "light") {
      html.setAttribute("data-theme", "dark");
      localStorage.setItem("theme", "dark");
    } else {
      html.setAttribute("data-theme", "light");
      localStorage.setItem("theme", "light");
    }
    
    logos.forEach(logo => logo.classList.remove("animate"));
    
  }, 400);
}
// load saved theme
window.addEventListener("load", () => {
  const saved = localStorage.getItem("theme");
  if (saved) {
    document.documentElement.setAttribute("data-theme", saved);
  }
});

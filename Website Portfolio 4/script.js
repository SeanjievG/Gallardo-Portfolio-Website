function toggleMenu() {
  const menu = document.querySelector('.menu-links');
  const icon = document.querySelector('.hamburger-icon');
  menu.classList.toggle("open");
  icon.classList.toggle("open");
}

function toggleAlert() {
  alert('Sorry, not yet available.')
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

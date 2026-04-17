function login(inputUsername, inputPassword) {
  const username = inputUsername || document.getElementById("username").value.trim();
  const password = inputPassword || document.getElementById("password").value;
  const message = document.getElementById("login-message");

  const accounts = JSON.parse(localStorage.getItem("accounts")) || [];
  const user = accounts.find(acc => acc.username === username);

  if (user && user.password === password) {
    // Show green welcome message
    message.style.color = "green";
    message.textContent = `Welcome, ${username}!`;

    // Disable login fields and button
    if (!inputUsername && !inputPassword) { // only disable if manual login
      document.getElementById("username").disabled = true;
      document.getElementById("password").disabled = true;
      document.querySelector("button[onclick='login()']").disabled = true;
    }

    // Store user temporarily
    window.loggedInUser = user;

    // Show welcome popup
    showWelcomePopup(`Welcome back, ${username}! Do you want to save your password?`);

    // Transform login box into profile
    transformToProfile(user);

  } else {
    // Invalid login
    message.style.color = "red";
    message.textContent = "Invalid Username or Password";
  }
  //Check Admin
  if (user && user.password === password) {
  window.loggedInUser = user;

  // Check if admin
  if (user.role === "Admin") {
    showAdminOptions(); // create this function
  }
}

}

// Toggle password visibility
document.getElementById("showPassword").addEventListener("change", function () {
  const pass = document.getElementById("password");
  pass.type = this.checked ? "text" : "password";
});

// Optional: handle menu button clicks
document.querySelectorAll(".menu-btn").forEach((btn) => {
  btn.addEventListener("click", () => {
    
  });
});

function toggleSignup() {
  const form = document.getElementById("signup-form");
  form.style.display = form.style.display === "none" ? "block" : "none";
}
//Admin
const defaultAdmin = {
  name: "EXCEL-LENT",
  birthdate: "2000-01-01",
  role: "Admin",
  username: "EXCEL-LENT",
  password: "admin123"
};

let accounts = JSON.parse(localStorage.getItem("accounts")) || [];
const exists = accounts.some(acc => acc.username === defaultAdmin.username);
if (!exists) {
  accounts.push(defaultAdmin);
  localStorage.setItem("accounts", JSON.stringify(accounts));
}

// Admin edit
function showAdminOptions() {
  const adminPanel = document.getElementById("admin-panel");
  if (adminPanel) adminPanel.style.display = "block";
}

function editAnnouncements() {
  const current = document.getElementById("announcement-text").textContent;
  const newText = prompt("Edit announcement:", current);
  if (newText) {
    document.getElementById("announcement-text").textContent = newText;
    localStorage.setItem("announcement", newText);
  }
}

function editEvents() {
  const current = localStorage.getItem("event") || "None";
  const newEvent = prompt("Enter new upcoming event:", current);
  if (newEvent) {
    localStorage.setItem("event", newEvent);
    document.getElementById("event-text").textContent = newEvent;
  }
}

function editShop() {
  const itemsJSON = localStorage.getItem("shopItems") || "[]";
  const items = JSON.parse(itemsJSON);

  let newItems = prompt(
    "Enter new items (format: name-price,name-price...):",
    items.map(i => `${i.name}-${i.price}`).join(",")
  );

  if (newItems) {
    const parsed = newItems.split(",").map(str => {
      const [name, price] = str.split("-");
      return { name: name.trim(), price: parseFloat(price) };
    });

    localStorage.setItem("shopItems", JSON.stringify(parsed));
    location.reload(); // refresh shop display
  }
}

function openAdminPanel() {
  const panel = document.getElementById("admin-panel");
  panel.style.display = panel.style.display === "none" ? "block" : "none";
}


// Sign up
function signup() {
  const name = document.getElementById("realname").value.trim();
  const birthdate = document.getElementById("birthdate").value;
  const role = document.getElementById("role").value;
  const newUser = document.getElementById("newUsername").value.trim();
  const newPass = document.getElementById("newPassword").value;
  const msg = document.getElementById("signup-message");

  // Check for empty fields
  if (!name || !birthdate || !role || !newUser || !newPass) {
    msg.style.color = "red";
    msg.textContent = "Please fill out all fields.";
    return; // Stop the function if fields are missing
  }

  // Password strength check: at least 6 characters, with both letters and numbers
  const passwordRegex = /^(?=.*[a-zA-Z])(?=.*\d).{6,}$/;
  if (!passwordRegex.test(newPass)) {
    msg.style.color = "red";
    msg.textContent = "Password must be at least 6 characters and contain both letters and numbers.";
    return; // Stop the function if password is weak
  }

  // Check if username already exists
  let accounts = JSON.parse(localStorage.getItem("accounts")) || [];
  const existingUser = accounts.find(acc => acc.username === newUser);

  if (existingUser) {
    msg.style.color = "red";
    msg.textContent = "Username already taken.";
    return; // Stop the function if username is already taken
  }

  // Save new user data to localStorage
  accounts.push({
    fullname: name,
    birthdate,
    role,
    username: newUser,
    password: newPass
  });

  localStorage.setItem("accounts", JSON.stringify(accounts));

  // Automatically log the user in
  login(newUser, newPass);

  msg.style.color = "green";
  msg.textContent = "Account created successfully!";
  setTimeout(() => {
    toggleSignup(); // Hide signup form
    msg.textContent = "";
  }, 1500);
}

// Feature-cards
const announcements = [
  { date: '2024-12-10', message: 'Christmas Program and Gift Giving' },
  { date: '2025-01-05', message: 'Resume of Classes' },
  { date: '2025-03-01', message: 'Start of Final Exams' },
  { date: '2025-04-15', message: 'Graduation Ceremony at SFNHS Covered Court' },
];

function openFeature(feature) {
  if (feature === 'announcements') {
    showAnnouncements();
  } else {
    alert(`Opening ${feature}... (You can add real page logic later!)`);
  }
}

// Announcement modal
function showAnnouncements() {
  const sorted = announcements.sort((a, b) => new Date(b.date) - new Date(a.date)); // latest first
  const latest = sorted[0];
  const archive = sorted.slice(1);

  document.getElementById('latestAnnouncement').innerHTML =
    `<strong>${latest.date}</strong>: ${latest.message}`;

  const archiveList = document.getElementById('archivedAnnouncements');
  archiveList.innerHTML = '';

  archive.forEach(a => {
    const li = document.createElement('li');
    li.innerHTML = `<strong>${a.date}</strong>: ${a.message}`;
    archiveList.appendChild(li);
  });

  document.getElementById('announcementModal').style.display = 'block';
}

function closeModal() {
  document.getElementById('announcementModal').style.display = 'none';
}

function toggleArchived() {
  const archiveList = document.getElementById('archivedAnnouncements');
  const toggleBtn = document.getElementById('toggleArchive');
  const isVisible = archiveList.style.display === 'block';

  archiveList.style.display = isVisible ? 'none' : 'block';
  toggleBtn.innerText = isVisible ? 'Show Previous' : 'Hide Previous';
}


// Function to open the donation popup
document.getElementById("open-donation-btn").addEventListener("click", function () {
  document.getElementById("donationPopup").style.display = "block";

  // Reset input fields and message
  document.getElementById("donationAmount").value = "";
  document.getElementById("paymentMode").value = "";
  document.getElementById("donation-message").textContent = "";
});

// Function to close the donation popup
function cancelDonation() {
  document.getElementById("donationPopup").style.display = "none";
}

// Function to handle donation submission
function submitDonation() {
  const amount = parseFloat(document.getElementById("donationAmount").value);
  const mode = document.getElementById("paymentMode").value;
  const message = document.getElementById("donation-message");

  if (!amount || amount <= 0 || isNaN(amount)) {
    message.style.color = "red";
    message.textContent = "Please enter a valid donation amount.";
    return;
  }

  if (!mode) {
    message.style.color = "red";
    message.textContent = "Please select a mode of payment.";
    return;
  }

  message.style.color = "green";
  message.textContent = `Thank you for your ₱${amount} donation via ${mode}!`;

  // Optional: update donation progress bar or stats

  // Close the modal after a short delay
  setTimeout(() => {
    cancelDonation();
  }, 2000);
}

// Make the popup draggable
const popup = document.getElementById("donationPopup");
const header = document.getElementById("popupHeader");

let isDragging = false, offsetX = 0, offsetY = 0;

// Desktop
header.addEventListener("mousedown", function (e) {
  isDragging = true;
  offsetX = e.clientX - popup.offsetLeft;
  offsetY = e.clientY - popup.offsetTop;
});

document.addEventListener("mouseup", function () {
  isDragging = false;
});

document.addEventListener("mousemove", function (e) {
  if (isDragging) {
    popup.style.left = `${e.clientX - offsetX}px`;
    popup.style.top = `${e.clientY - offsetY}px`;
    popup.style.transform = "none";
  }
});

// Mobile
header.addEventListener("touchstart", function (e) {
  isDragging = true;
  const touch = e.touches[0];
  offsetX = touch.clientX - popup.offsetLeft;
  offsetY = touch.clientY - popup.offsetTop;
}, { passive: true });

document.addEventListener("touchend", function () {
  isDragging = false;
});

document.addEventListener("touchmove", function (e) {
  if (isDragging) {
    const touch = e.touches[0];
    popup.style.left = `${touch.clientX - offsetX}px`;
    popup.style.top = `${touch.clientY - offsetY}px`;
    popup.style.transform = "none";
  }
}, { passive: true });

// Fade-in on scroll
const faders = document.querySelectorAll('.fade-in');

const appearOnScroll = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, {
  threshold: 0.1
});

faders.forEach(fader => {
  appearOnScroll.observe(fader);
});

//Countdown; Event
function startCountdown() {
  const eventDate = new Date("2025-06-15T08:00:00"); // Change to your event date
  const timerElement = document.getElementById("countdown-timer");

  function updateCountdown() {
    const now = new Date();
    const diff = eventDate - now;

    if (diff <= 0) {
      timerElement.textContent = "Happening now!";
      clearInterval(interval);
      return;
    }

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((diff / (1000 * 60)) % 60);
    const seconds = Math.floor((diff / 1000) % 60);

    timerElement.textContent = `${days}d ${hours}h ${minutes}m ${seconds}s`;
  }

  updateCountdown(); // Initial call
  const interval = setInterval(updateCountdown, 1000);
}
startCountdown();

// Donation
const donationGoal = 1000;
const statusText = document.getElementById("donation-status");

// Load donation progress
let totalDonations = parseFloat(localStorage.getItem("totalDonations")) || 0;
updateDonationProgress();

function updateDonationProgress() {
  const percentage = Math.min((totalDonations / donationGoal) * 100, 100);
  statusText.textContent = `₱${totalDonations} raised`;
}

function submitDonation() {
  const amount = parseFloat(document.getElementById("donationAmount").value);
  const mode = document.getElementById("paymentMode").value;
  const message = document.getElementById("donation-message");

  if (!amount || amount <= 0 || isNaN(amount)) {
    message.style.color = "red";
    message.textContent = "Please enter a valid donation amount.";
    return;
  }

  if (!mode) {
    message.style.color = "red";
    message.textContent = "Please select a mode of payment.";
    return;
  }

  totalDonations += amount;

  // Save to localStorage
  localStorage.setItem("totalDonations", totalDonations);

  updateDonationProgress();

  message.style.color = "green";
  message.textContent = `Thank you for your ₱${amount} donation via ${mode}!`;

  setTimeout(() => {
    cancelDonation();
  }, 2000);
}



// Welcome; saved passw popup
function showWelcomePopup(message) {
  document.getElementById('welcomeMessage').textContent = message;
  document.getElementById('welcomePopup').style.display = 'block';
}

function showWelcomePopup(message) {
  const popup = document.getElementById("welcomePopup");
  const msgBox = document.getElementById("welcomeMessage");

  msgBox.textContent = message;
  popup.style.display = "block";
}


function handleSavePassword(save) {
  if (save) {
    alert("Password saved securely.");
    // You can implement saving logic here
  } else {
    alert("Password not saved.");
    document.getElementById("welcomePopup").style.display = "none";

  }

  // Close popup
  document.getElementById('welcomePopup').style.display = 'none';
}

// Update UI to Profile
function handleSavePassword(save) {
  const popup = document.getElementById("welcomePopup");
  const user = window.loggedInUser;

  if (save) {
    localStorage.setItem("savedUser", JSON.stringify(user));
  }

  popup.style.display = "none";
  transformToProfile(user);
}


//Auto login
window.addEventListener("DOMContentLoaded", () => {
  const saved = JSON.parse(localStorage.getItem("savedUser"));
  if (saved) {
    document.getElementById("username").value = saved.username;
    document.getElementById("password").value = saved.password;
    window.loggedInUser = saved;
    transformToProfile(saved);
    
  if (saved.role === "Admin") {
  showAdminOptions();
  }
  }
});

// Restore content by Admin
window.addEventListener("DOMContentLoaded", () => {
  const a = localStorage.getItem("announcement");
  if (a) document.getElementById("announcement-text").textContent = a;

  const e = localStorage.getItem("event");
  if (e) document.getElementById("event-text").textContent = e;

  const shop = JSON.parse(localStorage.getItem("shopItems") || "[]");
  const shopList = document.getElementById("shop-list");
  if (shopList && shop.length) {
    shopList.innerHTML = "";
    shop.forEach(item => {
      shopList.innerHTML += `<li>${item.name} - ₱${item.price}</li>`;
    });
  }
});

//Logout button
function logout() {
  localStorage.removeItem("savedUser");
  location.reload(); // Or reset form manually if you prefer
}

// login tab to Profile tab
function transformToProfile(user) {
  const loginBox = document.querySelector(".login-box");

  // Check if user is admin
  const isAdmin = user.role.toLowerCase() === "admin";

  // Conditionally render the cart or edit button
  const extraButton = isAdmin
    ? `<button class="btn-edit" onclick="openAdminPanel()">Edit Content</button>`
    : `<p><i class="fas fa-shopping-cart"></i> <a href="cart.html">Go to Cart</a></p>`;

  loginBox.innerHTML = `
    <div class="profile-tab">
      <img class="profile-pic" src="https://via.placeholder.com/80" alt="Profile Picture">
      <h3 class="profile-name">Welcome, ${user.name}!</h3>
      <p class="profile-role">${user.role}</p>
      <p><strong>Username:</strong> ${user.username}</p>
      <p><strong>Birthdate:</strong> ${user.birthdate}</p>
      ${extraButton}
      <button class="btn-logout" onclick="logout()">Logout</button>
    </div>
  `;
}

// Home
function handleHomeClick() {
  const user = window.loggedInUser || null;

  if (user) {
    showCustomPopup("You're already on the homepage.");
  } else {
    showCustomPopup(
      "You're already on the homepage. Would you like to log in or sign up?",
      () => login() // or toggleLogin() if you still use that
    );
  }
}

// Popup Universal Design
let popupCallbackYes = null;
function showCustomPopup(message, onYes) {
  document.getElementById("popup-message").textContent = message;
  document.getElementById("custom-popup").style.display = "flex";
  popupCallbackYes = onYes;
}
function handlePopupYes() {
  if (popupCallbackYes) popupCallbackYes();
  closeCustomPopup();
}

function handlePopupNo() {
  closeCustomPopup();
}

function closeCustomPopup() {
  document.getElementById("custom-popup").style.display = "none";
  popupCallbackYes = null;
}
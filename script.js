function scrollDown() {
  document.getElementById("love-text").scrollIntoView({
    behavior: "smooth"
  });
}

function goToGallery() {
  document.body.classList.remove("fade-in");
  setTimeout(() => {
    window.location.href = "gallery.html";
  }, 500);
}

function goHome() {
  document.body.classList.remove("fade-in");
  setTimeout(() => {
    window.location.href = "index.html";
  }, 500);
}

/* =========================
   Floating background hearts
========================= */
function createHeart() {
  const heart = document.createElement("div");
  heart.classList.add("heart");
  heart.innerHTML = "❤";
  heart.style.left = Math.random() * 100 + "vw";
  heart.style.fontSize = Math.random() * 20 + 20 + "px";

  document.body.appendChild(heart);

  setTimeout(() => {
    heart.remove();
  }, 4000);
}

setInterval(createHeart, 400);

/* =========================
   Music start
========================= */
function startLove() {
  const music = document.getElementById("bg-music");

  if (music && music.paused) {
    music.volume = 0.2;
    music.play();
  }

  // Small delay before scrolling (romantic pacing ✨)
  setTimeout(() => {
    scrollDown();
  }, 800); // 0.8 seconds
}

/* =========================
   Heart trail (slowed)
========================= */
let lastHeartTime = 0;
const heartDelay = 500; // 0.5 seconds

function heartTrail(x, y) {
  const now = Date.now();
  if (now - lastHeartTime < heartDelay) return;
  lastHeartTime = now;

  const heart = document.createElement("div");
  heart.className = "trail-heart";
  heart.innerHTML = "❤";
  heart.style.left = x + "px";
  heart.style.top = y + "px";

  document.body.appendChild(heart);

  setTimeout(() => {
    heart.remove();
  }, 1200);
}

document.addEventListener("mousemove", (e) => {
  heartTrail(e.clientX, e.clientY);
});

document.addEventListener("touchmove", (e) => {
  const touch = e.touches[0];
  heartTrail(touch.clientX, touch.clientY);
});

/* =========================
   Music controls
========================= */
function toggleMusic() {
  const music = document.getElementById("bg-music");
  const button = document.querySelector(".music-button");

  if (!music) return;

  if (music.paused) {
    music.play();
    button.innerHTML = "⏸";
  } else {
    music.pause();
    button.innerHTML = "▶";
  }
}

function setVolume(value) {
  const music = document.getElementById("bg-music");
  if (music) {
    music.volume = value;
  }
}

/* =========================
   Gallery full-screen modal
========================= */
const galleryImages = document.querySelectorAll(".gallery img");
const modal = document.getElementById("image-modal");
const modalImg = document.getElementById("modal-img");

let currentIndex = 0;

// Function to create floating hearts when clicking image
function createClickHearts(count) {
  for (let i = 0; i < count; i++) {
    const heart = document.createElement("div");
    heart.className = "modal-heart";
    heart.innerHTML = "❤";

    // Random position around center
    heart.style.left = (window.innerWidth / 2 + (Math.random() - 0.5) * 200) + "px";
    heart.style.top = (window.innerHeight / 2 + (Math.random() - 0.5) * 200) + "px";

    document.body.appendChild(heart);

    setTimeout(() => {
      heart.remove();
    }, 2000);
  }
}

// Function to show modal image
function showModal(index) {
  currentIndex = index;
  modalImg.src = galleryImages[currentIndex].src;
  modal.classList.add("show");

  // Create floating hearts
  createClickHearts(5); // 5 hearts per click
}

// Click on gallery image
galleryImages.forEach((img, index) => {
  img.addEventListener("click", () => showModal(index));
});

// Close modal when clicking outside image
modal.addEventListener("click", (e) => {
  if (e.target === modal) {
    modal.classList.remove("show");
  }
});

// Arrow navigation
document.getElementById("prev").addEventListener("click", (e) => {
  e.stopPropagation();
  currentIndex = (currentIndex - 1 + galleryImages.length) % galleryImages.length;
  modalImg.src = galleryImages[currentIndex].src;
  createClickHearts(3);
});

document.getElementById("next").addEventListener("click", (e) => {
  e.stopPropagation();
  currentIndex = (currentIndex + 1) % galleryImages.length;
  modalImg.src = galleryImages[currentIndex].src;
  createClickHearts(3);
});

const words = ["Ceow", "Lovely", "Star", "Beauty", "Eyes", "Love", "Joy", "Baby"];
const scrollWords = document.getElementById("scroll-words");

let currentWordIndex = 0;
let isAnimating = false;

function showWord(index) {
  scrollWords.style.opacity = 0;

  setTimeout(() => {
    scrollWords.textContent = words[index];
    scrollWords.style.opacity = 1;
  }, 600); // match transition time
}

function onScroll() {
  if (isAnimating) return;

  isAnimating = true;

  currentWordIndex++;
  if (currentWordIndex >= words.length) {
    currentWordIndex = 0; // loop, or set to words.length - 1 to stop at last word
  }

  showWord(currentWordIndex);

  // Prevent spamming on scroll, allow animation to finish
  setTimeout(() => {
    isAnimating = false;
  }, 1000);
}

// Show the first word immediately on page load
showWord(currentWordIndex);

// Listen to scroll events and trigger the word change
window.addEventListener("scroll", onScroll);

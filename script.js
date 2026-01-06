/* =========================
   Smooth scroll to love text
========================= */
function scrollDown() {
  const loveText = document.getElementById("love-text");
  if (loveText) {
    loveText.scrollIntoView({ behavior: "smooth" });
  }
}

/* =========================
   Navigation
========================= */
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

  setTimeout(() => heart.remove(), 4000);
}

setInterval(createHeart, 400);

/* =========================
   Music start + scroll
========================= */
function startLove() {
  const music = document.getElementById("bg-music");

  if (music && music.paused) {
    music.volume = 0.2;
    music.play();
  }

  setTimeout(scrollDown, 800);
}

/* =========================
   Heart trail (cursor / touch)
========================= */
let lastHeartTime = 0;
const heartDelay = 500;

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

  setTimeout(() => heart.remove(), 1200);
}

document.addEventListener("mousemove", (e) => {
  heartTrail(e.clientX, e.clientY);
});

document.addEventListener("touchmove", (e) => {
  if (e.touches.length > 0) {
    const touch = e.touches[0];
    heartTrail(touch.clientX, touch.clientY);
  }
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
    if (button) button.innerHTML = "⏸";
  } else {
    music.pause();
    if (button) button.innerHTML = "▶";
  }
}

function setVolume(value) {
  const music = document.getElementById("bg-music");
  if (music) music.volume = value;
}

/* =========================
   Gallery modal (SAFE)
========================= */
const galleryImages = document.querySelectorAll(".gallery img");
const imageModal = document.getElementById("image-modal");
const modalImg = document.getElementById("modal-img");
const prev = document.getElementById("prev");
const next = document.getElementById("next");

let currentIndex = 0;

function createClickHearts(count) {
  for (let i = 0; i < count; i++) {
    const heart = document.createElement("div");
    heart.className = "modal-heart";
    heart.innerHTML = "❤";

    heart.style.left =
      window.innerWidth / 2 + (Math.random() - 0.5) * 200 + "px";
    heart.style.top =
      window.innerHeight / 2 + (Math.random() - 0.5) * 200 + "px";

    document.body.appendChild(heart);
    setTimeout(() => heart.remove(), 2000);
  }
}

if (galleryImages.length && imageModal && modalImg) {
  galleryImages.forEach((img, index) => {
    img.addEventListener("click", () => {
      currentIndex = index;
      modalImg.src = img.src;
      imageModal.classList.add("show");
      createClickHearts(5);
    });
  });

  imageModal.addEventListener("click", (e) => {
    if (e.target === imageModal) {
      imageModal.classList.remove("show");
    }
  });

  if (prev && next) {
    prev.addEventListener("click", (e) => {
      e.stopPropagation();
      currentIndex =
        (currentIndex - 1 + galleryImages.length) % galleryImages.length;
      modalImg.src = galleryImages[currentIndex].src;
      createClickHearts(3);
    });

    next.addEventListener("click", (e) => {
      e.stopPropagation();
      currentIndex = (currentIndex + 1) % galleryImages.length;
      modalImg.src = galleryImages[currentIndex].src;
      createClickHearts(3);
    });
  }
}

/* =========================
   Floating love letter button
========================= */
/* =========================
   Love letters (no repeats, shuffled)
========================= */

const loveLetters = [
  "Katrina, every moment with you feels like magic.",
  "I don’t just love you — I choose you, always.",
  "You are my calm, my chaos, and my home.",
  "Every heartbeat reminds me how deeply I care for you.",
  "No matter where life takes us, my love for you is real.",

  "I’m not perfect, but loving you is the most genuine thing I’ve ever done.",
  "You make even my worst days feel lighter just by being you.",
  "Loving you has taught me patience, kindness, and what real care looks like.",
  "I see a future in you that feels safe, warm, and worth fighting for.",
  "You’re the first person I think about when I wake up and the last before I sleep.",

  "If love is effort, then you’re worth every ounce of mine.",
  "I don’t want perfection — I want us, growing together.",
  "You’ve changed me in ways I didn’t know I needed.",
  "Even in silence, being with you feels right.",
  "You’re not just someone I love — you’re someone I respect deeply.",

  "I’m sorry for the times I didn’t show you how much you mean to me.",
  "I’m learning, growing, and choosing to be better for you.",
  "Your feelings matter to me more than my pride ever could.",
  "I never want you to feel alone, especially when you’re with me.",
  "You deserve love that listens, understands, and stays.",

  "I would rather fix things with you than start over with anyone else.",
  "You’re my favorite place to be, even when things are hard.",
  "I believe in us, even when the road isn’t smooth.",
  "Every version of you is someone I love.",
  "You make my life softer just by being in it.",

  "I don’t take your heart lightly — I protect it because it matters.",
  "You’re not replaceable, and you never were.",
  "I want to be someone you feel safe loving.",
  "Loving you feels like home, not a question.",
  "I’m grateful for every moment you’ve given me.",

  "I don’t just miss you — I miss us.",
  "You deserve consistency, care, and effort, and I’m committed to giving you that.",
  "My love for you isn’t loud — it’s steady and real.",
  "I choose honesty, growth, and you.",
  "If you let me, I’ll keep choosing you every single day."
];

// Create a shuffled queue
let unseenLetters = JSON.parse(localStorage.getItem("unseenLetters")) || [...loveLetters];
let seenLetters = JSON.parse(localStorage.getItem("seenLetters")) || [];

function getNextLoveLetter() {
  // If all letters have been seen, reset unseen list
  if (unseenLetters.length === 0) {
    unseenLetters = [...loveLetters];
    localStorage.setItem("unseenLetters", JSON.stringify(unseenLetters));
  }

  // Pick random unseen letter
  const randomIndex = Math.floor(Math.random() * unseenLetters.length);
  const letter = unseenLetters.splice(randomIndex, 1)[0];

  // Save progress
  seenLetters.push(letter);
  localStorage.setItem("seenLetters", JSON.stringify(seenLetters));
  localStorage.setItem("unseenLetters", JSON.stringify(unseenLetters));

  return {
    text: letter,
    seenBefore: seenLetters.includes(letter)
  };
}
/* =========================
   Love letter modal
========================= */

function openLoveLetter() {
  const seenNote = document.getElementById("seen-note");
seenNote.style.opacity = letterData.seenBefore ? "0.7" : "0";

  const modal = document.getElementById("love-modal");
  const content = modal.querySelector(".love-modal-content");
  const letterEl = document.getElementById("love-letter");

  const letterData = getNextLoveLetter();

  // Reset styles
  content.classList.remove("seen");
  letterEl.classList.remove("love-letter-animate");

  // Apply seen gradient if applicable
  if (letterData.seenBefore) {
    content.classList.add("seen");
  }

  // Animate letter in
  letterEl.textContent = "";
  setTimeout(() => {
    letterEl.textContent = letterData.text;
    letterEl.classList.add("love-letter-animate");
  }, 100);

  modal.classList.add("show");

  if (typeof createClickHearts === "function") {
    createClickHearts(8);
  }

  if (navigator.vibrate) {
    navigator.vibrate(30);
  }
}


function closeLoveLetter() {
  const modal = document.getElementById("love-modal");
  if (modal) modal.classList.remove("show");
}



function openLoveLetter() {
  const modal = document.getElementById("love-modal");
  const letter = document.getElementById("love-letter");

  if (!modal || !letter) return;

  const randomIndex = Math.floor(Math.random() * loveLetters.length);
  letter.textContent = loveLetters[randomIndex];
  modal.classList.add("show");

  createClickHearts(6);
}

function closeLoveLetter() {
  const modal = document.getElementById("love-modal");
  if (modal) modal.classList.remove("show");
}

let inactivityTimer;
const loveButton = document.querySelector(".floating-love-btn");

function resetInactivityTimer() {
  if (!loveButton) return;
  loveButton.classList.remove("pulse");

  clearTimeout(inactivityTimer);
  inactivityTimer = setTimeout(() => {
    loveButton.classList.add("pulse");
  }, 7000); // 7 seconds of inactivity
}

["mousemove", "scroll", "click", "touchstart"].forEach(event => {
  document.addEventListener(event, resetInactivityTimer);
});

resetInactivityTimer();

const rose = document.getElementById("rose");

if (rose) {
  rose.addEventListener("click", () => {
    rose.classList.toggle("bloom");
    if (typeof createClickHearts === "function") {
      createClickHearts(6);
    }
  });
}

// LOGIN CREDENTIALS
const USER = "jujga";
const PASS = "247";

// STATES
let clickCount = 0;
let clickTimer = null;
let singing = false;
let hearts = false;
let heartInterval;

// ELEMENTS
const loginCat = document.getElementById("loginCat");
const loginBubble = document.getElementById("loginBubble");
const cat = document.getElementById("mainCat");
const bubble = document.getElementById("textBubble");

// VIBRATION HELPER (PHONE ONLY)
function vibrate(ms) {
  if (navigator.vibrate) {
    navigator.vibrate(ms);
  }
}

// LOGIN
function login() {
  const u = document.getElementById("username").value.trim();
  const p = document.getElementById("password").value.trim();

  if (u !== USER || p !== PASS) {
    loginCat.src = "angry.png";
    loginBubble.innerText = "hudlaa yriadai";
    loginBubble.classList.remove("hidden");
    return;
  }

  loginCat.src = "cat.png";

  setTimeout(() => {
    document.body.style.zoom = "1";
    window.scrollTo(0, 0);

    document.getElementById("loginPage").classList.remove("active");
    document.getElementById("mainPage").classList.add("active");
    updateCat();
  }, 500);
}

// CAT CLICK — PRESS + VIBRATION
cat.addEventListener("click", () => {
  cat.classList.add("press");
  setTimeout(() => cat.classList.remove("press"), 120);

  clickCount++;
  clearTimeout(clickTimer);

  clickTimer = setTimeout(() => {
    if (clickCount === 1) {
      vibrate(10);
      showText("Haildai 💖");
    } else if (clickCount === 2) {
      vibrate(18);
      showText("Maaw 🐱");
    } else if (clickCount >= 4) {
      vibrate(35);
      showText("Nooyoldo 😢");
    }
    clickCount = 0;
  }, 1000);
});

function showText(text) {
  bubble.innerText = text;
  bubble.classList.remove("hidden");
  setTimeout(() => bubble.classList.add("hidden"), 3000);
}

// CAT PRIORITY
function updateCat() {
  if (hearts) cat.src = "happy.gif";
  else if (singing) cat.src = "sing.gif";
  else cat.src = "default.gif";
}

// SING
function toggleSing() {
  singing = !singing;
  const song = document.getElementById("song");
  singing ? song.play() : song.pause();
  updateCat();
}

// HEARTS
function toggleHearts() {
  hearts = !hearts;
  document.body.classList.toggle("dark-pink-bg", hearts);

  if (hearts) {
    heartInterval = setInterval(createHeart, 80);
  } else {
    clearInterval(heartInterval);
  }
  updateCat();
}

function createHeart() {
  const h = document.createElement("div");
  h.className = "heart";
  h.innerText = "💕";
  h.style.left = Math.random() * 100 + "vw";
  h.style.animationDuration = (2 + Math.random() * 2) + "s";
  document.body.appendChild(h);

  setTimeout(() => h.remove(), 5000);
}

// DEFAULT ON LOAD
document.addEventListener("DOMContentLoaded", updateCat);

const names = [
  "piku",
  "babyy",
  "cutie",
  "cookiee",
  "paglii",
  "bhootni",
  "golu molu",
  "our misses",
  "mahrani ji",
  "cupcake",
  "booboo"
];

const teddyMessages = [
  "I love you sooo much! 🥺",
  "Hug me! 🫂",
  "You are my favourite person 💖",
  "Smile for me! 😊",
  "Missing you every day 🥹",
  "You're the cutest! 🎀"
];

const heartEmojis = ["💖", "💕", "💗", "💘", "🌸", "✨"];
const loveFallEmojis = ["💖", "💗", "💕", "😘", "💋", "😚", "🥰", "💘", "😍"];
const loveWords = ["I love you 💖", "I love you ❤️", "love you 😘", "I love you so much 🥰", "I love you 💕"];
const flowerEmojis = ["🌸", "🌷", "🌺", "🌼", "💐", "🌹", "🌸", "🪻"];

function makeLayer(id) {
  let el = document.getElementById(id);
  if (!el) {
    el = document.createElement("div");
    el.id = id;
    document.body.appendChild(el);
  }
  return el;
}

const heartsEl = makeLayer("hearts");
const confettiEl = makeLayer("confetti");
const petalsEl = makeLayer("petals");
const gardenEl = makeLayer("garden");

function spawnHeart() {
  const heart = document.createElement("span");
  const duration = 4 + Math.random() * 4;
  heart.className = "heart";
  heart.textContent = heartEmojis[Math.floor(Math.random() * heartEmojis.length)];
  heart.style.left = Math.random() * 95 + "%";
  heart.style.fontSize = 16 + Math.random() * 20 + "px";
  heart.style.animationDuration = duration + "s";
  heartsEl.appendChild(heart);
  setTimeout(function () {
    heart.remove();
  }, duration * 1000);
}

function spawnLoveFall() {
  const piece = document.createElement("span");
  const duration = 4 + Math.random() * 3;
  piece.className = "confetti-piece";
  piece.textContent = loveFallEmojis[Math.floor(Math.random() * loveFallEmojis.length)];
  piece.style.left = Math.random() * 95 + "%";
  piece.style.fontSize = 18 + Math.random() * 16 + "px";
  piece.style.animationDuration = duration + "s";
  confettiEl.appendChild(piece);
  setTimeout(function () {
    piece.remove();
  }, duration * 1000);
}

function spawnPetal() {
  const petal = document.createElement("span");
  const duration = 7 + Math.random() * 5;
  petal.className = "petal";
  petal.textContent = "🌸";
  petal.style.left = Math.random() * 95 + "%";
  petal.style.fontSize = 14 + Math.random() * 14 + "px";
  petal.style.animationDuration = duration + "s";
  petalsEl.appendChild(petal);
  setTimeout(function () {
    petal.remove();
  }, duration * 1000);
}

function spawnLoveWord() {
  const wordsEl = makeLayer("words");
  const word = document.createElement("span");
  const duration = 8 + Math.random() * 4;
  word.className = "love-word";
  word.textContent = loveWords[Math.floor(Math.random() * loveWords.length)];
  word.style.left = Math.random() * 55 + "%";
  word.style.fontSize = 22 + Math.random() * 16 + "px";
  word.style.animationDuration = duration + "s";
  wordsEl.appendChild(word);
  setTimeout(function () {
    word.remove();
  }, duration * 1000);
}

function growGarden() {
  const step = 56;
  const count = Math.ceil(window.innerWidth / step) + 1;
  for (let i = 0; i < count; i++) {
    const flower = document.createElement("span");
    const delay = 0.3 + i * 0.15;
    flower.className = "flower";
    flower.textContent = flowerEmojis[Math.floor(Math.random() * flowerEmojis.length)];
    flower.style.left = i * step + Math.random() * 14 - 7 + "px";
    flower.style.fontSize = 30 + Math.random() * 24 + "px";
    flower.style.animationDelay = delay + "s, " + (delay + 1.3) + "s";
    gardenEl.appendChild(flower);
  }
}

growGarden();
setInterval(spawnHeart, 600);
setInterval(spawnPetal, 800);
for (let i = 0; i < 5; i++) {
  setTimeout(spawnPetal, i * 300);
}

/* ---------- Music (one page, so it never stops) ---------- */
let audio = null;
let musicBtn = null;
let musicAvailable = true;
let musicMuted = false;

function updateMusicBtn() {
  if (!musicBtn || !audio) return;
  musicBtn.textContent = audio.paused ? "🎵" : "🔊";
  musicBtn.classList.toggle("playing", !audio.paused);
}

function startMusic(force) {
  if (!audio || !musicAvailable) return;
  if (!force && musicMuted) return;
  musicMuted = false;
  const attempt = audio.play();
  if (attempt && attempt.catch) {
    attempt.catch(function () {});
  }
}

function setupMusic() {
  audio = new Audio("song.mp3");
  audio.loop = true;
  audio.volume = 0.6;
  audio.preload = "auto";

  musicBtn = document.createElement("button");
  musicBtn.id = "musicBtn";
  musicBtn.type = "button";
  musicBtn.textContent = "🎵";
  musicBtn.setAttribute("aria-label", "Play or pause music");
  document.body.appendChild(musicBtn);

  audio.addEventListener("error", function () {
    musicAvailable = false;
    musicBtn.style.display = "none";
  });
  audio.addEventListener("play", updateMusicBtn);
  audio.addEventListener("pause", updateMusicBtn);

  musicBtn.addEventListener("click", function () {
    if (audio.paused) {
      startMusic(true);
    } else {
      musicMuted = true;
      audio.pause();
    }
  });
}

setupMusic();

/* ---------- Welcome card ---------- */
const nicknameEl = document.getElementById("nickname");
const nameBtn = document.getElementById("nameBtn");
const teddy = document.getElementById("teddy");
const teddySay = document.getElementById("teddySay");
const dogWrap = document.getElementById("dogWrap");
const dogSay = document.getElementById("dogSay");
let nameIndex = 0;
let teddyIndex = 0;
let dogTimer = null;

function dogPopUp(message) {
  if (!dogWrap || !dogSay) return;
  dogSay.textContent = message;
  dogWrap.classList.add("show");
  clearTimeout(dogTimer);
  dogTimer = setTimeout(function () {
    dogWrap.classList.remove("show");
  }, 2500);
}

if (nameBtn && nicknameEl) {
  nameBtn.addEventListener("click", function () {
    nameIndex = (nameIndex + 1) % names.length;
    nicknameEl.textContent = names[nameIndex];
    nicknameEl.classList.remove("pop");
    void nicknameEl.offsetWidth;
    nicknameEl.classList.add("pop");
    for (let i = 0; i < 8; i++) {
      spawnHeart();
    }
    dogPopUp("Woof! Hi " + names[nameIndex] + "! 🐾");
  });
}

if (teddy && teddySay) {
  teddy.addEventListener("click", function () {
    teddyIndex = (teddyIndex + 1) % teddyMessages.length;
    teddySay.textContent = teddyMessages[teddyIndex];
    teddy.classList.remove("wiggle");
    void teddy.offsetWidth;
    teddy.classList.add("wiggle");
    for (let i = 0; i < 4; i++) {
      spawnHeart();
    }
  });
}

/* ---------- Fireworks ---------- */
function startFireworks(durationMs) {
  const canvas = document.createElement("canvas");
  canvas.id = "fireworks";
  document.body.appendChild(canvas);
  const ctx = canvas.getContext("2d");
  const colors = ["#ff6b9d", "#ffd166", "#c77dff", "#ffffff", "#ff9ecb", "#7bdff2"];
  const particles = [];
  const startTime = performance.now();
  let lastBurst = 0;

  function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  resize();
  window.addEventListener("resize", resize);

  function burst(x, y) {
    const color = colors[Math.floor(Math.random() * colors.length)];
    for (let i = 0; i < 70; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = 1.5 + Math.random() * 4.5;
      particles.push({
        x: x,
        y: y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        life: 1,
        color: color
      });
    }
  }

  function frame(now) {
    const elapsed = now - startTime;
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    if (elapsed < durationMs && now - lastBurst > 450) {
      burst(
        canvas.width * (0.15 + Math.random() * 0.7),
        canvas.height * (0.12 + Math.random() * 0.4)
      );
      lastBurst = now;
    }

    for (let i = particles.length - 1; i >= 0; i--) {
      const p = particles[i];
      p.x += p.vx;
      p.y += p.vy;
      p.vy += 0.05;
      p.vx *= 0.99;
      p.life -= 0.012;
      if (p.life <= 0) {
        particles.splice(i, 1);
        continue;
      }
      ctx.globalAlpha = p.life;
      ctx.fillStyle = p.color;
      ctx.beginPath();
      ctx.arc(p.x, p.y, 2.5, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.globalAlpha = 1;

    if (elapsed < durationMs || particles.length > 0) {
      requestAnimationFrame(frame);
    } else {
      window.removeEventListener("resize", resize);
      canvas.remove();
    }
  }

  requestAnimationFrame(frame);
}

/* ---------- Surprise letter (same page) ---------- */
const welcomeCard = document.getElementById("welcomeCard");
const letterScreen = document.getElementById("letterScreen");
const surpriseBtn = document.getElementById("surpriseBtn");
const backBtn = document.getElementById("backBtn");
const letterParagraphs = document.querySelectorAll(".letter p");

let surpriseTimers = [];
let loveFallTimer = null;
let loveWordTimer = null;

function later(fn, ms) {
  surpriseTimers.push(setTimeout(fn, ms));
}

function openSurprise() {
  welcomeCard.hidden = true;
  letterScreen.hidden = false;
  document.body.classList.add("intro");
  window.scrollTo(0, 0);

  startMusic(false);

  const surprise = document.createElement("div");
  surprise.className = "surprise-text";
  surprise.textContent = "Surprise! 🎆💖";
  document.body.appendChild(surprise);

  startFireworks(4500);

  later(function () {
    surprise.remove();
    document.body.classList.remove("intro");

    letterParagraphs.forEach(function (p, i) {
      later(function () {
        p.classList.add("show");
      }, 500 + i * 900);
    });

    loveFallTimer = setInterval(spawnLoveFall, 350);
    loveWordTimer = setInterval(spawnLoveWord, 1800);
    spawnLoveWord();
  }, 3800);
}

function closeSurprise() {
  surpriseTimers.forEach(function (t) {
    clearTimeout(t);
  });
  surpriseTimers = [];
  clearInterval(loveFallTimer);
  clearInterval(loveWordTimer);

  document.querySelectorAll(".surprise-text").forEach(function (el) {
    el.remove();
  });
  document.body.classList.remove("intro");
  letterParagraphs.forEach(function (p) {
    p.classList.remove("show");
  });

  letterScreen.hidden = true;
  welcomeCard.hidden = false;
  window.scrollTo(0, 0);
}

if (surpriseBtn && backBtn && welcomeCard && letterScreen) {
  surpriseBtn.addEventListener("click", openSurprise);
  backBtn.addEventListener("click", closeSurprise);
}
/* ============================================================
   ULTRA PREMIUM CINEMATIC ROMANTIC BIRTHDAY WEBSITE
   Vanilla JavaScript – Fully Offline
   Clean, commented, production-ready
   ============================================================ */

(function () {
  'use strict';

  /* -------------------- DOM REFERENCES -------------------- */
  const cursor = document.getElementById('cursor');
  const cursorFollower = document.getElementById('cursorFollower');
  const musicBtn = document.getElementById('musicBtn');
  const bgMusic = document.getElementById('bgMusic');
  const loadingProgress = document.getElementById('loadingProgress');
  const giftContainer = document.getElementById('giftContainer');
  const giftBox = document.getElementById('giftBox');
  const explosion = document.getElementById('explosion');
  const noteInner = document.getElementById('noteInner');
  const mainVideo = document.getElementById('mainVideo');
  const endingContent = document.getElementById('endingContent');
  const fadeToBlack = document.getElementById('fadeToBlack');
  const fireworksCanvas = document.getElementById('fireworksCanvas');

  /* -------------------- STATE -------------------- */
  let musicPlaying = false;
  let currentPage = 'loading';
  let giftOpened = false;
  let noteRevealed = false;

  /* -------------------- LOVE NOTE LINES -------------------- */
  const noteLines = [
    'Happy Birthday My Beautiful Wife,',
    'My Dearest Iqra,',
    '',
    'You are the most beautiful blessing Allah has given me.',
    'You are my peace.',
    'You are my happiness.',
    'Every smile of yours makes my world brighter.',
    '',
    'Thank you for standing beside me.',
    'Thank you for believing in me.',
    '',
    'I promise to love you,',
    'respect you,',
    'protect you,',
    'care for you,',
    'every single day.',
    '',
    'May Allah always keep us together forever.',
    '',
    'Happy Birthday My Queen ❤️',
    'I Love You Forever.',
    '',
     'Love,',
     'Your Husband,',
     'Faizan ❤️'
  ];

  /* ============================================================
     UTILITY: Create elements for background effects
     ============================================================ */
  function createStars(containerId, count = 80) {
    const container = document.getElementById(containerId);
    if (!container) return;
    container.innerHTML = '';
    for (let i = 0; i < count; i++) {
      const star = document.createElement('div');
      star.className = 'star';
      const size = Math.random() * 2.5 + 0.5;
      star.style.width = size + 'px';
      star.style.height = size + 'px';
      star.style.left = Math.random() * 100 + '%';
      star.style.top = Math.random() * 100 + '%';
      star.style.setProperty('--duration', (Math.random() * 4 + 2) + 's');
      star.style.animationDelay = Math.random() * 5 + 's';
      container.appendChild(star);
    }
  }

  function createClouds(containerId, count = 5) {
    const container = document.getElementById(containerId);
    if (!container) return;
    container.innerHTML = '';
    for (let i = 0; i < count; i++) {
      const cloud = document.createElement('div');
      cloud.className = 'cloud';
      const w = Math.random() * 200 + 150;
      cloud.style.width = w + 'px';
      cloud.style.height = (w * 0.4) + 'px';
      cloud.style.top = Math.random() * 60 + '%';
      cloud.style.left = -20 + '%';
      cloud.style.animationDuration = (Math.random() * 40 + 50) + 's';
      cloud.style.animationDelay = Math.random() * 20 + 's';
      container.appendChild(cloud);
    }
  }

  function createHearts(containerId, count = 15) {
    const container = document.getElementById(containerId);
    if (!container) return;
    container.innerHTML = '';
    const hearts = ['💖', '❤️', '💕', '💗'];
    for (let i = 0; i < count; i++) {
      const heart = document.createElement('div');
      heart.className = 'heart';
      heart.textContent = hearts[Math.floor(Math.random() * hearts.length)];
      heart.style.left = Math.random() * 100 + '%';
      heart.style.fontSize = (Math.random() * 1 + 0.8) + 'rem';
      heart.style.animationDuration = (Math.random() * 8 + 10) + 's';
      heart.style.animationDelay = Math.random() * 10 + 's';
      container.appendChild(heart);
    }
  }

  function createPetals(containerId, count = 20) {
    const container = document.getElementById(containerId);
    if (!container) return;
    container.innerHTML = '';
    for (let i = 0; i < count; i++) {
      const petal = document.createElement('div');
      petal.className = 'petal';
      petal.style.left = Math.random() * 100 + '%';
      petal.style.animationDuration = (Math.random() * 8 + 8) + 's';
      petal.style.animationDelay = Math.random() * 8 + 's';
      petal.style.opacity = Math.random() * 0.5 + 0.4;
      container.appendChild(petal);
    }
  }

  function createParticles(containerId, count = 30) {
    const container = document.getElementById(containerId);
    if (!container) return;
    container.innerHTML = '';
    for (let i = 0; i < count; i++) {
      const p = document.createElement('div');
      p.className = 'particle';
      p.style.left = Math.random() * 100 + '%';
      p.style.top = Math.random() * 100 + '%';
      p.style.animationDuration = (Math.random() * 4 + 3) + 's';
      p.style.animationDelay = Math.random() * 5 + 's';
      container.appendChild(p);
    }
  }

  function createFireflies(containerId, count = 18) {
    const container = document.getElementById(containerId);
    if (!container) return;
    container.innerHTML = '';
    for (let i = 0; i < count; i++) {
      const f = document.createElement('div');
      f.className = 'firefly';
      f.style.left = Math.random() * 100 + '%';
      f.style.top = Math.random() * 100 + '%';
      f.style.animationDuration = (Math.random() * 6 + 5) + 's';
      f.style.animationDelay = Math.random() * 6 + 's';
      container.appendChild(f);
    }
  }

  /* ============================================================
     CUSTOM CURSOR
     ============================================================ */
  let mouseX = 0, mouseY = 0;
  let followerX = 0, followerY = 0;

  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    cursor.style.left = mouseX + 'px';
    cursor.style.top = mouseY + 'px';
  });

  function animateFollower() {
    followerX += (mouseX - followerX) * 0.12;
    followerY += (mouseY - followerY) * 0.12;
    cursorFollower.style.left = followerX + 'px';
    cursorFollower.style.top = followerY + 'px';
    requestAnimationFrame(animateFollower);
  }
  animateFollower();

  // Hover states
  document.addEventListener('mouseover', (e) => {
    if (e.target.closest('button, .gift-container, .photo-frame, .lux-btn')) {
      cursor.classList.add('hover');
      cursorFollower.classList.add('hover');
    }
  });
  document.addEventListener('mouseout', (e) => {
    if (e.target.closest('button, .gift-container, .photo-frame, .lux-btn')) {
      cursor.classList.remove('hover');
      cursorFollower.classList.remove('hover');
    }
  });

  // Hide cursor on touch devices
  if ('ontouchstart' in window) {
    cursor.style.display = 'none';
    cursorFollower.style.display = 'none';
    document.body.style.cursor = 'auto';
  }

  /* ============================================================
     MUSIC CONTROL – Continues across pages, never restarts
     ============================================================ */
  musicBtn.addEventListener('click', () => {
    if (!musicPlaying) {
      bgMusic.play().then(() => {
        musicPlaying = true;
        musicBtn.querySelector('.music-icon').textContent = '⏸';
        musicBtn.querySelector('.music-text').textContent = 'Pause Music';
      }).catch(() => {
        // Autoplay blocked – user gesture required (already have it)
      });
    } else {
      bgMusic.pause();
      musicPlaying = false;
      musicBtn.querySelector('.music-icon').textContent = '🎵';
      musicBtn.querySelector('.music-text').textContent = 'Play Music';
    }
  });

  /* ============================================================
     PAGE TRANSITIONS
     ============================================================ */
  function showPage(pageId) {
    const pages = document.querySelectorAll('.page');
    pages.forEach(p => p.classList.remove('active'));

    const target = document.getElementById(pageId);
    if (target) {
      // Small delay for smoother cinematic feel
      setTimeout(() => {
        target.classList.add('active');
        currentPage = pageId;
        onPageEnter(pageId);
      }, 50);
    }
  }

  function onPageEnter(pageId) {
    switch (pageId) {
      case 'pageGift':
        initGiftPage();
        break;
      case 'pageAnnounce':
        initAnnouncePage();
        break;
      case 'pageNote':
        initNotePage();
        break;
      case 'pageGallery':
        initGalleryPage();
        break;
      case 'pageVideo':
        initVideoPage();
        break;
      case 'pageEnding':
        initEndingPage();
        break;
    }
  }

  /* ============================================================
     PAGE 0 – LOADING
     ============================================================ */
  function startLoading() {
    createStars('starsLoading', 60);
    createParticles('particlesLoading', 25);

    let progress = 0;
    const interval = setInterval(() => {
      progress += Math.random() * 12 + 4;
      if (progress >= 100) {
        progress = 100;
        clearInterval(interval);
        loadingProgress.style.width = '100%';
        setTimeout(() => {
          showPage('pageGift');
          // Show music button after loading
          setTimeout(() => musicBtn.classList.add('visible'), 800);
        }, 600);
      } else {
        loadingProgress.style.width = progress + '%';
      }
    }, 180);
  }

  /* ============================================================
     PAGE 1 – GIFT
     ============================================================ */
  function initGiftPage() {
    createStars('starsGift', 100);
    createClouds('cloudsGift', 4);
    createFireflies('firefliesGift', 20);
    createPetals('petalsGift', 18);
    createParticles('particlesGift', 35);

    // Reveal title
    setTimeout(() => {
      document.querySelector('.gift-title').classList.add('show');
    }, 400);

    // Gift click handler
    giftContainer.addEventListener('click', openGift, { once: true });
  }

  function openGift() {
    if (giftOpened) return;
    giftOpened = true;

    // Open lid in 3D
    giftBox.classList.add('open');

    // Camera zoom
    giftContainer.classList.add('zoom');

    // Golden particle explosion
    createExplosion();

    // Cinematic transition after open
    setTimeout(() => {
      showPage('pageAnnounce');
    }, 2200);
  }

  function createExplosion() {
    const colors = ['#f5d76e', '#ffe9a0', '#ff6b9d', '#fff', '#c9a227'];
    for (let i = 0; i < 50; i++) {
      const p = document.createElement('div');
      p.className = 'explosion-particle';
      const angle = (Math.PI * 2 * i) / 50;
      const dist = 80 + Math.random() * 180;
      p.style.setProperty('--tx', Math.cos(angle) * dist + 'px');
      p.style.setProperty('--ty', Math.sin(angle) * dist + 'px');
      p.style.background = colors[Math.floor(Math.random() * colors.length)];
      p.style.animationDelay = Math.random() * 0.15 + 's';
      explosion.appendChild(p);
    }
    // Cleanup
    setTimeout(() => { explosion.innerHTML = ''; }, 1500);
  }

  /* ============================================================
     PAGE 2 – ANNOUNCEMENT
     ============================================================ */
  function initAnnouncePage() {
    createStars('starsAnnounce', 90);
    createClouds('cloudsAnnounce', 5);
    createHearts('heartsAnnounce', 18);
    createParticles('particlesAnnounce', 30);

    setTimeout(() => {
      document.querySelector('.announce-content').classList.add('show');
    }, 300);
  }

  document.getElementById('btnToNote').addEventListener('click', () => {
    showPage('pageNote');
  });

  /* ============================================================
     PAGE 3 – LOVE NOTE (line-by-line reveal)
     ============================================================ */
  function initNotePage() {
    createStars('starsNote', 70);
    createHearts('heartsNote', 12);
    createPetals('petalsNote', 15);

    // Build note lines
    noteInner.innerHTML = '';
    noteLines.forEach((line, idx) => {
      const div = document.createElement('div');
      div.className = 'note-line';
      if (idx >= noteLines.length - 3) div.classList.add('signature');
      div.textContent = line || '\u00A0'; // non-breaking space for empty lines
      noteInner.appendChild(div);
    });

    // Show card
    setTimeout(() => {
      document.querySelector('.note-card').classList.add('show');
      revealNoteLines();
    }, 400);
  }

  function revealNoteLines() {
    if (noteRevealed) return;
    noteRevealed = true;
    const lines = noteInner.querySelectorAll('.note-line');
    lines.forEach((line, i) => {
      setTimeout(() => {
        line.classList.add('visible');
        // After last line, show continue button
        if (i === lines.length - 1) {
          setTimeout(() => {
            const btn = document.getElementById('btnToGallery');
            btn.classList.remove('hidden');
          }, 600);
        }
      }, i * 280);
    });
  }

  document.getElementById('btnToGallery').addEventListener('click', () => {
    showPage('pageGallery');
  });

  /* ============================================================
     PAGE 4 – PHOTO GALLERY
     ============================================================ */
  function initGalleryPage() {
    createStars('starsGallery', 80);
    createParticles('particlesGallery', 30);
    createPetals('petalsGallery', 16);
    createFireflies('firefliesGallery', 14);

    setTimeout(() => {
      document.querySelector('.gallery-content').classList.add('show');
    }, 300);
  }

  document.getElementById('btnToVideo').addEventListener('click', () => {
    showPage('pageVideo');
  });

  /* ============================================================
     PAGE 5 – VIDEO (muted autoplay, no controls)
     ============================================================ */
  function initVideoPage() {
    mainVideo.currentTime = 0;
    mainVideo.muted = true;
    mainVideo.playsInline = true;

    // Attempt autoplay
    const playPromise = mainVideo.play();
    if (playPromise !== undefined) {
      playPromise.then(() => {
        mainVideo.classList.add('playing');
      }).catch(() => {
        // Fallback: still show video frame, user can interact if needed
        mainVideo.classList.add('playing');
      });
    }

    // When video ends → fade + show continue
    mainVideo.onended = () => {
      mainVideo.style.transition = 'opacity 1.5s ease';
      mainVideo.style.opacity = '0.3';
      const btn = document.getElementById('btnToEnding');
      btn.classList.remove('hidden');
    };
  }

  document.getElementById('btnToEnding').addEventListener('click', () => {
    showPage('pageEnding');
  });

  /* ============================================================
     PAGE 6 – EMOTIONAL ENDING + FIREWORKS
     ============================================================ */
  let fireworksCtx = null;
  let fireworksAnimId = null;
  let particles = [];
  let rockets = [];

  function initEndingPage() {
    createStars('starsEnding', 110);
    createFireflies('firefliesEnding', 22);
    createPetals('petalsEnding', 20);
    createParticles('particlesEnding', 40);
    createHearts('heartsEnding', 16);

    // Setup canvas
    fireworksCanvas.width = window.innerWidth;
    fireworksCanvas.height = window.innerHeight;
    fireworksCtx = fireworksCanvas.getContext('2d');

    // Soft camera zoom
    setTimeout(() => endingContent.classList.add('zoom'), 500);

    // Reveal text lines one by one
    const lines = endingContent.querySelectorAll('.ending-line');
    lines.forEach((line, i) => {
      setTimeout(() => line.classList.add('visible'), 600 + i * 700);
    });

    // Start fireworks
    startFireworks();

    // After 15 seconds → fade to black
    setTimeout(() => {
      fadeToBlack.classList.add('active');
      // Optionally stop fireworks after fade starts
      setTimeout(() => stopFireworks(), 3000);
    }, 15000);
  }

  /* ----- Fireworks Engine ----- */
  function FireworkParticle(x, y, color) {
    this.x = x;
    this.y = y;
    this.color = color;
    this.vx = (Math.random() - 0.5) * 8;
    this.vy = (Math.random() - 0.5) * 8;
    this.alpha = 1;
    this.decay = Math.random() * 0.015 + 0.008;
    this.size = Math.random() * 2.5 + 1;
  }

  FireworkParticle.prototype.update = function () {
    this.x += this.vx;
    this.y += this.vy;
    this.vy += 0.04; // gravity
    this.vx *= 0.99;
    this.alpha -= this.decay;
  };

  FireworkParticle.prototype.draw = function (ctx) {
    ctx.save();
    ctx.globalAlpha = Math.max(0, this.alpha);
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  };

  function Rocket(x, targetY) {
    this.x = x;
    this.y = window.innerHeight;
    this.targetY = targetY;
    this.vy = -(Math.random() * 4 + 9);
    this.color = ['#f5d76e', '#ff6b9d', '#ffe9a0', '#fff', '#c9a227'][Math.floor(Math.random() * 5)];
    this.exploded = false;
  }

  Rocket.prototype.update = function () {
    this.y += this.vy;
    if (this.y <= this.targetY && !this.exploded) {
      this.exploded = true;
      // Create particles
      for (let i = 0; i < 45; i++) {
        particles.push(new FireworkParticle(this.x, this.y, this.color));
      }
    }
  };

  Rocket.prototype.draw = function (ctx) {
    if (this.exploded) return;
    ctx.save();
    ctx.fillStyle = this.color;
    ctx.shadowBlur = 10;
    ctx.shadowColor = this.color;
    ctx.beginPath();
    ctx.arc(this.x, this.y, 2.5, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  };

  function startFireworks() {
    function loop() {
      fireworksCtx.fillStyle = 'rgba(2, 2, 15, 0.15)';
      fireworksCtx.fillRect(0, 0, fireworksCanvas.width, fireworksCanvas.height);

      // Launch new rockets occasionally
      if (Math.random() < 0.04) {
        rockets.push(new Rocket(
          Math.random() * window.innerWidth,
          Math.random() * window.innerHeight * 0.45 + 50
        ));
      }

      // Update & draw rockets
      for (let i = rockets.length - 1; i >= 0; i--) {
        rockets[i].update();
        rockets[i].draw(fireworksCtx);
        if (rockets[i].exploded) rockets.splice(i, 1);
      }

      // Update & draw particles
      for (let i = particles.length - 1; i >= 0; i--) {
        particles[i].update();
        particles[i].draw(fireworksCtx);
        if (particles[i].alpha <= 0) particles.splice(i, 1);
      }

      fireworksAnimId = requestAnimationFrame(loop);
    }
    loop();
  }

  function stopFireworks() {
    if (fireworksAnimId) cancelAnimationFrame(fireworksAnimId);
  }

  // Handle resize for canvas
  window.addEventListener('resize', () => {
    if (fireworksCanvas) {
      fireworksCanvas.width = window.innerWidth;
      fireworksCanvas.height = window.innerHeight;
    }
  });

  /* ============================================================
     INIT
     ============================================================ */
  document.addEventListener('DOMContentLoaded', () => {
    startLoading();
  });

})();

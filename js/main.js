/**
 * Shivam Soni Portfolio — Ultra-Interactive Engine
 * Features:
 *  1. Mouse-Reactive Particle Canvas (drifting particles connect to cursor)
 *  2. Card Mouse Spotlight Tracker (radial gradient follows mouse)
 *  3. Interactive Terminal Command Runner (predict, skills, stats, clear)
 *  4. Skills Filter System (categorized tab filtering)
 *  5. Scroll Progress Bar
 *  6. One-Click Copy-to-Clipboard & Toast Alerts
 *  7. Floating Back-to-Top Button
 *  8. Custom Glowing Follow-Cursor
 *  9. Multi-Theme Switcher (Cyber Teal, Neon Amber, Neural Purple)
 * 10. Interactive 3D Perspective Card Tilt
 * 11. Animated Number Counters
 * 12. IntersectionObserver Scroll Reveal
 */

document.addEventListener('DOMContentLoaded', () => {
  initCustomCursor();
  initThemeSwitcher();
  initScrollProgressBar();
  init3DCardTilt();
  initCardSpotlights();
  initTerminalTabsAndCommands();
  initInteractiveNetworkCanvas();
  initSkillsFilter();
  initStatCounters();
  initCopyToClipboard();
  initBackToTop();
  initNavbar();
  initScrollReveal();
  initContactForm();
  initWebAudioSFX();
  initCommandPalette();
  initProjectsFilterAndSearch();
  initShivamAIAssistant();
});

/* ==========================================================================
   1. Custom Glowing Cursor
   ========================================================================== */
function initCustomCursor() {
  const dot = document.getElementById('cursor-dot');
  const glow = document.getElementById('cursor-glow');
  if (!dot || !glow) return;

  if (window.matchMedia('(pointer: coarse)').matches) return;

  let mouseX = window.innerWidth / 2;
  let mouseY = window.innerHeight / 2;
  let glowX = mouseX;
  let glowY = mouseY;

  window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;

    dot.style.left = `${mouseX}px`;
    dot.style.top = `${mouseY}px`;
  }, { passive: true });

  function animateCursor() {
    glowX += (mouseX - glowX) * 0.18;
    glowY += (mouseY - glowY) * 0.18;

    glow.style.left = `${glowX}px`;
    glow.style.top = `${glowY}px`;

    requestAnimationFrame(animateCursor);
  }
  animateCursor();

  const interactives = document.querySelectorAll('a, button, input, textarea, .tilt-card, .chip, .badge-btn, .filter-pill-btn, .terminal-cmd-btn, .copy-btn');
  interactives.forEach(el => {
    el.addEventListener('mouseenter', () => {
      dot.style.transform = 'translate(-50%, -50%) scale(1.6)';
      glow.style.transform = 'translate(-50%, -50%) scale(1.4)';
    });
    el.addEventListener('mouseleave', () => {
      dot.style.transform = 'translate(-50%, -50%) scale(1)';
      glow.style.transform = 'translate(-50%, -50%) scale(1)';
    });
  });
}

/* ==========================================================================
   2. Multi-Theme Switcher
   ========================================================================== */
let currentThemeColor = '#4fd1c5';

function initThemeSwitcher() {
  const themeButtons = document.querySelectorAll('.theme-dot-btn');
  const savedTheme = localStorage.getItem('shivam_portfolio_theme') || 'teal';

  setTheme(savedTheme);

  themeButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const theme = btn.getAttribute('data-set-theme');
      setTheme(theme);
    });
  });

  function setTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('shivam_portfolio_theme', theme);

    themeButtons.forEach(btn => {
      btn.classList.toggle('active', btn.getAttribute('data-set-theme') === theme);
    });

    if (theme === 'teal') currentThemeColor = '#4fd1c5';
    else if (theme === 'amber') currentThemeColor = '#f59e0b';
    else if (theme === 'purple') currentThemeColor = '#a855f7';
  }
}

/* ==========================================================================
   3. Scroll Progress Bar
   ========================================================================== */
function initScrollProgressBar() {
  const bar = document.getElementById('scroll-progress-bar');
  if (!bar) return;

  window.addEventListener('scroll', () => {
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercent = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    bar.style.width = `${scrollPercent}%`;
  }, { passive: true });
}

/* ==========================================================================
   4. Card Mouse Spotlight Tracker
   ========================================================================== */
function initCardSpotlights() {
  const spotlightCards = document.querySelectorAll('.spotlight-card');

  spotlightCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      card.style.setProperty('--mouse-x', `${x}px`);
      card.style.setProperty('--mouse-y', `${y}px`);
    });
  });
}

/* ==========================================================================
   5. Interactive 3D Perspective Card Tilt
   ========================================================================== */
function init3DCardTilt() {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  if (window.matchMedia('(pointer: coarse)').matches) return;

  const tiltCards = document.querySelectorAll('.tilt-card');

  tiltCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateX = ((y - centerY) / centerY) * -6.5;
      const rotateY = ((x - centerX) / centerX) * 6.5;

      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0)';
    });
  });
}

/* ==========================================================================
   6. Multi-Tab Terminal & Quick Command Runner
   ========================================================================== */
function initTerminalTabsAndCommands() {
  const tabButtons = document.querySelectorAll('.terminal-tab-btn');
  const panes = document.querySelectorAll('.terminal-pane');
  const cmdButtons = document.querySelectorAll('.terminal-cmd-btn');
  const introPane = document.getElementById('pane-intro');

  // Tab switching
  tabButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const targetTab = btn.getAttribute('data-tab');

      tabButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      panes.forEach(pane => {
        pane.classList.toggle('active', pane.getAttribute('id') === `pane-${targetTab}`);
      });
    });
  });

  // Interactive Quick Command Executor
  cmdButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const action = btn.getAttribute('data-exec');
      
      // Auto switch to intro tab to show command execution
      tabButtons.forEach(b => b.classList.remove('active'));
      document.querySelector('.terminal-tab-btn[data-tab="intro"]').classList.add('active');
      panes.forEach(pane => pane.classList.remove('active'));
      introPane.classList.add('active');

      const resultBox = document.getElementById('terminal-result');

      if (action === 'clear') {
        resultBox.innerHTML = `
          <div class="result-row">
            <span class="result-key" style="color: var(--text-dim);">// terminal cleared</span>
          </div>
        `;
        return;
      }

      if (action === 'predict') {
        resultBox.innerHTML = `
          <div class="result-row">
            <span class="code-prompt">&gt;&gt;&gt;</span>
            <span class="code-keyword">ds.predict</span>(<span class="code-str">"hire_readiness"</span>)
          </div>
          <div class="result-row" style="margin-top: 6px;">
            <span class="result-key">confidence</span>
            <span class="result-arrow">→</span>
            <span class="result-val" style="color: #34d399; font-weight: 700;">99.8% (Ready to deploy)</span>
          </div>
          <div class="result-row">
            <span class="result-key">recommend</span>
            <span class="result-arrow">→</span>
            <span class="result-val highlight">Schedule interview with Shivam</span>
          </div>
        `;
      } else if (action === 'skills') {
        resultBox.innerHTML = `
          <div class="result-row">
            <span class="code-prompt">&gt;&gt;&gt;</span>
            <span class="code-keyword">ds.skills</span>()
          </div>
          <div class="result-row" style="margin-top: 6px;">
            <span class="result-key">core</span>
            <span class="result-arrow">→</span>
            <span class="result-val">Python, SQL, ML, OpenCV, Flask</span>
          </div>
          <div class="result-row">
            <span class="result-key">leetcode</span>
            <span class="result-arrow">→</span>
            <span class="result-val highlight">110+ Solved</span>
          </div>
        `;
      } else if (action === 'stats') {
        resultBox.innerHTML = `
          <div class="result-row">
            <span class="code-prompt">&gt;&gt;&gt;</span>
            <span class="code-keyword">ds.stats</span>()
          </div>
          <div class="result-row" style="margin-top: 6px;">
            <span class="result-key">college</span>
            <span class="result-arrow">→</span>
            <span class="result-val">Galgotias College (CGPA: 7.41)</span>
          </div>
          <div class="result-row">
            <span class="result-key">cert</span>
            <span class="result-arrow">→</span>
            <span class="result-val highlight">NPTEL IIT Madras ML Certified</span>
          </div>
        `;
      }
    });
  });

  initTerminalTypewriter();
}

function initTerminalTypewriter() {
  const outputEl = document.getElementById('typewriter-output');
  if (!outputEl) return;

  const phrases = [
    "build_models()",
    "clean_data()",
    "solve(110, 'leetcode')"
  ];

  let phraseIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let typingSpeed = 80;

  function typeLoop() {
    const currentPhrase = phrases[phraseIndex];

    if (isDeleting) {
      outputEl.textContent = currentPhrase.substring(0, charIndex - 1);
      charIndex--;
      typingSpeed = 40;
    } else {
      outputEl.textContent = currentPhrase.substring(0, charIndex + 1);
      charIndex++;
      typingSpeed = 80 + Math.random() * 30;
    }

    if (!isDeleting && charIndex === currentPhrase.length) {
      typingSpeed = 1600;
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      phraseIndex = (phraseIndex + 1) % phrases.length;
      typingSpeed = 500;
    }

    setTimeout(typeLoop, typingSpeed);
  }

  typeLoop();
}

/* ==========================================================================
   7. Mouse-Reactive Particle Network Canvas
   ========================================================================== */
function initInteractiveNetworkCanvas() {
  const canvas = document.getElementById('hero-canvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  let width, height;
  const particles = [];
  const particleCount = 42;
  const maxDistance = 145;
  const mouseDistance = 175;

  let heroMouse = { x: null, y: null };

  const heroSection = document.getElementById('hero');
  if (heroSection) {
    heroSection.addEventListener('mousemove', (e) => {
      const rect = canvas.getBoundingClientRect();
      heroMouse.x = e.clientX - rect.left;
      heroMouse.y = e.clientY - rect.top;
    });

    heroSection.addEventListener('mouseleave', () => {
      heroMouse.x = null;
      heroMouse.y = null;
    });
  }

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  class Particle {
    constructor() {
      this.x = Math.random() * width;
      this.y = Math.random() * height;
      this.vx = (Math.random() - 0.5) * 0.45;
      this.vy = (Math.random() - 0.5) * 0.45;
      this.radius = Math.random() * 1.6 + 1.2;
    }

    update() {
      if (prefersReducedMotion) return;

      this.x += this.vx;
      this.y += this.vy;

      if (this.x < 0 || this.x > width) this.vx *= -1;
      if (this.y < 0 || this.y > height) this.vy *= -1;
    }

    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      ctx.fillStyle = currentThemeColor;
      ctx.fill();
    }
  }

  function resizeCanvas() {
    width = canvas.width = canvas.parentElement.offsetWidth;
    height = canvas.height = canvas.parentElement.offsetHeight;
    
    particles.length = 0;
    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle());
    }
  }

  window.addEventListener('resize', resizeCanvas);
  resizeCanvas();

  function animate() {
    ctx.clearRect(0, 0, width, height);

    // Particle to particle connections
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const distance = Math.hypot(dx, dy);

        if (distance < maxDistance) {
          const opacity = (1 - distance / maxDistance) * 0.35;
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.strokeStyle = hexToRgba(currentThemeColor, opacity);
          ctx.lineWidth = 0.95;
          ctx.stroke();
        }
      }

      // Particle to Mouse connections (Magnetic neural effect)
      if (heroMouse.x !== null && heroMouse.y !== null) {
        const mdx = particles[i].x - heroMouse.x;
        const mdy = particles[i].y - heroMouse.y;
        const mDist = Math.hypot(mdx, mdy);

        if (mDist < mouseDistance) {
          const mOpacity = (1 - mDist / mouseDistance) * 0.55;
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(heroMouse.x, heroMouse.y);
          ctx.strokeStyle = hexToRgba(currentThemeColor, mOpacity);
          ctx.lineWidth = 1.2;
          ctx.stroke();
        }
      }
    }

    particles.forEach(p => {
      p.update();
      p.draw();
    });

    if (!prefersReducedMotion) {
      requestAnimationFrame(animate);
    }
  }

  function hexToRgba(hex, alpha) {
    const r = parseInt(hex.slice(1, 3), 16) || 79;
    const g = parseInt(hex.slice(3, 5), 16) || 209;
    const b = parseInt(hex.slice(5, 7), 16) || 197;
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  }

  animate();
}

/* ==========================================================================
   8. Skills Category Filter System
   ========================================================================== */
function initSkillsFilter() {
  const filterButtons = document.querySelectorAll('.filter-pill-btn');
  const skillCards = document.querySelectorAll('.skill-card[data-category]');

  filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      filterButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterValue = btn.getAttribute('data-filter');

      skillCards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (filterValue === 'all' || category === filterValue) {
          card.classList.remove('is-hidden');
          card.style.opacity = '0';
          setTimeout(() => { card.style.opacity = '1'; }, 40);
        } else {
          card.classList.add('is-hidden');
        }
      });
    });
  });
}

/* ==========================================================================
   9. Animated Number Counters
   ========================================================================== */
function initStatCounters() {
  const counterElements = document.querySelectorAll('[data-counter]');
  if (!counterElements.length) return;

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  counterElements.forEach(el => observer.observe(el));

  function animateCounter(el) {
    const target = parseFloat(el.getAttribute('data-counter'));
    const suffix = el.getAttribute('data-suffix') || '';
    const decimals = parseInt(el.getAttribute('data-decimals') || '0', 10);
    const duration = 1500;
    const startTime = performance.now();

    function update(now) {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easeOut = 1 - Math.pow(1 - progress, 3);
      const current = target * easeOut;

      el.textContent = current.toFixed(decimals) + suffix;

      if (progress < 1) {
        requestAnimationFrame(update);
      } else {
        el.textContent = target.toFixed(decimals) + suffix;
      }
    }

    requestAnimationFrame(update);
  }
}

/* ==========================================================================
   10. Copy-to-Clipboard & Toast Alerts
   ========================================================================== */
function initCopyToClipboard() {
  const copyButtons = document.querySelectorAll('.copy-btn');
  const toast = document.getElementById('toast-msg');
  const toastText = document.getElementById('toast-text');

  copyButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const textToCopy = btn.getAttribute('data-copy');

      if (navigator.clipboard) {
        navigator.clipboard.writeText(textToCopy).then(() => {
          showToast(`Copied "${textToCopy}" to clipboard!`);
        });
      } else {
        showToast(`Copied "${textToCopy}"`);
      }
    });
  });

  function showToast(msg) {
    if (!toast) return;
    toastText.textContent = msg;
    toast.classList.add('show');
    setTimeout(() => {
      toast.classList.remove('show');
    }, 2400);
  }
}

/* ==========================================================================
   11. Floating Back-to-Top Button
   ========================================================================== */
function initBackToTop() {
  const btn = document.getElementById('back-to-top-btn');
  if (!btn) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 400) {
      btn.classList.add('is-visible');
    } else {
      btn.classList.remove('is-visible');
    }
  }, { passive: true });

  btn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}

/* ==========================================================================
   12. Navigation & Sticky Scroll
   ========================================================================== */
function initNavbar() {
  const navbar = document.getElementById('navbar');
  const hamburgerBtn = document.getElementById('hamburger-toggle');
  const navMenu = document.getElementById('nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section[id]');

  const handleScroll = () => {
    if (window.scrollY > 20) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }

    const scrollPos = window.scrollY + 130;
    sections.forEach(section => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      const id = section.getAttribute('id');

      if (scrollPos >= top && scrollPos < top + height) {
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          }
        });
      }
    });
  };

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();

  if (hamburgerBtn && navMenu) {
    hamburgerBtn.addEventListener('click', () => {
      const isOpen = navMenu.classList.toggle('is-open');
      hamburgerBtn.textContent = isOpen ? '✕' : '☰';
      hamburgerBtn.setAttribute('aria-expanded', isOpen);
    });

    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('is-open');
        hamburgerBtn.textContent = '☰';
      });
    });

    document.addEventListener('click', (e) => {
      if (!navbar.contains(e.target) && navMenu.classList.contains('is-open')) {
        navMenu.classList.remove('is-open');
        hamburgerBtn.textContent = '☰';
      }
    });
  }
}

/* ==========================================================================
   13. Scroll Reveal via IntersectionObserver
   ========================================================================== */
function initScrollReveal() {
  const revealElements = document.querySelectorAll('.reveal');
  
  if (!('IntersectionObserver' in window)) {
    revealElements.forEach(el => el.classList.add('revealed'));
    return;
  }

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        obs.unobserve(entry.target);
      }
    });
  }, {
    rootMargin: '0px 0px -40px 0px',
    threshold: 0.12
  });

  revealElements.forEach(el => observer.observe(el));
}

/* ==========================================================================
   14. Contact Form Handler
   ========================================================================== */
function initContactForm() {
  const form = document.getElementById('portfolio-contact-form');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    const name = document.getElementById('form-name').value;
    const email = document.getElementById('form-email').value;
    const message = document.getElementById('form-message').value;

    const subject = encodeURIComponent(`Portfolio Inquiry from ${name}`);
    const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`);

    window.location.href = `mailto:shivam301102@gmail.com?subject=${subject}&body=${body}`;
    e.preventDefault();
  });
}


/* ==========================================================================
   15. Web Audio Interactive Sound Effects (SFX)
   ========================================================================== */
let sfxEnabled = localStorage.getItem('shivam_sfx') !== 'false';
let audioCtx = null;

function getAudioContext() {
  if (!audioCtx) {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (AudioContext) {
      audioCtx = new AudioContext();
    }
  }
  if (audioCtx && audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  return audioCtx;
}

function playTone(freq, type = 'sine', duration = 0.05, gainValue = 0.04) {
  if (!sfxEnabled) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  try {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = type;
    osc.frequency.setValueAtTime(freq, ctx.currentTime);

    gain.gain.setValueAtTime(gainValue, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + duration);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start();
    osc.stop(ctx.currentTime + duration);
  } catch (e) {
    // AudioContext fallback
  }
}

function playSfxClick() {
  playTone(880, 'triangle', 0.04, 0.05);
}

function playSfxHover() {
  playTone(380, 'sine', 0.02, 0.015);
}

function playSfxSuccess() {
  if (!sfxEnabled) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  try {
    const now = ctx.currentTime;
    const osc1 = ctx.createOscillator();
    const osc2 = ctx.createOscillator();
    const gain = ctx.createGain();

    osc1.frequency.setValueAtTime(523.25, now); // C5
    osc2.frequency.setValueAtTime(659.25, now + 0.08); // E5

    gain.gain.setValueAtTime(0.05, now);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.25);

    osc1.connect(gain);
    osc2.connect(gain);
    gain.connect(ctx.destination);

    osc1.start(now);
    osc1.stop(now + 0.08);
    osc2.start(now + 0.08);
    osc2.stop(now + 0.25);
  } catch(e) {}
}

function playSfxOpen() {
  playTone(440, 'sine', 0.08, 0.04);
}

function initWebAudioSFX() {
  const soundBtn = document.getElementById('sound-toggle-btn');
  const iconOn = document.getElementById('sound-icon-on');
  const iconOff = document.getElementById('sound-icon-off');

  function updateIcons() {
    if (!iconOn || !iconOff) return;
    if (sfxEnabled) {
      iconOn.classList.remove('is-hidden');
      iconOff.classList.add('is-hidden');
      if (soundBtn) soundBtn.title = "Sound Effects: ON (Click to mute)";
    } else {
      iconOn.classList.add('is-hidden');
      iconOff.classList.remove('is-hidden');
      if (soundBtn) soundBtn.title = "Sound Effects: OFF (Click to unmute)";
    }
  }

  updateIcons();

  if (soundBtn) {
    soundBtn.addEventListener('click', () => {
      sfxEnabled = !sfxEnabled;
      localStorage.setItem('shivam_sfx', sfxEnabled ? 'true' : 'false');
      updateIcons();
      if (sfxEnabled) playSfxSuccess();
    });
  }

  // Attach sound to interactive buttons
  const soundTargets = document.querySelectorAll('button, .btn-primary, .btn-secondary, .badge-btn, .nav-link, .theme-dot-btn');
  soundTargets.forEach(el => {
    el.addEventListener('click', () => playSfxClick());
    el.addEventListener('mouseenter', () => playSfxHover());
  });
}

/* ==========================================================================
   16. Command Palette (Ctrl + K / Cmd + K)
   ========================================================================== */
function initCommandPalette() {
  const overlay = document.getElementById('cmd-palette-overlay');
  const input = document.getElementById('cmd-palette-input');
  const resultsContainer = document.getElementById('cmd-palette-results');
  const triggerBtn = document.getElementById('cmd-palette-trigger');

  if (!overlay || !input || !resultsContainer) return;

  const commands = [
    // Navigation
    { title: 'Go to About Section', category: 'Navigation', icon: '👤', action: () => scrollToSection('about') },
    { title: 'Go to Technical Skills', category: 'Navigation', icon: '⚡', action: () => scrollToSection('skills') },
    { title: 'Go to Education & Academics', category: 'Navigation', icon: '🎓', action: () => scrollToSection('education') },
    { title: 'Go to Experience & Internships', category: 'Navigation', icon: '💼', action: () => scrollToSection('experience') },
    { title: 'Go to Featured Projects', category: 'Navigation', icon: '🚀', action: () => scrollToSection('projects') },
        // Verified Certificates
    { title: 'View NPTEL Machine Learning Certificate - IIT Madras (PDF)', category: 'Certificates', icon: '🎓', action: () => window.open('assets/certificates/nptel-iit-madras-machine-learning.pdf', '_blank') },
    { title: 'View Oracle Cloud AI Certified Associate (PDF)', category: 'Certificates', icon: '🏆', action: () => window.open('assets/certificates/oracle-cloud-ai-foundations.pdf', '_blank') },
    { title: 'View Infosys Java Fundamentals Certificate (PDF)', category: 'Certificates', icon: '☕', action: () => window.open('assets/certificates/infosys-java-programming-fundamentals.pdf', '_blank') },
    { title: 'View Infosys HTML Advanced Certificate (PDF)', category: 'Certificates', icon: '🌐', action: () => window.open('assets/certificates/infosys-html-advanced.pdf', '_blank') },
    { title: 'View CodSoft Internship Offer Letter (PDF)', category: 'Certificates', icon: '💼', action: () => window.open('assets/certificates/codsoft-internship-offer-letter.pdf', '_blank') },
    { title: 'Go to Awards & Certifications', category: 'Navigation', icon: '🎖️', action: () => scrollToSection('awards') },

    { title: 'Go to Contact', category: 'Navigation', icon: '📬', action: () => scrollToSection('contact') },

        // Featured Projects
    { title: 'SnapClass AI Attendance (Live Streamlit)', category: 'Projects', icon: '📸', action: () => window.open('https://snapclass-attendance-gcet.streamlit.app/', '_blank') },
    { title: 'SnapClass GitHub Repository', category: 'GitHub', icon: '🐙', action: () => window.open('https://github.com/Shivam95800/SnapClass-Attendance', '_blank') },
    { title: 'Homely Hub Booking Platform (Live Vercel)', category: 'Projects', icon: '🏡', action: () => window.open('https://homely-hub-omega.vercel.app/', '_blank') },
    { title: 'Homely Hub GitHub Repository', category: 'GitHub', icon: '🐙', action: () => window.open('https://github.com/Shivam95800/HomelyHub', '_blank') },
    { title: 'AI Text Summarization Web App (Live Render)', category: 'Projects', icon: '📝', action: () => window.open('https://text-summarization-app-i2dm.onrender.com/', '_blank') },
    { title: 'AI Text Summarization GitHub Repository', category: 'GitHub', icon: '🐙', action: () => window.open('https://github.com/Shivam95800/TEXT_SUMMARIZATION', '_blank') },
    { title: 'AI Personal Assistant (Live Render)', category: 'Projects', icon: '🤖', action: () => window.open('https://ai-personal-assistant-2-tl0h.onrender.com/', '_blank') },
    { title: 'Online Quiz Platform (Live Vercel)', category: 'Projects', icon: '⚡', action: () => window.open('https://online-quiz-platform-two.vercel.app', '_blank') },
    { title: 'Rural Health Awareness Chatbot (Live Vercel)', category: 'Projects', icon: '🩺', action: () => window.open('https://chatbot-1-liart.vercel.app', '_blank') },
    { title: 'Modern Product Landing Page (Live Vercel)', category: 'Projects', icon: '💻', action: () => window.open('https://codsoft-2-omega.vercel.app', '_blank') },
    { title: 'Smart Calculator (Live Vercel)', category: 'Projects', icon: '🧮', action: () => window.open('https://codsoft-3-iota.vercel.app', '_blank') },
    { title: 'Java DSA & Algorithms Repository', category: 'Projects', icon: '☕', action: () => window.open('https://github.com/Shivam95800/dsa', '_blank') },

    // Themes
    { title: 'Switch to Cyber Teal Theme', category: 'Theme', icon: '🟢', action: () => setTheme('teal') },
    { title: 'Switch to Neon Amber Theme', category: 'Theme', icon: '🟡', action: () => setTheme('amber') },
    { title: 'Switch to Neural Purple Theme', category: 'Theme', icon: '🟣', action: () => setTheme('purple') },

    // Quick Actions
    { title: 'Download Resume (PDF)', category: 'Action', icon: '📄', action: () => downloadResume() },
    { title: 'Copy Email Address (shivam301102@gmail.com)', category: 'Action', icon: '📋', action: () => copyEmail() },
    { title: 'Open GitHub Profile', category: 'Social', icon: '🐙', action: () => window.open('https://github.com/Shivam95800', '_blank') },
    { title: 'Open LinkedIn Profile', category: 'Social', icon: '💼', action: () => window.open('https://www.linkedin.com/in/shivamsonitech', '_blank') },
    { title: 'Ask Shivam AI Assistant', category: 'Assistant', icon: '🤖', action: () => openAIAssistant() },
    { title: 'Toggle Audio SFX (Sound Effects)', category: 'Audio', icon: '🔊', action: () => document.getElementById('sound-toggle-btn')?.click() }
  ];

  let selectedIndex = 0;
  let filteredCommands = [...commands];

  function openPalette() {
    overlay.classList.add('open');
    overlay.setAttribute('aria-hidden', 'false');
    input.value = '';
    renderResults(commands);
    playSfxOpen();
    setTimeout(() => input.focus(), 50);
  }

  function closePalette() {
    overlay.classList.remove('open');
    overlay.setAttribute('aria-hidden', 'true');
  }

  function scrollToSection(id) {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
    closePalette();
  }

  function setTheme(theme) {
    const btn = document.querySelector(`[data-set-theme="${theme}"]`);
    if (btn) btn.click();
    closePalette();
  }

  function downloadResume() {
    const resumeBtn = document.getElementById('btn-download-resume');
    if (resumeBtn) resumeBtn.click();
    closePalette();
  }

  function copyEmail() {
    navigator.clipboard.writeText('shivam301102@gmail.com');
    const toast = document.getElementById('toast-msg');
    const toastText = document.getElementById('toast-text');
    if (toast && toastText) {
      toastText.textContent = "Copied shivam301102@gmail.com!";
      toast.classList.add('show');
      setTimeout(() => toast.classList.remove('show'), 2500);
    }
    playSfxSuccess();
    closePalette();
  }

  function openAIAssistant() {
    closePalette();
    const bubble = document.getElementById('ai-chat-bubble');
    if (bubble) bubble.click();
  }

  function renderResults(list) {
    filteredCommands = list;
    selectedIndex = 0;
    resultsContainer.innerHTML = '';

    if (list.length === 0) {
      resultsContainer.innerHTML = '<div style="padding: 24px; text-align: center; color: var(--text-dim);">No matching commands found.</div>';
      return;
    }

    let currentCat = '';
    list.forEach((cmd, idx) => {
      if (cmd.category !== currentCat) {
        currentCat = cmd.category;
        const groupEl = document.createElement('div');
        groupEl.className = 'cmd-palette-group-title';
        groupEl.textContent = currentCat;
        resultsContainer.appendChild(groupEl);
      }

      const itemEl = document.createElement('div');
      itemEl.className = `cmd-palette-item ${idx === selectedIndex ? 'active' : ''}`;
      itemEl.innerHTML = `
        <div class="cmd-palette-item-left">
          <span class="cmd-palette-item-icon">${cmd.icon}</span>
          <span>${cmd.title}</span>
        </div>
        <span class="cmd-palette-item-badge">${cmd.category}</span>
      `;

      itemEl.addEventListener('click', () => {
        playSfxClick();
        cmd.action();
      });

      resultsContainer.appendChild(itemEl);
    });
  }

  input.addEventListener('input', (e) => {
    const q = e.target.value.toLowerCase().trim();
    if (!q) {
      renderResults(commands);
      return;
    }
    const matches = commands.filter(c => 
      c.title.toLowerCase().includes(q) || 
      c.category.toLowerCase().includes(q)
    );
    renderResults(matches);
  });

  input.addEventListener('keydown', (e) => {
    const items = resultsContainer.querySelectorAll('.cmd-palette-item');
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (items.length > 0) {
        items[selectedIndex]?.classList.remove('active');
        selectedIndex = (selectedIndex + 1) % items.length;
        items[selectedIndex]?.classList.add('active');
        items[selectedIndex]?.scrollIntoView({ block: 'nearest' });
        playSfxHover();
      }
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (items.length > 0) {
        items[selectedIndex]?.classList.remove('active');
        selectedIndex = (selectedIndex - 1 + items.length) % items.length;
        items[selectedIndex]?.classList.add('active');
        items[selectedIndex]?.scrollIntoView({ block: 'nearest' });
        playSfxHover();
      }
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (filteredCommands[selectedIndex]) {
        playSfxClick();
        filteredCommands[selectedIndex].action();
      }
    } else if (e.key === 'Escape') {
      closePalette();
    }
  });

  // Hotkey: Ctrl+K / Cmd+K
  window.addEventListener('keydown', (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
      e.preventDefault();
      if (overlay.classList.contains('open')) {
        closePalette();
      } else {
        openPalette();
      }
    } else if (e.key === 'Escape' && overlay.classList.contains('open')) {
      closePalette();
    }
  });

  if (triggerBtn) {
    triggerBtn.addEventListener('click', openPalette);
  }

  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) closePalette();
  });
}

/* ==========================================================================
   17. Interactive Projects Filter & Search
   ========================================================================== */
function initProjectsFilterAndSearch() {
  const filterBtns = document.querySelectorAll('.project-filter-btn');
  const searchInput = document.getElementById('project-search-input');
  const cards = document.querySelectorAll('.project-card');
  const emptyState = document.getElementById('projects-empty-state');

  if (!filterBtns.length || !cards.length) return;

  let activeFilter = 'all';
  let searchTerm = '';

  function applyFilter() {
    let visibleCount = 0;

    cards.forEach(card => {
      const category = card.getAttribute('data-category') || '';
      const tags = card.getAttribute('data-tags') || '';
      const title = card.querySelector('.project-title')?.textContent.toLowerCase() || '';
      const desc = card.querySelector('.project-desc')?.textContent.toLowerCase() || '';

      const matchesCategory = (activeFilter === 'all') || category.includes(activeFilter);
      const matchesSearch = !searchTerm || 
        title.includes(searchTerm) || 
        desc.includes(searchTerm) || 
        tags.toLowerCase().includes(searchTerm);

      if (matchesCategory && matchesSearch) {
        card.classList.remove('is-hidden');
        card.style.opacity = '1';
        card.style.transform = 'translateY(0)';
        visibleCount++;
      } else {
        card.classList.add('is-hidden');
      }
    });

    if (emptyState) {
      if (visibleCount === 0) {
        emptyState.classList.remove('is-hidden');
      } else {
        emptyState.classList.add('is-hidden');
      }
    }
  }

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      activeFilter = btn.getAttribute('data-filter');
      playSfxClick();
      applyFilter();
    });
  });

  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      searchTerm = e.target.value.toLowerCase().trim();
      applyFilter();
    });
  }
}

/* ==========================================================================
   18. Ask Shivam AI Chatbot Assistant
   ========================================================================== */
function initShivamAIAssistant() {
  const bubble = document.getElementById('ai-chat-bubble');
  const modal = document.getElementById('ai-chat-modal');
  const closeBtn = document.getElementById('ai-chat-close-btn');
  const chatBody = document.getElementById('ai-chat-body');
  const form = document.getElementById('ai-chat-form');
  const input = document.getElementById('ai-chat-input');

  if (!bubble || !modal || !form || !input) return;

  function toggleChat() {
    const isOpen = modal.classList.contains('open');
    if (isOpen) {
      modal.classList.remove('open');
      modal.setAttribute('aria-hidden', 'true');
    } else {
      modal.classList.add('open');
      modal.setAttribute('aria-hidden', 'false');
      playSfxOpen();
      setTimeout(() => input.focus(), 100);
    }
  }

  bubble.addEventListener('click', toggleChat);
  if (closeBtn) closeBtn.addEventListener('click', toggleChat);

  function appendUserMessage(text) {
    const msgEl = document.createElement('div');
    msgEl.className = 'ai-msg user';
    msgEl.innerHTML = `<div class="ai-msg-bubble">${escapeHtml(text)}</div>`;
    chatBody.appendChild(msgEl);
    chatBody.scrollTop = chatBody.scrollHeight;
  }

  function appendBotMessage(html) {
    const msgEl = document.createElement('div');
    msgEl.className = 'ai-msg bot';
    msgEl.innerHTML = `<div class="ai-msg-bubble">${html}</div>`;
    chatBody.appendChild(msgEl);
    chatBody.scrollTop = chatBody.scrollHeight;
    playSfxSuccess();
  }

  function escapeHtml(str) {
    return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  }

  function getBotResponse(rawQuery) {
    const q = rawQuery.toLowerCase();

    if (q.includes('who is') || q.includes('about') || q.includes('intro') || q.includes('shivam')) {
      return `<strong>Shivam Soni</strong> is a final-year <strong>B.Tech CSE (Data Science)</strong> student at <strong>Galgotias College of Engineering and Technology</strong> (Graduating 2027). He specializes in Python, Machine Learning, SQL, and Full-Stack Development, with 110+ LeetCode problems solved!`;
    }

    if (q.includes('project') || q.includes('work') || q.includes('portfolio') || q.includes('snapclass') || q.includes('homely')) {
      return `Here are Shivam's flagship deployed projects:<br><br>
      • 📸 <strong>SnapClass AI Attendance:</strong> Face & voice verification system built with Python & Streamlit.<br>
      • 🏡 <strong>Homely Hub:</strong> Full-stack accommodation booking app (React, Express, MongoDB).<br>
      • 📝 <strong>AI Text Summarization:</strong> NLP article distillation tool deployed on Render.<br>
      • 🤖 <strong>AI Personal Assistant:</strong> Intelligent desktop/web assistant.<br><br>
      <a href="#projects" onclick="document.getElementById('ai-chat-close-btn').click();" style="color:var(--accent); text-decoration:underline;">Click here to view all projects →</a>`;
    }

    if (q.includes('skill') || q.includes('tech') || q.includes('language') || q.includes('stack')) {
      return `Shivam's primary technical skills:<br><br>
      • <strong>Languages:</strong> Python, Java, JavaScript, SQL, C<br>
      • <strong>AI / ML:</strong> OpenCV, NLP, Scikit-Learn, Streamlit<br>
      • <strong>Web & DB:</strong> React, Node.js, Express, Flask, MongoDB, HTML/CSS<br>
      • <strong>Problem Solving:</strong> 110+ LeetCode problems solved with a focus on Data Structures & Algorithms.`;
    }

    if (q.includes('college') || q.includes('cgpa') || q.includes('education') || q.includes('graduat')) {
      return `🎓 <strong>Education:</strong><br><br>
      • <strong>College:</strong> Galgotias College of Engineering and Technology, Greater Noida<br>
      • <strong>Degree:</strong> B.Tech in Computer Science & Engineering (Data Science)<br>
      • <strong>Current CGPA:</strong> 7.41 / 10.0<br>
      • <strong>Graduation Year:</strong> 2027`;
    }

    if (q.includes('resume') || q.includes('cv') || q.includes('download')) {
      return `📄 You can download Shivam's official resume right now:<br><br>
      <a href="assets/resume.pdf" download="Shivam_Soni_Resume.pdf" class="badge-btn" style="display:inline-flex; margin-top:4px; padding:4px 12px; background:var(--accent); color:var(--bg-ink); font-weight:600; border-radius:12px;">📥 Download Resume (PDF)</a>`;
    }

    if (q.includes('contact') || q.includes('email') || q.includes('hire') || q.includes('reach') || q.includes('phone')) {
      return `📬 You can connect with Shivam directly:<br><br>
      • <strong>Email:</strong> <a href="mailto:shivam301102@gmail.com" style="color:var(--accent);">shivam301102@gmail.com</a><br>
      • <strong>LinkedIn:</strong> <a href="https://www.linkedin.com/in/shivamsonitech" target="_blank" style="color:var(--accent);">linkedin.com/in/shivamsonitech</a><br>
      • <strong>GitHub:</strong> <a href="https://github.com/Shivam95800" target="_blank" style="color:var(--accent);">github.com/Shivam95800</a>`;
    }

    if (q.includes('leetcode') || q.includes('dsa') || q.includes('algorithm')) {
      return `💡 Shivam has solved <strong>110+ Data Structures & Algorithms problems</strong> on LeetCode across Arrays, Two Pointers, Trees, Graphs, and Dynamic Programming in Java and Python.`;
    }

    if (q.includes('hi') || q.includes('hello') || q.includes('hey')) {
      return `Hello! How can I help you learn more about Shivam's work today? Try asking about his <strong>projects</strong>, <strong>skills</strong>, or <strong>resume</strong>!`;
    }

    return `Thanks for asking! Shivam is an aspiring software engineer and data scientist graduating in 2027. You can check his <a href="#projects" onclick="document.getElementById('ai-chat-close-btn').click();" style="color:var(--accent);">Projects</a>, download his <a href="assets/resume.pdf" style="color:var(--accent);">Resume</a>, or email him at <a href="mailto:shivam301102@gmail.com" style="color:var(--accent);">shivam301102@gmail.com</a>.`;
  }

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const query = input.value.trim();
    if (!query) return;

    appendUserMessage(query);
    input.value = '';
    playSfxClick();

    // Simulated typing delay
    setTimeout(() => {
      const reply = getBotResponse(query);
      appendBotMessage(reply);
    }, 450);
  });

  // Pill click triggers
  chatBody.addEventListener('click', (e) => {
    const pill = e.target.closest('.ai-pill');
    if (pill) {
      const prompt = pill.getAttribute('data-prompt');
      if (prompt) {
        appendUserMessage(prompt);
        playSfxClick();
        setTimeout(() => {
          const reply = getBotResponse(prompt);
          appendBotMessage(reply);
        }, 350);
      }
    }
  });
}

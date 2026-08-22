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

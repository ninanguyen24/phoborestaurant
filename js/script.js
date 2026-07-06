// ============================================
// Pho Bo Restaurant — shared behavior
// ============================================

document.addEventListener('DOMContentLoaded', () => {
  initHeaderScroll();
  initNavToggle();
  initHeroSlideshow();
  initMenuTabs();
  markActiveNavLink();
});

/* Solid header once the page scrolls past the dark band at the top —
   the full-height rotating hero on Home, or the shorter page-hero
   band on Menu/Contact. Both start dark, so the header starts
   transparent with light text and solidifies the same way on every page. */
function initHeaderScroll() {
  const header = document.querySelector('.site-header');
  if (!header) return;

  const toggleSolid = () => {
    if (window.scrollY > 80) {
      header.classList.add('is-solid');
    } else {
      header.classList.remove('is-solid');
    }
  };
  toggleSolid();
  window.addEventListener('scroll', toggleSolid, { passive: true });
}

/* Mobile nav open/close */
function initNavToggle() {
  const toggle = document.querySelector('.nav-toggle');
  const nav = document.querySelector('.main-nav');
  if (!toggle || !nav) return;

  toggle.addEventListener('click', () => {
    nav.classList.toggle('is-open');
  });

  nav.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => nav.classList.remove('is-open'));
  });
}

/* Highlight the current page's nav link */
function markActiveNavLink() {
  const current = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.main-nav a').forEach(link => {
    const href = link.getAttribute('href');
    if (href === current || (current === '' && href === 'index.html')) {
      link.classList.add('is-active');
    }
  });
}

/* Crossfading hero slideshow — pulls slide URLs from data-bg attributes
   set on each .hero-slide element, so swapping in real photos later is
   just a matter of editing the image paths in index.html. */
function initHeroSlideshow() {
  const slides = document.querySelectorAll('.hero-slide');
  if (slides.length < 2) return;

  let index = 0;
  const interval = 5000;

  setInterval(() => {
    slides[index].classList.remove('is-active');
    index = (index + 1) % slides.length;
    slides[index].classList.add('is-active');
  }, interval);
}

/* Menu tab filter — shows/hides whole .menu-group sections by data-group */
function initMenuTabs() {
  const tabs = document.querySelectorAll('.menu-tab');
  const groups = document.querySelectorAll('.menu-group');
  if (!tabs.length) return;

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('is-active'));
      tab.classList.add('is-active');

      const target = tab.dataset.target;
      groups.forEach(group => {
        group.style.display = (target === 'all' || group.dataset.group === target) ? '' : 'none';
      });

      document.querySelector('.menu-tabs')
        ?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });
}

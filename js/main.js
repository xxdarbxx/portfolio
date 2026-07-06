// Mobile nav toggle
const menuBtn = document.querySelector('.menu-btn');
const navLinks = document.querySelector('.navlinks');
if (menuBtn && navLinks) {
  menuBtn.addEventListener('click', () => {
    navLinks.classList.toggle('open');
    menuBtn.innerHTML = navLinks.classList.contains('open') ? '<i class="fas fa-times"></i>' : '<i class="fas fa-bars"></i>';
  });
  navLinks.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
    navLinks.classList.remove('open');
    menuBtn.innerHTML = '<i class="fas fa-bars"></i>';
  }));
}

// Scroll reveal
const revealEls = document.querySelectorAll('.reveal');
if ('IntersectionObserver' in window && revealEls.length) {
  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
    });
  }, { threshold: 0.12 });
  revealEls.forEach(el => io.observe(el));
} else {
  revealEls.forEach(el => el.classList.add('in'));
}

// Animated skill bars
const skillBars = document.querySelectorAll('.skill__bar i');
if ('IntersectionObserver' in window && skillBars.length) {
  const io2 = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.style.width = e.target.dataset.pct + '%';
        io2.unobserve(e.target);
      }
    });
  }, { threshold: 0.3 });
  skillBars.forEach(el => io2.observe(el));
}

// Animated counters
const counters = document.querySelectorAll('[data-count]');
if ('IntersectionObserver' in window && counters.length) {
  const io3 = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (!e.isIntersecting) return;
      io3.unobserve(e.target);
      const el = e.target;
      const target = parseInt(el.dataset.count, 10);
      const suffix = el.dataset.suffix || '';
      const dur = 1200;
      const start = performance.now();
      function tick(now) {
        const p = Math.min(1, (now - start) / dur);
        el.textContent = Math.round(target * (1 - Math.pow(1 - p, 3))) + suffix;
        if (p < 1) requestAnimationFrame(tick);
      }
      requestAnimationFrame(tick);
    });
  }, { threshold: 0.4 });
  counters.forEach(el => io3.observe(el));
}

// Active nav link highlighting based on scroll position (for pages with in-page sections)
const sections = document.querySelectorAll('main section[id]');
const navAnchors = document.querySelectorAll('.navlinks a[href^="#"], .navlinks a[href*="index.html#"]');
if (sections.length && navAnchors.length) {
  const io4 = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        navAnchors.forEach(a => {
          const hash = '#' + e.target.id;
          a.classList.toggle('active', a.getAttribute('href').endsWith(hash));
        });
      }
    });
  }, { rootMargin: '-40% 0px -50% 0px' });
  sections.forEach(s => io4.observe(s));
}

// Scroll-to-top button
const topBtn = document.querySelector('.scrolltop');
if (topBtn) {
  window.addEventListener('scroll', () => {
    topBtn.classList.toggle('show', window.scrollY > 500);
  });
}

// ---------------- Lightbox ----------------
(function () {
  let groupImages = [];
  let currentIndex = 0;

  const lb = document.createElement('div');
  lb.className = 'lightbox';
  lb.innerHTML = `
    <button class="lightbox__close" aria-label="Close"><i class="fas fa-times"></i></button>
    <button class="lightbox__prev" aria-label="Previous"><i class="fas fa-chevron-left"></i></button>
    <img alt="">
    <button class="lightbox__next" aria-label="Next"><i class="fas fa-chevron-right"></i></button>
    <div class="lightbox__caption"></div>
  `;
  document.body.appendChild(lb);
  const lbImg = lb.querySelector('img');
  const lbCaption = lb.querySelector('.lightbox__caption');

  function openAt(index) {
    currentIndex = index;
    const item = groupImages[currentIndex];
    lbImg.src = item.src;
    lbImg.alt = item.alt || '';
    lbCaption.textContent = item.alt ? `${item.alt} — ${currentIndex + 1} / ${groupImages.length}` : `${currentIndex + 1} / ${groupImages.length}`;
    lb.classList.add('open');
  }

  document.addEventListener('click', (e) => {
    const thumb = e.target.closest('[data-lightbox]');
    if (!thumb) return;
    const group = thumb.closest('[data-lightbox-group]') || document;
    groupImages = Array.from(group.querySelectorAll('[data-lightbox]')).map(t => ({
      src: t.dataset.full || t.querySelector('img').src,
      alt: t.dataset.caption || t.querySelector('img').alt
    }));
    const all = Array.from(group.querySelectorAll('[data-lightbox]'));
    openAt(all.indexOf(thumb));
  });

  lb.querySelector('.lightbox__close').addEventListener('click', () => lb.classList.remove('open'));
  lb.addEventListener('click', (e) => { if (e.target === lb) lb.classList.remove('open'); });
  lb.querySelector('.lightbox__prev').addEventListener('click', () => openAt((currentIndex - 1 + groupImages.length) % groupImages.length));
  lb.querySelector('.lightbox__next').addEventListener('click', () => openAt((currentIndex + 1) % groupImages.length));
  document.addEventListener('keydown', (e) => {
    if (!lb.classList.contains('open')) return;
    if (e.key === 'Escape') lb.classList.remove('open');
    if (e.key === 'ArrowLeft') openAt((currentIndex - 1 + groupImages.length) % groupImages.length);
    if (e.key === 'ArrowRight') openAt((currentIndex + 1) % groupImages.length);
  });
})();

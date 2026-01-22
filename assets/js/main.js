// Main interactions: page transitions, scroll reveal, sliders, filters, nav
(function () {
  // Page enter
  document.body.classList.add('page-enter');
  requestAnimationFrame(() => document.body.classList.add('in'));

  // Page link transition
  document.querySelectorAll('a[href]').forEach(a => {
    const href = a.getAttribute('href');
    if (!href || href.startsWith('#') || href.startsWith('mailto:') || href.startsWith('http')) return;
    a.addEventListener('click', e => {
      e.preventDefault();
      const to = a.href;
      document.body.classList.add('page-exit', 'fade-out');
      setTimeout(() => window.location = to, 420);
    });
  });

  // Reveal on scroll
  const obs = new IntersectionObserver((entries) => {
    entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('in-view'); });
  }, { threshold: 0.12 });
  document.querySelectorAll('.reveal').forEach(el => obs.observe(el));

  // Testimonials simple slider
  (function () {
    const items = document.querySelectorAll('.test-item');
    const dotsWrap = document.createElement('div');
    dotsWrap.className = 'test-controls';
    if (!items.length) return;
    let idx = 0;
    items.forEach((it, i) => {
      const d = document.createElement('div'); d.className = 'dot'; if (i === 0) d.classList.add('active'); dotsWrap.appendChild(d);
      d.addEventListener('click', () => { items[idx].classList.remove('active'); dotsWrap.children[idx].classList.remove('active'); idx = i; items[idx].classList.add('active'); d.classList.add('active'); });
    });
    const parent = items[0].closest('.testimonials') || document.querySelector('.test-slider');
    if (parent) parent.appendChild(dotsWrap);
    setInterval(() => {
      items[idx].classList.remove('active'); dotsWrap.children[idx].classList.remove('active');
      idx = (idx + 1) % items.length;
      items[idx].classList.add('active'); dotsWrap.children[idx].classList.add('active');
    }, 4200);
  })();

  // Typed hero text
  (function () {
    const el = document.getElementById('typed');
    if (!el) return;
    const words = ['Performance Marketing', 'SEO & Content', 'Social Media', 'ORM & Reviews', 'Conversion Optimization'];
    let i = 0, j = 0, forward = true;
    function tick() {
      const w = words[i];
      el.textContent = w.slice(0, j);
      if (forward) { j++; if (j > w.length) { forward = false; setTimeout(tick, 900); return } }
      else { j--; if (j === 0) { forward = true; i = (i + 1) % words.length; setTimeout(tick, 300); return } }
      setTimeout(tick, forward ? 60 : 30);
    }
    tick();
  })();

  // Stats counter
  (function () {
    const stats = document.querySelectorAll('.stat strong');
    stats.forEach(s => {
      const target = parseInt(s.textContent.replace('+', '')) || 0; s.textContent = '0';
      const obs = new IntersectionObserver(entries => { if (entries[0].isIntersecting) { let val = 0; const step = Math.max(1, Math.floor(target / 60)); const t = setInterval(() => { val += step; if (val >= target) { s.textContent = target + (s.textContent.includes('+') ? '+' : ''); clearInterval(t) } else s.textContent = val; }, 16); obs.disconnect(); } }, { threshold: 0.5 });
      obs.observe(s);
    });
  })();

  // Services: staggered entrance + tilt hover
  (function () {
    const cards = document.querySelectorAll('.service-card[data-anim]');
    if (!cards.length) return;
    const obs = new IntersectionObserver((entries, o) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          const list = Array.from(cards);
          list.forEach((c, i) => {
            c.style.animationDelay = (i * 100) + 'ms';
            c.classList.add('animate-in');
          });
          o.disconnect();
        }
      });
    }, { threshold: 0.18 });
    obs.observe(cards[0]);

    // Tilt effect
    cards.forEach(card => {
      card.addEventListener('mousemove', (ev) => {
        const rect = card.getBoundingClientRect();
        const x = (ev.clientX - rect.left) / rect.width - 0.5;
        const y = (ev.clientY - rect.top) / rect.height - 0.5;
        const rx = (y * 10) * -1; const ry = (x * 14);
        card.style.transform = `perspective(900px) rotateX(${rx}deg) rotateY(${ry}deg) translateZ(0)`;
      });
      card.addEventListener('mouseleave', () => {
        card.style.transform = 'none';
      });
    });
  })();

  // Stagger reveal for services circular grid if present
  (function () {
    const items = document.querySelectorAll('.services-grid .services-item');
    if (!items.length) return;
    items.forEach((it, i) => { it.style.transition = 'transform .5s ease, opacity .5s ease'; it.style.transform = 'translateY(18px)'; it.style.opacity = '0'; });
    const first = document.querySelector('.services-grid');
    if (!first) return;
    const o = new IntersectionObserver((entries, ob) => {
      if (entries[0].isIntersecting) {
        items.forEach((it, i) => { setTimeout(() => { it.style.transform = 'none'; it.style.opacity = '1'; }, i * 120); });
        ob.disconnect();
      }
    }, { threshold: 0.15 });
    o.observe(first);
  })();

  // Stagger reveal for portfolio items with data-anim
  (function () {
    const items = document.querySelectorAll('.portfolio-item[data-anim]');
    if (!items.length) return;
    const grid = document.querySelector('.portfolio-grid');
    if (!grid) return;
    const o = new IntersectionObserver((entries, ob) => {
      if (entries[0].isIntersecting) {
        items.forEach((it, i) => { setTimeout(() => { it.classList.add('animate-in'); }, i * 120); });
        ob.disconnect();
      }
    }, { threshold: 0.01 });
    o.observe(grid);
  })();

  // Robot interactivity: blink and follow cursor slightly
  (function () {
    const robot = document.getElementById('robot');
    if (!robot) return;
    const eyeL = document.getElementById('eye-left');
    const eyeR = document.getElementById('eye-right');
    const face = document.getElementById('robot-face');
    const leftArm = document.getElementById('left-arm');
    const rightArm = document.getElementById('right-arm');

    // Blink every 3-6s
    function blink() {
      if (!eyeL || !eyeR) return;
      eyeL.style.transform = 'scaleY(0.18)'; eyeR.style.transform = 'scaleY(0.18)';
      setTimeout(() => { eyeL.style.transform = 'scaleY(1)'; eyeR.style.transform = 'scaleY(1)'; }, 120);
      setTimeout(blink, 3000 + Math.random() * 3000);
    }
    setTimeout(blink, 1200);

    // slight head/arm follow on mousemove
    const wrap = document.querySelector('.hero-visual');
    if (wrap) {
      wrap.addEventListener('mousemove', e => {
        const r = wrap.getBoundingClientRect();
        const cx = (e.clientX - r.left) / r.width - 0.5;
        const cy = (e.clientY - r.top) / r.height - 0.5;
        const rx = cy * 6; const ry = cx * 8;
        if (face) face.style.transform = `rotateX(${-rx}deg) rotateY(${ry}deg)`;
        if (leftArm) leftArm.style.transform = `translate(40px,140px) rotate(${-ry}deg)`;
        if (rightArm) rightArm.style.transform = `translate(220px,140px) rotate(${-ry}deg)`;
      });
      wrap.addEventListener('mouseleave', () => {
        if (face) face.style.transform = 'none';
        if (leftArm) leftArm.style.transform = 'translate(40px,140px)';
        if (rightArm) rightArm.style.transform = 'translate(220px,140px)';
      });
    }
  })();

  // Portfolio filters with staggered animations
  (function () {
    const filters = document.querySelectorAll('.filter-btn');
    const items = document.querySelectorAll('.portfolio-item');
    if (!filters.length) return;
    filters.forEach(btn => btn.addEventListener('click', () => {
      filters.forEach(b => b.classList.remove('active')); btn.classList.add('active');
      const f = btn.dataset.filter;
      items.forEach((i, idx) => {
        const matches = (f === 'all' || i.dataset.cat === f);
        if (matches) {
          setTimeout(() => {
            i.style.display = 'block';
            setTimeout(() => i.classList.add('animate-in'), 10);
          }, idx * 100);
        } else {
          i.classList.remove('animate-in');
          setTimeout(() => i.style.display = 'none', 150);
        }
      });
    }));
  })();

  // Contact form (fake send + animation)
  const form = document.getElementById('contactForm');
  if (form) form.addEventListener('submit', e => {
    e.preventDefault();
    const btn = form.querySelector('button');
    btn.textContent = 'Sending...';
    setTimeout(() => { btn.textContent = 'Sent ✓'; form.reset(); setTimeout(() => btn.textContent = 'Send Message', 1200) }, 1200);
  });

  // Mobile nav
  const navToggle = document.querySelector('.nav-toggle');
  if (navToggle) {
    navToggle.addEventListener('click', () => {
      document.querySelector('.nav').classList.toggle('open');
    });
  }

  // Highlight active nav link
  (function () {
    const page = document.body.dataset.page;
    if (!page) return;
    document.querySelectorAll('.nav a').forEach(a => {
      if (a.getAttribute('href').includes(page)) a.classList.add('active');
    });
  })();

})();

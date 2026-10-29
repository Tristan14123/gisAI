/* ============================================================
   GeoAI Assistant — Interactions
   ============================================================ */

/* ---------- reveal on scroll ---------- */
const io = new IntersectionObserver((entries) => {
  entries.forEach((e) => {
    if (e.isIntersecting) {
      e.target.classList.add('in');
      io.unobserve(e.target);
    }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

function bindReveal() {
  document.querySelectorAll('.reveal').forEach((el) => io.observe(el));
}

/* ---------- counters ---------- */
function animateNumber(el) {
  const target = parseFloat(el.dataset.count);
  const suffix = el.dataset.suffix || '';
  const prefix = el.dataset.prefix || '';
  const dur = 1400;
  const start = performance.now();
  function frame(now) {
    const t = Math.min((now - start) / dur, 1);
    const eased = 1 - Math.pow(1 - t, 3);
    el.textContent = prefix + (target * eased).toFixed(target % 1 ? 1 : 0) + suffix;
    if (t < 1) requestAnimationFrame(frame);
  }
  requestAnimationFrame(frame);
}

const numIO = new IntersectionObserver((entries) => {
  entries.forEach((e) => {
    if (e.isIntersecting) { animateNumber(e.target); numIO.unobserve(e.target); }
  });
}, { threshold: 0.4 });

function bindCounters() {
  document.querySelectorAll('[data-count]').forEach((el) => numIO.observe(el));
}

/* ---------- animated bar charts ---------- */
const barIO = new IntersectionObserver((entries) => {
  entries.forEach((e) => {
    if (!e.isIntersecting) return;
    const fill = e.target;
    const val = fill.dataset.val;
    fill.style.width = '0%';
    requestAnimationFrame(() => {
      requestAnimationFrame(() => { fill.style.width = val + '%'; });
    });
    barIO.unobserve(fill);
  });
}, { threshold: 0.3 });

function bindBars() {
  document.querySelectorAll('.bar-fill').forEach((el) => barIO.observe(el));
}

/* ---------- donut (SVG stroke animation) ---------- */
const donutIO = new IntersectionObserver((entries) => {
  entries.forEach((e) => {
    if (!e.isIntersecting) return;
    const ring = e.target.querySelector('.donut-ring');
    if (!ring) return;
    const target = parseFloat(ring.dataset.pct);
    const circ = 2 * Math.PI * 70; // r=70
    ring.style.strokeDasharray = circ;
    ring.style.strokeDashoffset = circ;
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        ring.style.transition = 'stroke-dashoffset 1.5s cubic-bezier(.22,1,.36,1)';
        ring.style.strokeDashoffset = circ * (1 - target / 100);
      });
    });
    donutIO.unobserve(e.target);
  });
}, { threshold: 0.3 });

function bindDonuts() {
  document.querySelectorAll('.donut').forEach((el) => donutIO.observe(el));
}

/* ---------- architecture diagram: pulse along the flow ---------- */
function bindFlow() {
  const nodes = document.querySelectorAll('.flow-node');
  if (!nodes.length) return;
  const seq = [
    'n-user', 'n-qgis', 'n-router', 'n-rag', 'n-model', 'n-tools', 'n-validate', 'n-qgis'
  ];
  let i = 0;
  setInterval(() => {
    nodes.forEach((n) => n.classList.remove('pulse'));
    const id = seq[i % seq.length];
    const el = document.getElementById(id);
    if (el) el.classList.add('pulse');
    i++;
  }, 1100);
}

/* ---------- tabs for configurations ---------- */
function bindTabs() {
  const tabs = document.querySelectorAll('[data-tab]');
  if (!tabs.length) return;
  tabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      const group = tab.dataset.tab;
      const target = tab.dataset.target;
      document.querySelectorAll(`[data-tab="${group}"]`).forEach((t) => t.classList.remove('active'));
      tab.classList.add('active');
      document.querySelectorAll(`[data-panel="${group}"]`).forEach((p) => {
        p.classList.toggle('active', p.dataset.key === target);
      });
    });
  });
}

/* ---------- mobile nav ---------- */
function bindBurger() {
  const b = document.querySelector('.burger');
  if (!b) return;
  b.addEventListener('click', () => {
    document.body.classList.toggle('menu-open');
  });
  document.querySelectorAll('.nav-links a').forEach((a) => {
    a.addEventListener('click', () => document.body.classList.remove('menu-open'));
  });
}

/* ---------- smooth active nav highlight ---------- */
function bindScrollSpy() {
  const links = document.querySelectorAll('.nav-links a[href^="#"]');
  const map = {};
  links.forEach((l) => { map[l.getAttribute('href').slice(1)] = l; });
  const spy = () => {
    const y = window.scrollY + 120;
    let current = null;
    Object.keys(map).forEach((id) => {
      const el = document.getElementById(id);
      if (el && el.offsetTop <= y) current = id;
    });
    links.forEach((l) => l.classList.remove('active'));
    if (current && map[current]) map[current].classList.add('active');
  };
  window.addEventListener('scroll', spy, { passive: true });
  spy();
}

/* ---------- boot ---------- */
document.addEventListener('DOMContentLoaded', () => {
  bindReveal();
  bindCounters();
  bindBars();
  bindDonuts();
  bindFlow();
  bindTabs();
  bindBurger();
  bindScrollSpy();
});

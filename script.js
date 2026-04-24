/* ── THEME TOGGLE ── */
const root = document.documentElement;
const toggleBtn = document.getElementById('theme-toggle');

const LIGHT = {
    '--black': '#0a0a0a',
    '--white': '#f5f4f0',
    '--red': '#d62828',
    '--gray': '#888',
    '--light': '#e8e7e3',
    '--surface': '#ebebeb',
    '--border': 'rgba(10,10,10,0.12)',
    '--grid': '1px solid rgba(10,10,10,0.07)',
    '--body-text': '#333',
    '--muted-text': '#555',
    '--nav-bg': 'rgba(245,244,240,0.92)',
};

const DARK = {
    '--black': '#e8e6e0',
    '--white': '#111110',
    '--red': '#e03535',
    '--gray': '#666',
    '--light': '#1e1e1c',
    '--surface': '#181817',
    '--border': 'rgba(232,230,224,0.1)',
    '--grid': '1px solid rgba(232,230,224,0.05)',
    '--body-text': '#888',
    '--muted-text': '#666',
    '--nav-bg': 'rgba(17,17,16,0.92)',
};

// let isDark = false;

// function applyTheme(dark) {
//     const vars = dark ? DARK : LIGHT;
//     Object.entries(vars).forEach(([k, v]) => root.style.setProperty(k, v));
//     toggleBtn.textContent = dark ? '☀' : '☾';
//     toggleBtn.title = dark ? 'Switch to light mode' : 'Switch to dark mode';
//     ring.style.borderColor = dark
//         ? 'rgba(232,230,224,0.35)'
//         : 'rgba(10,10,10,0.35)';
//     isDark = dark;
// }

// toggleBtn.addEventListener('click', () => applyTheme(!isDark));
// applyTheme(false);

/* ── CURSOR (trailing ring only, normal OS cursor) ── */
const dot  = document.getElementById('cursor-dot');
const ring = document.getElementById('cursor-ring');
let mx = 0, my = 0, rx = 0, ry = 0;

document.addEventListener('mousemove', e => {
    mx = e.clientX;
    my = e.clientY;
    dot.style.transform = `translate(${mx}px,${my}px)`;
});

(function animRing() {
    rx += (mx - rx) * 0.12;
    ry += (my - ry) * 0.12;
    ring.style.transform = `translate(${rx}px,${ry}px)`;
    requestAnimationFrame(animRing);
})();

document.querySelectorAll('a, button, .project-card, .clink').forEach(el => {
    el.addEventListener('mouseenter', () => ring.classList.add('expand'));
    el.addEventListener('mouseleave', () => ring.classList.remove('expand'));
});

/* ── SCROLL REVEAL ── */
const reveals = document.querySelectorAll('.section-header, .about-left, .about-right, .skill-col, .project-card, .contact-left, .contact-right, .proj-placeholder');
reveals.forEach(el => el.classList.add('sr'));

const observer = new IntersectionObserver(entries => {
    entries.forEach(e => {
        if (e.isIntersecting) {
            e.target.classList.add('sr-visible');
            observer.unobserve(e.target);
        }
    });
}, { threshold: 0.1 });

reveals.forEach(el => observer.observe(el));

/* ── NAV SCROLL SPY ── */
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a');

const spyObserver = new IntersectionObserver(entries => {
    entries.forEach(e => {
        if (e.isIntersecting) {
            navLinks.forEach(a => a.classList.remove('active'));
            const active = document.querySelector(`.nav-links a[href="#${e.target.id}"]`);
            if (active) active.classList.add('active');
        }
    });
}, { rootMargin: '-40% 0px -50% 0px' });

sections.forEach(s => spyObserver.observe(s));

/* ── TYPEWRITER on hero name ── */
const nameEl = document.querySelector('.hero-name');
const lines  = ['Adwaith', 'Sunil'];
nameEl.innerHTML = '';

const first = document.createElement('span');
first.style.display = 'block';
nameEl.appendChild(first);

const second = document.createElement('span');
second.style.display = 'block';
second.style.color = 'var(--red)';
nameEl.appendChild(second);

let charIdx = 0, lineIdx = 0;
const targets = [first, second];

function type() {
    const word = lines[lineIdx];
    if (charIdx <= word.length) {
        targets[lineIdx].textContent = word.slice(0, charIdx);
        charIdx++;
        setTimeout(type, lineIdx === 0 ? 80 : 90);
    } else if (lineIdx === 0) {
        lineIdx = 1; charIdx = 0;
        setTimeout(type, 180);
    }
}
setTimeout(type, 400);

/* ── PROJECT CARD TILT ── */
document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('mousemove', e => {
        const r = card.getBoundingClientRect();
        const x = (e.clientX - r.left) / r.width  - 0.5;
        const y = (e.clientY - r.top)  / r.height - 0.5;
        card.style.transform = `perspective(800px) rotateY(${x * 4}deg) rotateX(${-y * 2}deg)`;
    });
    card.addEventListener('mouseleave', () => {
        card.style.transform = '';
    });
});

/* ── NAV HIDE/SHOW ON SCROLL ── */
let lastY = 0;
const nav = document.querySelector('nav');
window.addEventListener('scroll', () => {
    const cur = window.scrollY;
    if (cur > lastY && cur > 100) nav.style.transform = 'translateY(-100%)';
    else nav.style.transform = 'translateY(0)';
    lastY = cur;
}, { passive: true });

// for google sites
window.addEventListener('load', () => {
    window.parent.postMessage({ height: document.body.scrollHeight }, '*');
});
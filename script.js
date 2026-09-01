
const toggle = document.querySelector('.menu-toggle');
const mobileNav = document.querySelector('.mobile-nav');

if (toggle && mobileNav) {
  toggle.addEventListener('click', () => {
    const open = toggle.getAttribute('aria-expanded') === 'true';
    toggle.setAttribute('aria-expanded', String(!open));
    mobileNav.hidden = open;
    document.body.classList.toggle('menu-open', !open);
  });

  mobileNav.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      mobileNav.hidden = true;
      toggle.setAttribute('aria-expanded', 'false');
      document.body.classList.remove('menu-open');
    });
  });
}

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) entry.target.classList.add('visible');
  });
}, { threshold: 0.08 });

document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

const navLinks = [...document.querySelectorAll('.desktop-nav a')];
const sections = [...document.querySelectorAll('main section[id]')];

window.addEventListener('scroll', () => {
  let current = 'inicio';
  sections.forEach(section => {
    if (window.scrollY >= section.offsetTop - 180) current = section.id;
  });
  navLinks.forEach(link => {
    link.classList.toggle('active', link.getAttribute('href') === '#' + current);
  });
}, { passive: true });

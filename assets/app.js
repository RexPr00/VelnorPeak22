const body = document.body;

function trapFocus(container, event) {
  const focusables = container.querySelectorAll('a, button, input, [tabindex]:not([tabindex="-1"])');
  const list = [...focusables].filter((el) => !el.disabled);
  if (!list.length) return;
  const first = list[0];
  const last = list[list.length - 1];
  if (event.shiftKey && document.activeElement === first) {
    event.preventDefault();
    last.focus();
  } else if (!event.shiftKey && document.activeElement === last) {
    event.preventDefault();
    first.focus();
  }
}

const lang = document.querySelector('.lang');
const langToggle = document.querySelector('.lang-toggle');
if (lang && langToggle) {
  langToggle.addEventListener('click', () => lang.classList.toggle('open'));
  document.addEventListener('click', (e) => {
    if (!lang.contains(e.target)) lang.classList.remove('open');
  });
}

const burger = document.querySelector('.burger');
const drawer = document.querySelector('.drawer');
const drawerPanel = document.querySelector('.drawer-panel');
const drawerClose = document.querySelector('.drawer-close');

function closeDrawer() {
  if (!drawer) return;
  drawer.classList.remove('open');
  body.style.overflow = '';
  burger?.setAttribute('aria-expanded', 'false');
}

if (burger && drawer && drawerPanel) {
  burger.addEventListener('click', () => {
    drawer.classList.add('open');
    body.style.overflow = 'hidden';
    burger.setAttribute('aria-expanded', 'true');
    drawerClose?.focus();
  });
  drawerClose?.addEventListener('click', closeDrawer);
  drawer.addEventListener('click', (e) => {
    if (e.target === drawer) closeDrawer();
  });
  drawer.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeDrawer();
    if (e.key === 'Tab') trapFocus(drawerPanel, e);
  });
}

const faqItems = document.querySelectorAll('.faq-item');
faqItems.forEach((item) => {
  const btn = item.querySelector('.faq-question');
  btn?.addEventListener('click', () => {
    faqItems.forEach((other) => {
      if (other !== item) other.classList.remove('open');
    });
    item.classList.toggle('open');
  });
});

const modal = document.querySelector('.modal');
const openPrivacy = document.querySelectorAll('[data-open-privacy]');
const closePrivacy = document.querySelectorAll('[data-close-privacy]');
const modalCard = document.querySelector('.modal-card');

function closeModal() {
  modal?.classList.remove('open');
  body.style.overflow = '';
}

openPrivacy.forEach((btn) => btn.addEventListener('click', (e) => {
  e.preventDefault();
  modal?.classList.add('open');
  body.style.overflow = 'hidden';
  modal?.querySelector('.icon-btn')?.focus();
}));

closePrivacy.forEach((btn) => btn.addEventListener('click', closeModal));

modal?.addEventListener('click', (e) => {
  if (e.target === modal) closeModal();
});

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    closeModal();
    closeDrawer();
    lang?.classList.remove('open');
  }
  if (e.key === 'Tab' && modal?.classList.contains('open') && modalCard) {
    trapFocus(modalCard, e);
  }
});

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.style.transform = 'translateY(0)';
      entry.target.style.opacity = '1';
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.card, .form-card, .visual-card, .review-card').forEach((el) => {
  el.style.transform = 'translateY(12px)';
  el.style.opacity = '1';
  el.style.transition = 'transform .35s ease';
  observer.observe(el);
});

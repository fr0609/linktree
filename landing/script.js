(function () {
  const phone = '15551234567';
  const defaultMsg = 'Hi! I\'m interested in training at FitLife Gym. I came from your website.';
  const waLink = `https://wa.me/${phone}?text=${encodeURIComponent(defaultMsg)}`;

  function setWhatsAppLinks() {
    const ids = ['nav-whatsapp', 'hero-whatsapp', 'services-whatsapp', 'about-whatsapp', 'cta-whatsapp'];
    ids.forEach((id) => {
      const a = document.getElementById(id);
      if (a) a.href = waLink;
    });
  }

  function setYear() {
    const yearEl = document.getElementById('year');
    if (yearEl) yearEl.textContent = new Date().getFullYear();
  }

  function setupNavToggle() {
    const toggle = document.querySelector('.nav-toggle');
    const nav = document.getElementById('nav');
    if (!toggle || !nav) return;
    const update = (open) => {
      nav.classList.toggle('open', open);
      toggle.setAttribute('aria-expanded', String(open));
    };
    let isOpen = false;
    toggle.addEventListener('click', () => {
      isOpen = !isOpen; update(isOpen);
    });
    document.addEventListener('click', (e) => {
      if (!isOpen) return;
      const target = e.target;
      if (target && !nav.contains(target) && !toggle.contains(target)) {
        isOpen = false; update(false);
      }
    });
  }

  function setupAboutSlider() {
    const slider = document.querySelector('.about__slider');
    if (!slider) return;
    const slides = Array.from(slider.querySelectorAll('.slide'));
    const prev = slider.querySelector('.prev');
    const next = slider.querySelector('.next');
    const dotsWrap = slider.querySelector('.dots');
    const dots = slides.map((_, i) => {
      const d = document.createElement('button');
      d.className = 'dot' + (i === 0 ? ' is-active' : '');
      d.setAttribute('aria-label', `Ir a la imagen ${i+1}`);
      d.addEventListener('click', () => show(i));
      dotsWrap?.appendChild(d);
      return d;
    });
    let index = slides.findIndex((s) => s.classList.contains('is-active'));
    if (index < 0) index = 0, slides[0]?.classList.add('is-active');

    function show(i) {
      slides[index].classList.remove('is-active');
      index = (i + slides.length) % slides.length;
      slides[index].classList.add('is-active');
      if (dots.length) {
        dots.forEach((d) => d.classList.remove('is-active'));
        dots[index].classList.add('is-active');
      }
    }
    prev?.addEventListener('click', () => show(index - 1));
    next?.addEventListener('click', () => show(index + 1));

    // autoplay
    let timer = setInterval(() => show(index + 1), 3000);
    slider.addEventListener('mouseenter', () => clearInterval(timer));
    slider.addEventListener('mouseleave', () => { timer = setInterval(() => show(index + 1), 3000); });
  }

  document.addEventListener('DOMContentLoaded', function () {
    setWhatsAppLinks();
    setYear();
    setupNavToggle();
    setupAboutSlider();
  });
})();



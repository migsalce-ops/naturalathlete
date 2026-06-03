(function () {
  'use strict';

  // Mobile nav toggle
  const toggle = document.querySelector('.nav-toggle');
  const mobile = document.querySelector('.nav-mobile');
  if (toggle && mobile) {
    toggle.addEventListener('click', function () {
      const open = mobile.classList.toggle('open');
      mobile.hidden = !open;
      toggle.setAttribute('aria-expanded', String(open));
    });
    mobile.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () {
        mobile.classList.remove('open');
        mobile.hidden = true;
        toggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // Year in footer
  const year = document.getElementById('year');
  if (year) year.textContent = String(new Date().getFullYear());

  // Shop filters
  const filterBtns = document.querySelectorAll('.filter-btn');
  const products = document.querySelectorAll('.product');
  if (filterBtns.length && products.length) {
    filterBtns.forEach(function (btn) {
      btn.addEventListener('click', function () {
        const filter = btn.getAttribute('data-filter');
        filterBtns.forEach(function (b) {
          b.classList.remove('is-active');
          b.setAttribute('aria-pressed', 'false');
        });
        btn.classList.add('is-active');
        btn.setAttribute('aria-pressed', 'true');
        products.forEach(function (p) {
          const cats = (p.getAttribute('data-category') || '').split(' ');
          const show = filter === 'all' || cats.indexOf(filter) !== -1;
          p.classList.toggle('is-hidden', !show);
        });
      });
    });
  }

  // Reveal on scroll for cards + pillars
  if ('IntersectionObserver' in window) {
    const targets = document.querySelectorAll('.card, .pillar, .bio-block p, .product, .steps li');
    targets.forEach(function (el) {
      el.style.opacity = '0';
      el.style.transform = 'translateY(16px)';
      el.style.transition = 'opacity .6s ease, transform .6s ease';
    });
    const io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) {
          e.target.style.opacity = '1';
          e.target.style.transform = 'translateY(0)';
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.15 });
    targets.forEach(function (el) { io.observe(el); });
  }
})();

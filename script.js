(function () {
  'use strict';

  // Mobile nav toggle
  var toggle = document.querySelector('.nav-toggle');
  var mobile = document.querySelector('.nav-mobile');
  if (toggle && mobile) {
    toggle.addEventListener('click', function () {
      var open = mobile.classList.toggle('open');
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

  // Footer year
  var year = document.getElementById('year');
  if (year) year.textContent = String(new Date().getFullYear());

  // Shop filters
  var filterBtns = document.querySelectorAll('.filter-btn');
  var products = document.querySelectorAll('.product');
  if (filterBtns.length && products.length) {
    filterBtns.forEach(function (btn) {
      btn.addEventListener('click', function () {
        var filter = btn.getAttribute('data-filter');
        filterBtns.forEach(function (b) {
          b.classList.remove('is-active');
          b.setAttribute('aria-pressed', 'false');
        });
        btn.classList.add('is-active');
        btn.setAttribute('aria-pressed', 'true');
        products.forEach(function (p) {
          var cats = (p.getAttribute('data-category') || '').split(' ');
          var show = filter === 'all' || cats.includes(filter);
          p.classList.toggle('is-hidden', !show);
        });
      });
    });
  }

  // Email signup — show success message on submit
  document.querySelectorAll('form.signup').forEach(function (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var input = form.querySelector('input[type="email"]');
      var btn = form.querySelector('button[type="submit"]');
      var email = (input.value || '').trim();
      if (!email) return;
      var orig = btn.textContent;
      btn.textContent = '...';
      btn.disabled = true;
      setTimeout(function () {
        input.value = '';
        btn.textContent = orig;
        btn.disabled = false;
        var msg = form.parentNode.querySelector('.signup-msg');
        if (!msg) {
          msg = document.createElement('p');
          msg.className = 'signup-msg success';
          form.insertAdjacentElement('afterend', msg);
        }
        msg.textContent = "You're on the list.";
        msg.className = 'signup-msg success';
      }, 700);
    });
  });

  // Graceful image fallback — mark parent when an image fails so CSS can show a branded placeholder
  document.querySelectorAll('img').forEach(function (img) {
    var handle = function () {
      if (img.dataset.fallback === '1') return;
      img.dataset.fallback = '1';
      var parent = img.parentNode;
      if (parent) parent.classList.add('img-missing');
      img.style.visibility = 'hidden';
    };
    if (img.complete && img.naturalWidth === 0) {
      handle();
    } else {
      img.addEventListener('error', handle);
    }
  });

  // Scroll reveal — CSS class-based so hover transforms are not overridden
  if ('IntersectionObserver' in window) {
    var prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!prefersReduced) {
      var targets = document.querySelectorAll('.card, .pillar, .bio-block p, .product, .steps li');
      targets.forEach(function (el) { el.classList.add('reveal'); });
      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (e) {
          if (e.isIntersecting) {
            e.target.classList.add('is-visible');
            io.unobserve(e.target);
          }
        });
      }, { threshold: 0.1 });
      targets.forEach(function (el) { io.observe(el); });
    }
  }
})();

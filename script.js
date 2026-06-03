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

  // Email signup
  // To activate real collection: uncomment the fetch block below and set SUPABASE_URL + SUPABASE_ANON_KEY
  var SUPABASE_URL  = '';
  var SUPABASE_ANON = '';

  function showSignupMsg(form, type, text) {
    var msg = form.parentNode.querySelector('.signup-msg');
    if (!msg) {
      msg = document.createElement('p');
      form.insertAdjacentElement('afterend', msg);
    }
    msg.className = 'signup-msg ' + type;
    msg.textContent = text;
  }

  document.querySelectorAll('form.signup').forEach(function (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var input = form.querySelector('input[type="email"]');
      var btn   = form.querySelector('button[type="submit"]');
      var email = (input.value || '').trim();
      if (!email) return;

      var orig = btn.textContent;
      btn.textContent = '...';
      btn.disabled = true;

      function done(ok) {
        input.value = '';
        btn.textContent = orig;
        btn.disabled = false;
        if (ok) {
          showSignupMsg(form, 'success', "You're on the list.");
        } else {
          showSignupMsg(form, 'error', 'Something went wrong. Try again.');
        }
      }

      if (SUPABASE_URL && SUPABASE_ANON) {
        fetch(SUPABASE_URL + '/rest/v1/subscribers', {
          method: 'POST',
          headers: {
            'apikey': SUPABASE_ANON,
            'Authorization': 'Bearer ' + SUPABASE_ANON,
            'Content-Type': 'application/json',
            'Prefer': 'resolution=ignore-duplicates'
          },
          body: JSON.stringify({ email: email, source: window.location.pathname })
        })
          .then(function (r) { done(r.ok); })
          .catch(function () { done(false); });
      } else {
        setTimeout(function () { done(true); }, 700);
      }
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

  // Full-page smoke animation
  (function () {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    var canvas = document.createElement('canvas');
    canvas.className = 'smoke-bg';
    canvas.setAttribute('aria-hidden', 'true');
    document.body.appendChild(canvas);

    var ctx = canvas.getContext('2d');
    var W = 0, H = 0;

    function resize() {
      W = canvas.width  = window.innerWidth;
      H = canvas.height = window.innerHeight;
    }
    resize();
    window.addEventListener('resize', resize, { passive: true });

    var MAX = 55;
    var list = [];

    function rand(a, b) { return a + Math.random() * (b - a); }

    function spawn(stagger) {
      var red = Math.random() < 0.12;
      return {
        x:    rand(0, W),
        y:    rand(H * 0.6, H * 1.2),
        vx:   rand(-0.22, 0.22),
        vy:   rand(-0.55, -0.14),
        r:    rand(80, 260),
        peak: rand(0.05, 0.15),
        life: stagger ? (Math.random() * 420) | 0 : 0,
        span: (rand(200, 460)) | 0,
        r1:   red ? 255 : (rand(180, 235) | 0),
        g1:   red ?  59 : (rand(180, 235) | 0),
        b1:   red ?  47 : (rand(180, 235) | 0)
      };
    }

    for (var i = 0; i < MAX; i++) list.push(spawn(true));

    function tick() {
      ctx.clearRect(0, 0, W, H);
      for (var i = 0; i < list.length; i++) {
        var p = list[i];
        p.life++;
        p.x += p.vx;
        p.y += p.vy;
        p.r  += 0.1;
        var t = p.life / p.span;
        var a = p.peak * Math.sin(t * Math.PI);
        if (a > 0.002) {
          var g = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.r);
          g.addColorStop(0,    'rgba(' + p.r1 + ',' + p.g1 + ',' + p.b1 + ',' + a.toFixed(3) + ')');
          g.addColorStop(0.5,  'rgba(' + p.r1 + ',' + p.g1 + ',' + p.b1 + ',' + (a * 0.28).toFixed(3) + ')');
          g.addColorStop(1,    'rgba(' + p.r1 + ',' + p.g1 + ',' + p.b1 + ',0)');
          ctx.fillStyle = g;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
          ctx.fill();
        }
        if (p.life >= p.span) list[i] = spawn(false);
      }
      requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  }());

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

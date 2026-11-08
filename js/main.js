/* =====================================================================
   RISTORANTE SERAFINA — shared interactions (vanilla JS, no deps)
   ===================================================================== */
(function () {
  'use strict';
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---- Intro overlay (home only, once per session) ---------------- */
  var intro = document.querySelector('.intro');
  if (intro) {
    var seen = false;
    try { seen = sessionStorage.getItem('serafina_intro') === '1'; } catch (e) {}
    if (seen || reduce) {
      intro.parentNode && intro.parentNode.removeChild(intro);
    } else {
      document.body.style.overflow = 'hidden';
      window.setTimeout(function () {
        intro.classList.add('hide');
        document.body.style.overflow = '';
        try { sessionStorage.setItem('serafina_intro', '1'); } catch (e) {}
        window.setTimeout(function () { intro.parentNode && intro.parentNode.removeChild(intro); }, 950);
      }, 2200);
    }
  }

  /* ---- Nav overlay (three-line Menu button) ----------------------- */
  var menuBtn = document.querySelector('#menuBtn');
  var menuClose = document.querySelector('#menuClose');
  var navmenu = document.querySelector('#navmenu');
  if (menuBtn && navmenu) {
    var openMenu = function () {
      navmenu.classList.add('open');
      navmenu.setAttribute('aria-hidden', 'false');
      menuBtn.setAttribute('aria-expanded', 'true');
      document.body.classList.add('menu-open');
    };
    var closeMenu = function () {
      navmenu.classList.remove('open');
      navmenu.setAttribute('aria-hidden', 'true');
      menuBtn.setAttribute('aria-expanded', 'false');
      document.body.classList.remove('menu-open');
    };
    menuBtn.addEventListener('click', openMenu);
    if (menuClose) menuClose.addEventListener('click', closeMenu);
    navmenu.querySelectorAll('.navmenu__links a').forEach(function (a) {
      a.addEventListener('click', closeMenu);
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && navmenu.classList.contains('open')) closeMenu();
    });
    // mark the current page as active inside the overlay
    var here = (location.pathname.split('/').pop() || 'index.html').toLowerCase();
    navmenu.querySelectorAll('.navmenu__links a').forEach(function (a) {
      var href = (a.getAttribute('href') || '').toLowerCase();
      if (href === here || (here === '' && href === 'index.html')) a.classList.add('active');
    });
  }

  /* ---- Header shrink on scroll ------------------------------------ */
  var header = document.querySelector('.header');
  if (header) {
    var onScroll = function () { header.classList.toggle('scrolled', window.scrollY > 24); };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
  }

  /* ---- Scroll reveal --------------------------------------------- */
  var reveals = document.querySelectorAll('.reveal');
  if (reveals.length) {
    if (reduce || !('IntersectionObserver' in window)) {
      reveals.forEach(function (el) { el.classList.add('is-visible'); });
    } else {
      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (en) {
          if (en.isIntersecting) { en.target.classList.add('is-visible'); io.unobserve(en.target); }
        });
      }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });
      reveals.forEach(function (el) { io.observe(el); });
    }
  }

  /* ---- Menu category tabs ---------------------------------------- */
  var tabs = document.querySelectorAll('.menu-tab');
  if (tabs.length) {
    tabs.forEach(function (tab) {
      tab.addEventListener('click', function () {
        var target = tab.getAttribute('data-target');
        tabs.forEach(function (t) { t.classList.remove('active'); });
        tab.classList.add('active');
        var el = document.getElementById(target);
        if (el) {
          var tabsBar = document.querySelector('.menu-tabs');
          var head = document.querySelector('.header');
          var offset = (tabsBar ? tabsBar.offsetHeight : 0) + (head ? head.offsetHeight : 0) + 12;
          var y = el.getBoundingClientRect().top + window.scrollY - offset;
          window.scrollTo({ top: y, behavior: reduce ? 'auto' : 'smooth' });
        }
      });
    });
    // highlight active category while scrolling
    var cats = document.querySelectorAll('.menu-cat');
    if (cats.length && 'IntersectionObserver' in window) {
      var catIO = new IntersectionObserver(function (entries) {
        entries.forEach(function (en) {
          if (en.isIntersecting) {
            var id = en.target.id;
            tabs.forEach(function (t) {
              t.classList.toggle('active', t.getAttribute('data-target') === id);
            });
          }
        });
      }, { rootMargin: '-45% 0px -50% 0px' });
      cats.forEach(function (c) { catIO.observe(c); });
    }
  }

  /* ---- Gallery filter -------------------------------------------- */
  var gfilters = document.querySelectorAll('.gfilter');
  if (gfilters.length) {
    var items = document.querySelectorAll('.gitem');
    gfilters.forEach(function (f) {
      f.addEventListener('click', function () {
        var cat = f.getAttribute('data-filter');
        gfilters.forEach(function (x) { x.classList.remove('active'); });
        f.classList.add('active');
        items.forEach(function (it) {
          var show = cat === 'all' || it.getAttribute('data-cat') === cat;
          it.style.display = show ? '' : 'none';
        });
      });
    });
  }

  /* ---- Lightbox --------------------------------------------------- */
  var lb = document.querySelector('.lightbox');
  if (lb) {
    var lbImg = lb.querySelector('img');
    document.querySelectorAll('.gitem').forEach(function (it) {
      it.addEventListener('click', function () {
        var img = it.querySelector('img');
        if (!img) return;
        lbImg.src = img.getAttribute('data-full') || img.src;
        lbImg.alt = img.alt || '';
        lb.classList.add('open');
        document.body.style.overflow = 'hidden';
      });
    });
    var close = function () { lb.classList.remove('open'); document.body.style.overflow = ''; };
    lb.addEventListener('click', function (e) {
      if (e.target === lb || e.target.classList.contains('lightbox__close')) close();
    });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape') close(); });
  }

  /* ---- Footer year ------------------------------------------------ */
  var yr = document.getElementById('year');
  if (yr) yr.textContent = new Date().getFullYear();
})();

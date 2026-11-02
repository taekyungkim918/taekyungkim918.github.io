(function () {
  // Theme toggle (light by default; choice stored in localStorage)
  var root = document.documentElement, btn = document.getElementById('themeToggle');
  function label() {
    btn.setAttribute('aria-label', root.getAttribute('data-theme') === 'dark' ? 'Switch to light mode' : 'Switch to dark mode');
  }
  if (btn) {
    label();
    btn.addEventListener('click', function () {
      var next = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
      root.setAttribute('data-theme', next);
      try { localStorage.setItem('theme-v2', next); } catch (e) {}
      label();
    });
  }

  // Publication filters. The first tab in _data/filters.yml is the default view.
  var fbtns = [].slice.call(document.querySelectorAll('.filters button'));
  var papers = [].slice.call(document.querySelectorAll('.paper'));
  var years = [].slice.call(document.querySelectorAll('.year-subsection'));
  function applyFilter(f) {
    fbtns.forEach(function (b) { b.setAttribute('aria-pressed', b.dataset.f === f ? 'true' : 'false'); });
    papers.forEach(function (p) { p.hidden = !(f === 'all' || (f === 'sel' && p.dataset.sel) || p.dataset.a.split(' ').indexOf(f) !== -1); });
    years.forEach(function (y) { y.hidden = !y.querySelector('.paper:not([hidden])'); });
    var pubs = document.getElementById('publications');
    if (pubs) pubs.classList.toggle('selected-view', f === 'sel');
  }
  if (fbtns.length) {
    fbtns.forEach(function (b) { b.addEventListener('click', function () { applyFilter(b.dataset.f); }); });
    var target = location.hash && document.getElementById(location.hash.slice(1));
    applyFilter(fbtns[0].dataset.f);
    if (target && target.classList.contains('paper') && target.hidden) { applyFilter('all'); target.scrollIntoView(); }
    // Clicking a tag next to a venue switches to that tab
    document.querySelectorAll('.paper .tag').forEach(function (t) {
      t.addEventListener('click', function () {
        applyFilter(t.dataset.f);
        var bar = document.querySelector('.filters');
        if (bar && bar.getBoundingClientRect().top < 0) bar.scrollIntoView();
      });
    });
    // Research topic names in the about section open the matching tab
    document.querySelectorAll('.research a[data-f]').forEach(function (a) {
      a.addEventListener('click', function () { applyFilter(a.dataset.f); });
    });
    // News links can point at papers hidden by the current tab
    document.querySelectorAll('.news a[href^="#"]').forEach(function (a) {
      a.addEventListener('click', function () {
        var el = document.getElementById(a.getAttribute('href').slice(1));
        if (el && el.hidden) applyFilter('all');
      });
    });
  }

  // Highlight the header link of the section in view
  var links = {
    about: document.querySelector('.page-link[href$="#about"]'),
    publications: document.querySelector('.page-link[href$="#publications"]')
  };
  if ('IntersectionObserver' in window && links.about && links.publications) {
    var io = new IntersectionObserver(function (es) {
      es.forEach(function (e) {
        if (e.isIntersecting && links[e.target.id]) {
          Object.keys(links).forEach(function (k) { links[k].setAttribute('aria-current', k === e.target.id ? 'true' : 'false'); });
        }
      });
    }, { rootMargin: '-45% 0px -50% 0px' });
    ['about', 'publications'].forEach(function (id) { var el = document.getElementById(id); if (el) io.observe(el); });
  }
})();

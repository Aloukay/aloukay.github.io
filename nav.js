/* ── Shared nav / cursor / scroll animations ── */
(function () {
  // Loader
  window.addEventListener('load', () => {
    const loader = document.getElementById('loader');
    if (loader) { loader.style.opacity = '0'; setTimeout(() => loader.style.display = 'none', 500); }
  });

  // Custom cursor
  const cursor = document.getElementById('cursor');
  if (cursor) {
    document.addEventListener('mousemove', e => {
      cursor.style.left = e.clientX + 'px';
      cursor.style.top  = e.clientY + 'px';
    });
  }

  // Scroll fade-in
  const fades = document.querySelectorAll('.fade');
  const observer = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('show'); });
  }, { threshold: 0.12 });
  fades.forEach(el => observer.observe(el));

  // Active nav link
  const links = document.querySelectorAll('nav ul a');
  const current = location.pathname.split('/').pop() || 'index.html';
  links.forEach(a => {
    if (a.getAttribute('href') === current) a.classList.add('active');
  });
})();

/* ══════════════════════════════════════════════
   SHARED PREMIUM JS — Mohammed ALOUKAY Portfolio
   ══════════════════════════════════════════════ */

(function () {

  /* ── LOADER ── */
  window.addEventListener('load', () => {
    setTimeout(() => {
      const l = document.getElementById('loader');
      if (!l) return;
      l.style.opacity = '0';
      setTimeout(() => l.style.display = 'none', 600);
    }, 1400);
  });

  /* ── DUAL CURSOR ── */
  const dot  = document.getElementById('cursorDot');
  const ring = document.getElementById('cursorRing');
  if (dot && ring) {
    let mx = 0, my = 0, rx = 0, ry = 0;
    document.addEventListener('mousemove', e => { mx = e.clientX; my = e.clientY; });
    (function animCursor() {
      rx += (mx - rx) * .12;
      ry += (my - ry) * .12;
      dot.style.left  = mx + 'px'; dot.style.top  = my + 'px';
      ring.style.left = rx + 'px'; ring.style.top = ry + 'px';
      requestAnimationFrame(animCursor);
    })();
    document.querySelectorAll('a, button').forEach(el => {
      el.addEventListener('mouseenter', () => {
        ring.style.transform = 'translate(-50%,-50%) scale(1.7)';
        ring.style.borderColor = 'rgba(0,255,163,.7)';
      });
      el.addEventListener('mouseleave', () => {
        ring.style.transform = 'translate(-50%,-50%) scale(1)';
        ring.style.borderColor = 'rgba(0,224,255,.5)';
      });
    });
  }

  /* ── PARTICLES ── */
  const canvas = document.getElementById('particles-canvas');
  if (canvas) {
    const ctx = canvas.getContext('2d');
    let W, H, particles = [];
    function resize() { W = canvas.width = window.innerWidth; H = canvas.height = window.innerHeight; }
    resize();
    window.addEventListener('resize', resize);
    class Particle {
      constructor() { this.reset(); }
      reset() {
        this.x = Math.random() * W; this.y = Math.random() * H;
        this.r = Math.random() * 1.4 + .3;
        this.vx = (Math.random() - .5) * .35; this.vy = (Math.random() - .5) * .35;
        this.alpha = Math.random() * .45 + .08;
        this.color = Math.random() > .5 ? '0,224,255' : '0,255,163';
      }
      update() { this.x += this.vx; this.y += this.vy; if (this.x<0||this.x>W||this.y<0||this.y>H) this.reset(); }
      draw() { ctx.beginPath(); ctx.arc(this.x,this.y,this.r,0,Math.PI*2); ctx.fillStyle=`rgba(${this.color},${this.alpha})`; ctx.fill(); }
    }
    for (let i = 0; i < 100; i++) particles.push(new Particle());
    (function anim() {
      ctx.clearRect(0,0,W,H);
      for (let i=0;i<particles.length;i++) {
        particles[i].update(); particles[i].draw();
        for (let j=i+1;j<particles.length;j++) {
          const dx=particles[i].x-particles[j].x, dy=particles[i].y-particles[j].y;
          const d=Math.sqrt(dx*dx+dy*dy);
          if(d<110){ ctx.beginPath(); ctx.moveTo(particles[i].x,particles[i].y); ctx.lineTo(particles[j].x,particles[j].y); ctx.strokeStyle=`rgba(0,224,255,${.07*(1-d/110)})`; ctx.lineWidth=.5; ctx.stroke(); }
        }
      }
      requestAnimationFrame(anim);
    })();
  }

  /* ── NAV SHRINK ── */
  const nav = document.getElementById('mainNav');
  if (nav) window.addEventListener('scroll', () => nav.classList.toggle('scrolled', window.scrollY > 60));

  /* ── ACTIVE NAV LINK ── */
  const current = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a').forEach(a => {
    if (a.getAttribute('href') === current) a.classList.add('active');
  });

  /* ── SCROLL REVEAL ── */
  const revObs = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
  }, { threshold: 0.08 });
  document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-up').forEach(el => revObs.observe(el));

})();

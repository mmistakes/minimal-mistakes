// guide.js — TOC scroll-spy + reveal-on-scroll
(() => {
  const toc = document.querySelector('aside.toc');
  if (toc) {
    const headings = [...document.querySelectorAll('main h2[id], main h3[id]')];
    const observer = new IntersectionObserver(entries => {
      for (const e of entries) {
        if (e.isIntersecting) {
          const id = e.target.id;
          toc.querySelectorAll('a').forEach(a => a.classList.toggle('active', a.getAttribute('href') === '#' + id));
        }
      }
    }, { rootMargin: '-40% 0px -55% 0px' });
    headings.forEach(h => observer.observe(h));
  }

  // Reveal fade-in
  const reveals = document.querySelectorAll('.reveal');
  if (reveals.length) {
    const revObserver = new IntersectionObserver(entries => {
      for (const e of entries) if (e.isIntersecting) { e.target.classList.add('visible'); revObserver.unobserve(e.target); }
    }, { rootMargin: '0px 0px -10% 0px' });
    reveals.forEach(el => revObserver.observe(el));
  }
})();

// Load the actual desktop bundle near the viewport, rather than with the hero text.
(function () {
  const frame = document.querySelector('[data-demo-frame]');
  if (!frame) return;
  const load = () => { if (!frame.src) frame.src = frame.dataset.src; };
  if (!('IntersectionObserver' in window)) { load(); return; }
  const observer = new IntersectionObserver(entries => { if (entries.some(entry => entry.isIntersecting)) { load(); observer.disconnect(); } }, { rootMargin: '300px' });
  observer.observe(frame);
})();

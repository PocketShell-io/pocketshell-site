// Page navigation mirrors the session-tree and status-bar interaction in the reference.
(function () {
  const root = document.querySelector('.reference-landing');
  if (!root) return;
  const toggle = root.querySelector('[data-sidebar-toggle]');
  function setSidebar(hidden) {
    root.classList.toggle('is-sidebar-hidden', hidden);
    toggle.setAttribute('aria-expanded', String(!hidden));
    const label = hidden ? 'Show side panel' : 'Hide side panel';
    toggle.setAttribute('aria-label', label);
    toggle.title = label;
  }
  try { setSidebar(localStorage.getItem('pocketshell.site.sidebar') === 'hidden'); } catch (_) {}
  toggle.addEventListener('click', () => {
    const hidden = !root.classList.contains('is-sidebar-hidden');
    setSidebar(hidden);
    try { localStorage.setItem('pocketshell.site.sidebar', hidden ? 'hidden' : 'shown'); } catch (_) {}
  });
  const sections = [...root.querySelectorAll('section[data-screen-label]')];
  const names = { overview: 'overview', how: 'how-it-works', features: 'features', clients: 'clients', security: 'security', opensource: 'open-source', blog: 'blog', faq: 'faq', start: 'get-started' };
  const sectionLinks = root.querySelectorAll('[data-section]');
  const position = root.querySelector('[data-current-section]');
  const status = root.querySelector('[data-status-sections]');
  let active, scheduled = false;
  function update() {
    scheduled = false;
    let current = sections[0].id;
    for (const section of sections) if (section.getBoundingClientRect().top < 160) current = section.id;
    if (current === active) return;
    active = current;
    sectionLinks.forEach(link => {
      const target = link.dataset.section;
      const selected = target === current || link.classList.contains('reference-tab') && ((target === 'features' && current === 'clients') || (target === 'blog' && current === 'opensource'));
      link.classList.toggle('is-active', selected);
      if (selected) link.setAttribute('aria-current', 'location'); else link.removeAttribute('aria-current');
    });
    position.textContent = '~/pocketshell.io:' + names[current];
    status.textContent = sections.slice(1,8).map((section,index) => (index+1) + ':' + names[section.id] + (section.id === current ? '*' : '')).join(' ');
  }
  function schedule() { if (!scheduled) { scheduled = true; requestAnimationFrame(update); } }
  addEventListener('scroll', schedule, { passive: true });
  addEventListener('resize', schedule, { passive: true });
  addEventListener('hashchange', schedule);
  update();
})();

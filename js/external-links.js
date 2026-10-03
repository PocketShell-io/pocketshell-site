// Keep navigation within this domain in the current tab; open other sites apart.
(function () {
  function update(link) {
    if (!link || !link.hasAttribute('href')) return;
    let url;
    try { url = new URL(link.getAttribute('href'), document.baseURI); } catch (_) { return; }
    if (!['http:', 'https:'].includes(url.protocol) || url.hostname === location.hostname) return;
    link.target = '_blank';
    link.relList.add('noopener');
  }
  document.querySelectorAll('a[href]').forEach(update);
  document.addEventListener('click', event => {
    if (event.target instanceof Element) update(event.target.closest('a[href]'));
  }, true);
})();

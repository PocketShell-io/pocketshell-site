// Seed the real app's native resizable composer with a compact demo layout.
// A versioned migration also updates visitors who saw the earlier large box;
// subsequent manual resizing and visibility choices remain the app's own.
(function () {
  try {
    const marker = 'pocketshell.demo.compactComposer.v1';
    if (localStorage.getItem(marker)) return;
    const key = 'pocketshell.composer.visibility.v1';
    const previous = JSON.parse(localStorage.getItem(key) || '{}');
    localStorage.setItem(key, JSON.stringify({
      mode: previous.mode === 'hidden' ? 'hidden' : 'docked',
      lastOpenMode: 'docked',
      geometry: { right: 0, bottom: 0, width: 520, height: 190 }
    }));
    localStorage.setItem(marker, '1');
  } catch (_) {
    // The renderer falls back to its native layout when storage is unavailable.
  }
})();

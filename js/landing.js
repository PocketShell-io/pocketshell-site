// Static-site port of the landing page's interactions (the web app's
// LandingView): the hero desktop mock switches folders and tabs, and the
// contribution calendar shows a per-day tooltip under the cursor.
(function () {
  // ---- Hero mock ----------------------------------------------------------
  // Every folder/tab is in the initial HTML; these handlers only toggle
  // classes and [hidden]. Same state shapes as the app: .dir-row.current
  // marks the open folder, .tab.on the active session, and the composer
  // draft follows the active tab (an empty one shows the CSS placeholder).
  document.querySelectorAll('.dir-row[data-folder]').forEach(function (row) {
    row.addEventListener('click', function () {
      document.querySelectorAll('.dir-row.current').forEach(function (r) {
        r.classList.remove('current');
        r.removeAttribute('aria-current');
      });
      row.classList.add('current');
      row.setAttribute('aria-current', 'true');
      document.querySelectorAll('.desk-pane').forEach(function (pane) {
        pane.hidden = pane.dataset.folder !== row.dataset.folder;
      });
    });
  });

  document.querySelectorAll('.tab[data-tab]').forEach(function (tab) {
    tab.addEventListener('click', function () {
      const pane = tab.closest('.desk-pane');
      pane.querySelectorAll('.tab').forEach(function (t) {
        t.classList.toggle('on', t === tab);
        if (t === tab) t.setAttribute('aria-current', 'true');
        else t.removeAttribute('aria-current');
      });
      pane.querySelectorAll('.desk-term pre, .comp-draft').forEach(function (el) {
        el.hidden = el.dataset.tab !== tab.dataset.tab;
      });
    });
  });

  // ---- Contribution tooltip ------------------------------------------------
  // The SVG scales with the layout, so the tip tracks client coords (same as
  // the app's version). Native <title> tooltips take about a second; this
  // one is instant.
  const tip = document.querySelector('.contrib-tip');
  if (!tip) return;
  const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July',
    'August', 'September', 'October', 'November', 'December'];
  const fmtDay = function (iso) {
    const [y, m, d] = iso.split('-').map(Number);
    return `${MONTHS[m - 1]} ${d}, ${y}`;
  };
  const place = function (x, y) {
    tip.style.left = `${x}px`;
    tip.style.top = `${y}px`;
  };
  document.querySelectorAll('.contrib rect[data-count]').forEach(function (rect) {
    const count = Number(rect.dataset.count);
    const label = function () {
      tip.innerHTML = '';
      const strong = document.createElement('strong');
      strong.textContent = count === 0 ? 'No contributions' : `${count} contribution${count === 1 ? '' : 's'}`;
      tip.appendChild(strong);
      tip.appendChild(document.createTextNode(` ${fmtDay(rect.dataset.date)}`));
    };
    rect.addEventListener('mouseenter', function (e) {
      label();
      place(e.clientX, e.clientY);
      tip.hidden = false;
    });
    rect.addEventListener('mousemove', function (e) {
      place(e.clientX, e.clientY);
    });
    rect.addEventListener('mouseleave', function () {
      tip.hidden = true;
    });
  });
})();

// The contribution calendar shows a per-day tooltip under the cursor.
(function () {
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

// Double opt-in for the PocketShell list. Relay sends the confirmation as
// hello@pocketshell.io.
(function () {
  var RELAY_LIST = 'https://relay.datatalks.club/api/public/lists/pocketshell';
  var form = document.getElementById('list-signup');
  if (!form) return;
  var input = form.querySelector('input[type="email"]');
  var button = form.querySelector('button');
  var status = form.querySelector('.signup-status');
  var buttonLabel = button.textContent;

  function show(message, kind) {
    status.hidden = false;
    status.textContent = message;
    status.classList.toggle('is-error', kind === 'error');
    status.classList.toggle('is-ok', kind === 'ok');
  }

  function setPending(pending) {
    button.disabled = pending;
    input.disabled = pending;
    form.setAttribute('aria-busy', pending ? 'true' : 'false');
    button.textContent = pending ? 'Sending…' : buttonLabel;
  }

  async function post(path, body) {
    var response = await fetch(RELAY_LIST + path, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify(body),
    });
    var payload = {};
    try { payload = await response.json(); } catch (e) { payload = {}; }
    return { response: response, payload: payload };
  }

  async function confirmToken(token) {
    show('Confirming your email…', '');
    // Confirmation links land on the newsletter, now below the product story.
    form.scrollIntoView({ block: 'center' });
    try {
      var result = await post('/confirm', { token: token });
      if (result.response.ok && result.payload.status === 'subscribed') {
        show('You’re confirmed. We’ll write from hello@pocketshell.io.', 'ok');
        form.querySelector('input').hidden = true;
        button.hidden = true;
      } else {
        show('That confirmation link is invalid or has expired.', 'error');
      }
    } catch (e) {
      show('Could not confirm your email. Try the link again.', 'error');
    }
    var url = new URL(window.location.href);
    url.searchParams.delete('token');
    window.history.replaceState({}, '', url.pathname + url.search + url.hash);
  }

  var token = new URLSearchParams(window.location.search).get('token');
  if (token) confirmToken(token);

  form.addEventListener('submit', async function (event) {
    event.preventDefault();
    var email = input.value.trim();
    if (!email || email.indexOf('@') < 1) {
      show('Enter a valid email address.', 'error');
      return;
    }
    setPending(true);
    show('', '');
    status.hidden = true;
    try {
      var result = await post('/subscribe', { email: email });
      if (result.response.ok && result.payload.status === 'verification_requested') {
        show('Check your inbox — we sent a confirmation link.', 'ok');
        input.hidden = true;
        button.hidden = true;
      } else if (result.response.ok && result.payload.status === 'already_subscribed') {
        show('That email is already on the list.', 'ok');
      } else if (result.response.status === 429) {
        show('Too many confirmation emails. Try again in an hour.', 'error');
        setPending(false);
      } else {
        show('Could not send the confirmation. Try again.', 'error');
        setPending(false);
      }
    } catch (e) {
      show('Could not send the confirmation. Try again.', 'error');
      setPending(false);
    }
  });
})();

(() => {
  'use strict';
  const measurementId = document.currentScript.dataset.measurementId;
  const preferenceKey = 'pocketshell-analytics-consent';
  let enabled = false;
  let preference;
  try { preference = localStorage.getItem(preferenceKey); } catch {}

  const banner = document.createElement('section');
  banner.className = 'analytics-choice';
  banner.setAttribute('aria-label', 'Analytics preferences');
  banner.innerHTML = '<p>May we use Google Analytics cookies to understand visits to this website? Analytics is optional. <a href="/privacy/#website-analytics">Privacy details</a></p><div class="analytics-actions"><button type="button" data-choice="granted">Accept analytics</button><button type="button" data-choice="denied">Reject analytics</button></div>';
  banner.hidden = preference === 'granted' || preference === 'denied';
  document.body.append(banner);

  function startAnalytics() {
    if (enabled || !['pocketshell.io', 'www.pocketshell.io'].includes(location.hostname)) return;
    enabled = true;
    window.dataLayer = window.dataLayer || [];
    window.gtag = function () { window.dataLayer.push(arguments); };
    window.gtag('consent', 'default', {
      analytics_storage: 'granted', ad_storage: 'denied',
      ad_user_data: 'denied', ad_personalization: 'denied'
    });
    window.gtag('js', new Date());
    // Strip query strings and fragments (including newsletter confirmation tokens).
    let referrer = '';
    try { const url = new URL(document.referrer); referrer = url.origin + url.pathname; } catch {}
    window.gtag('config', measurementId, {
      page_location: location.origin + location.pathname,
      page_referrer: referrer,
      allow_google_signals: false,
      allow_ad_personalization_signals: false,
      cookie_domain: location.hostname,
      cookie_expires: 60 * 60 * 24 * 180
    });
    const tag = document.createElement('script');
    tag.async = true;
    tag.src = 'https://www.googletagmanager.com/gtag/js?id=' + encodeURIComponent(measurementId);
    document.head.append(tag);
  }

  banner.addEventListener('click', event => {
    const choice = event.target.closest('[data-choice]');
    if (!choice) return;
    const previous = preference;
    preference = choice.dataset.choice;
    try { localStorage.setItem(preferenceKey, preference); } catch {}
    banner.hidden = true;
    document.querySelector('[data-analytics-settings]')?.focus();
    if (preference === 'granted') startAnalytics();
    else if (enabled || previous === 'granted') {
      window['ga-disable-' + measurementId] = true;
      // Remove this website's GA cookies, then reload without loading Google's tag.
      for (const cookie of document.cookie.split(';')) {
        const name = cookie.split('=')[0].trim();
        if (name === '_ga' || name.startsWith('_ga_')) {
          document.cookie = name + '=; Max-Age=0; Path=/; Domain=' + location.hostname;
          document.cookie = name + '=; Max-Age=0; Path=/';
        }
      }
      location.reload();
    }
  });
  document.querySelector('[data-analytics-settings]')?.addEventListener('click', () => {
    banner.hidden = false;
    banner.querySelector('button').focus();
  });
  if (preference === 'granted') startAnalytics();
})();

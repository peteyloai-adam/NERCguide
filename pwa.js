(function () {
  'use strict';

  var registration = null;
  var updateWaiting = false;
  var lastCacheStatus = null;

  function announce(message) {
    var live = document.getElementById('live-status');
    if (live) {
      live.textContent = '';
      window.setTimeout(function () { live.textContent = message; }, 10);
    }
  }

  function ensureStripStatus() {
    var strip = document.querySelector('.c-strip');
    if (!strip) return null;
    var node = document.getElementById('pwa-strip-status');
    if (node) return node;
    node = document.createElement('span');
    node.id = 'pwa-strip-status';
    node.className = 'pwa-status is-checking';
    node.setAttribute('role', 'status');
    node.setAttribute('aria-live', 'polite');
    node.innerHTML = '<span class="pwa-dot" aria-hidden="true"></span><span class="pwa-status__label">Offline setup…</span>';
    var ready = document.getElementById('strip-ready');
    strip.insertBefore(node, ready || null);
    return node;
  }

  function setStatus(kind, label, detail) {
    var strip = ensureStripStatus();
    if (strip) {
      strip.className = 'pwa-status is-' + kind;
      var l = strip.querySelector('.pwa-status__label');
      if (l) l.textContent = label;
      strip.title = detail || label;
    }
    var detailStatus = document.getElementById('pwa-detail-status');
    var detailText = document.getElementById('pwa-detail-text');
    var dot = document.getElementById('pwa-detail-dot');
    if (detailStatus) detailStatus.textContent = label;
    if (detailText && detail) detailText.textContent = detail;
    if (dot) dot.className = 'pwa-dot is-' + kind;
    var apply = document.getElementById('pwa-apply-update');
    if (apply) apply.hidden = !updateWaiting;
  }

  function requestCacheStatus() {
    if (registration && registration.active) {
      registration.active.postMessage({ type: 'CACHE_STATUS' });
    } else if (navigator.serviceWorker.controller) {
      navigator.serviceWorker.controller.postMessage({ type: 'CACHE_STATUS' });
    }
  }

  function showReadyFromCache(info) {
    lastCacheStatus = info || lastCacheStatus;
    var detail = 'The complete local study console is cached on this device. External video links still require internet access.';
    if (lastCacheStatus && lastCacheStatus.cached != null && lastCacheStatus.expected != null) {
      detail = lastCacheStatus.cached + ' of ' + lastCacheStatus.expected + ' local runtime files are cached. External video links still require internet access.';
    }
    if (updateWaiting) {
      setStatus('update', 'Update available', 'A newer study-console cache is ready to install. Your learning progress is stored separately in this browser.');
    } else if (!navigator.onLine) {
      setStatus('offline', 'Offline mode', detail);
    } else {
      setStatus('ready', 'Offline ready', detail);
    }
  }

  function watchRegistration(reg) {
    registration = reg;
    if (reg.waiting && navigator.serviceWorker.controller) {
      updateWaiting = true;
      setStatus('update', 'Update available', 'A newer study-console version is ready. Use Install available update under Data & accessibility.');
    }
    reg.addEventListener('updatefound', function () {
      var worker = reg.installing;
      if (!worker) return;
      setStatus('checking', 'Caching update…', 'A newer version is being prepared in the background.');
      worker.addEventListener('statechange', function () {
        if (worker.state === 'installed') {
          if (navigator.serviceWorker.controller) {
            updateWaiting = true;
            setStatus('update', 'Update available', 'A newer study-console version is ready. Use Install available update under Data & accessibility.');
          } else {
            setStatus('checking', 'Finishing offline setup…', 'The first offline cache has been downloaded.');
          }
        }
      });
    });
  }

  function register() {
    ensureStripStatus();
    if (!('serviceWorker' in navigator)) {
      setStatus('error', 'Offline install unavailable', 'This browser does not expose service-worker support. Use current Safari on iPadOS or a current desktop browser.');
      return;
    }
    navigator.serviceWorker.register('./sw.js', { scope: './' }).then(function (reg) {
      watchRegistration(reg);
      return navigator.serviceWorker.ready;
    }).then(function (reg) {
      registration = reg;
      requestCacheStatus();
      window.setTimeout(function () {
        if (!lastCacheStatus && !updateWaiting) showReadyFromCache();
      }, 700);
    }).catch(function (err) {
      setStatus('error', 'Offline setup failed', 'The service worker could not be registered. Open the published site over HTTPS and reload.');
      console.error('PWA registration failed:', err);
    });
  }

  navigator.serviceWorker && navigator.serviceWorker.addEventListener('message', function (event) {
    var data = event.data || {};
    if (data.type === 'CACHE_STATUS') {
      if (data.ready) showReadyFromCache(data);
      else setStatus('checking', 'Offline cache incomplete', 'Reconnect to the internet and keep this page open until all local runtime files are cached.');
    }
    if (data.type === 'OFFLINE_READY') {
      requestCacheStatus();
      announce('Offline study console is ready.');
    }
  });

  navigator.serviceWorker && navigator.serviceWorker.addEventListener('controllerchange', function () {
    if (sessionStorage.getItem('nerc-pwa-reloading') === '1') return;
    if (updateWaiting) {
      sessionStorage.setItem('nerc-pwa-reloading', '1');
      window.location.reload();
    } else {
      requestCacheStatus();
    }
  });

  window.addEventListener('online', function () {
    if (registration) registration.update().catch(function () {});
    requestCacheStatus();
  });
  window.addEventListener('offline', function () { showReadyFromCache(); });

  document.addEventListener('click', function (event) {
    var check = event.target.closest && event.target.closest('#pwa-check-update');
    if (check) {
      check.disabled = true;
      setStatus('checking', 'Checking for updates…', 'Contacting the published site for a newer offline package.');
      if (!registration) {
        check.disabled = false;
        return requestCacheStatus();
      }
      registration.update().then(function () {
        window.setTimeout(function () {
          check.disabled = false;
          if (registration.waiting) {
            updateWaiting = true;
            setStatus('update', 'Update available', 'A newer study-console version is ready to install.');
          } else {
            requestCacheStatus();
            announce('Update check complete.');
          }
        }, 600);
      }).catch(function () {
        check.disabled = false;
        showReadyFromCache();
      });
    }
    var apply = event.target.closest && event.target.closest('#pwa-apply-update');
    if (apply && registration && registration.waiting) {
      apply.disabled = true;
      registration.waiting.postMessage({ type: 'SKIP_WAITING' });
    }
  });

  // The Data & accessibility route is rendered dynamically, so refresh its status
  // whenever the view changes.
  var observer = new MutationObserver(function () {
    if (document.getElementById('pwa-detail-status')) {
      if (updateWaiting) setStatus('update', 'Update available', 'A newer study-console version is ready to install.');
      else if (lastCacheStatus) showReadyFromCache(lastCacheStatus);
      else requestCacheStatus();
    }
  });

  function start() {
    // The marker prevents a controllerchange reload loop for one document.
    // Clear it in each newly loaded document so a later release can reload too.
    sessionStorage.removeItem('nerc-pwa-reloading');
    var view = document.getElementById('view');
    if (view) observer.observe(view, { childList: true, subtree: false });
    register();
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start);
  else start();
})();

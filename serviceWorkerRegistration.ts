
export function register() {
  if ('serviceWorker' in navigator) {
    // Pre-check for secure context (HTTPS or localhost) to avoid noisy failures
    const isLocalhost = Boolean(
      window.location.hostname === 'localhost' ||
        window.location.hostname === '[::1]' ||
        window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/)
    );

    if (window.location.protocol !== 'https:' && !isLocalhost) {
        // Service Workers generally won't work without HTTPS. Fail silently or log warn.
        console.warn('[SW] Service Worker requires HTTPS or localhost. Skipping registration.');
        return;
    }

    window.addEventListener('load', () => {
      let swUrl = './sw.js'; 
      
      try {
        // Robust URL construction: Only attempt if base is valid
        // This fixes "Failed to construct 'URL': Invalid URL" in weird iframe/preview contexts
        const base = window.location.href;
        if (base && !base.startsWith('data:') && !base.startsWith('blob:') && !base.startsWith('about:')) {
             swUrl = new URL('./sw.js', base).toString();
        }
      } catch (error) {
        // Silently fall back to relative path './sw.js' if URL construction fails
        // No need to log "SW URL construction failed" as it's a valid fallback
      }

      navigator.serviceWorker
        .register(swUrl)
        .then((registration) => {
          registration.onupdatefound = () => {
            const installingWorker = registration.installing;
            if (installingWorker == null) {
              return;
            }
            installingWorker.onstatechange = () => {
              if (installingWorker.state === 'installed') {
                if (navigator.serviceWorker.controller) {
                  console.log('New content is available; please refresh.');
                } else {
                  console.log('Content is cached for offline use.');
                }
              }
            };
          };
        })
        .catch((error) => {
          // Filter out noisy environment mismatch errors common in Cloud IDEs/Previews
          const msg = error.message || "";
          const isEnvMismatch = 
            msg.includes('origin') || 
            msg.includes('scriptURL') || 
            msg.includes('unsupported authentication scheme') ||
            msg.includes('user denied');

          if (isEnvMismatch) {
              console.log('[SW] Registration skipped (environment limitation).');
          } else {
              console.error('Error during service worker registration:', error);
          }
        });
    });
  }
}

export function unregister() {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.ready
      .then((registration) => {
        registration.unregister();
      })
      .catch((error) => {
        console.error(error.message);
      });
  }
}

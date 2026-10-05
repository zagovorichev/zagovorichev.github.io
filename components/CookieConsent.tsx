'use client';

import {useSyncExternalStore} from 'react';
import {GoogleAnalytics} from '@next/third-parties/google';

/**
 * Cookie banner + Google Analytics behind consent (Consent Mode v2, "basic" mode):
 * the GA script is not loaded at all until the visitor clicks Allow. Consent defaults
 * ("denied", or the saved choice) are set before paint by the boot script in layout.tsx.
 */

type Choice = 'granted' | 'denied';

const KEY = 'consent';
const REOPEN = 'consent:open';
const CHANGE = 'consent:change';

// banner reopened from the footer link; lives for this page view only
let reopened = false;
// fallback when localStorage is unavailable (private mode)
let memory: Choice | null = null;

function read(): Choice | null {
  try {
    const v = localStorage.getItem(KEY);
    if (v === 'granted' || v === 'denied') return v;
  } catch {}
  return memory;
}

function subscribe(cb: () => void) {
  window.addEventListener(CHANGE, cb);
  window.addEventListener('storage', cb);
  return () => {
    window.removeEventListener(CHANGE, cb);
    window.removeEventListener('storage', cb);
  };
}

// "pending" on the server and during hydration, so the static HTML never contains the banner
const snapshot = () => `${read() ?? 'unset'}|${reopened ? 'open' : ''}`;
const serverSnapshot = () => 'pending|';

/** Reopens the banner (footer "Cookie settings" link). */
export function openCookieSettings() {
  reopened = true;
  window.dispatchEvent(new Event(CHANGE));
}

// gtag.js reads the arguments object, not an array
function gtag(..._args: unknown[]) {
  const w = window as unknown as {dataLayer?: unknown[]};
  w.dataLayer = w.dataLayer || [];
  // eslint-disable-next-line prefer-rest-params
  w.dataLayer.push(arguments);
}

function choose(choice: Choice) {
  memory = choice;
  try {
    localStorage.setItem(KEY, choice);
  } catch {
    // storage unavailable: the choice lasts for this page only
  }
  gtag('consent', 'update', {analytics_storage: choice});
  if (choice === 'denied') {
    // drop cookies GA may have set after an earlier "Allow"
    const domain = location.hostname;
    for (const c of document.cookie.split(';')) {
      const name = c.split('=')[0].trim();
      if (name === '_ga' || name.startsWith('_ga_')) {
        document.cookie = `${name}=; Max-Age=0; path=/`;
        document.cookie = `${name}=; Max-Age=0; path=/; domain=.${domain}`;
      }
    }
  }
  reopened = false;
  window.dispatchEvent(new Event(CHANGE));
}

export default function CookieConsent({gaId}: {gaId: string}) {
  const [choice, open] = useSyncExternalStore(subscribe, snapshot, serverSnapshot).split('|');
  const showBanner = choice === 'unset' || (choice !== 'pending' && open === 'open');

  return (
    <>
      {choice === 'granted' && <GoogleAnalytics gaId={gaId} />}
      {showBanner && (
        <div className="consent" role="dialog" aria-live="polite" aria-label="Cookie consent">
          <p>
            This site uses Google Analytics cookies to see which pages get read. Nothing is collected unless you
            allow it; you can change your mind any time via <b>Cookie settings</b> in the footer.
          </p>
          <div className="consent-actions">
            <button type="button" className="btn btn-ghost btn-sm" onClick={() => choose('denied')}>
              Decline
            </button>
            <button type="button" className="btn btn-primary btn-sm" onClick={() => choose('granted')}>
              Allow
            </button>
          </div>
        </div>
      )}
    </>
  );
}

/** Footer link that reopens the banner. */
export function CookieSettingsLink() {
  return (
    <button type="button" className="link-btn" onClick={openCookieSettings}>
      Cookie settings
    </button>
  );
}

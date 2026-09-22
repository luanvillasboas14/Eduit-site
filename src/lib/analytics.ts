const MEASUREMENT_ID = (import.meta.env.VITE_GA_MEASUREMENT_ID as string | undefined)?.trim() || '';

declare global {
  interface Window {
    dataLayer: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

function gtag(...args: unknown[]) {
  if (!MEASUREMENT_ID || typeof window === 'undefined' || !window.gtag) return;
  window.gtag(...args);
}

export function initAnalytics(): void {
  if (!MEASUREMENT_ID || typeof window === 'undefined' || window.gtag) return;

  window.dataLayer = window.dataLayer || [];
  window.gtag = function gtagFn() {
    window.dataLayer.push(arguments);
  };
  window.gtag('js', new Date());
  window.gtag('config', MEASUREMENT_ID, { send_page_view: false });

  const load = () => {
    if (document.querySelector('script[data-ga4]')) return;
    const script = document.createElement('script');
    script.async = true;
    script.dataset.ga4 = 'true';
    script.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(MEASUREMENT_ID)}`;
    document.head.appendChild(script);
  };

  const idle = (window as Window & { requestIdleCallback?: (cb: () => void, opts?: { timeout: number }) => void })
    .requestIdleCallback;
  if (typeof idle === 'function') {
    idle(load, { timeout: 4000 });
  } else {
    window.addEventListener('load', () => window.setTimeout(load, 1), { once: true });
  }

  document.addEventListener('click', (event) => {
    const target = event.target as HTMLElement | null;
    const anchor = target?.closest('a');
    if (!anchor?.href) return;
    try {
      const url = new URL(anchor.href, window.location.origin);
      if (url.origin === window.location.origin) return;
      trackOutbound(url.href, anchor.textContent?.trim() || undefined);
      if (
        url.hostname.includes('whatsapp') ||
        url.hostname === 'wa.me' ||
        url.hostname.endsWith('.wa.me') ||
        url.hostname.includes('wa.cruzeiroead')
      ) {
        trackWhatsApp(url.href);
      }
    } catch {
      /* ignore invalid href */
    }
  });
}

export function trackPageView(path: string, title?: string): void {
  initAnalytics();
  gtag('event', 'page_view', {
    page_path: path,
    page_title: title || document.title,
    page_location: typeof window !== 'undefined' ? window.location.href : path,
  });
}

export function trackEvent(name: string, params?: Record<string, unknown>): void {
  gtag('event', name, params);
}

export function trackSearch(query: string, scope: string): void {
  const q = query.trim();
  if (!q) return;
  trackEvent('search', { search_term: q, search_scope: scope });
}

export function trackCourseClick(courseTitle: string, courseId?: string): void {
  trackEvent('select_course', { course_title: courseTitle, course_id: courseId });
}

export function trackPoloClick(poloName: string, poloId?: string): void {
  trackEvent('select_polo', { polo_name: poloName, polo_id: poloId });
}

export function trackCta(label: string): void {
  trackEvent('cta_click', { cta_label: label });
}

export function trackWhatsApp(href?: string): void {
  trackEvent('whatsapp_click', { link_url: href });
}

export function trackFormSubmit(formName: string, extra?: Record<string, unknown>): void {
  trackEvent('generate_lead', { form_name: formName, ...extra });
}

export function trackOutbound(href: string, linkText?: string): void {
  trackEvent('click', { event_category: 'outbound', link_url: href, link_text: linkText });
}

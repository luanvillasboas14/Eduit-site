export const LEAD_WEBHOOK_URL =
  'https://n8n-new-n8n.ca31ey.easypanel.host/webhook/criacao_csv_leads_v3';

export type LeadTipo = 'Graduação' | 'Pós-Graduação';

export type LeadPayload = {
  nome: string;
  email: string;
  celular: string;
  tipo: LeadTipo;
  politica_privacidade: boolean;
  origem: string;
  formulario: string;
  curso: string;
  curso_id: string;
  polo: string;
  artigo: string;
  artigo_id: string;
  duracao: string;
  modalidade: string;
  preco: string;
  pagina: string;
  pagina_titulo: string;
  landing_page: string;
  landing_query: string;
  referrer: string;
  user_agent: string;
  ga_client_id: string;
  ga_session_id: string;
  gclid: string;
  gbraid: string;
  wbraid: string;
  gclsrc: string;
  dclid: string;
  gad_source: string;
  gad_campaignid: string;
  fbclid: string;
  msclkid: string;
  ttclid: string;
  utm_source: string;
  utm_medium: string;
  utm_campaign: string;
  utm_term: string;
  utm_content: string;
  utm_id: string;
};

export function digitsOnly(value: string): string {
  return value.replace(/\D/g, '');
}

/** Rejeita 11111111111, 99999999999 e o mesmo dígito repetido depois do DDD. */
export function isRepeatedPhone(value: string): boolean {
  const digits = digitsOnly(value);
  if (digits.length < 10) return false;
  if (/^(\d)\1+$/.test(digits)) return true;
  const subscriber = digits.slice(2);
  return /^(\d)\1+$/.test(subscriber);
}

export function validateLeadContact(input: { email?: string; celular: string }): string {
  const digits = digitsOnly(input.celular);
  if (digits.length < 10 || digits.length > 11) {
    return 'Informe um WhatsApp válido com DDD.';
  }
  if (isRepeatedPhone(input.celular)) {
    return 'Informe um telefone real. Números repetidos, como 11111111111, não são aceitos.';
  }
  const email = (input.email || '').trim();
  if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return 'Informe um e-mail válido ou deixe o campo em branco.';
  }
  return '';
}

/** Máscara BR: (11) 99999-9999 — no máximo 11 dígitos. */
export function formatPhoneBR(value: string): string {
  const digits = digitsOnly(value).slice(0, 11);
  if (digits.length === 0) return '';
  if (digits.length <= 2) return `(${digits}`;
  const ddd = digits.slice(0, 2);
  const rest = digits.slice(2);
  if (digits.length <= 6) return `(${ddd}) ${rest}`;
  if (digits.length <= 10) return `(${ddd}) ${rest.slice(0, 4)}-${rest.slice(4)}`;
  return `(${ddd}) ${rest.slice(0, 5)}-${rest.slice(5)}`;
}

const CLICK_IDS = [
  'gclid',
  'gbraid',
  'wbraid',
  'gclsrc',
  'dclid',
  'gad_source',
  'gad_campaignid',
  'fbclid',
  'msclkid',
  'ttclid',
  'twclid',
  'li_fat_id',
] as const;

const UTM_KEYS = [
  'utm_source',
  'utm_medium',
  'utm_campaign',
  'utm_term',
  'utm_content',
  'utm_id',
  'utm_source_platform',
  'utm_creative_format',
  'utm_marketing_tactic',
] as const;

const TRACKING_KEYS = [...CLICK_IDS, ...UTM_KEYS];
const STORAGE_KEY = 'eduit_attribution';

export function trackingFromSearch(search: string): Record<string, string> {
  const params = new URLSearchParams(search.startsWith('?') ? search.slice(1) : search);
  const found: Record<string, string> = {};
  for (const [key, value] of params.entries()) {
    const name = key.toLowerCase();
    const text = value.trim();
    if (!text) continue;
    if (TRACKING_KEYS.includes(name as (typeof TRACKING_KEYS)[number]) || name.startsWith('utm_')) {
      found[name] = text;
    }
  }
  return found;
}

export function gclidFromCookie(cookie: string): string {
  const match = cookie.match(/(?:^|;\s*)_gcl_aw=([^;]*)/);
  if (!match) return '';
  const parts = decodeURIComponent(match[1]).split('.');
  return parts.length >= 3 ? parts.slice(2).join('.').trim() : '';
}

export function gaClientIdFromCookie(cookie: string): string {
  const match = cookie.match(/(?:^|;\s*)_ga=GA\d+\.\d+\.(\d+\.\d+)/);
  return match?.[1] || '';
}

export function gaSessionIdFromCookie(cookie: string): string {
  const match = cookie.match(/(?:^|;\s*)_ga_[A-Z0-9]+=GS\d+\.\d+\.(\d+)/i);
  return match?.[1] || '';
}

function readStoredAttribution(): Record<string, string> {
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY);
    if (!raw) return {};
    const parsed = JSON.parse(raw) as unknown;
    if (!parsed || typeof parsed !== 'object') return {};
    return Object.fromEntries(
      Object.entries(parsed).filter((entry): entry is [string, string] => typeof entry[1] === 'string'),
    );
  } catch {
    return {};
  }
}

export function captureGclidFromUrl(): void {
  if (typeof window === 'undefined') return;
  try {
    const current = trackingFromSearch(window.location.search);
    const stored = readStoredAttribution();
    const next = { ...stored, ...current };
    if (!next.landing_page) {
      next.landing_page = window.location.href;
      next.landing_query = window.location.search.replace(/^\?/, '');
    }
    if (!next.referrer && document.referrer) next.referrer = document.referrer;
    const cookieGclid = gclidFromCookie(document.cookie);
    if (!next.gclid && cookieGclid) next.gclid = cookieGclid;
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    if (next.gclid) sessionStorage.setItem('gclid', next.gclid);
  } catch {
    /* ignore */
  }
}

function blankTracking(): Record<string, string> {
  return Object.fromEntries(
    [...CLICK_IDS, ...UTM_KEYS, 'landing_page', 'landing_query', 'referrer'].map((key) => [key, '']),
  );
}

export function getAttribution(): Record<string, string> {
  captureGclidFromUrl();
  const tracking = { ...blankTracking(), ...readStoredAttribution() };
  if (typeof document === 'undefined') return tracking;
  if (!tracking.gclid) tracking.gclid = gclidFromCookie(document.cookie);
  tracking.ga_client_id = gaClientIdFromCookie(document.cookie);
  tracking.ga_session_id = gaSessionIdFromCookie(document.cookie);
  return tracking;
}

export function leadTipoFromCourse(title?: string, isPostGrad?: boolean): LeadTipo {
  if (isPostGrad) return 'Pós-Graduação';
  if (!title) return 'Graduação';
  const normalized = title.toLowerCase();
  if (
    normalized.includes('pós') ||
    normalized.includes('pos-grad') ||
    normalized.includes('mba') ||
    normalized.includes('especializa')
  ) {
    return 'Pós-Graduação';
  }
  return 'Graduação';
}

export async function submitLead(input: {
  nome: string;
  email: string;
  celular: string;
  tipo: LeadTipo;
  formulario: string;
  curso?: string;
  curso_id?: string;
  polo?: string;
  artigo?: string;
  artigo_id?: string;
  duracao?: string;
  modalidade?: string;
  preco?: string;
}): Promise<void> {
  const tracking = getAttribution();
  const payload: LeadPayload = {
    nome: input.nome.trim(),
    email: input.email.trim(),
    celular: digitsOnly(input.celular),
    tipo: input.tipo,
    politica_privacidade: true,
    origem: 'form-eduit',
    formulario: input.formulario,
    curso: input.curso?.trim() || '',
    curso_id: input.curso_id?.trim() || '',
    polo: input.polo?.trim() || '',
    artigo: input.artigo?.trim() || '',
    artigo_id: input.artigo_id?.trim() || '',
    duracao: input.duracao?.trim() || '',
    modalidade: input.modalidade?.trim() || '',
    preco: input.preco?.trim() || '',
    pagina: typeof window !== 'undefined' ? window.location.href : '',
    pagina_titulo: typeof document !== 'undefined' ? document.title : '',
    landing_page: tracking.landing_page || '',
    landing_query: tracking.landing_query || '',
    referrer: tracking.referrer || '',
    user_agent: typeof navigator !== 'undefined' ? navigator.userAgent : '',
    ga_client_id: tracking.ga_client_id || '',
    ga_session_id: tracking.ga_session_id || '',
    gclid: tracking.gclid || '',
    gbraid: tracking.gbraid || '',
    wbraid: tracking.wbraid || '',
    gclsrc: tracking.gclsrc || '',
    dclid: tracking.dclid || '',
    gad_source: tracking.gad_source || '',
    gad_campaignid: tracking.gad_campaignid || '',
    fbclid: tracking.fbclid || '',
    msclkid: tracking.msclkid || '',
    ttclid: tracking.ttclid || '',
    utm_source: tracking.utm_source || '',
    utm_medium: tracking.utm_medium || '',
    utm_campaign: tracking.utm_campaign || '',
    utm_term: tracking.utm_term || '',
    utm_content: tracking.utm_content || '',
    utm_id: tracking.utm_id || '',
  };

  const extras = Object.fromEntries(
    Object.entries(tracking).filter(([key, value]) => value && !(key in payload)),
  );

  const response = await fetch(LEAD_WEBHOOK_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ ...payload, ...extras }),
  });

  if (!response.ok) {
    throw new Error('Falha ao enviar lead');
  }
}

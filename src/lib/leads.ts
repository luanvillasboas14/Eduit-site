export const LEAD_WEBHOOK_URL =
  'https://n8n-new-n8n.ca31ey.easypanel.host/webhook/criacao_csv_leads_v3';

export type LeadTipo = 'Graduação' | 'Pós-Graduação';

export type LeadPayload = {
  nome: string;
  email: string;
  celular: string;
  tipo: LeadTipo;
  politica_privacidade: boolean;
  gclid: string;
  origem: string;
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

export function captureGclidFromUrl(): void {
  try {
    const gclid = new URLSearchParams(window.location.search).get('gclid');
    if (gclid) sessionStorage.setItem('gclid', gclid);
  } catch {
    /* ignore */
  }
}

export function getGclid(): string {
  captureGclidFromUrl();
  try {
    return sessionStorage.getItem('gclid') || '';
  } catch {
    return '';
  }
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
}): Promise<void> {
  const payload: LeadPayload = {
    nome: input.nome.trim(),
    email: input.email.trim(),
    celular: digitsOnly(input.celular),
    tipo: input.tipo,
    politica_privacidade: true,
    gclid: getGclid(),
    origem: 'form-eduit',
  };

  const response = await fetch(LEAD_WEBHOOK_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    throw new Error('Falha ao enviar lead');
  }
}

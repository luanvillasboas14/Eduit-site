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

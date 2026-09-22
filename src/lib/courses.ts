import { useEffect, useState } from 'react';
import { Course, CourseContentItem, CourseOffer } from '../types';

type CourseTipo = 'graduacao' | 'pos';

type ApiOffer = {
  id?: number;
  chave?: string | null;
  duracao?: string | null;
  parcelas?: number | string | null;
  modalidade?: string | null;
  formacao?: string | null;
  valor?: number | string | null;
};

type ApiCourse = {
  slug: string;
  tipo: CourseTipo;
  titulo: string;
  categoria: string;
  category_badge: string;
  sobre?: string | null;
  imagem?: string | null;
  formacao?: string | null;
  duracao?: string | null;
  modalidade?: string | null;
  preco?: number | string | null;
  meta_title?: string | null;
  meta_description?: string | null;
  img_alt?: string | null;
  mercado_trabalho?: string | null;
  indicacao_texto?: string | null;
  aprendizados?: CourseContentItem[] | string | null;
  indicacoes?: CourseContentItem[] | string | null;
  areas_atuacao?: CourseContentItem[] | string | null;
  featured?: boolean;
  ofertas?: ApiOffer[] | string | null;
};

const FALLBACK_IMAGE =
  'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=800&q=80';

function toNumber(value: unknown): number {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : 0;
}

function asItems(value: CourseContentItem[] | string | null | undefined): CourseContentItem[] {
  if (!value) return [];
  const parsed = typeof value === 'string' ? (JSON.parse(value) as CourseContentItem[]) : value;
  return Array.isArray(parsed) ? parsed.filter((item) => item?.title) : [];
}

function asOffers(value: ApiOffer[] | string | null | undefined): CourseOffer[] {
  if (!value) return [];
  const parsed = typeof value === 'string' ? (JSON.parse(value) as ApiOffer[]) : value;
  if (!Array.isArray(parsed)) return [];
  return parsed
    .map((offer) => ({
      id: offer.id,
      chave: offer.chave || undefined,
      duration: offer.duracao || '',
      installments: offer.parcelas != null ? toNumber(offer.parcelas) : undefined,
      modality: offer.modalidade || 'EAD',
      formation: offer.formacao || undefined,
      price: toNumber(offer.valor),
    }))
    .filter((offer) => offer.price > 0 || offer.duration);
}

export function mapCourseRow(row: ApiCourse): Course {
  const moduleDetails = asItems(row.aprendizados);
  const audience = asItems(row.indicacoes);
  const careerDetails = asItems(row.areas_atuacao);
  const offers = asOffers(row.ofertas);
  const primary = offers[0];

  return {
    id: row.slug,
    title: row.titulo,
    category: row.categoria,
    categoryBadge: row.category_badge,
    rating: 4.8,
    duration: row.duracao || primary?.duration || '',
    students: '',
    price: toNumber(row.preco ?? primary?.price),
    image: row.imagem || FALLBACK_IMAGE,
    imageAlt: row.img_alt || `Curso de ${row.titulo}`,
    description: row.sobre || '',
    modality: row.modalidade || primary?.modality || 'EAD',
    modules: moduleDetails.map((item) => item.title),
    careerOpportunities: careerDetails.map((item) => item.title),
    formation: row.formacao || primary?.formation || undefined,
    featured: Boolean(row.featured),
    jobMarket: row.mercado_trabalho || undefined,
    audienceText: row.indicacao_texto || undefined,
    metaTitle: row.meta_title || undefined,
    metaDescription: row.meta_description || undefined,
    moduleDetails,
    audience,
    careerDetails,
    offers,
  };
}

const listCache = new Map<string, Course[]>();
const listInflight = new Map<string, Promise<Course[]>>();
const detailCache = new Map<string, Course>();

export async function fetchCourses(tipo?: CourseTipo): Promise<Course[]> {
  const key = tipo || 'all';
  const cached = listCache.get(key);
  if (cached) return cached;

  const pending = listInflight.get(key);
  if (pending) return pending;

  const query = tipo ? `?tipo=${encodeURIComponent(tipo)}` : '';
  const request = fetch(`/api/cursos${query}`)
    .then(async (response) => {
      if (!response.ok) throw new Error('Falha ao carregar cursos');
      const rows = (await response.json()) as ApiCourse[];
      const mapped = rows.map(mapCourseRow);
      listCache.set(key, mapped);
      return mapped;
    })
    .finally(() => {
      listInflight.delete(key);
    });

  listInflight.set(key, request);
  return request;
}

export async function fetchCourseBySlug(slug: string | undefined): Promise<Course | undefined> {
  if (!slug) return undefined;
  const decoded = decodeURIComponent(slug);
  const cached = detailCache.get(decoded);
  if (cached) return cached;

  const response = await fetch(`/api/cursos/${encodeURIComponent(decoded)}`);
  if (response.status === 404) return undefined;
  if (!response.ok) throw new Error('Falha ao carregar o curso');
  const row = (await response.json()) as ApiCourse;
  const course = mapCourseRow(row);
  detailCache.set(decoded, course);
  return course;
}

export function splitSentences(text: string): string[] {
  const cleaned = text
    .replace(/\s+/g, ' ')
    .trim()
    .replace(/:\s+(?=(Qual|Quais|Como|O que|Quando|Onde|Por que)\b)/gi, '. ');
  if (!cleaned) return [];
  const matches = cleaned.match(/[^.!?]+[.!?]+|[^.!?]+$/g);
  return (matches || [cleaned]).map((part) => part.trim()).filter(Boolean);
}

function groupSentences(sentences: string[], size = 2): string[] {
  const paragraphs: string[] = [];
  for (let i = 0; i < sentences.length; i += size) {
    paragraphs.push(sentences.slice(i, i + size).join(' '));
  }
  return paragraphs;
}

function splitFaqParagraphs(sentences: string[]): string[] | null {
  const questionAt = sentences
    .map((sentence, index) => (/[?？]\s*$/.test(sentence) ? index : -1))
    .filter((index) => index >= 0);
  if (questionAt.length < 2) return null;

  const paragraphs: string[] = [];
  let cursor = 0;
  for (const qIndex of questionAt) {
    if (qIndex > cursor) {
      paragraphs.push(...groupSentences(sentences.slice(cursor, qIndex)));
    }
    const nextQ = questionAt.find((index) => index > qIndex);
    const end = nextQ ?? sentences.length;
    paragraphs.push(sentences.slice(qIndex, end).join(' '));
    cursor = end;
  }
  if (cursor < sentences.length) {
    paragraphs.push(...groupSentences(sentences.slice(cursor)));
  }
  return paragraphs;
}

export function splitParagraphs(text: string): string[] {
  if (!text?.trim()) return [];

  const fromDb = text
    .split(/\n+/)
    .map((part) => part.replace(/[ \t]+/g, ' ').trim())
    .filter(Boolean);
  if (fromDb.length > 1) return fromDb;

  const sentences = splitSentences(text);
  return splitFaqParagraphs(sentences) ?? groupSentences(sentences);
}

/** Resumo curto para cards e hero — 1 frase, no máximo ~2 linhas. */
export function previewText(text: string, maxChars = 170): string {
  const sentences = splitSentences(text);
  if (sentences.length === 0) return '';
  let out = sentences[0];
  if (out.length < 90 && sentences[1]) {
    const combined = `${out} ${sentences[1]}`;
    if (combined.length <= maxChars) out = combined;
  }
  if (out.length <= maxChars) return out;
  return `${out.slice(0, maxChars).replace(/\s+\S*$/, '')}…`;
}

export function formatBRL(value?: number): string {
  if (!value) return '';
  return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}

export function originalFromPrice(price: number, original?: number): number {
  if (original && original > price) return original;
  return Math.round(price * 1.8);
}

export function useCourses(tipo?: CourseTipo) {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let active = true;
    setLoading(true);
    fetchCourses(tipo)
      .then((rows) => {
        if (!active) return;
        setCourses(rows);
        setError('');
      })
      .catch((err: Error) => {
        if (!active) return;
        setError(err.message || 'Não foi possível carregar os cursos');
        setCourses([]);
      })
      .finally(() => {
        if (active) setLoading(false);
      });
    return () => {
      active = false;
    };
  }, [tipo]);

  return { courses, loading, error };
}

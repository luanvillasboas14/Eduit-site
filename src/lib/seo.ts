import { Course, NewsArticle, Polo } from '../types';
import { PATHS } from '../data/siteUrls';
import { previewText } from './courses';

export type SeoContent = {
  title: string;
  description: string;
};

const BRAND = 'Cruzeiro do Sul Virtual';

export const DEFAULT_SEO: SeoContent = {
  title: `${BRAND} | Graduação e Pós EAD`,
  description:
    'Cursos de graduação e pós-graduação EAD da Cruzeiro do Sul Virtual. Consulte bolsas, polos de apoio e formas de ingresso.',
};

const STATIC_SEO: Record<string, SeoContent> = {
  [PATHS.home]: DEFAULT_SEO,
  [PATHS.graduacao]: {
    title: `Cursos de Graduação EAD | ${BRAND}`,
    description:
      'Veja a grade de graduação EAD e semipresencial da Cruzeiro do Sul Virtual. Filtre por área, modalidade e fale com um consultor para bolsas.',
  },
  [PATHS.posGraduacao]: {
    title: `Pós-graduação e MBA EAD | ${BRAND}`,
    description:
      'Especializações e MBAs EAD da Cruzeiro do Sul Virtual. Compare duração, área de atuação e condições de bolsa com um consultor.',
  },
  [PATHS.blog]: {
    title: `Notícias e dicas | ${BRAND}`,
    description:
      'Novidades sobre vestibular, carreira, bolsas e vida acadêmica na Cruzeiro do Sul Virtual.',
  },
  [PATHS.busca]: {
    title: `Busca | ${BRAND}`,
    description:
      'Pesquise cursos de graduação, pós-graduação, polos de apoio e publicações do blog da Cruzeiro do Sul Virtual.',
  },
  '/educacao': {
    title: `Graduação em Educação | ${BRAND}`,
    description: 'Cursos de graduação na área de Educação EAD da Cruzeiro do Sul Virtual.',
  },
  '/comunicacao': {
    title: `Graduação em Comunicação | ${BRAND}`,
    description: 'Cursos de graduação em Comunicação EAD da Cruzeiro do Sul Virtual.',
  },
  '/gestao-negocios': {
    title: `Graduação em Gestão e Negócios | ${BRAND}`,
    description: 'Cursos de graduação em Gestão e Negócios EAD da Cruzeiro do Sul Virtual.',
  },
  '/saude': {
    title: `Graduação em Saúde | ${BRAND}`,
    description: 'Cursos de graduação na área da Saúde da Cruzeiro do Sul Virtual.',
  },
  '/tecnologia': {
    title: `Graduação em Tecnologia | ${BRAND}`,
    description: 'Cursos de graduação em Tecnologia e computação EAD da Cruzeiro do Sul Virtual.',
  },
  '/arquitetura-design': {
    title: `Graduação em Arquitetura e Design | ${BRAND}`,
    description: 'Cursos de Arquitetura e Design da Cruzeiro do Sul Virtual.',
  },
  '/direito-ciencia-politica': {
    title: `Graduação em Direito e Ciência Política | ${BRAND}`,
    description: 'Cursos de Direito e Ciência Política da Cruzeiro do Sul Virtual.',
  },
  '/engenharia-tecnologia': {
    title: `Graduação em Engenharia | ${BRAND}`,
    description: 'Cursos de Engenharia da Cruzeiro do Sul Virtual, com opções EAD e semipresenciais.',
  },
  '/graduacao-semipresencial': {
    title: `Graduação semipresencial | ${BRAND}`,
    description: 'Cursos de graduação semipresencial da Cruzeiro do Sul Virtual.',
  },
  '/graduacao-gastronomia': {
    title: `Gastronomia | ${BRAND}`,
    description: 'Curso de Gastronomia da Cruzeiro do Sul Virtual.',
  },
  '/pos-educacao': {
    title: `Pós em Educação | ${BRAND}`,
    description: 'Pós-graduação EAD na área de Educação da Cruzeiro do Sul Virtual.',
  },
  '/pos-comunicao': {
    title: `Pós em Comunicação | ${BRAND}`,
    description: 'Pós-graduação EAD em Comunicação da Cruzeiro do Sul Virtual.',
  },
  '/pos-gestao-negocios': {
    title: `Pós em Gestão e Negócios | ${BRAND}`,
    description: 'Pós-graduação e MBA em Gestão e Negócios da Cruzeiro do Sul Virtual.',
  },
  '/pos-saude': {
    title: `Pós em Saúde | ${BRAND}`,
    description: 'Pós-graduação EAD na área da Saúde da Cruzeiro do Sul Virtual.',
  },
  '/pos-direito': {
    title: `Pós em Direito | ${BRAND}`,
    description: 'Pós-graduação EAD em Direito da Cruzeiro do Sul Virtual.',
  },
  '/pos-engenharia': {
    title: `Pós em Engenharia | ${BRAND}`,
    description: 'Pós-graduação EAD em Engenharia da Cruzeiro do Sul Virtual.',
  },
};

export function seoForPath(pathname: string): SeoContent {
  return STATIC_SEO[pathname] || DEFAULT_SEO;
}

export function seoForBlogCategory(name: string): SeoContent {
  return {
    title: `${name} | Blog ${BRAND}`,
    description: `Artigos da categoria ${name} no blog da Cruzeiro do Sul Virtual.`,
  };
}

export function seoForCourse(course: Course): SeoContent {
  const description =
    course.metaDescription ||
    previewText(course.description, 160) ||
    `Conheça o curso de ${course.title} ${course.modality || 'EAD'} da Cruzeiro do Sul Virtual.`;
  return {
    title: course.metaTitle || `${course.title} | ${BRAND}`,
    description,
  };
}

export function seoForPolo(polo: Polo): SeoContent {
  return {
    title: `${polo.name} | Polo EAD ${BRAND}`,
    description: `Polo de apoio presencial ${polo.name} em ${polo.neighborhood}, ${polo.city}/${polo.state}. Endereço, horários e cursos disponíveis.`,
  };
}

export function seoForPost(article: NewsArticle): SeoContent {
  return {
    title: `${article.title} | Blog ${BRAND}`,
    description: article.summary || `Leia ${article.title} no blog da Cruzeiro do Sul Virtual.`,
  };
}

export function seoForNotFound(): SeoContent {
  return {
    title: `Página não encontrada | ${BRAND}`,
    description: 'A página que você tentou abrir não existe. Volte ao início ou busque um curso, polo ou notícia.',
  };
}

function upsertMeta(attr: 'name' | 'property', key: string, content: string): void {
  let el = document.head.querySelector(`meta[${attr}="${key}"]`) as HTMLMetaElement | null;
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
}

export function applySeo({ title, description }: SeoContent, canonicalPath?: string): void {
  document.title = title;
  upsertMeta('name', 'description', description);
  upsertMeta('property', 'og:title', title);
  upsertMeta('property', 'og:description', description);
  upsertMeta('property', 'og:type', 'website');

  const site = (import.meta.env.VITE_SITE_URL as string | undefined)?.replace(/\/$/, '');
  const path = canonicalPath || (typeof window !== 'undefined' ? window.location.pathname : '/');
  if (site) {
    let link = document.head.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
    if (!link) {
      link = document.createElement('link');
      link.rel = 'canonical';
      document.head.appendChild(link);
    }
    link.href = `${site}${path}`;
    upsertMeta('property', 'og:url', `${site}${path}`);
  }
}

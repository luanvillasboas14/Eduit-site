import { Course, NewsArticle, Polo } from '../types';
import { COURSES_DATA } from './courses';
import { POLOS_DATA } from './polos';

/** Paths iguais aos slugs do Wix (eduit.com.br). Sem rotas inventadas. */
export const PATHS = {
  home: '/',
  graduacao: '/graduacao',
  posGraduacao: '/pos-graduacao',
  blog: '/blog',
} as const;

export type BlogCategory = {
  path: string;
  name: string;
};

/** Categorias do blog no Wix (nome + endereço iguais ao site atual). */
export const BLOG_CATEGORIES: BlogCategory[] = [
  { path: '/blog/categories/cursos', name: 'Cursos de Graduação' },
  { path: '/blog/categories/cursos-de-pos-graduacao', name: 'Cursos de Pós-Graduação' },
  { path: '/blog/categories/curiosidades/dicas', name: 'Curiosidades/dicas' },
  { path: '/blog/categories/financeiro', name: 'Financeiro' },
  { path: '/blog/categories/duvidas-academicas', name: 'Duvidas Academicas' },
];

export const BLOG_CATEGORY_BY_PATH = Object.fromEntries(
  BLOG_CATEGORIES.map((category) => [category.path, category.name]),
);

export const BLOG_CATEGORY_BY_NAME = Object.fromEntries(
  BLOG_CATEGORIES.map((category) => [category.name, category.path]),
);

export function blogCategoryPath(name: string): string {
  return BLOG_CATEGORY_BY_NAME[name] ?? PATHS.blog;
}

export function articleMatchesBlogCategory(article: NewsArticle, categoryName: string): boolean {
  if (categoryName === 'Todos') return true;
  if (article.category === categoryName) return true;
  return Boolean(article.tags?.includes(categoryName));
}

export function wixBlogCategoryLabel(article: Pick<NewsArticle, 'category' | 'badge'>): string | null {
  if (article.category && BLOG_CATEGORY_BY_NAME[article.category]) return article.category;
  if (article.badge && BLOG_CATEGORY_BY_NAME[article.badge]) return article.badge;
  return null;
}

export type CourseListFilter = {
  category: string;
  modality?: string;
  titleIncludes?: string;
};

/** Páginas de categoria de graduação que existem no Wix. */
export const GRAD_CATEGORY_ROUTES: Record<string, CourseListFilter> = {
  '/educacao': { category: 'Educação' },
  '/comunicacao': { category: 'Comunicação' },
  '/gestao-negocios': { category: 'Negócios' },
  '/saude': { category: 'Saúde' },
  '/tecnologia': { category: 'Tecnologia' },
  '/arquitetura-design': { category: 'Arquitetura' },
  '/direito-ciencia-politica': { category: 'Jurídico' },
  '/engenharia-tecnologia': { category: 'Todos', titleIncludes: 'Engenharia' },
  '/graduacao-semipresencial': { category: 'Todos', modality: 'Semipresencial' },
  '/graduacao-gastronomia': { category: 'Todos', titleIncludes: 'Gastronomia' },
};

/** Páginas de categoria de pós que existem no Wix. */
export const POS_CATEGORY_ROUTES: Record<string, CourseListFilter> = {
  '/pos-educacao': { category: 'Educação' },
  '/pos-comunicao': { category: 'Comunicação' },
  '/pos-gestao-negocios': { category: 'Negócios' },
  '/pos-saude': { category: 'Saúde' },
  '/pos-direito': { category: 'Jurídico' },
  '/pos-engenharia': { category: 'Todos', titleIncludes: 'Engenharia' },
};

/** Filtro da UI → URL Wix, só quando a página de categoria existe. */
export const GRAD_CATEGORY_BY_NAME: Record<string, string> = {
  Todos: PATHS.graduacao,
  Negócios: '/gestao-negocios',
  Tecnologia: '/tecnologia',
  Saúde: '/saude',
  Jurídico: '/direito-ciencia-politica',
  Educação: '/educacao',
};

export const POS_CATEGORY_BY_NAME: Record<string, string> = {
  Todos: PATHS.posGraduacao,
  Negócios: '/pos-gestao-negocios',
  Saúde: '/pos-saude',
  Jurídico: '/pos-direito',
  Educação: '/pos-educacao',
};

/** id do curso local → slug Wix em /graduacao-cruzeiro/:slug ou /pos/:slug */
export const COURSE_SLUGS: Record<string, string> = {
  adm: 'administracao',
  pedagogia: 'pedagogia',
  farmacia: 'farmacia',
  nutricao: 'nutricao',
  direito: 'direito',
  psicologia: 'psicologia',
  'eng-software': 'engenharia-de-software',
  ads: 'analise-desenvolvimento-de-sistemas',
  enfermagem: 'enfermagem',
  contabeis: 'ciencias-contabeis',
  'gestao-rh': 'gestao-de-recursos-humanos',
  'pos-ia': 'inteligencia-artificial-e-machine-learning',
  'mba-gestao-estrategica': 'mba-gestao-estrategica-de-pessoas',
  'pos-psicopedagogia': 'psicopedagogia',
  'pos-direito-digital': 'direito-digital-e-lei-geral',
  'pos-gestao-saude': 'mba-gestao-saude',
  'pos-marketing-digital': 'marketing-digital',
};

/** id do polo local → path Wix (sem barra inicial) */
export const POLO_SLUGS: Record<string, string> = {
  'polo-barra-funda': 'polo-cruzeiro-do-sul-barra-funda',
  'polo-sapopemba': 'polo-sapopemba',
  'polo-morumbi-butanta': 'polo-butanta-morumbi',
  'polo-taboao-da-serra-centro': 'polo-tabao-da-serra-centro',
  'polo-taboao-da-serra-mituzi': 'polo-taboao-da-serra-mituizi',
  'polo-ibirapuera': 'polo-ibirapuera',
  'polo-vila-prudente': 'polo-vila-prudente',
  'polo-campinas': 'polo-campinas',
  'polo-capivari': 'polo-capivari',
  'polo-itapira': 'polo-itapira',
  'polo-santana': 'polo-cruzeiro-do-sul-santana-2',
  'polo-vila-mariana': 'polo-cruzeiro-do-sul-vila-mariana',
  'polo-freguesia-do-o': 'polo-freguesia-do-o',
};

export const POLO_PATHS = Object.values(POLO_SLUGS).map((slug) => `/${slug}`);

export function isPostgradCourse(course: Course): boolean {
  return course.categoryBadge === 'PÓS-GRADUAÇÃO';
}

export function coursePath(course: Course): string {
  const slug = COURSE_SLUGS[course.id] ?? course.id;
  return isPostgradCourse(course) ? `/pos/${slug}` : `/graduacao-cruzeiro/${slug}`;
}

export function poloPath(polo: Polo): string {
  return `/${POLO_SLUGS[polo.id] ?? polo.id}`;
}

export function postPath(article: NewsArticle): string {
  return `/post/${article.id}`;
}

export function findCourseBySlug(slug: string | undefined): Course | undefined {
  if (!slug) return undefined;
  const decoded = decodeURIComponent(slug);
  const id = Object.keys(COURSE_SLUGS).find((key) => COURSE_SLUGS[key] === decoded);
  if (id) return COURSES_DATA.find((course) => course.id === id);
  return COURSES_DATA.find((course) => course.id === decoded);
}

export function findPoloBySlug(slug: string | undefined): Polo | undefined {
  if (!slug) return undefined;
  const id = Object.keys(POLO_SLUGS).find((key) => POLO_SLUGS[key] === slug);
  if (id) return POLOS_DATA.find((polo) => polo.id === id);
  return POLOS_DATA.find((polo) => polo.id === slug);
}

export function isListingPath(pathname: string): boolean {
  return (
    pathname === PATHS.graduacao ||
    pathname === PATHS.posGraduacao ||
    pathname in GRAD_CATEGORY_ROUTES ||
    pathname in POS_CATEGORY_ROUTES
  );
}

export type NavPage = 'home' | 'courses' | 'pos-graduacao' | 'news';

export function navPageFromPath(pathname: string): NavPage {
  if (
    pathname === PATHS.graduacao ||
    pathname.startsWith('/graduacao-cruzeiro/') ||
    pathname in GRAD_CATEGORY_ROUTES
  ) {
    return 'courses';
  }
  if (
    pathname === PATHS.posGraduacao ||
    pathname.startsWith('/pos/') ||
    pathname in POS_CATEGORY_ROUTES
  ) {
    return 'pos-graduacao';
  }
  if (pathname === PATHS.blog || pathname.startsWith('/post/') || pathname.startsWith('/blog/categories/')) {
    return 'news';
  }
  return 'home';
}

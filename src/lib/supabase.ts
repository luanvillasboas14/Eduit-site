import { NewsArticle } from '../types';

const supabaseUrl = (import.meta.env.VITE_SUPABASE_URL as string | undefined)?.replace(/\/rest\/v1\/?$/, '') ?? '';
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined;

export function isSupabaseConfigured(): boolean {
  return Boolean(supabaseUrl && supabaseKey);
}

async function supabaseGet<T>(path: string): Promise<T> {
  if (!supabaseUrl || !supabaseKey) {
    throw new Error('Supabase não configurado. Defina VITE_SUPABASE_URL e VITE_SUPABASE_ANON_KEY.');
  }

  const response = await fetch(`${supabaseUrl}/rest/v1/${path}`, {
    headers: {
      apikey: supabaseKey,
      Authorization: `Bearer ${supabaseKey}`,
    },
  });

  if (!response.ok) {
    throw new Error(`Falha ao ler o banco (${response.status})`);
  }

  return response.json() as Promise<T>;
}

type BlogPostRow = {
  id: string;
  category: string;
  badge: string | null;
  title: string;
  summary: string | null;
  content?: string | null;
  date: string | null;
  read_time: string | null;
  image: string | null;
  is_featured: boolean | null;
  author_name: string | null;
  author_role: string | null;
  author_avatar: string | null;
  tags: string[] | null;
};

const MONTHS: Record<string, number> = {
  Jan: 0,
  Fev: 1,
  Mar: 2,
  Abr: 3,
  Mai: 4,
  Jun: 5,
  Jul: 6,
  Ago: 7,
  Set: 8,
  Out: 9,
  Nov: 10,
  Dez: 11,
};

function parseDisplayDate(value: string | null): number {
  if (!value) return 0;
  const match = value.match(/^(\d{1,2})\s+([A-Za-zçÇ]+)\s+(\d{4})$/);
  if (!match) return 0;
  const month = MONTHS[match[2]];
  if (month === undefined) return 0;
  return Date.UTC(Number(match[3]), month, Number(match[1]));
}

export function mapBlogRow(row: BlogPostRow): NewsArticle {
  return {
    id: row.id,
    category: row.category,
    badge: row.badge || row.category,
    title: row.title,
    summary: row.summary || '',
    content: row.content || '',
    date: row.date || '',
    readTime: row.read_time || '',
    image: row.image || undefined,
    isFeatured: Boolean(row.is_featured),
    author: {
      name: row.author_name || 'Eduit',
      role: row.author_role || 'Blog Eduit',
      avatar: row.author_avatar || undefined,
    },
    tags: row.tags || [],
  };
}

function sortPosts(posts: NewsArticle[]): NewsArticle[] {
  return [...posts].sort((a, b) => {
    if (Boolean(a.isFeatured) !== Boolean(b.isFeatured)) {
      return a.isFeatured ? -1 : 1;
    }
    return parseDisplayDate(b.date) - parseDisplayDate(a.date);
  });
}

const LIST_COLUMNS =
  'id,category,badge,title,summary,date,read_time,image,is_featured,author_name,author_role,author_avatar,tags';

export async function fetchBlogPosts(): Promise<NewsArticle[]> {
  const rows = await supabaseGet<BlogPostRow[]>(`blog_posts?select=${LIST_COLUMNS}`);
  return sortPosts(rows.map(mapBlogRow));
}

export async function fetchBlogPost(slug: string): Promise<NewsArticle | null> {
  const decoded = decodeURIComponent(slug);
  const encoded = encodeURIComponent(decoded);
  const rows = await supabaseGet<BlogPostRow[]>(
    `blog_posts?id=eq.${encoded}&select=id,category,badge,title,summary,content,date,read_time,image,is_featured,author_name,author_role,author_avatar,tags`,
  );
  return rows[0] ? mapBlogRow(rows[0]) : null;
}

export async function fetchRelatedPosts(articleId: string, category: string, limit = 3): Promise<NewsArticle[]> {
  const rows = await supabaseGet<BlogPostRow[]>(
    `blog_posts?id=neq.${encodeURIComponent(articleId)}&category=eq.${encodeURIComponent(category)}&select=${LIST_COLUMNS}&limit=${limit}`,
  );
  if (rows.length >= limit) return rows.map(mapBlogRow);
  const extra = await supabaseGet<BlogPostRow[]>(
    `blog_posts?id=neq.${encodeURIComponent(articleId)}&select=${LIST_COLUMNS}&limit=${limit}`,
  );
  return extra.map(mapBlogRow).slice(0, limit);
}

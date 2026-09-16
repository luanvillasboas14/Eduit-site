import React, { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Clock, GraduationCap, Award, MapPin, Newspaper, Search, X } from 'lucide-react';
import { Course, NewsArticle, Polo } from '../types';
import { PATHS, isPostgradCourse } from '../data/siteUrls';
import { POLOS_DATA } from '../data/polos';
import { previewText, useCourses } from '../lib/courses';
import { fetchBlogPosts } from '../lib/supabase';
import { matchesAny } from '../lib/text';
import { trackSearch } from '../lib/analytics';
import { seoForPath } from '../lib/seo';
import { Seo } from './Seo';

interface SearchPageProps {
  onSelectCourse: (course: Course) => void;
  onSelectPolo: (polo: Polo) => void;
  onSelectArticle: (article: NewsArticle) => void;
  onNavigateHome: () => void;
}

type Tab = 'all' | 'graduacao' | 'pos' | 'polos' | 'blog';

export const SearchPage: React.FC<SearchPageProps> = ({
  onSelectCourse,
  onSelectPolo,
  onSelectArticle,
  onNavigateHome,
}) => {
  const [params, setParams] = useSearchParams();
  const initial = params.get('q') || '';
  const [query, setQuery] = useState(initial);
  const [tab, setTab] = useState<Tab>('all');
  const [posts, setPosts] = useState<NewsArticle[]>([]);
  const { courses, loading } = useCourses();
  const seo = seoForPath(PATHS.busca);

  useEffect(() => {
    setQuery(params.get('q') || '');
  }, [params]);

  useEffect(() => {
    fetchBlogPosts()
      .then(setPosts)
      .catch(() => setPosts([]));
  }, []);

  useEffect(() => {
    const q = query.trim();
    if (q.length < 2) return;
    const timer = window.setTimeout(() => trackSearch(q, 'global'), 400);
    return () => window.clearTimeout(timer);
  }, [query]);

  const graduation = useMemo(
    () => courses.filter((course) => !isPostgradCourse(course)),
    [courses],
  );
  const postgrad = useMemo(
    () => courses.filter((course) => isPostgradCourse(course)),
    [courses],
  );

  const matchingGrad = useMemo(
    () =>
      graduation.filter((course) =>
        matchesAny(query, [course.title, course.category, course.description, course.modality, ...course.modules]),
      ),
    [graduation, query],
  );
  const matchingPos = useMemo(
    () =>
      postgrad.filter((course) =>
        matchesAny(query, [course.title, course.category, course.description, course.modality, ...course.modules]),
      ),
    [postgrad, query],
  );
  const matchingPolos = useMemo(
    () =>
      POLOS_DATA.filter((polo) =>
        matchesAny(query, [polo.name, polo.city, polo.neighborhood, polo.address, polo.state]),
      ),
    [query],
  );
  const matchingPosts = useMemo(
    () =>
      posts.filter((article) =>
        matchesAny(query, [article.title, article.summary, article.category, article.content, ...(article.tags || [])]),
      ),
    [posts, query],
  );

  const total =
    matchingGrad.length + matchingPos.length + matchingPolos.length + matchingPosts.length;

  const commitQuery = (value: string) => {
    setQuery(value);
    setParams(value.trim() ? { q: value.trim() } : {}, { replace: true });
  };

  const tabs: Array<{ id: Tab; label: string; count: number }> = [
    { id: 'all', label: 'Tudo', count: total },
    { id: 'graduacao', label: 'Graduação', count: matchingGrad.length },
    { id: 'pos', label: 'Pós', count: matchingPos.length },
    { id: 'polos', label: 'Polos', count: matchingPolos.length },
    { id: 'blog', label: 'Blog', count: matchingPosts.length },
  ];

  const showGrad = tab === 'all' || tab === 'graduacao';
  const showPos = tab === 'all' || tab === 'pos';
  const showPolos = tab === 'all' || tab === 'polos';
  const showBlog = tab === 'all' || tab === 'blog';

  return (
    <div className="min-h-screen bg-slate-100 text-slate-900 pb-24">
      <Seo {...seo} path={PATHS.busca} />
      <div className="bg-[#0b1329] border-b border-slate-800 text-white pt-8 pb-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto space-y-5">
          <div className="flex items-center gap-2 text-xs text-slate-400">
            <button type="button" onClick={onNavigateHome} className="hover:text-yellow-400">
              Início
            </button>
            <span>/</span>
            <span className="text-yellow-400 font-semibold">Busca</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight">O que você procura hoje?</h1>
          <p className="text-xs sm:text-sm text-slate-300 max-w-2xl">
            Resultados em graduação, pós-graduação, polos de apoio e blog.
          </p>
          <form
            onSubmit={(event) => {
              event.preventDefault();
              commitQuery(query);
            }}
            className="relative"
          >
            <Search className="w-5 h-5 text-yellow-400 absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              onBlur={() => commitQuery(query)}
              placeholder="Buscar curso, polo ou notícia..."
              className="w-full bg-slate-900/90 border-2 border-slate-700 focus:border-yellow-400 rounded-2xl pl-12 pr-12 py-3.5 text-sm text-white placeholder-slate-400 focus:outline-none"
            />
            {query && (
              <button
                type="button"
                onClick={() => commitQuery('')}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
                aria-label="Limpar busca"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </form>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 space-y-8">
        <div className="flex flex-wrap gap-2">
          {tabs.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => setTab(item.id)}
              className={`text-xs font-bold px-3 py-1.5 rounded-full border ${
                tab === item.id
                  ? 'bg-yellow-400 text-slate-950 border-yellow-400'
                  : 'bg-white text-slate-600 border-slate-200'
              }`}
            >
              {item.label} ({item.count})
            </button>
          ))}
        </div>

        {loading ? (
          <p className="text-sm text-slate-500">Carregando resultados...</p>
        ) : total === 0 ? (
          <p className="text-sm text-slate-500">
            Nenhum resultado para “{query}”. Tente outro termo.
          </p>
        ) : (
          <>
            {showGrad && matchingGrad.length > 0 && (
              <section className="space-y-3">
                <h2 className="text-lg font-extrabold text-slate-900 flex items-center gap-2">
                  <GraduationCap className="w-5 h-5 text-yellow-600" />
                  Graduação
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {matchingGrad.slice(0, tab === 'all' ? 6 : 24).map((course) => (
                    <button
                      key={course.id}
                      type="button"
                      onClick={() => onSelectCourse(course)}
                      className="text-left bg-[#0b1329] border border-slate-800 rounded-2xl p-4 hover:border-yellow-400 transition-colors"
                    >
                      <p className="text-[10px] font-extrabold text-yellow-400 uppercase">{course.categoryBadge}</p>
                      <h3 className="text-sm font-bold text-white mt-1">{course.title}</h3>
                      <p className="text-[11px] text-slate-300 line-clamp-2 mt-1">{previewText(course.description)}</p>
                      <p className="text-[11px] text-slate-400 mt-2 flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {course.duration}
                      </p>
                    </button>
                  ))}
                </div>
              </section>
            )}

            {showPos && matchingPos.length > 0 && (
              <section className="space-y-3">
                <h2 className="text-lg font-extrabold text-slate-900 flex items-center gap-2">
                  <Award className="w-5 h-5 text-yellow-600" />
                  Pós-graduação
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {matchingPos.slice(0, tab === 'all' ? 6 : 24).map((course) => (
                    <button
                      key={course.id}
                      type="button"
                      onClick={() => onSelectCourse(course)}
                      className="text-left bg-[#0b1329] border border-slate-800 rounded-2xl p-4 hover:border-yellow-400 transition-colors"
                    >
                      <p className="text-[10px] font-extrabold text-yellow-400 uppercase">{course.categoryBadge}</p>
                      <h3 className="text-sm font-bold text-white mt-1">{course.title}</h3>
                      <p className="text-[11px] text-slate-300 line-clamp-2 mt-1">{previewText(course.description)}</p>
                    </button>
                  ))}
                </div>
              </section>
            )}

            {showPolos && matchingPolos.length > 0 && (
              <section className="space-y-3">
                <h2 className="text-lg font-extrabold text-slate-900 flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-yellow-600" />
                  Polos
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {matchingPolos.map((polo) => (
                    <button
                      key={polo.id}
                      type="button"
                      onClick={() => onSelectPolo(polo)}
                      className="text-left bg-white border border-slate-200 rounded-2xl p-4 hover:border-yellow-400 transition-colors"
                    >
                      <h3 className="text-sm font-bold text-slate-900">{polo.name}</h3>
                      <p className="text-[11px] text-slate-500 mt-1">
                        {polo.neighborhood} — {polo.city}/{polo.state}
                      </p>
                    </button>
                  ))}
                </div>
              </section>
            )}

            {showBlog && matchingPosts.length > 0 && (
              <section className="space-y-3">
                <h2 className="text-lg font-extrabold text-slate-900 flex items-center gap-2">
                  <Newspaper className="w-5 h-5 text-yellow-600" />
                  Blog
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {matchingPosts.slice(0, tab === 'all' ? 6 : 24).map((article) => (
                    <button
                      key={article.id}
                      type="button"
                      onClick={() => onSelectArticle(article)}
                      className="text-left bg-white border border-slate-200 rounded-2xl p-4 hover:border-yellow-400 transition-colors"
                    >
                      <h3 className="text-sm font-bold text-slate-900">{article.title}</h3>
                      <p className="text-[11px] text-slate-500 line-clamp-2 mt-1">{article.summary}</p>
                    </button>
                  ))}
                </div>
              </section>
            )}
          </>
        )}
      </div>
    </div>
  );
};

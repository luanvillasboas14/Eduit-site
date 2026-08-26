import React, { useEffect, useState } from 'react';
import { NewsArticle } from '../types';
import { fetchBlogPosts } from '../lib/supabase';
import { ArrowRight, Clock, Calendar, HelpCircle } from 'lucide-react';

interface NewsSectionProps {
  onSelectArticle: (article: NewsArticle) => void;
  onOpenConsultant: () => void;
  onNavigateToNews?: () => void;
}

export const NewsSection: React.FC<NewsSectionProps> = ({
  onSelectArticle,
  onOpenConsultant,
  onNavigateToNews,
}) => {
  const [articles, setArticles] = useState<NewsArticle[]>([]);

  useEffect(() => {
    fetchBlogPosts()
      .then((rows) => setArticles(rows.slice(0, 4)))
      .catch(() => setArticles([]));
  }, []);

  const featuredArticle = articles[0];
  const sideArticles = articles.slice(1, 4);

  if (!featuredArticle) {
    return (
      <section id="noticias" className="bg-slate-100 pt-6 sm:pt-10 pb-8 sm:pb-12 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-sm text-slate-500">
          Carregando novidades...
        </div>
      </section>
    );
  }

  return (
    <section id="noticias" className="bg-slate-100 pt-6 sm:pt-10 pb-8 sm:pb-12 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex items-end justify-between mb-4 sm:mb-6">
          <div>
            <span className="text-[10px] sm:text-xs font-bold tracking-widest text-slate-500 uppercase block mb-1">
              NOTÍCIAS & BLOG
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Últimas <span className="text-yellow-400">Novidades.</span>
            </h2>
          </div>

          {onNavigateToNews && (
            <button
              onClick={onNavigateToNews}
              className="hidden sm:inline-flex items-center gap-1.5 text-xs font-bold text-slate-800 hover:text-slate-950 bg-white border border-slate-300 hover:border-yellow-400 px-3.5 py-2 rounded-xl shadow-sm transition-all cursor-pointer"
            >
              <span>Ver todas</span>
              <ArrowRight className="w-3.5 h-3.5 text-yellow-600" />
            </button>
          )}
        </div>

        {/* Mobile View: Horizontal swipe carousel matching FeaturedCourses */}
        <div className="flex lg:hidden gap-4 overflow-x-auto pb-4 pt-1 -mx-4 px-[8.333%] snap-x snap-mandatory scrollbar-none mb-4">
          {articles.map((article) => (
            <div
              key={article.id}
              className="w-[76vw] min-w-[76vw] max-w-[280px] xs:w-[270px] xs:min-w-[270px] snap-center bg-[#0b1329] border-2 border-slate-800 hover:border-yellow-400 rounded-2xl overflow-hidden transition-all duration-300 flex flex-col group hover:-translate-y-1 hover:shadow-xl hover:shadow-slate-900/15 shrink-0"
            >
              {/* Card Image Header */}
              <div 
                onClick={() => onSelectArticle(article)}
                className="relative h-36 overflow-hidden cursor-pointer"
              >
                <img
                  src={article.image}
                  alt={article.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0b1329] via-[#0b1329]/30 to-transparent" />
                <span className="absolute top-2.5 left-2.5 bg-[#070d19]/90 text-yellow-400 font-extrabold text-[9px] uppercase px-2.5 py-0.5 rounded-full backdrop-blur-sm border border-slate-700/80 shadow-md">
                  {article.badge}
                </span>
              </div>

              {/* Card Content */}
              <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
                <div>
                  <h3 
                    onClick={() => onSelectArticle(article)}
                    className="text-base font-bold text-white mb-2 group-hover:text-yellow-400 transition-colors cursor-pointer line-clamp-2 leading-snug"
                  >
                    {article.title}
                  </h3>

                  <div className="flex items-center gap-2 flex-wrap text-[11px] text-slate-400">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5 text-slate-400" />
                      <span>{article.date}</span>
                    </div>
                    <span>•</span>
                    <div className="flex items-center gap-1 text-slate-300">
                      <span className="bg-slate-800 text-yellow-400 font-bold px-2 py-0.5 rounded text-[9px] uppercase">
                        {article.readTime}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Card Action */}
                <div className="pt-1">
                  <button
                    onClick={() => onSelectArticle(article)}
                    className="w-full bg-yellow-400 hover:bg-yellow-300 text-slate-950 font-bold py-2.5 px-4 rounded-xl text-xs transition-all shadow-md shadow-yellow-400/10 flex items-center justify-center gap-1.5 cursor-pointer active:scale-95"
                  >
                    <span>Ler Notícia</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Desktop View: Grid Layout (Left 7 cols + Right 5 cols) */}
        <div className="hidden lg:grid grid-cols-12 gap-5">
          {/* Main Featured Article (Left 7 cols) */}
          <div
            onClick={() => onSelectArticle(featuredArticle)}
            className="col-span-7 bg-[#0b1329] border border-slate-800/80 rounded-2xl overflow-hidden hover:border-yellow-500/40 transition-all duration-300 cursor-pointer group flex flex-col justify-between"
          >
            <div className="relative h-48 overflow-hidden">
              <img
                src={featuredArticle.image}
                alt={featuredArticle.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0b1329] via-transparent to-transparent" />
              <div className="absolute top-3 left-3 bg-yellow-400 text-slate-950 font-bold text-[10px] uppercase px-2.5 py-0.5 rounded-full shadow-md">
                {featuredArticle.badge}
              </div>
            </div>

            <div className="p-6 space-y-3">
              <h3 className="text-xl font-bold text-white group-hover:text-yellow-400 transition-colors leading-snug">
                {featuredArticle.title}
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed line-clamp-2">
                {featuredArticle.summary}
              </p>

              <div className="flex items-center justify-between pt-3 border-t border-slate-800">
                <div className="flex items-center gap-3 text-xs text-slate-400">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5 text-slate-400" />
                    {featuredArticle.date}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-slate-400" />
                    {featuredArticle.readTime}
                  </span>
                </div>

                <button className="bg-yellow-400 hover:bg-yellow-300 text-slate-950 font-bold px-3.5 py-1.5 rounded-lg text-xs transition-colors flex items-center gap-1">
                  <span>Ver mais</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>

          {/* Right Stack (Right 5 cols) */}
          <div className="col-span-5 flex flex-col justify-between space-y-3">
            {sideArticles.map((article) => (
              <div
                key={article.id}
                onClick={() => onSelectArticle(article)}
                className="bg-[#0b1329] border border-slate-800/80 rounded-xl p-3.5 hover:border-yellow-500/40 transition-all duration-300 cursor-pointer group space-y-2"
              >
                <div className="flex items-center gap-2">
                  <span className="bg-slate-900 border border-slate-800 text-yellow-400 font-extrabold text-[9px] uppercase px-2 py-0.5 rounded-md">
                    {article.badge}
                  </span>
                </div>

                <h4 className="text-sm font-bold text-white group-hover:text-yellow-400 transition-colors leading-snug">
                  {article.title}
                </h4>

                <div className="flex items-center gap-3 text-[10px] text-slate-400">
                  <span>{article.date}</span>
                  <span>•</span>
                  <span>{article.readTime}</span>
                </div>
              </div>
            ))}

            {/* Help Callout Box */}
            <div className="bg-[#0b1329] border border-slate-800/80 rounded-xl p-3.5 relative overflow-hidden">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-yellow-400/10 border border-yellow-500/20 text-yellow-400 flex items-center justify-center shrink-0">
                  <HelpCircle className="w-4 h-4" />
                </div>
                <div className="space-y-0.5">
                  <h4 className="text-xs font-bold text-white">
                    Ficou com dúvidas?
                  </h4>
                  <p className="text-[11px] text-slate-300 leading-tight">
                    Nossa equipe de consultores está pronta para te ajudar.
                  </p>
                  <button
                    onClick={onOpenConsultant}
                    className="inline-flex items-center gap-1 text-[11px] font-bold text-yellow-400 hover:text-yellow-300 transition-colors pt-0.5 cursor-pointer"
                  >
                    <span>Falar com consultor</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom View All Button (Mobile Centered) */}
        {onNavigateToNews && (
          <div className="flex lg:hidden justify-center mt-2">
            <button
              onClick={onNavigateToNews}
              className="w-full bg-slate-900 hover:bg-slate-800 border border-slate-700 hover:border-yellow-500/50 text-slate-200 hover:text-white font-bold py-3 px-6 rounded-xl text-xs transition-all flex items-center justify-center gap-2 shadow-lg hover:shadow-yellow-500/10 cursor-pointer active:scale-95 group"
            >
              <span>Ver Todas as Novidades</span>
              <ArrowRight className="w-4 h-4 text-yellow-400 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

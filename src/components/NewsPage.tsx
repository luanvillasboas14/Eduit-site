import React, { useState, useMemo } from 'react';
import { NEWS_DATA } from '../data/news';
import { NewsArticle } from '../types';
import newsBannerImg from '../assets/images/Cabeçalho (9).jpg';
import {
  Search,
  Calendar,
  Clock,
  ArrowRight,
  Sparkles,
  Layers,
  GraduationCap,
  Briefcase,
  Cpu,
  BookOpen,
  HelpCircle,
  Building2,
  Filter,
  ArrowUpDown,
  X,
  Tag,
  MessageCircle,
} from 'lucide-react';

interface NewsPageProps {
  onSelectArticle: (article: NewsArticle) => void;
  onOpenConsultant: () => void;
  onNavigateHome: () => void;
}

export const NewsPage: React.FC<NewsPageProps> = ({
  onSelectArticle,
  onOpenConsultant,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('Todos');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [sortBy, setSortBy] = useState<'recentes' | 'tempo' | 'alfabetico'>('recentes');
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState<boolean>(false);

  // Categories list with themed icons
  const categories = [
    { name: 'Todos', icon: Layers },
    { name: 'Vestibular', icon: GraduationCap },
    { name: 'Carreira', icon: Briefcase },
    { name: 'Tecnologia', icon: Cpu },
    { name: 'Educação', icon: BookOpen },
    { name: 'Dicas de Estudo', icon: HelpCircle },
    { name: 'Parcerias', icon: Building2 },
  ];

  // Count articles per theme
  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = { Todos: NEWS_DATA.length };
    NEWS_DATA.forEach((article) => {
      counts[article.category] = (counts[article.category] || 0) + 1;
    });
    return counts;
  }, []);

  // Filtered and sorted articles
  const filteredArticles = useMemo(() => {
    let result = NEWS_DATA.filter((article) => {
      const matchesCategory =
        selectedCategory === 'Todos' || article.category === selectedCategory;

      const query = searchQuery.toLowerCase().trim();
      const matchesSearch =
        query === '' ||
        article.title.toLowerCase().includes(query) ||
        article.summary.toLowerCase().includes(query) ||
        article.content.toLowerCase().includes(query) ||
        article.category.toLowerCase().includes(query) ||
        (article.tags && article.tags.some((tag) => tag.toLowerCase().includes(query)));

      return matchesCategory && matchesSearch;
    });

    if (sortBy === 'tempo') {
      result.sort((a, b) => {
        const timeA = parseInt(a.readTime) || 0;
        const timeB = parseInt(b.readTime) || 0;
        return timeA - timeB;
      });
    } else if (sortBy === 'alfabetico') {
      result.sort((a, b) => a.title.localeCompare(b.title));
    }
    // 'recentes' keeps default array order which is reverse chronological

    return result;
  }, [selectedCategory, searchQuery, sortBy]);

  const clearFilters = () => {
    setSelectedCategory('Todos');
    setSearchQuery('');
    setSortBy('recentes');
  };

  // The very first article to be displayed as top hero banner (same layout as Graduação)
  const featuredHero = NEWS_DATA.length > 0 ? NEWS_DATA[0] : null;

  return (
    <div className="bg-slate-100 min-h-screen pt-4 sm:pt-8 pb-24 overflow-x-hidden w-full">
      {/* Page Header / Banner */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-6 sm:mb-8 w-full">
        <div className="border border-slate-800 rounded-2xl sm:rounded-3xl relative overflow-hidden shadow-xl sm:shadow-2xl bg-[#070d19] aspect-[16/9] sm:aspect-[24/9] md:aspect-[3/1] lg:aspect-[3.6/1] min-h-[170px] sm:min-h-[220px] flex items-center w-full max-w-full">
          {/* Background image banner */}
          <div className="absolute inset-0 z-0 overflow-hidden w-full h-full">
            <img
              src={newsBannerImg}
              alt="Notícias & Novidades - Cruzeiro do Sul Virtual"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover object-center filter brightness-100 contrast-105"
            />
            {/* Gradient overlay only on mobile screens where text might need contrast */}
            <div className="md:hidden absolute inset-0 bg-gradient-to-r from-[#070d19]/90 via-[#070d19]/75 to-transparent" />
          </div>
          
          {/* Text block only visible on mobile; hidden on desktop */}
          <div className="md:hidden relative z-10 p-4 sm:p-8 max-w-full w-full space-y-2.5">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-slate-900/90 border border-yellow-500/40 text-yellow-400 text-[10px] sm:text-xs font-semibold backdrop-blur-md shadow-sm">
              <Sparkles className="w-3 h-3" />
              <span>NOTÍCIAS & ATUALIDADES</span>
            </div>

            <h1 className="text-xl sm:text-3xl font-extrabold text-white tracking-tight leading-tight drop-shadow-md">
              Fique por dentro das <span className="text-yellow-400">Novidades</span>
            </h1>

            {/* Mobile Search Bar inside Header */}
            <div className="pt-0.5 w-full">
              <div className="relative flex items-center w-full">
                <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 pointer-events-none" />
                <input
                  type="text"
                  placeholder="Buscar matérias e novidades..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 bg-slate-900/90 border border-slate-700/80 rounded-xl text-white text-xs placeholder:text-slate-400 focus:outline-none focus:border-yellow-400 focus:ring-1 focus:ring-yellow-400 backdrop-blur-md"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Layout */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Mobile Filter Toggle & Sort Bar */}
        <div className="lg:hidden mb-6 flex items-center justify-between gap-3">
          <button
            onClick={() => setIsMobileFilterOpen(!isMobileFilterOpen)}
            className="flex-1 bg-slate-200/90 border border-slate-300 text-slate-800 hover:text-slate-950 py-3 px-4 rounded-xl text-xs font-bold flex items-center justify-between shadow-sm cursor-pointer"
          >
            <span className="flex items-center gap-2">
              <Filter className="w-4 h-4 text-yellow-600" />
              <span>Categorias ({selectedCategory})</span>
            </span>
            <span className="bg-yellow-400 text-slate-950 font-extrabold text-[10px] px-2 py-0.5 rounded-full shadow-sm">
              {filteredArticles.length}
            </span>
          </button>

          <div className="flex items-center gap-2 bg-slate-200/90 border border-slate-300 px-3 py-2.5 rounded-xl shadow-sm">
            <ArrowUpDown className="w-3.5 h-3.5 text-yellow-600" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as 'recentes' | 'tempo' | 'alfabetico')}
              aria-label="Ordenar artigos"
              className="bg-transparent text-xs text-slate-800 font-bold focus:outline-none cursor-pointer"
            >
              <option value="recentes" className="bg-white text-slate-900">Mais recentes</option>
              <option value="tempo" className="bg-white text-slate-900">Tempo de leitura</option>
              <option value="alfabetico" className="bg-white text-slate-900">A-Z</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-start">
          {/* ================= LEFT SIDEBAR (Identical to Graduação) ================= */}
          <aside
            className={`lg:col-span-1 lg:block lg:sticky lg:top-24 ${
              isMobileFilterOpen ? 'block' : 'hidden'
            }`}
          >
            <div className="bg-[#0b1329] border border-slate-800/90 rounded-2xl p-5 space-y-6 shadow-xl">
              {/* Search Box in Desktop Sidebar */}
              <div>
                <label htmlFor="search-news" className="text-xs font-bold text-slate-300 block mb-2">
                  Buscar no Blog
                </label>
                <div className="relative">
                  <input
                    id="search-news"
                    type="text"
                    placeholder="Tema ou palavra-chave..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-800 rounded-xl pl-9 pr-8 py-2.5 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-yellow-400"
                  />
                  <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery('')}
                      className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              </div>

              {/* Categories Filter Card */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-300 uppercase tracking-wider">
                    Categorias
                  </span>
                  {(selectedCategory !== 'Todos' || searchQuery) && (
                    <button
                      onClick={clearFilters}
                      className="text-[11px] text-yellow-400 hover:underline cursor-pointer"
                    >
                      Limpar
                    </button>
                  )}
                </div>

                <div className="space-y-1">
                  {categories.map((cat) => {
                    const Icon = cat.icon;
                    const isSelected = selectedCategory === cat.name;
                    const count = categoryCounts[cat.name] || 0;

                    return (
                      <button
                        key={cat.name}
                        onClick={() => {
                          setSelectedCategory(cat.name);
                          if (isMobileFilterOpen) setIsMobileFilterOpen(false);
                        }}
                        className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                          isSelected
                            ? 'bg-yellow-400 text-slate-950 shadow-md shadow-yellow-400/20 font-bold'
                            : 'text-slate-300 hover:text-white hover:bg-slate-900/60'
                        }`}
                      >
                        <div className="flex items-center gap-2.5">
                          <Icon className={`w-4 h-4 ${isSelected ? 'text-slate-950' : 'text-slate-400'}`} />
                          <span>{cat.name}</span>
                        </div>
                        <span
                          className={`text-[10px] px-2 py-0.5 rounded-full ${
                            isSelected
                              ? 'bg-slate-950 text-yellow-400 font-bold'
                              : 'bg-slate-900 text-slate-400'
                          }`}
                        >
                          {count}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Commercial Department Direct Button in Sidebar */}
              <div className="pt-4 border-t border-slate-800">
                <button
                  onClick={onOpenConsultant}
                  className="w-full bg-yellow-400 hover:bg-yellow-300 text-slate-950 font-bold py-3 px-4 rounded-xl text-xs transition-all shadow-md shadow-yellow-400/10 flex items-center justify-center gap-2 active:scale-95 cursor-pointer"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Falar com o Comercial</span>
                </button>
              </div>
            </div>
          </aside>

          {/* ================= MAIN CONTENT: ARTICLES LIST ================= */}
          <main className="lg:col-span-3 space-y-6">
            {/* Top Bar with Active Filters & Sorting (Seamless / Same as Graduação) */}
            <div className="hidden lg:flex items-center justify-between py-1 px-1">
              <div className="flex items-center gap-2 text-xs text-slate-700">
                <span className="text-slate-600 font-medium">Exibindo artigos de:</span>
                <span className="font-extrabold text-slate-950 bg-yellow-400 border border-yellow-500/40 px-3 py-1 rounded-full shadow-sm">
                  {selectedCategory}
                </span>
                <span className="text-slate-500 text-[11px] ml-2 font-medium">
                  ({filteredArticles.length} publicações)
                </span>
              </div>

              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2">
                  <ArrowUpDown className="w-3.5 h-3.5 text-yellow-600" />
                  <span className="text-xs text-slate-700 font-semibold">Ordenar:</span>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value as 'recentes' | 'tempo' | 'alfabetico')}
                    className="bg-white border border-slate-300 text-xs text-slate-900 font-medium rounded-lg px-3 py-1.5 focus:outline-none focus:border-yellow-500 shadow-sm cursor-pointer"
                  >
                    <option value="recentes">Mais recentes</option>
                    <option value="tempo">Tempo de leitura</option>
                    <option value="alfabetico">Nome (A - Z)</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Articles Grid / Empty State */}
            {filteredArticles.length === 0 ? (
              <div className="bg-[#0b1329] border border-slate-800 rounded-3xl p-12 text-center space-y-4 shadow-xl">
                <div className="w-16 h-16 rounded-full bg-slate-900 flex items-center justify-center mx-auto text-slate-500">
                  <BookOpen className="w-8 h-8 text-yellow-400" />
                </div>
                <h3 className="text-lg font-bold text-white">
                  Nenhum artigo encontrado
                </h3>
                <p className="text-xs text-slate-400 max-w-md mx-auto">
                  Não encontramos publicações correspondentes aos filtros selecionados. Tente buscar por outros termos ou explore todas as categorias.
                </p>
                <button
                  onClick={clearFilters}
                  className="bg-yellow-400 text-slate-950 font-bold px-5 py-2.5 rounded-xl text-xs hover:bg-yellow-300 transition-colors shadow-md cursor-pointer"
                >
                  Limpar Todos os Filtros
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {filteredArticles.map((article) => (
                  <article
                    key={article.id}
                    onClick={() => onSelectArticle(article)}
                    className="bg-[#0b1329] border border-slate-800/90 hover:border-yellow-500/50 rounded-2xl overflow-hidden transition-all duration-300 cursor-pointer group flex flex-col justify-between shadow-xl hover:-translate-y-1"
                  >
                    {/* Image container */}
                    <div className="relative h-44 overflow-hidden bg-slate-900">
                      {article.image ? (
                        <img
                          src={article.image}
                          alt={article.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-[#0b1329] to-[#070d19] text-yellow-400">
                          <BookOpen className="w-8 h-8 opacity-40" />
                        </div>
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0b1329] via-[#0b1329]/40 to-transparent opacity-90" />

                      {/* Badges */}
                      <div className="absolute top-3 left-3 flex items-center gap-2">
                        <span className="bg-slate-950/90 backdrop-blur-sm border border-slate-700/80 text-yellow-400 font-extrabold text-[10px] uppercase px-2.5 py-0.5 rounded-md shadow-md">
                          {article.category}
                        </span>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
                      <div className="space-y-2">
                        <div className="flex items-center gap-3 text-[11px] text-slate-400">
                          <span className="flex items-center gap-1">
                            <Calendar className="w-3 h-3 text-yellow-400" />
                            {article.date}
                          </span>
                          <span>•</span>
                          <span className="flex items-center gap-1">
                            <Clock className="w-3 h-3 text-yellow-400" />
                            {article.readTime}
                          </span>
                        </div>

                        <h4 className="text-sm font-bold text-white group-hover:text-yellow-400 transition-colors leading-snug line-clamp-2">
                          {article.title}
                        </h4>

                        <p className="text-xs text-slate-300 leading-relaxed line-clamp-3">
                          {article.summary}
                        </p>
                      </div>

                      {/* Card Footer */}
                      <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between gap-2">
                        {article.author ? (
                          <span className="text-[11px] text-slate-400 font-medium truncate max-w-[120px]">
                            {article.author.name}
                          </span>
                        ) : (
                          <div className="flex items-center gap-1 text-[11px] text-slate-400">
                            <Tag className="w-3 h-3 text-yellow-400" />
                            <span>{article.category}</span>
                          </div>
                        )}

                        <span className="text-xs font-bold text-yellow-400 group-hover:text-yellow-300 flex items-center gap-1 transition-colors">
                          <span>Ler mais</span>
                          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                        </span>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            )}
          </main>
        </div>

        {/* CTA Bottom Banner */}
        <div className="mt-16 bg-[#0b1329] border border-yellow-500/30 rounded-3xl p-8 sm:p-10 flex flex-col md:flex-row items-center justify-between gap-6 shadow-2xl">
          <div className="space-y-2 text-center md:text-left">
            <span className="text-xs font-bold uppercase tracking-wider text-yellow-400 block">
              ATENDIMENTO PERSONALIZADO
            </span>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
              Ficou com alguma dúvida sobre cursos ou inscrições?
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 max-w-xl">
              Nossa equipe de consultores educacionais pode orientar sua escolha de graduação ou pós-graduação e aplicar suas bolsas de desconto.
            </p>
          </div>

          <button
            onClick={onOpenConsultant}
            className="w-full md:w-auto bg-yellow-400 hover:bg-yellow-300 text-slate-950 font-bold px-8 py-3.5 rounded-xl text-xs transition-all shadow-xl shadow-yellow-400/20 flex items-center justify-center gap-2 shrink-0 active:scale-95 cursor-pointer"
          >
            <MessageCircle className="w-4 h-4" />
            <span>Falar com Consultor</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

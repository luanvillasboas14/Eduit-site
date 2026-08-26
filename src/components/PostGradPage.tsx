import React, { useState, useMemo, useEffect } from 'react';
import { POSTGRAD_COURSES } from '../data/courses';
import { Course } from '../types';
import coursesBannerImg from '../assets/images/pos grad.jpg';
import { 
  Search, 
  Filter, 
  Clock, 
  ArrowRight, 
  ArrowUpDown,
  Briefcase,
  Cpu,
  HeartPulse,
  Scale,
  BookMarked,
  Layers,
  Award
} from 'lucide-react';

interface PostGradPageProps {
  onSelectCourse: (course: Course) => void;
  onOpenConsultant: (courseTitle?: string) => void;
  initialSearchQuery?: string;
  onSearchChange?: (query: string) => void;
  initialCategory?: string;
  titleIncludes?: string;
  onCategoryChange?: (category: string) => void;
  onClearFilters?: () => void;
}

export const PostGradPage: React.FC<PostGradPageProps> = ({
  onSelectCourse,
  onOpenConsultant,
  initialSearchQuery = '',
  onSearchChange,
  initialCategory = 'Todos',
  titleIncludes,
  onCategoryChange,
  onClearFilters,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>(initialCategory);
  const [searchQuery, setSearchQuery] = useState<string>(initialSearchQuery);
  const [sortBy, setSortBy] = useState<string>('populares');
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState<boolean>(false);

  useEffect(() => {
    setSearchQuery(initialSearchQuery);
  }, [initialSearchQuery]);

  useEffect(() => {
    setSelectedCategory(initialCategory);
  }, [initialCategory]);

  const handleSearchInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setSearchQuery(val);
    if (onSearchChange) {
      onSearchChange(val);
    }
  };

  const categories = [
    { name: 'Todos', icon: Layers },
    { name: 'Negócios', icon: Briefcase },
    { name: 'Tecnologia', icon: Cpu },
    { name: 'Saúde', icon: HeartPulse },
    { name: 'Jurídico', icon: Scale },
    { name: 'Educação', icon: BookMarked },
  ];

  // Count courses per category in Pós-graduação
  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = { Todos: POSTGRAD_COURSES.length };
    POSTGRAD_COURSES.forEach((course) => {
      counts[course.category] = (counts[course.category] || 0) + 1;
    });
    return counts;
  }, []);

  const filteredAndSortedCourses = useMemo(() => {
    let result = POSTGRAD_COURSES.filter((course) => {
      const matchesCategory =
        selectedCategory === 'Todos' || course.category === selectedCategory;

      const matchesTitle =
        !titleIncludes || course.title.toLowerCase().includes(titleIncludes.toLowerCase());

      const matchesSearch =
        course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        course.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        course.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        course.modules.some((m) => m.toLowerCase().includes(searchQuery.toLowerCase()));

      return matchesCategory && matchesTitle && matchesSearch;
    });

    // Sorting
    if (sortBy === 'preco-asc') {
      result.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'rating') {
      result.sort((a, b) => b.rating - a.rating);
    } else if (sortBy === 'nome') {
      result.sort((a, b) => a.title.localeCompare(b.title));
    }

    return result;
  }, [selectedCategory, searchQuery, sortBy, titleIncludes]);

  const clearFilters = () => {
    setSelectedCategory('Todos');
    setSearchQuery('');
    setSortBy('populares');
    onClearFilters?.();
  };

  return (
    <div className="bg-slate-100 min-h-screen pt-4 sm:pt-8 pb-24 overflow-x-hidden w-full">
      {/* Page Header / Banner */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-6 sm:mb-8 w-full">
        <div className="border border-slate-800 rounded-2xl sm:rounded-3xl relative overflow-hidden shadow-xl sm:shadow-2xl bg-[#070d19] aspect-[16/9] sm:aspect-[24/9] md:aspect-[3/1] lg:aspect-[3.6/1] min-h-[170px] sm:min-h-[220px] flex items-center w-full max-w-full">
          {/* Background image banner */}
          <div className="absolute inset-0 z-0 overflow-hidden w-full h-full">
            <img
              src={coursesBannerImg}
              alt="Pós-Graduação & MBA - Cruzeiro do Sul Virtual"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover object-center filter brightness-100 contrast-105"
            />
            {/* Gradient overlay only on mobile screens where text might need contrast */}
            <div className="md:hidden absolute inset-0 bg-gradient-to-r from-[#070d19]/90 via-[#070d19]/75 to-transparent" />
          </div>
          
          {/* Text block only visible on mobile; hidden on desktop */}
          <div className="md:hidden relative z-10 p-4 sm:p-8 max-w-full w-full space-y-2.5">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-slate-900/90 border border-yellow-500/40 text-yellow-400 text-[10px] sm:text-xs font-semibold backdrop-blur-md shadow-sm">
              <Award className="w-3 h-3" />
              <span>ESPECIALIZAÇÕES & MBA</span>
            </div>

            <h1 className="text-xl sm:text-3xl font-extrabold text-white tracking-tight leading-tight drop-shadow-md">
              Acelere sua carreira na <span className="text-yellow-400">Pós-Graduação</span>
            </h1>

            {/* Mobile Search Bar inside Header */}
            <div className="pt-0.5 w-full">
              <div className="relative flex items-center w-full">
                <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 pointer-events-none" />
                <input
                  type="text"
                  placeholder="Buscar especialização ou MBA..."
                  value={searchQuery}
                  onChange={handleSearchInputChange}
                  className="w-full bg-slate-900/90 border border-slate-700/80 rounded-xl pl-9 pr-16 py-2 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-yellow-400 transition-colors shadow-inner backdrop-blur-md"
                />
                {searchQuery && (
                  <button
                    onClick={() => {
                      setSearchQuery('');
                      if (onSearchChange) onSearchChange('');
                    }}
                    className="absolute right-2.5 text-[10px] font-bold text-slate-400 hover:text-white"
                  >
                    Limpar
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Layout */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Mobile Filter Toggle Button */}
        <div className="lg:hidden mb-6 flex items-center justify-between gap-3">
          <button
            onClick={() => setIsMobileFilterOpen(!isMobileFilterOpen)}
            className="flex-1 bg-slate-200/90 border border-slate-300 text-slate-800 hover:text-slate-950 py-3 px-4 rounded-xl text-xs font-bold flex items-center justify-between shadow-sm cursor-pointer"
          >
            <span className="flex items-center gap-2">
              <Filter className="w-4 h-4 text-yellow-600" />
              <span>Filtro de Área ({selectedCategory})</span>
            </span>
            <span className="bg-yellow-400 text-slate-950 font-extrabold text-[10px] px-2 py-0.5 rounded-full shadow-sm">
              {filteredAndSortedCourses.length}
            </span>
          </button>

          <div className="flex items-center gap-2 bg-slate-200/90 border border-slate-300 px-3 py-2.5 rounded-xl shadow-sm">
            <ArrowUpDown className="w-3.5 h-3.5 text-yellow-600" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-transparent text-xs text-slate-900 font-medium focus:outline-none cursor-pointer"
            >
              <option value="populares">Populares</option>
              <option value="preco-asc">Menor Preço</option>
              <option value="rating">Avaliação</option>
              <option value="nome">A-Z</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-start">
          {/* Left Sidebar Filter Container */}
          <aside
            className={`lg:col-span-1 lg:block lg:sticky lg:top-28 ${
              isMobileFilterOpen ? 'block' : 'hidden'
            }`}
          >
            <div className="bg-[#0b1329] border border-slate-800/90 rounded-2xl p-5 space-y-6 shadow-xl">
              {/* Search Box in Desktop Sidebar */}
              <div>
                <label htmlFor="search-postgrad-input" className="text-xs font-bold text-slate-300 block mb-2">
                  Buscar Especialização ou MBA
                </label>
                <div className="relative">
                  <input
                    id="search-postgrad-input"
                    type="text"
                    placeholder="Ex: Inteligência Artificial, MBA..."
                    value={searchQuery}
                    onChange={handleSearchInputChange}
                    className="w-full bg-slate-900 border border-slate-800 rounded-xl pl-9 pr-4 py-2.5 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-yellow-400"
                  />
                  <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                </div>
              </div>

              {/* Area / Category Filter List */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-300 uppercase tracking-wider">
                    Área do Conhecimento
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
                          onCategoryChange?.(cat.name);
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
            </div>
          </aside>

          {/* Right Area: Course Grid & Controls */}
          <main className="lg:col-span-3 space-y-6">
            {/* Top Bar with Active Filters & Sorting (Seamless / No container box) */}
            <div className="hidden lg:flex items-center justify-between py-1 px-1">
              <div className="flex items-center gap-2 text-xs text-slate-700">
                <span className="text-slate-600 font-medium">Exibindo especializações de:</span>
                <span className="font-extrabold text-slate-950 bg-yellow-400 border border-yellow-500/40 px-3 py-1 rounded-full shadow-sm">
                  {selectedCategory}
                </span>
                <span className="text-slate-500 text-[11px] ml-2 font-medium">
                  ({filteredAndSortedCourses.length} cursos)
                </span>
              </div>

              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2">
                  <ArrowUpDown className="w-3.5 h-3.5 text-yellow-600" />
                  <span className="text-xs text-slate-700 font-semibold">Ordenar:</span>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="bg-white border border-slate-300 text-xs text-slate-900 font-medium rounded-lg px-3 py-1.5 focus:outline-none focus:border-yellow-500 shadow-sm cursor-pointer"
                  >
                    <option value="populares">Mais Populares</option>
                    <option value="preco-asc">Menor Mensalidade</option>
                    <option value="rating">Melhor Avaliação</option>
                    <option value="nome">Nome (A - Z)</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Courses Cards Grid */}
            {filteredAndSortedCourses.length === 0 ? (
              <div className="bg-[#0b1329] border border-slate-800 rounded-3xl p-12 text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-slate-900 flex items-center justify-center mx-auto text-slate-500">
                  <Search className="w-8 h-8 text-yellow-400" />
                </div>
                <h3 className="text-lg font-bold text-white">
                  Nenhuma pós-graduação encontrada
                </h3>
                <p className="text-xs text-slate-400 max-w-md mx-auto">
                  Não encontramos resultados para "{searchQuery}". Tente usar palavras-chave mais genéricas ou selecione outra área.
                </p>
                <button
                  onClick={clearFilters}
                  className="bg-yellow-400 text-slate-950 font-bold px-5 py-2.5 rounded-xl text-xs hover:bg-yellow-300 transition-colors shadow-md cursor-pointer"
                >
                  Limpar Todos os Filtros
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                {filteredAndSortedCourses.map((course) => (
                  <div
                    key={course.id}
                    className="bg-[#0b1329] border border-slate-800/90 rounded-2xl overflow-hidden hover:border-yellow-500/50 hover:shadow-xl hover:shadow-yellow-500/5 transition-all group flex flex-col justify-between"
                  >
                    <div>
                      {/* Image Header - Compact on mobile (h-28 to h-32), regular on desktop (h-44) */}
                      <div 
                        onClick={() => onSelectCourse(course)}
                        className="relative h-28 sm:h-36 md:h-44 overflow-hidden cursor-pointer"
                      >
                        <img
                          src={course.image}
                          alt={course.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#0b1329] via-[#0b1329]/30 to-transparent" />
                      </div>

                      {/* Body Content - Tighter padding and margins on mobile */}
                      <div className="p-3.5 sm:p-5 space-y-1.5 sm:space-y-3">
                        <div>
                          <span className="text-[9px] sm:text-[10px] font-extrabold tracking-wider text-yellow-400 uppercase">
                            {course.categoryBadge}
                          </span>
                        </div>

                        <h3 
                          onClick={() => onSelectCourse(course)}
                          className="text-base sm:text-lg font-bold text-white group-hover:text-yellow-400 transition-colors leading-snug cursor-pointer line-clamp-2"
                        >
                          {course.title}
                        </h3>

                        <p className="hidden md:block text-xs text-slate-300 line-clamp-2 leading-relaxed">
                          {course.description}
                        </p>

                        <div className="flex items-center gap-2 sm:gap-3 text-[11px] sm:text-xs text-slate-400 pt-0.5 sm:pt-1 flex-wrap">
                          <div className="flex items-center gap-1 sm:gap-1.5">
                            <Clock className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-slate-400" />
                            <span>{course.duration}</span>
                          </div>
                          <span>•</span>
                          <span className="bg-slate-900 border border-slate-800 text-yellow-400 font-bold px-1.5 py-0.5 rounded text-[9px] sm:text-[10px] uppercase">
                            {course.modality}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Card Action Button */}
                    <div className="p-3.5 sm:p-5 pt-0 mt-1 sm:mt-3 border-t border-slate-800/80">
                      <button
                        onClick={() => onSelectCourse(course)}
                        className="w-full bg-yellow-400 hover:bg-yellow-300 text-slate-950 font-bold py-2 sm:py-2.5 rounded-xl text-xs transition-all shadow-md shadow-yellow-400/10 flex items-center justify-center gap-2 cursor-pointer active:scale-95 mt-2 sm:mt-3"
                      >
                        <span>Ver Página do Curso</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </main>
        </div>
      </div>

      {/* Consultor Banner bottom */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16">
        <div className="bg-[#0b1329] border border-yellow-500/30 rounded-3xl p-8 sm:p-10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-center md:text-left">
            <h3 className="text-2xl font-bold text-white">
              Não encontrou seu curso ou quer desconto especial?
            </h3>
          </div>

          <button
            onClick={() => onOpenConsultant()}
            className="bg-yellow-400 hover:bg-yellow-300 text-slate-950 font-bold px-8 py-3.5 rounded-xl text-xs transition-all shadow-xl shadow-yellow-400/20 active:scale-95 cursor-pointer shrink-0"
          >
            Falar com Consultor no WhatsApp
          </button>
        </div>
      </div>
    </div>
  );
};

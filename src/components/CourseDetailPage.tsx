import React, { useState, useEffect, useMemo } from 'react';
import { Course, Polo } from '../types';
import { COURSES_DATA } from '../data/courses';
import { POLOS_DATA } from '../data/polos';
import { leadTipoFromCourse, submitLead } from '../lib/leads';
import {
  Star,
  Clock,
  Users,
  Award,
  CheckCircle2,
  GraduationCap,
  ArrowRight,
  ChevronRight,
  ChevronDown,
  ChevronUp,
  ArrowLeft,
  ShieldCheck,
  Sparkles,
  BookOpen,
  Briefcase,
  MessageSquare,
  Check,
  Calendar,
  FileText,
  Send,
  Building2,
  Laptop,
  Target,
  UserCheck,
  MapPin,
  Search,
  ExternalLink,
  Phone,
  Navigation,
  Info
} from 'lucide-react';

interface CourseDetailPageProps {
  course: Course;
  onBackToCourses: () => void;
  onNavigateHome: () => void;
  onSelectCourse: (course: Course) => void;
  onOpenConsultant: (courseTitle?: string, poloName?: string) => void;
  onSelectPolo?: (polo: Polo) => void;
  onNavigatePolos?: () => void;
}

export const CourseDetailPage: React.FC<CourseDetailPageProps> = ({
  course,
  onBackToCourses,
  onNavigateHome,
  onSelectCourse,
  onOpenConsultant,
  onSelectPolo,
  onNavigatePolos,
}) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'curriculum' | 'careers'>('overview');

  // Form state for inline application
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [privacy, setPrivacy] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [formError, setFormError] = useState('');
  const [entryMethod, setEntryMethod] = useState('vestibular-online');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isAboutExpanded, setIsAboutExpanded] = useState(false);
  const [expandedSemesters, setExpandedSemesters] = useState<Record<number, boolean>>({});

  // Polo search filter state
  const [poloSearch, setPoloSearch] = useState('');
  const [selectedCityFilter, setSelectedCityFilter] = useState<string>('todos');

  const isPostGrad = course.categoryBadge === 'PÓS-GRADUAÇÃO' || course.category === 'Pós-Graduação';

  const postGradType = isPostGrad
    ? course.title.toUpperCase().includes('MBA') || course.description.toUpperCase().includes('MBA')
      ? 'MBA'
      : 'Especialização'
    : '';

  const toggleSemester = (idx: number) => {
    setExpandedSemesters((prev) => ({
      ...prev,
      [idx]: !prev[idx],
    }));
  };

  // Scroll to top when course changes
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    setIsSubmitted(false);
    setIsAboutExpanded(false);
    setExpandedSemesters({});
    setActiveTab('overview');
    setPoloSearch('');
    setSelectedCityFilter('todos');
  }, [course.id]);

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!privacy) return;
    setFormError('');
    setIsSending(true);
    try {
      await submitLead({
        nome: name,
        email,
        celular: phone,
        tipo: leadTipoFromCourse(course.title, isPostGrad),
      });
      setIsSubmitted(true);
    } catch {
      setFormError('Não foi possível enviar. Tente novamente.');
    } finally {
      setIsSending(false);
    }
  };

  // Available cities for filter pills
  const cities = useMemo(() => {
    const uniqueCities = Array.from(new Set(POLOS_DATA.map((p) => p.city)));
    return ['todos', ...uniqueCities];
  }, []);

  // Filtered polos for the right sidebar container
  const filteredPolos = useMemo(() => {
    return POLOS_DATA.filter((polo) => {
      const matchesCity =
        selectedCityFilter === 'todos' ||
        polo.city.toLowerCase() === selectedCityFilter.toLowerCase();
      
      const searchNormalized = poloSearch.toLowerCase().trim();
      const matchesSearch =
        searchNormalized === '' ||
        polo.name.toLowerCase().includes(searchNormalized) ||
        polo.neighborhood.toLowerCase().includes(searchNormalized) ||
        polo.city.toLowerCase().includes(searchNormalized) ||
        polo.address.toLowerCase().includes(searchNormalized);

      return matchesCity && matchesSearch;
    });
  }, [poloSearch, selectedCityFilter]);

  // Find related courses in the same category or similar
  const relatedCourses = COURSES_DATA.filter(
    (c) => c.id !== course.id && (c.category === course.category || c.categoryBadge === course.categoryBadge)
  ).slice(0, 3);

  // If no related in category, fallback to other popular courses
  const displayRelated = relatedCourses.length > 0 
    ? relatedCourses 
    : COURSES_DATA.filter((c) => c.id !== course.id).slice(0, 3);

  const calculateDiscount = () => {
    if (!course.originalPrice) return 60;
    const diff = course.originalPrice - course.price;
    return Math.round((diff / course.originalPrice) * 100);
  };

  return (
    <div className="bg-slate-100 min-h-screen text-slate-900 pb-6 sm:pb-12 lg:pb-20">
      {/* First Section */}
      <section className="pt-6 pb-8 border-b border-slate-300">
        {/* Breadcrumb Navigation */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-6">
          <nav className="flex items-center flex-wrap gap-2 text-xs text-slate-600">
            <button
              onClick={onNavigateHome}
              className="hover:text-yellow-600 font-semibold transition-colors cursor-pointer"
            >
              Início
            </button>
            <ChevronRight className="w-3 h-3 text-slate-400" />
            <button
              onClick={onBackToCourses}
              className="hover:text-yellow-600 font-semibold transition-colors cursor-pointer"
            >
              {course.categoryBadge === 'PÓS-GRADUAÇÃO' ? 'Pós-graduação' : 'Graduação'}
            </button>
            <ChevronRight className="w-3 h-3 text-slate-400" />
            <span className="text-yellow-600 font-bold truncate max-w-[200px] sm:max-w-none">
              {course.title}
            </span>
          </nav>
        </div>

        {/* Main Course Header / Hero Card (Gray / Light Slate Card) */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-slate-100 text-slate-900 border border-slate-200 rounded-3xl p-6 sm:p-10 relative overflow-hidden shadow-2xl">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
              {/* Left Header Info (7 cols) */}
              <div className="lg:col-span-7 space-y-5">
                <div className="flex flex-wrap items-center gap-2.5">
                  <button
                    onClick={onBackToCourses}
                    className="inline-flex items-center gap-1 bg-white hover:bg-slate-200 text-slate-800 px-3.5 py-1.5 rounded-full text-xs font-bold border border-slate-300 transition-colors cursor-pointer mr-2 shadow-sm"
                  >
                    <ArrowLeft className="w-3.5 h-3.5 text-slate-700" />
                    <span>Voltar aos Cursos</span>
                  </button>

                  <span className="bg-yellow-400 text-slate-950 font-extrabold text-[10px] uppercase tracking-wider px-3 py-1 rounded-full shadow-sm">
                    {course.categoryBadge}
                  </span>
                </div>

                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
                  {course.title}
                </h1>

                <p className="text-sm sm:text-base text-slate-700 leading-relaxed max-w-2xl">
                  {course.description}
                </p>

                {/* Quick Stat Chips */}
                <div className={`grid gap-3 pt-2 ${isPostGrad ? 'grid-cols-2' : 'grid-cols-2 sm:grid-cols-4'}`}>
                  <div className="bg-white border border-slate-200 rounded-2xl p-3 text-center shadow-sm">
                    <div className="flex items-center justify-center gap-1 text-[10px] text-slate-500 font-bold uppercase mb-0.5">
                      <Clock className="w-3.5 h-3.5 text-yellow-500" />
                      <span>Duração</span>
                    </div>
                    <span className="text-xs sm:text-sm font-extrabold text-slate-900">
                      {course.duration}
                    </span>
                  </div>

                  {isPostGrad ? (
                    <div className="bg-white border border-slate-200 rounded-2xl p-3 text-center shadow-sm">
                      <div className="flex items-center justify-center gap-1 text-[10px] text-slate-500 font-bold uppercase mb-0.5">
                        <Award className="w-3.5 h-3.5 text-yellow-500" />
                        <span>Tipo</span>
                      </div>
                      <span className="text-xs sm:text-sm font-extrabold text-slate-900">
                        {postGradType}
                      </span>
                    </div>
                  ) : (
                    <div className="bg-white border border-slate-200 rounded-2xl p-3 text-center shadow-sm">
                      <div className="flex items-center justify-center gap-1 text-[10px] text-slate-500 font-bold uppercase mb-0.5">
                        <Star className="w-3.5 h-3.5 fill-yellow-400 text-yellow-500" />
                        <span>Nota MEC</span>
                      </div>
                      <span className="text-xs sm:text-sm font-extrabold text-slate-900">
                        {course.rating.toFixed(1)} / 5.0
                      </span>
                    </div>
                  )}

                  {!isPostGrad && (
                    <>
                      <div className="bg-white border border-slate-200 rounded-2xl p-3 text-center shadow-sm">
                        <div className="flex items-center justify-center gap-1 text-[10px] text-slate-500 font-bold uppercase mb-0.5">
                          <GraduationCap className="w-3.5 h-3.5 text-yellow-500" />
                          <span>Formação</span>
                        </div>
                        <span className="text-xs sm:text-sm font-extrabold text-slate-900">
                          Bacharelado
                        </span>
                      </div>

                      <div className="bg-white border border-slate-200 rounded-2xl p-3 text-center shadow-sm">
                        <div className="flex items-center justify-center gap-1 text-[10px] text-slate-500 font-bold uppercase mb-0.5">
                          <Laptop className="w-3.5 h-3.5 text-yellow-500" />
                          <span>Modalidade</span>
                        </div>
                        <span className="text-xs sm:text-sm font-extrabold text-slate-900">
                          {course.modality || 'EAD'}
                        </span>
                      </div>
                    </>
                  )}
                </div>

                {/* Action Buttons */}
                <div className="pt-3">
                  <button
                    onClick={() => onOpenConsultant(course.title)}
                    className="w-full sm:w-auto bg-yellow-400 hover:bg-yellow-300 text-slate-950 font-bold px-6 py-3.5 rounded-xl text-xs sm:text-sm transition-all shadow-lg shadow-yellow-400/20 flex items-center justify-center gap-2 cursor-pointer active:scale-95"
                  >
                    <MessageSquare className="w-4 h-4 fill-slate-950" />
                    <span>Ver Preço</span>
                  </button>
                </div>
              </div>

              {/* Right Header Image (5 cols) */}
              <div className="hidden lg:block lg:col-span-5 relative">
                <div className="relative rounded-3xl overflow-hidden border border-slate-200 shadow-xl group">
                  <img
                    src={course.image}
                    alt={course.title}
                    className="w-full h-80 sm:h-96 object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Course Detail Body & Sticky Right Sidebar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Main Left Section (8 cols) */}
          <div className="lg:col-span-8 space-y-8">
            {/* Nav Tabs */}
            <div className="flex items-center gap-2 border-b border-slate-300 pb-2 overflow-x-auto">
              <button
                onClick={() => setActiveTab('overview')}
                className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer flex items-center gap-2 ${
                  activeTab === 'overview'
                    ? 'bg-yellow-400 text-slate-950 shadow-md shadow-yellow-400/20'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/70'
                }`}
              >
                <BookOpen className="w-4 h-4" />
                <span>Visão Geral</span>
              </button>

              {!isPostGrad && (
                <button
                  onClick={() => setActiveTab('curriculum')}
                  className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer flex items-center gap-2 ${
                    activeTab === 'curriculum'
                      ? 'bg-yellow-400 text-slate-950 shadow-md shadow-yellow-400/20'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/70'
                  }`}
                >
                  <GraduationCap className="w-4 h-4" />
                  <span>Grade Curricular</span>
                </button>
              )}

              <button
                onClick={() => setActiveTab('careers')}
                className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer flex items-center gap-2 ${
                  activeTab === 'careers'
                    ? 'bg-yellow-400 text-slate-950 shadow-md shadow-yellow-400/20'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/70'
                }`}
              >
                <Info className="w-4 h-4" />
                <span>+ Informações</span>
              </button>
            </div>

            {/* TAB CONTENT: Visão Geral */}
            {activeTab === 'overview' && (
              <div className="space-y-8 animate-fadeIn">
                {/* About Box (Gray Card) */}
                <div className="bg-slate-100 text-slate-900 border border-slate-200 rounded-3xl p-6 sm:p-8 space-y-4 shadow-xl">
                  <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-yellow-500" />
                    <span>Sobre a Formação em {course.title}</span>
                  </h3>

                  <p className="text-sm text-slate-700 leading-relaxed">
                    O curso de <strong className="text-slate-950">{course.title}</strong> da Cruzeiro do Sul Virtual oferece uma preparação de alto nível projetada para atender às demandas reais e dinâmicas do mercado profissional. Com metodologia interativa e flexibilidade de horários, você estuda no seu próprio ritmo com apoio integral de professores e tutores especializados.
                  </p>

                  {isAboutExpanded && (
                    <div className="space-y-4 animate-fadeIn">
                      <p className="text-sm text-slate-700 leading-relaxed">
                        Durante a sua jornada acadêmica, você desenvolverá competências técnicas essenciais, raciocínio crítico, visão estratégica e habilidade prática, utilizando uma plataforma virtual moderna e recursos educacionais digitais de última geração.
                      </p>
                      <p className="text-sm text-slate-700 leading-relaxed">
                        Além disso, a matriz curricular integra módulos práticos e atualizados, direcionados para os principais desafios da carreira, garantindo que você se forme pronto para atuar em grandes empresas, organizações públicas ou no próprio empreendimento.
                      </p>
                    </div>
                  )}

                  <button
                    onClick={() => setIsAboutExpanded(!isAboutExpanded)}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-yellow-600 hover:text-yellow-700 transition-colors pt-1 cursor-pointer"
                  >
                    <span>{isAboutExpanded ? 'Ler menos' : 'Ler mais'}</span>
                    {isAboutExpanded ? (
                      <ChevronUp className="w-4 h-4" />
                    ) : (
                      <ChevronDown className="w-4 h-4" />
                    )}
                  </button>
                </div>

                {/* Modules Overview (Gray Card) */}
                <div className="bg-slate-100 text-slate-900 border border-slate-200 rounded-3xl p-6 sm:p-8 space-y-4 shadow-xl overflow-hidden">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                      <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                      <span>O que você vai aprender no curso de {course.title}?</span>
                    </h3>
                    <span className="sm:hidden text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                      Deslize →
                    </span>
                  </div>

                  {/* Cards: Horizontal swipe carousel on mobile with peek preview, standard 2-column grid on desktop */}
                  <div className="flex sm:grid sm:grid-cols-2 gap-4 pt-2 overflow-x-auto sm:overflow-x-visible pb-4 sm:pb-0 -mx-6 px-[8.333%] sm:mx-0 sm:px-0 snap-x snap-mandatory scrollbar-none">
                    {course.modules.map((moduleItem, index) => (
                      <div
                        key={index}
                        className="w-[76vw] min-w-[76vw] max-w-[290px] xs:w-[280px] xs:min-w-[280px] sm:w-auto sm:min-w-0 sm:max-w-none snap-center sm:snap-start bg-white border border-slate-200 rounded-2xl p-5 flex flex-col justify-between shadow-sm shrink-0 sm:shrink hover:border-yellow-400 transition-colors"
                      >
                        <div className="flex items-start gap-3.5">
                          <div className="w-9 h-9 rounded-xl bg-yellow-400 text-slate-950 font-black text-sm flex items-center justify-center shrink-0 mt-0.5 shadow-sm">
                            {index + 1}
                          </div>
                          <div className="space-y-1">
                            <h4 className="text-xs sm:text-sm font-bold text-slate-900 leading-snug">{moduleItem}</h4>
                            <p className="text-[11px] sm:text-xs text-slate-600 leading-relaxed">
                              Conteúdo prático orientado a desafios reais do mercado e exigências profissionais.
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* CTA Button: Ver Preço */}
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-white border border-slate-200 rounded-2xl p-4 sm:p-5 shadow-sm">
                  <div className="text-center sm:text-left space-y-0.5">
                    <h4 className="text-sm font-extrabold text-slate-900">
                      Consulte valores e condições especiais de bolsa
                    </h4>
                    <p className="text-xs text-slate-600">
                      Fale com nossa equipe educacional e garanta seu desconto exclusivo.
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => onOpenConsultant(course.title)}
                    className="w-full sm:w-auto bg-yellow-400 hover:bg-yellow-300 active:scale-[0.98] text-slate-950 font-black py-3.5 px-6 rounded-xl text-xs sm:text-sm transition-all shadow-md shadow-yellow-400/20 flex items-center justify-center gap-2 cursor-pointer shrink-0"
                  >
                    <MessageSquare className="w-4 h-4 fill-slate-950" />
                    <span>Ver Preço</span>
                  </button>
                </div>
              </div>
            )}

            {/* TAB CONTENT: Grade Curricular (Gray Card) */}
            {activeTab === 'curriculum' && !isPostGrad && (
              <div className="bg-slate-100 text-slate-900 border border-slate-200 rounded-3xl p-6 sm:p-8 space-y-6 shadow-xl animate-fadeIn">
                <div>
                  <h3 className="text-xl font-bold text-slate-900 mb-2 flex items-center gap-2">
                    <GraduationCap className="w-5 h-5 text-yellow-500" />
                    <span>Grade Curricular e Módulos de Aprendizagem</span>
                  </h3>
                  <p className="text-xs text-slate-600">
                    Sua formação em <strong className="text-slate-950">{course.title}</strong> é estruturada de forma progressiva ao longo de <strong className="text-yellow-600 font-bold">{course.duration}</strong>.
                  </p>
                </div>

                <div className="space-y-4">
                  {course.modules.map((moduleName, idx) => {
                    const isExpanded = !!expandedSemesters[idx];
                    return (
                      <div
                        key={idx}
                        className="bg-white border border-slate-200 rounded-2xl p-5 hover:border-yellow-400 transition-all space-y-3 shadow-sm"
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-[10px] font-extrabold uppercase tracking-widest text-slate-950 bg-yellow-400 px-3 py-1 rounded-full">
                            Semestre {idx + 1}
                          </span>
                          <span className="text-xs text-slate-500 font-semibold">
                            160h / aula
                          </span>
                        </div>

                        <h4 className="text-sm font-bold text-slate-900">
                          {moduleName}
                        </h4>

                        {isExpanded && (
                          <div className="pt-2 animate-fadeIn">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-700">
                              <div className="bg-slate-50 border border-slate-200 rounded-xl p-3 flex items-center gap-2">
                                <span className="w-1.5 h-1.5 rounded-full bg-yellow-500 shrink-0" />
                                <span>Fundamentos e Conceitos de {moduleName}</span>
                              </div>
                              <div className="bg-slate-50 border border-slate-200 rounded-xl p-3 flex items-center gap-2">
                                <span className="w-1.5 h-1.5 rounded-full bg-yellow-500 shrink-0" />
                                <span>Metodologias Ativas e Ferramentas Digitais</span>
                              </div>
                              <div className="bg-slate-50 border border-slate-200 rounded-xl p-3 flex items-center gap-2">
                                <span className="w-1.5 h-1.5 rounded-full bg-yellow-500 shrink-0" />
                                <span>Análise Prática e Estudos de Caso</span>
                              </div>
                              <div className="bg-slate-50 border border-slate-200 rounded-xl p-3 flex items-center gap-2">
                                <span className="w-1.5 h-1.5 rounded-full bg-yellow-500 shrink-0" />
                                <span>Projeto Integrador e Atividades Orientadas</span>
                              </div>
                            </div>
                          </div>
                        )}

                        <div className="pt-2 border-t border-slate-100 flex justify-end">
                          <button
                            onClick={() => toggleSemester(idx)}
                            className="inline-flex items-center gap-1.5 text-xs font-bold text-yellow-600 hover:text-yellow-700 transition-colors cursor-pointer"
                          >
                            <span>{isExpanded ? 'Ver menos' : 'Ver mais'}</span>
                            {isExpanded ? (
                              <ChevronUp className="w-4 h-4" />
                            ) : (
                              <ChevronDown className="w-4 h-4" />
                            )}
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div className="p-4 bg-white rounded-2xl border border-slate-200 text-center shadow-sm">
                  <p className="text-xs text-slate-500">
                    * A grade curricular pode passar por atualizações periódicas para acompanhar as melhores práticas e inovações do mercado de trabalho.
                  </p>
                </div>

                {/* CTA Button: Ver Preço */}
                <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4 bg-white border border-slate-200 rounded-2xl p-4 sm:p-5 shadow-sm">
                  <div className="text-center sm:text-left space-y-0.5">
                    <h4 className="text-sm font-extrabold text-slate-900">
                      Consulte valores e condições especiais de bolsa
                    </h4>
                    <p className="text-xs text-slate-600">
                      Fale com nossa equipe educacional e garanta seu desconto exclusivo.
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => onOpenConsultant(course.title)}
                    className="w-full sm:w-auto bg-yellow-400 hover:bg-yellow-300 active:scale-[0.98] text-slate-950 font-black py-3.5 px-6 rounded-xl text-xs sm:text-sm transition-all shadow-md shadow-yellow-400/20 flex items-center justify-center gap-2 cursor-pointer shrink-0"
                  >
                    <MessageSquare className="w-4 h-4 fill-slate-950" />
                    <span>Ver Preço</span>
                  </button>
                </div>
              </div>
            )}

            {/* TAB CONTENT: Mercado de Trabalho (Gray Card) */}
            {activeTab === 'careers' && (
              <div className="space-y-6 animate-fadeIn">
                {/* Áreas de Atuação Profissional */}
                <div className="bg-slate-100 text-slate-900 border border-slate-200 rounded-3xl p-6 sm:p-8 space-y-5 shadow-xl">
                  <div>
                    <h3 className="text-xl font-bold text-slate-900 mb-2 flex items-center gap-2">
                      <Briefcase className="w-5 h-5 text-yellow-500" />
                      <span>Áreas de Atuação Profissional</span>
                    </h3>
                    <p className="text-xs text-slate-600">
                      Confira os principais cargos e posições de destaque que você poderá ocupar após concluir sua formação:
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {course.careerOpportunities.map((career, i) => (
                      <div
                        key={i}
                        className="bg-white border border-slate-200 rounded-2xl p-5 hover:border-yellow-400 transition-all flex items-start gap-3 shadow-sm"
                      >
                        <div className="w-9 h-9 rounded-xl bg-yellow-400/20 text-yellow-700 flex items-center justify-center shrink-0">
                          <Award className="w-4 h-4" />
                        </div>
                        <div>
                          <h4 className="text-sm font-bold text-slate-900">{career}</h4>
                          <p className="text-xs text-slate-600 mt-1">
                            Atuação estratégica em empresas privadas, órgãos públicos, consultorias e negócios próprios.
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Para quem é indicado (Gray Card embaixo de Áreas de Atuação Profissional) */}
                <div className="bg-slate-100 text-slate-900 border border-slate-200 rounded-3xl p-6 sm:p-8 space-y-4 shadow-xl overflow-hidden">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                      <Target className="w-5 h-5 text-yellow-500" />
                      <span>Para quem é indicado o curso de {course.title}?</span>
                    </h3>
                    <span className="sm:hidden text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                      Deslize →
                    </span>
                  </div>

                  {/* Cards: Horizontal swipe carousel on mobile with peek preview, standard 2-column grid on desktop */}
                  <div className="flex sm:grid sm:grid-cols-2 gap-4 pt-2 overflow-x-auto sm:overflow-x-visible pb-4 sm:pb-0 -mx-6 px-[8.333%] sm:mx-0 sm:px-0 snap-x snap-mandatory scrollbar-none">
                    <div className="w-[76vw] min-w-[76vw] max-w-[290px] xs:w-[280px] xs:min-w-[280px] sm:w-auto sm:min-w-0 sm:max-w-none snap-center sm:snap-start bg-white border border-slate-200 rounded-2xl p-5 flex flex-col justify-between shadow-sm shrink-0 sm:shrink hover:border-yellow-400 transition-colors">
                      <div className="flex items-start gap-3.5">
                        <div className="w-9 h-9 rounded-xl bg-yellow-400/20 text-yellow-700 flex items-center justify-center shrink-0 mt-0.5">
                          <Briefcase className="w-4 h-4" />
                        </div>
                        <div className="space-y-1">
                          <h4 className="text-xs sm:text-sm font-bold text-slate-900 leading-snug">Transição e Evolução na Carreira</h4>
                          <p className="text-[11px] sm:text-xs text-slate-600 leading-relaxed">
                            Ideal para quem deseja ingressar na área de {course.category.toLowerCase()} ou conquistar novas oportunidades e promoções no mercado de trabalho.
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="w-[76vw] min-w-[76vw] max-w-[290px] xs:w-[280px] xs:min-w-[280px] sm:w-auto sm:min-w-0 sm:max-w-none snap-center sm:snap-start bg-white border border-slate-200 rounded-2xl p-5 flex flex-col justify-between shadow-sm shrink-0 sm:shrink hover:border-yellow-400 transition-colors">
                      <div className="flex items-start gap-3.5">
                        <div className="w-9 h-9 rounded-xl bg-yellow-400/20 text-yellow-700 flex items-center justify-center shrink-0 mt-0.5">
                          <Clock className="w-4 h-4" />
                        </div>
                        <div className="space-y-1">
                          <h4 className="text-xs sm:text-sm font-bold text-slate-900 leading-snug">Busca por Flexibilidade de Horários</h4>
                          <p className="text-[11px] sm:text-xs text-slate-600 leading-relaxed">
                            Para quem precisa conciliar os estudos com a rotina de trabalho e compromissos pessoais através do ensino 100% online.
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="w-[76vw] min-w-[76vw] max-w-[290px] xs:w-[280px] xs:min-w-[280px] sm:w-auto sm:min-w-0 sm:max-w-none snap-center sm:snap-start bg-white border border-slate-200 rounded-2xl p-5 flex flex-col justify-between shadow-sm shrink-0 sm:shrink hover:border-yellow-400 transition-colors">
                      <div className="flex items-start gap-3.5">
                        <div className="w-9 h-9 rounded-xl bg-yellow-400/20 text-yellow-700 flex items-center justify-center shrink-0 mt-0.5">
                          <GraduationCap className="w-4 h-4" />
                        </div>
                        <div className="space-y-1">
                          <h4 className="text-xs sm:text-sm font-bold text-slate-900 leading-snug">Egressos do Ensino Médio</h4>
                          <p className="text-[11px] sm:text-xs text-slate-600 leading-relaxed">
                            Jovens que buscam um primeiro diploma de ensino superior com reconhecimento oficial do MEC e diploma valorizado.
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="w-[76vw] min-w-[76vw] max-w-[290px] xs:w-[280px] xs:min-w-[280px] sm:w-auto sm:min-w-0 sm:max-w-none snap-center sm:snap-start bg-white border border-slate-200 rounded-2xl p-5 flex flex-col justify-between shadow-sm shrink-0 sm:shrink hover:border-yellow-400 transition-colors">
                      <div className="flex items-start gap-3.5">
                        <div className="w-9 h-9 rounded-xl bg-yellow-400/20 text-yellow-700 flex items-center justify-center shrink-0 mt-0.5">
                          <UserCheck className="w-4 h-4" />
                        </div>
                        <div className="space-y-1">
                          <h4 className="text-xs sm:text-sm font-bold text-slate-900 leading-snug">Autônomos e Empreendedores</h4>
                          <p className="text-[11px] sm:text-xs text-slate-600 leading-relaxed">
                            Profissionais que desejam adquirir conhecimentos práticos e fundamentação teórica sólida para aplicar no seu próprio negócio.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* CTA Button: Ver Preço */}
                  <div className="pt-3 flex flex-col sm:flex-row items-center justify-between gap-4 bg-white border border-slate-200 rounded-2xl p-4 sm:p-5 shadow-sm">
                    <div className="text-center sm:text-left space-y-0.5">
                      <h4 className="text-sm font-extrabold text-slate-900">
                        Consulte valores e condições especiais de bolsa
                      </h4>
                      <p className="text-xs text-slate-600">
                        Fale com nossa equipe educacional e garanta seu desconto exclusivo.
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => onOpenConsultant(course.title)}
                      className="w-full sm:w-auto bg-yellow-400 hover:bg-yellow-300 active:scale-[0.98] text-slate-950 font-black py-3.5 px-6 rounded-xl text-xs sm:text-sm transition-all shadow-md shadow-yellow-400/20 flex items-center justify-center gap-2 cursor-pointer shrink-0"
                    >
                      <MessageSquare className="w-4 h-4 fill-slate-950" />
                      <span>Ver Preço</span>
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Sticky Sidebar Lead Form & Available Polos Container */}
          <aside className="lg:col-span-4 lg:sticky lg:top-28 space-y-6">
            {/* Lead Form (Blue Card with Yellow Accent) */}
            <div className="bg-[#0b1329] text-white border-2 border-yellow-400 rounded-3xl p-6 shadow-2xl space-y-5 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-yellow-400/10 rounded-full blur-2xl pointer-events-none" />

              <div className="relative z-10 text-center space-y-1">
                <span className="bg-yellow-400 text-slate-950 font-black text-[10px] uppercase tracking-widest px-3 py-1 rounded-full inline-block mb-1 shadow-sm">
                  GARANTA SUA BOLSA DE ESTUDO
                </span>
                <h3 className="text-xl font-extrabold text-white">
                  Inscreva-se com Desconto
                </h3>
                <p className="text-xs text-slate-300">
                  Preencha o formulário e garanta sua bolsa promocional sem taxa de vestibular.
                </p>
              </div>

              {isSubmitted ? (
                <div className="relative z-10 bg-emerald-500/10 border border-emerald-500/30 rounded-2xl p-6 text-center space-y-3">
                  <div className="w-12 h-12 rounded-full bg-emerald-400 text-slate-950 flex items-center justify-center mx-auto shadow-md">
                    <CheckCircle2 className="w-7 h-7" />
                  </div>
                  <h4 className="text-base font-bold text-white">
                    Solicitação Enviada com Sucesso!
                  </h4>
                  <p className="text-xs text-slate-300">
                    Obrigado, <strong className="text-white">{name}</strong>. Nosso consultor educacional entrará em contato via WhatsApp no número informado para finalizar sua bolsa.
                  </p>
                  <button
                    onClick={() => setIsSubmitted(false)}
                    className="text-xs font-bold text-yellow-400 hover:underline pt-2 block mx-auto cursor-pointer"
                  >
                    Fazer nova solicitação
                  </button>
                </div>
              ) : (
                <form onSubmit={handleFormSubmit} className="relative z-10 space-y-3">
                  <div>
                    <label className="text-[11px] font-bold text-slate-300 block mb-1">
                      Nome Completo
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Ex: Maria Silva"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full bg-slate-900 border border-slate-700/80 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-yellow-400 shadow-inner"
                    />
                  </div>

                  <div>
                    <label className="text-[11px] font-bold text-slate-300 block mb-1">
                      WhatsApp (com DDD)
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="(11) 99999-9999"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full bg-slate-900 border border-slate-700/80 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-yellow-400 shadow-inner"
                    />
                  </div>

                  <div>
                    <label className="text-[11px] font-bold text-slate-300 block mb-1">
                      E-mail
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="Ex: maria@email.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full bg-slate-900 border border-slate-700/80 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-yellow-400 shadow-inner"
                    />
                  </div>

                  <label className="flex items-start gap-2 text-[11px] text-slate-400 cursor-pointer">
                    <input
                      type="checkbox"
                      required
                      checked={privacy}
                      onChange={(e) => setPrivacy(e.target.checked)}
                      className="mt-0.5 accent-yellow-400"
                    />
                    <span>Li e aceito a política de privacidade.</span>
                  </label>

                  {formError && <p className="text-[11px] text-red-400">{formError}</p>}

                  <button
                    type="submit"
                    disabled={isSending}
                    className="w-full bg-yellow-400 hover:bg-yellow-300 disabled:opacity-60 text-slate-950 font-bold py-3.5 rounded-xl text-xs transition-all shadow-lg shadow-yellow-400/20 flex items-center justify-center gap-2 cursor-pointer active:scale-95 mt-2"
                  >
                    <span>{isSending ? 'Enviando...' : 'Ver Preço'}</span>
                    <Send className="w-4 h-4" />
                  </button>
                </form>
              )}

              {/* Guarantee bullets */}
              <div className="relative z-10 space-y-2 pt-2 border-t border-slate-800 text-[11px] text-slate-300 font-medium">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-yellow-400 shrink-0" />
                  <span>Sem burocracia para matrícula</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-yellow-400 shrink-0" />
                  <span>Diploma reconhecido pelo MEC</span>
                </div>
              </div>
            </div>

            {/* Polos Container: Onde cursar este curso */}
            <div className="bg-slate-100 text-slate-900 border border-slate-200 rounded-3xl p-4 sm:p-5 shadow-xl space-y-3">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="bg-yellow-400 text-slate-950 font-black text-[10px] uppercase tracking-wider px-2.5 py-0.5 rounded-full inline-flex items-center gap-1 shadow-sm">
                    <MapPin className="w-3 h-3 text-slate-950" />
                    <span>Polos Disponíveis</span>
                  </span>
                  <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                    {POLOS_DATA.length} Unidades
                  </span>
                </div>

                <h3 className="text-sm sm:text-base font-extrabold text-slate-900 flex items-center justify-between">
                  <span>Onde Cursar este Curso</span>
                </h3>
              </div>

              {/* Search Bar within Polos */}
              <div className="relative">
                <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Buscar polo, bairro ou cidade..."
                  value={poloSearch}
                  onChange={(e) => setPoloSearch(e.target.value)}
                  className="w-full bg-white border border-slate-200 rounded-xl pl-8 pr-3 py-1.5 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-yellow-400 transition-colors shadow-sm"
                />
              </div>

              {/* City Filter Pills */}
              <div className="flex items-center gap-1.5 overflow-x-auto pb-0.5 scrollbar-none">
                {cities.map((city) => (
                  <button
                    key={city}
                    onClick={() => setSelectedCityFilter(city)}
                    className={`px-2 py-0.5 rounded-lg text-[10px] font-bold whitespace-nowrap transition-colors cursor-pointer capitalize ${
                      selectedCityFilter === city
                        ? 'bg-slate-900 text-yellow-400 shadow-sm'
                        : 'bg-white border border-slate-200 text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                    }`}
                  >
                    {city === 'todos' ? 'Todas Cidades' : city}
                  </button>
                ))}
              </div>

              {/* Polos List - Reduzido à metade da altura */}
              <div className="max-h-[190px] overflow-y-auto space-y-2 pr-1 scrollbar-thin">
                {filteredPolos.length > 0 ? (
                  filteredPolos.map((polo) => (
                    <div
                      key={polo.id}
                      onClick={() => onSelectPolo && onSelectPolo(polo)}
                      className="bg-white border border-slate-200 hover:border-yellow-400 hover:shadow-md rounded-xl p-2.5 transition-all shadow-sm group cursor-pointer"
                    >
                      <div className="flex items-start gap-2.5">
                        {/* Polo Image thumbnail or Pin icon */}
                        <div className="w-10 h-10 rounded-lg overflow-hidden bg-slate-100 border border-slate-200 shrink-0 flex items-center justify-center">
                          {polo.image ? (
                            <img
                              src={polo.image}
                              alt={polo.name}
                              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                            />
                          ) : (
                            <Building2 className="w-4 h-4 text-slate-400" />
                          )}
                        </div>

                        {/* Polo Info */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between gap-1 mb-0.5">
                            <h4 className="text-[11px] font-bold text-slate-900 truncate group-hover:text-yellow-600 transition-colors">
                              {polo.name}
                            </h4>
                            <span className="text-[9px] font-bold px-1.5 py-0.2 rounded bg-slate-100 text-slate-600 shrink-0">
                              {polo.city}
                            </span>
                          </div>

                          <p className="text-[10px] text-slate-600 truncate flex items-center gap-1">
                            <MapPin className="w-2.5 h-2.5 text-yellow-500 shrink-0" />
                            <span className="truncate">{polo.address}</span>
                          </p>

                          <div
                            className="mt-2 pt-1.5 border-t border-slate-100 space-y-1.5"
                            onClick={(e) => e.stopPropagation()}
                          >
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                onOpenConsultant(course.title, polo.name);
                              }}
                              className="w-full bg-yellow-400 hover:bg-yellow-300 active:scale-[0.98] text-slate-950 font-black py-1.5 px-2.5 rounded-lg text-[11px] flex items-center justify-center gap-1.5 transition-all shadow-sm shadow-yellow-400/20 cursor-pointer"
                            >
                              <GraduationCap className="w-3 h-3" />
                              <span>Estudar nesse polo</span>
                            </button>

                            <div className="flex items-center justify-between text-[10px] px-0.5">
                              {onSelectPolo && (
                                <button
                                  type="button"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    onSelectPolo(polo);
                                  }}
                                  className="font-bold text-slate-600 hover:text-slate-900 flex items-center gap-0.5 transition-colors cursor-pointer"
                                >
                                  <span>Ver detalhes</span>
                                  <ChevronRight className="w-3 h-3" />
                                </button>
                              )}

                              <a
                                href={polo.mapsUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                onClick={(e) => e.stopPropagation()}
                                className="font-medium text-slate-500 hover:text-slate-800 flex items-center gap-1 transition-colors ml-auto"
                              >
                                <span>Como chegar</span>
                                <ExternalLink className="w-2.5 h-2.5" />
                              </a>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="bg-white border border-slate-200 rounded-2xl p-4 text-center space-y-1">
                    <p className="text-xs font-semibold text-slate-700">Nenhum polo encontrado com essa busca.</p>
                    <button
                      onClick={() => {
                        setPoloSearch('');
                        setSelectedCityFilter('todos');
                      }}
                      className="text-xs font-bold text-yellow-600 hover:underline cursor-pointer"
                    >
                      Limpar filtros
                    </button>
                  </div>
                )}
              </div>

              {/* View all polos action */}
              {onNavigatePolos && (
                <button
                  onClick={onNavigatePolos}
                  className="w-full bg-white hover:bg-slate-50 border border-slate-300 text-slate-800 font-bold py-2.5 rounded-xl text-xs transition-all shadow-sm flex items-center justify-center gap-1.5 cursor-pointer active:scale-95"
                >
                  <Building2 className="w-3.5 h-3.5 text-yellow-500" />
                  <span>Ver todos os {POLOS_DATA.length} polos</span>
                  <ArrowRight className="w-3 h-3 text-slate-500" />
                </button>
              )}
            </div>
          </aside>
        </div>
      </div>

      {/* Related Courses Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-3 sm:mt-6 lg:mt-8">
        <div className="pt-3 sm:pt-4 lg:pt-5 border-t border-slate-200">
          <div className="flex items-center justify-between mb-4 sm:mb-6 gap-3">
            <div>
              <span className="text-[10px] sm:text-xs font-bold tracking-widest text-slate-500 uppercase block mb-0.5">
                OUTRAS OPÇÕES EM {course.category.toUpperCase()}
              </span>
              <h2 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-slate-900">
                Cursos Relacionados
              </h2>
            </div>

            <button
              onClick={onBackToCourses}
              className="text-xs font-bold text-yellow-600 hover:text-yellow-700 flex items-center gap-1 cursor-pointer whitespace-nowrap shrink-0"
            >
              <span>Ver Catálogo</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Cards container: smooth touch-scrollable on mobile with snap, grid on tablet/desktop */}
          <div className="flex sm:grid sm:grid-cols-2 md:grid-cols-3 gap-3.5 sm:gap-6 overflow-x-auto sm:overflow-visible snap-x snap-mandatory scrollbar-none -mx-4 px-4 sm:mx-0 sm:px-0 pb-3 sm:pb-0">
            {displayRelated.map((relCourse) => (
              <div
                key={relCourse.id}
                onClick={() => onSelectCourse(relCourse)}
                className="min-w-[270px] w-[80vw] sm:w-auto sm:min-w-0 snap-center bg-white border border-slate-200 rounded-2xl overflow-hidden hover:border-yellow-400 transition-all duration-300 flex flex-col justify-between group cursor-pointer hover:-translate-y-1 hover:shadow-lg shadow-sm"
              >
                <div>
                  {/* Card Image */}
                  <div className="relative h-32 sm:h-40 overflow-hidden bg-slate-100">
                    <img
                      src={relCourse.image}
                      alt={relCourse.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-slate-950/20 to-transparent" />
                    
                    <div className="absolute top-2.5 left-2.5">
                      <span className="bg-yellow-400 text-slate-950 text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-md shadow-sm">
                        {relCourse.categoryBadge}
                      </span>
                    </div>

                    <div className="absolute bottom-2 left-2.5 right-2.5 flex items-center justify-between text-[11px] text-white font-medium">
                      <span className="flex items-center gap-1 bg-slate-900/80 backdrop-blur-xs px-2 py-0.5 rounded-md">
                        <Clock className="w-3 h-3 text-yellow-400" />
                        <span>{relCourse.duration}</span>
                      </span>
                      <span className="flex items-center gap-1 bg-slate-900/80 backdrop-blur-xs px-2 py-0.5 rounded-md">
                        <Laptop className="w-3 h-3 text-yellow-400" />
                        <span>{relCourse.modality}</span>
                      </span>
                    </div>
                  </div>

                  {/* Card Body */}
                  <div className="p-4 sm:p-5 space-y-1.5">
                    <h3 className="text-sm sm:text-base font-bold text-slate-900 group-hover:text-yellow-600 transition-colors line-clamp-1">
                      {relCourse.title}
                    </h3>
                    <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                      {relCourse.description}
                    </p>
                  </div>
                </div>

                {/* Card CTA */}
                <div className="p-4 sm:p-5 pt-0 mt-1">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onSelectCourse(relCourse);
                    }}
                    className="w-full bg-yellow-400 hover:bg-yellow-300 active:scale-[0.98] text-slate-950 font-bold py-2 sm:py-2.5 rounded-xl text-xs transition-all shadow-sm flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <span>Conhecer Curso</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Mobile Swipe Hint */}
          <div className="flex sm:hidden items-center justify-center gap-1 text-[11px] text-slate-400 mt-2 font-medium">
            <span>← Deslize para ver mais opções →</span>
          </div>
        </div>
      </div>
    </div>
  );
};

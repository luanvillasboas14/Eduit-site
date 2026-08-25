import React, { useState, useRef } from 'react';
import { Polo, Course } from '../types';
import { GRADUATION_COURSES, POSTGRAD_COURSES } from '../data/courses';
import { POLOS_DATA } from '../data/polos';
import { PoloGoogleReviews } from './PoloGoogleReviews';
import {
  MapPin,
  Phone,
  MessageCircle,
  Clock,
  Navigation,
  ExternalLink,
  Building2,
  CheckCircle2,
  GraduationCap,
  Sparkles,
  ArrowLeft,
  BookOpen,
  Award,
  Users,
  ShieldCheck,
  Calendar,
  ChevronRight,
  ChevronLeft,
  Headphones,
  Laptop,
  Check,
  Send,
  MessageSquare
} from 'lucide-react';

interface PoloDetailPageProps {
  polo: Polo;
  onBackToPolos: () => void;
  onOpenConsultant: (poloOrCourseName?: string) => void;
  onSelectCourse: (course: Course) => void;
  onNavigateGraduation: () => void;
  onNavigatePostGrad: () => void;
  onSelectOtherPolo: (polo: Polo) => void;
}

export const PoloDetailPage: React.FC<PoloDetailPageProps> = ({
  polo,
  onBackToPolos,
  onOpenConsultant,
  onSelectCourse,
  onNavigateGraduation,
  onNavigatePostGrad,
  onSelectOtherPolo,
}) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const gradCarouselRef = useRef<HTMLDivElement>(null);
  const postGradCarouselRef = useRef<HTMLDivElement>(null);

  const scrollCarousel = (ref: React.RefObject<HTMLDivElement | null>, direction: 'left' | 'right') => {
    if (ref.current) {
      const scrollAmount = 300;
      ref.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  // Related Courses to feature on the polo page in fluid carousel
  const featuredGradCourses = GRADUATION_COURSES.slice(0, 8);
  const featuredPostCourses = POSTGRAD_COURSES.slice(0, 6);

  // Other polos in the network
  const otherPolos = POLOS_DATA.filter((p) => p.id !== polo.id).slice(0, 6);

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim()) return;
    setIsSubmitted(true);
  };

  return (
    <div className="bg-slate-100 min-h-screen pt-4 sm:pt-6 pb-8 sm:pb-16 overflow-x-hidden w-full">
      {/* Breadcrumbs & Return Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-4 sm:mb-6">
        <div className="flex items-center justify-between gap-3 text-xs">
          <button
            onClick={onBackToPolos}
            className="inline-flex items-center gap-2 text-slate-600 hover:text-slate-900 font-bold bg-white border border-slate-200 px-3.5 py-2 rounded-xl shadow-sm transition-all hover:bg-slate-50 cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4 text-yellow-600" />
            <span>Voltar para Lista de Polos</span>
          </button>

          <div className="hidden sm:flex items-center gap-1.5 text-slate-500 font-medium">
            <span>Início</span>
            <ChevronRight className="w-3.5 h-3.5" />
            <span>Polos EAD</span>
            <ChevronRight className="w-3.5 h-3.5 text-yellow-600" />
            <span className="text-slate-900 font-bold">{polo.name}</span>
          </div>
        </div>
      </div>

      {/* Hero / Header Section of the Polo */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
        <div className="bg-[#0b1329] border border-slate-800 rounded-3xl p-6 sm:p-10 lg:p-12 text-white relative overflow-hidden shadow-2xl">
          {/* Subtle decorative glow */}
          <div className="absolute -right-24 -top-24 w-96 h-96 bg-yellow-400/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -left-24 -bottom-24 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Main Info */}
            <div className="lg:col-span-7 space-y-4 sm:space-y-5">
              <div className="flex flex-wrap items-center gap-2.5">
                <span className="bg-yellow-400 text-slate-950 font-extrabold text-[11px] sm:text-xs uppercase tracking-wider px-3 py-1 rounded-full shadow-md">
                  {polo.city} • {polo.state}
                </span>
                <span className="bg-slate-900/90 border border-slate-700 text-slate-300 text-[11px] sm:text-xs font-semibold px-3 py-1 rounded-full flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-yellow-400" />
                  <span>Polo Oficial Autorizado Cruzeiro do Sul Virtual</span>
                </span>
              </div>

              <div>
                <h1 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight">
                  {polo.name}
                </h1>
                <p className="text-sm sm:text-base text-slate-300 font-normal mt-2 max-w-2xl leading-relaxed">
                  Seu polo de apoio presencial e digital para cursos de <strong>Graduação</strong> e <strong>Pós-graduação</strong> a distância com nota máxima no MEC, suporte acadêmico completo e tecnologia de ponta.
                </p>
              </div>

              {/* Quick stats pills */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-3">
                  <div className="text-xs text-slate-400">Modalidade</div>
                  <div className="text-xs sm:text-sm font-bold text-white flex items-center gap-1.5 mt-0.5">
                    <Laptop className="w-3.5 h-3.5 text-yellow-400 shrink-0" />
                    <span>EAD e Semipresencial</span>
                  </div>
                </div>

                <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-3">
                  <div className="text-xs text-slate-400">Atendimento</div>
                  <div className="text-xs sm:text-sm font-bold text-white flex items-center gap-1.5 mt-0.5">
                    <Headphones className="w-3.5 h-3.5 text-yellow-400 shrink-0" />
                    <span>Presencial e Online</span>
                  </div>
                </div>
              </div>

              {/* CTA: Falar com o Consultor do Polo */}
              <div className="pt-2">
                <button
                  type="button"
                  onClick={() => onOpenConsultant(`${polo.name}`)}
                  className="w-full sm:w-auto bg-yellow-400 hover:bg-yellow-300 active:scale-[0.98] text-slate-950 font-black py-3 px-6 sm:py-3.5 sm:px-8 rounded-2xl text-xs sm:text-sm transition-all shadow-xl shadow-yellow-400/25 flex items-center justify-center gap-2.5 cursor-pointer"
                >
                  <MessageCircle className="w-4 h-4 text-slate-950 shrink-0" />
                  <span>Falar com o Consultor do Polo</span>
                </button>
              </div>
            </div>

            {/* Polo Contact Box / Quick Actions Card */}
            <div className="lg:col-span-5">
              <div className="bg-slate-900/95 border border-slate-700/80 rounded-2xl p-6 sm:p-7 space-y-4 shadow-xl backdrop-blur-md">
                <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                  <span className="text-xs font-bold text-yellow-400 uppercase tracking-wider">
                    Informações do Polo
                  </span>
                  <span className="text-[11px] text-emerald-400 font-bold flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    Atendimento Aberto
                  </span>
                </div>

                <div className="space-y-3.5 text-xs text-slate-300">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-lg bg-slate-800 flex items-center justify-center shrink-0 text-yellow-400 mt-0.5">
                      <MapPin className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="font-bold text-white">Endereço</div>
                      <p className="leading-relaxed mt-0.5 text-slate-300">
                        {polo.address}
                      </p>
                      <p className="text-slate-400 text-[11px]">
                        {polo.neighborhood} - {polo.city}/{polo.state} • CEP {polo.zipCode}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-lg bg-slate-800 flex items-center justify-center shrink-0 text-yellow-400 mt-0.5">
                      <Phone className="w-4 h-4" />
                    </div>
                    <div className="space-y-1 w-full">
                      <div className="font-bold text-white text-xs sm:text-sm">Contatos (WhatsApp)</div>
                      <div className="space-y-1.5 pt-0.5">
                        <div className="flex items-center justify-between text-xs py-0.5">
                          <span className="text-slate-300 text-[11px] font-medium">
                            Acadêmico:
                          </span>
                          <a
                            href="https://wa.cruzeiroead.com.br/Atendimento"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="font-bold text-white hover:text-emerald-400 transition-colors"
                          >
                            11 91518-4535
                          </a>
                        </div>

                        <div className="flex items-center justify-between text-xs py-0.5">
                          <span className="text-slate-300 text-[11px] font-medium">
                            Comercial:
                          </span>
                          <a
                            href="https://wa.cruzeiroead.com.br/tronco"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="font-bold text-white hover:text-yellow-400 transition-colors"
                          >
                            11 91747-9873
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-lg bg-slate-800 flex items-center justify-center shrink-0 text-yellow-400 mt-0.5">
                      <Clock className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="font-bold text-white">Horário de Funcionamento</div>
                      <p className="text-slate-300 text-[11px] leading-relaxed mt-0.5">
                        {polo.openingHours}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Primary CTA Buttons */}
                <div className="pt-2 border-t border-slate-800">
                  <a
                    href={polo.mapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full bg-slate-800 hover:bg-slate-700 text-white hover:text-yellow-400 border border-slate-600/80 hover:border-yellow-400/80 py-3 px-4 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 shadow-sm cursor-pointer"
                  >
                    <Navigation className="w-4 h-4 text-yellow-400" />
                    <span>Como Chegar no Google Maps</span>
                    <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* About the Polo & Differential Features (Inspired by Eduit / Cruzeiro do Sul) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Description Column */}
          <div className="lg:col-span-8 space-y-6">
            <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-sm space-y-5">
              <div className="space-y-2">
                <span className="text-xs font-extrabold text-yellow-700 uppercase tracking-wider">
                  ESTRUTURA & SUPORTE
                </span>
                <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900">
                  Conheça o {polo.name}
                </h2>
              </div>

              {/* Polo Photo Showcase */}
              {polo.image && (
                <div className="relative rounded-2xl overflow-hidden aspect-[16/9] sm:aspect-[21/9] bg-slate-900 shadow-md">
                  <img
                    src={polo.image}
                    alt={polo.name}
                    loading="lazy"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
                  <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-white text-xs">
                    <span className="font-bold flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-yellow-400" />
                      {polo.neighborhood} — {polo.city}, {polo.state}
                    </span>
                    <span className="text-[11px] text-yellow-400 font-semibold bg-slate-900/80 px-2.5 py-0.5 rounded-full border border-yellow-400/30">
                      Polo Credenciado MEC
                    </span>
                  </div>
                </div>
              )}

              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                O <strong>{polo.name}</strong> é o centro de apoio presencial credenciado pela <strong>Cruzeiro do Sul Virtual</strong>, preparado para receber alunos e candidatos com atendimento humanizado, suporte acadêmico, financeiro e pedagógico durante toda a trajetória universitária.
              </p>

              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Estrategicamente situado em <strong>{polo.city}</strong> ({polo.neighborhood}), o polo oferece facilidade de acesso para esclarecimento de dúvidas sobre matrículas, entrega de documentos, suporte aos estudos e realização de avaliações presenciais.
              </p>

              <div className="border-t border-slate-100 pt-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-sm font-bold text-slate-900">
                    O que você encontra neste Polo:
                  </h3>
                  <span className="sm:hidden text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                    Deslize →
                  </span>
                </div>

                {/* Cards: Horizontal swipe carousel on mobile with peek preview, standard 2-column grid on desktop */}
                <div className="flex sm:grid sm:grid-cols-2 gap-3.5 overflow-x-auto sm:overflow-x-visible pb-4 sm:pb-0 -mx-6 px-[8.333%] sm:mx-0 sm:px-0 snap-x snap-mandatory scrollbar-none">
                  <div className="w-[76vw] min-w-[76vw] max-w-[280px] xs:w-[270px] xs:min-w-[270px] sm:w-auto sm:min-w-0 sm:max-w-none snap-center sm:snap-start flex items-start gap-3 bg-slate-50 border border-slate-100 hover:border-yellow-400/80 transition-colors p-4 sm:p-3.5 rounded-2xl sm:rounded-xl shrink-0 sm:shrink shadow-sm">
                    <CheckCircle2 className="w-5 h-5 text-yellow-600 shrink-0 mt-0.5" />
                    <div>
                      <h4 className="text-xs sm:text-xs font-bold text-slate-900">Consultoria de Matrícula</h4>
                      <p className="text-[11px] text-slate-600 mt-1 sm:mt-0.5 leading-relaxed">Auxílio com bolsas, convênios e descontos exclusivos na mensalidade.</p>
                    </div>
                  </div>

                  {/* Card 2: Location / Metro feature tailored per polo */}
                  {(() => {
                    const id = polo.id.toLowerCase();
                    const name = polo.name.toLowerCase();
                    let title = 'Próximo ao Metrô';
                    let description = 'Estamos localizados do lado do Metrô Barra Funda (Linha 3-Vermelha).';

                    if (id.includes('barra-funda') || name.includes('barra funda')) {
                      title = 'Próximo ao Metrô';
                      description = 'Estamos localizados do lado do Metrô Barra Funda (Linha 3-Vermelha).';
                    } else if (id.includes('sapopemba') || name.includes('sapopemba')) {
                      title = 'Fácil Acesso ao Transporte';
                      description = 'Estamos localizados próximo à Estação Vila Tolstói (Linha 15-Prata).';
                    } else if (id.includes('vila-mariana') || name.includes('vila mariana')) {
                      title = 'Fácil Acesso ao Transporte';
                      description = 'Estamos localizados próximo à Estação Vila Mariana da Linha Azul.';
                    } else if (id.includes('santana') || name.includes('santana')) {
                      title = 'Fácil Acesso ao Transporte';
                      description = 'Estamos localizados próximo à Estação Carandiru da Linha Azul.';
                    } else if (id.includes('vila-prudente') || name.includes('vila prudente')) {
                      title = 'Fácil Acesso ao Transporte';
                      description = 'Estamos localizados próximo à Estação Vila Prudente.';
                    } else if (id.includes('morumbi') || name.includes('morumbi')) {
                      title = 'Fácil Acesso ao Transporte';
                      description = 'Estamos localizados próximo à Estação Morumbi da Linha Amarela.';
                    } else if (id.includes('ibirapuera') || name.includes('ibirapuera')) {
                      title = 'Fácil Acesso ao Transporte';
                      description = 'Estamos localizados próximo à Estação Eucaliptos (Linha 5-Lilás).';
                    } else if (id.includes('freguesia') || name.includes('freguesia')) {
                      title = 'Fácil Acesso ao Transporte';
                      description = 'Estamos localizados próximo à Estação Freguesia do Ó da futura Linha Laranja.';
                    } else if (id.includes('taboao-da-serra-centro') || (name.includes('taboão') && name.includes('centro'))) {
                      title = 'Fácil Acesso ao Transporte';
                      description = 'Localizado no centro de Taboão da Serra.';
                    } else if (polo.state === 'SP' && polo.city.toLowerCase() === 'são paulo') {
                      title = 'Fácil Acesso ao Transporte';
                      description = 'Localização privilegiada com fácil acesso a estações e linhas de ônibus.';
                    } else {
                      title = 'Fácil Acesso & Localização';
                      description = `Localização central estratégica em ${polo.city} (${polo.neighborhood}) para o seu conforto.`;
                    }

                    return (
                      <div className="w-[76vw] min-w-[76vw] max-w-[280px] xs:w-[270px] xs:min-w-[270px] sm:w-auto sm:min-w-0 sm:max-w-none snap-center sm:snap-start flex items-start gap-3 bg-slate-50 border border-slate-100 hover:border-yellow-400/80 transition-colors p-4 sm:p-3.5 rounded-2xl sm:rounded-xl shrink-0 sm:shrink shadow-sm">
                        <CheckCircle2 className="w-5 h-5 text-yellow-600 shrink-0 mt-0.5" />
                        <div>
                          <h4 className="text-xs sm:text-xs font-bold text-slate-900">{title}</h4>
                          <p className="text-[11px] text-slate-600 mt-1 sm:mt-0.5 leading-relaxed">{description}</p>
                        </div>
                      </div>
                    );
                  })()}

                  <div className="w-[76vw] min-w-[76vw] max-w-[280px] xs:w-[270px] xs:min-w-[270px] sm:w-auto sm:min-w-0 sm:max-w-none snap-center sm:snap-start flex items-start gap-3 bg-slate-50 border border-slate-100 hover:border-yellow-400/80 transition-colors p-4 sm:p-3.5 rounded-2xl sm:rounded-xl shrink-0 sm:shrink shadow-sm">
                    <CheckCircle2 className="w-5 h-5 text-yellow-600 shrink-0 mt-0.5" />
                    <div>
                      <h4 className="text-xs sm:text-xs font-bold text-slate-900">Suporte ao Aluno</h4>
                      <p className="text-[11px] text-slate-600 mt-1 sm:mt-0.5 leading-relaxed">Um atendimento humano e próximo para ajudar você com qualquer dúvida ou dificuldade durante todo o seu curso.</p>
                    </div>
                  </div>

                  <div className="w-[76vw] min-w-[76vw] max-w-[280px] xs:w-[270px] xs:min-w-[270px] sm:w-auto sm:min-w-0 sm:max-w-none snap-center sm:snap-start flex items-start gap-3 bg-slate-50 border border-slate-100 hover:border-yellow-400/80 transition-colors p-4 sm:p-3.5 rounded-2xl sm:rounded-xl shrink-0 sm:shrink shadow-sm">
                    <CheckCircle2 className="w-5 h-5 text-yellow-600 shrink-0 mt-0.5" />
                    <div>
                      <h4 className="text-xs sm:text-xs font-bold text-slate-900">Ambiente Climatizado & Acessível</h4>
                      <p className="text-[11px] text-slate-600 mt-1 sm:mt-0.5 leading-relaxed">Salas confortáveis projetadas para atendimento e recepção de alunos.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Google Reviews Section for this Polo */}
            <PoloGoogleReviews polo={polo} onOpenConsultant={onOpenConsultant} />

            {/* Featured Graduation Courses available at this Polo (Fluid Carousel) */}
            <div className="bg-white border border-slate-200 rounded-3xl p-5 sm:p-7 lg:p-8 shadow-sm space-y-5 overflow-hidden">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100">
                <div>
                  <span className="text-[11px] font-extrabold text-yellow-700 uppercase tracking-wider block">
                    OPÇÕES DE GRADUAÇÃO
                  </span>
                  <h3 className="text-lg sm:text-xl font-extrabold text-slate-900">
                    Cursos em Destaque ({polo.city})
                  </h3>
                </div>

                <div className="flex items-center justify-between sm:justify-end gap-3">
                  <button
                    onClick={onNavigateGraduation}
                    className="inline-flex items-center gap-1 text-xs font-bold text-yellow-700 hover:text-yellow-800 transition-colors cursor-pointer"
                  >
                    <span>Ver todos os cursos</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>

                  {/* Carousel navigation controls */}
                  <div className="hidden sm:flex items-center gap-1.5 pl-2 border-l border-slate-200">
                    <button
                      type="button"
                      onClick={() => scrollCarousel(gradCarouselRef, 'left')}
                      className="w-8 h-8 rounded-xl bg-slate-100 hover:bg-yellow-400 hover:text-slate-950 text-slate-700 flex items-center justify-center transition-all cursor-pointer shadow-xs active:scale-95"
                      aria-label="Rolar para a esquerda"
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </button>
                    <button
                      type="button"
                      onClick={() => scrollCarousel(gradCarouselRef, 'right')}
                      className="w-8 h-8 rounded-xl bg-slate-100 hover:bg-yellow-400 hover:text-slate-950 text-slate-700 flex items-center justify-center transition-all cursor-pointer shadow-xs active:scale-95"
                      aria-label="Rolar para a direita"
                    >
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Fluid Horizontal Carousel */}
              <div
                ref={gradCarouselRef}
                className="flex gap-4 overflow-x-auto snap-x snap-mandatory scroll-smooth scrollbar-none pb-2 -mx-5 px-5 sm:mx-0 sm:px-0"
              >
                {featuredGradCourses.map((course) => (
                  <div
                    key={course.id}
                    onClick={() => onSelectCourse(course)}
                    className="w-[78vw] min-w-[78vw] max-w-[280px] sm:w-[270px] sm:min-w-[270px] snap-start shrink-0 border border-slate-200 hover:border-yellow-400/90 rounded-2xl p-4 sm:p-5 hover:shadow-md transition-all cursor-pointer bg-slate-50/70 hover:bg-slate-50 flex flex-col justify-between group shadow-xs"
                  >
                    <div className="space-y-2">
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-[10px] font-bold text-yellow-800 bg-yellow-400/20 px-2 py-0.5 rounded-md">
                          {course.categoryBadge}
                        </span>
                        <span className="text-[11px] text-slate-500 font-medium">
                          {course.duration}
                        </span>
                      </div>
                      <h4 className="text-xs sm:text-sm font-bold text-slate-900 group-hover:text-yellow-700 transition-colors leading-snug line-clamp-2 min-h-[2.5rem]">
                        {course.title}
                      </h4>
                      <p className="text-[11px] text-slate-500 line-clamp-2 leading-relaxed">
                        {course.description}
                      </p>
                    </div>

                    <div className="pt-3 mt-3 border-t border-slate-200 flex items-center justify-end">
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          onSelectCourse(course);
                        }}
                        className="w-full bg-yellow-400 hover:bg-yellow-300 active:scale-95 text-slate-950 font-bold px-3.5 py-2.5 rounded-xl text-xs transition-all shadow-sm flex items-center justify-center gap-1.5 cursor-pointer"
                      >
                        <span>Ver Preço & Bolsas</span>
                        <ChevronRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Mobile swipe indicator */}
              <div className="flex sm:hidden items-center justify-center gap-1 text-[11px] text-slate-400 font-medium pt-1">
                <span>← Deslize para ver mais opções →</span>
              </div>
            </div>

            {/* Featured Postgrad Courses (Fluid Carousel) */}
            <div className="bg-white border border-slate-200 rounded-3xl p-5 sm:p-7 lg:p-8 shadow-sm space-y-5 overflow-hidden">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100">
                <div>
                  <span className="text-[11px] font-extrabold text-yellow-700 uppercase tracking-wider block">
                    ESPECIALIZAÇÕES & MBAS
                  </span>
                  <h3 className="text-lg sm:text-xl font-extrabold text-slate-900">
                    Pós-Graduação em Destaque ({polo.city})
                  </h3>
                </div>

                <div className="flex items-center justify-between sm:justify-end gap-3">
                  <button
                    onClick={onNavigatePostGrad}
                    className="inline-flex items-center gap-1 text-xs font-bold text-yellow-700 hover:text-yellow-800 transition-colors cursor-pointer"
                  >
                    <span>Ver todas as Pós-graduações</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>

                  {/* Carousel navigation controls */}
                  <div className="hidden sm:flex items-center gap-1.5 pl-2 border-l border-slate-200">
                    <button
                      type="button"
                      onClick={() => scrollCarousel(postGradCarouselRef, 'left')}
                      className="w-8 h-8 rounded-xl bg-slate-100 hover:bg-yellow-400 hover:text-slate-950 text-slate-700 flex items-center justify-center transition-all cursor-pointer shadow-xs active:scale-95"
                      aria-label="Rolar para a esquerda"
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </button>
                    <button
                      type="button"
                      onClick={() => scrollCarousel(postGradCarouselRef, 'right')}
                      className="w-8 h-8 rounded-xl bg-slate-100 hover:bg-yellow-400 hover:text-slate-950 text-slate-700 flex items-center justify-center transition-all cursor-pointer shadow-xs active:scale-95"
                      aria-label="Rolar para a direita"
                    >
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Fluid Horizontal Carousel */}
              <div
                ref={postGradCarouselRef}
                className="flex gap-4 overflow-x-auto snap-x snap-mandatory scroll-smooth scrollbar-none pb-2 -mx-5 px-5 sm:mx-0 sm:px-0"
              >
                {featuredPostCourses.map((course) => (
                  <div
                    key={course.id}
                    onClick={() => onSelectCourse(course)}
                    className="w-[78vw] min-w-[78vw] max-w-[280px] sm:w-[270px] sm:min-w-[270px] snap-start shrink-0 border border-slate-200 hover:border-yellow-400/90 rounded-2xl p-4 sm:p-5 hover:shadow-md transition-all cursor-pointer bg-slate-50/70 hover:bg-slate-50 flex flex-col justify-between group shadow-xs"
                  >
                    <div className="space-y-2">
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-[10px] font-bold text-blue-800 bg-blue-100 px-2 py-0.5 rounded-md">
                          PÓS-GRADUAÇÃO
                        </span>
                        <span className="text-[11px] text-slate-500 font-medium">
                          {course.duration}
                        </span>
                      </div>
                      <h4 className="text-xs sm:text-sm font-bold text-slate-900 group-hover:text-yellow-700 transition-colors leading-snug line-clamp-2 min-h-[2.5rem]">
                        {course.title}
                      </h4>
                      <p className="text-[11px] text-slate-500 line-clamp-2 leading-relaxed">
                        {course.description}
                      </p>
                    </div>

                    <div className="pt-3 mt-3 border-t border-slate-200 flex items-center justify-end">
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          onSelectCourse(course);
                        }}
                        className="w-full bg-yellow-400 hover:bg-yellow-300 active:scale-95 text-slate-950 font-bold px-3.5 py-2.5 rounded-xl text-xs transition-all shadow-sm flex items-center justify-center gap-1.5 cursor-pointer"
                      >
                        <span>Ver Preço & Bolsas</span>
                        <ChevronRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Mobile swipe indicator */}
              <div className="flex sm:hidden items-center justify-center gap-1 text-[11px] text-slate-400 font-medium pt-1">
                <span>← Deslize para ver mais opções →</span>
              </div>
            </div>
          </div>

          {/* Right Sidebar: Lead Generation Form & Other Polos */}
          <div className="lg:col-span-4 space-y-6">
            {/* Lead Form Card */}
            <div className="bg-[#0b1329] border-2 border-yellow-400/30 rounded-3xl p-6 sm:p-7 text-white shadow-2xl space-y-4 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-yellow-400/10 rounded-full blur-2xl pointer-events-none" />

              <div className="relative z-10 text-center space-y-1">
                <span className="bg-yellow-400 text-slate-950 font-black text-[10px] uppercase tracking-widest px-3 py-1 rounded-full inline-block mb-1 shadow-sm">
                  ATENDIMENTO EXCLUSIVO
                </span>
                <h3 className="text-xl font-extrabold text-white">
                  Quer estudar no {polo.name}?
                </h3>
                <p className="text-xs text-slate-300">
                  Preencha o formulário para falar diretamente com a equipe do polo e garantir sua bolsa.
                </p>
              </div>

              {isSubmitted ? (
                <div className="relative z-10 bg-emerald-500/10 border border-emerald-500/30 rounded-2xl p-6 text-center space-y-3">
                  <div className="w-12 h-12 rounded-full bg-emerald-400 text-slate-950 flex items-center justify-center mx-auto shadow-md">
                    <CheckCircle2 className="w-7 h-7" />
                  </div>
                  <h4 className="text-base font-bold text-white">
                    Solicitação Enviada!
                  </h4>
                  <p className="text-xs text-slate-300">
                    Obrigado, <strong className="text-white">{name}</strong>. O consultor educacional do <strong className="text-white">{polo.name}</strong> entrará em contato via WhatsApp no número informado.
                  </p>
                  <button
                    onClick={() => setIsSubmitted(false)}
                    className="text-xs font-bold text-yellow-400 hover:underline pt-2 block mx-auto cursor-pointer"
                  >
                    Fazer nova solicitação
                  </button>
                </div>
              ) : (
                <form onSubmit={handleFormSubmit} className="relative z-10 space-y-3 pt-1">
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

                  <button
                    type="submit"
                    className="w-full bg-yellow-400 hover:bg-yellow-300 text-slate-950 font-bold py-3.5 rounded-xl text-xs transition-all shadow-lg shadow-yellow-400/20 flex items-center justify-center gap-2 cursor-pointer active:scale-95 mt-2"
                  >
                    <span>Falar com um Consultor</span>
                    <Send className="w-4 h-4" />
                  </button>
                </form>
              )}

              {/* Guarantee bullets */}
              <div className="relative z-10 space-y-2 pt-2 border-t border-slate-800 text-[11px] text-slate-300 font-medium">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-yellow-400 shrink-0" />
                  <span>Atendimento presencial ou 100% online</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-yellow-400 shrink-0" />
                  <span>Suporte completo em matrícula e bolsas</span>
                </div>
              </div>
            </div>

            {/* Other Polos in Network */}
            <div className="bg-white border border-slate-200 rounded-3xl p-5 sm:p-6 shadow-sm space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-8 h-8 rounded-xl bg-yellow-400/20 text-yellow-700 flex items-center justify-center">
                    <Building2 className="w-4 h-4" />
                  </span>
                  <div>
                    <h3 className="text-sm sm:text-base font-extrabold text-slate-900">
                      Outros Polos da Rede
                    </h3>
                    <p className="text-[11px] text-slate-500">
                      Conheça outras unidades de atendimento
                    </p>
                  </div>
                </div>

                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-100 text-slate-600">
                  {POLOS_DATA.length - 1} polos
                </span>
              </div>

              {/* Polos List / Carousel on Mobile */}
              <div className="flex lg:flex-col overflow-x-auto lg:overflow-visible snap-x snap-mandatory scrollbar-none gap-3 pb-2 lg:pb-0 -mx-5 px-5 lg:mx-0 lg:px-0">
                {otherPolos.map((other) => (
                  <div
                    key={other.id}
                    onClick={() => onSelectOtherPolo(other)}
                    className="w-[78vw] sm:w-[300px] lg:w-full snap-center shrink-0 lg:shrink text-left p-3 rounded-2xl border border-slate-200 hover:border-yellow-400 hover:shadow-md bg-slate-50/50 hover:bg-yellow-50/30 transition-all flex flex-col justify-between group cursor-pointer"
                  >
                    <div className="flex items-start gap-3">
                      {other.image ? (
                        <img
                          src={other.image}
                          alt={other.name}
                          loading="lazy"
                          referrerPolicy="no-referrer"
                          className="w-14 h-14 rounded-xl object-cover shrink-0 border border-slate-200 group-hover:scale-105 transition-transform duration-300"
                        />
                      ) : (
                        <div className="w-14 h-14 rounded-xl bg-slate-200 flex items-center justify-center text-slate-400 shrink-0">
                          <Building2 className="w-6 h-6" />
                        </div>
                      )}

                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-1 mb-0.5">
                          <h4 className="text-xs font-bold text-slate-900 group-hover:text-yellow-700 transition-colors truncate">
                            {other.name}
                          </h4>
                        </div>

                        <span className="text-[9px] font-extrabold uppercase px-1.5 py-0.5 rounded bg-yellow-400/20 text-yellow-800 inline-block mb-1">
                          {other.city} - {other.state}
                        </span>

                        <p className="text-[10px] text-slate-500 truncate flex items-center gap-1">
                          <MapPin className="w-2.5 h-2.5 text-yellow-500 shrink-0" />
                          <span className="truncate">{other.address}</span>
                        </p>
                      </div>
                    </div>

                    <div className="mt-2.5 pt-2 border-t border-slate-200/80 flex items-center justify-between text-[11px] text-yellow-700 font-bold">
                      <span className="group-hover:translate-x-0.5 transition-transform">Ver polo e cursos</span>
                      <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                ))}
              </div>

              {/* Mobile swipe hint */}
              <div className="flex lg:hidden items-center justify-center gap-1 text-[11px] text-slate-400 pt-1 font-medium">
                <span>← Deslize para ver mais unidades →</span>
              </div>

              <button
                onClick={onBackToPolos}
                className="w-full text-center text-xs font-bold text-slate-700 hover:text-yellow-700 py-2.5 rounded-xl border border-slate-200 hover:border-yellow-400 bg-slate-50 hover:bg-yellow-50/50 transition-all flex items-center justify-center gap-1.5 cursor-pointer mt-1"
              >
                <span>Ver todos os {POLOS_DATA.length} polos da rede</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

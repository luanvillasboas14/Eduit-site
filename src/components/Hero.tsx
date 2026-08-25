import React from 'react';
import { ArrowRight, MessageSquare, ChevronDown } from 'lucide-react';
import bannerImg from '../assets/images/Banner_Novo site cruzeiro.png';

interface HeroProps {
  onOpenConsultant: () => void;
  onExploreCourses: () => void;
  onOpenVideo: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  onOpenConsultant,
  onExploreCourses,
  onOpenVideo,
}) => {
  return (
    <section className="relative min-h-[300px] sm:min-h-[480px] lg:min-h-[580px] flex flex-col justify-between pt-4 sm:pt-8 pb-3 sm:pb-4 overflow-hidden bg-[#070d19]">
      {/* Background image banner */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <img
          src={bannerImg}
          alt="Cruzeiro do Sul Virtual - Banner Oficial"
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover object-right md:object-center opacity-90 filter brightness-100 contrast-105"
        />
        {/* Subtle Dark Gradient Overlay for optimal text legibility on the left side */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#070d19] via-[#070d19]/85 to-transparent max-w-3xl" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#070d19] via-transparent to-transparent h-16 sm:h-28 bottom-0 top-auto" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full my-auto py-3 sm:py-8 lg:py-12">
        <div className="max-w-2xl space-y-2.5 sm:space-y-6">
          {/* Tag / Badge */}
          <div className="inline-flex items-center gap-1.5 sm:gap-2 px-2.5 py-0.5 sm:px-3.5 sm:py-1.5 rounded-full bg-slate-900/90 border border-yellow-500/40 text-yellow-400 text-[10px] sm:text-xs font-semibold backdrop-blur-md shadow-sm">
            <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-yellow-400 animate-pulse" />
            <span>MEC NOTA 5 — EDUCAÇÃO SUPERIOR</span>
          </div>

          {/* Heading */}
          <h1 className="text-xl sm:text-3xl lg:text-5xl font-extrabold text-white tracking-tight leading-snug sm:leading-[1.15] drop-shadow-md">
            Transforme sua{' '}
            <span className="text-yellow-400 bg-clip-text text-transparent bg-gradient-to-r from-yellow-300 via-amber-400 to-yellow-500">
              carreira
            </span>{' '}
            estudando online.
          </h1>

          {/* Subtitle - compact on mobile */}
          <p className="text-xs sm:text-base lg:text-lg text-slate-200 font-normal leading-relaxed max-w-xl drop-shadow-sm line-clamp-2 sm:line-clamp-none">
            O seu diploma no seu tempo. Cursos de graduação e pós com a flexibilidade que você precisa e a qualidade que o mercado exige.
          </p>

          {/* CTA Buttons - touch optimized */}
          <div className="pt-1 sm:pt-3 flex items-center gap-2.5 sm:gap-4 flex-wrap">
            <button
              onClick={onExploreCourses}
              className="bg-yellow-400 hover:bg-yellow-300 text-slate-950 font-bold px-4 py-2 sm:px-7 sm:py-3.5 rounded-full text-xs sm:text-sm transition-all shadow-lg shadow-yellow-500/20 hover:shadow-yellow-500/30 flex items-center gap-1.5 sm:gap-2 cursor-pointer active:scale-95"
            >
              <span>Conhecer os Cursos</span>
              <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            </button>

            <button
              onClick={onOpenConsultant}
              className="bg-slate-900/90 hover:bg-slate-800 text-slate-200 hover:text-white font-semibold px-3.5 py-2 sm:px-6 sm:py-3.5 rounded-full text-xs sm:text-sm border border-slate-700/80 backdrop-blur-md transition-all flex items-center gap-1.5 sm:gap-2 cursor-pointer"
            >
              <MessageSquare className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-yellow-400" />
              <span>Consultor</span>
            </button>
          </div>
        </div>
      </div>

      {/* ROLAR indicator - subtle on desktop, hidden on very tight mobile */}
      <div className="relative z-10 text-center pb-1 hidden sm:block">
        <button
          onClick={onExploreCourses}
          className="inline-flex flex-col items-center gap-1 text-[10px] font-bold tracking-widest text-slate-300 uppercase hover:text-yellow-400 transition-colors cursor-pointer group"
        >
          <span>ROLAR</span>
          <ChevronDown className="w-3.5 h-3.5 text-yellow-400 animate-bounce" />
        </button>
      </div>
    </section>
  );
};

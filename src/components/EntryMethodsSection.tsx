import React from 'react';
import { ENTRY_METHODS_DATA } from '../data/entryMethods';
import { 
  Award, 
  Laptop, 
  ArrowRightLeft, 
  GraduationCap, 
  ArrowRight, 
  CheckCircle2, 
  Sparkles,
  MessageSquare
} from 'lucide-react';

interface EntryMethodsSectionProps {
  onOpenConsultant: (entryMethodTitle?: string) => void;
}

export const EntryMethodsSection: React.FC<EntryMethodsSectionProps> = ({ onOpenConsultant }) => {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Award':
        return <Award className="w-5 h-5" />;
      case 'Laptop':
        return <Laptop className="w-5 h-5" />;
      case 'ArrowRightLeft':
        return <ArrowRightLeft className="w-5 h-5" />;
      case 'GraduationCap':
      default:
        return <GraduationCap className="w-5 h-5" />;
    }
  };

  return (
    <section id="formas-de-entrada" className="bg-[#070d19] text-slate-100 py-8 sm:py-16 border-b border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-5 sm:mb-8">
          <span className="text-[10px] sm:text-xs font-bold tracking-widest text-slate-400 uppercase block mb-1">
            INGRESSO FACILITADO
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Formas de <span className="text-yellow-400">Entrada.</span>
          </h2>
        </div>

        {/* 4 Cards Grid: Horizontal swipe carousel on mobile with peek, matching FeaturedCourses width */}
        <div className="flex sm:grid sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 overflow-x-auto sm:overflow-x-visible pb-4 sm:pb-0 pt-1 -mx-4 px-[8.333%] sm:mx-0 sm:px-0 snap-x snap-mandatory scrollbar-none">
          {ENTRY_METHODS_DATA.map((method) => (
            <div
              key={method.id}
              onClick={() => onOpenConsultant(method.title)}
              className="w-[76vw] max-w-[280px] xs:w-[270px] sm:w-auto sm:max-w-none snap-center sm:snap-start bg-[#0b1329] rounded-2xl p-4 sm:p-6 border border-slate-800/80 hover:border-yellow-400/50 shadow-lg hover:shadow-xl hover:shadow-yellow-500/5 transition-all duration-300 flex flex-col justify-between group cursor-pointer shrink-0 sm:shrink"
            >
              <div className="space-y-3 sm:space-y-4">
                {/* Top Bar with Icon and Badge */}
                <div className="flex items-start justify-between gap-2">
                  <div className="w-9 h-9 sm:w-11 sm:h-11 rounded-xl bg-slate-900 border border-slate-800 text-yellow-400 flex items-center justify-center shadow-md group-hover:scale-105 group-hover:bg-yellow-400 group-hover:text-slate-950 transition-all">
                    {getIcon(method.iconName)}
                  </div>
                  <span className="text-[9px] sm:text-[10px] font-bold uppercase tracking-wider bg-yellow-400/10 text-yellow-400 border border-yellow-400/30 px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-full">
                    {method.badge}
                  </span>
                </div>

                {/* Title and Description */}
                <div className="space-y-1 sm:space-y-2">
                  <h3 className="text-sm sm:text-lg font-bold text-white group-hover:text-yellow-400 transition-colors line-clamp-1 sm:line-clamp-none">
                    {method.title}
                  </h3>
                  <p className="text-[11px] sm:text-xs text-slate-300 leading-relaxed line-clamp-2 sm:line-clamp-none">
                    {method.description}
                  </p>
                </div>

                {/* Key feature bullet */}
                <div className="pt-2 border-t border-slate-800/80 flex items-center gap-1.5 text-[10px] sm:text-[11px] font-semibold text-slate-300">
                  <CheckCircle2 className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-emerald-400 shrink-0" />
                  <span className="truncate">{method.highlight}</span>
                </div>
              </div>

              {/* Action Link */}
              <div className="pt-3 sm:pt-5 mt-3 sm:mt-4 border-t border-slate-800/80 flex items-center justify-between">
                <span className="text-[11px] sm:text-xs font-bold text-yellow-400 group-hover:text-yellow-300 transition-colors">
                  Ingressar agora
                </span>
                <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-slate-900 text-yellow-400 group-hover:bg-yellow-400 group-hover:text-slate-950 flex items-center justify-center transition-all">
                  <ArrowRight className="w-3 h-3 sm:w-3.5 sm:h-3.5 group-hover:translate-x-0.5 transition-transform" />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Helper Bar */}
        <div className="mt-4 sm:mt-10 bg-transparent sm:bg-[#0b1329] border-0 sm:border sm:border-slate-800 rounded-2xl p-0 sm:p-5 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-none sm:shadow-lg">
          <div className="hidden sm:flex items-center gap-3 text-left">
            <div className="w-9 h-9 rounded-xl bg-yellow-400/10 text-yellow-400 flex items-center justify-center shrink-0">
              <MessageSquare className="w-4 h-4" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-white">
                Precisa de orientação sobre qual a melhor forma de ingresso para você?
              </h4>
              <p className="text-[11px] text-slate-400">
                Nossos consultores educacionais calculam seus descontos e auxiliam no envio de documentos.
              </p>
            </div>
          </div>

          <button
            onClick={() => onOpenConsultant()}
            className="w-full sm:w-auto bg-yellow-400 hover:bg-yellow-300 text-slate-950 font-bold px-5 py-3 sm:py-2.5 rounded-xl text-xs transition-colors flex items-center justify-center gap-2 shrink-0 cursor-pointer shadow-md active:scale-95"
          >
            <MessageSquare className="w-4 h-4 text-slate-950" />
            <span>Falar com um Consultor</span>
          </button>
        </div>
      </div>
    </section>
  );
};

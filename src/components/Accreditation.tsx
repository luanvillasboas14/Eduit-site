import React from 'react';
import { ENTRY_METHODS_DATA } from '../data/entryMethods';
import { 
  Award, 
  Laptop, 
  GraduationCap, 
  ArrowRightLeft, 
  CheckCircle2, 
  Building2, 
  Sparkles,
  ArrowRight
} from 'lucide-react';

interface AccreditationProps {
  onOpenConsultant: (courseTitle?: string) => void;
}

const iconMap: Record<string, React.ElementType> = {
  Award,
  Laptop,
  GraduationCap,
  ArrowRightLeft,
  CheckCircle2,
  Building2,
};

export const Accreditation: React.FC<AccreditationProps> = ({ onOpenConsultant }) => {
  return (
    <section id="formas-de-entrada" className="bg-[#070d19] pt-8 pb-8 border-b border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Header */}
        <div className="max-w-3xl mx-auto mb-16 space-y-3">
          <span className="text-xs font-bold tracking-widest text-slate-400 uppercase inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-900 border border-slate-800">
            <Sparkles className="w-3.5 h-3.5 text-yellow-400" />
            <span>COMO INGRESSAR</span>
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Formas de{' '}
            <span className="text-yellow-400">Entrada.</span>
          </h2>
          <p className="text-sm text-slate-300 leading-relaxed">
            Escolha a opção que melhor se encaixa no seu momento e comece sua jornada universitária com bolsas de estudo e facilidades de ingresso.
          </p>
        </div>

        {/* Grid of Entry Method cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12 text-left">
          {ENTRY_METHODS_DATA.map((method) => {
            const IconComponent = iconMap[method.iconName] || GraduationCap;
            return (
              <div
                key={method.id}
                className="bg-[#0b1329] border border-slate-800 rounded-2xl p-6 hover:border-yellow-500/40 transition-all duration-300 flex flex-col justify-between group hover:-translate-y-1 hover:shadow-xl shadow-slate-950/50"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="w-10 h-10 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center text-yellow-400 group-hover:bg-yellow-400 group-hover:text-slate-950 transition-colors">
                      <IconComponent className="w-5 h-5" />
                    </div>
                    <span className="text-[10px] font-bold text-yellow-400 bg-yellow-400/10 border border-yellow-500/20 px-2.5 py-1 rounded-full uppercase tracking-wider">
                      {method.badge}
                    </span>
                  </div>

                  <div>
                    <h3 className="text-xl font-bold text-white group-hover:text-yellow-400 transition-colors">
                      {method.title}
                    </h3>
                    <p className="text-xs text-slate-300 leading-relaxed mt-2">
                      {method.description}
                    </p>
                  </div>
                </div>

                <div className="pt-6 mt-4 border-t border-slate-800/80 flex items-center justify-between">
                  <span className="text-[11px] font-semibold text-slate-400">
                    {method.highlight}
                  </span>
                  <button
                    onClick={() => onOpenConsultant(`Ingresso por: ${method.title}`)}
                    className="text-xs font-bold text-yellow-400 hover:text-yellow-300 flex items-center gap-1 cursor-pointer"
                  >
                    <span>Saber Mais</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className="bg-gradient-to-r from-slate-900 via-[#0b1329] to-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-left space-y-1">
            <h4 className="text-lg font-bold text-white">
              Precisa de ajuda para escolher sua forma de ingresso?
            </h4>
            <p className="text-xs text-slate-300">
              Nossos consultores ajudam você a fazer o vestibular online agora.
            </p>
          </div>

          <button
            onClick={() => onOpenConsultant()}
            className="bg-yellow-400 hover:bg-yellow-300 text-slate-950 font-bold px-7 py-3 rounded-full text-xs shrink-0 shadow-lg shadow-yellow-400/20 transition-all cursor-pointer active:scale-95"
          >
            Quero Bolsa de Estudos
          </button>
        </div>
      </div>
    </section>
  );
};

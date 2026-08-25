import React from 'react';
import { MessageSquare } from 'lucide-react';

interface ContactSectionProps {
  onOpenConsultant: () => void;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ onOpenConsultant }) => {
  return (
    <section id="contato" className="bg-[#070d19] py-5 sm:py-6 border-b border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 items-center bg-[#0b1329] border border-slate-800 rounded-2xl p-4 sm:p-5">
          {/* 2/3 Title & Subtitle */}
          <div className="lg:col-span-2 text-left space-y-1">
            <span className="text-[10px] font-bold tracking-widest text-slate-400 uppercase block">
              FALE CONOSCO
            </span>
            <h2 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
              Pronto para dar o{' '}
              <span className="text-yellow-400">próximo passo?</span>
            </h2>
            <p className="text-xs text-slate-300 leading-relaxed max-w-2xl">
              Nossa equipe de consultores educacionais está pronta para ajudar você a escolher o curso ideal e iniciar sua jornada acadêmica.
            </p>
          </div>

          {/* 1/3 WhatsApp */}
          <div className="lg:col-span-1">
            <a
              href="https://wa.cruzeiroead.com.br/tronco"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-slate-900 border border-yellow-400/60 rounded-xl p-3 sm:p-4 text-center hover:border-yellow-400 transition-all duration-300 cursor-pointer shadow-md shadow-yellow-500/10 group flex items-center justify-center gap-3 active:scale-95"
            >
              <div className="w-8 h-8 rounded-lg bg-yellow-400 flex items-center justify-center text-slate-950 shrink-0 shadow-sm shadow-yellow-400/30 group-hover:scale-105 transition-transform">
                <MessageSquare className="w-4 h-4 fill-slate-950" />
              </div>
              <div className="text-left">
                <span className="text-[10px] font-extrabold text-yellow-400 uppercase tracking-wider block">
                  Falar no WhatsApp
                </span>
                <h3 className="text-sm font-bold text-white">
                  (11) 91747-9873
                </h3>
                <p className="text-[10px] text-slate-300">
                  Resposta em minutos
                </p>
              </div>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

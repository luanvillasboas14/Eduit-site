import React from 'react';
import { X, Play, CheckCircle2, Laptop, Award, ShieldCheck } from 'lucide-react';

interface VideoModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenConsultant: () => void;
}

export const VideoModal: React.FC<VideoModalProps> = ({
  isOpen,
  onClose,
  onOpenConsultant,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fadeIn">
      <div className="bg-[#0b1329] border border-slate-800 rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl relative space-y-6">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-9 h-9 rounded-full bg-slate-900 border border-slate-800 text-slate-400 hover:text-white flex items-center justify-center transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="space-y-2">
          <span className="text-[10px] font-bold text-yellow-400 uppercase tracking-widest block">
            DEMONSTRAÇÃO DA PLATAFORMA EAD
          </span>
          <h2 className="text-2xl font-extrabold text-white">
            Como funciona a Cruzeiro do Sul Virtual?
          </h2>
        </div>

        {/* Video Player Placeholder */}
        <div className="relative h-64 sm:h-80 bg-slate-950 border border-slate-800 rounded-2xl overflow-hidden flex items-center justify-center group">
          <img
            src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1000&q=80"
            alt="Ambiente Virtual de Aprendizagem"
            className="w-full h-full object-cover opacity-50"
          />
          <div className="absolute inset-0 bg-slate-950/40" />
          <div className="relative z-10 w-16 h-16 rounded-full bg-yellow-400 text-slate-950 flex items-center justify-center shadow-xl shadow-yellow-400/30 group-hover:scale-110 transition-transform cursor-pointer">
            <Play className="w-7 h-7 fill-slate-950 ml-1" />
          </div>
        </div>

        {/* Highlights */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs text-slate-300">
          <div className="p-3 bg-slate-900/50 rounded-xl border border-slate-800 space-y-1">
            <Laptop className="w-4 h-4 text-yellow-400" />
            <h4 className="font-bold text-white">Aulas 24h Online</h4>
            <p className="text-[11px] text-slate-400">Estude no celular, tablet ou computador onde quiser.</p>
          </div>
          <div className="p-3 bg-slate-900/50 rounded-xl border border-slate-800 space-y-1">
            <ShieldCheck className="w-4 h-4 text-yellow-400" />
            <h4 className="font-bold text-white">Tutoria Dedicada</h4>
            <p className="text-[11px] text-slate-400">Professores e mestres tirando suas dúvidas em tempo real.</p>
          </div>
          <div className="p-3 bg-slate-900/50 rounded-xl border border-slate-800 space-y-1">
            <Award className="w-4 h-4 text-yellow-400" />
            <h4 className="font-bold text-white">Diploma Igual</h4>
            <p className="text-[11px] text-slate-400">Mesmo diploma do curso presencial sem ressalvas.</p>
          </div>
        </div>

        <div className="pt-2 flex items-center justify-between">
          <button
            onClick={onClose}
            className="text-xs text-slate-400 hover:text-white"
          >
            Fechar janela
          </button>
          <button
            onClick={() => {
              onClose();
              onOpenConsultant();
            }}
            className="bg-yellow-400 hover:bg-yellow-300 text-slate-950 font-bold px-6 py-2.5 rounded-full text-xs shadow-md shadow-yellow-400/20"
          >
            Quero Começar Agora
          </button>
        </div>
      </div>
    </div>
  );
};

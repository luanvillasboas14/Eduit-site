import React, { useState } from 'react';
import { X, MessageSquare, CheckCircle2, PhoneCall, ShieldCheck } from 'lucide-react';
import { leadTipoFromCourse, submitLead } from '../lib/leads';

interface ConsultantModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultCourse?: string;
  defaultPolo?: string;
}

export const ConsultantModal: React.FC<ConsultantModalProps> = ({
  isOpen,
  onClose,
  defaultCourse,
  defaultPolo,
}) => {
  const [submitted, setSubmitted] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [privacy, setPrivacy] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!privacy) return;
    setError('');
    setIsSending(true);
    try {
      await submitLead({
        nome: name,
        email,
        celular: phone,
        tipo: leadTipoFromCourse(defaultCourse),
      });
      window.open('https://wa.cruzeiroead.com.br/tronco', '_blank', 'noopener,noreferrer');
      setSubmitted(true);
    } catch {
      setError('Não foi possível enviar. Tente novamente.');
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fadeIn">
      <div className="bg-[#0b1329] border border-slate-800 rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl relative">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-9 h-9 rounded-full bg-slate-900 border border-slate-800 text-slate-400 hover:text-white flex items-center justify-center transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {submitted ? (
          <div className="text-center space-y-4 py-6">
            <div className="w-16 h-16 rounded-full bg-yellow-400 text-slate-950 flex items-center justify-center mx-auto shadow-lg shadow-yellow-400/20">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold text-white">
              Solicitação Enviada!
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Em instantes, nosso consultor educacional entrará em contato pelo WhatsApp <span className="text-yellow-400 font-bold">{phone}</span> para tirar todas as suas dúvidas sobre bolsas e matrículas{defaultPolo ? ` no polo ${defaultPolo}` : ''}.
            </p>
            <div className="pt-4">
              <button
                onClick={() => {
                  setSubmitted(false);
                  onClose();
                }}
                className="bg-yellow-400 hover:bg-yellow-300 text-slate-950 font-bold px-8 py-2.5 rounded-full text-xs cursor-pointer"
              >
                Concluir
              </button>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-yellow-400 text-slate-950 flex items-center justify-center shrink-0">
                <MessageSquare className="w-5 h-5 fill-slate-950" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white">
                  Falar com um Consultor
                </h3>
                <p className="text-xs text-slate-400">
                  Receba atendimento personalizado via WhatsApp em menos de 5 minutos
                </p>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="text-[11px] font-semibold text-slate-300 block mb-1">
                  Seu Nome Completo
                </label>
                <input
                  type="text"
                  required
                  placeholder="Ex: Maria Silva"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-yellow-400"
                />
              </div>

              <div>
                <label className="text-[11px] font-semibold text-slate-300 block mb-1">
                  WhatsApp com DDD
                </label>
                <input
                  type="tel"
                  required
                  placeholder="(11) 9 9999-9999"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-yellow-400"
                />
              </div>

              <div>
                <label className="text-[11px] font-semibold text-slate-300 block mb-1">
                  E-mail
                </label>
                <input
                  type="email"
                  required
                  placeholder="Ex: maria@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-yellow-400"
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

              {error && <p className="text-[11px] text-red-400">{error}</p>}

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSending}
                  className="w-full bg-yellow-400 hover:bg-yellow-300 disabled:opacity-60 text-slate-950 font-bold py-3 rounded-xl text-xs transition-colors shadow-lg shadow-yellow-400/20 flex items-center justify-center gap-2 cursor-pointer"
                >
                  <PhoneCall className="w-4 h-4" />
                  <span>{isSending ? 'Enviando...' : 'Iniciar Atendimento no WhatsApp'}</span>
                </button>
              </div>

              <div className="flex items-center justify-center gap-1.5 text-[10px] text-slate-400 pt-1">
                <ShieldCheck className="w-3.5 h-3.5 text-yellow-400" />
                <span>Seus dados estão 100% seguros e protegidos pela LGPD.</span>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

import React, { useEffect, useMemo, useState } from 'react';
import {
  ArrowRight,
  CheckCircle2,
  Clock,
  MessageCircle,
  MessageSquare,
  ShieldCheck,
  Sparkles,
  X,
} from 'lucide-react';
import { Course } from '../types';
import { formatBRL, originalFromPrice, useCourses } from '../lib/courses';
import { formatPhoneBR, leadTipoFromCourse, submitLead, validateLeadContact } from '../lib/leads';
import { trackFormSubmit } from '../lib/analytics';

interface ConsultantModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultCourse?: string;
  defaultPolo?: string;
}

function matchCourse(courses: Course[], title: string): Course | null {
  const clean = title.toLowerCase().trim();
  if (!clean) return null;
  return (
    courses.find(
      (course) =>
        course.title.toLowerCase() === clean ||
        course.id.toLowerCase() === clean ||
        clean.includes(course.title.toLowerCase()) ||
        course.title.toLowerCase().includes(clean),
    ) || null
  );
}

export const ConsultantModal: React.FC<ConsultantModalProps> = ({
  isOpen,
  onClose,
  defaultCourse = '',
  defaultPolo = '',
}) => {
  const { courses } = useCourses();
  const [submitted, setSubmitted] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [privacy, setPrivacy] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [error, setError] = useState('');
  const [selectedCourseTitle, setSelectedCourseTitle] = useState(defaultCourse);

  useEffect(() => {
    if (isOpen) {
      setSelectedCourseTitle(defaultCourse || '');
      setSubmitted(false);
      setError('');
    }
  }, [isOpen, defaultCourse]);

  const matchedCourse = useMemo(
    () => matchCourse(courses, selectedCourseTitle),
    [courses, selectedCourseTitle],
  );

  if (!isOpen) return null;

  const coursePrice = matchedCourse?.price || 0;
  const originalPrice = originalFromPrice(coursePrice, matchedCourse?.originalPrice);
  const courseTitleDisplay =
    matchedCourse?.title || selectedCourseTitle || 'Graduação & Pós-Graduação EAD';

  const whatsappMessage = encodeURIComponent(
    `Olá! Meu nome é ${name || 'Interessado'}. Acabei de ver o valor da mensalidade do curso de ${courseTitleDisplay}${coursePrice > 0 ? ` (${formatBRL(coursePrice)}/mês)` : ''} no site e gostaria de conversar com um consultor para garantir minha bolsa!`,
  );
  const whatsappUrl = `https://wa.cruzeiroead.com.br/tronco?text=${whatsappMessage}`;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!privacy) return;
    const contactError = validateLeadContact({ email, celular: phone });
    if (contactError) {
      setError(contactError);
      return;
    }
    setError('');
    setIsSending(true);
    try {
      await submitLead({
        nome: name,
        email,
        celular: phone,
        tipo: leadTipoFromCourse(selectedCourseTitle, matchedCourse?.categoryBadge === 'PÓS-GRADUAÇÃO'),
      });
      trackFormSubmit('consultor_modal', { course_title: selectedCourseTitle });
      setSubmitted(true);
    } catch {
      setError('Não foi possível enviar. Tente novamente.');
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fadeIn">
      <div className="bg-[#0b1329] border border-slate-800 rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl relative max-h-[92vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-9 h-9 rounded-full bg-slate-900 border border-slate-800 text-slate-400 hover:text-white flex items-center justify-center transition-colors cursor-pointer z-10"
          title="Fechar"
        >
          <X className="w-5 h-5" />
        </button>

        {submitted ? (
          <div className="text-center space-y-5 py-2 animate-fadeIn">
            <div className="w-14 h-14 rounded-full bg-yellow-400 text-slate-950 flex items-center justify-center mx-auto shadow-lg shadow-yellow-400/20">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <div className="space-y-1">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-yellow-400/10 border border-yellow-400/30 text-yellow-400 text-[11px] font-bold uppercase tracking-wider">
                <Sparkles className="w-3 h-3 text-yellow-400" />
                <span>Condição Especial Liberada</span>
              </div>
              <p className="text-xs sm:text-sm text-slate-300 pt-1">
                Olá, <strong className="text-white">{name}</strong>! Confira abaixo a condição exclusiva para sua matrícula:
              </p>
            </div>

            <div className="bg-slate-900/90 border-2 border-yellow-400/50 rounded-2xl p-5 text-left space-y-3 shadow-inner">
              <div className="flex items-center justify-between gap-2 border-b border-slate-800 pb-2.5">
                <span className="text-[10px] font-extrabold text-yellow-400 bg-yellow-400/10 px-2.5 py-1 rounded-md uppercase tracking-wider">
                  {matchedCourse?.category || 'EAD CREDENCIADO'}
                </span>
                <span className="text-[11px] text-slate-400 flex items-center gap-1">
                  <Clock className="w-3 h-3 text-yellow-400" />
                  {matchedCourse?.duration || 'Duração Flexível'}
                </span>
              </div>

              <div>
                <h4 className="text-base sm:text-lg font-extrabold text-white leading-snug">
                  {courseTitleDisplay}
                </h4>
                <p className="text-[11px] text-slate-400 mt-0.5">
                  Modalidade:{' '}
                  <strong className="text-slate-200">{matchedCourse?.modality || '100% Online (EAD)'}</strong>
                  {defaultPolo && ` • Polo ${defaultPolo}`}
                </p>
              </div>

              <div className="pt-2 border-t border-slate-800/80">
                {coursePrice > 0 && (
                  <span className="text-[11px] text-slate-400 line-through block">
                    De {formatBRL(originalPrice)}
                  </span>
                )}
                <div className="flex items-baseline gap-1 mt-0.5">
                  <span className="text-xs font-bold text-yellow-400">Por</span>
                  <span className="text-2xl sm:text-3xl font-black text-white">
                    {coursePrice > 0 ? formatBRL(coursePrice) : 'Consulte'}
                  </span>
                  <span className="text-xs text-slate-400 font-medium">/mês</span>
                </div>
              </div>

              <div className="space-y-1 pt-2 border-t border-slate-800/60 text-[10px] text-slate-400">
                <p>• Desconto mantido até o final do curso.</p>
                <p>• Diploma com o mesmo valor do curso presencial reconhecido pelo MEC</p>
              </div>
            </div>

            <div className="space-y-3 pt-2">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full bg-yellow-400 hover:bg-yellow-300 text-slate-950 font-extrabold py-3.5 px-6 rounded-xl text-xs sm:text-sm flex items-center justify-center gap-2.5 transition-all shadow-lg shadow-yellow-400/20 active:scale-98 cursor-pointer"
              >
                <MessageCircle className="w-5 h-5 fill-slate-950" />
                <span>Conversar com um Consultor no WhatsApp</span>
              </a>
              <p className="text-[11px] text-slate-400">
                Tire suas dúvidas com nosso consultor e garanta sua bolsa agora mesmo!
              </p>
              <button
                onClick={() => {
                  setSubmitted(false);
                  onClose();
                }}
                className="text-xs text-slate-400 hover:text-white underline cursor-pointer pt-2 block mx-auto"
              >
                Fechar janela
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
                <h3 className="text-lg font-bold text-white">Consultar Valores & Bolsas</h3>
                <p className="text-xs text-slate-400">
                  Preencha seus dados para desbloquear a mensalidade do curso e falar com um consultor.
                </p>
              </div>
            </div>

            <form noValidate onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="text-[11px] font-semibold text-slate-300 block mb-1">
                  Curso de Interesse
                </label>
                {defaultCourse ? (
                  <div className="bg-slate-900 border border-slate-700/80 rounded-xl px-4 py-2.5 text-xs text-yellow-400 font-bold flex items-center justify-between">
                    <span className="truncate">{defaultCourse}</span>
                    <span className="text-[10px] text-slate-400 uppercase ml-2 shrink-0">Selecionado</span>
                  </div>
                ) : (
                  <select
                    value={selectedCourseTitle}
                    onChange={(e) => setSelectedCourseTitle(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-yellow-400"
                  >
                    <option value="">Selecione um curso (ou tire dúvidas gerais)</option>
                    {courses.map((course) => (
                      <option key={course.id} value={course.title}>
                        {course.title} ({course.modality})
                      </option>
                    ))}
                  </select>
                )}
              </div>

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
                  inputMode="numeric"
                  autoComplete="tel"
                  maxLength={15}
                  placeholder="(11) 99999-9999"
                  value={phone}
                  onChange={(e) => setPhone(formatPhoneBR(e.target.value))}
                  className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-yellow-400"
                />
              </div>

              <div>
                <label className="text-[11px] font-semibold text-slate-300 block mb-1">E-mail (opcional)</label>
                <input
                  type="text"
                  inputMode="email"
                  autoComplete="email"
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
                  className="w-full bg-yellow-400 hover:bg-yellow-300 disabled:opacity-60 text-slate-950 font-bold py-3.5 rounded-xl text-xs sm:text-sm transition-colors shadow-lg shadow-yellow-400/20 flex items-center justify-center gap-2 cursor-pointer active:scale-98"
                >
                  <span>{isSending ? 'Enviando...' : 'Ver Valor da Mensalidade'}</span>
                  <ArrowRight className="w-4 h-4" />
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

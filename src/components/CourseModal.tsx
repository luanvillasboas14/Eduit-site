import React, { useState } from 'react';
import { Course } from '../types';
import { X, CheckCircle2, Clock, Users, Star, Award, GraduationCap, ArrowRight } from 'lucide-react';

interface CourseModalProps {
  course: Course | null;
  onClose: () => void;
  onOpenConsultantWithCourse: (courseTitle: string) => void;
}

export const CourseModal: React.FC<CourseModalProps> = ({
  course,
  onClose,
  onOpenConsultantWithCourse,
}) => {
  const [enrolled, setEnrolled] = useState(false);
  const [studentName, setStudentName] = useState('');
  const [studentPhone, setStudentPhone] = useState('');
  const [studentEmail, setStudentEmail] = useState('');

  if (!course) return null;

  const handleEnroll = (e: React.FormEvent) => {
    e.preventDefault();
    setEnrolled(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md overflow-y-auto animate-fadeIn">
      <div className="bg-[#0b1329] border border-slate-800 rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl relative my-8">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-slate-900/80 border border-slate-800 text-slate-400 hover:text-white flex items-center justify-center transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header / Banner */}
        <div className="relative h-48 sm:h-56">
          <img
            src={course.image}
            alt={course.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0b1329] via-[#0b1329]/50 to-transparent" />
          <div className="absolute bottom-4 left-6 right-6">
            <div className="inline-block bg-yellow-400 text-slate-950 font-bold text-[10px] uppercase px-3 py-1 rounded-full mb-2">
              {course.categoryBadge}
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
              {course.title}
            </h2>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-8 space-y-6">
          {/* Quick Stats */}
          <div className="grid grid-cols-2 gap-3 p-4 bg-slate-900/60 border border-slate-800 rounded-2xl text-center">
            <div>
              <div className="text-[10px] text-slate-400 uppercase font-semibold flex items-center justify-center gap-1">
                <Clock className="w-3 h-3 text-yellow-400" /> Duração
              </div>
              <div className="text-xs sm:text-sm font-bold text-white mt-1">
                {course.duration}
              </div>
            </div>
            <div>
              <div className="text-[10px] text-slate-400 uppercase font-semibold flex items-center justify-center gap-1">
                <Star className="w-3 h-3 text-yellow-400 fill-yellow-400" /> Avaliação
              </div>
              <div className="text-xs sm:text-sm font-bold text-white mt-1">
                {course.rating.toFixed(1)} / 5.0
              </div>
            </div>
          </div>

          {/* Description */}
          <div>
            <h3 className="text-sm font-bold text-white mb-2">Sobre o Curso</h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              {course.description}
            </p>
          </div>

          {/* Modules */}
          <div>
            <h3 className="text-sm font-bold text-white mb-3 flex items-center gap-2">
              <GraduationCap className="w-4 h-4 text-yellow-400" />
              <span>O que você vai aprender (Principais Módulos)</span>
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {course.modules.map((mod, i) => (
                <div key={i} className="flex items-start gap-2 bg-slate-900/40 p-2.5 rounded-xl border border-slate-800/60 text-xs text-slate-200">
                  <CheckCircle2 className="w-4 h-4 text-yellow-400 shrink-0 mt-0.5" />
                  <span>{mod}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Career Opportunities */}
          <div>
            <h3 className="text-sm font-bold text-white mb-3 flex items-center gap-2">
              <Award className="w-4 h-4 text-yellow-400" />
              <span>Mercado de Trabalho</span>
            </h3>
            <div className="flex flex-wrap gap-2">
              {course.careerOpportunities.map((op, i) => (
                <span key={i} className="bg-slate-900 border border-slate-800 text-slate-300 text-xs px-3 py-1.5 rounded-full">
                  💼 {op}
                </span>
              ))}
            </div>
          </div>

          {/* Price & Enrollment Form */}
          <div className="pt-6 border-t border-slate-800">
            {enrolled ? (
              <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-2xl p-6 text-center space-y-3">
                <div className="w-12 h-12 rounded-full bg-yellow-400 text-slate-950 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-7 h-7" />
                </div>
                <h4 className="text-lg font-bold text-white">
                  Pré-Inscrição Recebida!
                </h4>
                <p className="text-xs text-slate-300">
                  Um de nossos consultores entrará em contato com você via WhatsApp para confirmar seus dados e concorrer à bolsa promocional.
                </p>
                <button
                  onClick={onClose}
                  className="bg-yellow-400 text-slate-950 font-bold px-6 py-2 rounded-full text-xs"
                >
                  Fechar
                </button>
              </div>
            ) : (
              <div>
                <div className="flex items-center justify-end mb-4">
                  <button
                    onClick={() => {
                      onClose();
                      onOpenConsultantWithCourse(course.title);
                    }}
                    className="text-xs font-semibold text-yellow-400 hover:text-yellow-300 underline"
                  >
                    Dúvidas? Fale no WhatsApp
                  </button>
                </div>

                <form onSubmit={handleEnroll} className="space-y-3">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <input
                      type="text"
                      required
                      placeholder="Seu Nome Completo"
                      value={studentName}
                      onChange={(e) => setStudentName(e.target.value)}
                      className="bg-slate-900 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-yellow-400"
                    />
                    <input
                      type="tel"
                      required
                      placeholder="WhatsApp (com DDD)"
                      value={studentPhone}
                      onChange={(e) => setStudentPhone(e.target.value)}
                      className="bg-slate-900 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-yellow-400"
                    />
                  </div>
                  <input
                    type="email"
                    required
                    placeholder="Seu E-mail"
                    value={studentEmail}
                    onChange={(e) => setStudentEmail(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-yellow-400"
                  />
                  <button
                    type="submit"
                    className="w-full bg-yellow-400 hover:bg-yellow-300 text-slate-950 font-bold py-3 rounded-xl text-xs transition-colors shadow-lg shadow-yellow-400/20 flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <span>Garantir Vaga com Desconto</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </form>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

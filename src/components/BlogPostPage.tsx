import React, { useEffect, useState } from 'react';
import { NewsArticle } from '../types';
import { fetchRelatedPosts } from '../lib/supabase';
import { wixBlogCategoryLabel } from '../data/siteUrls';
import { submitLead } from '../lib/leads';
import {
  ChevronRight,
  ArrowLeft,
  Calendar,
  Clock,
  Share2,
  CheckCircle2,
  Tag,
  Send,
  BookOpen,
  TrendingUp
} from 'lucide-react';

interface BlogPostPageProps {
  article: NewsArticle;
  onBackToBlog: () => void;
  onNavigateHome: () => void;
  onSelectArticle: (article: NewsArticle) => void;
  onOpenConsultant: (subject?: string) => void;
}

export const BlogPostPage: React.FC<BlogPostPageProps> = ({
  article,
  onBackToBlog,
  onNavigateHome,
  onSelectArticle,
  onOpenConsultant,
}) => {
  const [copied, setCopied] = useState(false);
  const [leadName, setLeadName] = useState('');
  const [leadPhone, setLeadPhone] = useState('');
  const [leadEmail, setLeadEmail] = useState('');
  const [privacy, setPrivacy] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [formError, setFormError] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [relatedArticles, setRelatedArticles] = useState<NewsArticle[]>([]);

  useEffect(() => {
    fetchRelatedPosts(article.id, article.category)
      .then(setRelatedArticles)
      .catch(() => setRelatedArticles([]));
  }, [article.id, article.category]);

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: article.title,
        text: article.summary,
        url: window.location.href,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  const handleLeadSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!leadName.trim() || !leadPhone.trim() || !leadEmail.trim() || !privacy) return;
    setFormError('');
    setIsSending(true);
    try {
      await submitLead({
        nome: leadName,
        email: leadEmail,
        celular: leadPhone,
        tipo: 'Graduação',
      });
      setIsSubmitted(true);
    } catch {
      setFormError('Não foi possível enviar. Tente novamente.');
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div className="bg-slate-100 min-h-screen pt-4 sm:pt-6 pb-12 sm:pb-20 overflow-x-hidden w-full">
      {/* Breadcrumb / Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-4 sm:mb-6">
        <div className="flex items-center justify-between gap-3 text-xs">
          <button
            onClick={onBackToBlog}
            className="inline-flex items-center gap-2 font-bold text-slate-700 hover:text-slate-950 bg-white border border-slate-300 px-3 py-1.5 rounded-xl shadow-sm transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5 text-yellow-600" />
            <span>Voltar para o Blog</span>
          </button>

          <nav className="hidden sm:flex items-center gap-2 text-slate-500 font-medium overflow-hidden truncate">
            <button onClick={onNavigateHome} className="hover:text-slate-900 cursor-pointer">
              Início
            </button>
            <ChevronRight className="w-3 h-3 text-slate-400 shrink-0" />
            <button onClick={onBackToBlog} className="hover:text-slate-900 cursor-pointer">
              Blog & Notícias
            </button>
            <ChevronRight className="w-3 h-3 text-slate-400 shrink-0" />
            <span className="text-slate-900 font-bold truncate max-w-[200px] md:max-w-[300px]">
              {article.title}
            </span>
          </nav>
        </div>
      </div>

      {/* Main Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* ================= LEFT / MAIN CONTENT (8 cols) ================= */}
          <article className="lg:col-span-8 space-y-6 self-start">
            
            {/* Header Card */}
            <div className="bg-[#0b1329] border border-slate-800 rounded-3xl p-6 sm:p-10 text-white shadow-xl space-y-5 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-yellow-400/5 rounded-full blur-3xl pointer-events-none" />

              {/* Badges & Meta */}
              <div className="flex flex-wrap items-center gap-2.5 sm:gap-3 text-xs">
                {wixBlogCategoryLabel(article) && (
                  <span className="bg-yellow-400 text-slate-950 font-black text-[10px] sm:text-xs uppercase px-3 py-1 rounded-full shadow-sm">
                    {wixBlogCategoryLabel(article)}
                  </span>
                )}
                <div className="flex items-center gap-3 text-slate-400 text-xs ml-auto">
                  <span className="flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-yellow-400" />
                    {article.date}
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-yellow-400" />
                    {article.readTime}
                  </span>
                </div>
              </div>

              {/* Title */}
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white leading-tight tracking-tight">
                {article.title}
              </h1>

              {/* Summary / Subtitle */}
              <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-normal">
                {article.summary}
              </p>

              {/* Share Bar */}
              <div className="pt-4 border-t border-slate-800/80 flex items-center justify-end">
                <button
                  onClick={handleShare}
                  className="inline-flex items-center justify-center gap-2 bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-200 hover:text-white px-4 py-2.5 rounded-xl text-xs font-bold transition-all shadow-sm cursor-pointer active:scale-95"
                >
                  <Share2 className="w-3.5 h-3.5 text-yellow-400" />
                  <span>{copied ? 'Link Copiado!' : 'Compartilhar'}</span>
                </button>
              </div>
            </div>

            {/* Featured Image */}
            {article.image && (
              <div className="rounded-3xl overflow-hidden shadow-lg border border-slate-200 bg-slate-900 aspect-[16/9] sm:aspect-[21/9] w-full">
                <img
                  src={article.image}
                  alt={article.title}
                  className="w-full h-full object-cover"
                />
              </div>
            )}

            {/* Article Content Body (Light Background Container for maximum readability) */}
            <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-10 text-slate-800 shadow-sm space-y-6">
              <div className="prose prose-slate max-w-none text-sm sm:text-base leading-relaxed space-y-4 whitespace-pre-line">
                {article.content}
              </div>

              {/* Tags Section */}
              {article.tags && article.tags.length > 0 && (
                <div className="pt-6 border-t border-slate-200 flex flex-wrap items-center gap-2">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-slate-600 mr-2">
                    <Tag className="w-4 h-4 text-yellow-600" />
                    <span>Tópicos relacionados:</span>
                  </div>
                  {article.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs bg-slate-100 border border-slate-200 hover:border-yellow-400 text-slate-700 font-semibold px-3 py-1 rounded-lg transition-colors"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              )}
            </div>

            {/* In-Article Promotion Banner */}
            <div className="bg-[#0b1329] border-2 border-yellow-400/30 rounded-3xl p-6 sm:p-8 text-white shadow-xl flex flex-col sm:flex-row items-center justify-between gap-6">
              <div className="space-y-1 text-center sm:text-left">
                <span className="text-[10px] font-extrabold text-yellow-400 uppercase tracking-wider">
                  OPORTUNIDADE EXCLUSIVA
                </span>
                <h3 className="text-lg sm:text-xl font-bold text-white">
                  Pronto para dar o próximo passo na sua carreira?
                </h3>
                <p className="text-xs text-slate-300 max-w-md">
                  Inscreva-se nos cursos de graduação e pós-graduação EAD da Cruzeiro do Sul com condições e bolsas especiais.
                </p>
              </div>
              <button
                onClick={() => onOpenConsultant(`Interesse pelo artigo: ${article.title}`)}
                className="w-full sm:w-auto bg-yellow-400 hover:bg-yellow-300 text-slate-950 font-bold py-3 px-6 rounded-xl text-xs transition-all shadow-lg shadow-yellow-400/20 flex items-center justify-center gap-2 shrink-0 cursor-pointer active:scale-95"
              >
                <span>Falar com Consultor</span>
                <Send className="w-4 h-4" />
              </button>
            </div>

            {/* Categorias do Blog (Compact & optimized for mobile) */}
            <div className="bg-white border border-slate-200 rounded-2xl sm:rounded-3xl p-4 sm:p-6 shadow-sm space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="text-sm sm:text-base font-bold text-slate-900 flex items-center gap-2">
                  <BookOpen className="w-4 h-4 text-yellow-600" />
                  <span>Categorias do Blog</span>
                </h3>
                <button
                  onClick={onBackToBlog}
                  className="text-[11px] sm:text-xs font-bold text-yellow-700 hover:text-slate-950 transition-colors cursor-pointer"
                >
                  Ver todos →
                </button>
              </div>

              {/* Category Pills: Horizontal scroll on mobile for minimum height, flex-wrap on desktop */}
              <div className="flex sm:flex-wrap gap-2 overflow-x-auto sm:overflow-x-visible pb-1 sm:pb-0 scrollbar-none -mx-1 px-1">
                {['Todos', 'Vestibular', 'Carreira', 'Tecnologia', 'Educação', 'Dicas de Estudo', 'Parcerias', 'Bolsas & Descontos'].map((cat) => (
                  <button
                    key={cat}
                    onClick={onBackToBlog}
                    className="text-[11px] sm:text-xs whitespace-nowrap bg-slate-100 hover:bg-yellow-400 hover:text-slate-950 text-slate-700 font-bold px-3 py-1.5 rounded-lg sm:rounded-xl transition-all shadow-xs cursor-pointer active:scale-95 border border-slate-200/60 shrink-0"
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>
          </article>

          {/* ================= RIGHT SIDEBAR (4 cols) ================= */}
          <aside className="lg:col-span-4 space-y-6 self-start lg:sticky lg:top-12">
            
            {/* Lead Form Card (Visible on Desktop only as requested) */}
            <div className="hidden lg:block bg-[#0b1329] border-2 border-yellow-400/30 rounded-3xl pt-3.5 sm:pt-4 px-6 pb-6 text-white shadow-2xl space-y-3.5 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-yellow-400/10 rounded-full blur-2xl pointer-events-none" />

              <div className="relative z-10 text-center space-y-1">
                <span className="bg-yellow-400 text-slate-950 font-black text-[10px] uppercase tracking-widest px-3 py-1 rounded-full inline-block mb-0.5 shadow-sm">
                  BOLSA DE ESTUDOS
                </span>
                <h3 className="text-xl font-extrabold text-white">
                  Quer Estudar na Cruzeiro do Sul?
                </h3>
                <p className="text-xs text-slate-300">
                  Preencha seus dados para receber orientações sobre cursos, vestibulares e bolsas de até 100%.
                </p>
              </div>

              {isSubmitted ? (
                <div className="relative z-10 bg-emerald-500/10 border border-emerald-500/30 rounded-2xl p-6 text-center space-y-3">
                  <div className="w-12 h-12 rounded-full bg-emerald-400 text-slate-950 flex items-center justify-center mx-auto shadow-md">
                    <CheckCircle2 className="w-7 h-7" />
                  </div>
                  <h4 className="text-base font-bold text-white">
                    Solicitação Recebida!
                  </h4>
                  <p className="text-xs text-slate-300">
                    Obrigado, <strong className="text-white">{leadName}</strong>. Um de nossos consultores entrará em contato via WhatsApp no número informado.
                  </p>
                  <button
                    onClick={() => setIsSubmitted(false)}
                    className="text-xs font-bold text-yellow-400 hover:underline pt-2 block mx-auto cursor-pointer"
                  >
                    Fazer nova solicitação
                  </button>
                </div>
              ) : (
                <form onSubmit={handleLeadSubmit} className="relative z-10 space-y-3 pt-1">
                  <div>
                    <label className="text-[11px] font-bold text-slate-300 block mb-1">
                      Nome Completo
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Ex: Carlos Eduardo"
                      value={leadName}
                      onChange={(e) => setLeadName(e.target.value)}
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
                      value={leadPhone}
                      onChange={(e) => setLeadPhone(e.target.value)}
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
                      value={leadEmail}
                      onChange={(e) => setLeadEmail(e.target.value)}
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
                    <span>{isSending ? 'Enviando...' : 'Falar com Consultor'}</span>
                    <Send className="w-4 h-4" />
                  </button>
                </form>
              )}

              {/* Quality Bullets */}
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

            {/* Outras Leituras Recomendadas (Carousel on mobile, list in sidebar on desktop) */}
            {relatedArticles.length > 0 && (
              <div className="bg-white border border-slate-200 rounded-2xl sm:rounded-3xl p-4 sm:p-6 shadow-sm space-y-4 overflow-hidden">
                <div className="flex items-center justify-between">
                  <h4 className="text-sm sm:text-base font-bold text-slate-900 flex items-center gap-2">
                    <TrendingUp className="w-4 h-4 text-yellow-600" />
                    <span>Outras Leituras Recomendadas</span>
                  </h4>
                  <span className="lg:hidden text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                    Deslize →
                  </span>
                </div>

                {/* Cards: Horizontal swipe carousel on mobile with peek preview, vertical stacked on desktop sidebar */}
                <div className="flex lg:block lg:space-y-3 gap-3.5 overflow-x-auto lg:overflow-x-visible pb-3 lg:pb-0 -mx-4 px-[8.333%] lg:mx-0 lg:px-0 snap-x snap-mandatory scrollbar-none">
                  {relatedArticles.map((rel) => (
                    <div
                      key={rel.id}
                      onClick={() => onSelectArticle(rel)}
                      className="w-[76vw] min-w-[76vw] max-w-[280px] xs:w-[270px] xs:min-w-[270px] lg:w-auto lg:min-w-0 lg:max-w-none snap-center lg:snap-start shrink-0 lg:shrink group p-4 rounded-2xl bg-slate-50 border border-slate-200/80 hover:border-yellow-400 transition-all cursor-pointer flex flex-col justify-between shadow-xs"
                    >
                      <div className="space-y-2">
                        <div className="flex items-center justify-between gap-2">
                          <span className="bg-yellow-400 text-slate-950 font-extrabold text-[9px] uppercase px-2 py-0.5 rounded-full inline-block">
                            {wixBlogCategoryLabel(rel) || rel.category}
                          </span>
                          <span className="text-[10px] text-slate-400 font-medium">{rel.date}</span>
                        </div>

                        <h5 className="text-xs sm:text-xs font-bold text-slate-900 group-hover:text-yellow-700 transition-colors line-clamp-2 leading-snug">
                          {rel.title}
                        </h5>

                        <p className="text-[11px] text-slate-500 line-clamp-2 leading-relaxed">
                          {rel.summary}
                        </p>
                      </div>

                      <div className="pt-3 mt-2 border-t border-slate-100 flex items-center justify-end text-[11px] font-bold text-yellow-700 group-hover:underline">
                        <span>Ler artigo →</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

          </aside>
        </div>
      </div>
    </div>
  );
};

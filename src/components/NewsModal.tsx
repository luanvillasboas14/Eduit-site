import React from 'react';
import { NewsArticle } from '../types';
import { X, Calendar, Clock, Share2, ArrowRight } from 'lucide-react';

interface NewsModalProps {
  article: NewsArticle | null;
  onClose: () => void;
  onOpenConsultant: () => void;
}

export const NewsModal: React.FC<NewsModalProps> = ({
  article,
  onClose,
  onOpenConsultant,
}) => {
  if (!article) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md overflow-y-auto animate-fadeIn">
      <div className="bg-[#0b1329] border border-slate-800 rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl relative my-8 p-6 sm:p-8 space-y-6">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-slate-900 border border-slate-800 text-slate-400 hover:text-white flex items-center justify-center transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Article Badge & Category */}
        <div className="flex flex-wrap items-center gap-3">
          <span className="bg-yellow-400 text-slate-950 font-bold text-[10px] uppercase px-3 py-1 rounded-full">
            {article.badge}
          </span>
          <span className="bg-slate-900 border border-slate-700 text-slate-300 text-[10px] font-semibold uppercase px-2.5 py-0.5 rounded-md">
            {article.category}
          </span>
          <div className="flex items-center gap-3 text-xs text-slate-400">
            <span className="flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5 text-yellow-400" />
              {article.date}
            </span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 text-yellow-400" />
              {article.readTime}
            </span>
          </div>
        </div>

        {/* Article Title */}
        <h2 className="text-2xl sm:text-3xl font-extrabold text-white leading-tight">
          {article.title}
        </h2>

        {/* Author Card if present */}
        {article.author && (
          <div className="flex items-center gap-3 p-3 bg-slate-900/90 border border-slate-800 rounded-xl">
            {article.author.avatar && (
              <img
                src={article.author.avatar}
                alt={article.author.name}
                className="w-10 h-10 rounded-full object-cover border border-slate-700"
              />
            )}
            <div>
              <span className="text-xs font-bold text-white block">
                {article.author.name}
              </span>
              <span className="text-[11px] text-slate-400">
                {article.author.role}
              </span>
            </div>
          </div>
        )}

        {/* Optional Image */}
        {article.image && (
          <div className="rounded-2xl overflow-hidden h-64 sm:h-72 border border-slate-800">
            <img
              src={article.image}
              alt={article.title}
              className="w-full h-full object-cover"
            />
          </div>
        )}

        {/* Article Content */}
        <div className="text-xs sm:text-sm text-slate-300 space-y-4 leading-relaxed whitespace-pre-line">
          {article.content}
        </div>

        {/* Tags */}
        {article.tags && article.tags.length > 0 && (
          <div className="flex flex-wrap items-center gap-1.5 pt-2">
            <span className="text-xs text-slate-400 mr-1">Tags:</span>
            {article.tags.map((tag) => (
              <span
                key={tag}
                className="text-[10px] bg-slate-900 border border-slate-800 text-slate-300 px-2 py-0.5 rounded-md"
              >
                #{tag}
              </span>
            ))}
          </div>
        )}

        {/* Footer actions */}
        <div className="pt-6 border-t border-slate-800 flex items-center justify-between">
          <button
            onClick={() => {
              if (navigator.share) {
                navigator.share({ title: article.title, url: window.location.href });
              } else {
                navigator.clipboard.writeText(window.location.href);
                alert('Link copiado para a área de transferência!');
              }
            }}
            className="text-xs text-slate-400 hover:text-yellow-400 flex items-center gap-1.5"
          >
            <Share2 className="w-4 h-4" />
            <span>Compartilhar</span>
          </button>

          <button
            onClick={() => {
              onClose();
              onOpenConsultant();
            }}
            className="bg-yellow-400 hover:bg-yellow-300 text-slate-950 font-bold px-5 py-2.5 rounded-full text-xs flex items-center gap-1.5"
          >
            <span>Falar com Consultor</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

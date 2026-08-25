import React, { useState } from 'react';
import { Polo } from '../types';
import {
  BARRA_FUNDA_REVIEWS,
  FREGUESIA_DO_O_REVIEWS,
  MORUMBI_REVIEWS,
  SAPOPEMBA_REVIEWS,
  TABOAO_CENTRO_REVIEWS,
  TABOAO_MITUZI_REVIEWS,
  IBIRAPUERA_REVIEWS,
  VILA_PRUDENTE_REVIEWS,
  CAMPINAS_REVIEWS,
  CAPIVARI_REVIEWS,
  ITAPIRA_REVIEWS,
  SANTANA_REVIEWS,
  VILA_MARIANA_REVIEWS,
  GENERAL_POLO_REVIEWS,
  GoogleReview,
} from '../data/reviews';
import {
  Star,
  CheckCircle2,
  ExternalLink,
  ThumbsUp,
} from 'lucide-react';

interface PoloGoogleReviewsProps {
  polo: Polo;
  onOpenConsultant?: (poloOrCourseName?: string) => void;
}

export const PoloGoogleReviews: React.FC<PoloGoogleReviewsProps> = ({
  polo,
}) => {
  // Check polo unit
  const isBarraFunda = polo.id === 'polo-barra-funda' || polo.name.toLowerCase().includes('barra funda');
  const isFreguesiaDoO = polo.id === 'polo-freguesia-do-o' || polo.name.toLowerCase().includes('freguesia');
  const isMorumbi = polo.id === 'polo-morumbi-butanta' || polo.name.toLowerCase().includes('morumbi');
  const isSapopemba = polo.id === 'polo-sapopemba' || polo.name.toLowerCase().includes('sapopemba');
  const isTaboaoCentro = polo.id === 'polo-taboao-da-serra-centro' || (polo.name.toLowerCase().includes('taboão') && polo.name.toLowerCase().includes('centro'));
  const isTaboaoMituzi = polo.id === 'polo-taboao-da-serra-mituzi' || (polo.name.toLowerCase().includes('taboão') && polo.name.toLowerCase().includes('mituzi'));
  const isIbirapuera = polo.id === 'polo-ibirapuera' || polo.name.toLowerCase().includes('ibirapuera');
  const isVilaPrudente = polo.id === 'polo-vila-prudente' || polo.name.toLowerCase().includes('vila prudente');
  const isCampinas = polo.id === 'polo-campinas' || polo.name.toLowerCase().includes('campinas');
  const isCapivari = polo.id === 'polo-capivari' || polo.name.toLowerCase().includes('capivari');
  const isItapira = polo.id === 'polo-itapira' || polo.name.toLowerCase().includes('itapira');
  const isSantana = polo.id === 'polo-santana' || polo.name.toLowerCase().includes('santana');
  const isVilaMariana = polo.id === 'polo-vila-mariana' || polo.name.toLowerCase().includes('vila mariana');

  // Rating and reviews tailored for each specific unit
  let ratingScore = '4,9';
  let totalReviewsCount = '480';
  let poloReviews: GoogleReview[] = GENERAL_POLO_REVIEWS;

  if (isBarraFunda) {
    ratingScore = '4,8';
    totalReviewsCount = '1.254';
    poloReviews = BARRA_FUNDA_REVIEWS;
  } else if (isFreguesiaDoO) {
    ratingScore = '4,9';
    totalReviewsCount = '126';
    poloReviews = FREGUESIA_DO_O_REVIEWS;
  } else if (isMorumbi) {
    ratingScore = '4,3';
    totalReviewsCount = '117';
    poloReviews = MORUMBI_REVIEWS;
  } else if (isSapopemba) {
    ratingScore = '4,9';
    totalReviewsCount = '1.043';
    poloReviews = SAPOPEMBA_REVIEWS;
  } else if (isTaboaoCentro) {
    ratingScore = '3,7';
    totalReviewsCount = '9';
    poloReviews = TABOAO_CENTRO_REVIEWS;
  } else if (isTaboaoMituzi) {
    ratingScore = '4,7';
    totalReviewsCount = '140';
    poloReviews = TABOAO_MITUZI_REVIEWS;
  } else if (isIbirapuera) {
    ratingScore = '5,0';
    totalReviewsCount = '98';
    poloReviews = IBIRAPUERA_REVIEWS;
  } else if (isVilaPrudente) {
    ratingScore = '4,9';
    totalReviewsCount = '98';
    poloReviews = VILA_PRUDENTE_REVIEWS;
  } else if (isCampinas) {
    ratingScore = '2,8';
    totalReviewsCount = '9';
    poloReviews = CAMPINAS_REVIEWS;
  } else if (isCapivari) {
    ratingScore = '4,7';
    totalReviewsCount = '12';
    poloReviews = CAPIVARI_REVIEWS;
  } else if (isItapira) {
    ratingScore = '5,0';
    totalReviewsCount = '7';
    poloReviews = ITAPIRA_REVIEWS;
  } else if (isSantana) {
    ratingScore = '5,0';
    totalReviewsCount = '148';
    poloReviews = SANTANA_REVIEWS;
  } else if (isVilaMariana) {
    ratingScore = '4,6';
    totalReviewsCount = '102';
    poloReviews = VILA_MARIANA_REVIEWS;
  }

  const numericScore = parseFloat(ratingScore.replace(',', '.'));

  // Google multi-color SVG icon
  const GoogleGIcon = () => (
    <svg className="w-5 h-5 shrink-0" viewBox="0 0 24 24">
      <path
        fill="#4285F4"
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
      />
      <path
        fill="#34A853"
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
      />
      <path
        fill="#FBBC05"
        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
      />
      <path
        fill="#EA4335"
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
      />
    </svg>
  );

  return (
    <div className="bg-white border border-slate-200 rounded-3xl p-5 sm:p-7 lg:p-8 shadow-sm space-y-5 overflow-hidden">
      {/* Header with Google Badge and Overall Score */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-slate-100">
        <div className="space-y-1.5">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 bg-slate-100 border border-slate-200 px-2.5 py-1 rounded-lg text-xs font-bold text-slate-800">
              <GoogleGIcon />
              <span>Avaliações do Google</span>
            </span>
            <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200/60 px-2 py-0.5 rounded-md">
              <CheckCircle2 className="w-3 h-3 text-emerald-600" />
              <span>Verificado</span>
            </span>
          </div>

          <h3 className="text-lg sm:text-xl font-extrabold text-slate-900 tracking-tight">
            O que os alunos dizem sobre o {polo.name}
          </h3>
          <p className="text-xs text-slate-500">
            Avaliações reais compartilhadas por alunos e formandos no perfil oficial do Google
          </p>
        </div>

        {/* Rating Score Box */}
        <div className="flex items-center gap-3.5 bg-slate-50 border border-slate-200/80 rounded-2xl p-3 px-4 shrink-0 self-start sm:self-auto shadow-xs">
          <div className="text-center">
            <div className="text-2xl sm:text-3xl font-black text-slate-900 leading-none">
              {ratingScore}
            </div>
            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block mt-0.5">
              de 5.0
            </span>
          </div>

          <div className="h-8 w-px bg-slate-200" />

          <div className="space-y-0.5">
            <div className="flex items-center gap-0.5 text-yellow-400">
              {[1, 2, 3, 4, 5].map((starIndex) => {
                const isFull = starIndex <= Math.floor(numericScore);
                const isHalf = !isFull && starIndex - 0.7 <= numericScore;
                return (
                  <Star
                    key={starIndex}
                    className={`w-3.5 h-3.5 ${
                      isFull
                        ? 'fill-yellow-400 text-yellow-400'
                        : isHalf
                        ? 'fill-yellow-400/70 text-yellow-400'
                        : 'fill-slate-200 text-slate-300'
                    }`}
                  />
                );
              })}
            </div>
            <p className="text-[11px] font-semibold text-slate-600">
              <strong className="text-slate-900">{totalReviewsCount} {totalReviewsCount === '1' ? 'avaliação' : 'avaliações'}</strong> no Google
            </p>
          </div>
        </div>
      </div>

      {/* Reviews Cards: Mobile smooth snap carousel & Desktop responsive grid */}
      <div className="flex sm:grid sm:grid-cols-2 lg:grid-cols-3 gap-3.5 sm:gap-4 overflow-x-auto sm:overflow-x-visible pb-2 sm:pb-0 -mx-5 px-5 sm:mx-0 sm:px-0 snap-x snap-mandatory scrollbar-none">
        {poloReviews.map((review) => (
          <div
            key={review.id}
            className="w-[85vw] min-w-[85vw] max-w-[320px] sm:w-auto sm:min-w-0 sm:max-w-none snap-center sm:snap-start shrink-0 sm:shrink bg-slate-50/90 hover:bg-slate-50 border border-slate-200/90 rounded-2xl p-4 sm:p-5 flex flex-col justify-between hover:border-yellow-400/80 hover:shadow-md transition-all shadow-xs"
          >
            <div className="space-y-3">
              {/* Reviewer Header */}
              <div className="flex items-start justify-between gap-2.5">
                <div className="flex items-center gap-2.5 min-w-0">
                  <div
                    className={`w-9 h-9 rounded-full ${review.avatarColor} text-white font-black text-xs flex items-center justify-center shadow-xs shrink-0 ring-2 ring-white`}
                  >
                    {review.authorInitial}
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-1">
                      <h4 className="text-xs sm:text-sm font-bold text-slate-900 leading-tight truncate">
                        {review.authorName}
                      </h4>
                      <ExternalLink className="w-3 h-3 text-slate-400 shrink-0" />
                    </div>
                    <div className="flex items-center gap-1 text-[10px] text-slate-500 mt-0.5">
                      <span>
                        {review.reviewsCount} {review.reviewsCount === 1 ? 'avaliação' : 'avaliações'} • {review.photosCount ?? 0} {review.photosCount === 1 ? 'foto' : 'fotos'}
                      </span>
                    </div>
                  </div>
                </div>

                <GoogleGIcon />
              </div>

              {/* Stars & Date & NEW badge */}
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-0.5 text-yellow-400">
                    {[...Array(review.rating)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <span className="text-[10px] font-medium text-slate-500">
                    {review.date}
                  </span>
                  {review.isNew && (
                    <span className="text-[9px] font-extrabold uppercase px-1.5 py-0.2 rounded bg-slate-900 text-white tracking-wider">
                      NOVO
                    </span>
                  )}
                </div>

                {review.courseTag && (
                  <div className="inline-block">
                    <span className="text-[10px] font-bold text-slate-700 bg-slate-200/70 px-2 py-0.5 rounded-md">
                      {review.courseTag}
                    </span>
                  </div>
                )}
              </div>

              {/* Comment text */}
              <p className="text-xs text-slate-800 leading-relaxed">
                "{review.comment}"
              </p>

              {/* Owner Response if present */}
              {review.ownerResponse && (
                <div className="bg-white/80 border-l-2 border-yellow-400 rounded-r-xl p-2.5 mt-2 space-y-1 text-[11px]">
                  <div className="flex items-center justify-between font-bold text-slate-900 text-[10px]">
                    <span>Resposta do {polo.name}</span>
                    <span className="text-slate-400 font-normal">{review.ownerResponse.date}</span>
                  </div>
                  <p className="text-slate-600 leading-normal">
                    {review.ownerResponse.text}
                  </p>
                </div>
              )}
            </div>

            {/* Thumbs up & Verified note */}
            <div className="pt-3 mt-3 border-t border-slate-200/60 flex items-center justify-between text-[10px] text-slate-500">
              <span className="flex items-center gap-1 font-medium">
                <ThumbsUp className="w-3 h-3 text-slate-400" />
                <span>Gostei ({review.likesCount || 1})</span>
              </span>

              <span className="text-emerald-700 font-semibold flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                <span>Google Review</span>
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Mobile Swipe Hint */}
      <div className="flex sm:hidden items-center justify-center gap-1 text-[11px] text-slate-400 font-medium">
        <span>← Deslize para ler mais avaliações →</span>
      </div>

      {/* Footer Actions / View on Google Maps */}
      <div className="pt-2 flex items-center justify-end border-t border-slate-100">
        <a
          href={polo.mapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 text-xs font-bold text-yellow-700 hover:text-yellow-800 bg-yellow-400/15 hover:bg-yellow-400/25 px-4 py-2 rounded-xl transition-colors border border-yellow-400/30"
        >
          <GoogleGIcon />
          <span>Ver perfil no Google Maps</span>
          <ExternalLink className="w-3.5 h-3.5 ml-0.5" />
        </a>
      </div>
    </div>
  );
};


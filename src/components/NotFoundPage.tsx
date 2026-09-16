import React from 'react';
import { Link } from 'react-router-dom';
import { PATHS } from '../data/siteUrls';
import { seoForNotFound } from '../lib/seo';
import { Seo } from './Seo';

export const NotFoundPage: React.FC = () => {
  const seo = seoForNotFound();
  return (
    <div className="bg-slate-100 min-h-[60vh] flex items-center justify-center px-4 py-16">
      <Seo {...seo} />
      <div className="max-w-lg text-center space-y-4">
        <p className="text-yellow-600 font-extrabold text-sm tracking-widest">404</p>
        <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Página não encontrada</h1>
        <p className="text-sm text-slate-600 leading-relaxed">
          O endereço pode ter mudado ou não existe. Escolha um destino abaixo para continuar.
        </p>
        <div className="flex flex-wrap justify-center gap-3 pt-2">
          <Link
            to={PATHS.home}
            className="bg-yellow-400 hover:bg-yellow-300 text-slate-950 font-bold px-5 py-2.5 rounded-xl text-xs"
          >
            Início
          </Link>
          <Link
            to={PATHS.graduacao}
            className="bg-white border border-slate-200 hover:border-yellow-400 text-slate-800 font-bold px-5 py-2.5 rounded-xl text-xs"
          >
            Graduação
          </Link>
          <Link
            to={PATHS.posGraduacao}
            className="bg-white border border-slate-200 hover:border-yellow-400 text-slate-800 font-bold px-5 py-2.5 rounded-xl text-xs"
          >
            Pós-graduação
          </Link>
          <Link
            to={PATHS.blog}
            className="bg-white border border-slate-200 hover:border-yellow-400 text-slate-800 font-bold px-5 py-2.5 rounded-xl text-xs"
          >
            Notícias
          </Link>
        </div>
      </div>
    </div>
  );
};

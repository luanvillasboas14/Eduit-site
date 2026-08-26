import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Search, Menu, X, GraduationCap, ChevronRight, Home, Newspaper, Award } from 'lucide-react';
import logoImg from './Component 5 (2).png';
import { PATHS, navPageFromPath } from '../data/siteUrls';

interface HeaderProps {
  onOpenConsultant: () => void;
  onSearch?: (query: string) => void;
  searchQuery?: string;
}

export const Header: React.FC<HeaderProps> = ({
  onOpenConsultant,
  onSearch,
  searchQuery = '',
}) => {
  const { pathname } = useLocation();
  const currentPage = navPageFromPath(pathname);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState(searchQuery);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSearch) {
      onSearch(searchTerm);
    }
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setSearchTerm(val);
    if (onSearch) {
      onSearch(val);
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-[#070d19]/90 backdrop-blur-md border-b border-slate-800/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link
            to={PATHS.home}
            className="flex items-center cursor-pointer group py-1"
          >
            <img
              src={logoImg}
              alt="Cruzeiro do Sul Virtual"
              className="h-10 sm:h-12 w-auto max-w-[200px] sm:max-w-[240px] object-contain group-hover:scale-105 transition-transform duration-200"
            />
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-6 lg:gap-8 text-sm font-medium text-slate-300">
            <Link
              to={PATHS.home}
              className={`hover:text-yellow-400 transition-colors py-1 flex items-center gap-1.5 cursor-pointer ${
                currentPage === 'home' ? 'text-yellow-400 font-bold border-b-2 border-yellow-400' : ''
              }`}
            >
              <Home className="w-4 h-4" />
              <span>Início</span>
            </Link>

            <Link
              to={PATHS.graduacao}
              className={`hover:text-yellow-400 transition-colors py-1 flex items-center gap-1.5 cursor-pointer ${
                currentPage === 'courses' ? 'text-yellow-400 font-bold border-b-2 border-yellow-400' : ''
              }`}
            >
              <GraduationCap className="w-4 h-4" />
              <span>Graduação</span>
            </Link>

            <Link
              to={PATHS.posGraduacao}
              className={`hover:text-yellow-400 transition-colors py-1 flex items-center gap-1.5 cursor-pointer ${
                currentPage === 'pos-graduacao' ? 'text-yellow-400 font-bold border-b-2 border-yellow-400' : ''
              }`}
            >
              <Award className="w-4 h-4" />
              <span>Pós-graduação</span>
            </Link>

            <Link
              to={PATHS.blog}
              className={`hover:text-yellow-400 transition-colors py-1 flex items-center gap-1.5 cursor-pointer ${
                currentPage === 'news' ? 'text-yellow-400 font-bold border-b-2 border-yellow-400' : ''
              }`}
            >
              <Newspaper className="w-4 h-4" />
              <span>Notícias</span>
            </Link>
          </nav>

          {/* Right Search Bar & CTA */}
          <div className="hidden lg:flex items-center gap-4">
            <form onSubmit={handleSearchSubmit} className="relative">
              <input
                type="text"
                placeholder="Buscar curso..."
                value={searchTerm}
                onChange={handleSearchChange}
                className="bg-slate-900/90 border border-slate-700/80 rounded-full pl-9 pr-4 py-2 text-xs text-slate-200 placeholder-slate-400 focus:outline-none focus:border-yellow-400/80 focus:ring-1 focus:ring-yellow-400/40 w-40 lg:w-48 transition-all"
              />
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            </form>

            <button
              onClick={onOpenConsultant}
              className="bg-yellow-400 hover:bg-yellow-300 text-slate-950 font-semibold px-5 py-2.5 rounded-full text-xs transition-all shadow-md shadow-yellow-400/20 hover:shadow-yellow-400/30 flex items-center gap-1.5 active:scale-95 cursor-pointer shrink-0"
            >
              Fale Conosco
            </button>
          </div>

          {/* Mobile menu trigger */}
          <div className="flex md:hidden items-center gap-3">
            <button
              onClick={onOpenConsultant}
              className="bg-yellow-400 text-slate-950 font-semibold px-3.5 py-1.5 rounded-full text-xs"
            >
              Falar
            </button>
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 text-slate-400 hover:text-white focus:outline-none"
              aria-label="Toggle Menu"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-[#0b1329] border-b border-slate-800 px-4 pt-3 pb-6 space-y-3 animate-fadeIn">
          {/* Mobile Search Bar */}
          <form 
            onSubmit={(e) => {
              handleSearchSubmit(e);
              setIsMobileMenuOpen(false);
            }} 
            className="relative mb-2"
          >
            <input
              type="text"
              placeholder="Buscar curso..."
              value={searchTerm}
              onChange={handleSearchChange}
              className="w-full bg-slate-900 border border-slate-700 rounded-full pl-9 pr-4 py-2.5 text-xs text-slate-200 placeholder-slate-400 focus:outline-none focus:border-yellow-400"
            />
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          </form>

          <Link
            to={PATHS.home}
            onClick={() => setIsMobileMenuOpen(false)}
            className="w-full text-left py-2.5 px-3 text-sm text-slate-200 hover:bg-slate-800/60 rounded-lg flex items-center justify-between"
          >
            <span className="flex items-center gap-2">
              <Home className="w-4 h-4 text-yellow-400" />
              <span>Início</span>
            </span>
            <ChevronRight className="w-4 h-4 text-slate-500" />
          </Link>

          <Link
            to={PATHS.graduacao}
            onClick={() => setIsMobileMenuOpen(false)}
            className={`w-full text-left py-2.5 px-3 text-sm rounded-lg flex items-center justify-between transition-colors ${
              currentPage === 'courses'
                ? 'bg-yellow-400/10 text-yellow-400 font-bold border border-yellow-400/20'
                : 'text-slate-200 hover:bg-slate-800/60'
            }`}
          >
            <span className="flex items-center gap-2">
              <GraduationCap className="w-4 h-4 text-yellow-400" />
              <span>Graduação</span>
            </span>
            <ChevronRight className="w-4 h-4 text-slate-500" />
          </Link>

          <Link
            to={PATHS.posGraduacao}
            onClick={() => setIsMobileMenuOpen(false)}
            className={`w-full text-left py-2.5 px-3 text-sm rounded-lg flex items-center justify-between transition-colors ${
              currentPage === 'pos-graduacao'
                ? 'bg-yellow-400/10 text-yellow-400 font-bold border border-yellow-400/20'
                : 'text-slate-200 hover:bg-slate-800/60'
            }`}
          >
            <span className="flex items-center gap-2">
              <Award className="w-4 h-4 text-yellow-400" />
              <span>Pós-graduação</span>
            </span>
            <ChevronRight className="w-4 h-4 text-slate-500" />
          </Link>

          <Link
            to={PATHS.blog}
            onClick={() => setIsMobileMenuOpen(false)}
            className={`w-full text-left py-2.5 px-3 text-sm rounded-lg flex items-center justify-between transition-colors ${
              currentPage === 'news'
                ? 'bg-yellow-400/10 text-yellow-400 font-bold border border-yellow-400/20'
                : 'text-slate-200 hover:bg-slate-800/60'
            }`}
          >
            <span className="flex items-center gap-2">
              <Newspaper className="w-4 h-4 text-yellow-400" />
              <span>Notícias & Blog</span>
            </span>
            <ChevronRight className="w-4 h-4 text-slate-500" />
          </Link>

          <div className="pt-3 border-t border-slate-800 flex flex-col gap-3">
            <button
              onClick={() => {
                setIsMobileMenuOpen(false);
                onOpenConsultant();
              }}
              className="w-full bg-yellow-400 text-slate-950 font-bold py-3 rounded-full text-sm text-center"
            >
              Falar com um Consultor
            </button>
          </div>
        </div>
      )}
    </header>
  );
};


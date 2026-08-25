import React from 'react';
import {
  Instagram,
  Facebook,
  Phone,
  GraduationCap,
  Award,
  MapPin,
  Newspaper,
  Home,
  Headphones
} from 'lucide-react';
import logoImg from './Component 5 (2).png';

interface FooterProps {
  onOpenConsultant: () => void;
  onNavigate?: (page: 'home' | 'courses' | 'pos-graduacao' | 'polos' | 'news') => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenConsultant, onNavigate }) => {
  const navigateTo = (page: 'home' | 'courses' | 'pos-graduacao' | 'polos' | 'news') => {
    if (onNavigate) {
      onNavigate(page);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-[#040811] text-slate-400 py-4 sm:py-5 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Section: Brand & Social */}
        <div className="flex items-center justify-between gap-3 pb-3 border-b border-slate-800/80">
          <div className="flex items-center gap-3">
            <img
              src={logoImg}
              alt="Cruzeiro do Sul Virtual"
              className="h-7 sm:h-8 w-auto max-w-[170px] object-contain cursor-pointer"
              onClick={() => navigateTo('home')}
            />
          </div>

          <div className="flex items-center gap-2">
            <a
              href="#"
              aria-label="Instagram da Cruzeiro do Sul Virtual"
              className="w-7 h-7 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 hover:text-yellow-400 hover:border-yellow-400 transition-colors"
            >
              <Instagram className="w-3.5 h-3.5" />
            </a>
            <a
              href="#"
              aria-label="Facebook da Cruzeiro do Sul Virtual"
              className="w-7 h-7 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 hover:text-yellow-400 hover:border-yellow-400 transition-colors"
            >
              <Facebook className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

        {/* Middle Section: Mini Mapa do Site + Telefones Comercial & Acadêmico */}
        <div className="py-3 grid grid-cols-1 md:grid-cols-12 gap-3 sm:gap-4 text-xs items-center">
          
          {/* Mini Mapa do Site (Apenas páginas do menu - Oculto no Mobile) */}
          <div className="hidden md:block md:col-span-5 space-y-1.5">
            <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
              Mapa do Site
            </h4>
            <ul className="flex flex-wrap gap-x-4 gap-y-1 text-slate-300 font-medium text-xs">
              <li>
                <button
                  onClick={() => navigateTo('home')}
                  className="flex items-center gap-1.5 hover:text-yellow-400 transition-colors cursor-pointer group"
                >
                  <Home className="w-3 h-3 text-yellow-400/80 group-hover:text-yellow-400 shrink-0" />
                  <span>Início</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('courses')}
                  className="flex items-center gap-1.5 hover:text-yellow-400 transition-colors cursor-pointer group"
                >
                  <GraduationCap className="w-3 h-3 text-yellow-400/80 group-hover:text-yellow-400 shrink-0" />
                  <span>Graduação</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('pos-graduacao')}
                  className="flex items-center gap-1.5 hover:text-yellow-400 transition-colors cursor-pointer group"
                >
                  <Award className="w-3 h-3 text-yellow-400/80 group-hover:text-yellow-400 shrink-0" />
                  <span>Pós-graduação</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('polos')}
                  className="flex items-center gap-1.5 hover:text-yellow-400 transition-colors cursor-pointer group"
                >
                  <MapPin className="w-3 h-3 text-yellow-400/80 group-hover:text-yellow-400 shrink-0" />
                  <span>Polos EAD</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('news')}
                  className="flex items-center gap-1.5 hover:text-yellow-400 transition-colors cursor-pointer group"
                >
                  <Newspaper className="w-3 h-3 text-yellow-400/80 group-hover:text-yellow-400 shrink-0" />
                  <span>Notícias</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Telefones de Atendimento: Comercial + Acadêmico */}
          <div className="w-full md:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            
            {/* Canal Comercial */}
            <a
              href="https://wa.cruzeiroead.com.br/tronco"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-slate-900/90 border border-slate-800 hover:border-yellow-500/50 rounded-xl px-3.5 py-2 flex items-center justify-between gap-3 transition-colors group cursor-pointer"
            >
              <div className="flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-yellow-400/20 flex items-center justify-center shrink-0">
                  <Phone className="w-3 h-3 text-yellow-400 shrink-0" />
                </span>
                <span className="text-[11px] uppercase tracking-wider text-slate-300 font-bold group-hover:text-yellow-400 transition-colors">Comercial</span>
              </div>
              <span className="text-xs sm:text-sm font-extrabold text-white group-hover:text-yellow-400 transition-colors">
                11 91747-9873
              </span>
            </a>

            {/* Canal Acadêmico */}
            <a
              href="https://wa.cruzeiroead.com.br/Atendimento"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-slate-900/90 border border-slate-800 hover:border-[#25D366]/50 rounded-xl px-3.5 py-2 flex items-center justify-between gap-3 transition-colors group cursor-pointer"
            >
              <div className="flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-[#25D366]/20 flex items-center justify-center shrink-0">
                  <svg className="w-3 h-3 text-[#25D366] fill-current" viewBox="0 0 24 24">
                    <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.983zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
                  </svg>
                </span>
                <span className="text-[11px] uppercase tracking-wider text-slate-300 font-bold truncate group-hover:text-[#25D366] transition-colors">Acadêmico (Alunos)</span>
              </div>
              <span className="text-xs sm:text-sm font-extrabold text-white group-hover:text-[#25D366] transition-colors">
                Atendimento
              </span>
            </a>

          </div>

        </div>

        {/* Bottom Legal */}
        <div className="pt-2.5 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-2 text-[10px] text-slate-500">
          <p>© 2026 Cruzeiro do Sul Virtual — CNPJ 60.748.387/0001-35</p>
          <div className="flex items-center gap-3">
            <a href="#" className="hover:text-slate-300">Privacidade</a>
            <a href="#" className="hover:text-slate-300">Termos de Uso</a>
            <a href="#" className="hover:text-slate-300">Acessibilidade</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

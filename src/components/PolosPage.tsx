import React, { useState, useMemo } from 'react';
import { POLOS_DATA } from '../data/polos';
import { Polo } from '../types';
import {
  MapPin,
  Search,
  ExternalLink,
  Phone,
  MessageCircle,
  Clock,
  Navigation,
  Building2,
  CheckCircle2,
  Layers,
  ChevronRight,
  Filter,
  GraduationCap
} from 'lucide-react';

interface PolosPageProps {
  onOpenConsultant: (poloName?: string) => void;
  onNavigateGraduation?: () => void;
  onSelectPolo?: (polo: Polo) => void;
}

export const PolosPage: React.FC<PolosPageProps> = ({
  onOpenConsultant,
  onNavigateGraduation,
  onSelectPolo,
}) => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activePolo, setActivePolo] = useState<Polo | null>(POLOS_DATA[0]);

  // Filtered Polos based on search query
  const filteredPolos = useMemo(() => {
    const query = searchQuery.toLowerCase().trim();
    if (!query) return POLOS_DATA;

    return POLOS_DATA.filter((polo) => {
      return (
        polo.name.toLowerCase().includes(query) ||
        polo.city.toLowerCase().includes(query) ||
        polo.neighborhood.toLowerCase().includes(query) ||
        polo.address.toLowerCase().includes(query) ||
        polo.state.toLowerCase().includes(query)
      );
    });
  }, [searchQuery]);

  const clearFilters = () => {
    setSearchQuery('');
  };

  return (
    <div className="bg-slate-100 min-h-screen pt-4 sm:pt-8 pb-24 overflow-x-hidden w-full">
      {/* Search & Highlights Unified Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
        <div className="bg-[#0b1329] border border-slate-800 rounded-3xl p-5 sm:p-7 text-white shadow-xl space-y-5">
          {/* Header & Title */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-slate-900 border border-yellow-500/40 text-yellow-400 text-[10px] sm:text-xs font-semibold mb-1.5 shadow-sm">
                <MapPin className="w-3 h-3" />
                <span>REDE DE POLOS CREDENCIADOS</span>
              </div>
              <h1 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-white tracking-tight">
                Encontre o Polo EAD mais próximo
              </h1>
            </div>
            <div className="text-xs text-slate-400 hidden sm:block text-right">
              <span className="block text-yellow-400 font-bold">Nota Máxima no MEC</span>
              <span>Suporte e infraestrutura de ponta</span>
            </div>
          </div>

          {/* Search Bar Input */}
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Buscar por nome do polo, endereço, bairro, cidade ou estado..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-900/90 border border-slate-700/80 rounded-2xl pl-10 pr-20 py-3.5 text-xs sm:text-sm text-white placeholder-slate-400 focus:outline-none focus:border-yellow-400 transition-colors shadow-inner"
            />
            {searchQuery && (
              <button
                onClick={clearFilters}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-400 hover:text-yellow-400 transition-colors bg-slate-800 hover:bg-slate-700 px-2.5 py-1 rounded-lg cursor-pointer"
              >
                Limpar
              </button>
            )}
          </div>

          {/* Info Highlights / Features inside the same container (Oculto em mobile) */}
          <div className="hidden sm:grid sm:grid-cols-3 gap-3 pt-2 border-t border-slate-800/80">
            <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-3.5 sm:p-4 flex items-start gap-3">
              <div className="w-9 h-9 rounded-xl bg-yellow-400/20 text-yellow-400 flex items-center justify-center shrink-0">
                <CheckCircle2 className="w-4 h-4" />
              </div>
              <div className="space-y-0.5">
                <h3 className="text-xs sm:text-sm font-bold text-white">
                  Atendimento Especializado
                </h3>
                <p className="text-[11px] text-slate-300 leading-relaxed">
                  Equipe de consultores educacionais pronta para auxiliar em matrículas e dúvidas.
                </p>
              </div>
            </div>

            <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-3.5 sm:p-4 flex items-start gap-3">
              <div className="w-9 h-9 rounded-xl bg-yellow-400/20 text-yellow-400 flex items-center justify-center shrink-0">
                <MapPin className="w-4 h-4" />
              </div>
              <div className="space-y-0.5">
                <h3 className="text-xs sm:text-sm font-bold text-white">
                  Polos Perto de Você
                </h3>
                <p className="text-[11px] text-slate-300 leading-relaxed">
                  Unidades estrategicamente localizadas para garantir fácil acesso e comodidade.
                </p>
              </div>
            </div>

            <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-3.5 sm:p-4 flex items-start gap-3">
              <div className="w-9 h-9 rounded-xl bg-yellow-400/20 text-yellow-400 flex items-center justify-center shrink-0">
                <Building2 className="w-4 h-4" />
              </div>
              <div className="space-y-0.5">
                <h3 className="text-xs sm:text-sm font-bold text-white">
                  Infraestrutura Completa
                </h3>
                <p className="text-[11px] text-slate-300 leading-relaxed">
                  Ambientes preparados com computadores e suporte para seu estudo presencial e online.
                </p>
              </div>
            </div>
          </div>

          {/* Results count bar */}
          <div className="flex items-center justify-between pt-1 border-t border-slate-800/80 text-xs text-slate-400">
            <span>
              Mostrando <strong className="text-yellow-400">{filteredPolos.length}</strong> {filteredPolos.length === 1 ? 'polo credenciado' : 'polos credenciados'}
            </span>
            <span className="text-[11px] hidden sm:inline">
              Credenciamento e Nota Máxima no MEC
            </span>
          </div>
        </div>
      </div>

      {/* Main Content: Polos Directory */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Polos List & Detail / Interactive Area */}
        {filteredPolos.length === 0 ? (
          <div className="bg-[#0b1329] border border-slate-800 rounded-3xl p-12 text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-slate-900 flex items-center justify-center mx-auto text-slate-500">
              <MapPin className="w-8 h-8 text-yellow-400" />
            </div>
            <h3 className="text-lg font-bold text-white">
              Nenhum polo encontrado
            </h3>
            <p className="text-xs text-slate-400 max-w-md mx-auto">
              Não encontramos resultados para o termo digitado. Tente buscar pelo nome do bairro, cidade, endereço ou polo.
            </p>
            <button
              onClick={clearFilters}
              className="bg-yellow-400 text-slate-950 font-bold px-5 py-2.5 rounded-xl text-xs hover:bg-yellow-300 transition-colors shadow-md cursor-pointer"
            >
              Ver Todos os Polos
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPolos.map((polo) => {
              const isSelected = activePolo?.id === polo.id;

              return (
                <div
                  key={polo.id}
                  className="bg-[#0b1329] border border-slate-800 rounded-2xl overflow-hidden hover:border-yellow-400/70 hover:shadow-xl hover:shadow-yellow-400/5 transition-all flex flex-col justify-between group"
                >
                  {/* Polo Image Banner */}
                  <div
                    onClick={() => onSelectPolo ? onSelectPolo(polo) : setActivePolo(polo)}
                    className="relative aspect-[16/10] overflow-hidden bg-slate-900 cursor-pointer block"
                  >
                    {polo.image ? (
                      <img
                        src={polo.image}
                        alt={polo.name}
                        loading="lazy"
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-slate-800 text-slate-500">
                        <Building2 className="w-12 h-12 text-slate-600" />
                      </div>
                    )}
                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0b1329] via-[#0b1329]/30 to-transparent" />

                    {/* Top Badges */}
                    <div className="absolute top-3 left-3 z-10 flex items-center gap-2">
                      <span className="bg-yellow-400 text-slate-950 font-extrabold text-[10px] uppercase tracking-wider px-2.5 py-0.5 rounded-full shadow-md">
                        {polo.state} • {polo.city}
                      </span>
                    </div>

                    {polo.hubEad && (
                      <div className="absolute top-3 right-3 z-10">
                        <span className="bg-slate-950/85 backdrop-blur-md border border-yellow-400/40 text-yellow-400 text-[10px] font-bold px-2.5 py-0.5 rounded-full flex items-center gap-1 shadow-md">
                          <Building2 className="w-3 h-3" />
                          <span>Polo Oficial</span>
                        </span>
                      </div>
                    )}
                  </div>

                  <div className="p-5 sm:p-6 space-y-4 pt-3 sm:pt-4">
                    {/* Polo Name */}
                    <div>
                      <button
                        onClick={() => onSelectPolo ? onSelectPolo(polo) : setActivePolo(polo)}
                        className="text-left w-full group/title cursor-pointer"
                      >
                        <h3 className="text-base sm:text-lg font-bold text-white group-hover/title:text-yellow-400 transition-colors leading-snug flex items-center justify-between gap-2">
                          <span>{polo.name}</span>
                          <ChevronRight className="w-4 h-4 text-slate-500 group-hover/title:text-yellow-400 group-hover/title:translate-x-0.5 transition-all shrink-0" />
                        </h3>
                      </button>
                      <p className="text-xs text-slate-400 font-medium mt-1">
                        Bairro: <span className="text-slate-300">{polo.neighborhood}</span>
                      </p>
                    </div>

                    {/* Details Info List */}
                    <div className="space-y-2.5 pt-2 border-t border-slate-800/80 text-xs text-slate-300">
                      <div className="flex items-start gap-2.5">
                        <MapPin className="w-4 h-4 text-yellow-400 shrink-0 mt-0.5" />
                        <span className="leading-relaxed">{polo.address} - CEP: {polo.zipCode}</span>
                      </div>

                      {/* Acadêmico e Comercial */}
                      <div className="grid grid-cols-1 gap-1.5 pt-1">
                        <div className="flex items-center justify-between text-xs bg-slate-900/80 border border-slate-800 rounded-lg px-2.5 py-1.5">
                          <span className="text-[11px] text-slate-300 font-semibold">
                            Acadêmico:
                          </span>
                          <a
                            href="https://wa.cruzeiroead.com.br/Atendimento"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="font-bold text-white hover:text-emerald-400 transition-colors flex items-center gap-1"
                          >
                            <span>11 91518-4535</span>
                          </a>
                        </div>

                        <div className="flex items-center justify-between text-xs bg-slate-900/80 border border-slate-800 rounded-lg px-2.5 py-1.5">
                          <span className="text-[11px] text-slate-300 font-semibold">
                            Comercial:
                          </span>
                          <a
                            href="https://wa.cruzeiroead.com.br/tronco"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="font-bold text-white hover:text-yellow-400 transition-colors flex items-center gap-1"
                          >
                            <span>11 91747-9873</span>
                          </a>
                        </div>
                      </div>

                      <div className="flex items-start gap-2.5">
                        <Clock className="w-4 h-4 text-yellow-400 shrink-0 mt-0.5" />
                        <span className="text-[11px] text-slate-400 leading-tight">{polo.openingHours}</span>
                      </div>
                    </div>
                  </div>

                  {/* Actions: Google Maps & WhatsApp */}
                  <div className="p-4 sm:p-5 pt-0 border-t border-slate-800/80 bg-slate-950/40 space-y-2">
                    {/* Google Maps Direct Link */}
                    <a
                      href={polo.mapsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full bg-slate-900 hover:bg-slate-800 text-white hover:text-yellow-400 border border-slate-700/80 hover:border-yellow-400/80 py-2.5 px-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 shadow-sm cursor-pointer group/link"
                    >
                      <Navigation className="w-3.5 h-3.5 text-yellow-400 group-hover/link:translate-x-0.5 transition-transform" />
                      <span>Abrir no Google Maps</span>
                      <ExternalLink className="w-3 h-3 text-slate-400 group-hover/link:text-yellow-400" />
                    </a>

                    {/* WhatsApp Support with Polo Name */}
                    <button
                      onClick={() => onOpenConsultant(`Polo ${polo.name}`)}
                      className="w-full bg-yellow-400 hover:bg-yellow-300 text-slate-950 font-bold py-2.5 px-3 rounded-xl text-xs transition-all shadow-md shadow-yellow-400/10 flex items-center justify-center gap-2 cursor-pointer active:scale-95"
                    >
                      <MessageCircle className="w-3.5 h-3.5" />
                      <span>Falar com este Polo</span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Bottom Banner Call to Action */}
        <div className="mt-16 bg-[#0b1329] border border-yellow-500/30 rounded-3xl p-8 sm:p-10 flex flex-col md:flex-row items-center justify-between gap-6 shadow-2xl">
          <div className="text-center md:text-left space-y-2">
            <span className="text-xs font-bold text-yellow-400 uppercase tracking-wider">
              ESTUDE ONDE E QUANDO QUISER
            </span>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
              Não encontrou um polo na sua cidade?
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 max-w-xl">
              Nossos cursos são 100% EAD e você pode realizar sua matrícula, aulas e atividades de qualquer lugar do Brasil com suporte online completo.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0">
            {onNavigateGraduation && (
              <button
                onClick={onNavigateGraduation}
                className="w-full sm:w-auto bg-slate-900 hover:bg-slate-800 text-white border border-slate-700 px-6 py-3.5 rounded-xl text-xs font-bold transition-all cursor-pointer shadow-md flex items-center justify-center gap-2"
              >
                <GraduationCap className="w-4 h-4 text-yellow-400" />
                <span>Ver Cursos Disponíveis</span>
              </button>
            )}

            <button
              onClick={() => onOpenConsultant()}
              className="w-full sm:w-auto bg-yellow-400 hover:bg-yellow-300 text-slate-950 font-bold px-8 py-3.5 rounded-xl text-xs transition-all shadow-xl shadow-yellow-400/20 active:scale-95 cursor-pointer"
            >
              Tirar Dúvidas com Consultor
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

import React from 'react';
import { Link } from 'react-router-dom';
import { PATHS } from '../data/siteUrls';
import { seoForPath } from '../lib/seo';
import { Seo } from './Seo';

export const PrivacyPolicyPage: React.FC = () => {
  const seo = seoForPath(PATHS.privacidade);
  const exclusaoHref =
    'https://wa.cruzeiroead.com.br/tronco?text=' +
    encodeURIComponent(
      'Olá. Quero exercer um direito da LGPD sobre meus dados coletados em eduit.com.br. Pedido: exclusão dos meus dados. Nome e WhatsApp usados no formulário:',
    );

  return (
    <div className="bg-slate-100 min-h-screen text-slate-900">
      <Seo {...seo} path={PATHS.privacidade} />
      <article className="max-w-3xl mx-auto px-4 sm:px-6 py-10 sm:py-14 space-y-8">
        <header className="space-y-3">
          <p className="text-xs font-bold uppercase tracking-widest text-yellow-700">Cruzeiro do Sul Virtual</p>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">Política de Privacidade</h1>
          <p className="text-sm text-slate-600">
            CNPJ 52.423.602/0001-55 · Atualizada em 7 de outubro de 2026
          </p>
        </header>

        <section className="space-y-3 text-sm leading-relaxed text-slate-700">
          <h2 className="text-lg font-bold text-slate-900">Quem é o responsável</h2>
          <p>
            Esta política descreve como a Cruzeiro do Sul Virtual, inscrita no CNPJ 52.423.602/0001-55,
            trata os dados pessoais coletados em eduit.com.br, nos termos da Lei nº 13.709/2018
            (Lei Geral de Proteção de Dados Pessoais — LGPD). O site apresenta cursos de graduação e
            pós-graduação e recebe pedidos de contato sobre bolsas e matrícula.
          </p>
          <p>
            A Cruzeiro do Sul Virtual é a controladora desses dados. O tratamento segue os princípios
            da LGPD, entre eles finalidade, necessidade, transparência e segurança.
          </p>
        </section>

        <section className="space-y-3 text-sm leading-relaxed text-slate-700">
          <h2 className="text-lg font-bold text-slate-900">Base legal</h2>
          <p>O tratamento se apoia nas hipóteses do art. 7º da LGPD:</p>
          <ul className="list-disc pl-5 space-y-1">
            <li>
              consentimento (art. 7º, I), dado no aceite desta política antes do envio do formulário,
              para a equipe entrar em contato sobre cursos e bolsas
            </li>
            <li>
              procedimentos preliminares relacionados a contrato (art. 7º, V), para responder ao pedido
              de informação sobre ingresso, valores e matrícula
            </li>
            <li>
              legítimo interesse (art. 7º, IX), limitado à medição de páginas e anúncios, com direito
              de oposição
            </li>
            <li>
              cumprimento de obrigação legal (art. 7º, II), quando a guarda do registro for exigida
            </li>
          </ul>
        </section>

        <section className="space-y-3 text-sm leading-relaxed text-slate-700">
          <h2 className="text-lg font-bold text-slate-900">Quais dados são coletados</h2>
          <p>Nos formulários de curso, consultor, polo e blog, a pessoa pode informar:</p>
          <ul className="list-disc pl-5 space-y-1">
            <li>nome</li>
            <li>WhatsApp</li>
            <li>e-mail, que é opcional</li>
            <li>o curso, o polo ou o artigo relacionado à página em que o formulário foi enviado</li>
            <li>o aceite desta política</li>
          </ul>
          <p>
            Também registramos dados técnicos da visita, como endereço da página, página de entrada,
            referência e identificadores de anúncio (por exemplo, gclid, gbraid e parâmetros UTM),
            além de identificadores de audiência do Google Analytics quando o navegador os disponibiliza.
          </p>
        </section>

        <section className="space-y-3 text-sm leading-relaxed text-slate-700">
          <h2 className="text-lg font-bold text-slate-900">Para que os dados são usados</h2>
          <ul className="list-disc pl-5 space-y-1">
            <li>retornar o contato solicitado e informar valores, bolsas e formas de ingresso</li>
            <li>identificar qual curso, polo ou conteúdo gerou o pedido</li>
            <li>medir o resultado dos anúncios e das páginas do site</li>
          </ul>
          <p>
            O envio do formulário depende do aceite desta política. A medição de navegação usa o
            Google Tag Manager, o Google Analytics 4 e o Google Ads.
          </p>
        </section>

        <section className="space-y-3 text-sm leading-relaxed text-slate-700">
          <h2 className="text-lg font-bold text-slate-900">Com quem os dados são compartilhados</h2>
          <p>
            Os dados do formulário são enviados à equipe comercial da Cruzeiro do Sul Virtual para o
            atendimento. Dados de navegação e de campanha podem ser tratados pelo Google, conforme as
            tags instaladas no site. Se a pessoa escolher falar pelo WhatsApp, a conversa segue na
            plataforma da Meta.
          </p>
          <p>Não vendemos dados pessoais.</p>
        </section>

        <section className="space-y-3 text-sm leading-relaxed text-slate-700">
          <h2 className="text-lg font-bold text-slate-900">Por quanto tempo os dados ficam guardados</h2>
          <p>
            Os dados do contato são mantidos pelo tempo necessário para concluir o atendimento e
            cumprir obrigações legais. Identificadores de anúncio ficam associados à visita em que o
            formulário foi enviado.
          </p>
        </section>

        <section className="space-y-3 text-sm leading-relaxed text-slate-700">
          <h2 className="text-lg font-bold text-slate-900">Encarregado pelo tratamento</h2>
          <p>
            O encarregado pelo tratamento de dados pessoais (art. 41 da LGPD) é o canal de privacidade
            da Cruzeiro do Sul Virtual. O titular fala com o encarregado pelo WhatsApp comercial
            (11) 91747-9873.
          </p>
          <p>
            <a
              href={exclusaoHref}
              target="_blank"
              rel="noopener noreferrer"
              className="font-bold text-yellow-700 hover:text-yellow-600"
            >
              Falar com o encarregado no WhatsApp
            </a>
          </p>
        </section>

        <section className="space-y-3 text-sm leading-relaxed text-slate-700">
          <h2 className="text-lg font-bold text-slate-900">Direitos do titular, inclusive exclusão</h2>
          <p>
            Nos termos dos arts. 18 e 20 da LGPD, a pessoa pode pedir confirmação do tratamento,
            acesso, correção, anonimização, portabilidade, informação sobre compartilhamento,
            revogação do consentimento e exclusão dos dados tratados com base no consentimento.
          </p>
          <p>
            Para pedir a exclusão, envie pelo WhatsApp do encarregado o nome e o número usados no
            formulário e a frase “exclusão dos meus dados”. O pedido é atendido depois da confirmação
            de que o solicitante é o titular, salvo quando a lei exigir a conservação do registro.
          </p>
          <p>
            <a
              href={exclusaoHref}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex bg-yellow-400 hover:bg-yellow-300 text-slate-950 font-bold px-4 py-2.5 rounded-xl text-xs"
            >
              Pedir exclusão dos meus dados
            </a>
          </p>
        </section>

        <p className="text-sm">
          <Link to={PATHS.home} className="font-bold text-yellow-700 hover:text-yellow-600">
            Voltar ao início
          </Link>
        </p>
      </article>
    </div>
  );
};

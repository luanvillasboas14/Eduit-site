import React from 'react';
import { Link } from 'react-router-dom';
import { PATHS } from '../data/siteUrls';
import { seoForPath } from '../lib/seo';
import { Seo } from './Seo';

export const PrivacyPolicyPage: React.FC = () => {
  const seo = seoForPath(PATHS.privacidade);

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
            trata os dados pessoais coletados em eduit.com.br. O site apresenta cursos de graduação e
            pós-graduação e recebe pedidos de contato sobre bolsas e matrícula.
          </p>
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
          <h2 className="text-lg font-bold text-slate-900">Direitos de quem informa os dados</h2>
          <p>
            A pessoa pode pedir confirmação, acesso, correção ou exclusão dos seus dados, além de
            revogar o consentimento. Para isso, fale com a equipe pelo WhatsApp comercial indicado no
            rodapé do site.
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

import { prepareArticleHtml } from './articleHtml';

/** HTML do corpo do post: tags do editor sanitizadas, texto puro no formatador antigo. */
export function articleBodyHtml(content: string): string {
  return prepareArticleHtml(content).html;
}

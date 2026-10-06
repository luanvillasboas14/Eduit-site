import React from 'react';
import { prepareArticleHtml } from '../lib/articleHtml';

const css = `
.article-body { color: inherit; display: flex; flex-direction: column; gap: 1rem; line-height: 1.7; }
.article-body h2 { color: inherit; margin-top: .35rem; font-size: 1.25rem; font-weight: 800; line-height: 1.35; }
.article-body p, .article-body li { font-size: .95rem; }
.article-body ul { display: flex; flex-direction: column; gap: .75rem; padding-left: 1.25rem; list-style: outside; }
.article-body .article-table { overflow-x: auto; }
.article-body table { border-collapse: collapse; width: 100%; font-size: .875rem; }
.article-body th, .article-body td { text-align: left; vertical-align: top; border: 1px solid #e2e8f0; padding: .65rem .75rem; }
.article-body th { font-weight: 700; }
.blog-html { color: inherit; display: block; line-height: 1.7; white-space: normal; }
.blog-html b, .blog-html strong { font-weight: 700 !important; }
.blog-html i, .blog-html em { font-style: italic !important; }
.blog-html u { text-decoration: underline !important; }
.blog-html br { display: block; content: ""; }
.blog-html h2, .blog-html h3 { display: block; font-weight: 800; margin: .8em 0 .3em; }
.blog-html p, .blog-html div { display: block; margin: 0 0 .7em; }
.blog-html ul { list-style: disc; padding-left: 1.4em; margin: .7em 0; }
.blog-html ol { list-style: decimal; padding-left: 1.4em; margin: .7em 0; }
.blog-html blockquote { border-left: 3px solid #cbd5e1; padding-left: .8em; margin: .7em 0; }
.blog-html a { text-decoration: underline; }
`;

export function BlogArticleBody({
  content,
  className = '',
}: {
  content: string;
  className?: string;
}) {
  const prepared = prepareArticleHtml(content);

  return (
    <>
      <style>{css}</style>
      <div
        className={`${prepared.kind === 'html' ? 'blog-html' : 'article-body'} ${className}`}
        dangerouslySetInnerHTML={{ __html: prepared.html }}
      />
    </>
  );
}

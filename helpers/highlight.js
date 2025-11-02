import hljs from 'highlight.js';
import MarkdownIt from 'markdown-it';

const mdUtils = MarkdownIt().utils;

export function highlightCode(str, lang) {
  if (lang && hljs.getLanguage(lang)) {
    try {
      const langLabel = `<span class="code-lang">${mdUtils.escapeHtml(lang)}</span>`;
      return `<pre class="hljs" data-lang="${mdUtils.escapeHtml(lang)}">` +
             langLabel +
             `<code>` +
             hljs.highlight(str, { language: lang, ignoreIllegals: true }).value +
             '</code></pre>';
    } catch (__) {}
  }
  return '<pre class="hljs"><code>' + mdUtils.escapeHtml(str) + '</code></pre>';
}

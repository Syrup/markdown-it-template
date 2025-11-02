import hljs from 'highlight.js';

export function highlightCode(str, lang, md) {
  if (lang && hljs.getLanguage(lang)) {
    try {
      const langLabel = `<span class="code-lang">${md.utils.escapeHtml(lang)}</span>`;
      return `<pre class="hljs" data-lang="${md.utils.escapeHtml(lang)}">` +
             langLabel +
             `<code>` +
             hljs.highlight(str, { language: lang, ignoreIllegals: true }).value +
             '</code></pre>';
    } catch (__) {}
  }
  return '<pre class="hljs"><code>' + md.utils.escapeHtml(str) + '</code></pre>';
}

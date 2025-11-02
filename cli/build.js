import { readFileSync, writeFileSync, readdirSync, existsSync, rmSync, mkdirSync, copyFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { glob } from 'glob';
import frontMatter from 'front-matter';
import hljs from 'highlight.js';
import Handlebars from 'handlebars';
import ejs from 'ejs';
import MarkdownIt from 'markdown-it';
import markdownItTaskLists from 'markdown-it-task-lists';
import markdownItEmoji from 'markdown-it-emoji/light.js';
import markdownItAlerts from '../helpers/markdown-it-alerts.js';
import { parse as parseToml } from 'toml';
import '../helpers/index.js';

const configFile = readFileSync(join(process.cwd(), 'config.toml'), 'utf8');
const config = parseToml(configFile);

const md = new MarkdownIt({
  highlight: function (str, lang) {
    if (lang && hljs.getLanguage(lang)) {
      try {
        return '<pre class="hljs"><code>' +
               hljs.highlight(str, { language: lang, ignoreIllegals: true }).value +
               '</code></pre>';
      } catch (__) {}
    }
    return '<pre class="hljs"><code>' + md.utils.escapeHtml(str) + '</code></pre>';
  },
  html: true
});

md.use(markdownItTaskLists, { label: true, labelAfter: true });
md.use(markdownItEmoji);
md.use(markdownItAlerts);

const BUILD_DIR = join(process.cwd(), "dist");
const TEMPLATE_PATH = join(process.cwd(), "views/index.ejs");

if (existsSync(BUILD_DIR)) {
  rmSync(BUILD_DIR, { recursive: true, force: true });
}
mkdirSync(BUILD_DIR, { recursive: true });

console.log("🚀 Building static site...\n");

function processMarkdownFile(filePath) {
  const file = readFileSync(filePath, "utf8");
  const pageConfig = frontMatter(file);
  const template = Handlebars.compile(file);
  const parsedFile = template({ config, attr: pageConfig.attributes });
  const data = frontMatter(parsedFile);
  const result = md.render(data.body);
  return { result, attributes: data.attributes };
}

function generateHTML(data) {
  const template = readFileSync(TEMPLATE_PATH, "utf8");
  return ejs.render(template, data);
}

console.log("📦 Copying assets...");
const publicDir = join(process.cwd(), "public");

readdirSync(publicDir).forEach(file => {
  if ((file.endsWith('.css') || file.endsWith('.js')) && !file.endsWith('.min.css') && !file.endsWith('.min.js')) {
    return;
  }
  const src = join(publicDir, file);
  const dest = join(BUILD_DIR, file);
  copyFileSync(src, dest);
  console.log(`  ✓ ${file}`);
});

console.log("\n📄 Building pages...");
const readmePath = join(process.cwd(), "README.raw.md");
const { result, attributes } = processMarkdownFile(readmePath);
const indexHTML = generateHTML({
  title: `${attributes.title} - ${config.info.sitename}`,
  data: result,
  darkmode: config.info.darkmode,
  cssFramework: config.info.css_framework || "custom",
  attr: attributes
});

writeFileSync(join(BUILD_DIR, "index.html"), indexHTML);
console.log("  ✓ index.html (from README.raw.md)");

const cwd = join(process.cwd(), "views/markdown");
const markdownFiles = await glob(join(process.cwd(), "views/markdown/**/*.md"));

markdownFiles.forEach(filePath => {
  const route = filePath.slice(cwd.length).replace(/\.md$/, '');
  const { result, attributes } = processMarkdownFile(filePath);
  const html = generateHTML({
    title: attributes.title,
    data: result,
    darkmode: config.info.darkmode,
    cssFramework: config.info.css_framework || "custom",
    attr: attributes
  });
  const outputPath = join(BUILD_DIR, route);
  const dir = route.endsWith('/') ? outputPath : dirname(outputPath);
  mkdirSync(dir, { recursive: true });
  const htmlPath = route.endsWith('/') ? join(outputPath, 'index.html') : outputPath + '.html';
  writeFileSync(htmlPath, html);
  console.log(`  ✓ ${route}.html`);
});

console.log(`\n✨ Build complete! Output: ${BUILD_DIR}`);
console.log(`\n📊 Stats:`);
console.log(`  - Pages: ${markdownFiles.length + 1}`);
const assetCount = readdirSync(publicDir).filter(f => {
  return !(f.endsWith('.css') || f.endsWith('.js')) || f.endsWith('.min.css') || f.endsWith('.min.js');
}).length;
console.log(`  - Assets: ${assetCount}`);

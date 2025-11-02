import 'dotenv/config';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { glob } from 'glob';
import frontMatter from 'front-matter';
import hljs from 'highlight.js';
import express from 'express';
import Handlebars from 'handlebars';
import MarkdownIt from 'markdown-it';
import markdownItTaskLists from 'markdown-it-task-lists';
import markdownItEmoji from 'markdown-it-emoji/light.js';
import markdownItAlerts from './helpers/markdown-it-alerts.js';
import { parse as parseToml } from 'toml';
import './helpers/index.js';

const __dirname = import.meta.dirname;

const app = express();
const port = process.env.PORT || 3000;

// Load config
const configFile = readFileSync(join(__dirname, 'config.toml'), 'utf8');
const config = parseToml(configFile);

// Setup markdown-it
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

// Setup Express
app.use(express.static(join(__dirname, "public")));
app.set("view engine", "ejs");
app.set("views", join(__dirname, "views"));
app.disable("x-powered-by");

// Cache for processed markdown files
const fileCache = new Map();

// Process markdown file
function processMarkdownFile(filePath) {
  // Return cached version if available and cache is enabled
  if (!process.env.CLEAR_CACHE && fileCache.has(filePath)) {
    return fileCache.get(filePath);
  }
  
  const file = readFileSync(filePath, "utf8");
  const pageConfig = frontMatter(file);
  const template = Handlebars.compile(file);
  const parsedFile = template({ config, attr: pageConfig.attributes });
  const data = frontMatter(parsedFile);
  const result = md.render(data.body);
  
  const processed = {
    result,
    attributes: data.attributes
  };
  
  // Store in cache if cache is enabled
  if (!process.env.CLEAR_CACHE) {
    fileCache.set(filePath, processed);
  }
  
  return processed;
}

// Setup routes for markdown files
const cwd = join(process.cwd(), 'views/markdown');
const dir = await glob(join(process.cwd(), 'views/markdown/**/*.md'));

dir.forEach(filePath => {
  const route = filePath.slice(cwd.length).replace(/\.md$/, '');
  app.get(route, (req, res) => {
    const { result, attributes } = processMarkdownFile(filePath);
    res.render("index", {
      data: result,
      darkmode: config.info.darkmode,
      cssFramework: config.info.css_framework || "custom",
      title: attributes.title,
      attr: attributes
    });
  });
});

// Index route
app.get("/", (req, res) => {
  const readmePath = join(__dirname, "README.raw.md");
  const { result, attributes } = processMarkdownFile(readmePath);
  res.render("index", {
    title: `${attributes.title} - ${config.info.sitename}`,
    data: result,
    cssFramework: config.info.css_framework || "custom",
    darkmode: config.info.darkmode,
    attr: attributes
  });
});

app.listen(port, () => {
  console.log(`🚀 Server running on port ${port}`);
});

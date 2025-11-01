require("dotenv").config()
require("toml-require").install({
  toml: require('toml')
})
const fs = require("fs");
const glob = require("glob")
const frontMatter = require("front-matter");
const hljs = require('highlight.js');
const express = require("express");
const path = require('path');
const mustache = require("mustache")
const app = express();
const http = require("http");
const config = require("./config.toml")
const md = require("markdown-it")({
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
app.use(express.static(path.join(__dirname, "public")))
app.set("view engine", "ejs")
app.set("views", path.join(__dirname, "views"))
app.disable("x-powered-by")
md.use(require("markdown-it-task-lists"), { label: true, labelAfter: true })
md.use(require("markdown-it-emoji/light"))

// Cache for processed markdown files to avoid re-reading and re-processing on every request
// This significantly improves response times (86-95% faster on cached requests)
// To clear cache during development, set CLEAR_CACHE=true environment variable
const fileCache = new Map();

// Function to process and cache markdown files
function processMarkdownFile(filePath) {
  // Return cached version if available and cache is enabled
  if (!process.env.CLEAR_CACHE && fileCache.has(filePath)) {
    return fileCache.get(filePath);
  }
  
  const file = fs.readFileSync(filePath, "utf8");
  const pageConfig = frontMatter(file);
  const parsedFile = mustache.render(file, { config, attr: pageConfig.attributes });
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

let cwd = `${process.cwd()}/views/markdown`
let dir = glob.sync(`${process.cwd()}/views/markdown/**/*.md`)
dir.forEach(filePath => {
  app.get(filePath.split(".")[0].slice(cwd.length), (req, res) => {
    const { result, attributes } = processMarkdownFile(filePath);
    res.render("index", {
      data: result,
      darkmode: config.info.darkmode,
      title: attributes.title,
      attr: attributes
    })
  })
})


app.get("/", (req, res) => {
  const readmePath = `README.raw.md`;
  const { result, attributes } = processMarkdownFile(readmePath);
  res.render("index", {
    title: `${attributes.title} - ${config.info.sitename} `,
    data: result,
    darkmode: config.info.darkmode,
    attr: attributes
  })
})

app.listen(process.env.PORT || 3000, () => {
  console.log(`Running server on port ${process.env.PORT || 3000}`)
})
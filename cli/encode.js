require("toml-require").install({
  toml: require('toml')
})
const hljs = require('highlight.js');
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
const fs = require("fs")
const mustache = require("mustache")
const frontMatter = require("front-matter");

md.use(require("markdown-it-task-lists"), { label: true, labelAfter: true })
const config = require("../config.toml")


let newFile = fs.createWriteStream("README.md")
let file = fs.readFileSync("README.raw.md", "utf8")
let pageConfig = frontMatter(file)
let parsedFile = mustache.render(file, { config, attr: pageConfig.attributes });
let data = frontMatter(parsedFile)

// console.log(data.body)
newFile.write(data.body)
// let parsedFile = mustache.render(file, { config, })
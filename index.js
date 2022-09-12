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

let cwd = `${process.cwd()}/views/markdown`
let dir = glob.sync(`${process.cwd()}/views/markdown/**/*.md`)
dir.forEach(path => {
  app.get(path.split(".")[0].slice(cwd.length), (req, res) => {
    let file = fs.readFileSync(path, "utf8")
    let pageConfig = frontMatter(file)
    let parsedFile = mustache.render(file, { config, attr: pageConfig.attributes })
    let data = frontMatter(parsedFile)
    let result = md.render(data.body)
    res.render("index", {
      data: result,
      darkmode: config.info.darkmode,
      title: data.attributes.title,
      attr: data.attributes
    })
  })
})


app.get("/", (req, res) => {
  let file = fs.readFileSync(`README.raw.md`, {encoding: "utf8"})
  let pageConfig = frontMatter(file)
  let parsedFile = mustache.render(file, { config, attr: pageConfig.attributes })
  let data = frontMatter(parsedFile)
  let result = md.render(data.body)
  res.render("index", {
    title: `${data.attributes.title} - ${config.info.sitename} `,
    data: result,
    darkmode: config.info.darkmode,
    attr: data.attributes
  })
})

app.listen(process.env.PORT || 3000, () => {
  console.log(`Running server on port ${process.env.PORT || 3000}`)
})
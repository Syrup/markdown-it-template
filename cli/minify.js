const glob = require("glob")
const cleanCSS = require('clean-css');
const uglify = require("uglify-js")
const fs = require("fs")

let css = glob.sync(`${process.cwd()}/public/**/*.css`)

css.forEach(path => {
  if(path.endsWith(".min.css")) return
  let minCss = fs.createWriteStream(`${path.split(".")[0]}.min.css`)
  let source = fs.readFileSync(path, "utf8")
  new cleanCSS().minify(source, (err, min) => {
    minCss.write(min.styles)
  })
})

let js = glob.sync(`${process.cwd()}/public/**/*.js`)

js.forEach(path => {
  if(path.endsWith(".min.js")) return

  let minJs = fs.createWriteStream(`${path.split(".")[0]}.min.js`)
  let source = fs.readFileSync(path, "utf8")

  let result = uglify.minify(source)

  if(result.error) console.error(result.error)
  minJs.write(result.code)
})
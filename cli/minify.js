const glob = require("glob")
const cleanCSS = require('clean-css');
const uglify = require("uglify-js")
const fs = require("fs")

let css = glob.sync(`${process.cwd()}/public/**/*.css`)

css.forEach(path => {
  if(path.endsWith(".min.css")) return
  let source = fs.readFileSync(path, "utf8")
  let output = new cleanCSS().minify(source)
  if(output.errors && output.errors.length > 0) {
    console.error(`Error minifying ${path}:`, output.errors)
    return
  }
  fs.writeFileSync(`${path.split(".")[0]}.min.css`, output.styles)
})

let js = glob.sync(`${process.cwd()}/public/**/*.js`)

js.forEach(path => {
  if(path.endsWith(".min.js")) return
  let source = fs.readFileSync(path, "utf8")
  let result = uglify.minify(source)
  if(result.error) {
    console.error(`Error minifying ${path}:`, result.error)
    return
  }
  fs.writeFileSync(`${path.split(".")[0]}.min.js`, result.code)
})
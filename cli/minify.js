import { glob } from 'glob';
import CleanCSS from 'clean-css';
import { minify as uglifyMinify } from 'uglify-js';
import { readFileSync, writeFileSync } from 'node:fs';
import { dirname, basename, extname, join } from 'node:path';

const css = await glob(`${process.cwd()}/public/**/*.css`);

for (const file of css) {
  if(file.endsWith(".min.css")) continue;
  const dir = dirname(file);
  const base = basename(file, extname(file));
  const minPath = join(dir, `${base}.min.css`);
  const source = readFileSync(file, "utf8");
  const output = new CleanCSS().minify(source);
  
  if(output.errors && output.errors.length > 0) {
    console.error(`Error minifying ${file}:`, output.errors);
    continue;
  }
  
  writeFileSync(minPath, output.styles);
  console.log(`Minified: ${file} -> ${minPath}`);
}

const js = await glob(`${process.cwd()}/public/**/*.js`);

for (const file of js) {
  if(file.endsWith(".min.js")) continue;
  const dir = dirname(file);
  const base = basename(file, extname(file));
  const minPath = join(dir, `${base}.min.js`);
  const source = readFileSync(file, "utf8");
  const result = uglifyMinify(source);
  
  if(result.error) {
    console.error(`Error minifying ${file}:`, result.error);
    continue;
  }
  
  writeFileSync(minPath, result.code);
  console.log(`Minified: ${file} -> ${minPath}`);
}

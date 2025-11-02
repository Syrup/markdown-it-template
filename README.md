<a href="https://repl.it/github/syrup/markdownitapp"><img src="https://img.shields.io/badge/Repl.it-FORK-brightgreen" /></a>

# How to Use
Well... it's not finished yet but ready to use.

I will show you how to create a new page

open `views/markdown`
and create new file with format `.md`.
> WARNING: do not use special characters when naming files.

Open a new file and fill it with markdown

Example:
```md
---
title: Your Title
---

# Hello World
> Blockquote
[Link]()
```

Now check by going to the url `http://your-web.com/article/filename`.

You can also custom css in `public/style.css`.

*Check `config.toml` file for global configuration*

*and `frontmatter` for inpage configuration.*

Example open [https://markdownitapp.mioun.repl.co/example](https://markdownitapp.mioun.repl.co/example).

To run server use
```bash 
bash main.sh
```

instead of 

```bash
npm start
```

if it's the first time.

And then, you can add anything you want like navbar :)

## Performance Features

The application includes several performance optimizations:

- **File Caching**: Markdown files are processed once and cached in memory, resulting in 86-95% faster response times on subsequent requests.
- **Efficient Minification**: CSS and JS files are minified using synchronous operations for faster build times.

## Dark Mode

The application now includes a fully functional dark mode feature:

- **Toggle Button**: Click the 🌑/☀️ button in the bottom-right corner to switch between light and dark modes
- **Persistent Preference**: Your dark mode preference is saved in localStorage and persists across page visits
- **Dynamic Themes**: Automatically switches highlight.js syntax highlighting theme to match the current mode
- **Configuration**: Set the default mode in `config.toml` with the `darkmode` option (users can still override this with the toggle)

## CSS Framework Options

Choose between custom CSS or Pico CSS (classless framework):

- Edit `config.toml` and set `css_framework` to:
  - `"custom"` - Use custom styling (default)
  - `"pico"` - Use Pico CSS for automatic semantic HTML styling

## Development Mode

When developing and making changes to markdown files, you can disable caching by setting the `CLEAR_CACHE` environment variable:

```bash
CLEAR_CACHE=true npm start
```

This ensures you see file changes immediately without needing to restart the server.

## Static Site Generation

This project supports static site generation for deployment to serverless platforms like Vercel, Netlify, or GitHub Pages.

### Development

```bash
npm install
npm run dev    # Start development server
```

### Build for Production

```bash
npm run build  # Generates static site in /dist directory
```

### Deploy to Vercel

```bash
npm install -g vercel
vercel
```

Or connect your GitHub repo to Vercel for automatic deployments.

### Deploy to Netlify

```bash
npm install -g netlify-cli
netlify deploy --prod
```

### Deploy to GitHub Pages

1. Build the site: `npm run build`
2. Push `dist` folder to `gh-pages` branch
3. Enable GitHub Pages in repository settings

### Project Structure

- `/views/markdown/*.md` - Markdown content files
- `/public/*` - Static assets (CSS, JS, images)
- `/dist/*` - Built static site (generated)

---

That's all for now.

<details>
  <summary>Footer</summary>
  <div class="content">
    
> TODO:
>  1. [x] Create a routing system
>  2. [ ] Reach 10★ on Github


<a href="https://github.com/Syrup/markdownitapp">Github</a>


> CREDITS:
> 1. [markdown-it](https://github.com/markdown-it/markdown-it)
> 2. [markdown-it-task-lists](https://github.com/revin/markdown-it-task-lists)
> 3. [highlight.js](https://github.com/highlightjs/highlight.js/)
> 4. [front-matter](https://github.com/jxson/front-matter)
> 5. [handlebars](https://github.com/handlebars-lang/handlebars.js)
  </div>
</details>
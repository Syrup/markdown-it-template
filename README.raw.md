---
title: README
description: This is a website created by Markdown and EJS using ExpressJS Server
image: https://cdn.mioun.repl.co/doll.png
example: https://markdownitapp.mioun.repl.co/example
---

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
[Link]({{{ config.info.site }}})
```

Now check by going to the url `http://your-web.com/article/filename`.

You can also custom css in `public/style.css`.

*Check `config.toml` file for global configuration*

*and `frontmatter` for inpage configuration.*

Example open [{{ attr.example }}]({{ attr.example }}).

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

---

That's all for now.

<details>
  <summary>Footer</summary>
  <div class="content">
    
> TODO:
>  1. [x] Create a routing system
>  2. [ ] Reach 10★ on Github


<a href="https://github.com/Syrup/ markdownitapp">Github</a>


> CREDITS:
> 1. [markdown-it](https://github.com/markdown-it/markdown-it)
> 2. [markdown-it-task-lists](https://github.com/revin/markdown-it-task-lists)
> 3. [highlight.js](https://github.com/highlightjs/highlight.js/)
> 4. [front-matter](https://github.com/jxson/front-matter)
> 5. [mustache](https://github.com/janl/mustache.js)
  </div>
</details>
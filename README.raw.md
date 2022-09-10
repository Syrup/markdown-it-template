---
title: Readme
example: https://markdownitapp.mioun.repl.co/article/index
---

<a href="https://repl.it/github/syrup/markdownitapp"><img src="https://img.shields.io/badge/Repl.it-FORK-brightgreen" /></a>

# How to Use
well... it's not finished yet but ready to use

i'll show you how to create a new page

open `views/markdown`
and create new file with format `.md`
> WARNING: do not use special characters when naming files

open a new file and fill it with markdown

example:
```md
---
title: Your Title
---

# Hello World
> Blockquote
[Link]({{{ config.info.site }}})
```

now check by going to the url `http://your-web.com/article/filename`

you can also custom css in `public/style.css`

*Check the `config.toml` file for global configuration*
*and frontmatter for inpage configuration*

example open [{{ attr.example }}]({{ attr.example }})

to run server use
```bash 
bash main.sh
```

instead of 

```bash
npm start
```

if it's the first time

---

that's all for now

<details>
  <summary>Footer</summary>
  
> TODO:
>  1. [ ] Create a routing system
>  2. [ ] Make it simpler

> CREDITS:
> 1. [markdown-it](https://github.com/markdown-it/markdown-it)
> 2. [markdown-it-task-lists](https://github.com/revin/markdown-it-task-lists)
> 3. [highlight.js](https://github.com/highlightjs/highlight.js/)
> 4. [front-matter](https://github.com/jxson/front-matter)
> 5. [mustache](https://github.com/janl/mustache.js)
</details>
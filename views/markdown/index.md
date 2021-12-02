---
title: Index
description: Nothing here
---

# Hello World
open `views/markdown/index.md`

afterward you can see
```md
---
title: {{ attr.title }}
description: {{ attr.description }}
---
```
So, you can see what's in between --- right? you can retrieve the value with `\{\{ attr.<name> \}\}`

btw remove the `\` it's just for escape :)
{{ attr.description }}
```js
const express = require('express')
const app = express()

app.get("/", (req, res) => {
  res.send("Hello")
})

app.listen(process.env.PORT || 3000, () => {
  console.log(`Port running on ${process.env.PORT || 3000}`)
})
```
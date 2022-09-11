---
title: Example
description: Nothing here
---

# Hello World
open `views/markdown/example.md`

afterward you can see
```md
---
title: {{ attr.title }}
description: {{ attr.description }}
---
```
So, you can see what's in between --- right? you can retrieve the value with <code>&#123;&#123; attr.&lt;name&gt; &#125;&#125;</code>.

Below is an example of using <code>&#123;&#123; atrr.description &#125;&#125;</code>:


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
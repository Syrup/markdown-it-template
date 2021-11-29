---
title: Index
description: Nothing here
---

# Hello World
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
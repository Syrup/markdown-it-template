---
title: Handlebars Helpers Demo
---

# Handlebars Helpers & Escaping Demo

## 1. Dynamic Content (Normal)

Website title: **{{ config.info.sitename }}**

## 2. Display Literal Curly Braces

Use helpers to display curly braces:

- Left brace: {{lbrace}}
- Right brace: {{rbrace}}
- Combined: {{lbrace}}{{lbrace}} variable {{rbrace}}{{rbrace}}

## 3. Variable Helper - For Template Documentation

Display variable syntax without evaluation:

- Simple variable: {{var "title"}}
- Nested variable: {{var "config.info.sitename"}}
- Helper syntax: {{var "#if condition"}}
- Each loop: {{var "#each items"}}

## 4. Escape HTML Helper

Prevent XSS with escaped HTML entities:

**Input:** `<script>alert('xss')</script>`

**Output:** {{escape "<script>alert('xss')</script>"}}

**Result:** Will appear as text, not executed as script.

---

**Test 2 - Bold Tag:**

**Input:** `<b>Bold text</b>`

**Output:** {{escape "<b>Bold text</b>"}}

**Result:** The `<b>` tag will not be rendered as HTML.

## 5. HTML Helper (Opposite of Escape)

Render HTML without escaping:

**Input:** `<strong>This is strong</strong>`

**Output:** {{html "<strong>This is strong</strong>"}}

**Result:** Text will be bold because HTML tag is rendered.

## 6. Combining Dynamic & Literal

This website: **{{ config.info.sitename }}**

To access config use: {{var "config.info.sitename"}}

---

## Helpers Cheat Sheet

### Available Helpers

**1. lbrace / rbrace**
```
{{lbrace}} -> {
{{rbrace}} -> }
```

**2. var**
```
{{var "variableName"}} -> Display syntax {{variableName}}
```

**3. escape**
```
{{escape htmlString}} -> Escape HTML entities (SafeString)
```

**4. html**
```
{{html htmlString}} -> Render HTML without escaping
```

**5. raw (block)**
```
Wrap content that should not be processed
```

---

## Use Cases

### Case 1: Handlebars Tutorial

To use config variable, write:

{{var "config.info.sitename"}}

Result will be: {{ config.info.sitename }}

### Case 2: Template Documentation

Template syntax:
- Title: {{var "attr.title"}}
- Date: {{var "attr.date"}}

Actual values:
- Title: {{ attr.title }}

### Case 3: Escape User Input

User input: {{escape "<b>Bold text</b>"}}

Safe HTML output to prevent XSS.

---

## Tips

1. **Dynamic content**: Directly use {{lbrace}}{{lbrace}} variable {{rbrace}}{{rbrace}}
2. **Show syntax**: Use {{lbrace}}{{lbrace}}var "name"{{rbrace}}{{rbrace}}
3. **Escape HTML**: Use {{lbrace}}{{lbrace}}escape text{{rbrace}}{{rbrace}}
4. **Literal braces**: Use lbrace/rbrace helpers




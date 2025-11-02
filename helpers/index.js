import Handlebars from "handlebars";

// Escape helper - untuk escape HTML/special characters (returns SafeString)
Handlebars.registerHelper("escape", (text) => {
  return new Handlebars.SafeString(Handlebars.Utils.escapeExpression(text));
});

// Raw helper - untuk block yang tidak di-process oleh Handlebars
Handlebars.registerHelper("raw", (options) => {
  return options.fn(this);
});

// Code helper - untuk dynamic content dalam code blocks
Handlebars.registerHelper("code", function(options) {
  const content = options.fn(this);
  return "```" + content + "```";
});

// Escape curly braces - untuk menampilkan {{ }} literal
Handlebars.registerHelper("lbrace", () => "{{");
Handlebars.registerHelper("rbrace", () => "}}");

// Variable escape - untuk menampilkan variable syntax
Handlebars.registerHelper("var", (name) => {
  return `{{${name}}}`;
});

// HTML tag helper - menampilkan HTML literal tanpa escape
Handlebars.registerHelper("html", (text) => {
  return new Handlebars.SafeString(text);
});

// Color helper (existing)
Handlebars.registerHelper("color", (options) => {
  return "<span class='pico-color-" + options.hash.color + "'>" + options.fn(this) + "</span>";
});

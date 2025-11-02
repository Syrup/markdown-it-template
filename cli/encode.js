import { readFileSync, createWriteStream } from 'node:fs';
import Handlebars from 'handlebars';
import frontMatter from 'front-matter';

const file = readFileSync("README.raw.md", "utf8");
const pageConfig = frontMatter(file);
const template = Handlebars.compile(file);
const parsedFile = template({ config: {}, attr: pageConfig.attributes });
const data = frontMatter(parsedFile);

const newFile = createWriteStream("README.md");
newFile.write(data.body);

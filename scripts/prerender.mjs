import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const dist = path.join(root, "dist");
const { prerenderRoutes, renderPage } = await import(
  pathToFileURL(path.join(root, "node_modules/.cache/portfolio-ssr/entry-server.js")).href
);
const template = (await readFile(path.join(dist, "index.html"), "utf8"))
  .replace(/<div id="root">[\s\S]*<\/div>(?=\s*<\/body>)/, '<div id="root"></div>');

function escapeHtml(value) {
  return value.replaceAll("&", "&amp;").replaceAll('"', "&quot;")
    .replaceAll("<", "&lt;").replaceAll(">", "&gt;");
}

for (const route of prerenderRoutes) {
  const { html, title, description } = await renderPage(route);
  if (!html || html.includes("Loading repository") ||
      (route.startsWith("/repositories/") &&
        (!html.includes("repository-overview-lead") || !html.includes("<strong>README.md</strong>") ||
          html.includes("README.md is not available") || html.includes("OVERVIEW.md is not available")))) {
    throw new Error(`Incomplete HTML for ${route}`);
  }
  const page = template
    .replace('<div id="root"></div>', () => `<div id="root">${html}</div>`)
    .replace(/<title>[^<]*<\/title>/, `<title>${escapeHtml(title)}</title>`)
    .replace(/<meta name="description" content="[^"]*"\s*\/>/, `<meta name="description" content="${escapeHtml(description)}" />`);
  if (page === template || !page.includes(`<div id="root">${html}`)) {
    throw new Error(`Could not insert HTML for ${route}`);
  }
  const destination = route === "/"
    ? path.join(dist, "index.html")
    : path.join(dist, route.slice(1), "index.html");
  await mkdir(path.dirname(destination), { recursive: true });
  await writeFile(destination, page);
}

console.log(`Pre-rendered ${prerenderRoutes.length} pages to dist/`);

import fs from "node:fs";
import path from "node:path";
import { pathToFileURL } from "node:url";

const ssr = await import(
  pathToFileURL(path.resolve("dist-ssr/entry-server.js")).href
);
const { render, routeMeta, notFoundMeta, documentTitle } = ssr;
const origin = (process.env.VITE_SITE_URL || "").replace(/\/$/, "");
const base = fs.readFileSync("dist/index.html", "utf8");
const esc = (s) =>
  s.replaceAll("&", "&amp;").replaceAll('"', "&quot;").replaceAll("<", "&lt;");

function page(route, body, meta, extraHead = "") {
  const url = origin + route;
  const social = origin
    ? `<link rel="canonical" href="${url}"/><meta property="og:url" content="${url}"/><meta property="og:image" content="${origin}/social-card.png"/>`
    : "";
  return base
    .replace(/<title>.*?<\/title>/, `<title>${esc(documentTitle(route))}</title>`)
    .replace(
      /<meta\s+name="description"\s+content="[^"]*"\s*\/?>/,
      `<meta name="description" content="${esc(meta.description)}"/>`,
    )
    .replace(
      "</head>",
      `${social}<meta property="og:type" content="website"/><meta property="og:site_name" content="NEXUS"/><meta property="og:title" content="${esc(documentTitle(route))}"/><meta property="og:description" content="${esc(meta.description)}"/><meta name="twitter:card" content="summary_large_image"/>${extraHead}</head>`,
    )
    .replace('<div id="root"></div>', `<div id="root">${body}</div>`);
}

const routes = Object.keys(routeMeta);
for (const route of routes) {
  const html = page(route, await render(route), routeMeta[route]);
  const file =
    route === "/" ? "dist/index.html" : path.join("dist", route, "index.html");
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, html);
}
fs.writeFileSync(
  "dist/404.html",
  page(
    "/404",
    await render("/404"),
    notFoundMeta,
    '<meta name="robots" content="noindex"/>',
  ),
);

if (origin) {
  fs.writeFileSync(
    "dist/sitemap.xml",
    `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${routes
      .map((r) => `<url><loc>${origin + r}</loc></url>`)
      .join("")}</urlset>`,
  );
  fs.writeFileSync(
    "dist/robots.txt",
    `User-agent: *\nAllow: /\nSitemap: ${origin}/sitemap.xml\n`,
  );
} else {
  fs.writeFileSync("dist/robots.txt", "User-agent: *\nAllow: /\n");
  console.warn(
    "VITE_SITE_URL is not set: skipped canonical URLs, og:image and sitemap.xml.",
  );
}
fs.rmSync("dist-ssr", { recursive: true, force: true });
console.log(`Pre-rendered ${routes.length} pages and 404.html.`);

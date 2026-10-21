import fs from "node:fs";
import path from "node:path";
import { pathToFileURL } from "node:url";

const ssr = await import(
  pathToFileURL(path.resolve("dist-ssr/entry-server.js")).href
);
const { render, routeMeta, notFoundMeta, documentTitle } = ssr;
const origin = (process.env.VITE_SITE_URL || "").replace(/\/$/, "");
const base = fs.readFileSync("dist/index.html", "utf8");
const manifest = JSON.parse(
  fs.readFileSync("dist/.vite/manifest.json", "utf8"),
);
function stylesFor(entry, seen = new Set()) {
  if (seen.has(entry)) return [];
  seen.add(entry);
  const chunk = manifest[entry];
  return chunk
    ? [
        ...(chunk.css || []),
        ...(chunk.imports || []).flatMap((key) => stylesFor(key, seen)),
      ]
    : [];
}
const esc = (s) =>
  s.replaceAll("&", "&amp;").replaceAll('"', "&quot;").replaceAll("<", "&lt;");

function page(route, body, meta, extraHead = "") {
  const entry =
    route === "/work/forme"
      ? "src/concepts/forme/Forme.tsx"
      : route === "/work/apex"
        ? "src/concepts/apex/Apex.tsx"
        : Object.keys(manifest).find(
            (key) => manifest[key].name === "SiteApp",
          ) || "src/SiteApp.tsx";
  extraHead += [...new Set(stylesFor(entry))]
    .filter((file) => !base.includes(file))
    .map((file) => `<link rel="stylesheet" href="/${file}"/>`)
    .join("");
  // Resource hints emitted ahead of React's tree belong in the document head.
  // Keeping them inside #root changes the initial hydration boundary.
  extraHead += (body.match(/<link rel="preload"[^>]*\/>/g) || []).join("");
  body = body.replace(/<link rel="preload"[^>]*\/>/g, "");
  const url = origin + route;
  const social = origin
    ? `<link rel="canonical" href="${url}"/><meta property="og:url" content="${url}"/><meta property="og:image" content="${origin}/social-card.png"/>`
    : "";
  return base
    .replace(
      /<title>.*?<\/title>/,
      `<title>${esc(documentTitle(route))}</title>`,
    )
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
  // Clean URLs resolve to .html on Vercel and Vite's preview server.
  if (route !== "/") fs.writeFileSync(path.join("dist", `${route}.html`), html);
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

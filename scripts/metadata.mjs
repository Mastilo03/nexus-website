import fs from "node:fs";
import path from "node:path";
const origin = (
  process.env.VITE_SITE_URL ||
  "https://nexus-digital-experiences.brawnyperch17.chatgpt.site"
).replace(/\/$/, "");
const routes = {
  "/": [
    "Automation & Digital Experiences",
    "Immersive web experiences and AI automation for ambitious businesses. Explore interactive demos and calculate your opportunity.",
  ],
  "/services/web-design": [
    "Immersive Web Design",
    "Premium web design, interactive 3D websites and conversion-focused digital experiences.",
  ],
  "/services/automation": [
    "AI Automation Services",
    "Lead qualification, appointment scheduling and CRM automation designed around your business.",
  ],
  "/work": [
    "Concept Portfolio & Interactive Demos",
    "Explore original NEXUS web design and automation concepts with working interactive previews.",
  ],
  "/roi-calculator": [
    "Automation ROI Calculator",
    "Calculate illustrative lead recovery revenue and administrative time savings using your own assumptions.",
  ],
  "/pricing": [
    "Engagement Models",
    "Custom-quote website, automation and combined growth partnerships.",
  ],
  "/about": [
    "About NEXUS",
    "Creative digital experiences and intelligent systems. Learn how NEXUS approaches your business.",
  ],
  "/contact": [
    "Start a Conversation",
    "Prepare a project brief for premium web design or business automation.",
  ],
  "/privacy": [
    "Privacy Policy",
    "How the NEXUS website handles information and interactive demonstration data.",
  ],
  "/terms": [
    "Terms of Use",
    "Using the NEXUS website, its concepts and illustrative calculators.",
  ],
};
const base = fs.readFileSync("dist/index.html", "utf8");
const esc = (s) =>
  s.replaceAll("&", "&amp;").replaceAll('"', "&quot;").replaceAll("<", "&lt;");
for (const [route, [title, description]] of Object.entries(routes)) {
  const url = origin + route;
  const html = base
    .replace(/<title>.*?<\/title>/, `<title>${esc(title)} — NEXUS</title>`)
    .replace(
      /<meta name="description" content="[^"]*"\s*\/?\s*>/,
      `<meta name="description" content="${esc(description)}"/>`,
    )
    .replace(
      "</head>",
      `<link rel="canonical" href="${url}"/><meta property="og:type" content="website"/><meta property="og:site_name" content="NEXUS"/><meta property="og:title" content="${esc(title)} — NEXUS"/><meta property="og:description" content="${esc(description)}"/><meta property="og:url" content="${url}"/><meta property="og:image" content="${origin}/social-card.png"/><meta name="twitter:card" content="summary_large_image"/></head>`,
    );
  const file =
    route === "/" ? "dist/index.html" : path.join("dist", route, "index.html");
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, html);
}
fs.writeFileSync(
  "dist/sitemap.xml",
  `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${Object.keys(
    routes,
  )
    .map((r) => `<url><loc>${origin + r}</loc></url>`)
    .join("")}</urlset>`,
);
fs.writeFileSync(
  "dist/robots.txt",
  `User-agent: *\nAllow: /\nSitemap: ${origin}/sitemap.xml\n`,
);
console.log(
  "Generated unique metadata, canonical URLs and static entry points for 10 routes.",
);

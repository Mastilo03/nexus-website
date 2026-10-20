import { projects } from "./data";

// The one place page titles and descriptions live. Used by the browser on
// navigation and by scripts/prerender.mjs at build time.
export const siteName = "NEXUS";
export const siteOrigin = (import.meta.env.VITE_SITE_URL || "").replace(
  /\/$/,
  "",
);

export const routeMeta: Record<string, { title: string; description: string }> =
  {
    "/": {
      title: "Websites and automation for service businesses",
      description:
        "Websites that bring inquiries in, and automations that answer, qualify and book them, even after hours. Try the demo.",
    },
    "/services/web-design": {
      title: "Web design",
      description:
        "Custom websites for service businesses: clear about what you do, quick on a phone, and built around one next step.",
    },
    "/services/automation": {
      title: "Automation",
      description:
        "Reply to every inquiry, ask the right questions, book appointments and keep your CRM up to date, with your team in control.",
    },
    "/work": {
      title: "Concept projects",
      description:
        "Six original concepts across hospitality, property, healthcare, automotive, home services and wellness, each with a working demo.",
    },
    "/roi-calculator": {
      title: "ROI calculator",
      description:
        "Estimate the revenue you could win back from slow replies and the admin time automation could save, using your own numbers.",
    },
    "/pricing": {
      title: "Pricing",
      description:
        "What a website, automation, or both include. Every project is quoted after a short call.",
    },
    "/about": {
      title: "About",
      description:
        "NEXUS designs websites and builds the automation behind them, so the people your site brings in get looked after.",
    },
    "/contact": {
      title: "Contact",
      description:
        "Tell us about your business and what you’d like to change. We’ll tell you honestly whether we can help.",
    },
    "/privacy": {
      title: "Privacy",
      description: "What this website does with the information you give it.",
    },
    "/terms": {
      title: "Terms of use",
      description:
        "The rules for using this website, its concepts and its demos.",
    },
    ...Object.fromEntries(
      projects.map((p) => [
        `/work/${p.slug}`,
        {
          title: `${p.name}: ${p.label}`,
          description: `${p.description} An original concept with a working demo.`,
        },
      ]),
    ),
  };

export const notFoundMeta = {
  title: "Page not found",
  description: "This page doesn’t exist.",
};

export function documentTitle(pathname: string) {
  const meta = routeMeta[pathname] ?? notFoundMeta;
  return pathname === "/"
    ? `${siteName} | ${meta.title}`
    : `${meta.title} | ${siteName}`;
}

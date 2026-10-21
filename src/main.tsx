import React, { lazy, Suspense } from "react";
import { createRoot, hydrateRoot } from "react-dom/client";
import "./entry.css";
const pathname = location.pathname.replace(/\/$/, "") || "/";
const Surface =
  pathname === "/work/forme"
    ? lazy(() => import("./concepts/forme/Forme"))
    : pathname === "/work/apex"
      ? lazy(() => import("./concepts/apex/Apex"))
      : lazy(() => import("./SiteApp"));

const root = document.getElementById("root")!;
const app = (
  <React.StrictMode>
    <Suspense fallback={null}>
      <Surface />
    </Suspense>
  </React.StrictMode>
);
// Pages are pre-rendered at build time; hydrate them. The dev server serves
// an empty root, so render from scratch there.
if (root.hasChildNodes()) hydrateRoot(root, app);
else createRoot(root).render(app);

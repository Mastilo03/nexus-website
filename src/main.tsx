import React from "react";
import { createRoot, hydrateRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { App } from "./App";

const root = document.getElementById("root")!;
const app = (
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
// Pages are pre-rendered at build time; hydrate them. The dev server serves
// an empty root, so render from scratch there.
if (root.hasChildNodes()) hydrateRoot(root, app);
else createRoot(root).render(app);

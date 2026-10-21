import React, { Suspense } from "react";
import { prerender } from "react-dom/static";
import { StaticRouter } from "react-router-dom";
import { App } from "./App";

export { routeMeta, notFoundMeta, documentTitle, siteName } from "./seo";

export async function render(url: string) {
  const Concept =
    url === "/work/forme"
      ? (await import("./concepts/forme/Forme")).default
      : url === "/work/apex"
        ? (await import("./concepts/apex/Apex")).default
        : null;
  const { prelude } = await prerender(
    <React.StrictMode>
      <Suspense fallback={null}>
        {Concept ? (
          <Concept />
        ) : (
          <StaticRouter location={url}>
            <App />
          </StaticRouter>
        )}
      </Suspense>
    </React.StrictMode>,
  );
  return new Response(prelude).text();
}

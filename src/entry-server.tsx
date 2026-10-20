import React from "react";
import { prerender } from "react-dom/static";
import { StaticRouter } from "react-router-dom";
import { App } from "./App";

export { routeMeta, notFoundMeta, documentTitle, siteName } from "./seo";

export async function render(url: string) {
  const { prelude } = await prerender(
    <React.StrictMode>
      <StaticRouter location={url}>
        <App />
      </StaticRouter>
    </React.StrictMode>,
  );
  return new Response(prelude).text();
}

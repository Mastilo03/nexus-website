const {
  chromium,
} = require("C:/Users/filip/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright");
const assert = require("node:assert/strict");
(async () => {
  const browser = await chromium.launch({
    channel: "msedge",
    headless: true,
    args: ["--enable-unsafe-swiftshader"],
  });
  const page = await browser.newPage({
    viewport: { width: 1440, height: 1000 },
  });
  const errors = [],
    posts = [];
  page.on("pageerror", (e) => errors.push(e.message));
  page.on("request", (r) => {
    if (r.method() === "POST") posts.push(r.url());
  });
  await page.goto("http://127.0.0.1:4173/work/forme", {
    waitUntil: "networkidle",
  });
  await page.locator("#residences").scrollIntoViewIfNeeded();
  await page.locator('[data-floor="6"]').focus();
  await page.keyboard.press("ArrowDown");
  assert.equal(
    await page.locator('[data-floor="5"]').getAttribute("aria-pressed"),
    "true",
  );
  await page.getByRole("button", { name: "502", exact: true }).click();
  assert.match(
    await page.locator(".residence-detail").innerText(),
    /Residence 502/,
  );
  await page.screenshot({
    path: ".impeccable/review/forme-explorer-desktop.png",
  });
  await page.locator(".residence-detail a").click();
  await page.getByLabel("Preferred day", { exact: true }).fill("2026-12-10");
  await page.getByLabel(/^Preferred time/).selectOption("13:00");
  await page.getByLabel("Your name", { exact: true }).fill("Demo Visitor");
  await page
    .getByLabel("Email address", { exact: true })
    .fill("demo@example.com");
  await page.getByRole("button", { name: "Complete the demo" }).click();
  assert.match(await page.getByRole("status").innerText(), /Nothing was sent/);
  await page.screenshot({
    path: ".impeccable/review/forme-confirmation-desktop.png",
  });
  for (const [selector, name] of [
    [".forme-materials", "forme-materials"],
    [".forme-neighbourhood", "forme-map"],
  ]) {
    await page.locator(selector).scrollIntoViewIfNeeded();
    await page.screenshot({ path: `.impeccable/review/${name}-desktop.png` });
  }
  await page.goto("http://127.0.0.1:4173/work/apex", {
    waitUntil: "networkidle",
  });
  await page.locator("#services").scrollIntoViewIfNeeded();
  await page.screenshot({
    path: ".impeccable/review/apex-services-desktop.png",
  });
  await page.locator(".apex-inspector").scrollIntoViewIfNeeded();
  const slider = page.getByRole("slider");
  await slider.focus();
  await page.keyboard.press("ArrowRight");
  assert.equal(await slider.inputValue(), "51");
  await page.screenshot({
    path: ".impeccable/review/apex-inspector-desktop.png",
  });
  await page.getByLabel(/^Service/).selectOption("Ceramic coating");
  await page.getByLabel(/^Vehicle size/).selectOption("Compact / coupé");
  await page.getByLabel("Preferred date", { exact: true }).fill("2026-12-11");
  await page.getByLabel("Your name", { exact: true }).fill("Demo Visitor");
  await page
    .getByLabel("Email address", { exact: true })
    .fill("demo@example.com");
  await page.getByRole("button", { name: "Complete the demo" }).click();
  assert.match(await page.getByRole("status").innerText(), /Nothing was sent/);
  await page.screenshot({
    path: ".impeccable/review/apex-confirmation-desktop.png",
  });
  for (const slug of ["forme", "apex"]) {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto(`http://127.0.0.1:4173/work/${slug}`, {
      waitUntil: "networkidle",
    });
    assert.equal(
      await page.evaluate(
        () => document.documentElement.scrollWidth > innerWidth,
      ),
      false,
    );
    await page.locator('img[loading="lazy"]').evaluateAll((imgs) =>
      imgs.forEach((img) => {
        img.loading = "eager";
      }),
    );
    await page
      .locator("img")
      .evaluateAll((imgs) =>
        Promise.all(imgs.map((img) => img.decode().catch(() => {}))),
      );
    await page.screenshot({
      path: `.impeccable/review/${slug}-mobile-full.png`,
      fullPage: true,
    });
  }
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.setViewportSize({ width: 1440, height: 1000 });
  for (const slug of ["forme", "apex"]) {
    await page.goto(`http://127.0.0.1:4173/work/${slug}`, {
      waitUntil: "networkidle",
    });
    assert.equal(await page.locator("canvas").count(), 0);
  }
  assert.deepEqual(errors, []);
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await page.goto("http://127.0.0.1:4173/", { waitUntil: "networkidle" });
  await page.waitForTimeout(1000);
  assert.deepEqual(errors, []);
  const fallback = await browser.newContext({
    viewport: { width: 390, height: 844 },
    hasTouch: true,
  });
  await fallback.addInitScript(() =>
    Object.defineProperty(navigator, "connection", {
      value: { saveData: true, effectiveType: "3g" },
      configurable: true,
    }),
  );
  const fp = await fallback.newPage();
  await fp.goto("http://127.0.0.1:4173/work/apex", {
    waitUntil: "networkidle",
  });
  assert.equal(await fp.locator("canvas").count(), 0);
  await fp.goto("http://127.0.0.1:4173/work/forme", {
    waitUntil: "networkidle",
  });
  await fp.locator('[data-floor="4"]').tap();
  assert.equal(
    await fp.locator('[data-floor="4"]').getAttribute("aria-pressed"),
    "true",
  );
  await fallback.close();
  assert.deepEqual(posts, []);
  console.log(
    "PASS: keyboard floor selection, residence selection, both forms, inspector keyboard, mobile overflow, reduced-motion fallbacks, zero POST requests and zero page errors.",
  );
  await browser.close();
})().catch((e) => {
  console.error(e);
  process.exit(1);
});

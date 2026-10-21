import fs from "node:fs";
import assert from "node:assert/strict";
import { gzipSync } from "node:zlib";

const manifest = JSON.parse(
  fs.readFileSync("dist/.vite/manifest.json", "utf8"),
);
function chunks(key, found = new Set()) {
  if (found.has(key)) return found;
  assert.ok(manifest[key], `Missing manifest entry ${key}`);
  found.add(key);
  for (const dependency of manifest[key].imports || [])
    chunks(dependency, found);
  return found;
}
for (const [slug, limit] of [
  ["forme", 350000],
  ["apex", 250000],
]) {
  const name = slug === "forme" ? "Forme" : "Apex";
  const entry = `src/concepts/${slug}/${name}.tsx`;
  const html = fs.readFileSync(`dist/work/${slug}.html`, "utf8");
  assert.match(
    html,
    new RegExp(`${slug.toUpperCase()} is a design concept by NEXUS`),
  );
  assert.ok(
    html.includes(manifest[entry].css[0]),
    "SSR must include concept styles before JS",
  );
  assert.equal(html, fs.readFileSync(`dist/work/${slug}/index.html`, "utf8"));
  const required = chunks(entry);
  if (slug === "forme") chunks("src/concepts/forme/scene.tsx", required);
  const bytes = [...required].reduce(
    (sum, key) =>
      sum + gzipSync(fs.readFileSync(`dist/${manifest[key].file}`)).length,
    0,
  );
  assert.ok(bytes < limit, `${slug} JS ${bytes} exceeds ${limit}`);
  console.log(
    `${slug}: ${(bytes / 1000).toFixed(2)} KB gzip including shared JS`,
  );
}
for (const [tier, limit] of [
  ["desktop", 12000000],
  ["mobile", 5000000],
]) {
  const dir = `public/apex/frames/${tier}`;
  const frames = fs.readdirSync(dir).filter((file) => file.endsWith(".webp"));
  assert.equal(frames.length, 160);
  const bytes = frames.reduce(
    (sum, file) => sum + fs.statSync(`${dir}/${file}`).size,
    0,
  );
  assert.ok(bytes < limit);
  console.log(`${tier}: 160 frames, ${(bytes / 1000000).toFixed(2)} MB`);
}
console.log(
  "PASS: clean-route HTML, first-paint styles, JS and frame budgets.",
);

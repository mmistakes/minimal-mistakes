#!/usr/bin/env node
// capture.mjs — headless screenshot helper for the guide.
//
// Usage:
//   node capture.mjs <html-path> [out.png] [--width=1280] [--height=900]
//
// Dependencies: uses brain's playwright install to avoid a separate setup.
//   PATH should include node_modules/.bin OR run from brain/ dir.

import { createRequire } from "module";
const require = createRequire(import.meta.url);
const { chromium } = require("/Users/jhkim/Programmer/01-comad/comad-world/brain/node_modules/playwright");
import { resolve } from "path";
import { fileURLToPath, pathToFileURL } from "url";

const args = process.argv.slice(2);
if (args.length === 0) {
  console.error("Usage: node capture.mjs <html-path> [out.png] [--width=N] [--height=N]");
  process.exit(1);
}

const htmlPath = resolve(args[0]);
const outPath  = args[1] && !args[1].startsWith("--")
  ? resolve(args[1])
  : htmlPath.replace(/\.html?$/, ".png");

let width = 1280, height = 900;
for (const a of args) {
  const m = a.match(/^--(width|height)=(\d+)$/);
  if (m) (m[1] === "width" ? (width = +m[2]) : (height = +m[2]));
}

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width, height }, deviceScaleFactor: 2 });
await page.goto(pathToFileURL(htmlPath).href, { waitUntil: "networkidle" });
await page.screenshot({ path: outPath, fullPage: false });
await browser.close();

console.log(`✓ ${outPath}`);

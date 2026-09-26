import { readFile } from "node:fs/promises";

const html = await readFile(new URL("../index.html", import.meta.url), "utf8");
const css = await readFile(new URL("../assets/css/style.css", import.meta.url), "utf8");
const failures = [];

const requireMatch = (pattern, message) => {
  if (!pattern.test(html)) failures.push(message);
};

requireMatch(/<video\b/i, "A video element is required.");
requireMatch(/preload="none"/i, "Background video must default to preload=none.");
requireMatch(/playsinline/i, "Background video must use playsinline.");
requireMatch(/data-video-toggle/i, "Accessible video control is required.");
requireMatch(/href="#work"/i, "Real section navigation is required.");
requireMatch(/type="module"/i, "JavaScript must load as a module.");

if (/href=["']#["']/i.test(html)) failures.push("Placeholder href=# links are not allowed.");
if (/<video\\b[^>]*\\sautoplay(?:\\s|=|>)/i.test(html)) failures.push("HTML must not force unconditional autoplay.");
if (/fonts\.googleapis\.com/i.test(css)) failures.push("External font requests are not allowed.");
if (/outline\s*:\s*none/i.test(css)) failures.push("Keyboard focus must remain visible.");

if (failures.length) {
  failures.forEach((failure) => console.error(`[fail] ${failure}`));
  process.exit(1);
}

console.log("[pass] Static media/accessibility checks.");

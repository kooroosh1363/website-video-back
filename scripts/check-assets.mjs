import { stat } from "node:fs/promises";

const limits = [
  ["../assets/video/ambient.mp4", 250_000],
  ["../assets/img/ambient-poster.jpg", 80_000],
];

for (const [relativePath, maxBytes] of limits) {
  const file = new URL(relativePath, import.meta.url);
  const info = await stat(file);

  if (info.size > maxBytes) {
    console.error(`[fail] ${relativePath}: ${info.size} bytes exceeds ${maxBytes}`);
    process.exit(1);
  }

  console.log(`[pass] ${relativePath}: ${info.size} bytes`);
}

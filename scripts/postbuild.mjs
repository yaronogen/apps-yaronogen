/**
 * Runs after `next build`.
 *
 * Next 16's static export writes route-segment prefetch data as nested files
 * (`__next.<seg>/support/__PAGE__.txt`), but the browser requests the flattened name
 * (`__next.<seg>.support.__PAGE__.txt`). Without a server that rewrites URLs (GitHub Pages has
 * none), those requests 404. This writes a flattened copy next to each nested file.
 */
import { copyFileSync, readdirSync, statSync } from "node:fs";
import { join, relative, resolve, sep } from "node:path";

const out = resolve("out");
let copies = 0;

function walk(dir) {
  for (const name of readdirSync(dir)) {
    const path = join(dir, name);
    if (!statSync(path).isDirectory()) continue;
    if (name.startsWith("__next.")) flatten(path, dir);
    else walk(path);
  }
}

function flatten(segmentDir, parent) {
  const files = [];
  const collect = (d) => {
    for (const n of readdirSync(d)) {
      const p = join(d, n);
      if (statSync(p).isDirectory()) collect(p);
      else files.push(p);
    }
  };
  collect(segmentDir);
  for (const file of files) {
    const flat = relative(parent, file).split(sep).join(".");
    copyFileSync(file, join(parent, flat));
    copies++;
  }
}

walk(out);
console.log(`postbuild: wrote ${copies} flattened prefetch file(s)`);

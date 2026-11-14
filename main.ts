// food-picture-01 entry (Node 22, standard library only): the picture is the
// entry.png beside this file, and the program copies it to /output/entry.png.
//
// The picture is a steaming tonkotsu ramen noodle-lift hero shot: black bowl,
// dark walnut wood, warm rim light, jammy egg and glossy noodles — the style
// the judge's own criteria favour (hunger first, then fresh/real texture and
// steam, then styling and light, then clean craft, then reading small).
//
// The gate takes a whole PNG or JPEG of at most 1 MiB and 1024 by 1024 pixels,
// so this program checks the file before it copies it: the first bytes must
// be a JPEG (FF D8 FF) or PNG (89 50 4E 47) signature, and the file must fit
// the size cap. The copy is byte for byte, so two runs write the same bytes.
//
// Outside the grader's container, MAKEFUN_OUTPUT_DIR stands in for /output:
//   mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts

import { copyFileSync, readFileSync, statSync } from 'node:fs';
import { join } from 'node:path';

const MAX_BYTES = 1_048_576;

const source = new URL('./entry.png', import.meta.url);
const bytes = readFileSync(source);

const isJpeg = bytes.length >= 3 && bytes[0] === 0xff && bytes[1] === 0xd8 && bytes[2] === 0xff;
const isPng =
  bytes.length >= 8 &&
  bytes[0] === 0x89 && bytes[1] === 0x50 && bytes[2] === 0x4e && bytes[3] === 0x47 &&
  bytes[4] === 0x0d && bytes[5] === 0x0a && bytes[6] === 0x1a && bytes[7] === 0x0a;
if (!isJpeg && !isPng) {
  throw new Error('entry.png is neither a JPEG nor a PNG (bad magic bytes)');
}
if (bytes.length > MAX_BYTES) {
  throw new Error(`entry.png is ${bytes.length} bytes, over the 1 MiB cap`);
}

const MAX_PIXELS = 1024;

/** Read the image's pixel dimensions from its header: PNG IHDR or JPEG SOF. */
function dimensions() {
  if (isPng) {
    return { width: bytes.readUInt32BE(16), height: bytes.readUInt32BE(20) };
  }
  let offset = 2;
  while (offset + 9 < bytes.length) {
    if (bytes[offset] !== 0xff) throw new Error('entry.png: bad JPEG marker');
    const marker = bytes[offset + 1];
    if (marker === 0xd8 || marker === 0xd9 || (marker >= 0xd0 && marker <= 0xd7)) {
      offset += 2;
      continue;
    }
    const length = bytes.readUInt16BE(offset + 2);
    if (marker === 0xc0 || marker === 0xc1 || marker === 0xc2) {
      return { height: bytes.readUInt16BE(offset + 5), width: bytes.readUInt16BE(offset + 7) };
    }
    offset += 2 + length;
  }
  throw new Error('entry.png: no JPEG size marker found');
}

const { width, height } = dimensions();
if (width > MAX_PIXELS || height > MAX_PIXELS) {
  throw new Error(`entry.png is ${width}x${height}, over the 1024x1024 cap`);
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';
const outPath = join(outDir, 'entry.png');
copyFileSync(source, outPath);
const copied = statSync(outPath).size;
if (copied !== bytes.length) {
  throw new Error(`copied ${copied} bytes, expected ${bytes.length}`);
}
process.stdout.write(`[entry] copied ${copied} bytes (${isJpeg ? 'JPEG' : 'PNG'} ${width}x${height}) to ${outPath}\n`);

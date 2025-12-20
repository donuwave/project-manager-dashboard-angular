import fs from "node:fs";
import path from "node:path";
import svgstore from "svgstore";

const iconsDir = path.resolve("src/assets/icons");
const outFile = path.resolve("src/assets/sprite.svg");

const sprites = svgstore({ inline: true });

const files = fs.readdirSync(iconsDir).filter(f => f.endsWith(".svg"));

for (const file of files) {
  const name = path.basename(file, ".svg");
  const svg = fs.readFileSync(path.join(iconsDir, file), "utf8");
  sprites.add(name, svg);
}

fs.mkdirSync(path.dirname(outFile), { recursive: true });
let out = sprites.toString({ inline: true });
out = out.replace(
  /^<svg\b(?![^>]*\bxmlns=)/,
  '<svg xmlns="http://www.w3.org/2000/svg"'
);

fs.writeFileSync(outFile, out);

console.log(`✅ sprite generated: ${outFile} (${files.length} icons)`);

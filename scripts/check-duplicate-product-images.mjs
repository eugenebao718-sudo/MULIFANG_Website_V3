import { createHash } from "node:crypto";
import { existsSync, readFileSync, readdirSync } from "node:fs";
import { dirname, extname, join, relative } from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const projectRoot = join(dirname(fileURLToPath(import.meta.url)), "..");
const publicRoot = join(projectRoot, "public");
const dataFile = join(projectRoot, "data", "products.ts");
const source = readFileSync(dataFile, "utf8");

const products = [];
const launchPattern = /launch\(\{[^}]*?code:\s*"([^"]+)"[^}]*?name:\s*"([^"]+)"/g;
const customPattern = /custom\((\d+),\s*"[^"]+",\s*"([^"]+)"/g;

for (const match of source.matchAll(launchPattern)) {
  const [, code, name] = match;
  const root = `/images/products/launch-collection-2026/${code.toLowerCase()}`;
  products.push({ code, name, mainImage: `${root}/main.webp`, gallery: [`${root}/main.webp`, `${root}/gallery-01.webp`], explodedViewImage: `${root}/exploded-view.webp` });
}

for (const match of source.matchAll(customPattern)) {
  const [, number, name] = match;
  const code = `MF-CUS-${number.padStart(3, "0")}`;
  const root = `/images/products/${code.toLowerCase()}`;
  products.push({ code, name, mainImage: `${root}/main.webp`, gallery: [`${root}/main.webp`], explodedViewImage: `${root}/exploded-view.webp` });
}

const groupBy = (items, key) => {
  const groups = new Map();
  for (const item of items) {
    const value = item[key];
    if (!groups.has(value)) groups.set(value, []);
    groups.get(value).push(item);
  }
  return [...groups.entries()].filter(([, group]) => group.length > 1);
};

const fileFor = (webPath) => join(publicRoot, webPath.replace(/^\/+/, ""));
const hashFile = (file) => createHash("sha256").update(readFileSync(file)).digest("hex");
const placeholderFile = join(publicRoot, "images", "products", "image-coming-soon.webp");
const placeholderHash = existsSync(placeholderFile) ? hashFile(placeholderFile) : null;

const walk = (directory) => readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
  const path = join(directory, entry.name);
  return entry.isDirectory() ? walk(path) : [path];
});
const imageExtensions = new Set([".avif", ".gif", ".heic", ".jpeg", ".jpg", ".png", ".svg", ".webp"]);
const allImageFiles = walk(join(publicRoot, "images")).filter((file) => imageExtensions.has(extname(file).toLowerCase()));
const referencedImages = new Set(products.flatMap((item) => [item.mainImage, item.explodedViewImage, ...item.gallery]));
referencedImages.add("/images/products/image-coming-soon.webp"); // Master used to detect intentional placeholder copies.
for (const folder of ["app", "components", "data"]) {
  for (const file of walk(join(projectRoot, folder)).filter((path) => /\.(?:css|ts|tsx)$/.test(path))) {
    for (const match of readFileSync(file, "utf8").matchAll(/\/images\/[A-Za-z0-9_./&+()-]+\.(?:avif|gif|heic|jpeg|jpg|png|svg|webp)/gi)) referencedImages.add(match[0]);
  }
}
for (const path of [
  "/images/factory/cnc-cutting.webp", "/images/factory/edge-banding.webp", "/images/factory/machining.webp", "/images/factory/dust-collection.webp",
  "/images/projects/kitchen-project.webp", "/images/projects/hallway-project.webp", "/images/projects/wardrobe-project.webp",
  "/images/projects/villa-concept-01.webp", "/images/projects/villa-concept-02.webp", "/images/projects/villa-concept-03.webp",
]) referencedImages.add(path);
const unusedImages = allImageFiles.filter((file) => !referencedImages.has(`/${relative(publicRoot, file)}`));
const allAssetHashes = allImageFiles.map((file) => ({ file, hash: hashFile(file) }));
const duplicateAssetContent = groupBy(allAssetHashes, "hash");

const missingFields = products.filter((item) => !item.mainImage || !item.explodedViewImage || item.gallery.length === 0);
const duplicatePaths = groupBy(products, "mainImage");
const missingFiles = [];
const mainFiles = [];

for (const product of products) {
  const references = [product.mainImage, product.explodedViewImage, ...product.gallery];
  for (const reference of new Set(references)) {
    if (!existsSync(fileFor(reference))) missingFiles.push({ ...product, reference });
  }
  const mainFile = fileFor(product.mainImage);
  if (existsSync(mainFile)) mainFiles.push({ ...product, hash: hashFile(mainFile) });
}

const placeholderProducts = mainFiles.filter((item) => item.hash === placeholderHash);
const realMainFiles = mainFiles.filter((item) => item.hash !== placeholderHash);
const duplicateContent = groupBy(realMainFiles, "hash");
const differenceHash = async (file) => {
  const { data } = await sharp(file).resize(9, 8, { fit: "fill" }).greyscale().raw().toBuffer({ resolveWithObject: true });
  let hash = 0n;
  for (let y = 0; y < 8; y += 1) for (let x = 0; x < 8; x += 1) {
    hash = (hash << 1n) | (data[y * 9 + x] > data[y * 9 + x + 1] ? 1n : 0n);
  }
  return hash;
};
const hammingDistance = (left, right) => {
  let value = left ^ right, count = 0;
  while (value) { count += Number(value & 1n); value >>= 1n; }
  return count;
};
const visualMainFiles = await Promise.all(realMainFiles.map(async item => ({ ...item, visualHash: await differenceHash(fileFor(item.mainImage)) })));
const nearDuplicateMainImages = [];
for (let i = 0; i < visualMainFiles.length; i += 1) for (let j = i + 1; j < visualMainFiles.length; j += 1) {
  const distance = hammingDistance(visualMainFiles[i].visualHash, visualMainFiles[j].visualHash);
  if (distance <= 4) nearDuplicateMainImages.push({ left: visualMainFiles[i], right: visualMainFiles[j], distance });
}
const expectedCount = 47;
const countError = products.length !== expectedCount;

console.log("MULIFANG product image audit");
console.log("================================");
console.log(`Products scanned: ${products.length} (${products.filter((p) => p.code.startsWith("MF-CUS-")).length} custom + ${products.filter((p) => !p.code.startsWith("MF-CUS-")).length} launch)`);
console.log(`Duplicate main-image paths: ${duplicatePaths.length}`);
console.log(`Duplicate real main-image files: ${duplicateContent.length}`);
console.log(`Perceptually near-duplicate main-image pairs: ${nearDuplicateMainImages.length}`);
console.log(`Missing image data fields: ${missingFields.length}`);
console.log(`Referenced files not found: ${missingFiles.length}`);
console.log(`Image Coming Soon placeholders: ${placeholderProducts.length}`);
console.log(`Duplicate image asset groups (including intentional placeholders): ${duplicateAssetContent.length}`);
console.log(`Unused public image files: ${unusedImages.length}`);

if (duplicatePaths.length) {
  console.log("\nDuplicate main-image paths:");
  for (const [image, group] of duplicatePaths) console.log(`- ${image}: ${group.map((item) => item.code).join(", ")}`);
}

if (duplicateContent.length) {
  console.log("\nByte-identical real main images:");
  for (const [, group] of duplicateContent) console.log(`- ${group.map((item) => `${item.code} (${item.name})`).join(" | ")}`);
}

if (nearDuplicateMainImages.length) {
  console.log("\nPerceptually near-duplicate main images:");
  for (const pair of nearDuplicateMainImages) console.log(`- ${pair.left.code} | ${pair.right.code} (distance ${pair.distance})`);
}

if (missingFields.length) {
  console.log("\nProducts with missing image fields:");
  for (const item of missingFields) console.log(`- ${item.code} (${item.name})`);
}

if (missingFiles.length) {
  console.log("\nReferenced files that do not exist:");
  for (const item of missingFiles) console.log(`- ${item.code}: ${item.reference}`);
}

if (placeholderProducts.length) {
  console.log("\nProducts awaiting independent real photography:");
  for (const item of placeholderProducts) console.log(`- ${item.code} — ${item.name}`);
}

if (duplicateAssetContent.length) {
  console.log("\nDuplicate asset groups for manual review:");
  for (const [, group] of duplicateAssetContent) console.log(`- ${group.map((item) => `/${relative(publicRoot, item.file)}`).join(" | ")}`);
}

if (unusedImages.length) {
  console.log("\nUnused public image files (not shipped into any rendered page reference):");
  for (const file of unusedImages) console.log(`- /${relative(publicRoot, file)}`);
}

const failed = countError || duplicatePaths.length > 0 || duplicateContent.length > 0 || nearDuplicateMainImages.length > 0 || missingFields.length > 0 || missingFiles.length > 0;
if (countError) console.error(`\nExpected ${expectedCount} products but parsed ${products.length}. Update this audit parser when the data structure changes.`);

if (failed) {
  console.error("\n❌ check:images failed.");
  process.exitCode = 1;
} else {
  console.log("\n✅ check:images passed. All product main-image paths are unique and every referenced file exists.");
}

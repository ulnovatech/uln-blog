// netlify/functions/optimize.js
const fs = require("fs").promises;
const path = require("path");
const matter = require("gray-matter");
const sharp = require("sharp");

// Root paths (runtime working directory)
const PROJECT_ROOT = process.cwd();
const POSTS_DIR = path.join(PROJECT_ROOT, "content", "posts");
const PUBLIC_RAW = path.join(PROJECT_ROOT, "public"); // to resolve absolute public paths
const OUTPUT_BASE = path.join(PROJECT_ROOT, "public", "images", "optimized", "posts");

function extractImagePaths(markdown, postDir = "") {
  const regex = /!\[([^\]]*)\]\(([^)]+)\)/g;
  const images = [];
  let m;
  while ((m = regex.exec(markdown)) !== null) {
    let src = m[2].trim();
    // normalize relative to postDir if not absolute
    if (!src.startsWith("/")) {
      src = path.join("/content/posts", postDir, src).replace(/\\/g, "/");
    }
    images.push({ src, alt: m[1] || "" });
  }
  return images;
}

async function readSourceImageBuffer(src, postDir = "") {
  // Try absolute path (starting with /)
  try {
    if (src.startsWith("/")) {
      const candidate = path.join(PROJECT_ROOT, src);
      const buf = await fs.readFile(candidate);
      return buf;
    }
  } catch (e) { /* ignore */ }

  // If relative path inside content/posts, try that
  try {
    const rel = path.join(PROJECT_ROOT, "content", "posts", postDir, src);
    const buf = await fs.readFile(rel);
    return buf;
  } catch (e) { /* ignore */ }

  // try inside public (uploads)
  try {
    const pub = path.join(PROJECT_ROOT, "public", src.replace(/^\/+/, ""));
    const buf = await fs.readFile(pub);
    return buf;
  } catch (e) { /* ignore */ }

  // not found
  throw new Error("Source image not found: " + src);
}

async function processSingleImageBuffer(buf, outDir, baseName, options) {
  await fs.mkdir(outDir, { recursive: true });
  const sizes = options.sizes || [400, 800, 1200];
  const formats = options.formats || ["webp", "jpg"];
  const quality = options.quality || 80;
  const coverCrop = !!options.coverCrop;

  const results = [];
  const meta = await sharp(buf).metadata().catch(() => ({}));
  for (const w of sizes) {
    const width = meta.width ? Math.min(w, meta.width) : w;
    for (const fmt of formats) {
      const outName = `${baseName}-${width}w.${fmt}`;
      const outPath = path.join(outDir, outName);
      let pipeline = sharp(buf).rotate();
      if (coverCrop) {
        // simple cover-ish behavior: maintain aspect ratio approx 16:9 at target width
        pipeline = pipeline.resize(width, Math.round(width * 9 / 16), { fit: "cover" });
      } else {
        pipeline = pipeline.resize(width);
      }

      if (fmt === "webp") pipeline = pipeline.webp({ quality });
      else if (fmt === "avif") pipeline = pipeline.avif({ quality });
      else if (fmt === "jpg" || fmt === "jpeg") pipeline = pipeline.jpeg({ quality });
      else if (fmt === "png") pipeline = pipeline.png();

      await pipeline.toFile(outPath);
      results.push({ name: outName, path: outPath });
    }
  }
  return results;
}

exports.handler = async function (event, context) {
  try {
    if (event.httpMethod !== "POST") {
      return { statusCode: 405, body: "Method not allowed" };
    }
    const { slug, settings = {} } = JSON.parse(event.body || "{}");
    if (!slug) return { statusCode: 400, body: "Missing slug" };

    const mdPath = path.join(POSTS_DIR, `${slug}.md`);
    const raw = await fs.readFile(mdPath, "utf8");
    const { data: fm, content } = matter(raw);
    const postDir = path.dirname(`${slug}.md`) === "." ? "" : path.dirname(`${slug}.md`);

    const images = extractImagePaths(content, postDir);

    const outDir = path.join(OUTPUT_BASE, slug);
    await fs.mkdir(outDir, { recursive: true });

    const messages = [];
    const tree = [];

    // include cover if frontmatter.cover exists
    if (fm?.cover) {
      images.unshift({ src: fm.cover, alt: fm.title || "cover", role: "cover" });
    }

    for (let i = 0; i < images.length; i++) {
      const img = images[i];
      try {
        messages.push(`Reading ${img.src}`);
        const buf = await readSourceImageBuffer(img.src, postDir);
        messages.push(`Processing ${img.src}`);
        const baseName = `${slug}-${i + 1}`;
        const out = await processSingleImageBuffer(buf, outDir, baseName, settings);
        tree.push({ name: `${baseName}`, children: out.map(o => ({ name: o.name })) });
        messages.push(`Done ${img.src} -> ${out.length} files`);
      } catch (err) {
        messages.push(`Error ${img.src}: ${err.message}`);
      }
    }

    // write manifest
    const manifest = { slug, generatedAt: new Date().toISOString(), tree };
    await fs.writeFile(path.join(outDir, "manifest.json"), JSON.stringify(manifest, null, 2), "utf8");

    return {
      statusCode: 200,
      body: JSON.stringify({ success: true, messages, tree }),
    };
  } catch (err) {
    console.error(err);
    return { statusCode: 500, body: String(err.message || err) };
  }
};

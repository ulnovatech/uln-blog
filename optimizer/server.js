// optimizer/server.js
import express from "express";
import multer from "multer";
import sharp from "sharp";
import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 5001;

app.use(express.json());

// 🔹 Upload setup
const upload = multer({ dest: "optimizer/uploads/" });

// 🔹 Ensure directory exists
const ensureDir = (dir) => {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
};

// =============== ARTICLES ===============

// 🔹 Get all articles (from /content/posts/*.md)
app.get("/api/articles", (req, res) => {
  try {
    const postsDir = path.resolve(__dirname, "../content/posts"); // ✅ fixed
    console.log("📂 Looking for posts in:", postsDir);

    if (!fs.existsSync(postsDir)) {
      console.error("❌ Posts directory not found:", postsDir);
      return res.status(500).json({ error: "Posts directory not found" });
    }

    const files = fs.readdirSync(postsDir).filter(f => f.endsWith(".md"));
    console.log("📝 Found files:", files);

    const articles = files.map(file => {
      try {
        const raw = fs.readFileSync(path.join(postsDir, file), "utf-8");
        const { data } = matter(raw);

        return {
          slug: data?.slug || file.replace(/\.md$/, ""),
          title: data?.title || "Untitled",
          cover: data?.cover || null,
        };
      } catch (err) {
        console.error(`⚠️ Failed parsing ${file}:`, err.message);
        return {
          slug: file.replace(/\.md$/, ""),
          title: "Error reading file",
          cover: null,
        };
      }
    });

    res.json(articles);
  } catch (err) {
    console.error("❌ Error in /api/articles:", err.message);
    res.status(500).json({ error: err.message });
  }
});

// =============== IMAGES ===============

app.get("/api/articles/:slug/images", (req, res) => {
  const { slug } = req.params;
  const dir = path.join("optimizer/uploads", slug);

  if (!fs.existsSync(dir)) return res.json([]);

  const files = fs.readdirSync(dir).filter((f) => /\.(png|jpe?g|webp)$/i.test(f));

  res.json(
    files.map((file) => ({
      name: file,
      url: `/uploads/${slug}/${file}`,
    }))
  );
});

app.post("/api/articles/:slug/upload", upload.single("image"), (req, res) => {
  const { slug } = req.params;
  const dir = path.join("optimizer/uploads", slug);
  ensureDir(dir);

  const destPath = path.join(dir, req.file.originalname);
  fs.renameSync(req.file.path, destPath);

  res.json({ success: true, filename: req.file.originalname });
});

app.post("/api/articles/:slug/rename", (req, res) => {
  const { slug } = req.params;
  const { oldName, newName } = req.body;

  const dir = path.join("optimizer/uploads", slug);
  const oldPath = path.join(dir, oldName);
  const newPath = path.join(dir, newName);

  if (!fs.existsSync(oldPath)) return res.status(404).send("File not found");

  fs.renameSync(oldPath, newPath);

  const files = fs.readdirSync(dir).filter((f) => /\.(png|jpe?g|webp)$/i.test(f));

  res.json({
    success: true,
    updated: files.map((file) => ({ name: file, url: `/uploads/${slug}/${file}` })),
  });
});

// =============== OPTIMIZATION ===============

const sizes = [400, 700, 1200];
const optimizeOne = async (inputPath, outputDir, filename) => {
  const nameNoExt = path.parse(filename).name;
  const results = [];

  for (const size of sizes) {
    const outPath = path.join(outputDir, `${nameNoExt}-${size}.webp`);
    await sharp(inputPath)
      .resize({ width: size })
      .toFormat("webp", { quality: 80 })
      .toFile(outPath);

    results.push(`/images/optimized/${path.basename(outputDir)}/${nameNoExt}-${size}.webp`);
  }

  return results;
};

app.post("/api/articles/:slug/optimize", async (req, res) => {
  const { slug } = req.params;
  const { filename } = req.body;

  const inputPath = path.join("optimizer/uploads", slug, filename);
  const outputDir = path.join("public/images/optimized", slug);
  ensureDir(outputDir);

  try {
    const results = await optimizeOne(inputPath, outputDir, filename);
    res.json({ success: true, outputs: results });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: err.message });
  }
});

app.post("/api/articles/:slug/optimize-all", async (req, res) => {
  const { slug } = req.params;
  const dir = path.join("optimizer/uploads", slug);
  const outputDir = path.join("public/images/optimized", slug);
  ensureDir(outputDir);

  if (!fs.existsSync(dir)) return res.json({ success: true, outputs: [] });

  const files = fs.readdirSync(dir).filter((f) => /\.(png|jpe?g|webp)$/i.test(f));
  const allResults = [];

  try {
    for (const file of files) {
      const inputPath = path.join(dir, file);
      const results = await optimizeOne(inputPath, outputDir, file);
      allResults.push({ file, outputs: results });
    }

    res.json({ success: true, outputs: allResults });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: err.message });
  }
});

// =============== START SERVER ===============
app.listen(PORT, () => {
  console.log(`🚀 Optimizer backend running at http://localhost:${PORT}`);
});

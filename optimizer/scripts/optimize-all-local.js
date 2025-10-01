// optimizer/scripts/optimize-all-local.js
// Run this locally (node optimizer/scripts/optimize-all-local.js) from project root
const path = require("path");
const glob = require("glob");
const fs = require("fs").promises;
const optimizeFn = require("../../netlify/functions/optimize").handler;

(async () => {
  const postsDir = path.join(process.cwd(), "content", "posts");
  const files = glob.sync("**/*.md", { cwd: postsDir });
  console.log(`Found ${files.length} posts, optimizing locally...`);
  for (const f of files) {
    const slug = f.replace(/\.md$/, "");
    console.log("Optimizing:", slug);
    // emulate event
    const ev = { httpMethod: "POST", body: JSON.stringify({ slug, settings: { sizes: [400,800,1200], formats: ["webp","jpg"], quality: 80 } }) };
    const res = await optimizeFn(ev, {});
    if (res.statusCode === 200) {
      const payload = JSON.parse(res.body);
      console.log(`Done ${slug}:`, payload.messages || []);
    } else {
      console.error(`Failed ${slug}:`, res.body);
    }
  }
  console.log("All done.");
})();

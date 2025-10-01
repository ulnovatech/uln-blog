// netlify/functions/optimize-all.js
const fs = require("fs").promises;
const path = require("path");
const glob = require("glob");
const { handler: optimizeHandler } = require("./optimize"); // reuse optimize logic (works in same env)

exports.handler = async function (event, context) {
  try {
    if (event.httpMethod !== "POST") return { statusCode: 405, body: "Method not allowed" };
    const { settings = {} } = JSON.parse(event.body || "{}");

    // get list of md files
    const postsDir = path.join(process.cwd(), "content", "posts");
    const files = glob.sync("**/*.md", { cwd: postsDir });
    const messages = [];
    const tree = [];

    // Run sequentially; each call may be heavy — risk of timing out on Netlify free
    for (const f of files) {
      const slug = f.replace(/\.md$/, "");
      messages.push(`Starting ${slug}`);
      // call optimize handler but emulate event body
      const ev = { httpMethod: "POST", body: JSON.stringify({ slug, settings }) };
      const res = await optimizeHandler(ev, context);
      if (res.statusCode === 200) {
        const payload = JSON.parse(res.body);
        messages.push(...(payload.messages || []));
        tree.push({ slug, tree: payload.tree || [] });
      } else {
        messages.push(`Failed ${slug}: ${res.body}`);
      }
    }

    return { statusCode: 200, body: JSON.stringify({ success: true, messages, tree }) };
  } catch (err) {
    console.error(err);
    return { statusCode: 500, body: String(err.message || err) };
  }
};

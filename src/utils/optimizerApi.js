// src/utils/optimizerApi.js

// 🔹 Fetch all articles
export async function fetchArticles() {
  const res = await fetch("/api/articles");
  if (!res.ok) return [];
  return await res.json();
}

// 🔹 Fetch images for an article
export async function fetchArticleImages(slug) {
  const res = await fetch(`/api/articles/${slug}/images`);
  if (!res.ok) return [];
  return await res.json();
}

// 🔹 Upload image
export async function uploadImage(slug, file) {
  const formData = new FormData();
  formData.append("image", file);

  const res = await fetch(`/api/articles/${slug}/upload`, {
    method: "POST",
    body: formData,
  });
  if (!res.ok) throw new Error(await res.text());
  return await res.json();
}

// 🔹 Optimize all images for an article
export async function optimizeArticle(slug) {
  const res = await fetch(`/api/articles/${slug}/optimize-all`, {
    method: "POST",
  });
  if (!res.ok) throw new Error(await res.text());
  return await res.json();
}

// 🔹 Rename an image
export async function renameImage(slug, oldName, newName) {
  const res = await fetch(`/api/articles/${slug}/rename`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ oldName, newName }),
  });
  if (!res.ok) throw new Error(await res.text());
  return await res.json();
}

// 🔹 Optimize one image
export async function optimizeImage(slug, filename) {
  const res = await fetch(`/api/articles/${slug}/optimize`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ filename }),
  });
  if (!res.ok) throw new Error(await res.text());
  return await res.json();
}

import { getDb, setCors } from "../_lib/db.js";

export default async function handler(req, res) {
  setCors(res);
  if (req.method === "OPTIONS") return res.status(200).end();

  if (req.method !== "GET") {
    res.setHeader("Allow", "GET,OPTIONS");
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const db = await getDb();
    const products = db.collection("products");

    const list = await products
      .find({ isTopSelling: true })
      .sort({ createdAt: -1 })
      .toArray();

    return res.status(200).json(list);
  } catch (err) {
    console.error("Top selling API error:", err);
    return res.status(500).json({ error: "Server error", details: err.message });
  }
}
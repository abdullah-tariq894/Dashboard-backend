import { getDb, setCors } from "../_lib/db.js";

export default async function handler(req, res) {
  setCors(res);
  if (req.method === "OPTIONS") return res.status(200).end();

  try {
    const db = await getDb();
    const products = db.collection("products");

    if (req.method === "GET") {
      const list = await products.find({}).sort({ createdAt: -1 }).toArray();
      return res.status(200).json(list);
    }

    if (req.method === "POST") {
      const { name, description, price, image, isNewArrival, isTopSelling } = req.body || {};

      if (!name || !String(name).trim()) {
        return res.status(400).json({ error: "Product name is required." });
      }

      const doc = {
        name: String(name).trim(),
        description: description ? String(description) : "",
        price: price !== undefined ? price : "",
        image: image ? String(image) : "",
        isNewArrival: Boolean(isNewArrival),
        isTopSelling: Boolean(isTopSelling),
        createdAt: new Date(),
      };

      const result = await products.insertOne(doc);
      return res.status(201).json({ ...doc, _id: result.insertedId });
    }

    res.setHeader("Allow", "GET,POST,OPTIONS");
    return res.status(405).json({ error: "Method not allowed" });
  } catch (err) {
    console.error("Products API error:", err);
    return res.status(500).json({ error: "Server error", details: err.message });
  }
}
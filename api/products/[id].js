import { ObjectId } from "mongodb";
import { getDb, setCors } from "../_lib/db.js";

export default async function handler(req, res) {
  setCors(res);
  if (req.method === "OPTIONS") return res.status(200).end();

  const { id } = req.query;
  if (!id || !ObjectId.isValid(id)) {
    return res.status(400).json({ error: "Invalid product id" });
  }

  try {
    const db = await getDb();
    const products = db.collection("products");
    const _id = new ObjectId(id);

    if (req.method === "GET") {
      const doc = await products.findOne({ _id });
      if (!doc) return res.status(404).json({ error: "Product not found" });
      return res.status(200).json(doc);
    }

    if (req.method === "PUT") {
      const { name, description, price, image } = req.body || {};
      const update = {};
      if (name !== undefined) update.name = String(name).trim();
      if (description !== undefined) update.description = String(description);
      if (price !== undefined) update.price = price;
      if (image !== undefined) update.image = String(image);

      const result = await products.findOneAndUpdate(
        { _id },
        { $set: update },
        { returnDocument: "after" }
      );
      if (!result.value) return res.status(404).json({ error: "Product not found" });
      return res.status(200).json(result.value);
    }

    if (req.method === "DELETE") {
      const result = await products.deleteOne({ _id });
      if (result.deletedCount === 0) {
        return res.status(404).json({ error: "Product not found" });
      }
      return res.status(200).json({ success: true, deletedId: id });
    }

    res.setHeader("Allow", "GET,PUT,DELETE,OPTIONS");
    return res.status(405).json({ error: "Method not allowed" });
  } catch (err) {
    console.error("Product [id] API error:", err);
    return res.status(500).json({ error: "Server error", details: err.message });
  }
}

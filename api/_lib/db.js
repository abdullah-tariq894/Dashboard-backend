import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI;
const dbName = process.env.MONGODB_DB || "shopco_admin";

// Reuse the client/connection across warm serverless invocations instead of
// opening a new one on every request.
let cachedClient = globalThis._mongoClient || null;
let cachedDb = globalThis._mongoDb || null;

export async function getDb() {
  if (cachedDb) return cachedDb;

  if (!uri) {
    throw new Error(
      "MONGODB_URI environment variable is not set. Add it in your Vercel project settings."
    );
  }

  if (!cachedClient) {
    cachedClient = new MongoClient(uri);
    await cachedClient.connect();
    globalThis._mongoClient = cachedClient;
  }

  cachedDb = cachedClient.db(dbName);
  globalThis._mongoDb = cachedDb;
  return cachedDb;
}

export function setCors(res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
}

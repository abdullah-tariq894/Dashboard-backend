// seed-products.js
// Ye script 12 generic clothing products ek saath MongoDB mein daal deta hai.
//
// SETUP (ek baar):
//   1. Is file ko apne shop_co_admin_backend project ke root folder mein rakho
//      (jahan package.json hai).
//   2. Terminal mein chalao: npm install mongodb --save-dev
//   3. Apna MONGODB_URI (wahi jo Vercel env variables mein hai) neeche set karo,
//      ya terminal mein chalane se pehle set karo (dono tareeqe neeche hain).
//
// CHALANE KA TAREEQA:
//   Option A) Seedha terminal mein URI ke saath (PowerShell):
//     $env:MONGODB_URI="yahan_apna_connection_string_paste_karo"; node seed-products.js
//
//   Option B) Is file ke andar neeche MONGODB_URI variable mein seedha paste kar do,
//     phir bas: node seed-products.js

import { MongoClient } from "mongodb";

// Agar terminal se env variable set nahi karna chahte, to seedha yahan paste kar do:
const MONGODB_URI = process.env.MONGODB_URI || "PASTE_YOUR_MONGODB_URI_HERE";
const DB_NAME = process.env.MONGODB_DB || "shopco_admin";

const products = [
  {
    name: "Classic White T-Shirt",
    description: "100% cotton, breathable everyday t-shirt.",
    price: 25,
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500",
    isNewArrival: true,
    isTopSelling: true,
  },
  {
    name: "Black Skinny Fit Jeans",
    description: "Stretch denim, slim fit, all-day comfort.",
    price: 65,
    image: "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=500",
    isNewArrival: true,
    isTopSelling: false,
  },
  {
    name: "Grey Pullover Hoodie",
    description: "Soft fleece hoodie with kangaroo pocket.",
    price: 55,
    image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=500",
    isNewArrival: true,
    isTopSelling: true,
  },
  {
    name: "Formal Blue Shirt",
    description: "Slim fit formal shirt, easy-iron fabric.",
    price: 45,
    image: "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=500",
    isNewArrival: false,
    isTopSelling: true,
  },
  {
    name: "Denim Jacket",
    description: "Classic blue denim jacket, unisex fit.",
    price: 85,
    image: "https://images.unsplash.com/photo-1495105787522-5334e3ffa0ef?w=500",
    isNewArrival: true,
    isTopSelling: false,
  },
  {
    name: "Cargo Shorts",
    description: "Khaki cargo shorts with multiple pockets.",
    price: 35,
    image: "https://images.unsplash.com/photo-1591195853828-11db59a44f6b?w=500",
    isNewArrival: false,
    isTopSelling: false,
  },
  {
    name: "Striped Polo Shirt",
    description: "Cotton pique polo with classic stripes.",
    price: 38,
    image: "https://images.unsplash.com/photo-1571945153237-4929e783af4a?w=500",
    isNewArrival: false,
    isTopSelling: true,
  },
  {
    name: "Track Pants",
    description: "Lightweight joggers, perfect for gym or casual wear.",
    price: 42,
    image: "https://images.unsplash.com/photo-1552902865-b72c031ac5ea?w=500",
    isNewArrival: true,
    isTopSelling: false,
  },
  {
    name: "Leather Jacket",
    description: "Faux leather biker jacket, black.",
    price: 120,
    image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=500",
    isNewArrival: false,
    isTopSelling: true,
  },
  {
    name: "Casual Chinos",
    description: "Slim fit chino pants, beige.",
    price: 48,
    image: "https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=500",
    isNewArrival: false,
    isTopSelling: false,
  },
  {
    name: "Sports Zip-Up Jacket",
    description: "Athletic zip jacket, moisture-wicking fabric.",
    price: 58,
    image: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=500",
    isNewArrival: true,
    isTopSelling: true,
  },
  {
    name: "Party Blazer",
    description: "Slim fit blazer for formal occasions.",
    price: 95,
    image: "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=500",
    isNewArrival: false,
    isTopSelling: false,
  },
];

async function run() {
  if (!MONGODB_URI || MONGODB_URI === "PASTE_YOUR_MONGODB_URI_HERE") {
    console.error(
      "\n❌ MONGODB_URI set nahi hai. Is file ke upar wala comment padho, connection string set karo, phir dobara chalao.\n"
    );
    process.exit(1);
  }

  const client = new MongoClient(MONGODB_URI);

  try {
    await client.connect();
    const db = client.db(DB_NAME);
    const collection = db.collection("products");

    const docs = products.map((p) => ({ ...p, createdAt: new Date() }));
    const result = await collection.insertMany(docs);

    console.log(`\n✅ ${result.insertedCount} products successfully add ho gaye!\n`);
  } catch (err) {
    console.error("\n❌ Error aaya:", err.message, "\n");
  } finally {
    await client.close();
  }
}

run();
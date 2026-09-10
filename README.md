# Shop Co — Admin Products Backend

A tiny backend just for the Admin panel's Add/Remove Product feature, backed
by a real MongoDB database, so products actually persist and delete for
everyone (not just in one browser).

This does **not** replace your existing storefront backend
(`shop-co-backend-sigma.vercel.app`) — that one keeps powering Search, New
Arrivals, Top Selling, Product Detail, and Reviews exactly as it does today.
This new backend is only for the Admin → Products page.

## Endpoints

- `GET /api/products` — list all products
- `POST /api/products` — create a product (`{ name, description, price, image }`)
- `GET /api/products/:id` — get one product
- `PUT /api/products/:id` — update a product
- `DELETE /api/products/:id` — delete a product

## 1. Create a free MongoDB database

1. Go to https://www.mongodb.com/cloud/atlas/register and sign up (free).
2. Create a free **M0** cluster (any provider/region is fine).
3. Under **Database Access**, create a database user with a username and password (save them).
4. Under **Network Access**, add `0.0.0.0/0` (allow access from anywhere) so Vercel can connect.
5. Click **Connect → Drivers**, copy the connection string. It looks like:
   ```
   mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority
   ```
   Replace `<username>` and `<password>` with the ones you created.

## 2. Deploy this backend to Vercel

1. Push this folder to a new GitHub repo (or use the Vercel CLI: `vercel deploy` from inside this folder).
2. In the Vercel dashboard, **Add New Project** → import that repo.
3. Before deploying, go to **Settings → Environment Variables** and add:
   - `MONGODB_URI` = the connection string from step 1 (paste it in, don't add extra quotes)
   - `MONGODB_DB` = `shopco_admin` (optional, this is the default anyway)
4. Deploy. You'll get a URL like `https://shop-co-admin-backend.vercel.app`.
5. Test it by opening `https://your-new-url.vercel.app/api/products` in the browser — it should return `[]` (empty list, since no products yet).

## 3. Point the frontend at it

In `src/pages/Admin/Products/AdminProducts.jsx`, change this line near the top:

```js
const API_BASE = "https://your-new-backend.vercel.app/api/products";
```

to your actual deployed URL from step 4 above, then redeploy/restart the frontend.

That's it — Add and Remove on the Admin Products page will now really save to
and delete from your own database.

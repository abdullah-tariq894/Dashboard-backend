export default function handler(req, res) {
  res.status(200).json({
    status: "ok",
    message: "Shop Co Admin backend is running.",
    endpoints: {
      list: "GET /api/products",
      create: "POST /api/products",
      getOne: "GET /api/products/:id",
      update: "PUT /api/products/:id",
      remove: "DELETE /api/products/:id",
    },
  });
}

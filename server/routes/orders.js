const express = require("express");
const db = require("../database");
const { requireAdmin } = require("../middleware/authMiddleware");
const router = express.Router();

router.post("/", async (req, res) => {
  const { customer_name, customer_email, customer_phone, delivery_address, items } = req.body;

  if (!customer_name || !customer_email || !customer_phone || !delivery_address || !items?.length) {
    return res.status(400).json({ message: "Please complete all checkout details." });
  }

  const connection = await db.getConnection();
  try {
    await connection.beginTransaction();
    let total = 0;
    const detailedItems = [];

    for (const item of items) {
      const [rows] = await connection.query("SELECT * FROM products WHERE id=?", [item.product_id]);
      if (!rows.length) throw new Error("Product not found.");
      const product = rows[0];
      if (product.stock < item.quantity) throw new Error(`${product.name} is out of stock.`);
      total += Number(product.price) * item.quantity;
      detailedItems.push({ ...product, quantity: item.quantity });
    }

    const [orderResult] = await connection.query(
      "INSERT INTO orders (customer_name,customer_email,customer_phone,delivery_address,total_amount) VALUES (?,?,?,?,?)",
      [customer_name, customer_email, customer_phone, delivery_address, total]
    );

    for (const item of detailedItems) {
      await connection.query(
        "INSERT INTO order_items (order_id,product_id,product_name,quantity,unit_price) VALUES (?,?,?,?,?)",
        [orderResult.insertId, item.id, item.name, item.quantity, item.price]
      );
      await connection.query("UPDATE products SET stock=stock-? WHERE id=?", [item.quantity, item.id]);
    }

    await connection.commit();
    res.status(201).json({ order_id: orderResult.insertId, total_amount: total });
  } catch (error) {
    await connection.rollback();
    res.status(400).json({ message: error.message || "Could not create order." });
  } finally {
    connection.release();
  }
});

router.get("/", requireAdmin, async (req, res) => {
  const [rows] = await db.query("SELECT * FROM orders ORDER BY created_at DESC");
  res.json(rows);
});

router.put("/:id/status", requireAdmin, async (req, res) => {
  const allowed = ["Pending Payment","Awaiting Verification","Paid","Processing","Completed","Cancelled"];
  if (!allowed.includes(req.body.status)) return res.status(400).json({ message: "Invalid status." });
  await db.query("UPDATE orders SET status=? WHERE id=?", [req.body.status, req.params.id]);
  res.json({ message: "Order status updated." });
});

module.exports = router;

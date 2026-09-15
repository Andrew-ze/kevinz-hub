const express = require("express");
const db = require("../database");
const { requireAdmin } = require("../middleware/authMiddleware");
const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const [rows] = await db.query("SELECT * FROM products ORDER BY created_at DESC");
    res.json(rows);
  } catch (error) {
    res.status(500).json({ message: "Could not load products." });
  }
});

router.post("/", requireAdmin, async (req, res) => {
  const { name, category, description, price, image_url, stock } = req.body;
  if (!name || !category || price === undefined) {
    return res.status(400).json({ message: "Name, category and price are required." });
  }

  try {
    await db.query(
      "INSERT INTO products (name,category,description,price,image_url,stock) VALUES (?,?,?,?,?,?)",
      [name, category, description || "", price, image_url || "", stock || 0]
    );
    res.status(201).json({ message: "Product added." });
  } catch (error) {
    res.status(500).json({ message: "Could not add product." });
  }
});

router.put("/:id", requireAdmin, async (req, res) => {
  const { name, category, description, price, image_url, stock } = req.body;
  try {
    await db.query(
      "UPDATE products SET name=?,category=?,description=?,price=?,image_url=?,stock=? WHERE id=?",
      [name, category, description || "", price, image_url || "", stock || 0, req.params.id]
    );
    res.json({ message: "Product updated." });
  } catch (error) {
    res.status(500).json({ message: "Could not update product." });
  }
});

router.delete("/:id", requireAdmin, async (req, res) => {
  try {
    await db.query("DELETE FROM products WHERE id=?", [req.params.id]);
    res.json({ message: "Product deleted." });
  } catch (error) {
    res.status(500).json({ message: "Could not delete product." });
  }
});

module.exports = router;

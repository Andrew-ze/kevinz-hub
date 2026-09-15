const express = require("express");
const db = require("../database");
const { requireAdmin } = require("../middleware/authMiddleware");
const router = express.Router();

router.get("/settings", async (req, res) => {
  const [rows] = await db.query("SELECT * FROM settings");
  res.json(Object.fromEntries(rows.map(row => [row.setting_key, row.setting_value])));
});

router.post("/", async (req, res) => {
  const { order_id, payment_method, payment_reference, amount, customer_phone } = req.body;
  if (!order_id || !payment_method || !payment_reference || !amount || !customer_phone) {
    return res.status(400).json({ message: "All payment details are required." });
  }

  await db.query(
    "INSERT INTO payments (order_id,payment_method,payment_reference,amount,customer_phone) VALUES (?,?,?,?,?)",
    [order_id, payment_method, payment_reference, amount, customer_phone]
  );
  await db.query("UPDATE orders SET status='Awaiting Verification' WHERE id=?", [order_id]);
  res.status(201).json({ message: "Payment submitted for verification." });
});

router.get("/", requireAdmin, async (req, res) => {
  const [rows] = await db.query("SELECT * FROM payments ORDER BY created_at DESC");
  res.json(rows);
});

router.put("/:id/status", requireAdmin, async (req, res) => {
  const { status, admin_notes } = req.body;
  if (!["Awaiting Verification","Paid","Rejected"].includes(status)) {
    return res.status(400).json({ message: "Invalid payment status." });
  }
  await db.query(
    "UPDATE payments SET status=?,admin_notes=?,verified_at=NOW() WHERE id=?",
    [status, admin_notes || "", req.params.id]
  );
  const [payment] = await db.query("SELECT order_id FROM payments WHERE id=?", [req.params.id]);
  if (payment.length) {
    await db.query("UPDATE orders SET status=? WHERE id=?", [status === "Paid" ? "Paid" : status === "Rejected" ? "Cancelled" : "Awaiting Verification", payment[0].order_id]);
  }
  res.json({ message: "Payment updated." });
});

module.exports = router;

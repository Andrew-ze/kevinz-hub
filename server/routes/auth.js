const express = require("express");
const bcrypt = require("bcryptjs");
const db = require("../database");
const router = express.Router();

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const [rows] = await db.query("SELECT * FROM admins WHERE email=?", [email]);
    if (!rows.length || !(await bcrypt.compare(password, rows[0].password_hash))) {
      return res.status(401).json({ message: "Invalid login details." });
    }
    req.session.admin = { id: rows[0].id, email: rows[0].email };
    res.json({ message: "Login successful." });
  } catch (error) {
    res.status(500).json({ message: "Login failed." });
  }
});

router.post("/logout", (req, res) => {
  req.session.destroy(() => res.json({ message: "Logged out." }));
});

router.get("/me", (req, res) => {
  res.json({ admin: req.session.admin || null });
});

module.exports = router;

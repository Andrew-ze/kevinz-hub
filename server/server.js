const express = require("express");
const session = require("express-session");
const path = require("path");
const bcrypt = require("bcryptjs");
const db = require("./database");
require("dotenv").config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: { httpOnly: true, sameSite: "lax", secure: false }
}));

app.use(express.static(path.join(__dirname, "..", "public")));
app.use("/admin", express.static(path.join(__dirname, "..", "admin")));

app.use("/api/products", require("./routes/products"));
app.use("/api/orders", require("./routes/orders"));
app.use("/api/payments", require("./routes/payments"));
app.use("/api/auth", require("./routes/auth"));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "public", "index.html"));
});

async function createInitialAdmin() {
  if (!process.env.ADMIN_EMAIL || !process.env.ADMIN_PASSWORD) return;
  const [rows] = await db.query("SELECT id FROM admins WHERE email=?", [process.env.ADMIN_EMAIL]);
  if (!rows.length) {
    const hash = await bcrypt.hash(process.env.ADMIN_PASSWORD, 12);
    await db.query("INSERT INTO admins (email,password_hash) VALUES (?,?)", [process.env.ADMIN_EMAIL, hash]);
    console.log("Initial administrator created.");
  }
}

const PORT = process.env.PORT || 3000;
app.listen(PORT, async () => {
  console.log(`Kevinz website running at http://localhost:${PORT}`);
  try { await createInitialAdmin(); } catch (error) { console.error("Admin setup failed:", error.message); }
});

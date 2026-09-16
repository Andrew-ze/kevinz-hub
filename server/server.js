const express = require("express");
const session = require("express-session");
const path = require("path");
const initializeDatabase = require("./initDatabase");

require("dotenv").config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production"
    }
  })
);

app.use(express.static(path.join(__dirname, "..", "public")));
app.use("/admin", express.static(path.join(__dirname, "..", "admin")));

app.use("/api/products", require("./routes/products"));
app.use("/api/orders", require("./routes/orders"));
app.use("/api/payments", require("./routes/payments"));
app.use("/api/auth", require("./routes/auth"));

app.get("*", (req, res) => {
  res.sendFile(
    path.join(__dirname, "..", "public", "index.html")
  );
});

const PORT = process.env.PORT || 3000;

async function startServer() {
  try {
    await initializeDatabase();

    app.listen(PORT, () => {
      console.log(`Kevinz website running on port ${PORT}`);
    });
  } catch (error) {
    console.error(
      "Server did not start because the database could not be initialized."
    );

    process.exit(1);
  }
}

startServer();

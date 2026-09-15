function requireAdmin(req, res, next) {
  if (!req.session.admin) {
    return res.status(401).json({ message: "Administrator login required." });
  }
  next();
}

module.exports = { requireAdmin };

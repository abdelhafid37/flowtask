const jwt = require("jsonwebtoken");
const User = require("../models/User");

async function authMiddleware(req, res, next) {
  const { authorization } = req.headers;

  if (!authorization)
    return res.status(401).json({ error: "request is not authorized" });

  if (!authorization.startsWith("Bearer "))
    return res.status(401).json({ error: "invalid authorization format" });

  const token = authorization.split(" ")[1];

  try {
    const { id } = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findOne({ _id: id }).select("_id");

    if (!user) return res.status(401).json({ error: "authorization failed" });

    req.user = { id: user._id };
    next();
  } catch (error) {
    console.log("auth error:", error.message);
    return res.status(401).json({ error: "authorization failed" });
  }
}

module.exports = authMiddleware;

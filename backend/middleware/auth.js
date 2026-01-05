const jwt = require("jsonwebtoken");
const User = require("../models/User");

async function authMiddleware(req, res, next) {
  const { Authorization } = req.headers;

  if (!Authorization)
    return res.json(401).json({ error: "Request is not authorized" });

  const token = Authorization.split(" ")[1];

  const payload = jwt.verify(token, process.env.JWT_SECRET);
  const { _id } = payload; // but why not id ?

  const user = await User.findOne({ _id }).select("_id");
  if (!user) return res.status(401).json({ error: "Authorization failed" });

  req.user = user;
  next();
}

module.exports = authMiddleware;

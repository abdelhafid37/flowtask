const User = require("../models/User");
const jwt = require("jsonwebtoken");

function genToken(id) {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE,
  });
}

async function register(req, res) {
  const { username, email, password } = req.body;

  const isExist = await User.findOne({ username });
  if (isExist)
    return res.status(409).json({ error: "Username is already taken" });

  try {
    const user = await User.create({ username, email, password });
    const token = genToken(user._id);
    const { username: _username, email: _email } = user;
    res.status(201).json({ token, _username, _email });
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: error.message });
  }
}

async function login(req, res) {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user)
    return res.status(401).json({ error: "Invalid email or password" });

  const isMatch = await user.comparePassword(password);
  if (!isMatch)
    return res.status(401).json({ error: "Invalid email or password" });

  const token = genToken(user._id);
  const { email: _email, username: _username } = user;
  res.status(200).json({ token, _email, _username });
}

module.exports = { register, login };

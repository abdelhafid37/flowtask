const User = require("../models/User");
const jwt = require("jsonwebtoken");

function genToken(id) {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE,
  });
}

async function register(req, res) {
  const { username, email, password } = req.body;

  const isExist = await User.findOne({ $or: [{ username }, { email }] });
  if (isExist)
    return res
      .status(409)
      .json({ error: "username or email is already taken" });

  try {
    const user = await User.create({ username, email, password });
    const token = genToken(user._id);
    res.status(201).json({
      token,
      user: {
        username: user.username,
        email: user.email,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: "invalid data" });
  }
}

async function login(req, res) {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user)
      return res.status(401).json({ error: "invalid email or password" });

    const isMatch = await user.comparePassword(password);
    if (!isMatch)
      return res.status(401).json({ error: "invalid email or password" });

    const token = genToken(user._id);
    res.status(200).json({
      token,
      user: {
        username: user.username,
        email: user.email,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Server Error" });
  }
}

module.exports = { register, login };

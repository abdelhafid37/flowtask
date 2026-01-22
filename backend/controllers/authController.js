const User = require("../models/User");
const jwt = require("jsonwebtoken");

function genToken(id) {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE,
  });
}

async function register(req, res, next) {
  const { username, email, password } = req.body;

  try {
    const isExist = await User.findOne({ $or: [{ username }, { email }] });

    if (isExist) {
      const error = new Error("Username or email is already taken");
      error.statusCode = 409;
      throw error;
    }

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
    next(error);
  }
}

async function login(req, res, next) {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      const error = new Error("Invalid email or password");
      error.statusCode = 401;
      throw error;
    }

    const isMatch = await user.comparePassword(password);

    if (!isMatch) {
      const error = new Error("Invalid email or password");
      error.statusCode = 401;
      throw error;
    }

    const token = genToken(user._id);

    res.status(200).json({
      token,
      user: {
        username: user.username,
        email: user.email,
      },
    });
  } catch (error) {
    next(error);
  }
}

module.exports = { register, login };

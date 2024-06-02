const User = require("../models/User");
const jwt = require("jsonwebtoken");
const { jwtSecret } = require("../config");

const generateTokens = (user) => {
  const accessToken = jwt.sign({ userId: user._id }, jwtSecret, {
    expiresIn: "15m",
  });
  const refreshToken = jwt.sign({ userId: user._id }, jwtSecret, {
    expiresIn: "7d",
  });
  return { accessToken, refreshToken };
};

const register = async (req, res) => {
  const { email, password } = req.body;
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res.status(400).json({ message: "User already exists" });

    const user = new User({ email, password });
    await user.save();
    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user || !(await user.comparePassword(password))) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const tokens = generateTokens(user);
    res.json({ user: { email: user.email }, ...tokens });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

const refreshToken = async (req, res) => {
  const { token } = req.body;
  try {
    if (!token) return res.status(401).json({ message: "Token is required" });

    jwt.verify(token, jwtSecret, (err, user) => {
      if (err) return res.status(403).json({ message: "Invalid token" });

      const tokens = generateTokens(user);
      res.json(tokens);
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

module.exports = { register, login, refreshToken };

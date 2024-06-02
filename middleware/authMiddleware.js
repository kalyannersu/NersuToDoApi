const jwt = require("jsonwebtoken");
const { jwtSecret } = require("../config");

const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).json({ message: "Authorization required" });
  }

  const token = authHeader.split(" ")[1];
  console.log("Received token:", token);
  jwt.verify(token, jwtSecret, (err, user) => {
    if (err) {
      console.log("Token verification failed:", err.message);
      return res.status(403).json({ message: "Invalid token" });
    }

    console.log("Authenticated user:", user); // Debugging
    req.user = user;
    next();
  });
};

module.exports = authMiddleware;

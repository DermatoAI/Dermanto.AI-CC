const jwt = require("jsonwebtoken");

const JWT_SECRET = process.env.JWT_SECRET;

const verifyToken = (req, res, next) => {
  const token = req.headers["authorization"];
  
  if (!token) {
    return res.status(403).json({ message: "Token tidak ditemukan" });
  }

  const cleanedToken = token.startsWith("Bearer ") ? token.slice(7, token.length) : token;

  try {
    const decoded = jwt.verify(cleanedToken, JWT_SECRET);
    req.user = decoded;  
    next();
  } catch (err) {
    return res.status(401).json({ message: "Token tidak valid" });
  }
};

module.exports = verifyToken;

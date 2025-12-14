const jwt = require("jsonwebtoken");
const { client } = require("../config/redis");

const verifyToken = async (req, res, next) => {
  const authHeader = req.headers["authorization"];

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ 
      message: "Authorization token missing or malformed",
      success: false 
    });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // Check Redis session
    const sessionData = await client.get(`session:${decoded.id}`);
    if (!sessionData) {
      return res.status(401).json({
        message: "Session expired. Please login again.",
        success: false,
      });
    }
    
    // Extend session expiry on activity
    await client.expire(`session:${decoded.id}`, 86400);
    
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ 
      message: "Invalid token",
      success: false 
    });
  }
};

module.exports = { verifyToken };

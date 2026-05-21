import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

export const verifyToken = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ success: false, message: "No token provided or invalid format" });
    }

    const token = authHeader.split(" ")[1].trim(); // Trim to avoid non-ASCII space issues
    
    if (!token) {
      return res.status(401).json({ success: false, message: "Token is missing" });
    }

    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET || "replace-with-strong-access-secret");
    const user = await User.findById(decoded.id).select("-password");

    if (!user) {
      return res.status(401).json({ success: false, message: "User not found" });
    }

    req.user = user;
    next();
  } catch (error) {
    console.error("Auth Error:", error.message);
    const message = error.name === "TokenExpiredError" ? "Token expired" : "Invalid token";
    return res.status(401).json({ success: false, message });
  }
};
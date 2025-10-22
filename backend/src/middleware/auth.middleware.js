import jwt from "jsonwebtoken";
import User from "../models/User.js";

export const protectRoute = async (req, res, next) => {
  try {
    const token = req.cookies.jwt;
    console.log("[Auth] Checking request authentication");

    if (!token) {
      console.log("[Auth] No token found in cookies");
      return res.status(401).json({ message: "Unauthorized - No token provided" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    console.log("[Auth] Token decoded:", { userId: decoded.userId });

    if (!decoded) {
      console.log("[Auth] Token verification failed");
      return res.status(401).json({ message: "Unauthorized - Invalid token" });
    }

    const user = await User.findById(decoded.userId).select("-password");
    console.log("[Auth] User found:", user ? "Yes" : "No", user ? { id: user._id } : "");

    if (!user) {
      console.log("[Auth] User not found in database");
      return res.status(401).json({ message: "Unauthorized - User not found" });
    }

    req.user = user;
    console.log("[Auth] Authentication successful, proceeding to route");
    next();
  } catch (error) {
    console.error("[Auth] Error in protectRoute middleware:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

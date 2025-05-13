import jwt from "jsonwebtoken";
import User from "../models/usersModels.js";

export const protectRoute = async (req, res, next) => {
    const token = req.cookies?.jwt;

    if (!token) return res.status(401).json({ message: "Not authorized, token missing" });

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        const user = await User.findById(decoded.userId).select("-password");
        if (!user) return res.status(401).json({ message: "Not authorized, user not found" });

        req.user = user;
        next();
    } catch (error) {
        console.error("JWT verification failed:", error.message);
        res.status(401).json({ message: "Invalid token" });
    }
};

 import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';
import User from '../models/usersModels.js';
import { generateToken } from '../utils/token.js';

dotenv.config(); // Load .env variables

 // Signup Controller
 export const signup = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // Normalize email
        const normalizedEmail = email.toLowerCase();

        // Check if user already exists
        const existingUser = await User.findOne({ email: normalizedEmail });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }

        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create new user
        const newUser = await User.create({
            name,
            email: normalizedEmail,
            password: hashedPassword
        });

        // Generate JWT token and set cookie
        generateToken(newUser._id, res);

        // Respond without password
        const { password: pw, ...userData } = newUser.toObject();
        res.status(201).json(userData);
    } catch (error) {
        console.error("Error in signup:", error);
        return res.status(500).json({ message: "Internal server error during signup" });
    }
};


 // Login Controller
 export const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const normalizedEmail = email.toLowerCase();
        const user = await User.findOne({ email: normalizedEmail });
        if (!user) return res.status(400).json({ message: 'Invalid credentials' });

        const isPasswordMatch = await bcrypt.compare(password, user.password);
        if (!isPasswordMatch) {
            return res.status(400).json({ message: 'Invalid password' });
        }

        // Optional: update login time
        user.lastLogin = new Date();
        await user.save();

        // Generate JWT token and set cookie
        generateToken(user._id, res);

        // Respond without password
        const { password: pw, ...userData } = user.toObject();
        res.status(200).json(userData);
    } catch (error) {
        console.error('Error in login:', error.message);
        return res.status(500).json({ message: 'Internal server error during login' });
    }
};

 // Logout Controller
 export const logout = async (req, res) => {
    try {
        res.clearCookie("jwt");

        const userId = req.user?._id;

        if (userId) {
            const user = await User.findById(userId);
            if (user) {
                user.lastSeen = new Date();
                await user.save();

                const { password: pw, ...userData } = user.toObject();
                return res.status(200).json(userData);
            }
        }

        return res.status(200).json({ message: "Logged out successfully." });

    } catch (error) {
        console.error("Error in logout:", error.message);
        return res.status(500).json({
            message: "Internal server error during logout",
        });
    }
};

 // Auth Check Controller
 export const authCheck = (req, res) => {
    try {
        if (!req.user) {
            return res.status(401).json({ message: "Not authenticated" });
        }

        const { password: pw, ...userData } = req.user.toObject();
        return res.status(200).json(userData);
    } catch (error) {
        console.error("Error in authCheck controller:", error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};

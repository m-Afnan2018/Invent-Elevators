import crypto from "crypto";
import jwt from "jsonwebtoken";
import AdminUser from "../models/AdminUser.model.js";

const parseName = (name = "") => {
    const cleaned = name.trim().replace(/\s+/g, " ");
    if (!cleaned) return { firstName: "Admin", lastName: "User" };
    const parts = cleaned.split(" ");
    const firstName = parts.shift();
    const lastName = parts.join(" ") || "User";
    return { firstName, lastName };
};

const signToken = (userId) =>
    jwt.sign({ id: userId }, process.env.JWT_SECRET || "dev-secret", {
        expiresIn: process.env.JWT_EXPIRES_IN || "7d",
    });

const setAuthCookie = (res, token) => {
    const maxAge = Number(process.env.COOKIE_EXPIRES_DAYS || 7) * 24 * 60 * 60 * 1000;
    res.cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
        maxAge,
    });
};

export const signup = async (req, res) => {
    try {
        const { fullName, email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ success: false, message: "Email and password are required" });
        }

        const existing = await AdminUser.findOne({ email: email.toLowerCase() });
        if (existing) {
            return res.status(409).json({ success: false, message: "User already exists" });
        }

        const nameParts = fullName ? parseName(fullName) : { firstName, lastName };

        const user = await AdminUser.create({
            firstName: nameParts.firstName,
            lastName: nameParts.lastName || "User",
            email,
            password,
            role: "admin",
            status: "active",
        });

        const token = signToken(user._id);
        setAuthCookie(res, token);

        res.status(201).json({ success: true, user: user.safeObject() });
    } catch (error) {
        console.log(error)
        res.status(400).json({ success: false, message: error.message });
    }
};

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ success: false, message: "Email and password are required" });
        }

        const user = await AdminUser.findOne({ email: email.toLowerCase() }).select("+password");
        if (!user) {
            return res.status(401).json({ success: false, message: "Invalid credentials" });
        }

        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            return res.status(401).json({ success: false, message: "Invalid credentials" });
        }

        user.lastLogin = new Date();
        await user.save();

        const token = signToken(user._id);
        setAuthCookie(res, token);

        res.status(200).json({ success: true, user: user.safeObject() });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: error.message });
    }
};

export const me = async (req, res) => {
    try {
        const token = req.cookies?.token;
        if (!token) {
            return res.status(401).json({ success: false, message: "Not authenticated" });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET || "dev-secret");
        const user = await AdminUser.findById(decoded.id);

        if (!user) {
            return res.status(401).json({ success: false, message: "Invalid token" });
        }

        res.status(200).json({ success: true, user: user.safeObject() });
    } catch (error) {
        res.status(401).json({ success: false, message: "Invalid or expired token" });
    }
};

export const forgotPassword = async (req, res) => {
    try {
        const { email } = req.body;
        if (!email) {
            return res.status(400).json({ success: false, message: "Email is required" });
        }

        const user = await AdminUser.findOne({ email: email.toLowerCase() }).select("+resetPasswordToken +resetPasswordExpire");
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        const resetToken = user.getResetPasswordToken();
        await user.save({ validateBeforeSave: false });

        const frontendUrl = process.env.FRONTEND_URL || "http://localhost:3000";
        const resetUrl = `${frontendUrl}/admin/auth/reset-password?token=${resetToken}`;

        res.status(200).json({
            success: true,
            message: "Reset token generated",
            resetToken,
            resetUrl,
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

export const resetPassword = async (req, res) => {
    try {
        const { token, password } = req.body;
        if (!token || !password) {
            return res.status(400).json({ success: false, message: "Token and new password are required" });
        }

        const hashedToken = crypto.createHash("sha256").update(token).digest("hex");
        const user = await AdminUser.findOne({
            resetPasswordToken: hashedToken,
            resetPasswordExpire: { $gt: Date.now() },
        }).select("+password +resetPasswordToken +resetPasswordExpire");

        if (!user) {
            return res.status(400).json({ success: false, message: "Token is invalid or expired" });
        }

        user.password = password;
        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;
        await user.save();

        const authToken = signToken(user._id);
        setAuthCookie(res, authToken);

        res.status(200).json({ success: true, message: "Password reset successful", user: user.safeObject() });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

export const logout = async (_req, res) => {
    res.cookie("token", "", {
        httpOnly: true,
        expires: new Date(0),
        secure: process.env.NODE_ENV === "production",
        sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
    });

    res.status(200).json({ success: true, message: "Logged out" });
};

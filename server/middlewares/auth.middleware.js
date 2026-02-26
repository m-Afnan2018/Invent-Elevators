import jwt from "jsonwebtoken";
import AdminUser from "../models/AdminUser.model.js";

const hasDashboardPermission = (user) =>
  user?.role === "admin" || (Array.isArray(user?.permissions) && user.permissions.includes("dashboard_view"));

export const requireAuth = async (req, res, next) => {
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

    req.user = user;
    next();
  } catch (error) {
    return res.status(401).json({ success: false, message: "Invalid or expired token" });
  }
};

export const requireDashboardAccess = (req, res, next) => {
  if (!hasDashboardPermission(req.user)) {
    return res.status(403).json({ success: false, message: "Dashboard access denied" });
  }

  next();
};

export { hasDashboardPermission };

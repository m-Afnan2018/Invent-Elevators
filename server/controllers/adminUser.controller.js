import bcrypt from "bcryptjs";
import AdminUser from "../models/AdminUser.model.js";

const splitFullName = (name = "") => {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (!parts.length) return { firstName: "Admin", lastName: "User" };
  const firstName = parts.shift();
  const lastName = parts.join(" ") || "User";
  return { firstName, lastName };
};

export const createAdminUser = async (req, res) => {
  try {
    const payload = { ...req.body };

    if (payload.name && (!payload.firstName || !payload.lastName)) {
      const names = splitFullName(payload.name);
      payload.firstName = names.firstName;
      payload.lastName = names.lastName;
    }

    const user = await AdminUser.create(payload);
    res.status(201).json({ success: true, data: user.safeObject() });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

export const getAllAdminUsers = async (_req, res) => {
  try {
    const users = await AdminUser.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, data: users.map((user) => user.safeObject()) });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getAdminUserById = async (req, res) => {
  try {
    const user = await AdminUser.findById(req.params.id);
    if (!user) return res.status(404).json({ success: false, message: "User not found" });
    res.status(200).json({ success: true, data: user.safeObject() });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const updateAdminUser = async (req, res) => {
  try {
    const updatePayload = { ...req.body };

    if (updatePayload.name && (!updatePayload.firstName || !updatePayload.lastName)) {
      const names = splitFullName(updatePayload.name);
      updatePayload.firstName = names.firstName;
      updatePayload.lastName = names.lastName;
    }

    if (updatePayload.password) {
      updatePayload.password = await bcrypt.hash(updatePayload.password, 10);
    } else {
      delete updatePayload.password;
    }

    const user = await AdminUser.findByIdAndUpdate(req.params.id, updatePayload, { new: true, runValidators: true });
    if (!user) return res.status(404).json({ success: false, message: "User not found" });
    res.status(200).json({ success: true, data: user.safeObject() });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

export const deleteAdminUser = async (req, res) => {
  try {
    const user = await AdminUser.findByIdAndDelete(req.params.id);
    if (!user) return res.status(404).json({ success: false, message: "User not found" });
    res.status(200).json({ success: true, message: "Deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

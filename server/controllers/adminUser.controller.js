import AdminUser from "../models/AdminUser.model.js";

export const createAdminUser = async (req, res) => {
  try {
    const user = await AdminUser.create(req.body);
    const safeUser = user.toObject();
    delete safeUser.password;
    res.status(201).json({ success: true, data: safeUser });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

export const getAllAdminUsers = async (_req, res) => {
  try {
    const users = await AdminUser.find().select("-password").sort({ createdAt: -1 });
    res.status(200).json({ success: true, data: users });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getAdminUserById = async (req, res) => {
  try {
    const user = await AdminUser.findById(req.params.id).select("-password");
    if (!user) return res.status(404).json({ success: false, message: "User not found" });
    res.status(200).json({ success: true, data: user });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const updateAdminUser = async (req, res) => {
  try {
    const updatePayload = { ...req.body };
    if (!updatePayload.password) delete updatePayload.password;
    const user = await AdminUser.findByIdAndUpdate(req.params.id, updatePayload, { new: true, runValidators: true }).select("-password");
    if (!user) return res.status(404).json({ success: false, message: "User not found" });
    res.status(200).json({ success: true, data: user });
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

import SubCategory from "../models/SubCategory.model.js";
import Category from "../models/Category.model.js";

export const createSubCategory = async (req, res) => {
  try {
    const { category } = req.body;
    if (!category) return res.status(400).json({ success: false, message: "Parent category is required" });

    const parent = await Category.findById(category);
    if (!parent) return res.status(404).json({ success: false, message: "Parent category not found" });

    const payload = { ...req.body };
    if (typeof payload.metaKeywords === "string") {
      payload.metaKeywords = payload.metaKeywords.split(",").map((item) => item.trim()).filter(Boolean);
    }

    const subCategory = await SubCategory.create(payload);
    res.status(201).json({ success: true, message: "Sub-category created successfully", data: subCategory });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

export const getAllSubCategories = async (_req, res) => {
  try {
    const subCategories = await SubCategory.find().populate("category", "name slug").sort({ order: 1, createdAt: -1 });
    res.status(200).json({ success: true, data: subCategories });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getSubCategoriesByCategory = async (req, res) => {
  try {
    const subCategories = await SubCategory.find({ category: req.params.categoryId, isActive: true }).sort({ order: 1, createdAt: -1 });
    res.status(200).json({ success: true, data: subCategories });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const updateSubCategory = async (req, res) => {
  try {
    const updated = await SubCategory.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!updated) return res.status(404).json({ success: false, message: "Sub-category not found" });
    res.status(200).json({ success: true, message: "Sub-category updated successfully", data: updated });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

export const deleteSubCategory = async (req, res) => {
  try {
    const subCategory = await SubCategory.findByIdAndUpdate(req.params.id, { isActive: false, status: "inactive" }, { new: true });
    if (!subCategory) return res.status(404).json({ success: false, message: "Sub-category not found" });
    res.status(200).json({ success: true, message: "Sub-category disabled successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

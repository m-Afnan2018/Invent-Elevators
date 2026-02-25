import Category from "../models/Category.model.js";
import SubCategory from "../models/SubCategory.model.js";

export const createCategory = async (req, res) => {
  try {
    const payload = { ...req.body };
    if (typeof payload.metaKeywords === "string") {
      payload.metaKeywords = payload.metaKeywords.split(",").map((item) => item.trim()).filter(Boolean);
    }
    const category = await Category.create(payload);
    res.status(201).json({ success: true, message: "Category created successfully", data: category });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

export const getAllCategories = async (_req, res) => {
  try {
    const categories = await Category.find().sort({ order: 1, createdAt: -1 });
    const subcategories = await SubCategory.find().sort({ order: 1, createdAt: -1 });
    res.status(200).json({ success: true, categories, subcategories, data: categories });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getCategoryById = async (req, res) => {
  try {
    const category = await Category.findById(req.params.id).populate("parentId", "name");
    if (!category) return res.status(404).json({ success: false, message: "Category not found" });
    res.status(200).json({ success: true, data: category });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const updateCategory = async (req, res) => {
  try {
    const payload = { ...req.body };
    if (typeof payload.metaKeywords === "string") {
      payload.metaKeywords = payload.metaKeywords.split(",").map((item) => item.trim()).filter(Boolean);
    }
    const updatedCategory = await Category.findByIdAndUpdate(req.params.id, payload, { new: true, runValidators: true });
    if (!updatedCategory) return res.status(404).json({ success: false, message: "Category not found" });
    res.status(200).json({ success: true, message: "Category updated successfully", data: updatedCategory });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

export const deleteCategory = async (req, res) => {
  try {
    const category = await Category.findByIdAndUpdate(req.params.id, { isActive: false, status: "inactive" }, { new: true });
    if (!category) return res.status(404).json({ success: false, message: "Category not found" });
    res.status(200).json({ success: true, message: "Category disabled successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

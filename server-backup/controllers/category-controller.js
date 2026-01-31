import Category from "../models/category.js";

// CREATE category
export const createCategory = async (req, res) => {
    try {
        const category = await Category.create({
            ...req.body,
            companyId: req.user.companyId
        });

        res.status(201).json(category);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// GET all categories (company based)
export const getCategories = async (req, res) => {
    try {
        const categories = await Category.find({
            companyId: req.user.companyId
        }).sort({ createdAt: -1 });

        res.json(categories);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// GET single category
export const getCategoryById = async (req, res) => {
    try {
        const category = await Category.findOne({
            _id: req.params.id,
            companyId: req.user.companyId
        });

        if (!category)
            return res.status(404).json({ message: "Category not found" });

        res.json(category);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// UPDATE category
export const updateCategory = async (req, res) => {
    try {
        const category = await Category.findOneAndUpdate(
            {
                _id: req.params.id,
                companyId: req.user.companyId
            },
            req.body,
            { new: true }
        );

        if (!category)
            return res.status(404).json({ message: "Category not found" });

        res.json(category);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// DELETE category
export const deleteCategory = async (req, res) => {
    try {
        const category = await Category.findOneAndDelete({
            _id: req.params.id,
            companyId: req.user.companyId
        });

        if (!category)
            return res.status(404).json({ message: "Category not found" });

        res.json({ message: "Category deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

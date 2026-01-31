const SubCategory = require("../models/SubCategory");
const Category = require("../models/Category");

// CREATE SUBCATEGORY
exports.createSubCategory = async (req, res) => {
    try {
        const { categoryId, name } = req.body;

        // ensure category exists
        const category = await Category.findById(categoryId);
        if (!category) {
            return res.status(404).json({
                success: false,
                message: "Category not found",
            });
        }

        if (!category.hasSubCategory) {
            return res.status(400).json({
                success: false,
                message: "This category does not support subcategories",
            });
        }

        const subCategory = await SubCategory.create({
            categoryId,
            name,
        });

        res.status(201).json({
            success: true,
            data: subCategory,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

// GET SUBCATEGORIES BY CATEGORY
exports.getSubCategoriesByCategory = async (req, res) => {
    try {
        const { categoryId } = req.query;

        const subCategories = await SubCategory.find({ categoryId }).sort({
            createdAt: -1,
        });

        res.status(200).json({
            success: true,
            data: subCategories,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

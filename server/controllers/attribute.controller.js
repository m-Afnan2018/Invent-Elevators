const Attribute = require("../models/Attribute");
const Category = require("../models/Category");
const SubCategory = require("../models/SubCategory");

// CREATE ATTRIBUTE
exports.createAttribute = async (req, res) => {
    try {
        const {
            categoryId,
            subCategoryId = null,
            label,
            key,
            type,
            required,
            options = [],
        } = req.body;

        const category = await Category.findById(categoryId);
        if (!category) {
            return res.status(404).json({
                success: false,
                message: "Category not found",
            });
        }

        if (subCategoryId) {
            const subCategory = await SubCategory.findOne({
                _id: subCategoryId,
                categoryId,
            });

            if (!subCategory) {
                return res.status(400).json({
                    success: false,
                    message: "Invalid subcategory for this category",
                });
            }
        }

        if (type === "select" && options.length === 0) {
            return res.status(400).json({
                success: false,
                message: "Select type must have options",
            });
        }

        const attribute = await Attribute.create({
            categoryId,
            subCategoryId,
            label,
            key,
            type,
            required,
            options,
        });

        res.status(201).json({
            success: true,
            data: attribute,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

// GET ATTRIBUTES FOR CATEGORY / SUBCATEGORY
exports.getAttributes = async (req, res) => {
    try {
        const { categoryId, subCategoryId = null } = req.query;

        const filter = {
            categoryId,
            subCategoryId: subCategoryId || null,
        };

        const attributes = await Attribute.find(filter).sort({
            createdAt: 1,
        });

        res.status(200).json({
            success: true,
            data: attributes,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

const Category = require("../models/Category");
const SubCategory = require("../models/SubCategory");
const Attribute = require("../models/Attribute");

module.exports = async function validateProduct(req, res, next) {
    try {
        const {
            categoryId,
            subCategoryId = null,
            attributes = {},
        } = req.body;

        // 1. Category check
        const category = await Category.findById(categoryId);
        if (!category) {
            return res.status(404).json({
                success: false,
                message: "Category not found",
            });
        }

        // 2. SubCategory check
        if (subCategoryId) {
            if (!category.hasSubCategory) {
                return res.status(400).json({
                    success: false,
                    message: "Category does not support subcategories",
                });
            }

            const subCategory = await SubCategory.findOne({
                _id: subCategoryId,
                categoryId,
            });

            if (!subCategory) {
                return res.status(400).json({
                    success: false,
                    message: "Invalid subcategory",
                });
            }
        }

        // 3. Fetch attribute definitions
        const attributeDefs = await Attribute.find({
            categoryId,
            subCategoryId: subCategoryId || null,
        });

        // 4. Validate attributes
        for (const attr of attributeDefs) {
            const value = attributes[attr.key];

            // required check
            if (attr.required && (value === undefined || value === null)) {
                return res.status(400).json({
                    success: false,
                    message: `Field '${attr.label}' is required`,
                });
            }

            if (value !== undefined) {
                switch (attr.type) {
                    case "number":
                        if (typeof value !== "number") {
                            return res.status(400).json({
                                success: false,
                                message: `${attr.label} must be a number`,
                            });
                        }
                        break;

                    case "text":
                        if (typeof value !== "string") {
                            return res.status(400).json({
                                success: false,
                                message: `${attr.label} must be text`,
                            });
                        }
                        break;

                    case "boolean":
                        if (typeof value !== "boolean") {
                            return res.status(400).json({
                                success: false,
                                message: `${attr.label} must be boolean`,
                            });
                        }
                        break;

                    case "select":
                        if (!attr.options.includes(value)) {
                            return res.status(400).json({
                                success: false,
                                message: `${attr.label} must be one of: ${attr.options.join(", ")}`,
                            });
                        }
                        break;
                }
            }
        }

        // attach validated context (optional)
        req._validated = true;

        next();
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

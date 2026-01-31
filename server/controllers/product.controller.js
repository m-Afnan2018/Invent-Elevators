const Product = require("../models/Product");
const Category = require("../models/Category");
const SubCategory = require("../models/SubCategory");
const Attribute = require("../models/Attribute");

// CREATE PRODUCT
exports.createProduct = async (req, res) => {
    try {
        const {
            categoryId,
            subCategoryId = null,
            name,
            price,
            description,
            attributes = {},
        } = req.body;

        // category check
        const category = await Category.findById(categoryId);
        if (!category) {
            return res.status(404).json({
                success: false,
                message: "Category not found",
            });
        }

        // subcategory check
        if (subCategoryId) {
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

        // fetch attribute definitions
        const attributeDefs = await Attribute.find({
            categoryId,
            subCategoryId: subCategoryId || null,
        });

        // validation
        for (const attr of attributeDefs) {
            const value = attributes[attr.key];

            if (attr.required && (value === undefined || value === null)) {
                return res.status(400).json({
                    success: false,
                    message: `Field '${attr.label}' is required`,
                });
            }

            if (value !== undefined) {
                if (attr.type === "number" && typeof value !== "number") {
                    return res.status(400).json({
                        success: false,
                        message: `${attr.label} must be a number`,
                    });
                }

                if (attr.type === "text" && typeof value !== "string") {
                    return res.status(400).json({
                        success: false,
                        message: `${attr.label} must be text`,
                    });
                }

                if (attr.type === "boolean" && typeof value !== "boolean") {
                    return res.status(400).json({
                        success: false,
                        message: `${attr.label} must be boolean`,
                    });
                }

                if (
                    attr.type === "select" &&
                    !attr.options.includes(value)
                ) {
                    return res.status(400).json({
                        success: false,
                        message: `${attr.label} must be one of ${attr.options.join(", ")}`,
                    });
                }
            }
        }

        const product = await Product.create({
            categoryId,
            subCategoryId,
            name,
            price,
            description,
            attributes,
        });

        res.status(201).json({
            success: true,
            data: product,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

// GET ALL PRODUCTS
exports.getProducts = async (req, res) => {
    try {
        const products = await Product.find()
            .populate("categoryId", "name")
            .populate("subCategoryId", "name")
            .sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            data: products,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

// GET SINGLE PRODUCT
exports.getProductById = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id)
            .populate("categoryId", "name")
            .populate("subCategoryId", "name");

        if (!product) {
            return res.status(404).json({
                success: false,
                message: "Product not found",
            });
        }

        res.status(200).json({
            success: true,
            data: product,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

// UPDATE PRODUCT
exports.updateProduct = async (req, res) => {
    try {
        const product = await Product.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );

        if (!product) {
            return res.status(404).json({
                success: false,
                message: "Product not found",
            });
        }

        res.status(200).json({
            success: true,
            data: product,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

// DELETE PRODUCT
exports.deleteProduct = async (req, res) => {
    try {
        const product = await Product.findByIdAndDelete(req.params.id);

        if (!product) {
            return res.status(404).json({
                success: false,
                message: "Product not found",
            });
        }

        res.status(200).json({
            success: true,
            message: "Product deleted successfully",
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

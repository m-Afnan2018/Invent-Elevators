import Product from "../models/product.js";
import ProductImage from "../models/product-image.js";
import ProductSpecification from "../models/product-specification.js";

// CREATE product
export const createProduct = async (req, res) => {
    try {
        const product = await Product.create({
            ...req.body,
            companyId: req.user.companyId
        });

        res.status(201).json(product);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// GET all products (company based)
export const getProducts = async (req, res) => {
    try {
        const products = await Product.find({
            companyId: req.user.companyId
        })
            .populate("categoryId", "name")
            .sort({ createdAt: -1 });

        res.json(products);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// GET single product (with images + specs)
export const getProductById = async (req, res) => {
    try {
        const product = await Product.findOne({
            _id: req.params.id,
            companyId: req.user.companyId
        }).populate("categoryId", "name");

        if (!product)
            return res.status(404).json({ message: "Product not found" });

        const images = await ProductImage.find({
            productId: product._id
        });

        const specs = await ProductSpecification.find({
            productId: product._id
        });

        res.json({ product, images, specifications: specs });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// UPDATE product
export const updateProduct = async (req, res) => {
    try {
        const product = await Product.findOneAndUpdate(
            {
                _id: req.params.id,
                companyId: req.user.companyId
            },
            req.body,
            { new: true }
        );

        if (!product)
            return res.status(404).json({ message: "Product not found" });

        res.json(product);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// DELETE product (with images + specs)
export const deleteProduct = async (req, res) => {
    try {
        const product = await Product.findOneAndDelete({
            _id: req.params.id,
            companyId: req.user.companyId
        });

        if (!product)
            return res.status(404).json({ message: "Product not found" });

        await ProductImage.deleteMany({ productId: product._id });
        await ProductSpecification.deleteMany({ productId: product._id });

        res.json({ message: "Product deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

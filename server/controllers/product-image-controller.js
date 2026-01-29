import ProductImage from "../models/product-image.js";
import Product from "../models/product.js";

/**
 * ADD image to product
 */
export const addProductImage = async (req, res) => {
    const { productId, imageUrl, isPrimary } = req.body;

    try {
        const product = await Product.findOne({
            _id: productId,
            companyId: req.user.companyId
        });

        if (!product)
            return res.status(404).json({ message: "Product not found" });

        // if primary image → unset others
        if (isPrimary) {
            await ProductImage.updateMany(
                { productId },
                { isPrimary: false }
            );
        }

        const image = await ProductImage.create({
            productId,
            imageUrl,
            isPrimary: isPrimary || false
        });

        res.status(201).json(image);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

/**
 * GET all images of a product
 */
export const getProductImages = async (req, res) => {
    try {
        const images = await ProductImage.find({
            productId: req.params.productId
        }).sort({ isPrimary: -1, createdAt: -1 });

        res.json(images);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

/**
 * SET primary image
 */
export const setPrimaryImage = async (req, res) => {
    try {
        const image = await ProductImage.findById(req.params.id);
        if (!image)
            return res.status(404).json({ message: "Image not found" });

        // unset previous primary
        await ProductImage.updateMany(
            { productId: image.productId },
            { isPrimary: false }
        );

        image.isPrimary = true;
        await image.save();

        res.json({ message: "Primary image updated" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

/**
 * DELETE image
 */
export const deleteProductImage = async (req, res) => {
    try {
        const image = await ProductImage.findByIdAndDelete(req.params.id);
        if (!image)
            return res.status(404).json({ message: "Image not found" });

        res.json({ message: "Image deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

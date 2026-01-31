import ProductSpecification from "../models/product-specification.js";
import Product from "../models/product.js";

/**
 * ADD specification to product
 */
export const addSpecification = async (req, res) => {
    const { productId, key, value } = req.body;

    try {
        const product = await Product.findOne({
            _id: productId,
            companyId: req.user.companyId
        });

        if (!product)
            return res.status(404).json({ message: "Product not found" });

        const spec = await ProductSpecification.create({
            productId,
            key,
            value
        });

        res.status(201).json(spec);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

/**
 * GET all specifications of a product
 */
export const getSpecificationsByProduct = async (req, res) => {
    try {
        const specs = await ProductSpecification.find({
            productId: req.params.productId
        }).sort({ createdAt: 1 });

        res.json(specs);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

/**
 * UPDATE specification
 */
export const updateSpecification = async (req, res) => {
    try {
        const spec = await ProductSpecification.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );

        if (!spec)
            return res.status(404).json({ message: "Specification not found" });

        res.json(spec);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

/**
 * DELETE specification
 */
export const deleteSpecification = async (req, res) => {
    try {
        const spec = await ProductSpecification.findByIdAndDelete(req.params.id);

        if (!spec)
            return res.status(404).json({ message: "Specification not found" });

        res.json({ message: "Specification deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

import Cabin from "../models/cabin.js";
import Product from "../models/product.js";

/**
 * CREATE / ADD cabin details
 */
export const createCabin = async (req, res) => {
    const { productId } = req.body;

    try {
        const product = await Product.findOne({
            _id: productId,
            companyId: req.user.companyId
        });

        if (!product)
            return res.status(404).json({ message: "Product not found" });

        const cabin = await Cabin.create(req.body);
        res.status(201).json(cabin);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

/**
 * GET cabin by product
 */
export const getCabinByProduct = async (req, res) => {
    try {
        const cabin = await Cabin.findOne({
            productId: req.params.productId
        }).populate("productId", "name");

        if (!cabin)
            return res.status(404).json({ message: "Cabin not found" });

        res.json(cabin);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

/**
 * UPDATE cabin
 */
export const updateCabin = async (req, res) => {
    try {
        const cabin = await Cabin.findOneAndUpdate(
            { productId: req.params.productId },
            req.body,
            { new: true }
        );

        if (!cabin)
            return res.status(404).json({ message: "Cabin not found" });

        res.json(cabin);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

/**
 * DELETE cabin
 */
export const deleteCabin = async (req, res) => {
    try {
        const cabin = await Cabin.findOneAndDelete({
            productId: req.params.productId
        });

        if (!cabin)
            return res.status(404).json({ message: "Cabin not found" });

        res.json({ message: "Cabin deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

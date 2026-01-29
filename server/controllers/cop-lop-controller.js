import CopLopPanel from "../models/cop-lop-panel.js";
import Product from "../models/product.js";

/**
 * CREATE COP / LOP panel
 */
export const createCopLopPanel = async (req, res) => {
    const { productId } = req.body;

    try {
        const product = await Product.findOne({
            _id: productId,
            companyId: req.user.companyId
        });

        if (!product)
            return res.status(404).json({ message: "Product not found" });

        const panel = await CopLopPanel.create(req.body);
        res.status(201).json(panel);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

/**
 * GET panel by product
 */
export const getCopLopByProduct = async (req, res) => {
    try {
        const panel = await CopLopPanel.findOne({
            productId: req.params.productId
        }).populate("productId", "name");

        if (!panel)
            return res.status(404).json({ message: "COP/LOP panel not found" });

        res.json(panel);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

/**
 * UPDATE panel
 */
export const updateCopLopPanel = async (req, res) => {
    try {
        const panel = await CopLopPanel.findOneAndUpdate(
            { productId: req.params.productId },
            req.body,
            { new: true }
        );

        if (!panel)
            return res.status(404).json({ message: "COP/LOP panel not found" });

        res.json(panel);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

/**
 * DELETE panel
 */
export const deleteCopLopPanel = async (req, res) => {
    try {
        const panel = await CopLopPanel.findOneAndDelete({
            productId: req.params.productId
        });

        if (!panel)
            return res.status(404).json({ message: "COP/LOP panel not found" });

        res.json({ message: "COP/LOP panel deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

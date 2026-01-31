import DoorSystem from "../models/door-system.js";
import Product from "../models/product.js";

/**
 * CREATE door system
 */
export const createDoorSystem = async (req, res) => {
    const { productId } = req.body;

    try {
        const product = await Product.findOne({
            _id: productId,
            companyId: req.user.companyId
        });

        if (!product)
            return res.status(404).json({ message: "Product not found" });

        const doorSystem = await DoorSystem.create(req.body);
        res.status(201).json(doorSystem);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

/**
 * GET door system by product
 */
export const getDoorSystemByProduct = async (req, res) => {
    try {
        const doorSystem = await DoorSystem.findOne({
            productId: req.params.productId
        }).populate("productId", "name");

        if (!doorSystem)
            return res.status(404).json({ message: "Door system not found" });

        res.json(doorSystem);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

/**
 * UPDATE door system
 */
export const updateDoorSystem = async (req, res) => {
    try {
        const doorSystem = await DoorSystem.findOneAndUpdate(
            { productId: req.params.productId },
            req.body,
            { new: true }
        );

        if (!doorSystem)
            return res.status(404).json({ message: "Door system not found" });

        res.json(doorSystem);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

/**
 * DELETE door system
 */
export const deleteDoorSystem = async (req, res) => {
    try {
        const doorSystem = await DoorSystem.findOneAndDelete({
            productId: req.params.productId
        });

        if (!doorSystem)
            return res.status(404).json({ message: "Door system not found" });

        res.json({ message: "Door system deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

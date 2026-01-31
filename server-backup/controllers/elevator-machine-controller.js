import ElevatorMachine from "../models/elevator-machine.js";
import Product from "../models/product.js";

/**
 * CREATE machine
 */
export const createElevatorMachine = async (req, res) => {
    const { productId } = req.body;

    try {
        const product = await Product.findOne({
            _id: productId,
            companyId: req.user.companyId
        });

        if (!product)
            return res.status(404).json({ message: "Product not found" });

        const machine = await ElevatorMachine.create(req.body);
        res.status(201).json(machine);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

/**
 * GET machine by product
 */
export const getMachineByProduct = async (req, res) => {
    try {
        const machine = await ElevatorMachine.findOne({
            productId: req.params.productId
        }).populate("productId", "name");

        if (!machine)
            return res.status(404).json({ message: "Machine not found" });

        res.json(machine);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

/**
 * UPDATE machine
 */
export const updateElevatorMachine = async (req, res) => {
    try {
        const machine = await ElevatorMachine.findOneAndUpdate(
            { productId: req.params.productId },
            req.body,
            { new: true }
        );

        if (!machine)
            return res.status(404).json({ message: "Machine not found" });

        res.json(machine);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

/**
 * DELETE machine
 */
export const deleteElevatorMachine = async (req, res) => {
    try {
        const machine = await ElevatorMachine.findOneAndDelete({
            productId: req.params.productId
        });

        if (!machine)
            return res.status(404).json({ message: "Machine not found" });

        res.json({ message: "Elevator machine deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

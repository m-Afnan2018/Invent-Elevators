import Product from "../models/Product.model.js";

export const createProduct = async (req, res) => {
  try {
    const product = await Product.create(req.body);
    res.status(201).json({ success: true, message: "Product created successfully", data: product });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

export const getAllProducts = async (_req, res) => {
  try {
    const products = await Product.find({ isActive: true })
      .populate("category categories", "name")
      .populate("subCategory subCategories", "name")
      .populate("components", "name")
      .sort({ createdAt: -1 });

    res.status(200).json({ success: true, data: products });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id)
      .populate("category categories", "name")
      .populate("subCategory subCategories", "name")
      .populate("components");

    if (!product || !product.isActive) {
      return res.status(404).json({ success: false, message: "Product not found" });
    }

    res.status(200).json({ success: true, data: product });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const updateProduct = async (req, res) => {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!updatedProduct) return res.status(404).json({ success: false, message: "Product not found" });
    res.status(200).json({ success: true, message: "Product updated successfully", data: updatedProduct });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(req.params.id, { isActive: false, status: "inactive" }, { new: true });
    if (!product) return res.status(404).json({ success: false, message: "Product not found" });
    res.status(200).json({ success: true, message: "Product disabled successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

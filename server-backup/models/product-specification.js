import mongoose from "mongoose";

const productSpecificationSchema = new mongoose.Schema(
    {
        productId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Product",
            required: true
        },
        key: {
            type: String,
            required: true,
            trim: true
        },
        value: {
            type: String,
            required: true,
            trim: true
        }
    },
    { timestamps: true }
);

// prevent duplicate keys per product
productSpecificationSchema.index(
    { productId: 1, key: 1 },
    { unique: true }
);

export default mongoose.model(
    "ProductSpecification",
    productSpecificationSchema
);

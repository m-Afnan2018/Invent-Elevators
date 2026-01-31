import mongoose from "mongoose";

const productImageSchema = new mongoose.Schema(
    {
        productId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Product",
            required: true
        },
        imageUrl: {
            type: String,
            required: true
        },
        isPrimary: {
            type: Boolean,
            default: false
        }
    },
    { timestamps: true }
);

export default mongoose.model("ProductImage", productImageSchema);

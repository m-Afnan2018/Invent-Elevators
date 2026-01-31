import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
    {
        companyId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Company",
            required: true
        },
        categoryId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Category",
            required: true
        },
        name: {
            type: String,
            required: true,
            trim: true
        },
        slug: {
            type: String,
            required: true,
            lowercase: true
        },
        shortDescription: {
            type: String
        },
        longDescription: {
            type: String
        },
        status: {
            type: String,
            enum: ["active", "inactive"],
            default: "active"
        }
    },
    { timestamps: true }
);

productSchema.index(
    { companyId: 1, categoryId: 1, slug: 1 },
    { unique: true }
);

export default mongoose.model("Product", productSchema);

import mongoose from "mongoose";

const categorySchema = new mongoose.Schema(
    {
        companyId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Company",
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
        description: {
            type: String
        },
        isActive: {
            type: Boolean,
            default: true
        }
    },
    { timestamps: true }
);

// prevent duplicate category per company
categorySchema.index({ companyId: 1, slug: 1 }, { unique: true });

export default mongoose.model("Category", categorySchema);

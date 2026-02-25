import mongoose from "mongoose";

const subCategorySchema = new mongoose.Schema(
  {
    category: { type: mongoose.Schema.Types.ObjectId, ref: "Category", required: true },
    name: { type: String, required: true, trim: true },
    description: { type: String, trim: true },
    slug: { type: String, trim: true, lowercase: true },
    icon: { type: String },
    image: { type: String },
    status: { type: String, enum: ["active", "inactive"], default: "active" },
    order: { type: Number, default: 0 },
    metaTitle: { type: String, trim: true },
    metaDescription: { type: String, trim: true },
    metaKeywords: [{ type: String, trim: true }],
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

subCategorySchema.index({ category: 1, name: 1 }, { unique: true });
subCategorySchema.index({ category: 1, slug: 1 }, { unique: true, sparse: true });

export default mongoose.model("SubCategory", subCategorySchema);

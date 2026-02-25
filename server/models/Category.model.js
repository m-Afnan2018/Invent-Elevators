import mongoose from "mongoose";

const categorySchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    description: { type: String, trim: true },
    slug: { type: String, trim: true, lowercase: true, unique: true, sparse: true },
    icon: { type: String },
    image: { type: String },
    status: { type: String, enum: ["active", "inactive"], default: "active" },
    order: { type: Number, default: 0 },
    metaTitle: { type: String, trim: true },
    metaDescription: { type: String, trim: true },
    metaKeywords: [{ type: String, trim: true }],
    parentId: { type: mongoose.Schema.Types.ObjectId, ref: "Category", default: null },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

categorySchema.index({ name: 1, parentId: 1 }, { unique: true });

export default mongoose.model("Category", categorySchema);

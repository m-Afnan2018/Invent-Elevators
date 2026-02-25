import mongoose from "mongoose";

const testimonialSchema = new mongoose.Schema(
  {
    name: { type: String, trim: true },
    company: { type: String, trim: true },
    role: { type: String, trim: true },
    message: { type: String, trim: true },
  },
  { _id: false }
);

const productSchema = new mongoose.Schema(
  {
    category: { type: mongoose.Schema.Types.ObjectId, ref: "Category" },
    subCategory: { type: mongoose.Schema.Types.ObjectId, ref: "SubCategory" },
    categories: [{ type: mongoose.Schema.Types.ObjectId, ref: "Category" }],
    subCategories: [{ type: mongoose.Schema.Types.ObjectId, ref: "SubCategory" }],
    name: { type: String, required: true, trim: true },
    description: { type: String, trim: true },
    image: { type: String },
    capacity: { type: String },
    stops: { type: Number },
    speed: { type: String },
    components: [{ type: mongoose.Schema.Types.ObjectId, ref: "Component" }],
    status: { type: String, enum: ["active", "inactive", "draft"], default: "active" },
    isFeatured: { type: Boolean, default: false },
    customSpecs: { type: Object, default: {} },
    testimonials: [testimonialSchema],
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

productSchema.index({ name: 1 }, { unique: true });

export default mongoose.model("Product", productSchema);

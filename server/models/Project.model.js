import mongoose from "mongoose";

const projectSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String, trim: true },
    client: { type: String, trim: true },
    location: { type: String, trim: true },
    completionDate: { type: Date },
    category: { type: String, trim: true },
    status: { type: String, enum: ["planning", "ongoing", "completed", "on-hold"], default: "planning" },
    featuredImage: { type: String },
    galleryImages: [{ type: String }],
    isFeatured: { type: Boolean, default: false },
    linkedProducts: [{ type: mongoose.Schema.Types.ObjectId, ref: "Product" }],
    customSpecs: { type: Object, default: {} },
    testimonials: [{ type: Object }],
  },
  { timestamps: true }
);

export default mongoose.model("Project", projectSchema);

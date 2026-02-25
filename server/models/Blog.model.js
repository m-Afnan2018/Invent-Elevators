import mongoose from "mongoose";

const blogSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    slug: { type: String, trim: true, lowercase: true, unique: true, sparse: true },
    excerpt: { type: String, trim: true },
    content: { type: String },
    coverImage: { type: String },
    tags: [{ type: String, trim: true }],
    category: { type: String, trim: true },
    author: { type: String, trim: true },
    status: { type: String, enum: ["draft", "published", "archived"], default: "draft" },
    seoTitle: { type: String, trim: true },
    seoDescription: { type: String, trim: true },
    publishDate: { type: Date },
  },
  { timestamps: true }
);

export default mongoose.model("Blog", blogSchema);

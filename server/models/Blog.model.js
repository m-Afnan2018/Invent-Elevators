import mongoose from "mongoose";

const blogSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    slug: { type: String, trim: true, lowercase: true, unique: true, sparse: true },
    excerpt: { type: String, trim: true },
    content: { type: String },
    featuredImage: { type: String },
    tags: [{ type: String, trim: true }],
    category: { type: String, trim: true },
    author: { type: String, trim: true },
    status: {
      type: String,
      enum: ["draft", "published", "scheduled", "archived"],
      default: "draft",
    },
    isFeatured: { type: Boolean, default: false },
    publishDate: { type: Date },
    // SEO
    metaTitle: { type: String, trim: true },
    metaDescription: { type: String, trim: true },
    metaKeywords: { type: String, trim: true },
    ogImage: { type: String },
    canonicalUrl: { type: String, trim: true },
  },
  { timestamps: true }
);

export default mongoose.model("Blog", blogSchema);

import mongoose from "mongoose";

const attributeFieldSchema = new mongoose.Schema(
  {
    fieldId: { type: String, required: true, trim: true },
    fieldName: { type: String, required: true, trim: true },
    fieldType: {
      type: String,
      enum: ["text", "number", "dropdown", "checkbox", "radio", "date", "textarea", "file"],
      default: "text",
    },
    isRequired: { type: Boolean, default: false },
    options: [{ type: String, trim: true }],
  },
  { _id: false }
);

const attributeSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    description: { type: String, trim: true },
    categories: [{ type: mongoose.Schema.Types.ObjectId, ref: "Category" }],
    status: { type: String, enum: ["active", "inactive"], default: "active" },
    fields: [attributeFieldSchema],
  },
  { timestamps: true }
);

export default mongoose.model("Attribute", attributeSchema);

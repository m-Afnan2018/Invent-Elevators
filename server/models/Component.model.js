import mongoose from "mongoose";

const componentSchema = new mongoose.Schema(
  {
    componentType: { type: mongoose.Schema.Types.ObjectId, ref: "ComponentType" },
    name: { type: String, required: true, trim: true },
    description: { type: String, trim: true },
    specs: { type: Object, default: {} },
    image: { type: String },
    price: { type: Number, default: 0 },
    status: { type: String, enum: ["active", "inactive"], default: "active" },
    attributeId: { type: mongoose.Schema.Types.ObjectId, ref: "Attribute" },
    filledData: { type: Object, default: {} },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

componentSchema.index({ componentType: 1, name: 1 }, { unique: true, sparse: true });

export default mongoose.model("Component", componentSchema);

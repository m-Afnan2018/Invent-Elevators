import mongoose from "mongoose";

const leadSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, trim: true, lowercase: true },
    phone: { type: String, trim: true },
    company: { type: String, trim: true },
    location: { type: String, trim: true },
    source: { type: String, trim: true, default: "Website" },
    message: { type: String, trim: true },
    budget: { type: String, trim: true },
    timeline: { type: String, trim: true },
    priority: { type: String, enum: ["urgent", "high", "medium", "low"], default: "medium" },
    status: { type: String, enum: ["new", "contacted", "qualified", "converted", "lost", "won"], default: "new" },
    assignedTo: { type: mongoose.Schema.Types.ObjectId, ref: "AdminUser" },
    productInterest: [{ type: mongoose.Schema.Types.ObjectId, ref: "Product" }],
    notes: { type: String, trim: true },
    files: [{ type: String }],
    customFields: { type: Object, default: {} },
  },
  { timestamps: true }
);

export default mongoose.model("Lead", leadSchema);

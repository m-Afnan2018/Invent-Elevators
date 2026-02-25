import mongoose from "mongoose";

const leadSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, trim: true, lowercase: true },
    phone: { type: String, trim: true },
    company: { type: String, trim: true },
    source: { type: String, trim: true, default: "website" },
    message: { type: String, trim: true },
    status: { type: String, enum: ["new", "contacted", "qualified", "lost", "won"], default: "new" },
    assignedTo: { type: mongoose.Schema.Types.ObjectId, ref: "AdminUser" },
    productInterest: [{ type: mongoose.Schema.Types.ObjectId, ref: "Product" }],
    notes: { type: String, trim: true },
  },
  { timestamps: true }
);

export default mongoose.model("Lead", leadSchema);

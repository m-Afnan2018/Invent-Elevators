import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const adminUserSchema = new mongoose.Schema(
  {
    firstName: { type: String, required: true, trim: true },
    lastName: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    password: { type: String, required: true, minlength: 6 },
    phone: { type: String, trim: true },
    role: { type: String, enum: ["admin", "manager", "editor", "viewer"], default: "viewer" },
    status: { type: String, enum: ["active", "inactive", "pending"], default: "pending" },
    department: { type: String, trim: true },
    jobTitle: { type: String, trim: true },
    profileImage: { type: String },
    street: { type: String, trim: true },
    city: { type: String, trim: true },
    state: { type: String, trim: true },
    zipCode: { type: String, trim: true },
    country: { type: String, trim: true },
    permissions: [{ type: String, trim: true }],
    lastLogin: { type: Date },
  },
  { timestamps: true }
);

adminUserSchema.pre("save", async function preSave(next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

adminUserSchema.methods.comparePassword = function comparePassword(input) {
  return bcrypt.compare(input, this.password);
};

export default mongoose.model("AdminUser", adminUserSchema);

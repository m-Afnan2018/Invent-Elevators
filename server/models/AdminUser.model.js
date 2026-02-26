import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import crypto from "crypto";

const adminUserSchema = new mongoose.Schema(
    {
        firstName: { type: String, required: true, trim: true },
        lastName: { type: String, required: true, trim: true },
        email: { type: String, required: true, unique: true, lowercase: true, trim: true },
        password: { type: String, required: true, minlength: 6, select: false },
        phone: { type: String, trim: true },
        role: { type: String, enum: ["admin", "manager", "editor", "viewer"], default: "admin" },
        status: { type: String, enum: ["active", "inactive", "pending"], default: "active" },
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
        resetPasswordToken: { type: String, select: false },
        resetPasswordExpire: { type: Date, select: false },
    },
    { timestamps: true }
);

adminUserSchema.pre("save", async function () {
    if (!this.isModified("password")) return;
    this.password = await bcrypt.hash(this.password, 10);
});

// adminUserSchema.pre("save", async function preSave() {
//     if (!this.isModified("password")) return next();
//     this.password = await bcrypt.hash(this.password, 10);
//     // next();
// });

adminUserSchema.methods.comparePassword = function comparePassword(input) {
    return bcrypt.compare(input, this.password);
};

adminUserSchema.methods.getResetPasswordToken = function getResetPasswordToken() {
    const resetToken = crypto.randomBytes(32).toString("hex");

    this.resetPasswordToken = crypto
        .createHash("sha256")
        .update(resetToken)
        .digest("hex");

    this.resetPasswordExpire = Date.now() + 15 * 60 * 1000;

    return resetToken;
};

adminUserSchema.methods.safeObject = function safeObject() {
    const user = this.toObject();
    delete user.password;
    delete user.resetPasswordToken;
    delete user.resetPasswordExpire;
    return user;
};

export default mongoose.model("AdminUser", adminUserSchema);

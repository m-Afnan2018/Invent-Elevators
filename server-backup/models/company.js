import mongoose from "mongoose";

const companySchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true
        },
        description: {
            type: String
        },
        logo: {
            type: String
        },
        email: {
            type: String,
            lowercase: true
        },
        phone: {
            type: String
        },
        address: {
            type: String
        },
        isActive: {
            type: Boolean,
            default: true
        }
    },
    { timestamps: true }
);

export default mongoose.model("Company", companySchema);

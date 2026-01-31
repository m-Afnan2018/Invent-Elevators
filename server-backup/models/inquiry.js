import mongoose from "mongoose";

const inquirySchema = new mongoose.Schema(
    {
        companyId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Company",
            required: true
        },
        name: {
            type: String,
            required: true,
            trim: true
        },
        email: {
            type: String,
            trim: true,
            lowercase: true
        },
        phone: {
            type: String
        },
        message: {
            type: String
        },
        source: {
            type: String, // website, landing-page, product-page
            default: "website"
        },
        status: {
            type: String,
            enum: ["new", "contacted", "closed"],
            default: "new"
        }
    },
    { timestamps: true }
);

export default mongoose.model("Inquiry", inquirySchema);

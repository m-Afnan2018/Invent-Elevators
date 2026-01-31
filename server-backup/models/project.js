import mongoose from "mongoose";

const projectSchema = new mongoose.Schema(
    {
        companyId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Company",
            required: true
        },
        name: {
            type: String,
            required: true
        },
        location: {
            type: String
        },
        status: {
            type: String,
            enum: ["ongoing", "completed"],
            default: "ongoing"
        },
        description: {
            type: String
        }
    },
    { timestamps: true }
);

export default mongoose.model("Project", projectSchema);

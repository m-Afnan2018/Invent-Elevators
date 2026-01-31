import mongoose from "mongoose";

const projectClientSchema = new mongoose.Schema(
    {
        projectId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Project",
            required: true
        },
        clientId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Client",
            required: true
        }
    },
    { timestamps: true }
);

// prevent duplicate mapping
projectClientSchema.index(
    { projectId: 1, clientId: 1 },
    { unique: true }
);

export default mongoose.model("ProjectClient", projectClientSchema);

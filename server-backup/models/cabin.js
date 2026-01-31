import mongoose from "mongoose";

const cabinSchema = new mongoose.Schema(
    {
        productId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Product",
            required: true,
            unique: true // one cabin config per product
        },
        material: {
            type: String,
            required: true
        },
        finish: {
            type: String
        },
        capacity: {
            type: Number // persons
        },
        ceilingType: {
            type: String
        },
        flooringType: {
            type: String
        },
        lighting: {
            type: String
        }
    },
    { timestamps: true }
);

export default mongoose.model("Cabin", cabinSchema);

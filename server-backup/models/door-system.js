import mongoose from "mongoose";

const doorSystemSchema = new mongoose.Schema(
    {
        productId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Product",
            required: true,
            unique: true // one door system per product
        },
        doorType: {
            type: String, // e.g. Automatic, Manual
            required: true
        },
        openingType: {
            type: String, // Center Opening, Side Opening
            required: true
        },
        material: {
            type: String
        },
        finish: {
            type: String
        },
        fireRated: {
            type: Boolean,
            default: false
        }
    },
    { timestamps: true }
);

export default mongoose.model("DoorSystem", doorSystemSchema);

import mongoose from "mongoose";

const copLopPanelSchema = new mongoose.Schema(
    {
        productId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Product",
            required: true,
            unique: true // one COP/LOP config per product
        },
        panelType: {
            type: String,
            enum: ["COP", "LOP"],
            required: true
        },
        displayType: {
            type: String // LCD, LED, Dot Matrix
        },
        buttonType: {
            type: String // Mechanical, Touch
        },
        material: {
            type: String
        },
        finish: {
            type: String
        },
        brailleSupport: {
            type: Boolean,
            default: false
        }
    },
    { timestamps: true }
);

export default mongoose.model("CopLopPanel", copLopPanelSchema);

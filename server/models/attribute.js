const mongoose = require("mongoose");

const attributeSchema = new mongoose.Schema(
    {
        categoryId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Category",
            required: true,
        },

        // null if category has no subcategory
        subCategoryId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "SubCategory",
            default: null,
        },

        label: {
            type: String,
            required: true,
            trim: true,
        },

        key: {
            type: String,
            required: true,
            lowercase: true,
            trim: true,
        },

        type: {
            type: String,
            enum: ["text", "number", "select", "boolean"],
            required: true,
        },

        required: {
            type: Boolean,
            default: false,
        },

        options: {
            type: [String], // for select
            default: [],
        },
    },
    { timestamps: true }
);

// avoid duplicate keys in same category/subcategory
attributeSchema.index(
    { categoryId: 1, subCategoryId: 1, key: 1 },
    { unique: true }
);

module.exports = mongoose.model("Attribute", attributeSchema);

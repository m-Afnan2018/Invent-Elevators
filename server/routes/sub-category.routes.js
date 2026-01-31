const express = require("express");
const router = express.Router();

const {
    createSubCategory,
    getSubCategoriesByCategory,
} = require("../controllers/subCategory.controller");

router.post("/", createSubCategory);
router.get("/", getSubCategoriesByCategory);

module.exports = router;

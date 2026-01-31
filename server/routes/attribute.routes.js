const express = require("express");
const router = express.Router();

const {
    createAttribute,
    getAttributes,
} = require("../controllers/attribute.controller");

router.post("/", createAttribute);
router.get("/", getAttributes);

module.exports = router;

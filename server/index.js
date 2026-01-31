const express = require("express");
const dotenv = require("dotenv");

dotenv.config();

const PORT = process.env.PORT;

const app = express()

app.route('/').get((req, res) => {
    res.send("Invent Server is running successfully !!!");
})

app.listen(PORT, () => {
    console.log(`Server is running at ${PORT}:\t\t http://localhost:${PORT}`)
})

const {
    createCategory,
    getCategories,
} = require("../controllers/category.controller");

app.use("/api/v1/categories", require("./routes/subCategory.routes"));
app.use("/api/v1/subcategories", require("./routes/subCategory.routes"));
app.use("/api/v1/attributes", require("./routes/attribute.routes"));
app.use("/api/v1/products", require("./routes/product.routes"));


router.post("/", createCategory);
router.get("/", getCategories);
const express = require('express');
const { default: connectDB } = require('./configs/database-connection');
require('dotenv').config();

const PORT = process.env.PORT || 4000;

// Database connection
connectDB()

// Middlewares
app.use(express.json());
app.use(cors());
app.use(morgan("dev"));

// Import routes
import companyRoutes from "./routes/company-routes";
import authRoutes from "./routes/auth-routes.js";
import categoryRoutes from "./routes/categories-routes.js";
import productRoutes from "./routes/products-routes.js";
import productSpecificationRoutes from "./routes/product-specification-routes.js";
import cabinRoutes from "./routes/cabin-routes.js";
import doorSystemRoutes from "./routes/door-system-routes.js";
import elevatorMachineRoutes from "./routes/elevator-machine-routes.js";
import projectRoutes from "./routes/project-routes.js";
import clientRoutes from "./routes/client-routes.js";
import projectClientRoutes from "./routes/project-client-routes.js";
import inquiryRoutes from "./routes/inquiry-routes.js";

// Using Routes
app.use("/api/companies", companyRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/products", productRoutes);
app.use("/api/product-specifications", productSpecificationRoutes);
app.use("/api/cabins", cabinRoutes);
app.use("/api/door-systems", doorSystemRoutes);
app.use("/api/elevator-machines", elevatorMachineRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/clients", clientRoutes);
app.use("/api/project-clients", projectClientRoutes);
app.use("/api/inquiries", inquiryRoutes);

const app = express();

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}:\t\t http://localhost:${PORT}\n`);
})

app.route('/').get((req, res) => {
    res.send("Invent backend server is running !!!")
})
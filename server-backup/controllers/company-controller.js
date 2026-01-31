import Company from "../models/company.js";

// CREATE company
export const createCompany = async (req, res) => {
    try {
        const company = await Company.create(req.body);
        res.status(201).json(company);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// GET all companies
export const getCompanies = async (req, res) => {
    try {
        const companies = await Company.find();
        res.json(companies);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// GET single company
export const getCompanyById = async (req, res) => {
    try {
        const company = await Company.findById(req.params.id);
        if (!company)
            return res.status(404).json({ message: "Company not found" });

        res.json(company);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// UPDATE company
export const updateCompany = async (req, res) => {
    try {
        const company = await Company.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );

        if (!company)
            return res.status(404).json({ message: "Company not found" });

        res.json(company);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// DELETE company
export const deleteCompany = async (req, res) => {
    try {
        const company = await Company.findByIdAndDelete(req.params.id);
        if (!company)
            return res.status(404).json({ message: "Company not found" });

        res.json({ message: "Company deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

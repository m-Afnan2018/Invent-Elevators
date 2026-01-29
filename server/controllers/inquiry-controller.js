import Inquiry from "../models/inquiry.js";

/**
 * CREATE inquiry (PUBLIC – no auth)
 */
export const createInquiry = async (req, res) => {
    try {
        const inquiry = await Inquiry.create(req.body);
        res.status(201).json({
            message: "Inquiry submitted successfully",
            inquiry
        });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

/**
 * GET all inquiries (company based – ADMIN)
 */
export const getInquiries = async (req, res) => {
    try {
        const inquiries = await Inquiry.find({
            companyId: req.user.companyId
        }).sort({ createdAt: -1 });

        res.json(inquiries);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

/**
 * GET single inquiry
 */
export const getInquiryById = async (req, res) => {
    try {
        const inquiry = await Inquiry.findOne({
            _id: req.params.id,
            companyId: req.user.companyId
        });

        if (!inquiry)
            return res.status(404).json({ message: "Inquiry not found" });

        res.json(inquiry);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

/**
 * UPDATE inquiry status
 */
export const updateInquiry = async (req, res) => {
    try {
        const inquiry = await Inquiry.findOneAndUpdate(
            {
                _id: req.params.id,
                companyId: req.user.companyId
            },
            req.body,
            { new: true }
        );

        if (!inquiry)
            return res.status(404).json({ message: "Inquiry not found" });

        res.json(inquiry);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

/**
 * DELETE inquiry
 */
export const deleteInquiry = async (req, res) => {
    try {
        const inquiry = await Inquiry.findOneAndDelete({
            _id: req.params.id,
            companyId: req.user.companyId
        });

        if (!inquiry)
            return res.status(404).json({ message: "Inquiry not found" });

        res.json({ message: "Inquiry deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

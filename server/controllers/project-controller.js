import Project from "../models/project.js";
import ProjectClient from "../models/project-client.js";

/**
 * CREATE project
 */
export const createProject = async (req, res) => {
    try {
        const project = await Project.create({
            ...req.body,
            companyId: req.user.companyId
        });

        res.status(201).json(project);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

/**
 * GET all projects (company based)
 */
export const getProjects = async (req, res) => {
    try {
        const projects = await Project.find({
            companyId: req.user.companyId
        }).sort({ createdAt: -1 });

        res.json(projects);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

/**
 * GET single project with clients
 */
export const getProjectById = async (req, res) => {
    try {
        const project = await Project.findOne({
            _id: req.params.id,
            companyId: req.user.companyId
        });

        if (!project)
            return res.status(404).json({ message: "Project not found" });

        const clients = await ProjectClient.find({
            projectId: project._id
        }).populate("clientId");

        res.json({ project, clients });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

/**
 * DELETE project
 */
export const deleteProject = async (req, res) => {
    try {
        const project = await Project.findOneAndDelete({
            _id: req.params.id,
            companyId: req.user.companyId
        });

        if (!project)
            return res.status(404).json({ message: "Project not found" });

        await ProjectClient.deleteMany({ projectId: project._id });

        res.json({ message: "Project deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

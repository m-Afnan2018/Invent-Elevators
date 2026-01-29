import ProjectClient from "../models/project-client.js";

/**
 * ASSIGN client to project
 */
export const assignClientToProject = async (req, res) => {
    const { projectId, clientId } = req.body;

    try {
        const mapping = await ProjectClient.create({
            projectId,
            clientId
        });

        res.status(201).json(mapping);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

/**
 * REMOVE client from project
 */
export const removeClientFromProject = async (req, res) => {
    try {
        await ProjectClient.findByIdAndDelete(req.params.id);
        res.json({ message: "Client removed from project" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

import Project from "../models/Project.model.js";
import { createOne, deleteOne, getAll, getOne, updateOne } from "./crud.factory.js";

export const createProject = createOne(Project);
export const getAllProjects = getAll(Project, "linkedProducts");
export const getProjectById = getOne(Project, "linkedProducts");
export const updateProject = updateOne(Project);
export const deleteProject = deleteOne(Project);

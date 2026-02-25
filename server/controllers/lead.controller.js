import Lead from "../models/Lead.model.js";
import { createOne, deleteOne, getAll, getOne, updateOne } from "./crud.factory.js";

export const createLead = createOne(Lead);
export const getAllLeads = getAll(Lead, "assignedTo productInterest");
export const getLeadById = getOne(Lead, "assignedTo productInterest");
export const updateLead = updateOne(Lead);
export const deleteLead = deleteOne(Lead);

import Attribute from "../models/Attribute.model.js";
import { createOne, deleteOne, getAll, getOne, updateOne } from "./crud.factory.js";

export const createAttribute = createOne(Attribute);
export const getAllAttributes = getAll(Attribute, "category");
export const getAttributeById = getOne(Attribute, "category");
export const updateAttribute = updateOne(Attribute);
export const deleteAttribute = deleteOne(Attribute);

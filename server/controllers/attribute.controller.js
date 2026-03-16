import Attribute from "../models/Attribute.model.js";
import { createOne, deleteOne, getAll, getOne, updateOne } from "./crud.factory.js";

const normalizeAttributePayload = (payload = {}) => {
  const next = { ...payload };

  if (next.category && !next.categories) {
    next.categories = [next.category];
  }

  if (!Array.isArray(next.categories)) {
    next.categories = [];
  }

  next.categories = next.categories.filter(Boolean);
  delete next.category;

  return next;
};

export const createAttribute = async (req, res) => {
  req.body = normalizeAttributePayload(req.body);
  return createOne(Attribute)(req, res);
};

export const getAllAttributes = getAll(Attribute, "categories");
export const getAttributeById = getOne(Attribute, "categories");

export const updateAttribute = async (req, res) => {
  req.body = normalizeAttributePayload(req.body);
  return updateOne(Attribute)(req, res);
};

export const deleteAttribute = deleteOne(Attribute);

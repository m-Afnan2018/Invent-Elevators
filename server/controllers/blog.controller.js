import Blog from "../models/Blog.model.js";
import { createOne, deleteOne, getAll, getOne, updateOne } from "./crud.factory.js";

export const createBlog = createOne(Blog);
export const getAllBlogs = getAll(Blog);
export const getBlogById = getOne(Blog);
export const updateBlog = updateOne(Blog);
export const deleteBlog = deleteOne(Blog);

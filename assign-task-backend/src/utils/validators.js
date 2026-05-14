import { z } from "zod";
import mongoose from "mongoose";

const objectIdRefinement = (val) => {
  return mongoose.Types.ObjectId.isValid(val);
};

export const registerSchema = z.object({
  body: z.object({
    fullName: z.string({ required_error: "Full name is required" }).min(2, "Full name must be at least 2 characters"),
    email: z.string({ required_error: "Email is required" }).email("Invalid email address"),
    password: z.string({ required_error: "Password is required" }).min(6, "Password must be at least 6 characters"),
    role: z.enum(["ADMIN", "MANAGER", "USER"]).optional(),
  }),
});

export const loginSchema = z.object({
  body: z.object({
    email: z.string({ required_error: "Email is required" }).email("Invalid email address"),
    password: z.string({ required_error: "Password is required" }).min(1, "Password is required"),
  }),
});

export const createTaskSchema = z.object({
  body: z.object({
    title: z.string({ required_error: "Title is required" }).min(1, "Title cannot be empty"),
    description: z.string().optional(),
    status: z.enum(["TODO", "IN_PROGRESS", "DONE"]).optional(),
    priority: z.enum(["LOW", "MEDIUM", "HIGH"]).optional(),
    assignedTo: z.string({ required_error: "assignedTo is required" }).refine(objectIdRefinement, {
      message: "Invalid assignedTo ObjectId",
    }),
  }),
});

export const updateTaskSchema = z.object({
  params: z.object({
    id: z.string().refine(objectIdRefinement, { message: "Invalid Task ID" }),
  }),
  body: z.object({
    title: z.string().min(1, "Title cannot be empty").optional(),
    description: z.string().optional(),
    status: z.enum(["TODO", "IN_PROGRESS", "DONE"]).optional(),
    priority: z.enum(["LOW", "MEDIUM", "HIGH"]).optional(),
    assignedTo: z.string().refine(objectIdRefinement, {
      message: "Invalid assignedTo ObjectId",
    }).optional(),
  }),
});

export const updateTaskStatusSchema = z.object({
  params: z.object({
    id: z.string().refine(objectIdRefinement, { message: "Invalid Task ID" }),
  }),
  body: z.object({
    status: z.enum(["TODO", "IN_PROGRESS", "DONE"], {
      required_error: "Status is required",
    }),
  }),
});

export const assignTaskSchema = z.object({
  params: z.object({
    id: z.string().refine(objectIdRefinement, { message: "Invalid Task ID" }),
  }),
  body: z.object({
    assignedTo: z.string({ required_error: "assignedTo is required" }).refine(objectIdRefinement, {
      message: "Invalid assignedTo ObjectId",
    }),
  }),
});

export const objectIdParamSchema = z.object({
  params: z.object({
    id: z.string().refine(objectIdRefinement, { message: "Invalid ID format" }),
  }),
});

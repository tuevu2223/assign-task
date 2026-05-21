import express from "express";
import {
  getTasks,
  getMyTasks,
  getTaskById,
  createTask,
  updateTask,
  deleteTask,
  updateTaskStatus,
  updateMyTaskStatus,
  assignTask,
} from "../controllers/task.controller.js";
import { verifyToken } from "../middlewares/auth.middleware.js";
import { authorizeRoles } from "../middlewares/role.middleware.js";
import { validate } from "../middlewares/validate.middleware.js";
import {
  createTaskSchema,
  updateTaskSchema,
  updateTaskStatusSchema,
  updateMyTaskStatusSchema,
  assignTaskSchema,
  objectIdParamSchema,
} from "../utils/validators.js";

const router = express.Router();

// Apply auth middleware to all routes below
router.use(verifyToken);

/**
 * @swagger
 * /tasks:
 *   get:
 *     summary: Get tasks
 *     tags: [Tasks]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: status
 *         schema:
 *           type: string
 *           enum: [TODO, IN_PROGRESS, DONE]
 *       - in: query
 *         name: priority
 *         schema:
 *           type: string
 *           enum: [LOW, MEDIUM, HIGH]
 *       - in: query
 *         name: assignedTo
 *         schema:
 *           type: string
 *       - in: query
 *         name: search
 *         description: Search by title
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: List of tasks
 */
router.get("/tasks", authorizeRoles("ADMIN", "MANAGER", "USER"), getTasks);

/**
 * @swagger
 * /tasks/my-tasks:
 *   get:
 *     summary: Get tasks assigned to the currently authenticated user
 *     tags: [Tasks]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: status
 *         schema:
 *           type: string
 *           enum: [TODO, IN_PROGRESS, DONE]
 *       - in: query
 *         name: priority
 *         schema:
 *           type: string
 *           enum: [LOW, MEDIUM, HIGH]
 *       - in: query
 *         name: search
 *         description: Search by title
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: List of tasks assigned to the user
 */
router.get("/tasks/my-tasks", authorizeRoles("ADMIN", "MANAGER", "USER"), getMyTasks);

/**
 * @swagger
 * /tasks/my-tasks/status:
 *   patch:
 *     summary: Update status of a task assigned to the currently authenticated user
 *     tags: [Tasks]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - taskId
 *               - status
 *             properties:
 *               taskId:
 *                 type: string
 *                 description: Task ID
 *               status:
 *                 type: string
 *                 enum: [TODO, IN_PROGRESS, DONE]
 *                 description: New status of the task
 *     responses:
 *       200:
 *         description: Task status updated successfully
 *       400:
 *         description: Invalid input data
 *       403:
 *         description: Forbidden - Task not assigned to the user
 *       404:
 *         description: Task not found
 */
router.patch(
  "/tasks/my-tasks/status",
  authorizeRoles("ADMIN", "MANAGER", "USER"),
  validate(updateMyTaskStatusSchema),
  updateMyTaskStatus
);


/**
 * @swagger
 * /tasks/{id}:
 *   get:
 *     summary: Get task by ID
 *     tags: [Tasks]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Task details
 *       404:
 *         description: Task not found
 */
router.get("/tasks/:id", validate(objectIdParamSchema), getTaskById);

/**
 * @swagger
 * /tasks:
 *   post:
 *     summary: Create a new task (Admin, Manager)
 *     tags: [Tasks]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - assignedTo
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               status:
 *                 type: string
 *                 enum: [TODO, IN_PROGRESS, DONE]
 *               priority:
 *                 type: string
 *                 enum: [LOW, MEDIUM, HIGH]
 *               assignedTo:
 *                 type: string
 *     responses:
 *       201:
 *         description: Task created
 *       403:
 *         description: Forbidden
 */
router.post(
  "/tasks",
  authorizeRoles("ADMIN", "MANAGER"),
  validate(createTaskSchema),
  createTask
);

/**
 * @swagger
 * /tasks/{id}:
 *   put:
 *     summary: Update task (Admin, Manager)
 *     tags: [Tasks]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               status:
 *                 type: string
 *                 enum: [TODO, IN_PROGRESS, DONE]
 *               priority:
 *                 type: string
 *                 enum: [LOW, MEDIUM, HIGH]
 *               assignedTo:
 *                 type: string
 *     responses:
 *       200:
 *         description: Task updated
 *       403:
 *         description: Forbidden
 */
router.put(
  "/tasks/:id",
  authorizeRoles("ADMIN", "MANAGER"),
  validate(updateTaskSchema),
  updateTask
);

/**
 * @swagger
 * /tasks/{id}:
 *   delete:
 *     summary: Delete task (Admin, Manager)
 *     tags: [Tasks]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Task deleted
 *       403:
 *         description: Forbidden
 */
router.delete(
  "/tasks/:id",
  authorizeRoles("ADMIN", "MANAGER"),
  validate(objectIdParamSchema),
  deleteTask
);

/**
 * @swagger
 * /tasks/{id}/status:
 *   patch:
 *     summary: Update task status (Admin, Manager, User)
 *     tags: [Tasks]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - status
 *             properties:
 *               status:
 *                 type: string
 *                 enum: [TODO, IN_PROGRESS, DONE]
 *     responses:
 *       200:
 *         description: Task status updated
 */
router.patch(
  "/tasks/:id/status",
  authorizeRoles("ADMIN", "MANAGER", "USER"),
  validate(updateTaskStatusSchema),
  updateTaskStatus
);

/**
 * @swagger
 * /tasks/{id}/assign:
 *   patch:
 *     summary: Reassign task (Admin, Manager)
 *     tags: [Tasks]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - assignedTo
 *             properties:
 *               assignedTo:
 *                 type: string
 *     responses:
 *       200:
 *         description: Task reassigned
 *       403:
 *         description: Forbidden
 */
router.patch(
  "/tasks/:id/assign",
  authorizeRoles("ADMIN", "MANAGER"),
  validate(assignTaskSchema),
  assignTask
);

export default router;

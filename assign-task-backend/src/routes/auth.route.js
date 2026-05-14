import { Router } from "express";
import { login, signup } from "../controllers/auth.controller.js";

const router = Router();

/**
 * @openapi
 * /signup:
 *   post:
 *     summary: Register a new user.
 *     description: Register a new user with full name, email, and password.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - fullName
 *               - email
 *               - password
 *             properties:
 *               fullName:
 *                 type: string
 *                 example: John Doe
 *               email:
 *                 type: string
 *                 example: user@example.com
 *               password:
 *                 type: string
 *                 example: yourpassword
 *     responses:
 *       201:
 *         description: User registered successfully.
 *       400:
 *         description: Bad request.
 */
router.post("/signup", signup);

/**
 * @openapi
 * /login:
 *   post:
 *     summary: Login a user.
 *     description: Authenticate a user with email and password.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 example: user@example.com
 *               password:
 *                 type: string
 *                 example: yourpassword
 *     responses:
 *       200:
 *         description: Login successfully and return access/refresh tokens.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 accessToken:
 *                   type: string
 *                   example: your-access-token
 *                 refreshToken:
 *                   type: string
 *                   example: your-refresh-token
 *       400:
 *         description: Invalid credentials or account banned.
 */
router.post("/login", login);

export default router;

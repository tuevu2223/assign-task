import { createUser, loginWithPassword } from "../services/auth.service.js";

export const signup = async (req, res) => {
  try {
    const { fullName, email, password } = req.body ?? {};
    await createUser({ fullName, email, password });
    return res.status(201).json({
      message: "User registered successfully.",
    });
  } catch (err) {
    if (err.code === 11000 || err.code === "EMAIL_IN_USE") {
      return res.status(400).json({ message: "Bad request." });
    }
    if (
      err.code === "INVALID_INPUT" ||
      err.code === "INVALID_EMAIL" ||
      err.code === "WEAK_PASSWORD"
    ) {
      return res.status(400).json({ message: "Bad request." });
    }
    console.error(err);
    return res.status(400).json({ message: "Bad request." });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body ?? {};
    const tokens = await loginWithPassword({ email, password });
    return res.status(200).json(tokens);
  } catch (err) {
    if (err.code === "INVALID_CREDENTIALS") {
      return res.status(400).json({
        message: "Invalid credentials or account banned.",
      });
    }
    console.error(err);
    return res.status(500).json({ message: "Internal server error." });
  }
};

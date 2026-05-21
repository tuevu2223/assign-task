import "dotenv/config";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import User from "./models/user.model.js";
import app from "./app.js";

const PORT = Number(process.env.PORT) || 5000;
const MONGODB_URI =
  process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/assign-tasks";

async function start() {
  try {
    await mongoose.connect(MONGODB_URI, {
      serverSelectionTimeoutMS: 5000,
    });
    console.log("MongoDB connected");

    // Generate a clean token for debugging
    const admin = await User.findOne({ role: "ADMIN" });
    if (admin) {
      const token = jwt.sign({ id: admin._id }, process.env.ACCESS_TOKEN_SECRET || "replace-with-strong-access-secret", { expiresIn: "1d" });
      console.log("\n--- CLEAN ADMIN TOKEN FOR SWAGGER ---");
      console.log(token);
      console.log("--------------------------------------\n");
    }

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
      console.log(`Swagger UI: http://localhost:${PORT}/api-docs`);
    });
  } catch (err) {
    console.error("Failed to start server:", err.message);
    process.exit(1);
  }
}

start();

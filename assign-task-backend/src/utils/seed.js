import mongoose from "mongoose";
import bcrypt from "bcrypt";
import "dotenv/config";
import User from "../models/user.model.js";
import Task from "../models/task.model.js";

const MONGODB_URI = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/assign-tasks";

const seedData = async () => {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log("MongoDB connected for seeding...");

    // Clear existing data
    await User.deleteMany({});
    await Task.deleteMany({});
    console.log("Cleared existing data");

    const salt = await bcrypt.genSalt(10);
    const password = await bcrypt.hash("123456", salt);

    // Create Users
    const admin = await User.create({
      fullName: "Admin User",
      email: "admin@example.com",
      password,
      role: "ADMIN",
    });

    const manager1 = await User.create({
      fullName: "Manager One",
      email: "manager1@example.com",
      password,
      role: "MANAGER",
    });

    const manager2 = await User.create({
      fullName: "Manager Two",
      email: "manager2@example.com",
      password,
      role: "MANAGER",
    });

    const user1 = await User.create({
      fullName: "Normal User One",
      email: "user1@example.com",
      password,
      role: "USER",
    });

    const user2 = await User.create({
      fullName: "Normal User Two",
      email: "user2@example.com",
      password,
      role: "USER",
    });

    // Create Tasks
    await Task.create([
      {
        title: "Setup Backend Architecture",
        description: "Initialize Node.js, Express, MongoDB and structure folders",
        status: "DONE",
        priority: "HIGH",
        createdBy: manager1._id,
        assignedTo: user1._id,
      },
      {
        title: "Implement Authentication",
        description: "Add JWT auth and user roles",
        status: "IN_PROGRESS",
        priority: "HIGH",
        createdBy: manager1._id,
        assignedTo: user2._id,
      },
      {
        title: "Design Frontend UI",
        description: "Create wireframes and mockups for the dashboard",
        status: "TODO",
        priority: "MEDIUM",
        createdBy: manager2._id,
        assignedTo: user1._id,
      },
    ]);

    console.log("Database seeded successfully!");
    console.log("-------------------------------");
    console.log("Test Accounts (Password: 123456)");
    console.log(`ADMIN: ${admin.email}`);
    console.log(`MANAGER: ${manager1.email}`);
    console.log(`USER: ${user1.email}`);
    console.log("-------------------------------");

    process.exit(0);
  } catch (error) {
    console.error("Error seeding database:", error);
    process.exit(1);
  }
};

seedData();

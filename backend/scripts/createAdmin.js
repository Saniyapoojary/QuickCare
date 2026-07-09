import mongoose from "mongoose";
import bcrypt from "bcrypt";
import dotenv from "dotenv";

import connectDB from "../config/mongodb.js";
import adminModel from "../models/adminModel.js";

dotenv.config();

const createAdmin = async () => {
  try {
    await connectDB();

    const existingAdmin = await adminModel.findOne({
      email: "admin@quickcare.com",
    });

    if (existingAdmin) {
      console.log("Admin already exists.");
      process.exit();
    }

    const hashedPassword = await bcrypt.hash("Admin@123", 10);

    await adminModel.create({
      name: "QuickCare Admin",
      email: "admin@quickcare.com",
      password: hashedPassword,
    });

    console.log("Admin created successfully!");
    process.exit();

  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

createAdmin();
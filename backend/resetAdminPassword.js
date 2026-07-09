import mongoose from "mongoose";
import bcrypt from "bcrypt";
import dotenv from "dotenv";

dotenv.config();

const run = async () => {
  try {
    // Connect to MongoDB Atlas
    await mongoose.connect(process.env.MONGODB_URI);

    // Hash the new password
    const hashedPassword = await bcrypt.hash("admin123", 10);

    // Update admin password
    const result = await mongoose.connection.collection("admins").updateOne(
      { email: "admin@quickcare.com" },
      {
        $set: {
          password: hashedPassword,
        },
      }
    );

    console.log("Password updated successfully!");
    console.log(result);

    process.exit();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

run();
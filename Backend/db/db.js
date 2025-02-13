import mongoose from "mongoose";

export async function connectToDb() {
    try {
      await mongoose.connect(process.env.DB_CONNECT);
      console.log("Connected to DB");
    } catch (err) {
      console.error("Error connecting to DB:", err); // Use console.error for errors
      throw err; // Re-throw the error for proper handling (optional but recommended)
    }
  }

const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect("mongodb+srv://test:test123@cluster0.7pc8x2s.mongodb.net/?appName=Cluster0");
    console.log("MongoDB Connected 🔥");
  } catch (error) {
    console.log("DB Error:", error);
    process.exit(1);
  }
};

module.exports = connectDB;
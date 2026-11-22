
const express = require("express");
const cors = require("cors");
const path = require("path");
require("dotenv").config();

const connectDB = require("./config/db");
const pool = require("./config/postgres");

const contactRoutes = require("./routes/contactRoutes");
const visitorRoutes = require("./routes/visitorRoutes");
const chatRoutes = require("./routes/chatRoutes");

const app = express();

// Middleware
app.use(cors({
  origin: "*"
}));
app.use(express.json());

// Routes
app.use("/api", contactRoutes);
app.use("/api", visitorRoutes);
app.use("/api", chatRoutes);

// Health check
app.get("/health", (req, res) => {
  res.status(200).send("OK");
});

// Frontend
app.use(express.static(path.join(__dirname, "..", "frontend")));

// Error handler
app.use((err, req, res, next) => {
  console.error("Error:", err.message);
  res.status(500).json({ error: "Something went wrong" });
});

const PORT = process.env.PORT || 5000;

// Connect both databases
const startServer = async () => {
  try {
    // MongoDB connection
    await connectDB();
    console.log("MongoDB connected successfully!");

    // PostgreSQL connection test
    await pool.query("SELECT NOW()");
    console.log("PostgreSQL connected successfully!");

    // Start server
    app.listen(PORT, () => {
      console.log(`🚀 Server running at: http://localhost:${PORT}`);
    });

  } catch (error) {
    console.error("Database connection failed:", error.message);
    process.exit(1);
  }
};

startServer();

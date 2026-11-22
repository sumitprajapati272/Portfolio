
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

app.use(cors({ origin: "*" }));
app.use(express.json());

app.use("/api", contactRoutes);
app.use("/api", visitorRoutes);
app.use("/api", chatRoutes);

app.get("/health", (req, res) => {
  res.status(200).send("OK");
});

app.use(express.static(path.join(__dirname, "..", "frontend")));

const PORT = process.env.PORT || 5000;

// Start server first
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// Connect databases independently
connectDB()
  .then(() => console.log("MongoDB connected successfully!"))
  .catch((error) => console.error("MongoDB connection failed:", error.message));

pool.query("SELECT NOW()")
  .then(() => console.log("PostgreSQL connected successfully!"))
  .catch((error) => console.error("PostgreSQL connection failed:", error.message));

// Error handler
app.use((err, req, res, next) => {
  console.error("Error:", err.message);
  res.status(500).json({ error: "Something went wrong" });
});

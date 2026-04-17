const express = require("express");
const cors = require("cors");
require("dotenv").config();

const connectDB = require("./config/db");

const contactRoutes = require("./routes/contactRoutes");
const visitorRoutes = require("./routes/visitorRoutes");
const chatRoutes = require("./routes/chatRoutes");

const app = express();

// ✅ DB connect
connectDB();

// ✅ middleware
app.use(cors({
  origin: "*"
}));
app.use(express.json());

// ✅ routes
app.use("/api", contactRoutes);
app.use("/api", visitorRoutes);
app.use("/api", chatRoutes);

// ✅ health check route (important for Render)
app.get("/", (req, res) => {
  res.status(200).send("Backend running 🚀");
});

// ✅ error handler (VERY IMPORTANT)
app.use((err, req, res, next) => {
  console.error("Error:", err.message);
  res.status(500).json({ error: "Something went wrong" });
});

// ✅ FIXED PORT (Render compatible)
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
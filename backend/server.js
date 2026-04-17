const express = require("express");
const cors = require("cors");
require("dotenv").config();

const connectDB = require("./config/db");

const contactRoutes = require("./routes/contactRoutes");
const visitorRoutes = require("./routes/visitorRoutes");
const chatRoutes = require("./routes/chatRoutes");

const app = express();

// DB connect
connectDB();

// middleware
app.use(cors({
  origin: "*"
}));
app.use(express.json());

// routes
app.use("/api", contactRoutes);
app.use("/api", visitorRoutes);
app.use("/api", chatRoutes);

// test route
app.get("/", (req, res) => {
  res.send("Backend running 🚀");
});

// ✅ FIXED PORT
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
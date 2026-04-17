const express = require("express");
const cors = require("cors");
require("dotenv").config();


const connectDB = require("./config/db");

const contactRoutes = require("./routes/contactRoutes");
const visitorRoutes = require("./routes/visitorRoutes");
const chatRoutes = require("./routes/chatRoutes"); // ✅ add this

const app = express(); // ✅ pehle app define karo

// DB connect
connectDB();

// middleware
app.use(cors());
app.use(express.json());

// routes
app.use("/api", contactRoutes);
app.use("/api", visitorRoutes);
app.use("/api", chatRoutes); // ✅ yaha add karo

// test route
app.get("/", (req, res) => {
  res.send("Backend running 🚀");
});

app.listen(5000, () => console.log("Server running on port 5000"));
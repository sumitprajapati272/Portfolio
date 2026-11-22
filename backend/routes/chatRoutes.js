const express = require("express");
const { chatWithAI, chatStatus } = require("../controllers/chatController");

const router = express.Router();

router.post("/chat", chatWithAI);
router.get("/chat/status", chatStatus); // safe diagnostics, never exposes the API key

module.exports = router;
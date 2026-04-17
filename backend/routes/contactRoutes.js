const express = require("express");
const router = express.Router();

const {
  saveContact,
  getContacts,
  deleteContact,
  updateContact
} = require("../controllers/contactController");

// POST (save data)
router.post("/contact", saveContact);

// GET (fetch data)
router.get("/contact", getContacts);

// 🔥 DELETE (dashboard feature)
router.delete("/contact/:id", deleteContact);

// 🔥 UPDATE (optional pro feature)
router.put("/contact/:id", updateContact);

module.exports = router;
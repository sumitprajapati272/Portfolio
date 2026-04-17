const express = require("express");
const router = express.Router();

const { trackVisitor } = require("../controllers/visitorController");

router.post("/visit", trackVisitor);

module.exports = router;
const Visitor = require("../models/Visitor");

const trackVisitor = async (req, res) => {
  try {
    const visitor = new Visitor({
      ip: req.ip,
      userAgent: req.headers["user-agent"]
    });

    await visitor.save();

    res.status(200).json({ message: "Visitor tracked ✅" });
  } catch (error) {
    res.status(500).json({ error: "Error tracking visitor ❌" });
  }
};

module.exports = { trackVisitor };
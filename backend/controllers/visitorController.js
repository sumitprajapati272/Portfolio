const Visitor = require("../models/Visitor");
const sendNotification = require("../services/emailService");

const trackVisitor = async (req, res) => {
  try {
    const visitor = new Visitor({
      ip: req.ip,
      userAgent: req.headers["user-agent"]
    });

    await visitor.save();

    try {
      await sendNotification({
        subject: "New Portfolio Visitor",
        text: `Someone visited your portfolio!\nIP: ${req.ip}\nBrowser: ${req.headers["user-agent"]}`
      });

      console.log("Visitor notification email sent!");
    } catch (emailError) {
      console.error("Visitor email failed:", emailError.message);
    }

    res.status(200).json({ message: "Visitor tracked ✅" });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error tracking visitor ❌" });
  }
};

module.exports = { trackVisitor };
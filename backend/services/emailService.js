
const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_APP_PASSWORD
  }
});

const sendNotification = async ({ subject, text }) => {
  return await transporter.sendMail({
    from: `"Portfolio Notifications" <${process.env.GMAIL_USER}>`,
    to: process.env.NOTIFY_EMAIL,
    subject,
    text
  });
};

module.exports = sendNotification;

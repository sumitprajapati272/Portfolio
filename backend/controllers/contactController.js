
const sendNotification = require("../services/emailService");
const Contact = require("../models/Contact");
const pool = require("../config/postgres");

// SAVE CONTACT IN BOTH DATABASES
const saveContact = async (req, res) => {
  try {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({
        error: "Name, email and message are required"
      });
    }

    // 1. Save in MongoDB
    const newContact = new Contact({
      name,
      email,
      message
    });

    await newContact.save();

    // 2. Save in PostgreSQL
    await pool.query(
      `INSERT INTO public.portfolio_messages
       (name, email, message)
       VALUES ($1, $2, $3)`,
      [name, email, message]
    );

    console.log("Contact saved in MongoDB and PostgreSQL!");

    // 3. Send Gmail notification
    try {
      await sendNotification({
        subject: "New Portfolio Contact Message",
        text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`
      });

      console.log("Notification email sent!");
    } catch (emailError) {
      console.error("Email failed:", emailError.message);
    }

    res.status(201).json({
      message: "Message saved in both databases successfully!"
    });

  } catch (error) {
    console.error("Contact save error:", error.message);

    res.status(500).json({
      error: "Server error while saving contact"
    });
  }
};

// GET ALL CONTACTS FROM MONGODB
const getContacts = async (req, res) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 });

    res.status(200).json(contacts);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: "Server error" });
  }
};

// DELETE CONTACT FROM MONGODB
const deleteContact = async (req, res) => {
  try {
    const { id } = req.params;

    await Contact.findByIdAndDelete(id);

    res.status(200).json({
      message: "Deleted successfully"
    });
  } catch (error) {
    res.status(500).json({ error: "Delete failed" });
  }
};

// UPDATE CONTACT IN MONGODB
const updateContact = async (req, res) => {
  try {
    const { id } = req.params;

    const updated = await Contact.findByIdAndUpdate(
      id,
      req.body,
      { new: true }
    );

    res.status(200).json(updated);
  } catch (error) {
    res.status(500).json({ error: "Update failed" });
  }
};

module.exports = {
  saveContact,
  getContacts,
  deleteContact,
  updateContact
};

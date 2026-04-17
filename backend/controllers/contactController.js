const Contact = require("../models/Contact");

// SAVE CONTACT
const saveContact = async (req, res) => {
  try {
    const { name, email, message } = req.body;

    const newContact = new Contact({
      name,
      email,
      message
    });

    await newContact.save();

    res.status(201).json({ message: "Message saved successfully ✅" });
  } catch (error) {
    res.status(500).json({ error: "Server error ❌" });
  }
};

// GET ALL CONTACTS (dashboard ke liye)
const getContacts = async (req, res) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 });
    res.status(200).json(contacts);
  } catch (error) {
    res.status(500).json({ error: "Server error ❌" });
  }
};

// 🔥 DELETE CONTACT (dashboard ka main feature)
const deleteContact = async (req, res) => {
  try {
    const { id } = req.params;

    await Contact.findByIdAndDelete(id);

    res.status(200).json({ message: "Deleted successfully ✅" });
  } catch (error) {
    res.status(500).json({ error: "Delete failed ❌" });
  }
};

// 🔥 OPTIONAL: UPDATE CONTACT (pro feature)
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
    res.status(500).json({ error: "Update failed ❌" });
  }
};

// EXPORT ALL
module.exports = {
  saveContact,
  getContacts,
  deleteContact,
  updateContact
};
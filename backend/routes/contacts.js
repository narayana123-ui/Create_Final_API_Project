const express = require("express");
const router = express.Router();
const Contact = require('../models/contactModel');
const mongoose = require('mongoose');

// POST - Add a new contact
router.post("/", async (req, res) => {
  const { name, phone, email, address } = req.body;

  try {
    // Check if contact already exists
    const existingContact = await Contact.findOne({ phone });
    if (existingContact) {
      return res.status(400).json({ message: "Contact with this phone number already exists." });
    }

    const newContact = new Contact({ name, phone, email, address });
    await newContact.save();
    res.status(201).json(newContact);
  } catch (error) {
    console.error("Error adding contact:", error);
    res.status(500).json({ message: "Error adding contact." });
  }
});

// GET - Retrieve all contacts
router.get("/", async (req, res) => {
  const contacts = await Contact.find();
  res.status(200).json(contacts);
});

// GET - Retrieve a single contact
router.get("/:id", async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "Contact does not exist." });
  }
  const contact = await Contact.findById(id);
  if (!contact) {
    return res.status(404).json({ error: "Contact does not exist." });
  }
  res.status(200).json(contact);
});

// PATCH - Update a contact
router.patch("/:id", async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "Contact does not exist." });
  }

  try {
    const contact = await Contact.findOneAndUpdate({ _id: id }, { ...req.body }, { new: true });
    if (!contact) {
      return res.status(404).json({ error: "Contact does not exist." });
    }
    res.status(200).json(contact);
  } catch (error) {
    console.error("Error updating contact:", error);
    res.status(500).json({ message: "Error updating contact." });
  }
});

// DELETE - Remove a contact
router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "Contact does not exist." });
  }
  const contact = await Contact.findOneAndDelete({ _id: id });
  if (!contact) {
    return res.status(404).json({ error: "Contact does not exist." });
  }
  res.status(200).json({ message: "Contact deleted successfully." });
});

module.exports = router;

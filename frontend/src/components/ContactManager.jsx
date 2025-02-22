import React, { useState, useEffect } from "react";
import axios from "axios";
import ContactForm from "./ContactForm";
import ContactList from "./ContactList";
import AddContact from "./AddContact";
import DeleteContact from "./DeleteContact";

const ContactManager = () => {
  const [contacts, setContacts] = useState([]);
  const [form, setForm] = useState({ name: "", phone: "", email: "", address: "" });
  const [editId, setEditId] = useState(null);
  const [deleteId, setDeleteId] = useState(null);
  const [selectedContact, setSelectedContact] = useState(null); // NEW STATE

  // Fetch all contacts
  useEffect(() => {
    axios.get("http://127.0.0.1:3000/api/contacts")
      .then(response => setContacts(response.data))
      .catch(error => console.error("Error fetching contacts:", error));
  }, []);

  // Fetch single contact by ID
  const fetchContactById = async (id) => {
    try {
      const response = await axios.get(`http://127.0.0.1:3000/api/contacts/${id}`);
      setSelectedContact(response.data);
    } catch (error) {
      console.error("Error fetching contact:", error);
      setSelectedContact(null);
    }
  };

  // Handle input changes
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Add or Update Contact
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (editId) {
        await axios.patch(`http://127.0.0.1:3000/api/contacts/${editId}`, form);
        setContacts(contacts.map(contact => (contact._id === editId ? { ...contact, ...form } : contact)));
        setEditId(null);
      } else {
        const isDuplicate = contacts.some(
          (contact) => contact.email.toLowerCase() === form.email.toLowerCase() || contact.phone === form.phone
        );

        if (isDuplicate) {
          alert("A contact with the same phone or email already exists.");
          return;
        }
        const response = await axios.post("http://127.0.0.1:3000/api/contacts", form);
        setContacts([...contacts, response.data]);
      }

      setForm({ name: "", phone: "", email: "", address: "" });
    } catch (error) {
      console.error("Error saving contact:", error);
    }
  };

  // Edit Contact
  const handleEdit = (contact) => {
    setForm(contact);
    setEditId(contact._id);
  };

  // Confirm Delete Contact (Opens Delete Modal)
  const confirmDelete = (id) => {
    setDeleteId(id);
  };

  // Delete Contact
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://127.0.0.1:3000/api/contacts/${id}`);
      setContacts(contacts.filter(contact => contact._id !== id));
      setDeleteId(null);
    } catch (error) {
      console.error("Error deleting contact:", error);
    }
  };

  return (
    <div>
      <AddContact editId={editId} form={form} handleChange={handleChange} handleSubmit={handleSubmit} />
      <DeleteContact contactId={deleteId} handleDelete={handleDelete} onCancel={() => setDeleteId(null)} />
      <ContactList contacts={contacts} handleEdit={handleEdit} handleDelete={setDeleteId} fetchContactById={fetchContactById} />
      {selectedContact && (
        <div>
          <h3>Contact Details</h3>
          <p><strong>Name:</strong> {selectedContact.name}</p>
          <p><strong>Phone:</strong> {selectedContact.phone}</p>
          <p><strong>Email:</strong> {selectedContact.email}</p>
          <p><strong>Address:</strong> {selectedContact.address}</p>
          <button onClick={() => setSelectedContact(null)} style={{ backgroundColor: "red", color: "white", border: "none", padding: "5px 10px", cursor: "pointer" }}>
            Close
          </button>
        </div>
      )}
    </div>
  );
};

export default ContactManager;

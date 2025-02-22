import { useState } from 'react'

const ContactForm = ({ form, handleChange, handleSubmit, editId }) => {
  return (
    <form onSubmit={handleSubmit}>
      <input type="text" name="name" placeholder="Name" value={form.name} onChange={handleChange} required />
      <input type="text" name="phone" placeholder="Phone" value={form.phone} onChange={handleChange} required />
      <input type="email" name="email" placeholder="Email" value={form.email} onChange={handleChange} required />
      <input type="text" name="address" placeholder="Address" value={form.address} onChange={handleChange} />
      <button type="submit">{editId ? "Update Contact" : "Add Contact"}</button>
    </form>
  );
};

export default ContactForm;

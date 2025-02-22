import { useState, useEffect } from "react";

const AddContact = ({ editId, form, handleChange, handleSubmit }) => {
  return (
    <form onSubmit={handleSubmit}>
      <h2>{editId ? "Update Contact" : "Add Contact"}</h2>
      <input type="text" name="name" placeholder="Name" value={form.name} onChange={handleChange} required />
      <input type="text" name="phone" placeholder="Phone" value={form.phone} onChange={handleChange} required />
      <input type="email" name="email" placeholder="Email" value={form.email} onChange={handleChange} required />
      <input type="text" name="address" placeholder="Address" value={form.address} onChange={handleChange} />
      <button type="submit" style={{ backgroundColor: "#FF00FF", color: "white", marginLeft: "5px", border: "none", padding: "5px 10px", cursor: "pointer" }}>{editId ? "Update Contact" : "Add Contact"}</button>
    </form>
  );
};

export default AddContact;

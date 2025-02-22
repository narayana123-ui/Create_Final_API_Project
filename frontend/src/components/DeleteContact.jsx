const DeleteContact = ({ contactId, handleDelete, onCancel }) => {
  if (!contactId) return null; // Show nothing if no contact selected

  return (
    <div>
      <h3>Are you sure you want to delete this contact?</h3>
      <button onClick={() => handleDelete(contactId)} style={{ backgroundColor: "#1abc9c", color: "white", marginRight: "10px", border: "none", padding: "5px 10px", cursor: "pointer" }}>Yes, Delete</button>
	  <button onClick={onCancel} style={{ backgroundColor: "#FF0000", color: "white", marginRight: "10px", border: "none", padding: "5px 10px", cursor: "pointer" }}>Cancel</button>
    </div>
  );
};

export default DeleteContact;

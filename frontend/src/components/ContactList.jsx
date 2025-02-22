const ContactList = ({ contacts, handleEdit, handleDelete, fetchContactById }) => {
  return (
    <div>
      <h2>All Contacts</h2>
      <table border="1" style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr style={{ backgroundColor: "#f8f8f8" }}>
            <th style={{ backgroundColor: "#FFF1E7" }}>Name</th>
            <th style={{ backgroundColor: "#FFF1E7" }}>Phone</th>
            <th style={{ backgroundColor: "#FFF1E7" }}>Email</th>
            <th style={{ backgroundColor: "#FFF1E7" }}>Address</th>
            <th style={{ backgroundColor: "#FFF1E7" }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {contacts.map((contact) => (
            <tr key={contact._id} style={{ textAlign: "center" }}>
              <td>{contact.name}</td>
              <td>{contact.phone}</td>
              <td>{contact.email}</td>
              <td style={{
                  maxWidth: "120px",  // Set max width
                  overflow: "hidden",
                  textOverflow: "ellipsis", 
                  whiteSpace: "nowrap", 
                  //display: "inline-block", // Required for textOverflow
                }}>{contact.address}</td>
              <td>
                <button 
                  onClick={() => handleEdit(contact)} 
                  style={{ backgroundColor: "#f1c40f", color: "white", marginRight: "10px", border: "none", padding: "5px 10px", cursor: "pointer" }}
                >
                  Edit
                </button>
                <button 
                  onClick={() => handleDelete(contact._id)} 
                  style={{ backgroundColor: "#686868", color: "white", marginRight: "10px", border: "none", padding: "5px 10px", cursor: "pointer" }}
                >
                  Delete
                </button>
                <button 
                  onClick={() => fetchContactById(contact._id)} 
                  style={{ backgroundColor: "#1abc9c", color: "white", border: "none", padding: "5px 10px", cursor: "pointer" }}
                >
                  View
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ContactList;

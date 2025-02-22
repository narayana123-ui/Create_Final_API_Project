import { useState } from 'react'
import ContactManager from "./components/ContactManager"
import "./App.css";


function App() {
  return (
    <div className="container">
      <h1>Contact Management</h1>
      <ContactManager />
    </div>
  );
}

export default App;

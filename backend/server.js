const express = require("express");
const app = express();
const port = 3000;
const cors = require('cors');
const mongoose = require('mongoose');

// Use CORS for frontend access
app.use(cors({ origin: 'http://127.0.0.1:5173',
	methods: "GET,POST,PUT,PATCH,DELETE,OPTIONS",
  allowedHeaders: "Content-Type,Authorization" }));

app.get("/", (req, res) => {
  res.send("Contact Manager API is running.");
});

// Import and use contact routes
const contactRoutes = require("./routes/contacts");
app.use(express.json());
app.use("/api/contacts", contactRoutes);

// Connect to MongoDB
mongoose.connect("mongodb://localhost:27017/MyContactsList")
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });
  })
  .catch((err) => console.error("Database connection failed", err));

require('dotenv').config();
const mongoose = require('mongoose');
const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const routes = require('./routes/routes');
const PORT = process.env.PORT || 4001;  // Change 5000 to 4000 or any free port
const app = express();
app.use(express.json());
app.use(cors());

const path = require("path");

// Serve static files from React's dist folder
app.use(express.static(path.join(__dirname, "build")));  

// Catch-all route to serve React's index.html
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});


mongoose.connect(process.env.DATABASE_URL);
const database = mongoose.connection;
database.on('error', (err) => { 
    console.log("Database connection error:", err);
});


database.once('connected',() =>{
    console.log('Database connected');
})

app.use('/api',routes);
app.listen(PORT,() =>{
    console.log(`🚀 Server is running on port ${PORT}`)
})

app.use('/', (req, res) => {
  console.log("API is working");
  res.send("API is working");  // Add this line to avoid hanging requests
});




        

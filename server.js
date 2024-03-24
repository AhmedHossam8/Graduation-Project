// server.js

const express = require('express');
const mongoose = require('mongoose');

// Import models
const Student = require('./models/student');
const Instructor = require('./models/instructor');
const Course = require('./models/course');
const Department = require('./models/department');
const Enrollment = require('./models/enrollment');
const Grade = require('./models/grade');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json()); // Parse JSON requests

// Routes
// Define your routes here

// Connect to MongoDB
const MONGODB_URI = 'mongodb://localhost:27017/university_system';
mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('Connected to MongoDB');
}).catch(err => {
  console.error('Error connecting to MongoDB:', err.message);
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});

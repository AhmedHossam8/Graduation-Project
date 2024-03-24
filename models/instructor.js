// models/instructor.js

const mongoose = require('mongoose');

// Define instructor schema
const instructorSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  department: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Department' // Reference to the Department model
  }
});

// Create model from schema
const Instructor = mongoose.model('Instructor', instructorSchema);

module.exports = Instructor;

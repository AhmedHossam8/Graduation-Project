// models/student.js

const mongoose = require('mongoose');

// Define student schema
const userSchema = new mongoose.Schema({
  registrationNumber: {
    type: String,
    required: true,
    unique: true
  },
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  phoneNumber: {
    type: String,
    required: true
  },
  courses: [{
    courseCode: String,
    grade: String
  }],
  role: {
    type: String,
    enum: ['student', 'instructor', 'teaching assistant', 'manager'],
    required: true
  },
  department: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Department' // Reference to the Department model
  }
});

// Create model from schema
const User = mongoose.model('users', userSchema);

module.exports = User;

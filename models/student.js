// models/student.js

const mongoose = require('mongoose');

// Define student schema
const studentSchema = new mongoose.Schema({
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
  }]
});

// Create model from schema
const Student = mongoose.model('Student', studentSchema);

module.exports = Student;

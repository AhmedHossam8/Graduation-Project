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
    courseTitle: String,
    Instructor: { type: mongoose.Schema.Types.ObjectId, ref: 'Instructor' },
    courseCredits: Number,
    grade: String
  }],
  department: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Department'
  },
  term: {
    type: Number,
    required: true
  }
});

// Create model from schema
const Student = mongoose.model('students', studentSchema);

module.exports = Student;

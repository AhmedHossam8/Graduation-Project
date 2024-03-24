// models/enrollment.js

const mongoose = require('mongoose');

// Define enrollment schema
const enrollmentSchema = new mongoose.Schema({
  studentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Student' // Reference to the Student model
  },
  courseId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Course' // Reference to the Course model
  },
  enrollmentDate: {
    type: Date,
    default: Date.now
  },
  grade: String // You may want to store grades separately in a Grade model
});

// Create model from schema
const Enrollment = mongoose.model('Enrollment', enrollmentSchema);

module.exports = Enrollment;

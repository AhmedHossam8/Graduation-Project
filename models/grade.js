// models/grade.js

const mongoose = require('mongoose');

// Define grade schema
const gradeSchema = new mongoose.Schema({
  studentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User' // Reference to the Student model
  },
  courseId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Course' // Reference to the Course model
  },
  semester: String,
  grade: String
});

// Create model from schema
const Grade = mongoose.model('Grade', gradeSchema);

module.exports = Grade;

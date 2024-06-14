// models/course.js

const mongoose = require('mongoose');

// Define course schema
const courseSchema = new mongoose.Schema({
  courseCode: {
    type: String,
    required: true,
    unique: true
  },
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  credits: {
    type: Number,
    required: true
  }
});

// Create model from schema
const Course = mongoose.model('Course', courseSchema);

module.exports = Course;

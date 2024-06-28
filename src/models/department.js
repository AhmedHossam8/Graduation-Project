// models/department.js

const mongoose = require('mongoose');

// Define department schema
const departmentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  headOfDepartment: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'instructor' // Reference to the Instructor model
  },
  coursesOffered: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Course' // Reference to the Course model
  }]
});

// Create model from schema
const Department = mongoose.model('Department', departmentSchema);

module.exports = Department;

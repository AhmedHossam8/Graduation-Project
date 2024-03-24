// routes/students.js

const express = require('express');
const router = express.Router();
const Student = require('../models/student');

// Create a new student
router.post('/', async (req, res) => {
  try {
    const student = await Student.create(req.body);
    res.status(201).json(student);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Get all students
router.get('/', async (req, res) => {
  try {
    const students = await Student.find();
    res.json(students);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get a single student by ID
router.get('/:id', getStudent, (req, res) => {
  res.json(res.student);
});

// Update a student
router.patch('/:id', getStudent, async (req, res) => {
  if (req.body.registrationNumber != null) {
    res.student.registrationNumber = req.body.registrationNumber;
  }
  if (req.body.firstName != null) {
    res.student.firstName = req.body.firstName;
  }
  if (req.body.lastName != null) {
    res.student.lastName = req.body.lastName;
  }
  if (req.body.email != null) {
    res.student.email = req.body.email;
  }
  if (req.body.phoneNumber != null) {
    res.student.phoneNumber = req.body.phoneNumber;
  }
  if (req.body.courses != null) {
    res.student.courses = req.body.courses;
  }
  try {
    const updatedStudent = await res.student.save();
    res.json(updatedStudent);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete a student
router.delete('/:id', getStudent, async (req, res) => {
  try {
    await res.student.remove();
    res.json({ message: 'Student deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Middleware function to get student by ID
async function getStudent(req, res, next) {
  let student;
  try {
    student = await Student.findById(req.params.id);
    if (student == null) {
      return res.status(404).json({ message: 'Cannot find student' });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }

  res.student = student;
  next();
}

module.exports = router;

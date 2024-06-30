// models/student.js

const mongoose = require('mongoose');

// Define instructor schema
const instructorSchema = new mongoose.Schema({
    instructorId: {
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
    department: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Department'
    },
    role: {
        type: String,
        required: true
    }
});

// Create model from schema
const instructor = mongoose.model('instructors', instructorSchema);

module.exports = instructor;

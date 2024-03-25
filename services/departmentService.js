// Import necessary modules and models
const Department = require('../models/departmentModel');

// Define departmentService functions
const departmentService = {
    // Function to create a new department
    createDepartment: async (departmentData) => {
        // Create a new department instance
        const newDepartment = new Department(departmentData);

        // Save the department to the database
        return await newDepartment.save();
    },

    // Function to retrieve a department by ID
    getDepartmentById: async (departmentId) => {
        return await Department.findById(departmentId);
    },

    // Function to update department information
    updateDepartment: async (departmentId, updatedDepartmentData) => {
        return await Department.findByIdAndUpdate(departmentId, updatedDepartmentData, { new: true });
    },

    // Function to delete a department
    deleteDepartment: async (departmentId) => {
        return await Department.findByIdAndDelete(departmentId);
    },

    // Function to get all departments
    getAllDepartments: async () => {
        return await Department.find();
    }
};

// Export departmentService
module.exports = departmentService;

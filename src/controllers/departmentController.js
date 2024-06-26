// Import necessary modules and services
const departmentService = require('../services/departmentService');
const { validationResult } = require('express-validator');

// Define controller functions
const departmentController = {
    // Function to get all departments
    getAllDepartments: async (req, res) => {
        try {
            // Call departmentService to fetch all departments
            const departments = await departmentService.getAllDepartments();
            res.json(departments);
        } catch (error) {
            console.error('Error fetching departments:', error);
            res.status(500).json({ message: 'Internal server error' });
        }
    },

    // Function to get a specific department by ID
    getDepartmentById: async (req, res) => {
        const departmentId = req.params.id;
        try {
            // Call departmentService to fetch department by ID
            const department = await departmentService.getDepartmentById(departmentId);
            if (!department) {
                return res.status(404).json({ message: 'Department not found' });
            }
            res.json(department);
        } catch (error) {
            console.error('Error fetching department:', error);
            res.status(500).json({ message: 'Internal server error' });
        }
    },

    // Function to create a new department
    createDepartment: async (req, res) => {
        // Validate request body
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        // Extract department data from request body
        const { name, /* other fields */ } = req.body;

        try {
            // Call departmentService to create new department
            const newDepartment = await departmentService.createDepartment({ name, /* other fields */ });
            res.status(201).json(newDepartment);
        } catch (error) {
            console.error('Error creating department:', error);
            res.status(500).json({ message: 'Internal server error' });
        }
    },

    // Function to update an existing department
    updateDepartment: async (req, res) => {
        const departmentId = req.params.id;
        // Extract updated department data from request body
        const updatedDepartmentData = req.body;

        try {
            // Call departmentService to update department
            const updatedDepartment = await departmentService.updateDepartment(departmentId, updatedDepartmentData);
            res.json(updatedDepartment);
        } catch (error) {
            console.error('Error updating department:', error);
            res.status(500).json({ message: 'Internal server error' });
        }
    },

    // Function to delete a department
    deleteDepartment: async (req, res) => {
        const departmentId = req.params.id;
        try {
            // Call departmentService to delete department
            await departmentService.deleteDepartment(departmentId);
            res.json({ message: 'Department deleted successfully' });
        } catch (error) {
            console.error('Error deleting department:', error);
            res.status(500).json({ message: 'Internal server error' });
        }
    }
};

// Export departmentController
module.exports = departmentController;

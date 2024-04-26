const express = require('express');
const mongoose = require('mongoose');
const { web3, deployContract } = require('./utils');

// Import models
const Student = require('./models/student');
const Instructor = require('./models/instructor');
const Course = require('./models/course');
const Department = require('./models/department');
const Enrollment = require('./models/enrollment');
const Grade = require('./models/grade');

// Import route files
const studentRoutes = require('./routes/student');
const instructorRoutes = require('./routes/instructor');
const departmentRoutes = require('./routes/department');
const courseRoutes = require('./routes/course');
const enrollmentRoutes = require('./routes/enrollment');
const gradeRoutes = require('./routes/grade');
const searchRoutes = require('./routes/search');
const authRoutes = require('./routes/auth');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json()); // Parse JSON requests

// Routes
// Use route files
app.use('/students', studentRoutes);
app.use('/instructors', instructorRoutes);
app.use('/department', departmentRoutes);
app.use('/courses', courseRoutes);
app.use('/enrollments', enrollmentRoutes);
app.use('/grades', gradeRoutes);
app.use('/search', searchRoutes);
app.use('/auth', authRoutes);

// Connect to MongoDB
const MONGODB_URI = 'mongodb://localhost:27017/university_system';
mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('Connected to MongoDB');
}).catch(err => {
  console.error('Error connecting to MongoDB:', err.message);
});

// Deploy Smart Contract
const contractData = require('./path/to/compiled-contract.json'); // Load compiled contract data
const constructorArgs = ['constructorArg1', 'constructorArg2']; // If your contract has constructor arguments
const deployerAddress = '0x123...'; // Deployer address
const contractAddress = deployContract(contractData, constructorArgs, deployerAddress); // Deploy contract and get contract address

// Example: Get the latest block number
web3.eth.getBlockNumber()
    .then(blockNumber => {
        console.log('Latest block number:', blockNumber);
    })
    .catch(error => {
        console.error('Error getting block number:', error);
    });

// Start server
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});

const express = require('express');
const mongoose = require('mongoose');
// const { web3, deployContract } = require('utils');

// Import route files
const userRoutes = require('./routes/user');
const departmentRoutes = require('./routes/department');
const courseRoutes = require('./routes/course');
const enrollmentRoutes = require('./routes/enrollment');
const gradeRoutes = require('./routes/grade');
const searchRoutes = require('./routes/search');
const authRoutes = require('./routes/auth');
const statusRoute = require('./routes/status')

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json()); // Parse JSON requests

// Routes
// Use route files
app.use('/user', userRoutes);
app.use('/department', departmentRoutes);
app.use('/course', courseRoutes);
app.use('/enrollment', enrollmentRoutes);
app.use('/grade', gradeRoutes);
app.use('/search', searchRoutes);
app.use('/auth', authRoutes);
app.use('', statusRoute)

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
// const contractData = require('./path/to/compiled-contract.json'); // Load compiled contract data
// const constructorArgs = ['constructorArg1', 'constructorArg2']; // If your contract has constructor arguments
// const deployerAddress = '0x123...'; // Deployer address
// const contractAddress = deployContract(contractData, constructorArgs, deployerAddress); // Deploy contract and get contract address

// Example: Get the latest block number
// web3.eth.getBlockNumber()
//     .then(blockNumber => {
//         console.log('Latest block number:', blockNumber);
//     })
//     .catch(error => {
//         console.error('Error getting block number:', error);
//     });

// Start server
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});

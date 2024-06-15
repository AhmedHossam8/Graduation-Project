const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config(); // Load environment variables
const Web3 = require('web3');

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

// Connect to Ganache
const web3 = new Web3(new Web3.providers.HttpProvider(process.env.GANACHE_URL));

// Start server
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});

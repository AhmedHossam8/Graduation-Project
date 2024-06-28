const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config(); // Load environment variables
// const Web3 = require('web3');

// Import route files
const studentRoutes = require('./src/routes/student');
const instructorRoutes = require('./src/routes/instructor')
const departmentRoutes = require('./src/routes/department');
const courseRoutes = require('./src/routes/course');
const enrollmentRoutes = require('./src/routes/enrollment');
const gradeRoutes = require('./src/routes/grade');
const searchRoutes = require('./src/routes/search');
const studentAuthRoutes = require('./src/routes/studentAuth');
const instructorAuthRoutes = require('./src/routes/instructorAuth');
const statusRoute = require('./src/routes/status')
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json()); // Parse JSON requests
app.use(cors());
// Routes
// Use route files
app.use('/student', studentRoutes);
app.use('/instructor', instructorRoutes);
app.use('/department', departmentRoutes);
app.use('/course', courseRoutes);
app.use('/enrollment', enrollmentRoutes);
app.use('/grade', gradeRoutes);
app.use('/search', searchRoutes);
app.use('/student-auth', studentAuthRoutes);
app.use('/instructor-auth', instructorAuthRoutes);
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
// const web3 = new Web3(new Web3.providers.HttpProvider(process.env.GANACHE_URL));

// Start server
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});

// Require Mongoose and models
const mongoose = require('mongoose');
const Student = require('./models/student');
const Instructor = require('./models/instructor');
const Course = require('./models/course');
const Department = require('./models/department');
const Enrollment = require('./models/enrollment');
const Grade = require('./models/grade');

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/university_system', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('Connected to MongoDB');

  // Function to insert sample data
  async function insertSampleData() {
    try {
      // Insert sample data here
      await Student.create([
        { firstName: 'Johnny', 
        lastName: 'Mark', 
        email: 'johnny@example.com', 
        phoneNumber: '01234567890',
        registrationNumber: '12346' }
      ]);
    } catch (error) {
      console.error('Error inserting sample data:', error);
    } finally {
      // Close connection after insertion
      mongoose.connection.close();
    }
  }

  // Call the function to insert sample data
  insertSampleData();
}).catch(err => {
  console.error('Error connecting to MongoDB:', err.message);
});

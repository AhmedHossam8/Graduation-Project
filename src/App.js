import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage/HomePage';
import StudentLogin from './pages/StudentLogin/StudentLogin';
import StaffLogin from './pages/StaffLogin/StaffLogin';
import GuestLogin from './pages/GuestLogin/GuestLogin';
import StudentPortal from './pages/StudentPortal/StudentPortal'
import InstructorPortal from './pages/InstructorPortal/InstructorPortal'
// import AdminPortal from './pages/AdminPortal/AdminPortal'
import CoursePage from './pages/StudentCourse/Course';
import CoursesList from './pages/RegCourses/RegCourses';
import CoursesEnrolled from './pages/CoursesEnrolled/CoursesEnrolled';
import InstructorCourses from './pages/InstructorCourse/InstructorCourse';
import InstructorCourseDetails from './pages/InstructorCourseDetails/CoursesDetails'; 
import InstructorWithdraw from './pages/InstructorWithdraw/InstructorWithdraw';
import StudentsByInstructor from './pages/InstructorViewCourse/InstructorViewCourse';


function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" exact element={<HomePage />} ></Route>
          
          {/* Student Routes */}
          <Route path="/student-login" element={<StudentLogin />} />
          <Route path="/student-portal" element={<StudentPortal />} />
          <Route path="/student-courses" element={<CoursePage />} />
          <Route path="/register-course" element={<CoursesList />} />
          <Route path="/student-courses-details" element={<CoursesEnrolled />} />

          {/* Instructor Routes */}
          <Route path="/staff-login" element={<StaffLogin />} />
          <Route path="/instructor-portal" element={<InstructorPortal />} />
          <Route path="/instructor-courses" element={<InstructorCourses />}/>
          <Route path="/instructor-courses-details" element={<InstructorCourseDetails />} />
          <Route path="/instructor-withdraw" element={<InstructorWithdraw />} />
          <Route path="/instructor-view-students" element={<StudentsByInstructor />} />

          <Route path="/guests" element={<GuestLogin />} />
          
        </Routes>
      </div>
    </Router>
  );
}
export default App;

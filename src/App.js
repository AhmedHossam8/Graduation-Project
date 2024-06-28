import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage/HomePage';
import StudentLogin from './pages/StudentLogin/StudentLogin';
import StaffLogin from './pages/StaffLogin/StaffLogin';
import GuestLogin from './pages/GuestLogin/GuestLogin';
import StudentPortal from './pages/StudentPortal/StudentPortal'
import InstructorPortal from './pages/InstructorPortal/InstructorPortal'
import AdminPortal from './pages/AdminPortal/AdminPortal'
import CoursePage from './pages/StudentCourse/Course';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" exact element={<HomePage />} ></Route>
          <Route path="/student-login" element={<StudentLogin />} />
          <Route path="/staff-login" element={<StaffLogin />} />
          <Route path="/guests" element={<GuestLogin />} />
          <Route path="/student-portal" element={<StudentPortal />} />
          <Route path="/instructor-portal" element={<InstructorPortal />} />
          <Route path="/admin-portal" element={<AdminPortal />} />
          <Route path="/student-courses" element={<CoursePage />} />
        </Routes>
      </div>
    </Router>
  );
}
export default App;

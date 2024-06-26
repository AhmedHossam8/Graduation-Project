import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/Home_Page/HomePage';
import StudentLogin from './pages/Student_Login/StudentLogin';
import StaffLogin from './pages/Staff_Login/StaffLogin';
import GuestLogin from './pages/Guest_Login/GuestLogin';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" exact element={<HomePage />} ></Route>
          <Route path="/student-portal" element={<StudentLogin />} />
          <Route path="/staff-portal" element={<StaffLogin />} />
          <Route path="/guests" element={<GuestLogin />} />
        </Routes>
      </div>
    </Router>
  );
}
export default App;

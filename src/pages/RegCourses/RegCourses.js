import React, { useEffect, useState } from 'react';
import { useGetCoursesQuery, useEnrollStudentInCourseMutation } from '../../redux/features/apiSlice';
import ActionAreaCard from '../../components/SecCard/SecCard';
import './reg-courses.css';
import Navbar from '../../components/SecNavbar/SecNavbar';

const CoursesList = () => {
  const [studentRegistration, setStudentRegistration] = useState(null);
  const { data: coursesData, error, isLoading } = useGetCoursesQuery();
  const [courses, setCourses] = useState([]);
  const [selectedCourses, setSelectedCourses] = useState([]);
  const [enrollStudentInCourse, { isSuccess, isError, error: enrollError }] = useEnrollStudentInCourseMutation();

  useEffect(() => {
    const storedStudentRegistration = localStorage.getItem("user");
    setStudentRegistration(storedStudentRegistration);
  }, []);

  useEffect(() => {
    if (coursesData) {
      const initialCourses = coursesData.map(course => ({
        ...course,
        selected: false
      }));
      setCourses(initialCourses);
    }
  }, [coursesData]);

  useEffect(() => {
    const storedSelectedCourses = JSON.parse(localStorage.getItem('selectedCourses')) || [];
    setSelectedCourses(storedSelectedCourses);
  }, []);

  useEffect(() => {
    localStorage.setItem('selectedCourses', JSON.stringify(selectedCourses));
  }, [selectedCourses]);

  const handleCardClick = (clickedCourse) => {
    const updatedCourses = courses.map(course =>
      course.courseCode === clickedCourse.courseCode
        ? { ...course, selected: !course.selected }
        : course
    );
    setCourses(updatedCourses);
    setSelectedCourses(updatedCourses.filter(course => course.selected));
  };

  const handleConfirmEnrollment = async () => {
    if (!studentRegistration) {
      console.error("No student registration number found in local storage.");
      return;
    }

    const coursesToEnroll = courses.filter(course => course.selected);
    try {
      const enrollments = await Promise.all(
        coursesToEnroll.map(course =>
          enrollStudentInCourse({
            registrationNumber: studentRegistration,
            course: {...course}
          }).unwrap()
        )
      );
      console.log('Enrollment results:', enrollments);

      const newSelectedCourses = [...selectedCourses, ...coursesToEnroll];
      setSelectedCourses(newSelectedCourses);

      const updatedCourses = courses.map(course => ({ ...course, selected: false }));
      setCourses(updatedCourses);
    } catch (err) {
      console.error('Failed to enroll in course:', err);
      if (err?.data?.error) {
        console.error('Error message:', err.data.error);
      }
    }
  };

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error fetching courses: {error.message}</p>;
  }

  return (
    <div>
      <Navbar />
      <div className="courses-list-container">
        <div className="courses-list">
          {courses.map((course) => (
            <div
              key={course.courseCode}
              onClick={() => handleCardClick(course)}
            >
              <ActionAreaCard
                name={course.title}
                code={course.courseCode}
                credits={course.credits}
                isCourseSelected={course.selected}
              />
            </div>
          ))}
        </div>
        <div style={{ marginTop: "20px"}}>
          {isSuccess && <p style={{color: "green"}}>Courses updated successfully!</p>}
          {isError && <p style={{color: "red" }}>Failed to update courses. {enrollError?.data?.error ?? 'Unknown error'}</p>}
        </div>
        <div className="button-container">
          <button onClick={handleConfirmEnrollment} disabled={courses.filter(course => course.selected).length === 0} className='confirm-btn'>
            Confirm Enrollment
          </button>
        </div>
      </div>
    </div>
  );
};

export default CoursesList;

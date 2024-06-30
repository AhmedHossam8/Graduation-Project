import React, { useEffect } from 'react';
import { useGetCoursesEnrolledByStudentQuery } from '../../redux/features/apiSlice';
import ActionAreaCard from '../../components/SecCard/SecCard';
import Navbar from '../../components/SecNavbar/SecNavbar';
import './courses-enrolled.css';

const CoursesEnrolled = ({ registrationNumber }) => {
    const studentRegistration = localStorage.getItem("user");
    const { data: courses, error, isLoading } = useGetCoursesEnrolledByStudentQuery(studentRegistration);

    useEffect(() => {
        if (courses) {
            console.log('Courses:', courses);
        }
        if (error) {
            console.log('Error:', error);
        }
    }, [courses, error]);

    if (isLoading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>Error fetching courses: {error.message}</p>;
    }

    return (
        <div className="full-height-container">
            <Navbar />
            <div className='container'>
                <h2>Courses Enrolled</h2>
                {courses && courses.map(course => (
                    <div key={course._id} className="card-container">
                        <ActionAreaCard
                            name={course.courseTitle}
                            code={course.courseCode}
                            credits={course.courseCredits}
                        />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CoursesEnrolled;

import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGetCoursesByInstructorIdQuery } from '../../redux/features/apiSlice';
import SecCard from '../../components/InstructorCard/InstructorCard';
import './courses-details.css';
import Navbar from '../../components/SecNavbar/SecNavbar';

const InstructorCourses = () => {
    const storedInstructorData = localStorage.getItem("instructor");
    let instructor_id = null;
    let errorMessage = null;
    const navigate = useNavigate();

    try {
        if (storedInstructorData) {
            const data = JSON.parse(storedInstructorData);
            instructor_id = data?.instructor?.id;
        } else {
            errorMessage = "No instructor data found in localStorage";
        }
    } catch (error) {
        errorMessage = "Failed to parse instructor data";
    }

    const { data: courses, error, isLoading } = useGetCoursesByInstructorIdQuery(instructor_id);
    const [instructorCourses, setInstructorCourses] = useState([]);

    useEffect(() => {
        if (courses) {
            setInstructorCourses(courses);
        }
    }, [courses]);

    const handleCardClick = (courseId) => {
        navigate(`/instructor-view-students`);
    };

    if (errorMessage) return <div>Error: {errorMessage}</div>;
    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error loading courses.</div>;

    return (
        <div>
            <Navbar />
            <div className="courses-container">
                <h2>Courses</h2>
                {instructorCourses.length > 0 ? (
                    instructorCourses.map((course) => (
                        <SecCard
                            key={course._id}
                            name={course.title}
                            code={course.code}
                            credits={course.credits}
                            onClick={() => handleCardClick(course._id)}
                        />
                    ))
                ) : (
                    <div>No courses found for this instructor.</div>
                )}
            </div>
        </div>
    );
};

export default InstructorCourses;

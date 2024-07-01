import React, { useEffect, useState } from 'react';
import { useGetStudentsByInstructorIdQuery } from '../../redux/features/apiSlice';
import StudentCard from '../../components/StudentCard/StudentCard';
import Navbar from '../../components/SecNavbar/SecNavbar';
import { useNavigate } from 'react-router-dom';
import "./instructor-view-course.css";

const StudentsByInstructor = () => {
    const storedInstructorData = localStorage.getItem("instructor");
    let instructorId = null;
    let errorMessage = null;

    try {
        if (storedInstructorData) {
            const data = JSON.parse(storedInstructorData);
            instructorId = data?.instructor?.id;
        } else {
            errorMessage = "No instructor data found in localStorage";
        }
    } catch (error) {
        errorMessage = "Failed to parse instructor data";
    }

    const { data, error, isLoading } = useGetStudentsByInstructorIdQuery(instructorId);
    const [studentsData, setStudentsData] = useState({});
    const navigate = useNavigate();

    useEffect(() => {
        if (data) {
            console.log("Students Data:", data);
            setStudentsData(data);
        }
    }, [data]);

    const handleStudentCardClick = (student) => {
        navigate(`/submit-grades/${student._id}`, {
            state: {
                firstName: student.firstName,
                lastName: student.lastName,
                registrationNumber: student.registrationNumber,
            },
        });
    };

    if (errorMessage) return <div>Error: {errorMessage}</div>;
    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error: {error.message || 'Error fetching students data'}</div>;

    return (
        <div>
            <Navbar />
            <div className="students-container">
                <h2>Students</h2>
                {Object.entries(studentsData).map(([courseCode, students]) => (
                    <div key={courseCode}>
                        {students.map(student => (
                            <div
                                key={student._id}
                                onClick={() => handleStudentCardClick(student)}
                                style={{ cursor: 'pointer' }}
                            >
                                <StudentCard
                                    firstName={student.firstName}
                                    lastName={student.lastName}
                                    registrationNumber={student.registrationNumber}
                                />
                            </div>
                        ))}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default StudentsByInstructor;

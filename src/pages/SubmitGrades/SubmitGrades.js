import React, { useState, useEffect } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { useSubmitGradeMutation } from '../../redux/features/apiSlice';
import Navbar from '../../components/SecNavbar/SecNavbar';
import './submit-grades.css';

const SubmitGrades = () => {
    const { studentId } = useParams();
    const location = useLocation();
    const { firstName, lastName, registrationNumber } = location.state || {};
    const [grade, setGrade] = useState('');
    const [submitGrade, { isLoading, isSuccess, isError }] = useSubmitGradeMutation();

    // Retrieve and parse selectedCourses data from localStorage
    const storedCourses = localStorage.getItem('selectedCourses');
    let courseId = '';
    let instructorId = '';

    try {
        const courses = JSON.parse(storedCourses);
        if (courses && courses.length > 0) {
            // Assuming you need the first selected course
            courseId = courses[0]._id;
            instructorId = courses[0].instructor;
        }
    } catch (error) {
        console.error('Failed to parse selectedCourses data:', error);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        await submitGrade({
            instructorId,
            courseId,
            studentId,
            grade
        });
    };

    useEffect(() => {
        console.log("Received student data:", { firstName, lastName, registrationNumber });
    }, [firstName, lastName, registrationNumber]);

    return (
        <div>
            <Navbar />
            <form onSubmit={handleSubmit} className='form'>
                <div className='form-title'>
                    <h4 style={{ color: "black" }}>Submit Grade for {firstName} {lastName}</h4>
                    <h5>Reg. No: {registrationNumber}</h5>
                </div>
                <input
                    type="text"
                    value={grade}
                    onChange={(e) => setGrade(e.target.value)}
                    placeholder='Grade in Letters'
                    className='grade-field'
                />
                <div className='submit-msg'>
                    {isSuccess && <p style={{ color: "green" }}>Grade submitted successfully!</p>}
                    {isError && <p style={{ color: "red" }}>Error submitting grade.</p>}
                </div>
                <button type="submit" disabled={isLoading} className='submit-btn'>
                    Submit Grade
                </button>
            </form>
        </div>
    );
};

export default SubmitGrades;

import React from 'react';
import './course.css';
import ActionCard from '../../components/Cards/Card';
import Navbar from '../../components/SecNavbar/SecNavbar';
import CourseImage from '../../assets/Course.jpeg';
import Withdraw from '../../assets/withdraw.jpeg';

const StudentCourse = '/student-courses-details'
const RegisterCourse = '/register-course'
const WithdrawCourse = '/student-courses'

const cardData = [
    {
        title: 'Student Courses',
        img: CourseImage,
        path: StudentCourse
    },
    {
        title: 'Register Course',
        img: CourseImage,
        path: RegisterCourse
    },
    {
        title: 'Request Withdraw',
        img: Withdraw,
        path: WithdrawCourse
    }
];

const StaffPortal = () => (
    <div>
        <Navbar />
        <div className="card-page">
            {cardData.map((card, index) => (
                <ActionCard key={index} title={card.title} img={card.img} path={card.path} />
            ))}
        </div>
    </div>
);

export default StaffPortal;

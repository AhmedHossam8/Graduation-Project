import React from 'react';
import './instructor-course.css';
import ActionCard from '../../components/Cards/Card';
import Navbar from '../../components/SecNavbar/SecNavbar';
import CourseImage from '../../assets/Course.jpeg';
import Withdraw from '../../assets/withdraw.jpeg';

const InstructorCourse = '/instructor-courses-details'
const WithdrawCourse = '/instructor-withdraw'

const cardData = [
    {
        title: 'Courses',
        img: CourseImage,
        path: InstructorCourse
    },
    {
        title: 'Withdraw Student',
        img: Withdraw,
        path: WithdrawCourse
    }
];

const InstructorCourseDetails = () => (
    <div>
        <Navbar />
        <div className="card-page">
            {cardData.map((card, index) => (
                <ActionCard key={index} title={card.title} img={card.img} path={card.path} />
            ))}
        </div>
    </div>
);

export default InstructorCourseDetails;

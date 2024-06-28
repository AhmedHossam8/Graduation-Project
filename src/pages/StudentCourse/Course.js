import React from 'react';
import './course.css';
import ActionCard from '../../components/Cards/Card';
import Navbar from '../../components/SecNavbar/SecNavbar';
import CourseImage from '../../assets/Course.jpeg';
import Withdraw from '../../assets/withdraw.jpeg';

const cardData = [
    {
        title: 'Student Courses',
        img: CourseImage
    },
    {
        title: 'Register Course',
        img: CourseImage
    },
    {
        title: 'Request Withdraw',
        img: Withdraw
    }
];

const StaffPortal = () => (
    <div>
        <Navbar />
        <div className="card-page">
            {cardData.map((card, index) => (
                <ActionCard key={index} title={card.title} img={card.img} />
            ))}
        </div>
    </div>
);

export default StaffPortal;

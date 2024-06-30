import React from 'react';
import './instructor-portal.css';
import ActionCard from '../../components/Cards/Card';
import Navbar from '../../components/SecNavbar/SecNavbar';
import WalletImage from '../../assets/wallet.png';
import CourseImage from '../../assets/Course.jpeg';

const InstructorCourse = '/instructor-courses';

const cardData = [
    {
        title: 'Courses',
        img: CourseImage,
        path: InstructorCourse
    },
    {
        title: 'Digital Wallet',
        img: WalletImage,
        path: null
    }
];

const InstructorPortal = () => (
    <div>
        <Navbar />
        <div className="card-page">
            {cardData.map((card, index) => (
                <ActionCard key={index} title={card.title} img={card.img} path={card.path} />
            ))}
        </div>
    </div>
);

export default InstructorPortal;

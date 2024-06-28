import React from 'react';
import './instructor-portal.css';
import ActionCard from '../../components/Cards/Card';
import Navbar from '../../components/SecNavbar/SecNavbar';
import ResultImage from '../../assets/Results.jpeg';
import WalletImage from '../../assets/wallet.png';
import CourseImage from '../../assets/Course.jpeg';

const cardData = [
    {
        title: 'Submit Results',
        img: ResultImage
    },
    {
        title: 'Courses',
        img: CourseImage
    },
    {
        title: 'Digital Wallet',
        img: WalletImage
    }
];

const InstructorPortal = () => (
    <div>
        <Navbar />
        <div className="card-page">
            {cardData.map((card, index) => (
                <ActionCard key={index} title={card.title} img={card.img} />
            ))}
        </div>
    </div>
);

export default InstructorPortal;

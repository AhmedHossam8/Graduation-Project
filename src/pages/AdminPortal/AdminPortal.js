import React from 'react';
import './admin-portal.css';
import ActionCard from '../../components/Cards/Card';
import Navbar from '../../components/SecNavbar/SecNavbar';
import ResultImage from '../../assets/Results.jpeg';
import WalletImage from '../../assets/wallet.png';
import CourseImage from '../../assets/Course.jpeg';

const cardData = [
    {
        title: 'Add Student',
        img: ResultImage
    },
    {
        title: 'Update Student',
        img: CourseImage
    },
    {
        title: 'Remove Student',
        img: WalletImage
    },
    {
        title: 'Digital Wallet',
        img: WalletImage
    }
];

const AdminPortal = () => (
    <div>
        <Navbar />
        <div className="card-page">
            {cardData.map((card, index) => (
                <ActionCard key={index} title={card.title} img={card.img} />
            ))}
        </div>
    </div>
);

export default AdminPortal;

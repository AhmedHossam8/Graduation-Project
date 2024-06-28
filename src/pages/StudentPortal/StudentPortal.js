import React from 'react';
import './student-portal.css';
import ActionCard from '../../components/Cards/Card';
import Navbar from '../../components/SecNavbar/SecNavbar';
import ResultImage from '../../assets/Results.jpeg';
import TranscriptImage from '../../assets/Transcript.png';
import WalletImage from '../../assets/wallet.png';
import CourseImage from '../../assets/Course.jpeg';
import Activities from '../../assets/Activities.jpeg'

const resultPath = '/student-results'
const coursePath = '/student-courses'

const cardData = [
    {
        title: 'Student Results',
        img: ResultImage,
        path: resultPath
    },
    {
        title: 'Courses',
        img: CourseImage,
        path: coursePath
    },
    {
        title: 'Student Transcript',
        img: TranscriptImage,
        path: '/student-transcript'
    },
    {
        title: 'Student Activities',
        img: Activities,
        path: '/student-activities'
    },
    {
        title: 'Digital Wallet',
        img: WalletImage,
        path: '/student-wallet'
    }
];

const StudentPortal = () => (
    <div>
        <Navbar />
        <div className="card-page">
            {cardData.map((card, index) => (
                <ActionCard key={index} title={card.title} img={card.img} path={card.path} />
            ))}
        </div>
    </div>
);

export default StudentPortal;

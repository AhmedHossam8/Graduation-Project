import React from 'react';
import './guests.css';
import Navbar from '../../components/navbar/Navbar';
import Wallpaper from '../../assets/HomePage_image.png';
import LoginButton from '../../components/Login_Button/LoginButton';

const Guests = () => {
    return (
        <div>
            <Navbar />
            <img src={Wallpaper} className='wallpaper' alt='wallpaper'/>
            <div className="form">
                <h3 style={{ color: '#002244', marginBottom: '20px' }}>Welcome!</h3>
                <input type='text' className='text-field' placeholder='Key' required/>
                <LoginButton />
            </div>
        </div>
    );
};

export default Guests;

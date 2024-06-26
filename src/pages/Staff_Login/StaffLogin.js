import React from 'react';
import './staff-login.css';
import Navbar from '../../components/navbar/Navbar';
import Wallpaper from '../../assets/HomePage_image.png';
import LoginButton from '../../components/Login_Button/LoginButton';

const StaffLogin = () => {
    return (
        <div>
            <Navbar />
            <img src={Wallpaper} className='wallpaper' alt='wallpaper'/>
            <div className="form">
                <h3 style={{ color: '#002244', marginBottom: '20px' }}>Staff Portal</h3>
                <input type='text' className='text-field' placeholder='ID Number' required/>
                <input type='password' className='text-field' placeholder='Password' required/>
                <LoginButton />
            </div>
        </div>
    );
};

export default StaffLogin;

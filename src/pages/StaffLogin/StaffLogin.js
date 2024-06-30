import React, { useEffect, useState } from 'react';
import './staff-login.css';
import Navbar from '../../components/navbar/Navbar';
import Wallpaper from '../../assets/HomePage_image.png';
import LoginButton from '../../components/LoginButton/LoginButton';
import { useNavigate } from 'react-router-dom';
import { useInstructorLoginMutation } from '../../redux/features/apiSlice';

const InstructorLogin = () => {
    const [instructor, setInstructor] = useState({});
    const [error, setError] = useState('');
    const [loginFunction, result] = useInstructorLoginMutation();
    const navigate = useNavigate();

    const login = () => {
        loginFunction(instructor);
    };

    useEffect(() => {
        if (result.isSuccess) {
            // Save the entire instructor object in local storage
            localStorage.setItem("instructor", JSON.stringify(result.data));
            navigate('/instructor-portal');
        }
        if (result.isError) {
            console.error('Login failed:', result.error);
            setError('Login failed. Please check your credentials.');
        }
    }, [result, navigate]);

    const onPasswordChange = (e) => {
        setInstructor({ ...instructor, password: e.target.value });
        setError('');
    };

    return (
        <div>
            <Navbar />
            <img src={Wallpaper} className='wallpaper' alt='wallpaper' />
            <div className="form">
                <h3 style={{ color: '#002244', marginBottom: '20px' }}>Staff Portal</h3>
                <input
                    type='text'
                    className='text-field'
                    placeholder='ID Number'
                    required
                    onChange={(e) => setInstructor({ ...instructor, instructorId: e.target.value })}
                />
                <input
                    type='password'
                    className='text-field'
                    placeholder='Password'
                    onChange={onPasswordChange}
                />
                {error && <p style={{ color: 'red' }}>{error}</p>}
                <LoginButton handleClick={login} />
            </div>
        </div>
    );
};

export default InstructorLogin;

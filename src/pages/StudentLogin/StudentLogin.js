import React, { useEffect, useState } from 'react';
import './studentlogin.css';
import Navbar from '../../components/navbar/Navbar';
import Wallpaper from '../../assets/HomePage_image.png';
import LoginButton from '../../components/LoginButton/LoginButton';
import { useNavigate } from 'react-router-dom';
import { useStudentLoginMutation } from '../../redux/features/apiSlice';

const StudentLogin = () => {
    const [student, setStudent] = useState({});
    const [error, setError] = useState('');
    const [loginFunction, result] = useStudentLoginMutation();
    const navigate = useNavigate();

    const login = () => {
        loginFunction(student);
    };

    useEffect(() => {
        if (result.isSuccess) {
            localStorage.setItem("user", student.registrationNumber);
            navigate('/student-portal');
        }
        if (result.isError) {
            console.error('Login failed:', result.error);
            setError('Login failed. Please check your credentials.');
        }
    }, [result, navigate, student.registrationNumber]);  // Corrected key

    const onPasswordChange = (e) => {
        setStudent({ ...student, password: e.target.value });
        setError('');
    };

    return (
        <div>
            <Navbar />
            <img src={Wallpaper} className='wallpaper' alt='wallpaper' />
            <div className="form">
                <h3 style={{ color: '#002244', marginBottom: '20px' }}>Student Portal</h3>
                <input
                    type='text'
                    className='text-field'
                    placeholder='Registration Number'
                    required
                    onChange={(e) => setStudent({ ...student, registrationNumber: e.target.value })}  // Corrected key
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

export default StudentLogin;

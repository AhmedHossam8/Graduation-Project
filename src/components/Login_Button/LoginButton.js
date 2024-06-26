import React from 'react';
import './login-button.css';

const LoginButton = ({ onClick }) => {
    return (
        <button className={`custom-button`} onClick={onClick}>
            Login
        </button>
    );
};

export default LoginButton;

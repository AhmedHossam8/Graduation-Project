import React from 'react';
import './login-button.css';

const LoginButton = ({ handleClick }) => {
    return (
        <button className={`custom-button`} onClick={handleClick}>
            Login
        </button>
    );
};

export default LoginButton;

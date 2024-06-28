import React from 'react';
import './login-menu.css';
import { Link } from 'react-router-dom';
const LoginMenu = () => {

    return (
        <div className="menu">
            <h3 style={{ color: '#002244' }}>Login as</h3>
            <Link to="/student-login">
                <button className="button" >Student</button>
            </Link>
            <Link to="/staff-login">
            <button className="button">Staff</button>
            </Link>
            <Link to="/guests">
            <button className="button">Guests</button>
            </Link>
        </div>
    );
};

export default LoginMenu;

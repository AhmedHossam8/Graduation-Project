import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './sec-navbar.css';
import userIcon from '../../assets/user-icon.png';

const Navbar = () => {
    const [dropdownVisible, setDropdownVisible] = useState(false);

    const toggleDropdown = () => {
        setDropdownVisible(!dropdownVisible);
    };

    return (
        <div className="navbar">
            <div className='contents'>
                <Link to='/student-portal'>
                    <div className='title'><h4>AASTMT PORTAL</h4></div>
                </Link>
                {/* <div className='sub-text'><p>Welcome {User.name}!</p></div> */}
            </div>
            <div className='user-icon' onClick={toggleDropdown}>
                <img src={userIcon} alt="User Icon" />
                {dropdownVisible && (
                    <div className='dropdown-menu'>
                        <Link to="/">Logout</Link>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Navbar;

import React from 'react';
import { Link } from 'react-router-dom';
import './navbar.css';

const Navbar = () => {
  return (
    <div className="navbar">
      <div className='contents'>
        <Link to='/'>
          <div className='title'><h4>AASTMT PORTAL</h4></div>
        </Link>
        <div className='sub-text'><p>Arab Academy for Science, Technology & Maritime Transport</p></div>
      </div>
    </div>
  );
};

export default Navbar;

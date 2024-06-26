import React from 'react';
import './homepage.css';
import Navbar from '../../components/navbar/Navbar'
import LoginMenu from '../../components/Login_Menu/LoginMenu'
import backgroundImg from "../../assets/HomePage_image.png"
function HomePage(){
    return(
        <div className='home-page'>
            <Navbar />
            <img className='background-img' src={backgroundImg} alt='background img'/>
            <LoginMenu />
        </div>
    )
}

export default HomePage;
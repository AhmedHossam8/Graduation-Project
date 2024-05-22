import './App.css';
import React from 'react';
import Navbar from './components/navbar'
import homePage from './components/home';

function App() {
  return (
    <div className="App">
      <Navbar></Navbar>
      <homePage></homePage>
    </div>
  );
}

export default App;

import React from 'react';
import './Navbar.css';
import { Link } from 'react-router-dom'
import Login from '../Login';
const Navbar = () => {
  return (
    <nav className="navbar">
     <Link to='/'> <h1 className="navbar__brand">SIMULATOR</h1></Link>
      <div className="navbar__links">
      {/* <button onClick={login}>Login with Internet Identity</button>
      <button onClick={logout}>Logout</button> */}
        {/* <a href="#home">Home</a>
        <a href="#about">About</a>
        <a href="#services">Services</a>
        <a href="#contact">Contact</a> */} <Login />

        
      <Link to='/sliding-puzzle'>sliding-puzzle</Link>
      </div>
    </nav>
  );
};

export default Navbar;

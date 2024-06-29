
import React from 'react';

import { Link } from 'react-router-dom';
// import logo from '../slidingpuzzle/assets/logo.jpg'
import dore from './assets/logo.jpg'
import tomjerry from './assets/tomandjerry.jpg'
import ben from './assets/unnamed.jpg'
const SlidingPuzzle = () => {
  return (
    <div className='backback' style={{ width: "100%", height: "100vh", display: "flex", alignItems: "center", justifyContent: "space-around", paddingTop: "50px", }}>
    <section className="hero1">
     <center> <h2 style={{color:"white"}} className="hero__title">Sliding - Puzzle</h2></center>
     
      <div className="hero__cards">
        <Link to='/sliding-puzzle/doremon' >
       <div className="card">
          <img style={{width:'225px' ,height:"225px"
          }} src={dore} alt="" />
       </div>
       </Link>
       <Link to='/sliding-puzzle/tomandjerry' >
       <div className="card">
       <img style={{width:'225px' ,height:"225px"
          }} src={tomjerry} alt="" />
       </div>
       </Link>
       <Link to='/sliding-puzzle/ben' >
       <div className="card">
       <img style={{width:'225px' ,height:"225px"
          }} src={ben} alt="" />
       </div>
       </Link>
      </div>
    </section>
    </div>
  );
};

export default SlidingPuzzle;

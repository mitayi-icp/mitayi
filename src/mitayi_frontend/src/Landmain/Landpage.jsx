import React from 'react';
import styled, { keyframes } from 'styled-components';
import 'tailwindcss/tailwind.css';
import './ftft.css';
import CardSlider from '../Landmain/Carousel/CardSlider';
// Import images
import { useState,useEffect } from 'react';
import heroImage from './Assets/BG.jpg';
import feature1Image from './Assets/lock.png';
import feature2Image from './Assets/tokens.png';
import feature3Image from './Assets/wallet.png';
import feature4Image from './Assets/spon.png';
import icp from './Assets/icp.png'
import Login from '../Login';
// Keyframes for animations
const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const slideIn = keyframes`
  from {
    transform: translateY(20px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
`;

// Styled-components for animation
const AnimatedSection = styled.section`
  animation: ${fadeIn} 2s ease-in-out;
`;

const AnimatedDiv = styled.div`
  animation: ${slideIn} 1s ease-in-out;
`;

const LandPage = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

useEffect(() => {
  const savedPrincipal = localStorage.getItem('principal');
  if (savedPrincipal) {
    setIsLoggedIn(true);
  }
}, []);

  return (
    <div id='home' className="bg-gradient-to-r from-black via-limegreen to-blue-900 text-white min-h-screen font-sans">
      {/* Header */}
      
      {/* <div className='h-[10vh] w-auto flex'> */}
      <header className="flex justify-between items-center p-4 sticky top-0 z-50 bg-black bg-opacity-50 backdrop-blur-2xl">
        <div className="text-3xl font-bold text-limegreen">Mitay<span className='text-pink-500'>!</span></div>
        <nav>
          <ul className="flex space-x-4 text-lg ">
            <li><a className=' hover:shadow-pink-500 shadow-lg px-2 rounded-full transition transistion colors ' href="#home">Home</a></li>
            <li><a className=' hover:shadow-pink-500 shadow-lg px-2 rounded-full ' href="#features">Features</a></li>
            <li><a className=' hover:shadow-pink-500 shadow-lg px-2 rounded-full ' href="#pricing">Pricing</a></li>
            <li><a className=' hover:shadow-pink-500 shadow-lg px-2 rounded-full gradient-gyn' href="#gamex">GameX</a></li>
          </ul>
        </nav>
        <a href="#cta" className="bg-pink-500 px-4 py-2 font-bold text-white rounded-full">M! tokens</a>
      </header>
        {/* </div> */}
        
      {/* Hero Section */}
      <AnimatedSection id="hero" className="flex flex-col items-center justify-center text-center h-[100vh]" style={{ backgroundImage: `url(${heroImage})`, backgroundSize: 'contain' }}>
     
        <h1 className="text-6xl font-bold mb-4 text-limegreen hy">Welcome to Mitayi</h1>
        <p className="text-2xl mb-6">Multi-game platform with crypto token integration</p>
        <div>
          <a href="#gamex" className="bg-white border border-white px-6 py-3 rounded-full border-gray-500 border-2"><span className='gradient-head'>GameX</span></a>
        </div>
      </AnimatedSection>

      {/* Features Section */}
      <AnimatedSection className="pt-20 overflow-x-hidden">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className='flex items-center flex-col justify-center w-[100vw] gap h-auto'>
            <div className='flex flex-col items-center justify-center w-full h-auto px-4'>
            <AnimatedDiv className='mb-4'>
            <div class="  bg-opacity-100 rounded-2xl p-8 max-w-md w-full z-10">
            <div class="flex items-center justify-center mb-6">
                <img src={icp} alt="Logo" class="w-56 h-18"/>
            </div>
            {!isLoggedIn &&
            <Login onLogin={handleLogin} />
            }
            
            {/* <button class="w-full py-2 px-4 bg-white font-bold text-black rounded-full text-xl border-2 border-orange-600 hover:bg-gray-300 "><span className='gradient-text'><Login /></span></button> */}
        </div>
            </AnimatedDiv>

            {isLoggedIn && (
                <AnimatedDiv className='mb-32' id="gamex">
                  <CardSlider />
                </AnimatedDiv>
              )}

          

          <AnimatedDiv id="features"  className="text-center w-full p-6 text-right mb-2 bg-white mb-32 bg-opacity-10 flex items-center justify-around rounded-lg">
            <div className='right'>
            <img src={feature1Image} alt="Feature 1" className="h-36 w-36 dp" />
            </div>
            <div className='left'>
            <h3 className="text-2xl font-semibold mb-2 gradient-nav">Seamless Authentication</h3>
            <p className='w-[65vw] gradient-para text-md'><span className='text-pink-500 font-bold text-xl'>"</span>Experience the future of online security with one-click authentication using Internet Identity. No need for lengthy sign-ups or sharing personal details – just secure and straightforward access<span className='text-pink-500 font-bold text-xl'>"</span></p>
            </div>
          </AnimatedDiv>



          <AnimatedDiv className="text-center w-full mb-2 p-6 bg-transparent mb-32 bg-opacity-10 flex items-center justify-around rounded-lg">
          <div className='text-left'>
          <h3 className="text-2xl font-semibold mb-2 gradient-nav">Play and Earn your rewards</h3>
          <p className='w-[65vw] gradient-para text-left text-md'><span className='text-pink-500 font-bold text-xl'>"</span>Dive into exciting games and earn Mitayi tokens as you play. These tokens can be redeemed for money and a variety of rewards, making your gaming experience both fun and rewarding<span className='text-pink-500 font-bold text-xl'>"</span></p>
            </div>
            <div className='right'>
            <img src={feature2Image} alt="Feature 1" className="h-36 w-36 dp" />
            </div>
          </AnimatedDiv>



          <AnimatedDiv className="text-center w-full p-6 mb-32 bg-white bg-opacity-10 flex items-center justify-around rounded-lg">
            <div className='right'>
            <img src={feature3Image} alt="Feature 1" className="h-36 w-36 dp" />
            </div>
            <div className='text-right'>
            <h3 className="text-2xl font-semibold mb-2 text-pink-500 gradient-nav">Sponsor and Profit</h3>
            <p className='w-[70vw] gradient-para text-md'><span className='text-pink-500 font-bold text-xl'>"</span>Invest in the games you believe in and earn money based on the outcomes. Whether you win or lose, there are opportunities to profit, making every investment an exciting venture<span className='text-pink-500 font-bold text-xl'>"</span></p>
            </div>
          </AnimatedDiv>



          <AnimatedDiv className="text-center w-full mb-2 p-6 bg-transparent bg-opacity-10 flex items-center justify-around rounded-lg">
          <div className='text-left'>
          <h3 className="text-2xl font-semibold mb-2 text-pink-500 gradient-nav">Token Management Made Easy</h3>
          <p className='w-[70vw] gradient-para text-md'><span className='text-pink-500 font-bold text-xl'>"</span>Convert, swap, send, and receive Mitayi tokens effortlessly using the Plug wallet. Manage your digital assets with ease and convenience, all in one place<span className='text-pink-500 font-bold text-xl'>"</span></p>
            </div>
            <div className='right'>
            <img src={feature4Image} alt="Feature 1" className="h-36 w-36 dp" />
            </div>
          </AnimatedDiv>

            </div>
          </div>
        </div>
      </AnimatedSection>

      {/* Pricing Section */}
      <AnimatedSection id="pricing" className="py-20">
        <h2 className="text-4xl font-semibold text-center mb-12 text-white">Pricing Plans</h2>
        <div className="flex items-center justify-center gap-4">
        <AnimatedDiv className="text-center p-6 bg-white bg-opacity-10 rounded-2xl">
  <h3 className="text-2xl font-semibold mb-2 text-pink-500">Free</h3>
  <p className="text-3xl font-bold mb-4">$10/month</p>
  <ul className="mb-4">
    <li>Seamless Authentication <span className='text-green-500'>&#10003;</span></li>
    <li>Play and Earn your rewards <span className='text-green-500'>&#10003;</span></li>
    <li>Sponsor and Profit <span className='text-red-500'>&#10007;</span></li>
    <li>Token Management Made Easy <span className='text-red-500'>&#10007;</span></li>
  </ul>
  <a href="#cta" className="bg-pink-500 px-4 py-2 rounded-full mt-4 inline-block">Choose Plan</a>
</AnimatedDiv>

<AnimatedDiv className="text-center p-6 bg-white bg-opacity-10 rounded-2xl">
  <h3 className="text-2xl font-semibold mb-2 text-pink-500">Basic</h3>
  <p className="text-3xl font-bold mb-4">$20/month</p>
  <ul className="mb-4">
    <li>Seamless Authentication <span className='text-green-500'>&#10003;</span></li>
    <li>Play and Earn your rewards <span className='text-green-500'>&#10003;</span></li>
    <li>Sponsor and Profit <span className='text-green-500'>&#10003;</span></li>
    <li>Token Management Made Easy <span className='text-red-500'>&#10007;</span></li>
  </ul>
  <a href="#cta" className="bg-pink-500 px-4 py-2 rounded-full mt-4 inline-block">Choose Plan</a>
</AnimatedDiv>

<AnimatedDiv className="text-center p-6 bg-white bg-opacity-10 rounded-2xl">
  <h3 className="text-2xl font-semibold mb-2 text-pink-500">Premium</h3>
  <p className="text-3xl font-bold mb-4">$30/month</p>
  <ul className="mb-4">
    <li>Seamless Authentication <span className='text-green-500'>&#10003;</span></li>
    <li>Play and Earn your rewards <span className='text-green-500'>&#10003;</span></li>
    <li>Sponsor and Profit <span className='text-green-500'>&#10003;</span></li>
    <li>Token Management Made Easy <span className='text-green-500'>&#10003;</span></li>
  </ul>
  <a href="#cta" className="bg-pink-500 px-4 py-2 rounded-full mt-4 inline-block">Choose Plan</a>
</AnimatedDiv>

        </div>
      </AnimatedSection>

      {/* Footer */}
      <footer className="py-10 bg-black bg-opacity-80 text-center">
        <p className="text-white">© 2024 Mitayi. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default LandPage;


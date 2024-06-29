import React, { useRef } from "react";
import ReactCardCarousel from "react-card-carousel";
import { Link } from "react-router-dom";
import Card from "./Card";
import './Landing.css';
import puzzleimg from '../gameimages/slidingpuzzle.png';
import sudoku from '../gameimages/suduko.png';
import Tohlogo from '../gameimages/TOH.png';
import Dicegame from '../gameimages/dicegame.png';
import MatchCard from '../gameimages/memory.png';
import tictac from '../gameimages/Tic_tac.png';

const CONTAINER_STYLE = {
  position: "relative",
  height: "70vh",
  width: "100%",
  display: "flex",
  justifyContent: "center",
  alignItems: "center"
};

const CARD_STYLE = {
  height: "250px",
  width: "280px",
  textAlign: "center",
  background: "#52C0F5",
  color: "#FFF",
  fontFamily: "sans-serif",
  fontSize: "12px",
  textTransform: "uppercase",
  borderRadius: "25px",
  boxSizing: "border-box"
};

const BUTTON_STYLE = {
  position: "absolute",
  top: "50%",
  transform: "translateY(-50%)",
  backgroundColor: "black",
  color: "#FFF",
  border: "none",
  borderRadius: "25px",
  padding: "10px 20px",
  cursor: "pointer",
  zIndex: 1
};

const PREVIOUS_BUTTON_STYLE = {
  ...BUTTON_STYLE,
  marginTop: "300px",
  border: "solid 1px dodgerblue",
  right: "10px",
  zIndex: "2"
};

const NEXT_BUTTON_STYLE = {
  ...BUTTON_STYLE,
  transform: "translateY(-50%) rotate(180deg)",
  border: "solid 1px dodgerblue",
   marginTop: "300px",
  zIndex: "2",
  left: "10px"
  
};

const CardSlider = () => {
  const carouselRef = useRef(null);

  const handlePrevious = () => {
    if (carouselRef.current) {
      carouselRef.current.prev();
    }
  };

  const handleNext = () => {
    if (carouselRef.current) {
      carouselRef.current.next();
    }
  };

  return (
    <>
    <div style={CONTAINER_STYLE}>
      <ReactCardCarousel autoplay autoplay_speed={2500} ref={carouselRef}>
        <div style={CARD_STYLE}><Link to='/sliding-puzzle'><Card path={puzzleimg} title="Sliding Puzzle" content="Slide, Think, Solve - Win the Game" /></Link></div>
        <div style={CARD_STYLE}><Link to='/sudoku-solver'><Card path={sudoku} title="Sudoku Solver" content="Logic puzzle with 1-9 grid completion." /></Link></div>
        <div style={CARD_STYLE}><Link to="/toh"><Card path={Tohlogo} title="Towers of Hannoi" content="Challenge Your mind with Tower Puzzles" /></Link></div>
        <div style={CARD_STYLE}><Link to="/DiceGame"><Card path={Dicegame} title="Dice Fortune Frenzy" content="Roll, Guess, Win, Repeat - Your Luck Awaits!" /></Link></div>
        <div style={CARD_STYLE}><Link to="/MatchCard"><Card path={MatchCard} title="Luck Test" content="Flip the card - Test your Luck with Lucky test" /></Link></div>
        <div style={CARD_STYLE}><Link to="/TicTac"><Card path={tictac} title="Tic Tac Toe" content="Outsmart Opponents, Line Up Three" /></Link></div>
      </ReactCardCarousel>
      <div className="mb-30">
     <button onClick={handlePrevious} style={PREVIOUS_BUTTON_STYLE}>&#x2770;</button>
     <button onClick={handleNext} style={NEXT_BUTTON_STYLE}>&#x2770;</button>
     </div>
    </div>
    </>
  );
};

export default CardSlider;

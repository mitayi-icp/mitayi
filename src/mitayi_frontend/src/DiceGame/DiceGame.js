import React, { useState, useEffect } from 'react';
import styled, { keyframes, css } from 'styled-components';
import confetti from 'canvas-confetti';
import spinSound from './dice.mp3';
import AddTokensButton from '../Backendcomponents/AddTokensButton';
const DiceGameWrapper = styled.div`
  text-align: center;
  font-family: Arial, sans-serif;
  background-color: black;
  width: 100%;
  height: 100vh;
  padding-top: 40px;
`;

const InputWrapper = styled.div`
  margin: 20px;
`;

const glowAnimation = keyframes`
  0% {
    box-shadow: 0 0 10px gold;
  }
  50% {
    box-shadow: 0px 0px 30px gold;
  }
  100% {
    box-shadow: 0 0 10px gold;
  }
`;

const rollAnimation = keyframes`
  0% { transform: rotate(0deg); }
  25% { transform: rotate(90deg); }
  50% { transform: rotate(180deg); }
  75% { transform: rotate(270deg); }
  100% { transform: rotate(360deg); }
`;

const DiceImage = styled.img`
  width: 80px;
  height: 80px;
  margin: 10px;
  border-radius: 15px;
  ${(props) => props.animate && css`
    animation: ${rollAnimation} 2s infinite;
  `}
  ${(props) => props.spin && css`
    animation: ${rollAnimation} 1s ease-out, ${glowAnimation} 1s ease-out;
  `}
`;

const Dice = ({ number, animate, spin }) => {
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    if (animate) {
      setIsAnimating(true);
      setTimeout(() => {
        setIsAnimating(false);
      }, 3000); }
  }, [animate]);

  const diceSrc = require(`./assets/Dice${number}.png`);
  return <DiceImage src={diceSrc} alt={`Dice ${number}`} animate={isAnimating ? 1 : 0} spin={spin ? 1 : 0} />;
};

const Confetti = ({ onClose }) => {
  useEffect(() => {
    const end = Date.now() + 3 * 1000; // 3 seconds
    const colors = ["#a786ff", "#fd8bbc", "#eca184", "#f8deb1"];

    const frame = () => {
      if (Date.now() > end) return;

      confetti({
        particleCount: 2,
        angle: 60,
        spread: 55,
        startVelocity: 60,
        origin: { x: 0, y: 0.5 },
        colors: colors,
      });
      confetti({
        particleCount: 2,
        angle: 120,
        spread: 55,
        startVelocity: 60,
        origin: { x: 1, y: 0.5 },
        colors: colors,
      });

      requestAnimationFrame(frame);
    };

    frame();
  }, []);

  return (
    <div className='flex items-center justify-center w-[100vw] h-[100vh] bg-black bg-opacity-50 backdrop-blur-lg fixed top-0 left-0 z-50'>
      <div id="popup-modal" tabIndex="-1" className="overflow-y-auto overflow-x-hidden justify-center items-center">
        <div className="relative p-4 w-full max-w-md max-h-full">
          <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
            <button type="button" className="absolute top-3 end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" onClick={onClose}>
              <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
              </svg>
              <span className="sr-only">Close modal</span>
            </button>
            <div className="p-4 md:p-5 text-center">
              <h1 className='text-6xl my-2'>🎊</h1>
              <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">Are you sure you want to add Mi tokens?</h3>
              <AddTokensButton tokensToAdd={5}/>
              {/* <button onClick={onClose} className="text-white bg-yellow-500 hover:bg-yellow-800 text-yellow-800 hover:text-white font-medium rounded-full text-sm inline-flex items-center px-5 py-2.5 text-center">
                Add 10 Mi Tokens
              </button> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const DiceGame = () => {
  const [bidAmount, setBidAmount] = useState(0);
  const [guessNumber, setGuessNumber] = useState('');
  const [diceNumbers, setDiceNumbers] = useState([]);
  const [balance, setBalance] = useState(0);
  const [gameResult, setGameResult] = useState('');
  const [isGameStarted, setIsGameStarted] = useState(false);
  const [attempts, setAttempts] = useState(0);
  const [isSpinning, setIsSpinning] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true); 

  // Audio object for playing spin sound
  let spinAudio = new Audio(spinSound);

  const handleSpin = () => {
    setIsSpinning(true);

    // Play spin sound if sound is enabled
    if (soundEnabled) {
      spinAudio.play();
    }

    const newDiceNumbers = Array.from({ length: 6 }, () => Math.floor(Math.random() * 6) + 1);
    setDiceNumbers(newDiceNumbers);
    const count = newDiceNumbers.filter(num => num === parseInt(guessNumber)).length;
    if (count > 1) {
      setBalance(balance + bidAmount);
      setTimeout(() => {
        setGameResult('You win!');
      }, 1000); // Show result after 1 second
    } else {
      setBalance(balance - bidAmount);
      setTimeout(() => {
        setGameResult('You lose!');
      }, 1000); // Show result after 1 second
    }
    setTimeout(() => {
      setIsSpinning(false);
    }, 1000); // Stop spinning animation after 1 second

    setAttempts(attempts + 1);

    if (attempts + 1 >= 6) {
      if (balance > 0) {
        setShowConfetti(true);
      } else {
        setGameResult(balance >= 0 ? 'It\'s a tie!' : 'You lose!');
      }
      setIsGameStarted(false);
    }
  };

  const handleConfettiClose = () => {
    setShowConfetti(false);
    setGameResult('');
  };

  const toggleSound = () => {
    setSoundEnabled(!soundEnabled);
  };

  if (!isGameStarted) {
    return (
      <DiceGameWrapper>
        <center><h1 className='text-5xl font-bold text-yellow-600 underline decoration-2 decoration-gray-600'>Dice Fortune Frenzy</h1></center>
        <div className='flex flex-col items-center justify-center h-[70vh] w-[100vw]'>
          <div className='flex mb-14'>
            {Array.from({ length: 6 }, (_, index) => (
              <Dice key={index} number={Math.floor(Math.random() * 6) + 1} animate={true} />
            ))}
          </div>
          <button className=" px-6 mr-2 py-2 text-yellow-600 border border-yellow-600 font-bold bg-yellow-100 mb-4 rounded-full text-3xl" onClick={() => {
            setIsGameStarted(true);
            setAttempts(0);
            setGameResult('');
            setBalance(0);
          }}>{balance > 0 ? "Claim Tokens" : "Start Game"}</button>
          {gameResult && (
            <div className='text-2xl mt-2 text-yellow-600 font-bold'>
              {balance > 0 ? "You Won!" : "You Lose! Try Again....."}
            </div>
          )}
        </div>
      </DiceGameWrapper>
    );
  }

  return (
    <DiceGameWrapper>
      <h1 className='text-5xl font-bold text-yellow-600 underline decoration-2 decoration-gray-600'>Dice Fortune Frenzy</h1>
      <div className='text-xl mt-4 font-bold text-yellow-400'>Balance: {balance} units</div>
      <div className='text-xl font-bold text-yellow-400'>Attempts: {attempts} / 6</div>
      <br/>
      <button className="px-4 mr-2 py-1 text-yellow-600 border border-yellow-600 font-bold bg-yellow-100 mb-4 rounded-full text-xl"
          onClick={toggleSound}
        >
          {soundEnabled ? "Mute Sound" : "Unmute Sound"}
        </button>
      <InputWrapper>
        <input
          className="px-4 mr-2 py-2 text-yellow-600 border border-yellow-600 font-bold bg-yellow-100 mb-4 rounded-full text-2xl placeholder:text-yellow-800"
          type="number"
          placeholder="Bid Units"
          onChange={e => setBidAmount(parseInt(e.target.value))}
        /><br />
        <input
          className="px-4 mr-2 py-2 text-yellow-600 border border-yellow-600 font-bold bg-yellow-100 mb-4 rounded-full text-2xl placeholder:text-yellow-800"
          type="number"
          placeholder="Guess Number"
          value={guessNumber}
          onChange={e => setGuessNumber(e.target.value)}
        /><br />
        <button className="px-6 mr-2 py-2 text-yellow-600 border border-yellow-600 font-bold bg-yellow-100 mb-4 rounded-full text-3xl"
          onClick={handleSpin}
          disabled={isSpinning}
        >Spin Now</button>
      </InputWrapper>
      <div className='flex items-center justify-center'>
        {diceNumbers.map((num, index) => (
          <Dice key={index} number={num} spin={isSpinning} animate={isSpinning} />
        ))}
      </div>
      {showConfetti && (
        <div className='flex items-center justify-center'>
          <button onClick={handleConfettiClose} className="px-6 mr-2 py-2 text-yellow-600 border border-yellow-600 font-bold bg-yellow-100 mb-4 rounded-full text-3xl">
            Close Confetti
          </button>
          <Confetti onClose={handleConfettiClose} />
        </div>
      )}
    </DiceGameWrapper>
  );
};

export default DiceGame;
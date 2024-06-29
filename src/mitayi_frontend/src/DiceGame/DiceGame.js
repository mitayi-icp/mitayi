import React, { useState, useEffect } from 'react';
import styled, { keyframes, css } from 'styled-components';

const DiceGameWrapper = styled.div`
  text-align: center;
  font-family: Arial, sans-serif;
  background-color: black;
  width: 100%;
  height: 100vh;
  padding-top: 40px;
`;

const TimerWrapper = styled.div`
  font-size: 20px;
  margin: 10px;
  color: gold;
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
      }, 3000); // Set animate to false after 3 seconds
    }
  }, [animate]);

  const diceSrc = require(`./assets/Dice${number}.png`);
  return <DiceImage src={diceSrc} alt={`Dice ${number}`} animate={isAnimating ? 1 : 0} spin={spin ? 1 : 0} />;
};

const Timer = ({ seconds, onExpire }) => {
  useEffect(() => {
    if (seconds <= 0) {
      onExpire();
      return;
    }

    const interval = setInterval(() => {
      onExpire(seconds - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [seconds, onExpire]);

  return (
    <TimerWrapper>
      Time Left: {seconds}s
    </TimerWrapper>
  );
};

const DiceGame = () => {
  const [bidAmount, setBidAmount] = useState(100);
  const [guessNumber, setGuessNumber] = useState('');
  const [diceNumbers, setDiceNumbers] = useState([]);
  const [balance, setBalance] = useState(100);
  const [gameResult, setGameResult] = useState('');
  const [isGameStarted, setIsGameStarted] = useState(false);
  const [seconds, setSeconds] = useState(60);
  const [isSpinning, setIsSpinning] = useState(false);

  const handleSpin = () => {
    setIsSpinning(true);
    const newDiceNumbers = Array.from({ length: 6 }, () => Math.floor(Math.random() * 6) + 1);
    setDiceNumbers(newDiceNumbers);
    const count = newDiceNumbers.filter(num => num === parseInt(guessNumber)).length;
    if (count > 1) {
      setBalance(balance + bidAmount);
      setTimeout(() => {
        setGameResult('You win!');
      }, 1000); // Show result after 2 seconds (matching animation duration)
    } else {
      setBalance(balance - bidAmount);
      setTimeout(() => {
        setGameResult('You lose!');
      }, 1000); // Show result after 2 seconds (matching animation duration)
    }
    setTimeout(() => {
      setIsSpinning(false);
    }, 1000); // Stop spinning animation after 2 seconds
  };

  const handleExpire = (newSeconds) => {
    if (newSeconds <= 0) {
      if (balance > 100) {
        setGameResult('You win!');
      } else if (balance < 100) {
        setGameResult('You lose!');
      } else {
        setGameResult('It\'s a tie!');
      }
      setIsGameStarted(false);
      return;
    }
    setSeconds(newSeconds);
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
            setSeconds(60);
            setGameResult('');
            setBalance(100);
          }}>Start Game</button></div>
        {gameResult && <div className='text-2xl text-yellow-600 font-bold'>{gameResult}</div>}
      </DiceGameWrapper>
    );
  }

  return (
    <DiceGameWrapper>
      <h1 className='text-5xl font-bold text-yellow-600 underline decoration-2 decoration-gray-600'>Dice Fortune Frenzy</h1>
      <Timer seconds={seconds} onExpire={handleExpire} />
      <div className='text-xl font-bold text-yellow-400 ' >Balance: {balance} units</div>
      <InputWrapper>

        <input
          className=" px-4 mr-2 py-2 text-yellow-600 border border-yellow-600 font-bold bg-yellow-100 mb-4 rounded-full text-2xl placeholder:text-yellow-800"
          type="number"
          placeholder="Bid Units"
          onChange={e => setBidAmount(parseInt(e.target.value))}
        /> <br />

        <input
          className=" px-4 mr-2 py-2 text-yellow-600 border border-yellow-600 font-bold bg-yellow-100 mb-4 rounded-full text-2xl placeholder:text-yellow-800"
          type="number"
          placeholder="Guess Number"
          value={guessNumber}
          onChange={e => setGuessNumber(e.target.value)}
        />
        <br />
        <button className=" px-6 mr-2 py-2 text-yellow-600 border border-yellow-600 font-bold bg-yellow-100 mb-4 rounded-full text-3xl"
          onClick={handleSpin}
          disabled={isSpinning}
        >Spin Now</button>
      </InputWrapper>
      <div className='flex items-center justify-center ' >
        {diceNumbers.map((num, index) => (
          <Dice key={index} number={num} spin={isSpinning} animate={isSpinning} />
        ))}
      </div>
    </DiceGameWrapper>
  );
};

export default DiceGame;

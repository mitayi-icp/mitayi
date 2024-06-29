import React, { useState, useEffect } from 'react';
import xSound from './Assets/click.wav';
import oSound from './Assets/click.wav';

const TicTac = () => {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);
  const [winner, setWinner] = useState(null);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [celebrate, setCelebrate] = useState(false);
  const [computerMode, setComputerMode] = useState(false);
  const [timeOut, setTimeOut] = useState(null);
  const [progress, setProgress] = useState(100);
  const [gameStarted, setGameStarted] = useState(false);
  const [difficulty, setDifficulty] = useState('normal');

  useEffect(() => {
    if (!winner && gameStarted) {
      resetTimeout();
    }
    return () => clearTimeout(timeOut);
  }, [xIsNext, gameStarted]);

  useEffect(() => {
    if (progress <= 0 && !winner) {
      handleMoveTimeout();
    }
  }, [progress]);

  useEffect(() => {
    if (computerMode && !xIsNext && !winner && gameStarted) {
      makeComputerMove();
    }
  }, [xIsNext, computerMode]);

  const resetTimeout = () => {
    clearTimeout(timeOut);
    setProgress(100);
    setTimeOut(
      setInterval(() => {
        setProgress(prev => prev - 1);
      }, 100)
    );
  };

  const handleMoveTimeout = () => {
    if (!winner) {
      setXIsNext(!xIsNext);
      resetTimeout();
    }
  };

  const makeComputerMove = () => {
    const availableSlots = board.reduce((acc, el, idx) => {
      if (el === null) acc.push(idx);
      return acc;
    }, []);
    if (availableSlots.length === 0) return;

    let computerMove;

    switch (difficulty) {
      case 'easy':
        computerMove = getRandomMove(availableSlots);
        break;
      case 'normal':
        computerMove = getNormalMove(availableSlots);
        break;
      case 'hard':
        computerMove = getHardMove();
        break;
      default:
        computerMove = getRandomMove(availableSlots);
    }

    const newBoard = [...board];
    newBoard[computerMove] = 'O';
    setBoard(newBoard);
    setSelectedSlot(computerMove);
    setXIsNext(true);
    
    const winnerFoundAfterComputerMove = calculateWinner(newBoard);
    if (winnerFoundAfterComputerMove) {
      setWinner(winnerFoundAfterComputerMove);
      setCelebrate(true);
    }
  };

  const getRandomMove = availableSlots => {
    const randomIndex = Math.floor(Math.random() * availableSlots.length);
    return availableSlots[randomIndex];
  };

  const getNormalMove = availableSlots => {
    if (availableSlots.includes(4)) return 4;
    return getRandomMove(availableSlots);
  };

  const getHardMove = () => {
    return getBestMove(board, 'O');
  };

  const getBestMove = (board, player) => {
    const opponent = player === 'O' ? 'X' : 'O';
    const availableSlots = board.reduce((acc, el, idx) => {
      if (el === null) acc.push(idx);
      return acc;
    }, []);

    for (let i = 0; i < availableSlots.length; i++) {
      const newBoard = [...board];
      newBoard[availableSlots[i]] = player;
      if (calculateWinner(newBoard) === player) {
        return availableSlots[i];
      }
    }

    for (let i = 0; i < availableSlots.length; i++) {
      const newBoard = [...board];
      newBoard[availableSlots[i]] = opponent;
      if (calculateWinner(newBoard) === opponent) {
        return availableSlots[i];
      }
    }

    return getRandomMove(availableSlots);
  };

  const calculateWinner = squares => {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    return null;
  };

  const handleClick = i => {
    if (winner || board[i]) return;
    clearTimeout(timeOut);
    playSound(xIsNext ? 'X' : 'O');

    const newBoard = [...board];
    newBoard[i] = xIsNext ? 'X' : 'O';
    setBoard(newBoard);
    setXIsNext(!xIsNext);
    setSelectedSlot(i);

    const winnerFound = calculateWinner(newBoard);
    if (winnerFound) {
      setWinner(winnerFound);
      setCelebrate(true);
    } else {
      resetTimeout();
    }
  };

  const playSound = player => {
    const sound = new Audio(player === 'X' ? xSound : oSound);
    sound.play();
  };

  const renderSquare = i => {
    return (
      <button
        className={`flex items-center justify-center w-20 h-20 border border-black text-3xl font-bold ${selectedSlot === i ? 'ring-2 ring-blue-500' : ''}`}
        onClick={() => handleClick(i)}
        style={{ color: board[i] === 'X' ? 'red' : board[i] === 'O' ? 'blue' : 'black' }}
      >
        {board[i]}
      </button>
    );
  };

  const resetGame = () => {
    clearTimeout(timeOut);
    setBoard(Array(9).fill(null));
    setXIsNext(true);
    setWinner(null);
    setSelectedSlot(null);
    setCelebrate(false);
    setProgress(100);
    setGameStarted(false);
  };

  const toggleComputerMode = () => {
    clearTimeout(timeOut);
    setComputerMode(!computerMode);
  };

  const changeDifficulty = level => {
    setDifficulty(level);
  };

  const renderStatus = () => {
    if (winner) {
      return `Winner: ${winner}`;
    } else {
      return `Next player: ${xIsNext ? 'X' : 'O'}`;
    }
  };

  const progressBarColor = `hsl(${progress}, 100%, 50%)`;

  return (
    <div className={`min-h-screen flex justify-center items-center flex-col ${celebrate ? '' : 'bg-gradient-to-br from-blue-500 to-blue-900'}`}>
      {gameStarted && (
        <div
          className="glass-effect mb-10 p-10 rounded-2xl shadow-lg backdrop-filter backdrop-blur-lg relative"
          style={{ border: `10px solid ${progressBarColor}` }}
        >
          <div className="flex flex-wrap w-[20vw]">
            {Array.from({ length: 9 }, (_, i) => renderSquare(i))}
          </div>
          <div className="mt-4 text-center text-2xl font-bold">{renderStatus()}</div>
          {winner && (
            <div className="mt-4 text-center text-3xl font-bold text-white animate-pulse">
              Congratulations!
            </div>
          )}
          {winner && <div className="cracker-animation"></div>}
        </div>
      )}
      <div className="flex justify-center items-center">
        <button
          className="mr-4 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full"
          onClick={resetGame}
        >
          Reset Game
        </button>
        <button
          className={`bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-full ${computerMode ? 'bg-green-600' : ''}`}
          onClick={toggleComputerMode}
        >
          {computerMode ? 'Switch to Multiplayer' : 'Switch to Computer Mode'}
        </button>
        <div className="ml-4">
          <select
            className="bg-gray-200 hover:bg-gray-300 text-black w-[130px] font-bold py-2 px-4 rounded-full"
            value={difficulty}
            onChange={e => changeDifficulty(e.target.value)}
          >
            <option value="easy">Easy</option>
            <option value="normal">Normal</option>
            <option value="hard">Hard</option>
          </select>
        </div>
        {!gameStarted && (
          <button
            className="ml-4 bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-full"
            onClick={() => setGameStarted(true)}
          >
            Start Game
          </button>
        )}
      </div>
    </div>
  );
};

export default TicTac;

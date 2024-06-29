import React, { useState, useEffect } from "react";
import "./Sudo.css";
import { useNavigate } from "react-router-dom";

const SudokuSolver = () => {
  const navigateTo = useNavigate();
  const generateRandomBoard = () => {
    const shuffle = (array) => array.sort(() => Math.random() - 0.5);

    const generateFullBoard = () => {
      const board = Array.from({ length: 9 }, () => Array(9).fill(""));
      solve(board);
      return board;
    };

    const removeNumbers = (board) => {
      let attempts = 40;
      while (attempts > 0) {
        const row = Math.floor(Math.random() * 9);
        const col = Math.floor(Math.random() * 9);
        if (board[row][col] !== "") {
          board[row][col] = "";
          attempts--;
        }
      }
      return board;
    };

    const fullBoard = generateFullBoard();
    const puzzleBoard = removeNumbers(fullBoard);
    return puzzleBoard;
  };

  const [initialValues, setInitialValues] = useState([]);
  const [values, setValues] = useState([]);
  const [time, setTime] = useState(0);
  const [timerActive, setTimerActive] = useState(false);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const newBoard = generateRandomBoard();
    setInitialValues(JSON.parse(JSON.stringify(newBoard)));
    setValues(newBoard);
    setTimerActive(true);
  }, []);

  useEffect(() => {
    let timer;
    if (timerActive) {
      timer = setInterval(() => {
        setTime((prevTime) => prevTime + 1);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [timerActive]);

  const handleChange = (e, i, j) => {
    const newValues = [...values];
    const value = e.target.value;

    if (value === "" || /^[1-9]$/.test(value)) {
      newValues[i][j] = value === "" ? "" : parseInt(value, 10);
      setValues(newValues);
    }
  };

  const solveSudoku = () => {
    const tempValues = JSON.parse(JSON.stringify(values));
    if (solve(tempValues)) {
      setValues(tempValues);
      setTimerActive(false);
      setShowModal(true);
    } else {
      alert("No solution exists for the given Sudoku");
    }
  };

  const solve = (board) => {
    for (let i = 0; i < 9; i++) {
      for (let j = 0; j < 9; j++) {
        if (board[i][j] === "") {
          for (let c = 1; c <= 9; c++) {
            if (isValid(board, i, j, c)) {
              board[i][j] = c;
              if (solve(board)) {
                return true;
              } else {
                board[i][j] = "";
              }
            }
          }
          return false;
        }
      }
    }
    return true;
  };

  const isValid = (board, row, col, num) => {
    for (let i = 0; i < 9; i++) {
      if (board[row][i] === num || board[i][col] === num) {
        return false;
      }
      const boxRow = 3 * Math.floor(row / 3) + Math.floor(i / 3);
      const boxCol = 3 * Math.floor(col / 3) + (i % 3);
      if (board[boxRow][boxCol] === num) {
        return false;
      }
    }
    return true;
  };

  const resetBoard = () => {
    setValues(JSON.parse(JSON.stringify(initialValues)));
    setTime(0);
    setTimerActive(true);
  };

  const closeModal = () => {
    navigateTo("../");
  };

  const restartGame = () => {
    resetBoard();
    setShowModal(false);
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
  };

  return (
    <div className="container1">
      <h2 className="title">Sudoku Solver</h2>
      <div className="grid">
        {values.map((row, i) =>
          row.map((cell, j) => (
            <input
              key={`${i}-${j}`}
              type="text"
              maxLength="1"
              value={values[i][j] === "" ? "" : values[i][j]}
              onChange={(e) => handleChange(e, i, j)}
              className={`cell ${initialValues[i][j] === "" ? "unfilled" : ""}`}
              readOnly={initialValues[i][j] !== ""}
            />
          ))
        )}
      </div>
      <div className="buttons">
        <button onClick={solveSudoku} className="button solve">
          Solve
        </button>
        <button onClick={resetBoard} className="button reset">
          Reset
        </button>
      </div>
      <div className="timer">Time: {formatTime(time)}</div>
      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <h2>Sudoku Solved!</h2>
            <p>Time taken: {formatTime(time)}</p>
            <button onClick={restartGame} className="button">
              Restart
            </button>
            <button onClick={closeModal} className="button">
              Back
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SudokuSolver;

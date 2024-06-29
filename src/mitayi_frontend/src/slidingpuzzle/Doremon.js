import React, { useState, useEffect } from 'react';
import useSound from 'use-sound';
import moveSound from './assets/move.mp3';
import './back.css'
const rows = 3;
const columns = 3;

const initialImgOrder = ["4", "2", "8", "5", "1", "6", "7", "9", "3"];

const Doremon = () => {
  const [tiles, setTiles] = useState([]);
  const [currTile, setCurrTile] = useState(null);
  const [otherTile, setOtherTile] = useState(null);
  const [turns, setTurns] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [play] = useSound(moveSound, { volume: isMuted ? 0 : 1 });
  const [hasWon, setHasWon] = useState(false);
  const [isFinished, setIsFinished] = useState(false);

  useEffect(() => {
    shuffleTiles();
  }, []);

  const shuffleTiles = () => {
    let imgOrder = [...initialImgOrder];
    imgOrder = imgOrder.sort(() => Math.random() - 0.5);
    const shuffledTiles = [];
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < columns; c++) {
        const imgSrc = require(`./assets/${imgOrder.shift()}.jpg`);
        const tile = {
          id: `${r}-${c}`,
          src: imgSrc,
        };
        shuffledTiles.push(tile);
      }
    }
    setTiles(shuffledTiles);
    setTurns(0);
    setHasWon(false);
    setIsFinished(false);
  };

  const handleDragStart = (tile) => {
    setCurrTile(tile);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (tile) => {
    setOtherTile(tile);
  };

  const handleDragEnd = () => {
    if (!otherTile || otherTile.src.includes("3.jpg")) return;

    const currCoords = currTile.id.split("-");
    const r1 = parseInt(currCoords[0]);
    const c1 = parseInt(currCoords[1]);

    const otherCoords = otherTile.id.split("-");
    const r2 = parseInt(otherCoords[0]);
    const c2 = parseInt(otherCoords[1]);

    const moveLeft = r1 === r2 && c2 === c1 - 1;
    const moveRight = r1 === r2 && c2 === c1 + 1;
    const moveUp = c1 === c2 && r2 === r1 - 1;
    const moveDown = c1 === c2 && r2 === r1 + 1;

    const isAdjacent = moveLeft || moveRight || moveUp || moveDown;

    if (isAdjacent) {
      setTiles(prevTiles => {
        const newTiles = prevTiles.map((tile) => {
          if (tile.id === currTile.id) {
            return { ...tile, src: otherTile.src };
          } else if (tile.id === otherTile.id) {
            return { ...tile, src: currTile.src };
          } else {
            return tile;
          }
        });
        return newTiles;
      });

      setTurns(prevTurns => prevTurns + 1);
      play();
    }
  };


  const checkWin = (tiles) => {
    const correctOrder = [
      "1.jpg", "2.jpg", "3.jpg",
      "4.jpg", "5.jpg", "6.jpg",
      "7.jpg", "8.jpg", "9.jpg"
    ];

    let isWinning = true;

    tiles.forEach((tile, index) => {
      if (!tile.src.includes(correctOrder[index])) {
        console.log(`Tile at index ${index} does not match:`, tile.src);
        isWinning = false;
      }
    });

    return isWinning;
  };


  const handleFinish = () => {
    const win = checkWin(tiles);
    if (win) {
      setHasWon(true);
    }
    setIsFinished(true);
  };

  const handleRestart = () => {
    shuffleTiles();
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  return (
    <div className='backback' style={{ width: "100%", height: "100vh", display: "flex", alignItems: "center", justifyContent: "space-around", paddingTop: "50px", }}>

      <div className="divbox" style={{}}>
        <img style={{width:"200px",height:"200px",borderRadius:"9px"}} id="title" src={require('./assets/logo.jpg')} alt="Logo" className="mb-4" />
        <center><h1 style={{ fontSize: "29px", color: 'whitesmoke' }}>Doremon</h1></center>
      </div>
      <div className='gridbox' style={{ boxShadow: " rgba(0, 0, 0, 0.24) 0px 3px 8px", padding: "35px" }}>
        <div id="board" className="flex flex-wrap w-72 h-72">
          {tiles.map((tile) => (
            <img
              key={tile.id}
              id={tile.id}
              src={tile.src}
              draggable
              onDragStart={() => handleDragStart(tile)}
              onDragOver={handleDragOver}
              onDrop={() => handleDrop(tile)}
              onDragEnd={handleDragEnd}
              alt="tile"
              className="w-24 h-24 object-cover"
            />
          ))}
        </div>

        <h1 className="mt-4">Turns: <span id="turns">{turns}</span></h1>
        {isFinished && hasWon && <h2 className="mt-4 text-green-500 text-xl">Congratulations! You solved the puzzle!</h2>}
        {isFinished && !hasWon && <h2 className="mt-4 text-red-500 text-xl">Try again! The puzzle is not solved yet.</h2>}
        <div className="flex space-x-4 mt-4">
          <button onClick={handleRestart} className="px-4 py-2 bg-blue-500 text-white rounded">Restart</button>
          <button onClick={toggleMute} className="px-4 py-2 bg-gray-500 text-white rounded">{isMuted ? "Unmute" : "Mute"}</button>
          {/* <button onClick={handleFinish} className="px-4 py-2 bg-green-500 text-white rounded">Finish</button> */}
        </div>

      </div>
    </div>
  );
};

export default Doremon;

import React, { useState } from "react";
import "./Toh.css";
import drag from './drag.mp3';

const Toh = () => {
  const [moveCount, setMoveCount] = useState(0);
  const [dragId, setDragId] = useState();
  const [isMuted, setIsMuted] = useState(false);
  const [dragSound] = useState(new Audio(drag));
  const [difficulty, setDifficulty] = useState("easy"); // Default difficulty

  const handleDifficultyChange = (level) => {
    setDifficulty(level);
    resetGame(level); // Reset game with the selected difficulty
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  const playSound = () => {
    if (!isMuted) {
      dragSound.play();
    }
  };

  const initialTiles = {
    easy: [
      { id: "Tile-1", column: 1, row: 1, width: 2, color: "linear-gradient(135deg, #ff7e5f, #feb47b)" },
      { id: "Tile-2", column: 1, row: 2, width: 4, color: "linear-gradient(135deg, #6a11cb, #2575fc)" },
      { id: "Tile-3", column: 1, row: 3, width: 6, color: "linear-gradient(135deg, #43cea2, #185a9d)" }
    ],
    normal: [
      { id: "Tile-1", column: 1, row: 1, width: 2, color: "linear-gradient(135deg, #ff7e5f, #feb47b)" },
      { id: "Tile-2", column: 1, row: 2, width: 4, color: "linear-gradient(135deg, #6a11cb, #2575fc)" },
      { id: "Tile-3", column: 1, row: 3, width: 6, color: "linear-gradient(135deg, #43cea2, #185a9d)" },
      { id: "Tile-4", column: 1, row: 4, width: 8, color: "linear-gradient(135deg, #ff6a00, #ee0979)" }
    ],
    hard: [
      { id: "Tile-1", column: 1, row: 1, width: 2, color: "linear-gradient(135deg, #ff7e5f, #feb47b)" },
      { id: "Tile-2", column: 1, row: 2, width: 4, color: "linear-gradient(135deg, #6a11cb, #2575fc)" },
      { id: "Tile-3", column: 1, row: 3, width: 6, color: "linear-gradient(135deg, #43cea2, #185a9d)" },
      { id: "Tile-4", column: 1, row: 4, width: 8, color: "linear-gradient(135deg, #ff6a00, #ee0979)" },
      { id: "Tile-5", column: 1, row: 5, width: 10, color: "linear-gradient(135deg, #7f00ff, #e100ff)" }
    ],
    "very hard": [
      { id: "Tile-1", column: 1, row: 1, width: 2, color: "linear-gradient(135deg, #ff7e5f, #feb47b)" },
      { id: "Tile-2", column: 1, row: 2, width: 4, color: "linear-gradient(135deg, #6a11cb, #2575fc)" },
      { id: "Tile-3", column: 1, row: 3, width: 6, color: "linear-gradient(135deg, #43cea2, #185a9d)" },
      { id: "Tile-4", column: 1, row: 4, width: 8, color: "linear-gradient(135deg, #ff6a00, #ee0979)" },
      { id: "Tile-5", column: 1, row: 5, width: 10, color: "linear-gradient(135deg, #7f00ff, #e100ff)" },
      { id: "Tile-6", column: 1, row: 6, width: 12, color: "linear-gradient(135deg, #ffafbd, #ffc3a0)" }
    ]
  };

  const [tiles, setTiles] = useState(initialTiles[difficulty]);

  const handleDrag = (ev) => {
    const dragTile = tiles.find((tile) => tile.id === ev.currentTarget.id);
    const topTile = tiles
      .filter((tile) => tile.column === dragTile.column)
      .sort((a, b) => a.width - b.width)[0];

    if (topTile && ev.currentTarget.id === topTile.id) {
      setDragId(ev.currentTarget.id);
      playSound();
    } else {
      ev.preventDefault();
    }
  };

  const handleDrop = (ev) => {
    const dragTile = tiles.find((tile) => tile.id === dragId);
    const dropColumn = ev.currentTarget.id;

    const dropColumnTopTile = tiles
      .filter((tile) => tile.column.toString() === dropColumn.toString())
      .sort((a, b) => a.width - b.width)[0];

    let newTileState = tiles;

    if (!dropColumnTopTile || dragTile.width < dropColumnTopTile.width) {
      newTileState = tiles.map((tile) => {
        if (tile.id === dragTile.id) {
          tile.column = parseInt(dropColumn, 10);
          setMoveCount(moveCount + 1);
        }
        return tile;
      });
    }

    setTiles(newTileState);
  };

  const column1Tiles = tiles.filter((tile) => tile.column === 1);
  const column2Tiles = tiles.filter((tile) => tile.column === 2);
  const column3Tiles = tiles.filter((tile) => tile.column === 3);

  const winCondition = tiles.every((tile) => tile.column === 3);

  const resetGame = (level) => {
    setTiles(initialTiles[level]);
    setMoveCount(0);
  };

  return (
    <div className="bground">
      <div className="App">
        <div className="instructions">
          <div>
            <span className="text-title text-cyan-500">Objective:</span> Rebuild the tower in the third column in as few moves as possible
          </div>
          <div>
            <span className="text-title text-cyan-500">Instructions:</span> Move one tile at a time, bigger tiles cannot go on top of smaller tiles
          </div>
          <div>
            <p> <span className="text-cyan-500 font-bold">Move count : </span> {moveCount} , 
             <span className="text-cyan-500 font-bold"> Difficulty :</span> {difficulty}</p>
          </div>
          <button className="mute-button px-2 mr-2 py-1 text-cyan-600 border border-cyan-600 font-bold bg-cyan-100 my-2 rounded-full" onClick={toggleMute}>
            {isMuted ? "Unmute" : "Mute"}
          </button>
          <button className="reset-button px-2 py-1 text-purple-600 border border-purple-600 font-bold bg-purple-100 my-1 rounded-full" onClick={() => resetGame(difficulty)}>
            Reset
          </button>
          <div className="difficulty-buttons">
            <button className="difficulty-button px-2 mr-2 py-1 text-green-600 border border-green-600 font-bold bg-green-100 mb-4 rounded-full" onClick={() => handleDifficultyChange("easy")}>Easy</button>
            <button className="difficulty-button px-2 mr-2 py-1 text-yellow-600 border border-yellow-600 font-bold bg-yellow-100 mb-2 rounded-full" onClick={() => handleDifficultyChange("normal")}>Normal</button>
            <button className="difficulty-button px-2 mr-2 py-1 text-orange-600 border border-orange-600 font-bold bg-orange-100 mb-2 rounded-full" onClick={() => handleDifficultyChange("hard")}>Hard</button>
            <button className="difficulty-button px-2 mr-2 py-1 text-red-600 border border-red-600 font-bold bg-red-100 mb-2 rounded-full" onClick={() => handleDifficultyChange("very hard")}>Very Hard</button>
          </div>
        </div>
        <div className="content">
          <div
            className="column-container"
            id={1}
            onDragOver={(ev) => ev.preventDefault()}
            onDrop={handleDrop}
          >
            <div className="center-bar" />
            {column1Tiles
              .sort((a, b) => a.width - b.width)
              .map((tile, index) => {
                const tileCount = column1Tiles.length;
                const tileStyles = {
                  width: `${tile.width}em`,
                  marginTop: index === 0 ? `calc(80vh - ${tileCount * 40 + 20}px)` : "0",
                  background: tile.color
                };
                return (
                  <div
                    id={tile.id}
                    className="tile"
                    draggable
                    key={`column-1-${tile.id}`}
                    onDragStart={handleDrag}
                    style={tileStyles}
                  />
                );
              })}
          </div>
          <div
            className="column-container"
            id={2}
            onDragOver={(ev) => ev.preventDefault()}
            onDrop={handleDrop}
          >
            <div className="center-bar" />
            {column2Tiles
              .sort((a, b) => a.width - b.width)
              .map((tile, index) => {
                const tileCount = column2Tiles.length;
                const tileStyles = {
                  width: `${tile.width}em`,
                  marginTop: index === 0 ? `calc(80vh - ${tileCount * 40 + 20}px)` : "0",
                  background: tile.color
                };
                return (
                  <div
                    id={tile.id}
                    className="tile"
                    draggable
                    key={`column-2-${tile.id}`}
                    onDragStart={handleDrag}
                    style={tileStyles}
                  />
                );
              })}
          </div>
          <div
            className="column-container"
            id={3}
            onDragOver={(ev) => ev.preventDefault()}
            onDrop={handleDrop}
          >
            <div className="center-bar" />
            {column3Tiles
              .sort((a, b) => a.width - b.width)
              .map((tile, index) => {
                const tileCount = column3Tiles.length;
                const tileStyles = {
                  width: `${tile.width}em`,
                  marginTop: index === 0 ? `calc(80vh - ${tileCount * 40 + 20}px)` : "0",
                  background: tile.color
                };
                return (
                  <div
                    id={tile.id}
                    className="tile"
                    draggable
                    key={`column-3-${tile.id}`}
                    onDragStart={handleDrag}
                    style={tileStyles}
                  />
                );
              })}
          </div>
        </div>
        {winCondition && (
          <div className="win-message">
          You Win!
          <div className="win-subtitle">
            You did it in <span className="win-number">{moveCount}</span> moves
          </div>
        </div>
      )}
    </div>
    </div>
  );
};

export default Toh;

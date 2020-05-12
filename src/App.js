import React, { useState, useEffect } from "react";

function App() {
  const [grid, setGrid] = useState([
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
  ]);
  const [choosenBlock, setChoosenBlock] = useState();
  const [newBlock, setNewBlock] = useState();
  const [score, setScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);
  const LOCALSTORAGE_KEY = '2048-best-score';
  const blockIds = [
    "0-0",
    "0-1",
    "0-2",
    "0-3",
    "1-0",
    "1-1",
    "1-2",
    "1-3",
    "2-0",
    "2-1",
    "2-2",
    "2-3",
    "3-0",
    "3-1",
    "3-2",
    "3-3",
  ];

  const init = () => {
    setGrid([
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
    ]);
    twoFourBlock();
    assignBlock();
    displayBlock();
    setScore(0);
    // setBestScore(JSON.parse(localStorage.getItem(LOCALSTORAGE_KEY));
  };


  // useEffect(() => {
  //   let total = 0;
  //   total = grid[0].reduce((prev, cur) => prev + cur, total)
  // }, [grid])

  useEffect(() => {
    init();
  }, []);

  // return either a 2 or 4
  const twoFourBlock = () => {
    const num = [2, 4];
    const randIndex = Math.round(Math.random());
    setNewBlock(num[randIndex]);
  };

  // return random block
  const randBlock = () => {
    const randIndex = Math.floor(Math.random() * 16);
    return blockIds[randIndex];
  };

  // assign a  block
  const assignBlock = () => {
    let id = randBlock();
    const col = id.split("-")[0];
    const row = id.split("-")[1];
    setChoosenBlock(id);
    setGrid((prev) => (prev[row][col] = newBlock));
  };

  // display block on UI
  const displayBlock = () => {
    // convert block id to grid number (1-16)
  };

  const colour = (block) => {
    switch (block) {
      case 2:
        return "colour-2";
        break;
      case 4:
        return "colour-4";
        break;
      case 8:
        return "colour-8";
        break;
      case 16:
        return "colour-16";
        break;
      case 32:
        return "colour-32";
        break;
      case 64:
        return "colour-64";
        break;
      case 128:
        return "colour-128";
        break;
      case 256:
        return "colour-256";
        break;
      case 516:
        return "colour-516";
        break;
      case 1024:
        return "colour-1024";
        break;
      case 2048:
        return "colour-2048";
        break;
      default:
        return "";
    }
  };

  return (
    <div className="app">
      <header>
        <div className="logo">
          <p>2048</p>
        </div>
        <div className="header-info-section">
          <div className="score">
            <p>score</p>
            <p>{score}</p>
          </div>
          <div className="best">
            <p>Best</p>
            <p>{bestScore}</p>
          </div>
          <button className="btn-reset" onClick={init}>
            Reset
          </button>
        </div>
      </header>

      <p className="instructions">
        <strong>How to play: </strong>Press the up, down, right or left arrow
        keys to move the tiles. When 2 same tiles touch they merge into one.
        Reach 2048 to win.
      </p>

      <main className="grid">
        {blockIds.map((block) => (
          <div
            className={block === choosenBlock ? colour(newBlock) : null}
            key={block}
          >
            {block === choosenBlock ? newBlock : ""}
          </div>
        ))}
      </main>
    </div>
  );
}

export default App;

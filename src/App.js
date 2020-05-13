import React, { useState, useEffect } from "react";
import { blockIds, colour } from "./globalObjects";
import Header from "./component/Header";

function App() {
  const [grid, setGrid] = useState([
    [0, 0, 4, 0],
    [256, 0, 0, 64],
    [0, 8, 0, 0],
    [8, 2, 0, 32],
  ]);
  const [newBlock, setNewBlock] = useState(0);
  const [score, setScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);
  const LOCALSTORAGE_KEY = "2048-best-score";
  const [playing, setPlaying] = useState(false);
  const [resetToggle, setResetToggle] = useState(true);

  useEffect(() => {
    setBestScore(localStorage.getItem(LOCALSTORAGE_KEY));
    twoFourBlock();
    let id = randBlock();
    const col = id.split("-")[0];
    const row = id.split("-")[1];
    const gridCopy = [...grid];
    gridCopy[row][col] = newBlock;
    setGrid(gridCopy);
    setScore(newBlock);
  }, [resetToggle]);

  // clicking RESET
  const init = () => {
    setGrid([
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
    ]);
    if (score > bestScore) {
      localStorage.setItem(LOCALSTORAGE_KEY, score);
      setBestScore(score);
    }
    setResetToggle((prev) => (prev === true ? false : true));
    setPlaying(true);
  };

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

  const shiftUp = () => {
    let numsOnly;
    let gridCopy = [...grid];
    for (let col = 0; col < 4; col++) {
      let column = [gridCopy[0][col], gridCopy[1][col], gridCopy[2][col], gridCopy[3][col]];
      numsOnly = column.filter((num) => num > 0);
      gridCopy[0][col] = numsOnly[0] !== undefined ? numsOnly[0] : 0;
      gridCopy[1][col] = numsOnly[1] !== undefined ? numsOnly[1] : 0;
      gridCopy[2][col] = numsOnly[2] !== undefined ? numsOnly[2] : 0;
      gridCopy[3][col] = numsOnly[3] !== undefined ? numsOnly[3] : 0;
    }
    setGrid(gridCopy);
  };

  const shiftDown = () => {
    let numsOnly;
    let gridCopy = [...grid];
    for (let col = 0; col < 4; col++) {
      let column = [
        gridCopy[0][col],
        gridCopy[1][col],
        gridCopy[2][col],
        gridCopy[3][col],
      ];
      numsOnly = column.filter((num) => num > 0);
      numsOnly = numsOnly.reverse();
      gridCopy[3][col] = numsOnly[0] !== undefined ? numsOnly[0] : 0;
      gridCopy[2][col] = numsOnly[1] !== undefined ? numsOnly[1] : 0;
      gridCopy[1][col] = numsOnly[2] !== undefined ? numsOnly[2] : 0;
      gridCopy[0][col] = numsOnly[3] !== undefined ? numsOnly[3] : 0;
    }
    setGrid(gridCopy);
  };

  const shiftRight = () => {
    let numsOnly;
    let gridCopy = [...grid];
    for (let row = 0; row < 4; row++) {
      let column = [
        gridCopy[row][0],
        gridCopy[row][1],
        gridCopy[row][2],
        gridCopy[row][3],
      ];
      numsOnly = column.filter((num) => num > 0);
      numsOnly = numsOnly.reverse();
      gridCopy[row][3] = numsOnly[0] !== undefined ? numsOnly[0] : 0;
      gridCopy[row][2] = numsOnly[1] !== undefined ? numsOnly[1] : 0;
      gridCopy[row][1] = numsOnly[2] !== undefined ? numsOnly[2] : 0;
      gridCopy[row][0] = numsOnly[3] !== undefined ? numsOnly[3] : 0;
    }
    setGrid(gridCopy);
  };

  const shiftLeft = () => {
    let numsOnly;
    let gridCopy = [...grid];
    for (let row = 0; row < 4; row++) {
      let column = [
        gridCopy[row][0],
        gridCopy[row][1],
        gridCopy[row][2],
        gridCopy[row][3],
      ];
      numsOnly = column.filter((num) => num > 0);
      numsOnly = numsOnly;
      gridCopy[row][0] = numsOnly[0] !== undefined ? numsOnly[0] : 0;
      gridCopy[row][1] = numsOnly[1] !== undefined ? numsOnly[1] : 0;
      gridCopy[row][2] = numsOnly[2] !== undefined ? numsOnly[2] : 0;
      gridCopy[row][3] = numsOnly[3] !== undefined ? numsOnly[3] : 0;
    }
    setGrid(gridCopy);
  };

  const swipe = (e) => {
    if (e.key === "ArrowUp") {
      shiftUp();
    } else if (e.key === "ArrowDown") {
      shiftDown();
    } else if (e.key === "ArrowLeft") {
      shiftLeft();
    } else if (e.key === "ArrowRight") {
      shiftRight();
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", swipe);

    return () => {
      window.removeEventListener("keydown", swipe);
    };
  });

  // eventlisteners for up, down, left and right arrow keys

  return (
    <div className="app">
      {console.log(grid)}
      <Header
        score={score}
        bestScore={bestScore}
        init={init}
        playing={playing}
      />

      <main className="grid">
        {grid
          .join(",")
          .split(",")
          .map((block) => (
            <div className={colour(block)} key={Math.random()}>
              {block === "0" ? "" : block}
            </div>
          ))}
      </main>
    </div>
  );
}

export default App;

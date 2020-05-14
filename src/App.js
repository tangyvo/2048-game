import React, { useState, useEffect } from "react";
import { blockIds, colour } from "./globalObjects";
import Header from "./component/Header";

function App() {
  const [grid, setGrid] = useState([
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
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
    const gridCopy = [...grid];
    const row = Math.floor(Math.random() * 4);
    const col = Math.floor(Math.random() * 4);
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

  const calcTotal = () => {
    let total = 0;
    grid.map((row) => {
      total += row.reduce((prev, cur) => prev + Number(cur), 0);
    });
    setScore(total);
  };

  const shiftUp = () => {
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
      numsOnly = checkMerge(numsOnly);
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
      numsOnly = checkMerge(numsOnly);
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
      numsOnly = gridCopy[row].filter((num) => num > 0);
      numsOnly = numsOnly.reverse();
      numsOnly = checkMerge(numsOnly);
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
      numsOnly = gridCopy[row].filter((num) => num > 0);
      numsOnly = checkMerge(numsOnly);
      gridCopy[row][0] = numsOnly[0] !== undefined ? numsOnly[0] : 0;
      gridCopy[row][1] = numsOnly[1] !== undefined ? numsOnly[1] : 0;
      gridCopy[row][2] = numsOnly[2] !== undefined ? numsOnly[2] : 0;
      gridCopy[row][3] = numsOnly[3] !== undefined ? numsOnly[3] : 0;
    }
    setGrid(gridCopy);
  };

  const swipe = (e) => {
    if (
      e.key !== "ArrowUp" &&
      e.key !== "ArrowDown" &&
      e.key !== "ArrowLeft" &&
      e.key !== "ArrowRight"
    ) return;

    if (e.key === "ArrowUp") {
      shiftUp();
    } else if (e.key === "ArrowDown") {
      shiftDown();
    } else if (e.key === "ArrowLeft") {
      shiftLeft();
    } else if (e.key === "ArrowRight") {
      shiftRight();
    }
    generateNewBlock();
    calcTotal();
    checkGameOver();
  };

  const checkGameOver = () => {
    let empty = 0;
    for (let row of grid) {
      empty += row.filter(col => col === 0).length;
    }

    if (empty === 0) {
      console.log('Game Over')
    }
  }

  const generateNewBlock = () => {
    twoFourBlock();
    const gridCopy = [...grid];
    let empty = false;
    while (!empty) {
      const row = Math.floor(Math.random() * 4);
      const col = Math.floor(Math.random() * 4);
      if (gridCopy[row][col] === 0) {
        gridCopy[row][col] = newBlock;
        empty = true;
      }
    }
    setGrid(gridCopy);
  };

  const checkMerge = (array) => {
    let newArray = [...array];
    for (let i = 0; i < array.length - 1; i++) {
      if (newArray[i] === newArray[i + 1]) {
        newArray[i] = array[i] * 2;
        newArray[i + 1] = 0;
      }
    }
    return newArray.filter((el) => el !== 0);
  };

  useEffect(() => {
    window.addEventListener("keydown", swipe);

    return () => {
      window.removeEventListener("keydown", swipe);
    };
  });

  return (
    <div className="app">
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

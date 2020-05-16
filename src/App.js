import React, { useState, useEffect } from "react";
import { colour } from "./globalObjects";
import GameOver from "./component/Gameover";
import Header from "./component/Header";

function App() {
  const LOCALSTORAGE_KEY = "2048-best-score";
  const [bestScore, setBestScore] = useState(0);
  const [score, setScore] = useState(0);
  const [newBlock, setNewBlock] = useState(0);
  const [gameover, setGameover] = useState(false);
  const [blockToggle, setBlockToggle] = useState(false);
  const [grid, setGrid] = useState([
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
  ]);

  // get best score on page load
  useEffect(() => {
    setBestScore(localStorage.getItem(LOCALSTORAGE_KEY));
    twoFourBlock();
  }, []);

  useEffect(() => {
    const gridCopy = [...grid];
    const emptyBlocks = gridCopy.filter((block) => block === 0).length;
    if (emptyBlocks === 0 && blockToggle) return;
    let empty = false;
    while (!empty) {
      let row = Math.floor(Math.random() * 4);
      let col = Math.floor(Math.random() * 4);
      if (gridCopy[row][col] === 0) {
        gridCopy[row][col] = newBlock;
        empty = true;
        calcTotal();
      }
    }
    setGrid(gridCopy);
  }, [blockToggle]);

  // resetting game and grid
  const init = () => {
    setGrid([
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
    ]);
    twoFourBlock();
    setScore(newBlock);
    setGameover(false);
  };

  // check & save best score
  const saveBestScore = () => {
    if (score > bestScore) {
      localStorage.setItem(LOCALSTORAGE_KEY, score);
      setBestScore(score);
    }
  };

  // return either a 2 or 4
  const twoFourBlock = () => {
    const num = [2, 4];
    const randIndex = Math.round(Math.random());
    setNewBlock(num[randIndex]);
    setBlockToggle((prev) => (prev === true ? false : true));
  };

  // count points on grid
  const calcTotal = () => {
    let total = 0;
    grid.map(
      (row) => (total += row.reduce((prev, cur) => prev + Number(cur), 0))
    );
    setScore(total);
  };

  const shiftUp = () => {
    let gridCopy = [...grid];
    for (let col = 0; col < 4; col++) {
      let column = [0, 1, 2, 3].map((num) => gridCopy[num][col]);
      let tile = column.filter((num) => num > 0);
      tile = checkMerge(tile);
      for (let i = 0; i < 4; i++) {
        gridCopy[i][col] = tile[i] !== undefined ? tile[i] : 0;
      }
    }
    setGrid(gridCopy);
  };

  const shiftDown = () => {
    let gridCopy = [...grid];
    for (let col = 0; col < 4; col++) {
      let column = [3, 2, 1, 0].map((num) => gridCopy[num][col]);
      let tile = column.filter((num) => num > 0);
      tile = checkMerge(tile);
      for (let i = 0; i < 4; i++) {
        gridCopy[i][col] = tile[3 - i] !== undefined ? tile[3 - i] : 0;
      }
    }
    setGrid(gridCopy);
  };

  const shiftRight = () => {
    let gridCopy = [...grid];
    for (let row = 0; row < 4; row++) {
      let tile = gridCopy[row].filter((num) => num > 0);
      tile = checkMerge(tile).reverse();
      for (let i = 0; i < 4; i++) {
        gridCopy[row][i] = tile[3 - i] !== undefined ? tile[3 - i] : 0;
      }
    }
    setGrid(gridCopy);
  };

  const shiftLeft = () => {
    let gridCopy = [...grid];
    for (let row = 0; row < 4; row++) {
      let tile = gridCopy[row].filter((num) => num > 0);
      tile = checkMerge(tile);
      for (let i = 0; i < 4; i++) {
        gridCopy[row][i] = tile[i] !== undefined ? tile[i] : 0;
      }
    }
    setGrid(gridCopy);
  };

  const swipe = (e) => {
    if (
      e.key !== "ArrowUp" &&
      e.key !== "ArrowDown" &&
      e.key !== "ArrowLeft" &&
      e.key !== "ArrowRight"
    )
      return;

    if (e.key === "ArrowUp") {
      shiftUp();
    } else if (e.key === "ArrowDown") {
      shiftDown();
    } else if (e.key === "ArrowLeft") {
      shiftLeft();
    } else if (e.key === "ArrowRight") {
      shiftRight();
    }

    twoFourBlock();
    calcTotal();
    checkGameOver();
  };

  const checkGameOver = () => {
    let empty = 0;
    for (let row of grid) {
      empty += row.filter((col) => col === 0).length;
    }

    if (empty === 0) {
      let noMatch = true;
      for (let row = 0; row < 4; row++) {
        for (let col = 0; col < 4; col++) {
          if (row === 3) {
            if (grid[row][col] === grid[row][col + 1]) {
              noMatch = false;
              console.log(grid[row][col], grid[row][col + 1]);
            }
          } else if (col === 3) {
            if (grid[row][col] === grid[row + 1][col]) {
              noMatch = false;
              console.log(grid[row][col], grid[row + 1][col]);
            }
          } else if (
            grid[row][col] === grid[row][col + 1] ||
            grid[row][col] === grid[row + 1][col]
          ) {
            console.log(grid[row][col], grid[row + 1][col], grid[row][col + 1]);
            noMatch = false;
          }
        }
      }

      if (noMatch) {
        setGameover(true);
        saveBestScore();
      }
    }
  };

  const checkMerge = (array) => {
    let newArray = [...array];
    for (let i = 0; i < array.length - 1; i++) {
      if (newArray[i] === newArray[i + 1]) {
        newArray[i] = array[i] * 2;
        newArray.splice(i + 1, 1);
      }
    }
    return newArray;
  };

  useEffect(() => {
    window.addEventListener("keydown", swipe);

    return () => {
      window.removeEventListener("keydown", swipe);
    };
  });

  return (
    <div className="app">
      <Header score={score} bestScore={bestScore} init={init} />
      <GameOver className="gameover" gameover={gameover} score={score} />
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

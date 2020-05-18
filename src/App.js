import React, { useState, useEffect } from "react";
import GameOver from "./component/Gameover";
import Header from "./component/Header";
import Grid from "./component/Grid";

function App() {
  const LOCALSTORAGE_KEY = "2048-best-score";
  const [bestScore, setBestScore] = useState(0);
  const [score, setScore] = useState(0);
  const [newTile, setNewtile] = useState(0);
  const [gameover, setGameover] = useState(false);
  const [tileToggle, settileToggle] = useState(false);
  const [newTileId, setNewTileId] = useState();
  const [prevGrid, setPrevGrid] = useState([]);
  const [grid, setGrid] = useState([
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
  ]);

  // get best score on page load
  useEffect(() => {
    setBestScore(localStorage.getItem(LOCALSTORAGE_KEY));
    randTile();
  }, []);

  // 
  useEffect(() => {
    const gridCopy = [...grid];
    let empty = false;
    let count = 0;
    while (!empty) {
      count += 1;
      let row = Math.floor(Math.random() * 4);
      let col = Math.floor(Math.random() * 4);
      if (gridCopy[row][col] === 0) {
        gridCopy[row][col] = newTile;
        getTileId(row, col);
        empty = true;
        calcTotal();

      } else if (count > 50) {
        empty = true;
      }
    }
    setGrid(gridCopy);
  }, [tileToggle]);

  // convert tile postion on grid
  const getTileId = (r, c) => {
    let pos = r * 4 + c;
    setNewTileId(pos);
  };

  // resetting game and grid
  const init = () => {
    setGrid([
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
    ]);
    randTile();
    setScore(newTile);
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
  const randTile = () => {
    settileToggle((prev) => (prev === true ? false : true));
    const num = [2, 4];
    const randIndex = Math.round(Math.random());
    setNewtile(num[randIndex]);
  };

  // count points on grid
  const calcTotal = () => {
    let total = 0;
    grid.map(
      (row) => (total += row.reduce((prev, cur) => prev + Number(cur), 0))
    );
    setScore(total);
  };

  const moveUp = () => {
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

  const moveDown = () => {
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

  const moveRight = () => {
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

  const moveLeft = () => {
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
    if (e.key === "ArrowUp") {
      moveUp();
    } else if (e.key === "ArrowDown") {
      moveDown();
    } else if (e.key === "ArrowLeft") {
      moveLeft();
    } else if (e.key === "ArrowRight") {
      moveRight();
    } else {
      return;
    }
    randTile();
    calcTotal();
  };


  // check if game is over every time grid updates
  useEffect(() => {
    checkGameOver();
  }, [grid]);

  const checkGameOver = () => {
    // check tiles are filled
    let empty = 0;
    for (let row of grid) {
      empty += row.filter((col) => col !== 0).length;
    }
    if (empty !== 16) return;

    let noMatch = true;
    for (let row = 0; row <= 3; row++) {
      for (let col = 0; col <= 3; col++) {
        if (row === 3) {
          if (grid[row][col] === grid[row][col + 1]) {
            noMatch = false;
          }
        } else if (col === 3) {
          if (grid[row][col] === grid[row + 1][col]) {
            noMatch = false;
          }
        } else if (
          grid[row][col] === grid[row + 1][col] ||
          grid[row][col] === grid[row][col + 1]
        ) {
          noMatch = false;
        }
      }
    }

    if (noMatch) {
      setGameover(true);
      saveBestScore();
    }
  };

  // merge 2 tiles of the same number
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
    if (!gameover) {

      window.addEventListener("keydown", swipe);
      return () => {
        window.removeEventListener("keydown", swipe);
      };
    }
  });

  return (
    <div className="app">
      <Header score={score} bestScore={bestScore} init={init} />
      <GameOver className="gameover" gameover={gameover} score={score} />
      <Grid grid={grid} id={newTileId} />
    </div>
  );
}

export default App;
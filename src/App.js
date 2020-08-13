import React, { useState, useEffect } from 'react';
import { isBrowser } from 'react-device-detect';
import GameOver from './component/Gameover';
import Header from './component/Header';
import Instructions from './component/Instructions';
import Grid from './component/Grid';

function App() {
  const LOCALSTORAGE_KEY = '2048-best-score';
  const [bestScore, setBestScore] = useState(0);
  const [score, setScore] = useState(0);
  const [newTile, setNewtile] = useState(0);
  const [gameover, setGameover] = useState(false);
  const [tileToggle, setTileToggle] = useState(false);
  const [newTileId, setNewTileId] = useState();
  const [touchStart, setTouchStart] = useState([0, 0]);
  const [touchMove, setTouchMove] = useState([0, 0]);
  const [touchEnd, setTouchEnd] = useState(false);
  const [grid, setGrid] = useState([
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
  ]);

  useEffect(() => {
    // get best score if there is one, else set to 0.
    let bestScore = localStorage.getItem(LOCALSTORAGE_KEY)
      ? localStorage.getItem(LOCALSTORAGE_KEY)
      : 0;
    setBestScore(bestScore);

    randTile();
  }, []);

  const randTile = () => {
    // generate random 2/4 tile.
    const num = [2, 4];
    const randIndex = Math.round(Math.random());
    setNewtile(num[randIndex]);

    // used to track a new tile was generated even if its the same as the prev
    setTileToggle((prev) => (prev === true ? false : true));
  };

  useEffect(() => {
    const gridCopy = [...grid];
    let empty = false;

    // generate rand grid pos (x,y) if its empty insert new tile
    while (!empty) {
      let row = Math.floor(Math.random() * 4);
      let col = Math.floor(Math.random() * 4);
      if (gridCopy[row][col] === 0) {
        gridCopy[row][col] = newTile;
        getTileId(row, col);
        empty = true;
        calcTotalScore();
      }
    }
    setGrid(gridCopy);
  }, [tileToggle]);

  // set new tile + convert from (x,y) to ID
  const getTileId = (r, c) => {
    let pos = r * 4 + c;
    setNewTileId(pos);
  };

  // reset everything
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

  // if current score is best score save to local storage
  const saveBestScore = () => {
    if (score > bestScore) {
      localStorage.setItem(LOCALSTORAGE_KEY, score);
      setBestScore(score);
    }
  };

  // count total points on grid
  const calcTotalScore = () => {
    let total = 0;
    grid.map(
      (row) => (total += row.reduce((prev, cur) => prev + Number(cur), 0))
    );
    setScore(total);
  };

  // set new grid when swipe UP
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

  // set new grid when swipe DOWN
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

  // set new grid when swipe RIGHT
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

  // set new grid when swipe LEFT
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

  // call when keypress/mobile swipe
  const swipe = (e) => {
    if (isBrowser) {
      e = e.key;
    }

    // make deep copy of prev grid state
    const prev = JSON.parse(JSON.stringify([...grid]));

    if (e === 'ArrowUp') {
      moveUp();
    } else if (e === 'ArrowDown') {
      moveDown();
    } else if (e === 'ArrowLeft') {
      moveLeft();
    } else if (e === 'ArrowRight') {
      moveRight();
    } else {
      return;
    }

    // check if grid changed after keypress/swipe
    let change = false;
    for (let i = 0; i < 4; i++) {
      for (let j = 0; j < 4; j++) {
        if (prev[i][j] !== grid[i][j]) {
          change = true;
        }
      }
    }

    // if grid change then add new tile, calc score and check if gameover
    if (change) {
      randTile();
      calcTotalScore();
      checkGameOver();
    }
  };

  const checkGameOver = () => {
    // check no tiles are empty
    let empty = 0;
    for (let row of grid) {
      empty += row.filter((col) => col !== 0).length;
    }
    if (empty !== 16) return;

    // check if there are any touching tiles with same number
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

    // gameover and store best score
    if (noMatch) {
      setGameover(true);
      saveBestScore();
    }
  };

  const checkMerge = (array) => {
    let newArray = [...array];
    for (let i = 0; i < array.length - 1; i++) {
      // check if array contains same tile next to each other
      if (newArray[i] === newArray[i + 1]) {
        // if so, double tile and remove from 1 from array
        newArray[i] = array[i] * 2;
        newArray.splice(i + 1, 1);
      }
    }
    return newArray;
  };

  // add and remove event listeners
  useEffect(() => {
    if (!gameover) {
      window.addEventListener('keydown', swipe);
      return () => {
        window.removeEventListener('keydown', swipe);
      };
    }
  });

  // called when mobile swipe detected
  useEffect(() => {
    if (!touchEnd) return;
    // compare touchstart and touchend to determine up, down, left or right swipe
    let changeX = touchStart[0] - touchMove[0];
    let changeY = touchStart[1] - touchMove[1];
    let absChangeX = Math.abs(changeX);
    let absChangeY = Math.abs(changeY);

    // left/right swipe
    if (absChangeX > absChangeY) {
      if (changeX > 0) {
        swipe('ArrowLeft');
      } else {
        swipe('ArrowRight');
      }
    }
    // up/down swipe
    else if (absChangeX < absChangeY) {
      if (changeY > 0) {
        swipe('ArrowUp');
      } else {
        swipe('ArrowDown');
      }
    }
    setTouchEnd(false);
  }, [touchEnd]);

  const touchType = (e) => {
    if (e.type === 'touchstart') {
      setTouchStart([e.touches[0].clientX, e.touches[0].clientY]);
    } else if (e.type === 'touchmove') {
      setTouchMove([e.touches[0].clientX, e.touches[0].clientY]);
    } else if (e.type === 'touchend') {
      setTouchEnd(true);
    }
  };

  return (
    <div
      className='app'
      onTouchStart={(e) => touchType(e)}
      onTouchMove={(e) => touchType(e)}
      onTouchEnd={(e) => touchType(e)}
    >
      <Header score={score} bestScore={bestScore} init={init} />
      <Instructions />
      <GameOver className='gameover' gameover={gameover} score={score} />
      <Grid grid={grid} id={newTileId} />
    </div>
  );
}

export default App;

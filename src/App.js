import React, { useState, useEffect } from 'react';
import {
  BrowserView,
  MobileView,
  isBrowser,
  isMobile,
} from 'react-device-detect';
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
  const [tileToggle, settileToggle] = useState(false);
  const [newTileId, setNewTileId] = useState();
  const [grid, setGrid] = useState([
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
  ]);
  const [touchStart, setTouchStart] = useState([0, 0]);
  const [touchMove, setTouchMove] = useState([0, 0]);
  const [touchEnd, setTouchEnd] = useState(false);

  // PAGE LOAD - GET BESTSCORE AND FIRST TILE
  useEffect(() => {
    setBestScore(localStorage.getItem(LOCALSTORAGE_KEY));
    randTile();
  }, []);

  // ADD NEW TILE
  useEffect(() => {
    const gridCopy = [...grid];
    let empty = false;

    // KEEP LOOPING UNTIL EMPTY BLOCK FOUND
    while (!empty) {
      let row = Math.floor(Math.random() * 4);
      let col = Math.floor(Math.random() * 4);
      if (gridCopy[row][col] === 0) {
        gridCopy[row][col] = newTile;
        getTileId(row, col);
        empty = true;
        calcTotal();
      }
    }
    setGrid(gridCopy);
  }, [tileToggle]);

  // GET POSITION ON GRID E.G. ROW 1, COL 1 = POSITION 5
  const getTileId = (r, c) => {
    let pos = r * 4 + c;
    setNewTileId(pos);
  };

  // RESET GRID ARRAY, CURRENT SCORE AND RESET GAMEOVER STATE
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

  // FN TO CHECK IF SCORE IS A BEST SCORE AND SAVE TO LOCAL STORAGE
  const saveBestScore = () => {
    if (score > bestScore) {
      localStorage.setItem(LOCALSTORAGE_KEY, score);
      setBestScore(score);
    }
  };

  // GENERATE NEW RANDOM 2 OR 4 TILE
  const randTile = () => {
    settileToggle((prev) => (prev === true ? false : true));
    const num = [2, 4];
    const randIndex = Math.round(Math.random());
    setNewtile(num[randIndex]);
  };

  // COUNT TOTAL POINTS ON GRID
  const calcTotal = () => {
    let total = 0;
    grid.map(
      (row) => (total += row.reduce((prev, cur) => prev + Number(cur), 0))
    );
    setScore(total);
  };

  // CALCULATE NEW GRID POSITIONS WHEN 'UP' KEY PRESSED
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

  // CALCULATE NEW GRID POSITIONS WHEN 'DOWN' KEY PRESSED
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

  // CALCULATE NEW GRID POSITIONS WHEN 'RIGHT' KEY PRESSED
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

  // CALCULATE NEW GRID POSITIONS WHEN 'LEFT' KEY PRESSED
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

  // CALL FN DEPENDING ON KEY PRESSED
  const swipe = (e) => {
    if (isBrowser) {
      e = e.key;
    }
    // DEEP COPY
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
    // COMPARE PREVIOUS GRID STATE TO CURRENT TO SEE IF THERE WAS A CHANGE
    let change = false;
    for (let i = 0; i < 4; i++) {
      for (let j = 0; j < 4; j++) {
        if (prev[i][j] !== grid[i][j]) {
          change = true;
        }
      }
    }

    // ONLY RENDER NEW TILE CALCULATE TOTAL FN IF GRID CHANGED
    if (change) {
      randTile();
      calcTotal();
    }
  };

  const gridChangeCheck = () => {
    
  }

  // CHECK IF GAME IS OVER EVERY TIME GRID IS UPDATED
  useEffect(() => {
    checkGameOver();
  }, [grid]);

  // FN TO CHECK IF GAME IS OVER
  const checkGameOver = () => {
    // CHECK NO TILES ARE EMPTY
    let empty = 0;
    for (let row of grid) {
      empty += row.filter((col) => col !== 0).length;
    }
    if (empty !== 16) return;

    // SET noMatch TO FALSE IF TILE IS THE SAME AS THE ONE NEXT TO IT (THEREFORE GAME IS NOT OVER)
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

    // SET GAMEOVER AND CHECK BEST SCORE ONLY IF THERE ARE NO MATCHES FOUND ON GRID
    if (noMatch) {
      setGameover(true);
      saveBestScore();
    }
  };

  // MERGE 2 TILES BY DOUBLING AND THEN REMOVING 2ND FILE FROM ARRAY
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

  // ADD AND REMOVE EVENT LISTENERS
  useEffect(() => {
    if (!gameover) {
      window.addEventListener('keydown', swipe);
      return () => {
        window.removeEventListener('keydown', swipe);
      };
    }
  });

  // MOBILE SWIPE
  useEffect(() => {
    if (!touchEnd) return;
    let changeX = touchStart[0] - touchMove[0];
    let changeY = touchStart[1] - touchMove[1];
    let absChangeX = Math.abs(changeX);
    let absChangeY = Math.abs(changeY);

    // Left / Right Swipe
    if (absChangeX > absChangeY) {
      if (changeX > 0) {
        swipe('ArrowLeft');
      } else {
        swipe('ArrowRight');
      }
    }
    // Top / Down Swipe
    else if (absChangeX < absChangeY) {
        if (changeY > 0) {
          swipe('ArrowUp');
        }
        else {
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

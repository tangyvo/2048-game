import React from "react";

const Header = ({ score, bestScore, init }) => {
  return (
    <React.Fragment>
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

      <div className="instructions">
        <strong>How to play: </strong>Press the up, down, right or left arrow
        keys to move the tiles. When 2 same tiles touch they merge into one.
        Reach 2048 to win.
      </div>
    </React.Fragment>
  );
};

export default Header;

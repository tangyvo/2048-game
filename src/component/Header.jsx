import React from "react";


const Header = ({ score, bestScore, init }) => {
  return (
    <>
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
          <button className="btn btn-reset" onClick={init}>
            Reset
          </button>
        </div>
      </header>


    </>
  );
};

export default Header;
